
import React, { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface FormData {
  date: string;
  name: string;
  timeLine: {
    start: string;
    end: string;
  };
  workDetails: string[];
  remarks: string;
}

interface MyFormProps {
  username: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FormContainer = styled.div`
  display: flex;
  width: 100%; // ここを修正しました。'2' から '100%' に変更
  flex-direction: column;
  align-items: center;
  border: 0px solid #ccc;
  padding: 0.25rem;
  box-sizing: border-box;
  margin: 1px;
`;

const CalendarContainer = styled.div`
  flex: 1;
`;


const Input = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const Textarea = styled.textarea`
  margin-bottom: 0.1rem;
  padding: 0.1rem;
  font-size: 0.8rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const WorkDetailContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 0.5rem;
`;

const MyForm: React.FC<MyFormProps> = ({ username }) => {
  const today = new Date().toISOString().slice(0, 10);
  const [formData, setFormData] = useState<FormData>({
    date: today,
    name: '',
    timeLine: {
      start: '',
      end: '',
    },
    workDetails: [],
    remarks: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date: Date) => {
    setFormData({
      ...formData,
      date: date.toISOString().slice(0, 10),
    });
  };


  const handleTimelineChange = (e: ChangeEvent<HTMLInputElement>, field: 'start' | 'end') => {
    setFormData({
      ...formData,
      timeLine: {
        ...formData.timeLine,
        [field]: e.target.value,
      },
    });
  };

  const handleWorkDetailsChange = (e: ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const newWorkDetails = [...formData.workDetails];
    newWorkDetails[index] = e.target.value;
    setFormData({
      ...formData,
      workDetails: newWorkDetails,
    });
  };

  const handleAddWorkDetail = () => {
    setFormData({
      ...formData,
      workDetails: [...formData.workDetails, ''],
    });
  };

  const handleRemoveWorkDetail = (index: number) => {
    const newWorkDetails = [...formData.workDetails];
    newWorkDetails.splice(index, 1);
    setFormData({
      ...formData,
      workDetails: newWorkDetails,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  
  return (
    <Container>
      <FormContainer>
      <h2>Welcome, {username}!</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <div>
          <Input
            type="time"
            name="start"
            value={formData.timeLine.start}
            onChange={(e) => handleTimelineChange(e, 'start')}
            placeholder="Start Time"
          />
          <Input
            type="time"
            name="end"
            value={formData.timeLine.end}
            onChange={(e) => handleTimelineChange(e, 'end')}
            placeholder="End Time"
          />
        </div>
        <div>
          {formData.workDetails.map((detail, index) => (
            <WorkDetailContainer key={index}>
              <Textarea
                value={detail}
                onChange={(e) => handleWorkDetailsChange(e, index)}
                placeholder={`Work Detail ${index + 1}`}
              />
              <RemoveButton onClick={() => handleRemoveWorkDetail(index)}>
                ✖️
              </RemoveButton>
            </WorkDetailContainer>
          ))}
          <Button type="button" onClick={handleAddWorkDetail}>
            Add Work Detail
          </Button>
        </div>
        <Textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          placeholder="Remarks"
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormContainer>
      <CalendarContainer>
        <Calendar
          onChange={handleDateChange}
          value={new Date(formData.date)}
          
        />
      </CalendarContainer>
    </Container>
    
  );
};

export default MyForm;