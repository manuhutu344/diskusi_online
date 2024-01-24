import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import NavigationAction from './NavigationAction'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'

async function NavigationSidebar() {
    const profile = await currentProfile()

    if(!profile){
        return redirect("/")
    }

    const server = db.server.findMany({
        where:{
            members:{
                some: {
                    profileId: profile.id
                }
            }
        }
    })

  return (
    <div className='space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3'>
        <NavigationAction />
        <Separator 
            className='h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto'
         />
         <ScrollArea className='flex-1 w-full'>
            {(await server).map((server)=>(
                <div key={server.id}>
                    {server.name}
                </div>
            ))}
         </ScrollArea>
    </div>
  )
}

export default NavigationSidebar