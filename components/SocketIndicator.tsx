"use client"
import React from 'react'
import { useSocket } from './providers/socket-provider'
import { Badge } from './ui/badge'

function SocketIndicator() {
    const {isConnected} = useSocket()
    if(!isConnected){
        return(
            <Badge variant="outline" className="bg-yellow-600 text-white border-none">
                Cadangan: Polling setiap 1 detik
            </Badge>
        )
    }
  return (
    <Badge variant="outline" className="bg-emerald-600 text-white border-none">
        Langsung: Pembaruan waktu nyata
    </Badge>
  )
}

export default SocketIndicator