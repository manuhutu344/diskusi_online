import {create} from 'zustand'

export type ModalType = "Membuat Server"

interface Props{
    type: ModalType | null
    isOpen: boolean
    onOpen: (type: ModalType) => void
    onClose: () => void
}

export const useModal = create<Props>((set)=>({
    type: null,
    isOpen: false,
    onOpen: (type) => set({isOpen: true, type}),
    onClose: () =>set({
        type: null,
        isOpen: false
    })
}))