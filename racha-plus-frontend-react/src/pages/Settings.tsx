import { Bell, Shield, Palette } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sidebar } from "@/components/Sidebar";

export default function Settings() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:ml-64 p-6 pt-20 lg:pt-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Configurações</h1>

          <div className="space-y-6">
            {/* Notifications */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notificações
                </CardTitle>
                <CardDescription>
                  Gerencie como você recebe notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="game-reminders" className="flex flex-col gap-1">
                    <span>Lembretes de Jogos</span>
                    <span className="text-sm text-muted-foreground font-normal">
                      Seja notificado antes dos jogos agendados
                    </span>
                  </Label>
                  <Switch id="game-reminders" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="team-updates" className="flex flex-col gap-1">
                    <span>Atualizações de Times</span>
                    <span className="text-sm text-muted-foreground font-normal">
                      Notificações quando os times são sorteados
                    </span>
                  </Label>
                  <Switch id="team-updates" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="invites" className="flex flex-col gap-1">
                    <span>Convites para Rachas</span>
                    <span className="text-sm text-muted-foreground font-normal">
                      Seja notificado quando convidado para um novo racha
                    </span>
                  </Label>
                  <Switch id="invites" defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Privacidade
                </CardTitle>
                <CardDescription>
                  Controle suas configurações de privacidade
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-rating" className="flex flex-col gap-1">
                    <span>Mostrar Nota</span>
                    <span className="text-sm text-muted-foreground font-normal">
                      Permitir que outros jogadores vejam sua nota
                    </span>
                  </Label>
                  <Switch id="show-rating" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="discoverable" className="flex flex-col gap-1">
                    <span>Ser Encontrado</span>
                    <span className="text-sm text-muted-foreground font-normal">
                      Permitir que outros te encontrem pelo e-mail
                    </span>
                  </Label>
                  <Switch id="discoverable" />
                </div>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  Aparência
                </CardTitle>
                <CardDescription>
                  Personalize a aparência do app
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Label htmlFor="animations" className="flex flex-col gap-1">
                    <span>Animações</span>
                    <span className="text-sm text-muted-foreground font-normal">
                      Habilitar animações e transições suaves
                    </span>
                  </Label>
                  <Switch id="animations" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
