import { Hash } from 'lucide-react'
import React from 'react'

interface Props{
    name: string
    type: "channel" | "conversation"
}

function ChatWelcome({name, type}:Props) {
  return (
    <div className="space-y-2 px-4 mb-4">
        {type === "channel" && (
            <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
                <Hash className="h-12 w-12 text-white" />
            </div>
        )}
        <p className="text-xl md:text-3xl font-bold">
            {type === 'channel' ? "Selamat Datang Di #" : ""}{name}
        </p>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            {type === 'channel' ? `Ini Adalah Awal Dari #${name} channel.`: `Mulai Lah Percakapan Di ${name}`}
        </p>
    </div>
  )
}

export default ChatWelcome