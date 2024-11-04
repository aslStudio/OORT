import { activeTaskApi } from "@/shared/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ActiveTaskItem } from './types'
import { TaskType } from "@/shared/api/enums";

const initialState: {
    activeType: 'all' | TaskType
    list: ActiveTaskItem[]
    isPending: boolean
} = {
    activeType: 'all',
    list: [],
    isPending: true
}

const fetchTasks = createAsyncThunk(
    'activeTask/fetchTasks',
    activeTaskApi.fetch,
)

const activeTasksSlice = createSlice({
    name: 'activeTask',
    initialState,
    reducers: {
        setActiveType: (state, { payload }: PayloadAction<(typeof initialState)['activeType']>) => {
            state.activeType = payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTasks.pending, state => {
                state.isPending = true
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                console.log('fetchTasks.fulfilled')
                state.list = action.payload.payload
                state.isPending = false
            })
    }
})

export const activeTasksModel = {
    reducer: activeTasksSlice.reducer,
    actions: activeTasksSlice.actions,
    thunks: {
        fetchTasks,
    }
}
export * from './lib'