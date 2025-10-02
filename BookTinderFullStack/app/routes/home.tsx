import { Welcome } from "~/welcome/welcome";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Book Tinder" },
    { name: "description", content: "Welcome to Book Tinder!" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Welcome />
    </div>
  );
}
