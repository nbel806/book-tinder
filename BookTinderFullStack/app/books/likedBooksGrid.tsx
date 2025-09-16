import type { BookInfo } from "~/lib/types";
import SmallBookCard from "./smallBookCard";
import { useEffect, useState } from "react";
import { loadBooks } from "~/dashboard/dashboardHelper";

export default function LikedBooksGrid() {
  const [books, setBooks] = useState<BookInfo[]>([]);
  useEffect(() => {
    setBooks(loadBooks());
  }, []);
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((bookInfo) => (
        <SmallBookCard {...bookInfo} />
      ))}
    </div>
  );
}
