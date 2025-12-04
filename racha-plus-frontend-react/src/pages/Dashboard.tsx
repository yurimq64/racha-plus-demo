import { useState, useEffect } from "react";
import { Plus, Search, Loader2 } from "lucide-react"; // Adicionei Loader2
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/Sidebar";
import { RachaCard } from "@/components/RachaCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import api from "@/services/api";
import { Racha } from "@/types";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [rachas, setRachas] = useState<Racha[]>([]); // Estado para os rachas da API
  const [isLoading, setIsLoading] = useState(true);
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // Loading do botão de criar
  const [newRachaName, setNewRachaName] = useState("");
  const [newRachaSport, setNewRachaSport] = useState<"FUTEBOL" | "BASQUETE">("FUTEBOL");

  // Buscar rachas ao carregar a página
  const fetchRachas = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<Racha[]>("/rachas");
      setRachas(response.data);
    } catch (error) {
      console.error("Erro ao buscar rachas:", error);
      toast.error("Não foi possível carregar seus rachas.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRachas();
  }, []);

  const filteredRachas = rachas.filter((racha) =>
    racha.nome.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateRacha = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      // O backend espera { nome, esporte } conforme RachaDto
      await api.post("/rachas", {
        nome: newRachaName,
        esporte: newRachaSport
      });

      toast.success(`Racha "${newRachaName}" criado com sucesso!`);
      setIsCreateOpen(false);
      setNewRachaName("");
      setNewRachaSport("FUTEBOL");
      
      // Recarrega a lista para mostrar o novo racha
      fetchRachas();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar o racha. Tente novamente.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <main className="lg:ml-64 p-6 pt-20 lg:pt-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Meus Rachas</h1>
              <p className="text-muted-foreground mt-1">
                Gerencie seus grupos e organize os jogos
              </p>
            </div>
            
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button variant="default" size="lg" className="gap-2">
                  <Plus className="h-5 w-5" />
                  Criar Novo Racha
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle>Criar Novo Racha</DialogTitle>
                  <DialogDescription>
                    Configure um novo grupo para suas peladas
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateRacha} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="rachaName">Nome do Racha</Label>
                    <Input
                      id="rachaName"
                      placeholder="Ex: Pelada de Domingo"
                      value={newRachaName}
                      onChange={(e) => setNewRachaName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sport">Esporte</Label>
                    <Select 
                      value={newRachaSport} 
                      onValueChange={(v) => setNewRachaSport(v as "FUTEBOL" | "BASQUETE")}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FUTEBOL">Futebol</SelectItem>
                        <SelectItem value="BASQUETE">Basquete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full" disabled={isCreating}>
                    {isCreating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Criando...
                      </>
                    ) : (
                      "Criar Racha"
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar seus rachas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12"
            />
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRachas.map((racha) => (
                <RachaCard 
                  key={racha.id} 
                  racha={racha}
                  className="animate-slide-up"
                />
              ))}
            </div>
          )}

          {!isLoading && filteredRachas.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Nenhum racha encontrado. Crie o seu primeiro!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}