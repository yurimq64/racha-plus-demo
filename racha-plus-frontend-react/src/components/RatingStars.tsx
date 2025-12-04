import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  readonly?: boolean;
  onChange?: (value: number) => void;
}

export function RatingStars({ 
  rating, 
  maxRating = 5, 
  size = "md",
  showValue = false,
  readonly = true,
  onChange
}: RatingStarsProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  // Valor a ser exibido: o que está sendo passado (hover) ou o valor fixo (rating)
  const displayValue = hoverValue !== null ? hoverValue : rating;

  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    // Lógica para preenchimento (cheia, parcial ou vazia)
    const filled = i <= Math.floor(displayValue);
    const partial = !filled && i === Math.ceil(displayValue) && displayValue % 1 !== 0;
    const partialWidth = partial ? `${(displayValue % 1) * 100}%` : "0%";

    stars.push(
      <button
        key={i}
        type="button"
        disabled={readonly}
        className={cn(
          "relative outline-none focus-visible:scale-110 transition-transform",
          !readonly && "cursor-pointer hover:scale-110"
        )}
        onMouseEnter={() => !readonly && setHoverValue(i)}
        onMouseLeave={() => !readonly && setHoverValue(null)}
        onClick={() => !readonly && onChange && onChange(i)}
      >
        {/* Estrela de fundo (vazia/cinza) */}
        <Star 
          className={cn(
            sizeClasses[size],
            "text-muted transition-colors"
          )}
        />
        
        {/* Estrela de frente (preenchida/colorida) - usa clippath para parciais */}
        <span 
          className="absolute inset-0 overflow-hidden text-left"
          style={{ width: filled || (hoverValue !== null && i <= hoverValue) ? "100%" : partialWidth }}
        >
          <Star 
            className={cn(
              sizeClasses[size],
              "text-accent fill-accent"
            )}
          />
        </span>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-0.5">
      <div className="flex" onMouseLeave={() => !readonly && setHoverValue(null)}>
        {stars}
      </div>
      {showValue && (
        <span className="ml-1.5 text-sm font-medium text-accent">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}