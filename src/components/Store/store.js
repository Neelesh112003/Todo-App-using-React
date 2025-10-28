import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './taskSlice';

const store = configureStore({
  reducer: {
    tasks: todoReducer, // use 'tasks' to match useSelector(state => state.tasks.list)
  },
});

export default store;
