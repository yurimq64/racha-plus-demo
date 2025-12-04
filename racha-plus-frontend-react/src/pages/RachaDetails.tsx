import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Shuffle, Crown, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/Sidebar";
import { MemberList } from "@/components/MemberList";
import { TeamDisplay } from "@/components/TeamDisplay";
import { SportIcon } from "@/components/SportIcon";
import { toast } from "sonner";
import api from "@/services/api";
import { Racha, BalanceamentoResponse } from "@/types";

export default function RachaDetails() {
  const { id } = useParams<{ id: string }>();
  
  // Estados necessários
  const [racha, setRacha] = useState<Racha | null>(null);
  const [balanceResult, setBalanceResult] = useState<BalanceamentoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBalancing, setIsBalancing] = useState(false);

  // Função para buscar dados do Racha
  const fetchRacha = async () => {
    try {
      // Como optamos por não criar o endpoint específico de ID no backend ainda,
      // buscamos todos e filtramos localmente.
      const response = await api.get<Racha[]>("/rachas");
      const foundRacha = response.data.find((r) => r.id === Number(id));
      
      if (foundRacha) {
        setRacha(foundRacha);
      } else {
        toast.error("Racha não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao carregar rachas", error);
      toast.error("Erro ao carregar detalhes.");
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar dados ao montar o componente
  useEffect(() => {
    if (id) fetchRacha();
  }, [id]);

  // Função para sortear times
  const handleBalance = async () => {
    if (!id) return;
    setIsBalancing(true);
    
    try {
      const response = await api.get<BalanceamentoResponse>(`/rachas/${id}/balancear`);
      setBalanceResult(response.data);
      toast.success("Times sorteados com sucesso!");
    } catch (error) {
      console.error("Erro ao sortear", error);
      toast.error("Erro ao sortear times. Verifique se há jogadores suficientes.");
    } finally {
      setIsBalancing(false);
    }
  };

  // Função para avaliar membro
  const handleRateMember = async (jogadorId: number, novaNota: number) => {
    if (!id) return;

    const toastId = toast.loading("Enviando avaliação...");

    try {
      await api.post(`/avaliacoes/racha/${id}/jogador/${jogadorId}`, {
        novaNota: novaNota
      });

      toast.success("Avaliação enviada!", { id: toastId });
      
      // Recarrega os dados para atualizar a média na tela
      fetchRacha();
      
    } catch (error: any) {
      console.error("Erro ao avaliar", error);
      const msg = error.response?.data?.message || "Erro ao salvar avaliação.";
      toast.error(msg, { id: toastId });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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

  const isBasket = racha.esporte === "BASQUETE";
  const membros = racha.membros || [];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:ml-64 p-6 pt-20 lg:pt-6">
        <div className="max-w-7xl mx-auto">
          {/* Botão Voltar */}
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Meus Rachas
          </Link>

          {/* Cabeçalho */}
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
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sorteando...
                </>
              ) : (
                <>
                  <Shuffle className="h-5 w-5" />
                  Sortear Times
                </>
              )}
            </Button>
          </div>

          {/* Grid de Conteúdo */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Coluna Esquerda - Lista de Membros */}
            <div>
              <MemberList 
                membros={membros.map(m => ({
                  id: m.jogador.id, // ID do jogador para a API
                  nome: m.jogador.nome,
                  email: m.jogador.email,
                  rating: m.rating
                }))} 
                onRateMember={handleRateMember}
              />
            </div>

            {/* Coluna Direita - Times Sorteados */}
            <div className="space-y-6">
              {balanceResult ? (
                <>
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

                  <div className="grid gap-6">
                    {balanceResult.times.map((time, idx) => (
                      <TeamDisplay 
                        key={time.nome} 
                        time={{
                            nome: time.nome,
                            forcaTotal: time.forcaTotal,
                            jogadores: time.jogadores.map((j, i) => ({ ...j, id: i })) 
                        }} 
                        index={idx} 
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-64 rounded-2xl border border-dashed border-border bg-secondary/30">
                  <div className="text-center">
                    <Shuffle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Clique em "Sortear Times" para equilibrar os times com base nos dados do servidor.
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