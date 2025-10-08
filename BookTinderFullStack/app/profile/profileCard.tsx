import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { UserInfo } from "~/lib/types";
import { getUserInfo } from "./profileHelper";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAppSelector } from "~/store/hooks";
import type { User } from "server/types/types";

export default function ProfileCard() {
  const user = useAppSelector((state) => state.user);
  const [userinfo, setUserinfo] = useState<User>({
    id: 0,
    user_name: "temp",
    email: "tempgmail.com",
    user_password: "temp",
  });
  useEffect(() => {
    user && setUserinfo(user);
  }, []);
  return (
    <Card className="w-full max-w-sm bg-slate-50">
      <div className="flex flex-row justify-between pr-4">
        <div className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-md text-gray-600">Name:{userinfo.user_name}</h1>
            <h1 className="text-md text-gray-600">Email:{userinfo.email}</h1>
          </CardContent>
        </div>
        <Avatar className="w-16 h-16">
          <AvatarFallback className="bg-pink-100 text-lg">
            {userinfo.user_name[0]}
          </AvatarFallback>
        </Avatar>
      </div>
      <CardFooter>
        <Link to="/">
          <Button>Log Out</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
