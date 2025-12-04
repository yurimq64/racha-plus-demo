import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingStars } from "@/components/RatingStars";
import { useAuth } from "@/contexts/AuthContext"; // Importar para verificar o usuário logado

export interface MembroDisplay {
  id: number;
  nome: string;
  rating: number;
  email?: string; // Adicionei email opcional para verificar identidade
}

interface MemberListProps {
  membros: MembroDisplay[];
  onRateMember?: (id: number, newRating: number) => void;
}

export function MemberList({ membros, onRateMember }: MemberListProps) {
  const { user } = useAuth();
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
        {sortedMembros.map((membro, idx) => {
          // Verifica se é o próprio usuário (evita auto-avaliação)
          // Assumindo que temos o email ou podemos comparar pelo nome provisoriamente
          const isMe = user?.email === membro.email || user?.nome === membro.nome;

          return (
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
              
              <div className="flex flex-col items-end">
                <RatingStars 
                  rating={membro.rating} 
                  size="sm" 
                  showValue 
                  readonly={!onRateMember || isMe} // Só permite avaliar se não for ele mesmo
                  onChange={(val) => onRateMember && onRateMember(membro.id, val)}
                />
                {!isMe && onRateMember && (
                  <span className="text-[10px] text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Avaliar
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}