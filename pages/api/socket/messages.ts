import { currentProfilePages } from "@/lib/current-profile-pages";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { db } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo){
    if(req.method !== "POST"){
        return res.status(405).json({error: "Metode tidak Diizinkan"})
    }
    try {
       const profile = await currentProfilePages(req)
       const {content, fileUrl} = req.body
       const {serverId, channelId} = req.query
       
       if(!profile){
        return res.status(401).json({error: "Tidak sah"})
       }

       if(!serverId){
        return res.status(400).json({error: "Server ID Hilang"})
       }

       if(!channelId){
        return res.status(400).json({error: "Channel ID Hilang"})
       }

       if(!content){
        return res.status(400).json({error: "Content Hilang"})
       }

       const server = await db.server.findFirst({
        where: {
            id: serverId as string,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        },
        include: {
            members: true,
        }
       })

       if(!server){
        return res.status(404).json({message: "Server tidak ditemukan"})
       }

       const channel = await db.chanel.findFirst({
        where: {
            id: channelId as string,
            serverId: serverId as string,
        }
       })

       if(!channel){
        return res.status(404).json({message: "Channel tidak ditemukan"})
       }

       const member = server.members.find((member)=> member.profileId === profile.id)

       if(!member){
        return res.status(404).json({message: "Member tidak ditemukan"})
       }

       const message = await db.message.create({
        data:{
            content,
            fileUrl,
            channelId: channelId as string,
            memberId: member.id,
        },
        include: {
            member: {
                include: {
                    profile: true,
                }
            }
        }
       })

       const channelKey = `Chat Dari:${channelId}`

       res?.socket?.server?.io?.emit(channelKey, message)

       return res.status(200).json(message)

    } catch (error) {
        console.log("[MESSAGES_POST]", error)
        return res.status(500).json({messages: "Error di internal pages api socket messages"})
    }
}