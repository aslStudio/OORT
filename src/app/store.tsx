import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { balanceModel } from '@/widgets/balance'

import { referralModel } from '@/features/referral/model'
import {
    uploadAudioResultModel,
    uploadPhotoResultModel,
    uploadVideoResultModel
} from '@/features/tasks'

import { tasksHistoryModel } from '@/entities/history/model'
import { activeTasksModel, expandTasksModel } from '@/entities/tasks'

const store = configureStore({
    reducer: {
        balance: balanceModel.reducer,
        activeTasks: activeTasksModel.reducer,
        historyTasks: tasksHistoryModel.reducer,
        expandTasks: expandTasksModel.reducer,
        referral: referralModel.reducer,
        uploadPhotoResult: uploadPhotoResultModel.reducer,
        uploadVideoResult: uploadVideoResultModel.reducer,
        uploadAudioResult: uploadAudioResultModel.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const StoreProvider: React.FC<React.PropsWithChildren> = ({
    children
}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}