import { Server } from '@prisma/client'
import {create} from 'zustand'

export type ModalType = "Membuat Server" | "Undang" | "Edit Server" | 'member'

interface ModalData{
    server?: Server
}

interface Props{
    type: ModalType | null
    data: ModalData
    isOpen: boolean
    onOpen: (type: ModalType, data?: ModalData) => void
    onClose: () => void
}

export const useModal = create<Props>((set)=>({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data={}) => set({isOpen: true, type, data}),
    onClose: () =>set({
        type: null,
        isOpen: false
    })
}))