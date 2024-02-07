import React from 'react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { cn } from '@/lib/utils'

interface Props{
    src?: string
    className?: string
}

function UserAvatar({src, className}:Props) {
  return (
    <Avatar className={cn(
        "h-7 w-7 md:h-10 md:w-10",
        className
    )}>
        <AvatarImage src={src} />
    </Avatar>
  )
}

export default UserAvatar