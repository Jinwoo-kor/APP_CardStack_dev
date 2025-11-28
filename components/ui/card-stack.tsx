"use client";
import { cn } from "@/lib/utils";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const CardStackContext = createContext<{
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  itemsLength: number;
} | null>(null);

export const CardStackProvider = ({
  children,
  activeIndex,
  setActiveIndex,
  itemsLength,
}: {
  children: React.ReactNode;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  itemsLength: number;
}) => {
  return (
    <CardStackContext.Provider value={{ activeIndex, setActiveIndex, itemsLength }}>
      {children}
    </CardStackContext.Provider>
  );
};

export const useCardStack = () => {
  const context = useContext(CardStackContext);
  if (!context) {
    throw new Error("useCardStack must be used within CardStackProvider");
  }
  return context;
};

export const CardStack = ({
  items,
  offset = 10,
  scaleFactor = 0.06,
  className,
}: {
  items: React.ReactNode[];
  offset?: number;
  scaleFactor?: number;
  className?: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <CardStackProvider activeIndex={activeIndex} setActiveIndex={setActiveIndex} itemsLength={items.length}>
      <div
        className={cn("relative h-60 w-60 md:h-60 md:w-96", className)}
        style={{
          perspective: "1000px",
        }}
      >
        {items.map((item, index) => (
          <CardStackItem
            key={"card-stack" + index}
            index={index}
            offset={offset}
            scaleFactor={scaleFactor}
          >
            {item}
          </CardStackItem>
        ))}
      </div>
    </CardStackProvider>
  );
};

export const CardStackItem = ({
  index,
  children,
  offset = 10,
  scaleFactor = 0.06,
}: {
  index: number;
  children: React.ReactNode;
  offset?: number;
  scaleFactor?: number;
}) => {
  const { activeIndex, setActiveIndex, itemsLength } = useCardStack();
  const [isHovered, setIsHovered] = useState(false);

  const isActive = index === activeIndex;
  const zIndex = itemsLength - Math.abs(index - activeIndex);
  const offsetY = (index - activeIndex) * offset;
  const scale = 1 - Math.abs(index - activeIndex) * scaleFactor;
  const opacity =
    Math.abs(index - activeIndex) >= itemsLength - 1 ? 0 : 1;

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    if (isActive && isHovered) {
      card.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isActive, isHovered]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "absolute inset-0 flex origin-center flex-col justify-center rounded-3xl bg-white p-8 shadow-xl transition-all duration-300 ease-out dark:bg-neutral-900",
        isActive && "cursor-pointer"
      )}
      style={{
        zIndex,
        transform: `translateY(${offsetY}px) scale(${scale})`,
        opacity,
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        setActiveIndex(index);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {children}
    </div>
  );
};

