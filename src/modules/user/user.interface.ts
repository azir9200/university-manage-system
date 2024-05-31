import { string } from "zod"

export type TRUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
  };


export type TUser = {
    name: TRUserName,
    id: string,
    password: string;
    needsPasswordChange: boolean;
    role: 'admin' | 'student' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
};
// export type  NewUser = {
//     password: string;
//     role: string;
//     id: string;
// }