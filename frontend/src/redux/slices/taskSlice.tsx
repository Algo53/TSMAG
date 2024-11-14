import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface IUserInfoState {
    allTask: [] | null
    currentTask: Task | null,
    status: 'idle' | 'loading' | 'rejected' | 'success'
}

const initialState: IUserInfoState = {
    allTask: null,
    currentTask: null,
    status: 'idle',
};

export const addTaskRoute = createAsyncThunk(
    'Adding a new post',
    async (payload: AddTaskParams, {getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const token = state.userInfo.token;

        if (!token) return rejectWithValue("Token is missing");
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/task/add`, payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true
                }
            )
            const result = await response.data;

            return result.success === true ? result.success : false;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateTaskRoute = createAsyncThunk(
    'Update the user task',
    async (payload: Task | null, {getState, rejectWithValue }) => {
        try {
            if (payload === null) return rejectWithValue("Task is missing");
            const state = getState() as RootState;
            const token = state.userInfo.token;
            if (!token) return rejectWithValue("Token is missing");

            const task = state.taskState.currentTask;
            if (!task) return rejectWithValue("Update a valid Task")
            const id = task._id;

            const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/task/update/${id}`, payload, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            })
            const result = await response.data;

            return result.success === true ? result.updatedTask : false;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllTaskRoute = createAsyncThunk(
    'Getting User all task',
    async (_, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const token = state.userInfo.token;

        if (!token) return rejectWithValue("Token is missing");

        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/task/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true
                }
            )
            const result = await response.data;

            return result.success === true ? result.allTask : null;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteTaskRoute = createAsyncThunk(
    'Delete user task',
    async (payload: string, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const token = state.userInfo.token;
        const currentTask = state.taskState.currentTask;
        if (!token) return rejectWithValue("Token is missing");

        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/task/delete/${currentTask?._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true
                }
            )
            const result = await response.data;

            return result.success === true ? result.success : null;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const taskStateSlice = createSlice({
    name: 'taskState',
    initialState,
    reducers: {
        setCurrentTask: (state, action: PayloadAction<any>) => {
            state.currentTask = action.payload;
        },
        taskStateReset: (state) => {
            state.allTask = null;
            state.currentTask = null;
            state.status = "idle"
        },
    },
    extraReducers: (builder) => {
        builder 
            .addCase(updateTaskRoute.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateTaskRoute.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = "idle";
                state.currentTask = action.payload;
            })
            .addCase(updateTaskRoute.rejected, (state) => {
                state.status = "rejected";
            })
            .addCase(addTaskRoute.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addTaskRoute.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = "success";
            })
            .addCase(addTaskRoute.rejected, (state) => {
                state.status = "rejected";
            })
            .addCase(getAllTaskRoute.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllTaskRoute.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = "idle";
                state.allTask = action.payload;
            })
            .addCase(getAllTaskRoute.rejected, (state) => {
                state.status = "rejected";
            })
            .addCase(deleteTaskRoute.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteTaskRoute.fulfilled, (state) => {
                state.status = "idle";
                state.currentTask = null;
            })
            .addCase(deleteTaskRoute.rejected, (state) => {
                state.status = "rejected";
            })
    }
})

export const selectAllTask = (state: RootState) => state.taskState.allTask;
export const selectCurrentTask = (state: RootState) => state.taskState.currentTask;
export const selectStatus = (state: RootState) => state.taskState.status;

export const { setCurrentTask, taskStateReset } = taskStateSlice.actions;
export default taskStateSlice.reducer;