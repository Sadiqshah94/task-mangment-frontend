import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import requests from "../../api/axios";
import { useEffect } from "react";
import { deleteTask, getTaskList } from "../../store/slices/TaskSlice";

const TaskListing = () => {

  const allTasks = useSelector((state) => state?.task); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getAllTasks = async () => {
    const response = await requests.get('/tasks');
    dispatch(getTaskList(response?.data));
  }

  const deleteT = async (id) => {
    console.log("id",id)
    await requests.delete(`/tasks/delete/${id}`);
    dispatch(deleteTask({id}));
    getAllTasks();
  }

  //  dispatch(deleteCurrentIdTask({ id })).then(unwrapResult).then(res => {
  //     if (res.status === 200) {
  //       getAllTasks();
       
  //    }
  //   })


  useEffect(() => {
    getAllTasks()
  },[])



const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'due_date',
  },
  {
    title: 'Due Date',
    dataIndex: 'due_date',
    key: 'due_date',
  },
    {
      title: 'Actions', 
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => {
        console.log(record?._id)
        return (
        <div className="flex gap-2">
          <Button onClick={() =>  navigate(`/edit/${record._id}`)}>Edit</Button>
          <Button onClick={() => deleteT(record._id)} danger>Delete</Button>
        </div>
      )
      },
    },
];
  return (
    <div className="w-1/2 m-auto my-6">
      <div className="flex justify-end my-4 ">
         <Button className="w-32 py-4" onClick={()=>navigate('/add')}>Add</Button>
     </div>
      <Table dataSource={allTasks?.tasks?.map((task) => ({
          key:task?._id,
        ...task, 
      }))} columns={columns} />
    </div>
  )
}

export default TaskListing
