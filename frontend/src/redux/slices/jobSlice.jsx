/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const JobsSlice = createSlice({
    name: "jobs",
    initialState: {
        loading: false,
        message: null,
        error: null,
        jobs: [],
        singleJob: {},
        myAppliedJobs: [],
    },
    reducers: {
        requestForJobs: (state, action) => {
            state.loading = true;
            state.error = null
        },
        sucessForJobs: (state, action) => {
            state.loading = false;
            state.jobs = action.payload;
            state.error = null
        },
        failedForJobs: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        requestSingleJob: (state, action) => {
            state.loading = true;
            state.error = null
        },
        sucessSingleJob: (state, action) => {
            state.loading = false;
            state.singleJob = action.payload;
            state.error = null
        },
        failedSingleJob: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        requestMyAppliedJobs: (state, action) => {
            state.loading = true
            state.error = null;
        },

        successMyAppliedJobs: (state, action) => {
            state.loading = false
            state.myAppliedJobs = action.payload;
            state.error = null;
        },

        failedMyAppliedJobs: (state, action) => {
            state.loading = false
            state.error = action.payload;
        },



        requestAllMyJobs: (state, action) => {
            state.loading = true;
            state.error = null
        },
        sucessAllMyJobs: (state, action) => {
            state.loading = false;
            state.myjobs = action.payload;
            state.error = null
        },
        failedAllMyJobs: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
}
)



export const { requestForJobs, sucessForJobs,
    requestSingleJob, sucessSingleJob, failedSingleJob,
    requestMyAppliedJobs,
    successMyAppliedJobs,
    failedMyAppliedJobs,
    requestAllMyJobs, sucessAllMyJobs, failedAllMyJobs,
    clearAllError, failedForJobs } = JobsSlice.actions;
export default JobsSlice.reducer;


let axiosConfig = {
    withCredentials: true,
}
// all jobs 
export const fetchJobs = (city, category, searchKeyword = "") => async (dispatch) => {
    try {
        dispatch(requestForJobs());
        let link = `${import.meta.env.VITE_REACT_APP_API_BASE_UR}/job/get?`;

        let queryParams = [];
        if (searchKeyword) {
            queryParams.push(`searchKeyword=${searchKeyword}`);
        }
        if (city) {
            queryParams.push(`city=${city}`);
        }
        if (category) {
            queryParams.push(`category=${category}`);
        }
        link += queryParams.join("&")
        const response = await axios.get(link, {
            withCredentials: true
        })

        dispatch(sucessForJobs(response?.data?.jobs))
    } catch (error) {
        console.log(error);
        dispatch(failedForJobs(error?.response?.data?.message))
    }

}

// single job
export const fetchSingleJob = (id) => async (dispatch) => {
    try {
        dispatch(requestSingleJob());
        const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_UR}/job/get/${id}`, {
            withCredentials: true
        }
        )

        if (data.success) {
            dispatch(sucessSingleJob(data?.job))
        }
    } catch (error) {
        console.log(error);
        dispatch(failedSingleJob(error?.response?.data?.message))
    }

}

// user applied jobs 
export const getMyAppliedJobs = () => {
    return async (dispatch) => {
        dispatch(requestMyAppliedJobs())
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_UR}/application/get-applied-myjobs`, axiosConfig);
            console.log("getMyAppliedJobs :", data);

            if (data.success) {
                dispatch(successMyAppliedJobs(data?.application));
            }
        } catch (error) {
            console.log(error);
            dispatch(failedMyAppliedJobs(error?.response?.data?.message))

        }
    };
}




