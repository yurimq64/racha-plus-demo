import { Link } from "react-router-dom";
import { ArrowRight, Users, Shuffle, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingNav } from "@/components/LandingNav";
import { SportIcon } from "@/components/SportIcon";

const features = [
  {
    icon: Users,
    title: "Organize Grupos",
    description: "Crie e gerencie seus Rachas com facilidade. Convide amigos e acompanhe todos os jogos.",
  },
  {
    icon: Shuffle,
    title: "Sortear Times",
    description: "Nosso algoritmo inteligente cria times equilibrados baseado nas notas dos jogadores.",
  },
  {
    icon: Trophy,
    title: "Acompanhe Desempenho",
    description: "Avalie jogadores e acompanhe a evolução ao longo do tempo para melhorar seus jogos.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              O jeito inteligente de jogar
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-slide-up">
            Organize seus rachas{" "}
            <br className="hidden md:block" />
            <span className="text-gradient-primary">como um profissional</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "100ms" }}>
            Crie grupos, convide jogadores, sorteie times automaticamente e leve 
            suas peladas para o próximo nível. Futebol ou basquete - a gente resolve.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/register">
                Começar Grátis
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/login">
                Já tenho conta
              </Link>
            </Button>
          </div>

          {/* Sport Icons */}
          <div className="flex items-center justify-center gap-6 mt-16 animate-float">
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
              <SportIcon sport="FUTEBOL" size="lg" className="text-primary" />
            </div>
            <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20">
              <SportIcon sport="BASQUETE" size="lg" className="text-accent" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tudo que você precisa
            </h2>
            <p className="text-muted-foreground text-lg">
              Ferramentas simples para melhorar seus jogos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={feature.title}
                className="p-8 rounded-2xl bg-card border border-border card-hover animate-slide-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="h-14 w-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto p-10 rounded-3xl gradient-dark border border-border">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para elevar o nível dos seus jogos?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Junte-se a milhares de jogadores organizando peladas melhores.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/register">
                Começar Agora - É Grátis
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2024 Racha+. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-gradient-primary">Racha</span>
            <span className="text-sm font-bold text-accent">+</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
