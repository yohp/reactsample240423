// src/utils/user.ts
export interface User {
    username: string;
    password: string;
  }
  
  export const adminUser: User = {
    username: 'admin',
    password: 'admin',
  };