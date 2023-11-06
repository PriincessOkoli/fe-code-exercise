export interface Members {
  id: string;
  name: string;
  role: string;
  type: string;
  country: string;
  salary: string;
}
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
