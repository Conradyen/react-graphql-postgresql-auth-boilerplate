import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage, FormikErrors } from "formik";
import { useMutation, gql } from "@apollo/client";
import { Wrapper } from "../../components/Wrapper";
import { useHistory } from "react-router-dom";
import { ME_QUERY } from "../../graphql/query/mequery";
import { FormGroup, FormControl } from "react-bootstrap";
import { Label, Paper, Button } from "../../components";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const Login: React.FC<{}> = () => {
  const [userLogin] = useMutation(LOGIN_MUTATION, {
    update(cache, { data }) {
      if (!data || !data.login) return;
      console.log(data.login);
      cache.writeQuery({
        query: ME_QUERY,
        data: { me: data.login },
      });
    },
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

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
    const response = await userLogin({ variables: { email, password } });
    console.log(response);
    history.push("/me");
  };

  return (
    <Wrapper>
      <Paper>
        <form onSubmit={handelLoginSubmit}>
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
