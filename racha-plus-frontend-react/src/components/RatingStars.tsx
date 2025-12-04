import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export function RatingStars({ 
  rating, 
  maxRating = 5, 
  size = "md",
  showValue = false 
}: RatingStarsProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    const filled = i <= Math.floor(rating);
    const partial = !filled && i === Math.ceil(rating) && rating % 1 !== 0;
    const partialWidth = partial ? `${(rating % 1) * 100}%` : "0%";

    stars.push(
      <span key={i} className="relative">
        <Star 
          className={cn(
            sizeClasses[size],
            "text-muted transition-colors"
          )}
        />
        <span 
          className="absolute inset-0 overflow-hidden"
          style={{ width: filled ? "100%" : partialWidth }}
        >
          <Star 
            className={cn(
              sizeClasses[size],
              "text-accent fill-accent"
            )}
          />
        </span>
      </span>
    );
  }

  return (
    <div className="flex items-center gap-0.5">
      {stars}
      {showValue && (
        <span className="ml-1.5 text-sm font-medium text-accent">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
