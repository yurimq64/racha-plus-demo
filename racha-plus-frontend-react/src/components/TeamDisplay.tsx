import { Trophy, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingStars } from "@/components/RatingStars";
import { Time } from "@/types";
import { cn } from "@/lib/utils";

interface TeamDisplayProps {
  time: Time;
  index: number;
}

export function TeamDisplay({ time, index }: TeamDisplayProps) {
  const isTeam1 = index === 0;
  
  return (
    <Card 
      className={cn(
        "bg-card border-border overflow-hidden animate-slide-up",
        isTeam1 ? "border-t-primary" : "border-t-accent"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div 
        className={cn(
          "h-1 w-full",
          isTeam1 ? "bg-primary" : "bg-accent"
        )}
      />
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className={cn(
              "h-5 w-5",
              isTeam1 ? "text-primary" : "text-accent"
            )} />
            {time.nome}
          </CardTitle>
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold",
            isTeam1 
              ? "bg-primary/10 text-primary" 
              : "bg-accent/10 text-accent"
          )}>
            <Zap className="h-4 w-4" />
            Força Total: {time.forcaTotal}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {time.jogadores.map((jogador, idx) => (
          <div 
            key={jogador.id}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 animate-fade-in"
            style={{ animationDelay: `${(index * 100) + (idx * 50)}ms` }}
          >
            <span className="font-medium text-foreground">{jogador.nome}</span>
            <RatingStars rating={jogador.rating} size="sm" showValue />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
