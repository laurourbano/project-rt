export interface Quadro {
  id: string; // MongoDB usa _id como string
  title: string;
  content: string;
  local: string;
  situacao: string;
  julgamento: string;
  color: string;
}
