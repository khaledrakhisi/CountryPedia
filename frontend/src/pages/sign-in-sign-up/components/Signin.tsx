import React, { useContext, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import Button from "../../../shared/components/UIElements/Button";
import FormInput from "../../../shared/components/UIElements/FormInput";
import { AuthContext } from "../../../shared/context/Auth-context";
import { IUser } from "../../../shared/interfaces/user";

import "./Signin.scss";

interface IProps extends RouteComponentProps {}
interface IState {
  email: string;
  password: string;
}

const Signin: React.FunctionComponent<IProps> = ({ history }) => {
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

  const sendAPIRequest = async (url: string, params = {}, method = "POST", token = false) => {
    const response = await fetch(url, {
      method,
      mode: "cors",
      // headers: { "Content-Type": "application/json" },
      headers: buildHeaders(token),
      body: JSON.stringify(params),
    });
    return response.json();
  };

  const buildHeaders = (token = false): Headers => {
    let headers = new Headers();
    headers.append("Content-type", "application/json");
    if (token) {
      headers.append("authorization", `JWT ${token}`);
    }
    return headers;
  };

  const eh_submit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const loggedinUser: IUser = await sendAPIRequest("http://localhost:4000/login",
        { email: state.email, password: state.password },
        "POST"
      );
      _authContext.login(loggedinUser);

      window.localStorage.setItem("token", loggedinUser.token);

      setState({
        email: "",
        password: "",
      });

      history.push("/");
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
          <Button id="btn_cancel" type="button" inverted onClick={()=>{history.goBack()}}>
            back
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
