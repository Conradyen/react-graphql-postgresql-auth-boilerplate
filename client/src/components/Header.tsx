import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { ME_QUERY } from "../graphql/query/mequery";
import { WrapperRow } from "./Wrapper";

const Container = styled.div`
  height: 50;
  width: 100%;
  background-color: #f4f4f4;
  display: flex;
  /* flex-direction: row; */
  justify-content: space-around;
  padding: 10;
  align-items: "center";
`;

export const Header = () => {
  const { loading, error, data } = useQuery(ME_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  return (
    <Container>
      <Link to="/">
        <h2>react login</h2>
      </Link>
      {!data.me ? (
        <div>
          <div>
            <Link to="/login">login</Link>
          </div>
          <div>
            <Link to="/register">register</Link>
          </div>
        </div>
      ) : (
        <div>
          <Link to="/me">me</Link>
        </div>
      )}
    </Container>
  );
};
