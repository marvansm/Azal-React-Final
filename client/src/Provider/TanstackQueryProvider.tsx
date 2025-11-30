import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import type { children } from '../Types/global'

const queryClient = new QueryClient()


const TanstackQueryProvider = ({ children }: children) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default TanstackQueryProvider
