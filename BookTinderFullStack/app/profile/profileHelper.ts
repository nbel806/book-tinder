import type { UserInfo } from "~/lib/types";

export const getUserInfo = (): UserInfo => {
  return {
    id: 1,
    name: "Nathan",
    email: "nathan@gmail.com",
    image: "",
    likedBooks: [],
    dislikedBooks: [],
  };
};
