import { useEffect, useState } from "react"

interface ChatScrollProps{
    chatRef: React.RefObject<HTMLDivElement>
    bottomRef: React.RefObject<HTMLDivElement>
    shouldLoadMore: boolean
    LoadMore: () => void
    count: number
}

export function useChatScroll({chatRef, bottomRef, shouldLoadMore, LoadMore, count}:ChatScrollProps){
    const [hashInitialized, setHashInitialized] = useState(false)
    useEffect(()=>{
        const topDiv = chatRef?.current
        const handleScroll = ()=>{
            const scrollTop = topDiv?.scrollTop
            if(scrollTop === 0 && shouldLoadMore){
                LoadMore()
            }
        }
        topDiv?.addEventListener("scroll", handleScroll)
        return () =>{
            topDiv?.removeEventListener("scroll", handleScroll)
        }
    }, [shouldLoadMore, LoadMore, chatRef])
    useEffect(()=>{
        const bottomDiv = bottomRef?.current
        const topDiv = chatRef.current
        function shouldAutoScroll(){
            if(!hashInitialized && bottomDiv){
                setHashInitialized(true)
                return true
            }
            if(!topDiv){
                return false
            }
            const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight
            return distanceFromBottom <= 100
        }
        if(shouldAutoScroll()){
            setTimeout(()=>{
                bottomRef.current?.scrollIntoView({
                    behavior: "smooth",

                })
            }, 100)
        }
    }, [bottomRef, chatRef, count, hashInitialized])
}