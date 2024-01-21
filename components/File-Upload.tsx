import React from 'react'
import {UploadDropzone} from '@/lib/uploading'
import '@uploadthing/react/styles.css'

interface Props{
    onChange: (url?: string) => void
    value: string
    endpoint: "messageFile" | "serverImage"
}

function FileUpload({onChange, value, endpoint}:Props) {
  return (
    <UploadDropzone
    endpoint={endpoint}
    onClientUploadComplete={(res)=>{
        onChange(res?.[0].fileUrl)
    }}
    onUploadError={(error: Error)=>{
        console.log(error)
    }}
     />
  )
}

export default FileUpload