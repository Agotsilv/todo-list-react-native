interface iCard {
  id: string;
  title: string;
  dataInicial: string;
  concluido: boolean;
  prioridade: string;
  onDelete: (id: string) => void;
  list: () => void;
}
