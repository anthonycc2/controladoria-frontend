import { Grupo } from './grupo';

export interface Contato {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    grupo: Grupo;
  }