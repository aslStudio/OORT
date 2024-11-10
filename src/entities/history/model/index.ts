import { TaskState, TaskType } from '@/shared/api/enums'
import { HistoryTaskItem } from './types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { tasksHistoryApi } from '@/shared/api/tasksHistory'
import { filtersState } from '@/shared/lib/store/filter'

const initialState: {
    filter: ('all' | TaskState)[]
    list: HistoryTaskItem[]
    isPending: boolean
} = {
    filter: ['all'],
    list: [],
    isPending: false
}

const fetchHistory = createAsyncThunk(
    'history/fetchHistory',
    tasksHistoryApi.fetch,
)

const tasksHistorySlice = createSlice({
    name: 'tasksHistory',
    initialState,
    reducers: {
        setFilter: (state, { payload }: PayloadAction<'all' | TaskState>) => {
            const filters = filtersState(
                state.filter,
                payload,
                3,
                'all'
            )

            state.filter = filters
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchHistory.pending, state => {
                state.isPending = true
            })
            .addCase(fetchHistory.fulfilled, (state, { payload }) => {
                state.list = payload.payload
                state.isPending = false
            })
    }
})

export const tasksHistoryModel = {
    reducer: tasksHistorySlice.reducer,
    actions: tasksHistorySlice.actions,
    thunks: {
        fetchHistory,
    }
}
export * from './types'