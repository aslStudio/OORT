import { activeTasksModel } from '@/entities/tasks'
import { balanceModel } from '@/widgets/balance'
import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { Provider } from 'react-redux'

const store = configureStore({
    reducer: {
        balance: balanceModel.reducer,
        activeTasks: activeTasksModel.reducer,
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