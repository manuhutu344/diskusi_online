'use client'

import * as z from"zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import {Dialog, DialogContent,DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import axios from 'axios'
import { useParams, useRouter } from "next/navigation"
import { useModal } from "@/hooks/use-model-store"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { ChanelType } from "@prisma/client"
import qs from 'query-string'

const formSchema = z.object({
    name: z.string().min(1, {
        message: "nama Channel diperlukan"
    }).refine(
        name => name !== "general",
        {
            message: "Nama Channel Tidak Bisa 'general'"
        }
    ),
    type: z.nativeEnum(ChanelType)
})

export function CreateChannelModal(){
    const {isOpen, onClose, type} = useModal()
    const router = useRouter()
    const params = useParams()
    const isModalOpen = isOpen && type === "Buat Channel"
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: ChanelType.TEXT,
        }
    })
    
    const isLoading = form.formState.isSubmitting
    const onSubmit = async(values: z.infer<typeof formSchema>)=>{
        try {
            const url = qs.stringifyUrl({
                url: "/api/channels",
                query: {
                    serverId: params?.serverId
                }
            })
            await axios.post(url, values)
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
                        Buat Channel Anda
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <FormField 
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                        Nama Channel
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                        disabled={isLoading}
                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                        placeholder="Masukan Nama Channel"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                             />
                             <FormField name="type" render={({field})=>(
                                <FormItem>
                                    <FormLabel>Tipe Channel</FormLabel>
                                    <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-zinc-300/50 border-0-focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                                                <SelectValue placeholder='pilih tipe channel' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(ChanelType).map((type)=>(
                                                <SelectItem key={type} value={type} className="capitalize">
                                                    {type.toLowerCase()}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                             )} />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                                <Button disabled={isLoading} variant={"primary"}>
                                    Buat
                                </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}