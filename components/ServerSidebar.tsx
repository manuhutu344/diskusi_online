import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import {ChanelType} from "@prisma/client"

interface Props{
    serverId: string
}

async function ServerSidebar({serverId}:Props) {
    const profile = await currentProfile()

    if(!profile){
        return redirect("/")
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: 'asc'
                },
            },
            members: {
                include: {
                    profile: true
                },
                orderBy: {
                    role: "asc"
                }
            }
        }
    })

    const textChannels = server?.channels.filter((channel) => channel.type === ChanelType.TEXT)
    const audioChannels = server?.channels.filter((channel) => channel.type === ChanelType.AUDIO)
    const videoChannels = server?.channels.filter((channel) => channel.type === ChanelType.VIDEO)
    const members = server?.members.filter((member)=>member.profileId !== profile.id)

    if(!server){
        return redirect("/")
    }

    const role = server.members.find((member)=>member.profileId === profile.id)?.role

  return (
    <div className='flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]'>
        ServerSidebar
    </div>
  )
}

export default ServerSidebar