interface iCard {
  id: string;
  title: string;
  dataInicial: string;
  concluido: boolean;
  onDelete: (id: string) => void;
}
