import { configureStore } from "@reduxjs/toolkit";
import TaskSlice from "./slices/TaskSlice";


const store = configureStore({
    reducer: {
        task:TaskSlice
    }
})

export default store;

