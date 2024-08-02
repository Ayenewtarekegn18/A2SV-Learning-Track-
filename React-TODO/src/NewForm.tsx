import React from 'react'
import{useForm,} from "react-hook-form";
import {DevTool} from "@hookform/devtools";


  type FormValues = {
    username : string,
    email : string,
    password : string,
  }
const NewForm = () => {
  const formdata = useForm<FormValues>();
  const {register,control,handleSubmit} = formdata;

  const onSubmit=(data:FormValues) => {
    console.log("Form Submitted",data);
  }

  
    return (
    <div  className="container">
      <form onSubmit={handleSubmit(onSubmit)}noValidate>
        <label htmlFor = "username">Name:</label>
          <input type="text" 
          id="username" 
           {...register("username",{required:"username is required"})} placeholder="Name" />
        <label htmlFor='email'>Email:</label>
          <input id='email' type="email" {...register("email",{pattern:{value:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,message:"Invalid Email"}})} placeholder="Email" />
        <label>Password: </label>
          <input id='password' type="password" {...register("password")} placeholder="Password" />
        <button>submit</button>
      </form>
      <DevTool control ={control}/>
    </div>
  )
}

export default NewForm