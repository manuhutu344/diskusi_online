import { Hash} from 'lucide-react'
import React from 'react'
import Mobiletoggle from '../mobile-toggle'

interface Props{
    serverId: string
    name: string
    type: "channel"| "conversation"
    imageUrl?: string
}

function ChatHeader({serverId, name, type, imageUrl}:Props) {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
        <Mobiletoggle serverId={serverId} />
        {type === 'channel' && (
            <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
        )}
        <p className="font-semibold text-md text-black dark:text-white">
            {name}
        </p>
    </div>
  )
}

export default ChatHeader