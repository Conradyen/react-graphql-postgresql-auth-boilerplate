import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage, FormikErrors } from "formik";
import { useMutation, gql } from "@apollo/client";
import { Wrapper } from "../../components/Wrapper";
import { useHistory } from "react-router-dom";

const REGISTER_MUTATION = gql`
  mutation registerMutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    )
  }
`;

export const Register: React.FC<{}> = () => {
  const [userRegister, { data }] = useMutation(REGISTER_MUTATION);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleFirstNameChange = (e: any) => {
    const { value } = e.target;
    setFirstName(value);
  };
  const handleLastNameChange = (e: any) => {
    const { value } = e.target;
    setLastName(value);
  };
  const handleEmailChange = (e: any) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handlePasswordChange = (e: any) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handelLoginSubmit = async (e: any) => {
    e.preventDefault();
    const response = await userRegister({
      variables: { firstName, lastName, email, password },
    });
    console.log(response);
    history.push("/login");
  };

  return (
    <Wrapper>
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </div>
      <div>
        <input
          type="LastName"
          name="LastName"
          placeholder="LastName"
          value={lastName}
          onChange={handleLastNameChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="email"
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <button onClick={handelLoginSubmit}>Register</button>
      </div>
    </Wrapper>
  );
};
