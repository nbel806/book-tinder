import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { type CarouselApi } from "~/components/ui/carousel";
import BookCard from "./bookCard";
import { useEffect, useState, useCallback, useRef } from "react";
import type { BookInfo } from "~/lib/types";
import { loadBooks } from "./dashboardHelper";

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

  return (
    <Carousel className="w-full max-w-3xl" setApi={setApi}>
      <CarouselContent>
        {books.map((book, i) => (
          <CarouselItem key={i}>
            <BookCard {...book} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
