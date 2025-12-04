import { User, Mail, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { RatingStars } from "@/components/RatingStars";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:ml-64 p-6 pt-20 lg:pt-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Perfil</h1>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Informações do Jogador
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary-foreground">
                    {user?.nome?.charAt(0) || "U"}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user?.nome || "Jogador"}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-muted-foreground">Nota Geral:</span>
                    <RatingStars rating={4.2} size="md" showValue />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="grid gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <p className="font-medium">{user?.email || "usuario@exemplo.com"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Membro desde</p>
                    <p className="font-medium">Dezembro 2024</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="text-center p-4 rounded-xl bg-secondary">
                  <p className="text-3xl font-bold text-primary">6</p>
                  <p className="text-sm text-muted-foreground">Rachas</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-secondary">
                  <p className="text-3xl font-bold text-accent">24</p>
                  <p className="text-sm text-muted-foreground">Jogos</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-secondary">
                  <p className="text-3xl font-bold text-foreground">15</p>
                  <p className="text-sm text-muted-foreground">Vitórias</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
