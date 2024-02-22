import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import {ChanelType, MemberRole} from "@prisma/client"
import ServerHeader from './ServerHeader'
import {ScrollArea} from '../components/ui/scroll-area'
import ServerSearch from './ServerSearch'
import { Check, Hash, Mic, ShieldCheck, Video } from 'lucide-react'
import { Separator } from './ui/separator'
import ServerSection from './ServerSection'
import ServerChannel from './ServerChannel'
import ServerMember from './ServerMember'

interface Props{
    serverId: string
}

const iconMap = {
    [ChanelType.TEXT]:<Hash className='mr-2 h-4 w-4' />,
    [ChanelType.AUDIO]:<Mic className='mr-2 h-4 w-4' />,
    [ChanelType.VIDEO]:<Video className='mr-2 h-4 w-4' />
}

const roleIconMap ={
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className='h-4 w-4 mr-2 text-indigo-500' />,
    [MemberRole.ADMIN]: <Check className='h-4 w-4 mr-2 text-rose-500' />
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
        <ServerHeader
            server={server}
            role={role}
         />
         <ScrollArea className='flex-1 px-3'>
            <div className='mt-2'>
                <ServerSearch data={[
                    {
                        label: 'Text',
                        type: 'channel',
                        data: textChannels?.map((channel)=>({
                            id:channel.id,
                            name: channel.name,
                            icon: iconMap[channel.type],
                        }))
                    },
                    {
                        label: 'Suara',
                        type: 'channel',
                        data: audioChannels?.map((channel)=>({
                            id:channel.id,
                            name: channel.name,
                            icon: iconMap[channel.type],
                        }))
                    },
                    {
                        label: 'Video',
                        type: 'channel',
                        data: videoChannels?.map((channel)=>({
                            id:channel.id,
                            name: channel.name,
                            icon: iconMap[channel.type],
                        }))
                    },
                    {
                        label: 'Anggota',
                        type: 'member',
                        data: members?.map((member)=>({
                            id:member.id,
                            name: member.profile.name,
                            icon: roleIconMap[member.role],
                        }))
                    }
                ]} />
            </div>
            <Separator className='bg-zinc-200 dark:bg-zinc-700 rounded-md my-2' />
            {!!textChannels?.length && (
                <div className='mb-2'>
                    <ServerSection sectionType='channels' channelType={ChanelType.TEXT} role={role} label='Text' />
                    <div className='space-y-[2px]'>
                    {textChannels.map((channel)=>(
                        <ServerChannel key={channel.id} channel={channel} role={role} server={server} />
                        ))}
                    </div>
                </div>
            )}
            {!!audioChannels?.length && (
                <div className='mb-2'>
                    <ServerSection sectionType='channels' channelType={ChanelType.AUDIO} role={role} label='Audio Channel' />
                    <div className='space-y-[2px]'>

                    {audioChannels.map((channel)=>(
                        <ServerChannel key={channel.id} channel={channel} role={role} server={server} />
                        ))}
                    </div>
                </div>
            )}
            {!!videoChannels?.length && (
                <div className='mb-2'>
                    <ServerSection sectionType='channels' channelType={ChanelType.VIDEO} role={role} label='Video Channel' />
                    <div className='space-y-[2px]'>
                    {videoChannels.map((channel)=>(
                        <ServerChannel key={channel.id} channel={channel} role={role} server={server} />
                        ))}
                    </div>
                </div>
            )}
            {!!members?.length && (
                <div className='mb-2'>
                    <ServerSection sectionType='members' role={role} label='Anggota' server={server} />
                    <div className='space-y-[2px]'>
                    {members.map((member)=>(
                        <ServerMember key={member.id} member={member} server={server} />
                        ))}
                    </div>
                </div>
            )}
         </ScrollArea>
    </div>
  )
}

export default ServerSidebar