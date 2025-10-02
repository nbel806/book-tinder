export type Book = {
  id: number;
  title: string;
  author: string;
  genres: Genre[];
  description: string;
  image: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  user_name: string;
  email: string;
  user_password: string;
};
