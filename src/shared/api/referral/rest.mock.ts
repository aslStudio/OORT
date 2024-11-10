import { ReferralApi } from './types'

export const referralApi: ReferralApi = {
    getReferrals: async () => {
        await new Promise(resolve => setTimeout(resolve, 3_000))

        return {
            error: false,
            payload: {
                referralLink: '5982gbionUJ83h',
                storyImage: 'https://acniowa.com/wp-content/uploads/2016/03/test-image.png'
            }
        }
    }
}