'use client'

import React from 'react'
import {UploadDropzone} from '@/lib/uploading'
import '@uploadthing/react/styles.css'
import {X} from "lucide-react"
import Image from 'next/image'

interface Props{
    onChange: (url?: string) => void
    value: string
    endpoint: "messageFile" | "serverImage"
}

function FileUpload({onChange, value, endpoint}:Props) {
  const fileType = value?.split(".").pop()
  if(value && fileType !=="pdf"){
    return(
      <div className='relative h-20 w-20'>
        <Image
          fill
          src={value}
          alt = 'Upload'
          className='rounded-full' 
         />
      </div>
    )
  }
  return (
    <UploadDropzone
    endpoint={endpoint}
    onClientUploadComplete={(res)=>{
        onChange(res?.[0].url)
    }}
    onUploadError={(error: Error)=>{
        console.log(error)
    }}
     />
  )
}

export default FileUpload