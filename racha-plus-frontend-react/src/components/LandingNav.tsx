import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1">
          <h1 className="text-xl font-extrabold">
            <span className="text-gradient-primary">Racha</span>
            <span className="text-accent">+</span>
          </h1>
        </Link>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link to="/login">Entrar</Link>
          </Button>
          <Button variant="default" asChild>
            <Link to="/register">Cadastrar</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
