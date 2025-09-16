import NavBar from "~/components/navbar";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Past Books" },
    { name: "description", content: "Welcome to seen books" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-100 via-slate-300 to-blue-100">
      <NavBar />
      <div className="min-h-screen flex items-center justify-center"></div>
    </div>
  );
}
