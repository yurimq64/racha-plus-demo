// Atualizado para refletir o backend atual

export interface LoginResponse {
  token: string;
}

export interface User {
  id?: number; // Opcional, pois o backend não retorna no login
  nome?: string; // Opcional
  email: string;
}

export interface Racha {
  id: number;
  nome: string;
  esporte: 'FUTEBOL' | 'BASQUETE';
  dono: User;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

// ... mantenha as outras interfaces (BalanceamentoResponse, Time, Membro)
export interface BalanceamentoResponse {
  diferencaForcaEntreTitulares: number;
  times: Time[];
}

export interface Time {
  nome: string;
  forcaTotal: number;
  jogadores: Membro[];
}

export interface Membro {
  id: number;
  nome: string;
  rating: number; 
}