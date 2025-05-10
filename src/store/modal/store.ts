import type { ButtonProps } from '@/components/Button';
import { create } from 'zustand';

interface ModalState {
  title?: string;
  buttons?: Omit<ButtonProps, 'to'>[];
  disableOverlayClose?: boolean;
  preventClosing?: boolean;
  content?: React.ReactNode;
  showCloseIcon?: boolean;
}

interface ModalActions {
  open: (state: ModalState) => void;
  update: (state: ModalState) => void;
  close: (params?: { force?: boolean }) => void;
}

interface ModalStore extends ModalState {
  isOpen: boolean;
  actions: ModalActions;
}

const initialState: ModalState = {
  title: '',
  buttons: [],
  disableOverlayClose: false,
  content: null,
  showCloseIcon: false,
  preventClosing: false,
};

export const useModalStore = create<ModalStore>((set, get) => ({
  ...initialState,
  isOpen: false,
  actions: {
    open: (state) => set({ ...initialState, ...state, isOpen: true }),
    update: (state) => set(state),
    close: ({ force } = {}) => {
      if (!force && get().preventClosing) return;
      set({ isOpen: false });
    },
  },
}));

export const useModal = () => useModalStore((state) => state.actions);
