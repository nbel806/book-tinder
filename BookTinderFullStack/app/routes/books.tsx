import NavBar from "~/components/navbar";
import type { Route } from "./+types/home";
import LikedBooksGrid from "~/books/likedBooksGrid";
import { useAppSelector } from "~/store/hooks";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Past Books" },
    { name: "description", content: "Welcome to seen books" },
  ];
}
export async function loader({ request }: Route.LoaderArgs) {
  const user = useAppSelector((state) => state.user);

  if (!user) {
    throw redirect("/login");
  }
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="min-h-screen flex-row items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800 my-8 text-center">
          Books you matched with
        </h1>
        <LikedBooksGrid />
      </div>
    </div>
  );
}
