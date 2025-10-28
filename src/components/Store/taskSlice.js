import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  list:JSON.parse(localStorage.getItem('tasks')) || [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.list.push(action.payload);  
      localStorage.setItem('tasks', JSON.stringify(state.list));
    },
    updateTask: (state, action) => {
      const index = state.list.findIndex(task => task.id === action.payload.id);  
      if (index !== -1) {
        state.list[index] = action.payload;  
        localStorage.setItem('tasks', JSON.stringify(state.list));
      }
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.list));
    },
    toggleCompleted: (state, action) => {
      const index = state.list.findIndex(task => task.id === action.payload);     
      if (index !== -1) {
        state.list[index].completed = !state.list[index].completed;  
        localStorage.setItem('tasks', JSON.stringify(state.list));
      }
    },
  },
});

export const {addTask, updateTask, deleteTask, toggleCompleted} = todoSlice.actions;
export default todoSlice.reducer;