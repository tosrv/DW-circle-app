export interface UserPayload {
  id: number;
  username: string;
}

export type RegisterDTO = {
  username: string;
  fullname: string;
  email: string;
  password: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};
