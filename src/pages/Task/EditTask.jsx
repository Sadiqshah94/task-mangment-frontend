import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import requests from "../../api/axios";
import { Button } from "antd";
import { useState } from "react";

export default function EditTask() {
  const allTasks = useSelector((state) => state?.task?.tasks);
  const { id } = useParams();
  const currentTask = allTasks?.find((item) => item?._id == id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true)
    await requests.put(`/tasks/update/${id}`, data);
    setLoading(false);
    navigate('/');
    
  };

  return (
    <div className="max-w-[800px] m-auto flex justify-center items-center h-[100vh]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 w-[500px] m-auto bg-gray-400 flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-center text-white">Edit Task</h1>
          <input
            defaultValue={currentTask?.title}
            placeholder="Enter title"
            className="p-2 rounded-md"
            {...register("title", { required: true })}
          />
          {errors.title && <span>Title is required</span>}

          <input
            defaultValue={currentTask?.description}
            placeholder="Enter Description"
            className="p-2 rounded-md"
            {...register("description", { required: true })}
          />
          {errors.description && <span>Description is required</span>}

          <input
            defaultValue={currentTask?.due_date}
            placeholder="Enter Due Date"
            className="p-2 rounded-md"
            {...register("due_date", { required: true })}
          />
          {errors.due_date && <span>Due date is required</span>}

          <div className="flex justify-end my-4">
             <Button loading={loading} type="primary" htmlType="submit">
        Update
      </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
