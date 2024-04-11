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
       const {conversationId} = req.query
       
       if(!profile){
        return res.status(401).json({error: "Tidak sah"})
       }

       if(!conversationId){
        return res.status(400).json({error: "conversationId Hilang"})
       }

       if(!content){
        return res.status(400).json({error: "Content Hilang"})
       }

       const conversation = await db.conversation.findFirst({
        where:{
            id: conversationId as string,
            OR: [
                {
                    memberOne: {
                        profileId: profile.id,
                    }
                },
                {
                    memberTwo:{
                        profileId: profile.id,
                    }
                }
            ]
        },
        include: {
            memberOne:{
                include:{
                    profile: true,
                }
            },
            memberTwo:{
                include:{
                    profile: true,
                }
            }
        }
       })

       if(!conversation){
        return res.status(404).json({message: "Percakapan tidak ditemukan"})
       }

       const member = conversation.memberOne.profileId === profile.id ? conversation.memberOne : conversation.memberTwo

       if(!member){
        return res.status(404).json({message: "Member tidak ditemukan"})
       }

       const message = await db.directMessage.create({
        data:{
            content,
            fileUrl,
            conversationId: conversationId as string,
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

       const channelKey = `chat:${conversationId}:messages`

       res?.socket?.server?.io?.emit(channelKey, message)

       return res.status(200).json(message)

    } catch (error) {
        console.log("[DIRECT_MESSAGES_POST]", error)
        return res.status(500).json({messages: "Error di internal pages api socket messages"})
    }
}