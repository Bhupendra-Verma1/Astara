import { configureStore } from "@reduxjs/toolkit";
import promptReducer from './promptSlice'

const store = configureStore({
    reducer : {
        prompt : promptReducer
    }
})

export default store