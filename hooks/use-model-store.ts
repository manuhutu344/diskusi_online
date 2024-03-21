import { Server, ChanelType, Chanel } from '@prisma/client'
import {create} from 'zustand'

export type ModalType = "Membuat Server" | "Undang" | "Edit Server" | 'member'| 'Buat Channel' | 'Tinggalkan Server' | 'Hapus Server' | 'Hapus Channel' | 'Edit Channel' | 'File'

interface ModalData{
    server?: Server
    channel?: Chanel
    channelType?: ChanelType
    apiUrl?: string
    query?: Record<string, any>
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