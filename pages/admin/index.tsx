import { GetServerSideProps } from "next";
import React from "react";

const HomeAdmin = () => {
  return <div>HomeAdmin</div>;
};

export default HomeAdmin;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies["token"];

  if (token) {
    return {
      props: {},
    };
  }

  return {
    props: {},
    redirect: {
      destination: "/admin/login",
      permanent: false,
    },
  };
};
