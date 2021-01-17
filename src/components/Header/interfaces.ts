/* eslint-disable semi */
export interface HeaderComponentProps {
  type: 'home' | 'resumo' | 'gasto' | 'entrada' | 'categoria';
}

export interface HeaderProps extends HeaderComponentProps {
  title: string;
}
