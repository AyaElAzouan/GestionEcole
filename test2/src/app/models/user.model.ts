// export interface User {
//     idT?:number;
//     username: string;
//     password?: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     image: string;
//   }
  export class UserR {
    username: string='';
    password: string='';
    firstName: string='';
    lastName: string='';
    email: string='';
    image: string='';
  }
  export class UserL {
    idT?:number;
    password: string='';
    email: string='';
  }
  export class UserLogin {
    password: string='';
    email: string='';
  }
  
  export type UserRole = 'admin' | 'secretaire' | 'prof';

export interface User {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}
   
