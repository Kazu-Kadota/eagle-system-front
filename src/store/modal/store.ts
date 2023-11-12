import { ButtonProps } from 'src/components'
import { create } from 'zustand'

interface ModalState {
  title: string
  buttons: Omit<ButtonProps, 'to'>[]
}

interface ModalActions {
  open: (state: ModalState) => void
  close: () => void
}

interface ModalStore extends ModalState {
  isOpen: boolean
  actions: ModalActions
}

const initialState: ModalState = {
  title: '',
  buttons: [],
}

export const useModalStore = create<ModalStore>((set) => ({
  ...initialState,
  isOpen: false,
  actions: {
    open: (state) => set({ ...initialState, ...state, isOpen: true }),
    close: () => set({ isOpen: false }),
  },
}))

export const useModal = () => useModalStore((state) => state.actions)
