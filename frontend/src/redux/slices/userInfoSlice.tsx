import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface IUserInfoState {
    mode: 'dark' | 'light';
    menu: boolean;
    user: boolean;
    token: string | null;
    userInfo: IUser | null;
    status: 'idle' | 'loading' | 'rejected'
}

const initialState: IUserInfoState = {
    mode: 'light',
    menu: false,
    user: false,
    token: null,
    userInfo: null,
    status: 'idle',
};

export const createUserRoute = createAsyncThunk(
    'Adding a new User',
    async (payload: CreateUserParams, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/auth/signup`, payload,
                {
                    headers: {
                        "Content-Type": "application/json"
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

export const loginUserRoute = createAsyncThunk(
    'Login User',
    async (payload: LoginUserParams, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/auth/login`, payload, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true,
            })
            const result = await response.data;

            return result.success === true ? result.accessToken : false;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUserDetailsRoute = createAsyncThunk(
    'Getting User Details form the authToken',
    async (_, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const token = state.userInfo.token;

        if (!token) return rejectWithValue("Token is missing");

        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/user/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true
                }
            )
            const result = await response.data;

            return result.success === true ? result.user : null;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUserRoute = createAsyncThunk(
    'Update the user details',
    async (payload: UpdateUserParams, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.userInfo.token;

            if (!token) return rejectWithValue("Token is missing");

            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/user/update`, payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true
                }
            )
            const result = await response.data;

            return result.success === true ? result.user : false;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setMenu: (state) => {
            state.menu = !(state.menu);
        },
        setMode: (state) => {
            if (state.mode === 'light') {
                state.mode = 'dark';
            }
            else {
                state.mode = 'light';
            }
        },
        userInfoReset: (state) => {
            state.mode = 'light';
            state.user = false;
            state.token = null;
            state.status = "idle";
            state.userInfo = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserRoute.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createUserRoute.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = "idle";
                state.user = action.payload;
            })
            .addCase(createUserRoute.rejected, (state) => {
                state.status = "rejected";
            })
            .addCase(loginUserRoute.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUserRoute.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = "idle";
                state.user = true;
                state.token = action.payload;
            })
            .addCase(loginUserRoute.rejected, (state) => {
                state.status = "rejected";
            })
            .addCase(getUserDetailsRoute.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getUserDetailsRoute.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = "idle";
                state.userInfo = action.payload;
            })
            .addCase(getUserDetailsRoute.rejected, (state) => {
                state.status = "rejected";
            })
            .addCase(updateUserRoute.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateUserRoute.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = "idle";
                state.userInfo = action.payload;
            })
            .addCase(updateUserRoute.rejected, (state) => {
                state.status = "rejected";
            })
    }
})

export const selectMode = (state: RootState) => state.userInfo.mode;
export const selectMenu = (state: RootState) => state.userInfo.menu;
export const selectToken = (state: RootState) => state.userInfo.token;
export const selectUser = (state: RootState) => state.userInfo.user;
export const selectUserInfo = (state: RootState) => state.userInfo.userInfo;
export const selectStatus = (state: RootState) => state.userInfo.status;

export const { setMenu, setMode, userInfoReset } = userInfoSlice.actions;
export default userInfoSlice.reducer;