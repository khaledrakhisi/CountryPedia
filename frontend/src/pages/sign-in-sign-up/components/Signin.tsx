import React, { useContext, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import Button from "../../../shared/components/UIElements/Button";
import FormInput from "../../../shared/components/UIElements/FormInput";
import Modal from "../../../shared/components/UIElements/Modal";
import { AuthContext } from "../../../shared/context/Auth-context";
import sendAPIRequest from "../../../shared/graphql/sendAPIRequest";
import { IUser } from "../../../shared/interfaces/user";

import "./Signin.scss";

interface IProps extends RouteComponentProps {}
interface IState {
  email: string;
  password: string;
}

const Signin: React.FunctionComponent<IProps> = ({ history }) => {
  const _authContext = useContext(AuthContext);
  const [isExpanded, setIsExpanded] = useState(false);

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
      const loggedinUser: IUser = await sendAPIRequest("http://localhost:4000/login",
        { email: state.email, password: state.password },
        "POST"
      );
      
      if(!loggedinUser.token){
        console.log("not found");
        setIsExpanded(true);
        return;
      }

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

  const eh_close_button = () => {
    setIsExpanded(false);
  };

  return (
    <div className="sign-in">

      <Modal
        show={isExpanded}
        OnCancelHandle={eh_close_button}
        header="Login failed!"
        contentClass="modal_content"
        footerClass="modal_actions"
        // footer={<Button onClick={eh_close_button}>Close</Button>}
      >
        <div className="message-box">
          <div className="text">
            <span>It looks like the credentials are wrong! double check and try again.</span>
          </div>
          <div className="buttons">
            <Button id="btn_ok" onClick={eh_close_button}>
              Okay
            </Button>
          </div>
        </div>
      </Modal>

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
