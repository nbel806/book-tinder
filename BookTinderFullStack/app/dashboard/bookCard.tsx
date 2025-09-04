import { Card, CardContent } from "~/components/ui/card";
import type { BookInfo } from "~/lib/types";

export default function BookCard(bookInfo: BookInfo) {
  return (
    <Card className="max-w-2xl mx-auto  rounded-2xl border border-gray-200 bg-slate-100 backdrop-blur-sm">
      <CardContent className="flex gap-6 p-6">
        {/* Book Cover */}
        <div className="flex-shrink-0">
          <img
            src={bookInfo.image || "~/../public/testCover.webp"}
            alt={bookInfo.title}
            className="w-50 object-cover rounded-lg shadow-md"
          />
        </div>
        {/* Book Details */}
        <div className="flex flex-col justify-between text-left">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {bookInfo.title}
            </h1>
            <h2 className="text-lg text-gray-600 mb-1">{bookInfo.author}</h2>
            <h3 className="text-sm text-pink-500 font-medium mb-4">
              {bookInfo.genre}
            </h3>
            <p className="text-gray-700 line-clamp-4">{bookInfo.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
