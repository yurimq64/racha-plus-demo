import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthState, User, LoginResponse } from "@/types";
import api from "../services/api";

interface AuthContextType extends AuthState {
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    user: null,
    isAuthenticated: false,
  });

  const login = async (email: string, senha: string) => {
    try {
      // Faz o POST para o backend
      const response = await api.post<LoginResponse>('/auth/login', { email, senha });
      
      // O backend SÓ retorna o token. Não tente desestruturar id ou nome aqui!
      const { token } = response.data;
      
      // Criamos um objeto de usuário "provisório" com o que temos (o email)
      // O backend vai identificar o usuário pelo Token JWT nas próximas requisições
      const user: User = { 
        email: email,
        nome: email.split("@")[0] // Usamos a parte antes do @ como nome visual provisório
      };

      // Salva no localStorage
      localStorage.setItem("racha_token", token);
      localStorage.setItem("racha_user", JSON.stringify(user));
      
      // Atualiza o estado da aplicação
      setAuthState({ token, user, isAuthenticated: true });
      
    } catch (error) {
      console.error("Erro no login", error);
      throw error; // Repassa o erro para o componente de Login tratar
    }
  };

  const logout = () => {
    localStorage.removeItem("racha_token");
    localStorage.removeItem("racha_user");
    setAuthState({ token: null, user: null, isAuthenticated: false });
  };

  useEffect(() => {
    const token = localStorage.getItem("racha_token");
    const userStr = localStorage.getItem("racha_user");
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setAuthState({ token, user, isAuthenticated: true });
      } catch (e) {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}