import { Link } from "react-router-dom";
import { Users, Crown } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SportIcon } from "@/components/SportIcon";
import { Racha } from "@/types";
import { cn } from "@/lib/utils";

interface RachaCardProps {
  racha: Racha;
  className?: string;
}

export function RachaCard({ racha, className }: RachaCardProps) {
  // O backend deve retornar a lista de membros dentro do objeto Racha
  // Caso venha null ou undefined, usamos 0.
  // Você precisará adicionar 'membros?: any[]' na interface Racha no types/index.ts se ainda não tiver
  const membrosCount = (racha as any).membros?.length || 0; 
  
  const isBasket = racha.esporte === "BASQUETE";

  return (
    <Link to={`/racha/${racha.id}`}>
      <Card 
        className={cn(
          "group card-hover cursor-pointer bg-card border-border overflow-hidden",
          className
        )}
      >
        <div 
          className={cn(
            "h-1.5 w-full transition-all duration-300",
            isBasket ? "bg-accent" : "bg-primary"
          )}
        />
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div 
                className={cn(
                  "p-2.5 rounded-xl transition-colors",
                  isBasket 
                    ? "bg-accent/10 text-accent group-hover:bg-accent/20" 
                    : "bg-primary/10 text-primary group-hover:bg-primary/20"
                )}
              >
                <SportIcon sport={racha.esporte} size="md" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  {racha.nome}
                </h3>
                <Badge 
                  variant="secondary" 
                  className="mt-1 text-xs font-medium"
                >
                  {isBasket ? "Basquete" : "Futebol"}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Crown className="h-4 w-4 text-accent" />
              {/* O backend retorna o objeto dono completo */}
              <span>{racha.dono.nome}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span>{membrosCount} jogadores</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}