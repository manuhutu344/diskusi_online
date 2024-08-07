import ChatHeader from '@/components/chat/ChatHeader'
import ChatInput from '@/components/chat/ChatInput'
import ChatMessages from '@/components/chat/ChatMessages'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import {ChanelType} from "@prisma/client"
import MediaRoom from '@/components/MediaRoom'

interface Props{
  params:{
    serverId: string
    channelId: string
  }
}

async function page({params}:Props) {
  const profile = await currentProfile()

  if(!profile){
    return redirectToSignIn()
  }

  const channel = await db.chanel.findUnique({
    where:{
      id: params.channelId
    }
  })

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    }
  })

  if(!channel || !member){
    redirect("/")
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader name={channel.name} serverId={channel.serverId} type='channel' />
      {channel.type === ChanelType.TEXT && (
        <>
      <ChatMessages member={member} name={channel.name} chatId={channel.id} type='channel' apiUrl="/api/messages" socketUrl='/api/socket/messages' socketQuery={{
        channelId: channel.id,
        serverId: channel.serverId
      }} paramKey="channelId" paramValue={channel.id} />
      <ChatInput name={channel.name} type="channel" apiUrl='/api/socket/messages' query={{
        channelId: channel.id,
        serverId: channel.serverId
      }} />
        </>
      )}
      {channel.type === ChanelType.AUDIO && (
        <MediaRoom chatId={channel.id} video={false} audio={true} />
      )}
      {channel.type === ChanelType.VIDEO && (
        <MediaRoom chatId={channel.id} video={true} audio={true} />
      )}
    </div>
  )
}

export default page