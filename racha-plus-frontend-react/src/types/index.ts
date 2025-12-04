// src/types/index.ts

export interface LoginResponse {
  token: string;
}

export interface User {
  id?: number;
  nome: string;
  email: string;
}

export interface Jogador {
  id: number;
  nome: string;
  email: string;
}

// Representa a tabela de ligação (MembroRacha)
export interface Membro {
  id: number;
  rating: number;
  jogador: Jogador; // O objeto jogador vem aninhado aqui
}

export interface Racha {
  id: number;
  nome: string;
  esporte: 'FUTEBOL' | 'BASQUETE';
  dono: User;
  membros: Membro[];
}

export interface Time {
  nome: string;
  forcaTotal: number;
  // O endpoint de balanceamento retorna uma lista simplificada de jogadores
  jogadores: { nome: string; rating: number }[];
}

export interface BalanceamentoResponse {
  diferencaForcaEntreTitulares: number;
  times: Time[];
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}