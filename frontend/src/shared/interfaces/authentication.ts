import { IUser } from "./user";

export interface IAuthentication{
    loggedinUser : IUser | null,
    login: (user: IUser) => void,
    logoff: () => void,
}