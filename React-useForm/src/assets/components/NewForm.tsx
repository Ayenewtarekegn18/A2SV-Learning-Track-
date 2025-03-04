import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import WelcomeMessage from './WelcomeMessage'; // Import the WelcomeMessage component

interface FormValues {
  username: string;
  email: string;
  password: string;
}

const NewForm = () => {
  const [isValid, setIsValid] = useState(false);
  const formdata = useForm<FormValues>();
  const { register, control, handleSubmit, reset, formState: { errors } } = formdata;

  const formData = formdata.watch();

  const onSubmit = (data: FormValues) => {
    setIsValid(true);
  };

  const resetForm = () => {
    reset();
    setIsValid(false);
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "This is a Required field" })}
            placeholder="Name"
          />
          {errors.username && <p className="error-message">{errors.username.message}</p>}
          
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                message: "Invalid Email",
              },
              required: "This is a Required field"
            })}
            placeholder="Email"
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
          
          <label>Password: </label>
          <input
            id="password"
            type="password"
            {...register("password",{minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },required: "This is a Required field"})}
            placeholder="Password"
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
          
          <button className="submit-button">Submit</button>
        </form>
        <DevTool control={control} />
      </div>
      {isValid && (
        <WelcomeMessage username={formData.username} onClose={resetForm} />
      )}
    </>
  );
};

export default NewForm;