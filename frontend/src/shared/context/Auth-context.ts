import { createContext } from "react";

import { IAuthentication } from "../interfaces/authentication";

export const AuthContext = createContext<IAuthentication>({
  loggedinUser : null,
  login: () => {},
  logoff: () => {},
});
