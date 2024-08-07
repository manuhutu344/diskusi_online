'use client'

import * as z from"zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import FileUpload from "../File-Upload"
import axios from 'axios'
import { useRouter } from "next/navigation"
import { useModal } from "@/hooks/use-model-store"
import { useEffect } from "react"

const formSchema = z.object({
    name: z.string().min(1, {
        message: "nama server diperlukan"
    }),
    imageUrl : z.string().min(1, {
        message: "gambar server diperlukan"
    })
})

export function EditServerModal(){
    const {isOpen, onClose, type, data} = useModal()
    const router = useRouter()
    const isModalOpen = isOpen && type === "Edit Server"
    const {server} = data

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    })

    useEffect(()=>{

        if(server){
            form.setValue("name", server.name)
            form.setValue("imageUrl", server.imageUrl)
        }

    },[server, form])
    
    const isLoading = form.formState.isSubmitting
    const onSubmit = async(values: z.infer<typeof formSchema>)=>{
        try {
            await axios.patch(`/api/servers/${server?.id}`, values)
            form.reset()
            router.refresh()
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    function handleClose(){
        form.reset()
        onClose()
    }

    return(
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold'>
                        Edit Server Anda
                    </DialogTitle>
                    <DialogDescription className='text-center text-zinc-500'>
                        Masukan Nama Dan Gambar Untuk Server Anda.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField 
                                control={form.control}
                                name="imageUrl"
                                render={({field})=>(
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload
                                            endpoint='serverImage'
                                            value={field.value}
                                            onChange={field.onChange}
                                             />
                                        </FormControl>
                                    </FormItem>
                                )}
                                />
                            </div>
                            <FormField 
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                        Nama Server
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                        disabled={isLoading}
                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                        placeholder="Masukan Nama Server"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                             />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                                <Button disabled={isLoading} variant={"primary"}>
                                    Simpan Perubahan
                                </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}