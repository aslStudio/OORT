import { activeTaskApi, UploadPhotoResponse } from "@/shared/api";
import { createAsyncThunk, createSlice, isPending, PayloadAction } from "@reduxjs/toolkit";

const upload = createAsyncThunk(
    'feature/tasks/uploadResult',
    activeTaskApi.uploadPhotoResult
)

const uploadSlice = createSlice({
    name: 'feature/uploadPhotoResult',
    initialState: {
        isPending: false,
        isSuccess: false,
        refCode: '',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(upload.pending, state => {
                state.isPending = true
            })
            .addCase(upload.fulfilled, (state, { payload }: PayloadAction<UploadPhotoResponse>) => {
                state.isPending = false
                state.isSuccess = true
                state.refCode = payload.payload.refLink
            })
    }
})

export const uploadPhotoResultModel = {
    reducer: uploadSlice.reducer,
    thunks: {
        upload,
    }
}