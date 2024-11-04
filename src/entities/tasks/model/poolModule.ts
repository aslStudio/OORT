import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ExpandTask } from './types'
import { activeTaskApi } from '@/shared/api'

const initialState: {
    pool: Record<ExpandTask['id'], ExpandTask>
    isPending: boolean
} = {
    pool: {},
    isPending: true,
}

const fetchExpandTask = createAsyncThunk(
    'activeTask/fetchExpand',
    async (id: ExpandTask['id'], pool: Record<ExpandTask['id'], ExpandTask>) => {
        if (id in pool) {
            return {
                error: false,
                payload: pool[id]
            }
        }

        const response = await activeTaskApi.fetchExpand(id)
        return response
    }
)

const expandTasksSlice = createSlice({
    name: 'activeTasksPool',
    initialState,
    reducers: {
        setIsPending: (state, { payload }: PayloadAction<boolean>) => {
            state.isPending = payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchExpandTask.pending, state => {
                state.isPending = true
            })
            .addCase(fetchExpandTask.fulfilled, (state, action) => {
                state.pool = {
                    ...state,
                    [action.payload.payload.id]: action.payload.payload
                }
                state.isPending = false
            })
    }
})

export const expandTasksModel = {
    reducer: expandTasksSlice.reducer,
    actions: expandTasksSlice.actions,
    thunks: {
        fetchExpandTask,
    }
}