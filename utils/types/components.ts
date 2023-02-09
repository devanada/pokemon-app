export interface CardType {
  name: string;
  url?: string;
  alias?: string;
  fromMyPoke?: boolean;
  onClick?: () => void;
}

export type SectionType = {
  children: React.ReactNode;
  center?: boolean;
  fill?: boolean;
  noBorder?: boolean;
  bgColor?: string;
};

export type ModalTypes = {
  children?: React.ReactNode;
  show?: boolean;
};

export type LayoutTypes = {
  title: string;
  description: string;
  children: React.ReactNode;
};
