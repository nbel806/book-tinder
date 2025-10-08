import NavBar from "~/components/navbar";
import type { Route } from "./+types/home";
import ProfileCard from "~/profile/profileCard";
import { useAppSelector } from "~/store/hooks";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Profile" },
    { name: "description", content: "Welcome to your profile" },
  ];
}
export async function loader({ request }: Route.LoaderArgs) {
  const token = useAppSelector((state) => state.token);

  if (!token) {
    throw redirect("/login");
  }
  if (await verifyToken(token)) {
    return { token };
  } else {
    throw redirect("/login");
  }
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
