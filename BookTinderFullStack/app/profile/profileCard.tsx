import { Card, CardContent } from "~/components/ui/card";
import type { UserInfo } from "~/lib/types";

export default function ProfileCard(userinfo: UserInfo) {
  return (
    <Card>
      <CardContent>
        <h1>Profile</h1>
      </CardContent>
    </Card>
  );
}
