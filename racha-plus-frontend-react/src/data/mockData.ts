import { Racha, Membro, BalanceamentoResponse } from "@/types";

export const mockRachas: Racha[] = [
  {
    id: 1,
    nome: "Rapaziada do Baska",
    esporte: "BASQUETE",
    dono: { nome: "Carlos Silva", email: "carlos@email.com" },
  },
  {
    id: 2,
    nome: "Pelada de Domingo",
    esporte: "FUTEBOL",
    dono: { nome: "João Santos", email: "joao@email.com" },
  },
  {
    id: 3,
    nome: "NBA das Quintas",
    esporte: "BASQUETE",
    dono: { nome: "Pedro Alves", email: "pedro@email.com" },
  },
  {
    id: 4,
    nome: "Fut Society",
    esporte: "FUTEBOL",
    dono: { nome: "Lucas Mendes", email: "lucas@email.com" },
  },
  {
    id: 5,
    nome: "3x3 Street",
    esporte: "BASQUETE",
    dono: { nome: "Rafael Costa", email: "rafael@email.com" },
  },
  {
    id: 6,
    nome: "Champions da Firma",
    esporte: "FUTEBOL",
    dono: { nome: "André Lima", email: "andre@email.com" },
  },
];

export const mockMembros: Record<number, Membro[]> = {
  1: [
    { id: 1, nome: "Carlos Silva", rating: 4.5 },
    { id: 2, nome: "Bruno Costa", rating: 3.8 },
    { id: 3, nome: "Felipe Santos", rating: 4.2 },
    { id: 4, nome: "Gustavo Lima", rating: 3.5 },
    { id: 5, nome: "Henrique Dias", rating: 4.0 },
    { id: 6, nome: "Igor Pereira", rating: 3.2 },
    { id: 7, nome: "João Paulo", rating: 4.8 },
    { id: 8, nome: "Kaique Alves", rating: 3.9 },
    { id: 9, nome: "Leonardo Rocha", rating: 4.1 },
    { id: 10, nome: "Matheus Nunes", rating: 3.6 },
  ],
  2: [
    { id: 11, nome: "João Santos", rating: 4.3 },
    { id: 12, nome: "Diego Ferreira", rating: 3.7 },
    { id: 13, nome: "Thiago Oliveira", rating: 4.0 },
    { id: 14, nome: "Ricardo Melo", rating: 3.4 },
    { id: 15, nome: "Eduardo Silva", rating: 4.6 },
    { id: 16, nome: "Fernando Gomes", rating: 3.9 },
    { id: 17, nome: "Gabriel Souza", rating: 4.2 },
    { id: 18, nome: "Hugo Martins", rating: 3.5 },
    { id: 19, nome: "Ivan Castro", rating: 4.1 },
    { id: 20, nome: "Jorge Ribeiro", rating: 3.8 },
  ],
  3: [
    { id: 21, nome: "Pedro Alves", rating: 4.7 },
    { id: 22, nome: "Alex Fernandes", rating: 4.0 },
    { id: 23, nome: "Bernardo Lopes", rating: 3.6 },
    { id: 24, nome: "Caio Mendes", rating: 4.3 },
    { id: 25, nome: "Daniel Ramos", rating: 3.9 },
    { id: 26, nome: "Enzo Cardoso", rating: 4.5 },
  ],
  4: [
    { id: 27, nome: "Lucas Mendes", rating: 4.4 },
    { id: 28, nome: "Marco Vieira", rating: 3.7 },
    { id: 29, nome: "Nathan Borges", rating: 4.1 },
    { id: 30, nome: "Oscar Pinto", rating: 3.5 },
    { id: 31, nome: "Paulo Teixeira", rating: 4.2 },
    { id: 32, nome: "Quentin Moura", rating: 3.8 },
    { id: 33, nome: "Renan Farias", rating: 4.0 },
    { id: 34, nome: "Samuel Andrade", rating: 3.6 },
  ],
  5: [
    { id: 35, nome: "Rafael Costa", rating: 4.6 },
    { id: 36, nome: "Tiago Barros", rating: 4.0 },
    { id: 37, nome: "Ulisses Campos", rating: 3.7 },
    { id: 38, nome: "Victor Hugo", rating: 4.3 },
    { id: 39, nome: "William Santos", rating: 3.9 },
    { id: 40, nome: "Xavier Lima", rating: 4.1 },
  ],
  6: [
    { id: 41, nome: "André Lima", rating: 4.5 },
    { id: 42, nome: "Yuri Nascimento", rating: 3.8 },
    { id: 43, nome: "Zeca Pagodinho", rating: 4.0 },
    { id: 44, nome: "Arthur Reis", rating: 3.6 },
    { id: 45, nome: "Bryan Carvalho", rating: 4.2 },
    { id: 46, nome: "Cristiano Freitas", rating: 3.9 },
    { id: 47, nome: "Davi Moreira", rating: 4.4 },
    { id: 48, nome: "Emanuel Cruz", rating: 3.7 },
    { id: 49, nome: "Fábio Correia", rating: 4.1 },
    { id: 50, nome: "Giovanni Machado", rating: 3.5 },
  ],
};

export function balanceTimes(membros: Membro[]): BalanceamentoResponse {
  // Sort by rating descending
  const sorted = [...membros].sort((a, b) => b.rating - a.rating);
  
  const time1: Membro[] = [];
  const time2: Membro[] = [];
  let forca1 = 0;
  let forca2 = 0;
  
  // Greedy algorithm for team balancing
  sorted.forEach((jogador) => {
    if (forca1 <= forca2) {
      time1.push(jogador);
      forca1 += jogador.rating;
    } else {
      time2.push(jogador);
      forca2 += jogador.rating;
    }
  });
  
  return {
    diferencaForcaEntreTitulares: Math.abs(forca1 - forca2),
    times: [
      { nome: "Time 1", forcaTotal: parseFloat(forca1.toFixed(1)), jogadores: time1 },
      { nome: "Time 2", forcaTotal: parseFloat(forca2.toFixed(1)), jogadores: time2 },
    ],
  };
}
