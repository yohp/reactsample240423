import React, { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';

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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const Textarea = styled.textarea`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
`;

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    date: '',
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <FormContainer>
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
            value={formData.timeLine.start}
            onChange={(e) => handleTimelineChange(e, 'start')}
            placeholder="Start Time"
          />
          <Input
            type="time"
            value={formData.timeLine.end}
            onChange={(e) => handleTimelineChange(e, 'end')}
            placeholder="End Time"
          />
        </div>
        <div>
          {formData.workDetails.map((detail, index) => (
            <Textarea
              key={index}
              value={detail}
              onChange={(e) => handleWorkDetailsChange(e, index)}
              placeholder={`Work Detail ${index + 1}`}
            />
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
  );
};

export default MyForm;