import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { MemberRole } from "@prisma/client"
import { NextResponse } from "next/server"

export async function DELETE(req: Request, {params}:{params: {channelId:string}}){
    try {
        const profile = await currentProfile()
        const {searchParams} = new URL(req.url)
        const serverId = searchParams.get("serverId")
        if(!profile){
            return new NextResponse('Tidak Sah', {status: 401})
        }
        if(!serverId){
            return new NextResponse("Server ID Salah", {status: 400})
        }
        if(!params.channelId){
            return new NextResponse("Channel Id Salah", {status: 400})
        }

        const server = await db.server.update({
            where:{
                id: serverId,
                members:{
                    some:{
                        profileId: profile.id,
                        role:{
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        }
                    }
                }
            },
            data:{
                channels: {
                    delete: {
                        id: params.channelId,
                        name: {
                            not: "general",
                        }
                    }
                }
            }
        })

        return NextResponse.json(server)

    } catch (error) {
        console.log("[CHANNEL_ID_DELETE]", error)
        return new NextResponse('Error di internal di api channel channelid', {status: 500})
    }
}