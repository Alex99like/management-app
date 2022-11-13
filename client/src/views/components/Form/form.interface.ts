export interface IRegister {
  name: string;
  login: string;
  password: string;
}

export interface IRegisterRes extends Omit<IRegister, 'password'> {
  id: string;
}

export interface ILogin {
  login: string;
  password: string;
}

export interface ILoginRes {
  token: string;
}
