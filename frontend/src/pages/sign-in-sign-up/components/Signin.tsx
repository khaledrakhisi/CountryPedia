import React, { useContext, useState } from "react";

import Button from "../../../shared/components/UIElements/Button";
import FormInput from "../../../shared/components/UIElements/FormInput";
import { AuthContext } from "../../../shared/context/Auth-context";
import { IAuthentication } from "../../../shared/interfaces/authentication";

import "./Signin.scss";

interface IState {
  email: string;
  password: string;
}

const Signin: React.FunctionComponent = () => {

  const _authContext = useContext(AuthContext);

  const [state, setState] = useState<IState>({
    email: "",
    password: "",
  });  

  const eh_inputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;

    setState({
      ...state,
      [name]: value,
    });
  };

  const eh_submit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      // await auth.signInWithEmailAndPassword(this.state.email, this.state.password);  

       try {
        const response = await fetch("http://localhost:4000/login", {method: "POST", body: JSON.stringify({          
          email: state.email,
          password: state.password,
        }), headers: { "Content-Type": "application/json" }});
       
        const responseData = await response.json();
        console.log(responseData);
        _authContext.login(responseData);
      } catch (err) {
        console.error(err);
        
      }    

      // _authContext.login({
      //   id:1,
      //   name:"1",
      //   email:"1@1.com",
      //   password:"1",
      //   imageUrl:"",
      // })

      setState({
        email: "",
        password: "",
      });

    } catch (error) {
      console.error(error);
    }    
  };

    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={eh_submit}>
          <FormInput
            id="txt_email_signin"
            label="Email"
            name="email"
            type="email"
            onChange={eh_inputChange}
            value={state.email}
            required
          />
          <FormInput
            id="txt_password_signin"
            label="Password"
            name="password"
            type="password"
            onChange={eh_inputChange}
            value={state.password}
            required
          />

          <div className="buttons">
            <Button id="btn_signin" type="submit">
              sign in
            </Button>
            
          </div>
        </form>
      </div>
    );
}

export default Signin;
