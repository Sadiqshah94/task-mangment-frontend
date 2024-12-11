// store/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks:[],
}


const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
      getTaskList: (state, { payload }) => {
          console.log(state.tasks)
     state.tasks = payload;
      },
    addTask: (state,{payload}) => {
      state.tasks.push(payload);
      },
    deleteTask: (state, { payload }) => {
      console.log(payload)
      // state.tasks = payload;
},
  },
});

export const { getTaskList,addTask,deleteTask } = TaskSlice.actions;
export default TaskSlice.reducer;
