import React from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const REGISTER_AUTHOR = gql`
    mutation register(
        $name: String!
        $email: String!
        $password: String!
    ){
        register(
            registerInput: {
                name: $name
                email: $email
                password: $password
            }
        ){
            id email username
        }
    }
`;

const RegisterForm = () => {

    const { handleSubmit, register, errors } = useForm();
    const [author, setAuthor] = useState();

    const [addUser, {loading}] = useMutation(REGISTER_AUTHOR, {
        update(proxy, result){
            console.log(result);
        },
        variables: author
    })

    const onSubmit = values => {
        console.log(values);
        setAuthor(values);
        addUser();
    };

    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <label>Name: </label>
            <input
                name="name"
                type="text"
                ref={register}
                placeholder="Enter your name"
            />

            <br></br>

            <label>Email: </label>
            <input
                name="email"
                placeholder="Enter your email"
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

            <label>Password: </label>
            <input
                name="password"
                type="password"
                ref={register}
                placeholder="Enter your password"
            />

            <br></br>

            <button type="submit">Submit</button>
        </form>
    );
};

export default RegisterForm;