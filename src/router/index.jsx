import AddTask from "../pages/Task/AddTask";
import EditTask from "../pages/Task/EditTask";
import TaskListing from "../pages/Task/TaskListing";

export const routes = [
    {
        path:"/",
        element:<TaskListing/>
    },
     {
        path:"/add",
        element:<AddTask/>
    },
      {
        path:"/edit/:id",
        element:<EditTask/>
    },
]