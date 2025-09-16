import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";
import type { BookInfo } from "~/lib/types";

export default function SmallBookCard(bookInfo: BookInfo) {
  return (
    <Card className="w-full max-w-sm bg-slate-50 flex flex-row p-2">
      <div className="flex-shrink-0">
        <img
          src={bookInfo.image || "~/../public/testCover.webp"}
          alt={bookInfo.title}
          className="w-20 object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="flex flex-col justify-between text-left">
        <div>
          <CardTitle>{bookInfo.title}</CardTitle>
          <CardDescription>{bookInfo.author}</CardDescription>
          <CardDescription className="text-pink-500">
            {bookInfo.genre}
          </CardDescription>
        </div>
        <CardAction>
          <Button className="w-full shadow-md bg-pink-100 hover:bg-pink-200 text-black transition-all">
            Remove
          </Button>
        </CardAction>
      </div>
    </Card>
  );
}
