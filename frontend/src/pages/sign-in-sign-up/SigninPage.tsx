import React from "react";

import Signin from "./components/Signin";

import "./SigninPage.scss";

const SigninSignup: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <div className="signin-signup-page">
        <Signin />
      </div>
    </React.Fragment>
  );
};

export default SigninSignup;
