// import { backendApi } from '@/constant/Api';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async Thunks for API calls
// const axisConfig = {
//     withCredentials: true
// }
// export const registerUser = createAsyncThunk('auth/register', async (userData) => {
//     const response = await axios.post(`${backendApi}/api/v1/user/register`, userData, axisConfig);
//     return response.data;
// });

// export const loginUser = createAsyncThunk('auth/login', async (userData) => {
//     const response = await axios.post(`${backendApi}/api/v1/user/login`, userData, axisConfig);
//     return response.data;
// });

// export const logoutUser = createAsyncThunk('auth/logout', async () => {
//     await axios.post('/api/auth/logout');
// });

// export const fetchUserProfile = createAsyncThunk('auth/fetchProfile', async () => {
//     const response = await axios.get('/api/auth/profile');
//     return response.data;
// });

// // Create authSlice
// const authSlice = createSlice({
//     name: 'auth',
//     initialState: {
//         user: null,
//         token: null,
//         status: 'idle',
//         error: null,
//     },
//     reducers: {
//         clearAuth: (state) => {
//             state.user = null;
//             state.token = null;
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(registerUser.fulfilled, (state, action) => {
//                 state.user = action.payload.user;
//                 state.token = action.payload.token;
//             })
//             .addCase(loginUser.fulfilled, (state, action) => {
//                 state.user = action.payload.user;
//                 state.token = action.payload.token;
//             })
//             .addCase(logoutUser.fulfilled, (state) => {
//                 state.user = null;
//                 state.token = null;
//             })
//             .addCase(fetchUserProfile.fulfilled, (state, action) => {
//                 state.user = action.payload;
//             })
//             .addMatcher(
//                 (action) => action.type.endsWith('/rejected'),
//                 (state, action) => {
//                     state.error = action.error.message;
//                 }
//             );
//     },
// });

// // Export actions and reducer
// export const { clearAuth } = authSlice.actions;
// export default authSlice.reducer;





import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        token: null,
        isAuthenticated: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null
        },
    },
});

export const { setLoading, setUser, setLogout } = userSlice.actions;
export default userSlice.reducer;


