'use client'

import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import { useModal } from "@/hooks/use-model-store"
import { Button } from '../ui/button'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'


export function DeleteServerModal(){
    const {isOpen, onClose, type, data} = useModal()
    const isModalOpen = isOpen && type === "Hapus Server"
    const {server} = data
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function onClick(){
        try {
            setIsLoading(true)
            await axios.delete(`/api/servers/${server?.id}`)
            onClose()
            router.refresh()
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }


    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold'>
                      Mau Hapus Server Ini ?
                    </DialogTitle>
                    <DialogDescription className='text-center text-zinc-500'>
                        Yakin Nih Mau Hapus Server Ini ? <br />
                        <span className='text-indigo-500 font-semibold'>{server?.name}</span> Akan Di Hapus Permanen.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='bg-gray-100 px-6 py-4'>
                    <div className='flex items-center justify-between w-full'>
                        <Button disabled={isLoading} onClick={onClose} variant="ghost">
                            Gagalkan
                        </Button>
                        <Button disabled={isLoading} variant='primary' onClick={onClick}>
                            Yakin !!!
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}