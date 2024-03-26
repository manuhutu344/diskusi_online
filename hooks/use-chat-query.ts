import qs from 'query-string'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSocket } from '@/components/providers/socket-provider'

interface Props{
    queryKey: string
    apiUrl: string
    paramKey: "channelId" | "conversationId"
    paramValue: string
}

export function useChatQuery({queryKey, apiUrl, paramKey, paramValue}:Props){
    const {isConnected} = useSocket()
    async function fetchMessages({pageParam = undefined}){
        const url = qs.stringifyUrl({
            url: apiUrl,
            query:{
                cursor: pageParam,
                [paramKey]: paramValue,
            }
        }, {skipNull: true})
        const res = await fetch(url)
        return res.json()
    }
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
      } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        refetchInterval: isConnected ? false : 1000,
        initialPageParam: undefined, // Or some other value if there's a better one
      });
    return{
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    }
}