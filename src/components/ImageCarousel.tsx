import React, { useState, useRef, useEffect, FC } from "react";
import Image from "next/image";
import cn from "clsx";
import { Body, Color, ProductVariant } from "@/types/Product";

type ImageCarouselProps = {
  products: ProductVariant[];
  selectedColor: Color;
};

export const ImageCarousel: FC<ImageCarouselProps> = ({
  products,
  selectedColor,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const slides = products.map((m) => m.images.map((m) => m)).flat();

  useEffect(() => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth;
      const scrollPosition = (scrollWidth / slides.length) * photoIndex;
      scrollRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  }, [photoIndex, slides.length]);

  useEffect(() => {
    setPhotoIndex(0);
  }, [selectedColor]);

  const nextSlide = () => {
    if (photoIndex === slides.length - 1) {
      return;
    }
    setPhotoIndex((photoIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    if (photoIndex === 0) {
      return;
    }
    setPhotoIndex((photoIndex - 1) % slides.length);
  };

  return (
    <div className="flex w-full min-w-[448px] items-center justify-center">
      <div className="flex flex-col gap-16">
        <div>
          <Image
            alt="Picture of the author"
            key={0}
            className="rounded-md object-cover mx-auto"
            src={slides[photoIndex] || ""}
            width={448}
            height={448}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className={cn({ "cursor-not-allowed": photoIndex === 0 })}
            disabled={photoIndex === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <div
            className={cn(
              "flex gap-10 max-w-md overflow-x-auto scrollbar-hide"
            )}
            ref={scrollRef}
          >
            {slides.map((m, index) => (
              <Image
                alt="Picture of the author"
                onClick={() => {
                  setPhotoIndex(index);
                }}
                key={index}
                className={cn(
                  "rounded-md object-cover cursor-pointer shadow-md",
                  {
                    "border-2 border-blue-500": photoIndex === index,
                  }
                )}
                src={m}
                width={120}
                height={100}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className={cn({
              "cursor-not-allowed": photoIndex === slides.length - 1,
            })}
            disabled={photoIndex === slides.length - 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
