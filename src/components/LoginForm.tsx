import React, { useState } from 'react';
import styled from 'styled-components';
import { User } from '../utils/user';

interface LoginProps {
  onLogin: (isLoggedIn: boolean, enteredUsername: string) => void;
  adminUser: User;
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
`;

const LoginForm: React.FC<LoginProps> = ({ onLogin, adminUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === adminUser.username && password === adminUser.password) {
      onLogin(true, username);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button type="submit">Login</Button>
      </form>
    </LoginContainer>
  );
};

export default LoginForm;