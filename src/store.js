
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice'


console.log(userReducer)
const store = configureStore(
    {
        reducer: {
            user:userReducer
        }
    }
);
export default store;