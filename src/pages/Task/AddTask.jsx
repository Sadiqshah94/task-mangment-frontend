import { useForm } from "react-hook-form"
import requests from "../../api/axios"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { addTask } from "../../store/slices/TaskSlice";


export default function AddTask() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

const onSubmit = async (data) => {
  try {
    const response = await requests.post('/tasks/add', data);
    navigate('/');
    dispatch(addTask(response));
  } catch (error) {
    console.error("Failed to add task:", error);
  }
};


  return (
    <div className="max-w-[800px] m-auto flex justify-center items-center h-[100vh]">
       <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-6 w-[500px] m-auto bg-gray-400 flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-center text-white">Add Task</h1>
         <input placeholder="Enter title" className="p-2 rounded-md "  {...register("title",{ required: true })} />
      {errors.title && <span>title is required</span>}
      <input placeholder="Enter Description" className="p-2 rounded-md " {...register("description", { required: true })} />
      {errors.description && <span>description is required</span>}
        <input  placeholder="Enter Due Date" className="p-2 rounded-md " {...register("due_date", { required: true })} />
      {errors.due_date && <span>due_date is required</span>}
       <div className="flex justify-end my-4 ">
         <input type="submit" className="w-32 py-2 bg-white rounded-md cursor-pointer"/>
     </div>
     </div>
    </form>
   </div>
  )
}