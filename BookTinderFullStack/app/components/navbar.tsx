import { Book, BookOpenText } from "lucide-react";
import { Link, useLocation } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";

export default function NavBar() {
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", label: "Home" },
    { to: "/books", label: "Liked Books" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <NavigationMenu className="bg-slate-100 shadow-md rounded-xl rounded-t-none px-6 py-3 min-w-full">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <BookOpenText className="ml-4 mr-2 size-8" /> Book Tinder
        </h1>
        <NavigationMenuList className="flex gap-6 mr-4">
          {navItems.map((item) => (
            <NavigationMenuItem key={item.to}>
              <NavigationMenuLink asChild>
                <Link
                  to={item.to}
                  className={`px-4 py-2 rounded-xl text-lg font-medium transition-colors duration-200 
                  ${
                    location.pathname === item.to
                      ? "bg-pink-100 text-slate-800 shadow-sm hover:bg-pink-100"
                      : "text-slate-800 hover:bg-slate-200"
                  }`}
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
