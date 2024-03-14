"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Value } from '@radix-ui/react-select'

interface Props{
    apiUrl: string
    query: Record<string, any>
    name: string
    type: "conversation" | "channel"
}

const formSchema = z.object({
    content: z.string().min(1)
})

function ChatInput({apiUrl, query, name, type}:Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        }
    })
    const isLoading = form.formState.isSubmitting
    async function onSubmit(value: z.infer<typeof formSchema>){
        console.log(value)
    }
  return (
    <div>ChatInput</div>
  )
}

export default ChatInput