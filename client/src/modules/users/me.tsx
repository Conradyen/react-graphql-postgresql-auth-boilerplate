import React from "react";
import { useQuery } from "@apollo/client";
import { Wrapper } from "../../components/Wrapper";
import { Link } from "react-router-dom";
import { ME_QUERY } from "../../graphql/query/mequery";

export const Me: React.FC<{}> = () => {
  const { loading, error, data } = useQuery(ME_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;
  if (!data.me) {
    return (
      <Wrapper>
        <Link to="/login">Please log in</Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>{`first Name : ${data.me.firstName}`}</div>
      <div>{`last Name : ${data.me.lastName}`}</div>
    </Wrapper>
  );
};
