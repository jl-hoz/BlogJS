import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => console.log(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input
        name="email"
        ref={register({
          required: "Required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "invalid email address"
          }
        })}
      />

      {errors.email && errors.email.message}
      
      <br></br>

      <label>Password</label>
      <input
        name="password"
        type="password"
        ref={register({
          validate: value => value !== "admin" || "Nice try!"
        })}
      />
      <br></br>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;