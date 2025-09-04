import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { type CarouselApi } from "~/components/ui/carousel";
import BookCard from "./bookCard";
import { useEffect, useState, useCallback, useRef } from "react";
import type { BookInfo } from "~/lib/types";
import { loadBooks } from "./dashboardHelper";
import { Button } from "~/components/ui/button";
import { Check, X } from "lucide-react";

export default function DashboardCarousel() {
  const [books, setBooks] = useState<BookInfo[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const isLoadingRef = useRef(false);

  useEffect(() => {
    setBooks(loadBooks());
  }, []);

  const loadMore = useCallback(() => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    setBooks((prev) => {
      const more = loadBooks();
      isLoadingRef.current = false;
      return more.length ? [...prev, ...more] : prev;
    });
  }, []);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const index = api.selectedScrollSnap();
      const total = api.scrollSnapList().length;
      if (index >= total - 3) loadMore();
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, loadMore]);

  const handleNext = () => api?.scrollNext();

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-6">
      <Carousel className="w-full max-w-3xl" setApi={setApi}>
        <CarouselContent>
          {books.map((book, i) => (
            <CarouselItem key={i}>
              <BookCard {...book} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex gap-6 mt-2">
        <Button
          onClick={handleNext}
          className="size-16 bg-blue-100 hover:bg-blue-200 text-slate-800 p-2 rounded-full shadow-lg transition transform hover:scale-105"
        >
          <X />
        </Button>
        <Button
          className="size-16 bg-pink-100 hover:bg-pink-200 text-slate-800 p-2 rounded-full shadow-lg transition transform hover:scale-105"
          onClick={handleNext}
        >
          <Check />
        </Button>
      </div>
    </div>
  );
}
