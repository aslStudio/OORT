import { BalaceApi } from './types'

export const balanceApi: BalaceApi = {
    fetch: async () => {
        console.log('fetch api')
        await new Promise(resolve => setTimeout(resolve, 3_000))

        return {
            error: false,
            payload: {
                balance: 20_000
            }
        }
    }
}