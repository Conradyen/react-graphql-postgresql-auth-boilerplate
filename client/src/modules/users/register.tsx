import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage, FormikErrors } from "formik";
import { useMutation, gql } from "@apollo/client";
import { Wrapper } from "../../components/Wrapper";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl } from "react-bootstrap";
import { Label, Paper, Button } from "../../components";

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
  const [userRegister] = useMutation(REGISTER_MUTATION);
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
      <Paper>
        <form onSubmit={handelLoginSubmit}>
          <FormGroup controlId="firstName">
            <Label>First Name</Label>
            <FormControl
              autoFocus
              type="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </FormGroup>
          <FormGroup controlId="lastName">
            <Label>Last Name</Label>
            <FormControl
              value={lastName}
              onChange={handleLastNameChange}
              type="lastName"
            />
          </FormGroup>
          <FormGroup controlId="email">
            <Label>Email</Label>
            <FormControl
              autoFocus
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <Label>Password</Label>
            <FormControl
              value={password}
              onChange={handlePasswordChange}
              type="password"
            />
          </FormGroup>
          <Button>Login</Button>
        </form>
      </Paper>
    </Wrapper>
  );
};
