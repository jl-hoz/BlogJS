import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const LoginForm = props => {

  const { handleSubmit, register, errors } = useForm();
  const [login, { loading, error, data }] = useMutation(LOGIN_USER);

  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);

  const onSubmit = values => {
    console.log(values);
    login({
      variables: {
        email: values.email,
        password: values.password,
      },
    }).then(data => {
      console.log(data);
      setEmail(values.email);
      setToken(data.login);
    })
  };

  return (
    <div>
      {token === null ?
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
        </form> : null}
    </div>


  );
};

export default LoginForm;