'use client'

import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import { useModal } from "@/hooks/use-model-store"
import { ServerWithMembersWithProfiles } from '@/types'
import { ScrollArea } from '../ui/scroll-area'
import UserAvatar from '../UserAvatar'

export function MembersModal(){
    const {isOpen, onClose, type, data, onOpen} = useModal()
    const isModalOpen = isOpen && type === "member"
    const {server} = data as {server: ServerWithMembersWithProfiles}


    
    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold'>
                      Kelolah Member Anda
                    </DialogTitle>
                <DialogDescription className='text-center text-zinc-500'>
                    {server?.members?.length} Member
                </DialogDescription>
                </DialogHeader>
                <ScrollArea className='mt-8 max-h-[420px] pr-6'>
                    {server?.members?.map((member)=>(
                        <div key={member.id} className='flex items-center gap-x-2 mb-6'>
                            <UserAvatar src={member.profile.imageUrl} />
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}