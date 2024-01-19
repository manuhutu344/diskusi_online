'use client'

import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog'

export function InitialModal(){
    return(
        <Dialog open>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold'>
                        Buat Server Anda
                    </DialogTitle>
                    <DialogDescription className='text-center text-zinc-500'>
                        Masukan Nama Dan Gambar Untuk Server Anda.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}