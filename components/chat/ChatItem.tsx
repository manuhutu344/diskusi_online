"use client"

import { Member, Profile } from '@prisma/client'
import React from 'react'
import UserAvatar from '../UserAvatar'
import ActionTooltip from '../action-tooltip'
import { Check, CheckCircle2 } from 'lucide-react'

interface Props{
    id: string
    content: string
    member: Member & {
        profile: Profile
    }
    timestamp: string
    fileUrl: string | null
    deleted: boolean
    currentMember: Member
    isUpdate: boolean
    socketUrl: string
    socketQuery: Record<string, string>
}

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <Check className="h-4 w-4 ml-2 text-indigo-500" />,
    "ADMIN": <CheckCircle2 className='h-4 w-4 ml-2 text-blue-500' />

}

function ChatItem({id, content, member, timestamp, deleted, currentMember, isUpdate, socketUrl, socketQuery}:Props) {
  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
        <div className="group flex gap-x-2 items-start w-full">
            <div className="cursor-pointer hover:drop-shadow-md transition">
                <UserAvatar src={member.profile.imageUrl} />
            </div>
            <div className="flex flex-col w-full">
                <div className="flex items-center gap-x-2">
                    <div className="flex items-center">
                        <p className="font-semibold text-sm hover:underline cursor-pointer">
                            {member.profile.name}
                        </p>
                        <ActionTooltip label={member.role}>
                            {roleIconMap[member.role]}
                        </ActionTooltip>
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {timestamp}
                    </span>
                </div>
                {content}
            </div>
        </div>
    </div>
  )
}

export default ChatItem