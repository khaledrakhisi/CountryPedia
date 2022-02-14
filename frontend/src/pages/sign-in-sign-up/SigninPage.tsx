import React from "react";
import { Route } from "react-router-dom";

import Signin from "./components/Signin";

import "./SigninPage.scss";

const SigninSignup: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <div className="signin-signup-page">
        
        <Route exact path="/login" component={Signin}/>        
      </div>
    </React.Fragment>
  );
};

export default SigninSignup;
