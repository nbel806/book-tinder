import NavBar from "~/components/navbar";
import type { Route } from "./+types/home";
import LikedBooksGrid from "~/books/likedBooksGrid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Past Books" },
    { name: "description", content: "Welcome to seen books" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="min-h-screen flex items-center justify-center">
        <LikedBooksGrid />
      </div>
    </div>
  );
}
