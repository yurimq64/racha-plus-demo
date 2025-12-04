import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingStars } from "@/components/RatingStars";
import { Membro } from "@/types";

interface MemberListProps {
  membros: Membro[];
}

export function MemberList({ membros }: MemberListProps) {
  const sortedMembros = [...membros].sort((a, b) => b.rating - a.rating);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-5 w-5 text-primary" />
          Jogadores ({membros.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 max-h-[500px] overflow-y-auto">
        {sortedMembros.map((membro, idx) => (
          <div 
            key={membro.id}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors animate-fade-in"
            style={{ animationDelay: `${idx * 30}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">
                  {membro.nome.charAt(0)}
                </span>
              </div>
              <span className="font-medium text-foreground">{membro.nome}</span>
            </div>
            <RatingStars rating={membro.rating} size="sm" showValue />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
