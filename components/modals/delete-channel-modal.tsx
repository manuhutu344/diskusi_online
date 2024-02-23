'use client'

import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import { useModal } from "@/hooks/use-model-store"
import { Button } from '../ui/button'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import qs from "query-string"


export function DeleteChannelModal(){
    const {isOpen, onClose, type, data} = useModal()
    const isModalOpen = isOpen && type === "Hapus Channel"
    const {server, channel} = data
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function onClick(){
        try {
            setIsLoading(true)
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query:{
                    serverId: server?.id
                }
            })
            await axios.delete(url)
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
                      Mau Hapus Channel Ini ?
                    </DialogTitle>
                    <DialogDescription className='text-center text-zinc-500'>
                        Yakin Nih Mau Hapus Channel Ini ? <br />
                        <span className='text-indigo-500 font-semibold'>#{channel?.name}</span> Akan Di Hapus Permanen.
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