import NavBar from "~/components/navbar";
import type { Route } from "./+types/home";
import ProfileCard from "~/profile/profileCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Profile" },
    { name: "description", content: "Welcome to your profile" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="min-h-screen flex items-center justify-center">
        <ProfileCard />
      </div>
    </div>
  );
}
