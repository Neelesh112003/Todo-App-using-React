import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import DarkModeToggle from "./components/DarkModeToggle";
import Heading from "./components/Heading";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { addTask, updateTask, deleteTask, toggleCompleted } from "./components/Store/taskSlice"; 

function App() {
  const tasks = useSelector((state) => state.tasks.list);
  const dispatch = useDispatch();

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);


  const handleAddTask = (task) => dispatch(addTask(task));
  const handleUpdateTask = (task) => dispatch(updateTask(task));
  const handleDeleteTask = (id) => dispatch(deleteTask(id));
  const handleToggleCompleted = (id) => dispatch(toggleCompleted(id));

  return (
    <>
      <Heading />
      <DarkModeToggle />
      <TodoForm onAdd={handleAddTask} />

      <center>
        <div className="row mt-4">
          <div className="col-md-6 border-end pe-4">
            <h2 className="mt-4">Pending Tasks</h2>
            <TodoList
              tasks={pendingTasks}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleCompleted}
              onUpdate={handleUpdateTask}
            />
          </div>

          <div className="col-md-6">
            <h2 className="mt-4">Completed Tasks</h2>
            <TodoList
              tasks={completedTasks}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleCompleted}
              onUpdate={handleUpdateTask}
            />
          </div>
        </div>
      </center>
    </>
  );
}

export default App;
