import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";


export const store = configureStore({
    reducer: {
        auth: userSlice,
        // jobs: JobsSlice,
        // myjobs: myJobsSlice,

    },
})
