export type BookInfo = {
  id: number;
  title: string;
  author: string;
  genres: string[];
  description: string;
  image: string;
  tags: string[];
};

export type UserInfo = {
  id: number;
  name: string;
  email: string;
  image: string;
  likedBooks: number[];
  dislikedBooks: number[];
};
