import { activeTasksModel, expandTasksModel } from '@/entities/tasks'
import { uploadPhotoResultModel } from '@/features/tasks'
import { balanceModel } from '@/widgets/balance'
import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { Provider } from 'react-redux'

const store = configureStore({
    reducer: {
        balance: balanceModel.reducer,
        activeTasks: activeTasksModel.reducer,
        expandTasks: expandTasksModel.reducer,
        uploadPhotoResult: uploadPhotoResultModel.reducer,
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