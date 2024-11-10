import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { referralApi, GetReferralResponse } from "@/shared/api/referral";

const fetch = createAsyncThunk(
    'feature/referral/getReferral',
    referralApi.getReferrals,
)

const initialState: {
    isPending: boolean
    referralLink: string
    storyImage: string
} = {
    isPending: true,
    referralLink: '',
    storyImage: ''
}

const referralSlice = createSlice({
    name: 'feature/referral',
    initialState,
    reducers: {
        reset: state => {
            state.isPending = true
            state.referralLink = ''
            state.storyImage = ''
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetch.pending, state => {
                state.isPending = true
            })
            .addCase(fetch.fulfilled, (state, { payload }: PayloadAction<GetReferralResponse>) => {
                state.isPending = false
                state.referralLink = payload.payload.referralLink
                state.storyImage = payload.payload.storyImage
            })
    }
})

export const referralModel = {
    reducer: referralSlice.reducer,
    actions: referralSlice.actions,
    thunks: {
        fetch,
    }
}