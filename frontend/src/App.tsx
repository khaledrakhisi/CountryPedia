import { Switch, Route } from "react-router-dom";
import { useCallback, useState } from "react";

import HomePage from './pages/home/HomePage';
import SigninSignup from "./pages/sign-in-sign-up/SigninPage";
import { AuthContext } from "./shared/context/Auth-context";

import "./App.css";
import { IUser } from "./shared/interfaces/user";

function App() {

  const [loggedinUser, setLoggedinUser] = useState<IUser|null>(null);
  const login = useCallback((user: IUser) => {
    setLoggedinUser(user);
  }, []);
  const logoff = useCallback(() => {
    setLoggedinUser(null);
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider
      value={{ loggedinUser : loggedinUser, login: login, logoff: logoff }}
    >
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/login" component={SigninSignup}/>
      </Switch>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
