export interface IUser{
    id: number,
    token: string,
    name: string,
    email: string,
    password?: string,    
    imageUrl: string,    
}