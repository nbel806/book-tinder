import DashboardCarousel from "~/dashboard/dashboardCarousel";
import type { Route } from "./+types/home";
import NavBar from "~/components/navbar";
import { redirect } from "react-router";
import { useAppSelector } from "~/store/hooks";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Swipe to match!" },
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
      <div className="min-h-screen flex items-center justify-center">
        <DashboardCarousel />
      </div>
    </div>
  );
}
