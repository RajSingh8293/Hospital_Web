// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "./slices/userSlice";


// export const store = configureStore({
//     reducer: {
//         auth: userSlice,
//         // jobs: JobsSlice,
//         // myjobs: myJobsSlice,

//     },
// })



import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from "./slices/userSlice"




// persist
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// persist

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({
    auth: authSlice,

});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);
