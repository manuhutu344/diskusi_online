'use client'

import { ServerWithMembersWithProfiles } from '@/types'
import { MemberRole} from '@prisma/client'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from 'lucide-react'

interface Props{
    server: ServerWithMembersWithProfiles
    role?: MemberRole
}

function ServerHeader({server, role}:Props) {
  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role === MemberRole.MODERATOR
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none' asChild>
        <button className='w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition'>
          {server.name}
          <ChevronDown className='h-5 w-5 ml-auto' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]'>
        {isModerator && (
          <DropdownMenuItem className='text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer'>
            Undang Teman
            <UserPlus className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer'>
            Seting Server
            <Settings className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
         {isAdmin && (
          <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer'>
            Mengelola Member
            <Users className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
         {isModerator && (
          <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer'>
            Buat Channel
            <PlusCircle className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuSeparator />
        )}
         {isAdmin && (
          <DropdownMenuItem className='text-rose-500 px-3 py-2 text-sm cursor-pointer'>
            Hapus Server
            <Trash className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className='text-rose-500 px-3 py-2 text-sm cursor-pointer'>
            Pergi Ajah
            <LogOut className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ServerHeader