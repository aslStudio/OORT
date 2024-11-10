import { ResponseDefault } from "@/shared/lib/types";

export type GetReferralResponse = ResponseDefault<{
    referralLink: string
    storyImage: string
}>

export type ReferralApi = {
    getReferrals: () => Promise<GetReferralResponse>
}