import {configureStore} from '@reduxjs/toolkit'
import TodoSlices from './Todoslices'

export const store = configureStore({
    reducer:{
        Todo:TodoSlices
    }
})