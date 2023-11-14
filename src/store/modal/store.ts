import { ButtonProps } from 'src/components'
import { create } from 'zustand'

interface ModalState {
  title?: string
  buttons?: Omit<ButtonProps, 'to'>[]
  disableOverlayClose?: boolean
  content?: React.ReactNode
  showCloseIcon?: boolean
}

interface ModalActions {
  open: (state: ModalState) => void
  update: (state: ModalState) => void
  close: () => void
}

interface ModalStore extends ModalState {
  isOpen: boolean
  actions: ModalActions
}

const initialState: ModalState = {
  title: '',
  buttons: [],
  disableOverlayClose: false,
  content: null,
  showCloseIcon: false,
}

export const useModalStore = create<ModalStore>((set) => ({
  ...initialState,
  isOpen: false,
  actions: {
    open: (state) => set({ ...initialState, ...state, isOpen: true }),
    update: (state) => set(state),
    close: () => set({ isOpen: false }),
  },
}))

export const useModal = () => useModalStore((state) => state.actions)
