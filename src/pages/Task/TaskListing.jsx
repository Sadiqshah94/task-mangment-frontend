import { Button, Popconfirm, Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import requests from "../../api/axios";
import { useEffect, useState } from "react";
import { deleteTask, getTaskList } from "../../store/slices/TaskSlice";

const TaskListing = () => {
  const allTasks = useSelector((state) => state?.task);
  const [loadingTasks, setLoadingTasks] = useState(false); // Loading for fetching tasks
  const [deleting, setDeleting] = useState(null); // Loading for delete actions
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAllTasks = async () => {
    setLoadingTasks(true);
    try {
      const response = await requests.get("/tasks");
      dispatch(getTaskList(response?.data));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const deleteT = async (id) => {
    setDeleting(id); // Set the ID of the task being deleted
    try {
      await requests.delete(`/tasks/delete/${id}`);
      dispatch(deleteTask({ id }));
      getAllTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setDeleting(null); // Clear the loading state
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex gap-2">
 <Button 
        disabled={deleting === record._id} 
        onClick={() => navigate(`/edit/${record._id}`)}
        style={{
          cursor: deleting === record._id ? 'not-allowed' : 'pointer',
          opacity: deleting === record._id ? 0.5 : 1,
        }}
        aria-disabled={deleting === record._id}
      >
        Edit
      </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteT(record._id)}
          >
            <Button danger loading={deleting === record._id}>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="w-1/2 m-auto my-6">
      <div className="flex justify-end my-4">
        <Button className="w-32 py-4" onClick={() => navigate("/add")}>
          Add
        </Button>
      </div>
      {loadingTasks ? (
        <div className="flex items-center justify-center">
          <Spin size="large" />
        </div>
      ) : (
          <Table
          pagination={allTasks?.tasks.length > 5}
            
          dataSource={allTasks?.tasks?.map((task) => ({
            key: task?._id,
            ...task,
          }))}
          columns={columns}
        />
      )}
    </div>
  );
};

export default TaskListing;
