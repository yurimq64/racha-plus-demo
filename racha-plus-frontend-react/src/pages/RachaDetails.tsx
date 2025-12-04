import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Shuffle, Crown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/Sidebar";
import { MemberList } from "@/components/MemberList";
import { TeamDisplay } from "@/components/TeamDisplay";
import { SportIcon } from "@/components/SportIcon";
import { mockRachas, mockMembros, balanceTimes } from "@/data/mockData";
import { BalanceamentoResponse } from "@/types";
import { toast } from "sonner";

export default function RachaDetails() {
  const { id } = useParams<{ id: string }>();
  const [balanceResult, setBalanceResult] = useState<BalanceamentoResponse | null>(null);
  const [isBalancing, setIsBalancing] = useState(false);

  const racha = mockRachas.find((r) => r.id === Number(id));
  const membros = mockMembros[Number(id)] || [];

  if (!racha) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Racha não encontrado</h1>
          <Button asChild>
            <Link to="/dashboard">Voltar</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleBalance = () => {
    setIsBalancing(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = balanceTimes(membros);
      setBalanceResult(result);
      setIsBalancing(false);
      toast.success("Times sorteados com sucesso!");
    }, 800);
  };

  const isBasket = racha.esporte === "BASQUETE";

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:ml-64 p-6 pt-20 lg:pt-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Meus Rachas
          </Link>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div 
                className={`p-4 rounded-2xl ${
                  isBasket 
                    ? "bg-accent/10 text-accent" 
                    : "bg-primary/10 text-primary"
                }`}
              >
                <SportIcon sport={racha.esporte} size="lg" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{racha.nome}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <Badge 
                    variant="secondary"
                    className={isBasket ? "text-accent" : "text-primary"}
                  >
                    {isBasket ? "Basquete" : "Futebol"}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Crown className="h-4 w-4 text-accent" />
                    <span>{racha.dono.nome}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{membros.length} jogadores</span>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleBalance}
              variant={isBasket ? "accent" : "default"}
              size="lg"
              className="gap-2"
              disabled={isBalancing || membros.length < 2}
            >
              {isBalancing ? (
                <span className="animate-pulse">Sorteando...</span>
              ) : (
                <>
                  <Shuffle className="h-5 w-5" />
                  Sortear Times
                </>
              )}
            </Button>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Members */}
            <div>
              <MemberList membros={membros} />
            </div>

            {/* Right Column - Teams */}
            <div className="space-y-6">
              {balanceResult ? (
                <>
                  {/* Difference Badge */}
                  <div className="flex items-center justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
                      <span className="text-sm text-muted-foreground">
                        Diferença entre times:
                      </span>
                      <span className={`font-bold ${
                        balanceResult.diferencaForcaEntreTitulares < 1 
                          ? "text-primary" 
                          : balanceResult.diferencaForcaEntreTitulares < 2 
                            ? "text-accent"
                            : "text-destructive"
                      }`}>
                        {balanceResult.diferencaForcaEntreTitulares.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Teams */}
                  <div className="grid gap-6">
                    {balanceResult.times.map((time, idx) => (
                      <TeamDisplay key={time.nome} time={time} index={idx} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-64 rounded-2xl border border-dashed border-border bg-secondary/30">
                  <div className="text-center">
                    <Shuffle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Clique em "Sortear Times" para equilibrar os times
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
