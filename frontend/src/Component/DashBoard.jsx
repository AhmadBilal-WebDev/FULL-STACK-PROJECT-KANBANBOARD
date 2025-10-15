import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../Component/Utils";
import { IoIosAddCircle } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";

const DashBoard = () => {
  const navigate = useNavigate();
  const [isOpenTask, setIsOpenTask] = useState(false);
  const [taskMenuData, setTaskMenuData] = useState({
    task: "",
    date: "",
    description: "",
  });
  const [userTaskData, setUserTaskData] = useState([]);
  const [editTaskMenu, setEditTaskMenu] = useState(false);
  const [editTaskData, setEditTaskData] = useState({
    task: "",
    date: "",
    description: "",
  });
  const [openTaskMenuData, setOpenTaskMenuData] = useState(null);
  const [statusResult, setStatusResult] = useState("");

  const handleLogOut = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setTimeout(() => {
      handleSuccess("You’ve Logged Out Successfully!");
      navigate("/login");
    }, 1000);
  };

  const handleOpenTaskMenu = () => setIsOpenTask(true);

  const handleCloseTaskMenu = () => {
    setIsOpenTask(false);
    setEditTaskMenu(false);
  };

  const handleTaskMenuData = (e) => {
    const { name, value } = e.target;
    setTaskMenuData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitTask = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:3000/task", {
        method: "POST",
        headers: { "Content-Type": "application/json", "authorization": token },
        body: JSON.stringify({ ...taskMenuData, status: "ToDo" }),
      });

      const result = await response.json();
      const { success, message } = result;

      if (success) {
        handleSuccess(message);
        setIsOpenTask(false);
        setTaskMenuData({ task: "", date: "", description: "" });
        fetchAllUserTask();
      }
    } catch (error) {
      handleError("Something went wrong while saving task!");
    }
  };

  const fetchAllUserTask = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:3000/getTask", {
        method: "GET",
        headers: { "Content-Type": "application/json", "authorization": token },
      });

      const { success, data } = await response.json();
      if (success) setUserTaskData(data);
    } catch (error) {
      handleError("Failed to load tasks!");
    }
  };

  useEffect(() => {
    fetchAllUserTask();
  });

  const handleDeleteTsk = async (id) => {
    try {
      const URL = `http://localhost:3000/deleteTask/${id}`;
      const response = await fetch(URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const { message, success } = await response.json();
      if (success) {
        handleSuccess(message);
        setUserTaskData((prev) => prev.filter((task) => task._id !== id));
      }
    } catch (error) {
      handleError("Error deleting task!");
    }
  };

  const handleEditTask = (id) => {
    setEditTaskMenu(true);
    const taskData = userTaskData.find((item) => item._id === id);
    setEditTaskData(taskData);
  };

  const handleEditTaskData = (e) => {
    const { name, value } = e.target;
    setEditTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSaveData = async (id) => {
    try {
      const URL = `http://localhost:3000/updateTask/${id}`;
      const response = await fetch(URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editTaskData),
      });

      const { message, success } = await response.json();
      if (success) {
        handleSuccess(message);
        setEditTaskMenu(false);
        setEditTaskData({ task: "", date: "", description: "" });
        fetchAllUserTask();
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError("Error updating data in DB!");
    }
  };

  const handleOpenTaskData = (id) => {
    setOpenTaskMenuData((prev) => (prev === id ? null : id));
  };

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData("taskId", item._id);
  };

  const handleDrop = async (event, newStatus) => {
    const id = event.dataTransfer.getData("taskId");
    try {
      const response = await fetch(
        `http://localhost:3000/updateTaskStatus/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const { success, message } = await response.json();
      if (success) {
        handleSuccess(`Moved to ${newStatus}`);
        setStatusResult(newStatus);
        setUserTaskData((prev) =>
          prev.map((task) =>
            task._id === id ? { ...task, status: newStatus } : ""
          )
        );
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError("Failed to update task status!");
    }
  };

  return (
    <>
      <header className="bg-blue-500 w-full">
        <div className="flex justify-between items-center h-[5rem] px-5 sm:px-8 md:px-10 lg:px-12">
          <p className="text-white font-semibold text-[1rem] w-40 text-center sm:w-full sm:text-start sm:text-xl">
            Hi <span>{localStorage.getItem("name")} </span>
            <br className="sm:hidden" />
            Manage Your Tasks
          </p>
          <div className="flex gap-3 items-center bg-amber-300 px-3 py-1 rounded sm:px-6 sm:py-[0.400rem]">
            <button
              className="font-semibold text-sm flex items-center gap-1 hover:cursor-pointer sm:text-[1.1rem]"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {isOpenTask && (
        <div className="h-screen w-full flex flex-col justify-center items-center shadow-2xl bg-transparent fixed inset-0 z-50">
          <div className="bg-white h-[17rem] w-[17rem] rounded-lg shadow-2xl">
            <div className="w-full flex justify-end pt-3 pr-2 text-xl">
              <IoCloseSharp
                onClick={handleCloseTaskMenu}
                className="hover:cursor-pointer"
              />
            </div>

            <div className="flex flex-col items-center justify-center gap-2 w-full mt-3">
              <input
                type="text"
                name="task"
                value={taskMenuData.task}
                onChange={handleTaskMenuData}
                placeholder="Task Name"
                className="border w-55 pl-2 rounded py-1 text-sm"
              />
              <input
                type="date"
                name="date"
                value={taskMenuData.date}
                onChange={handleTaskMenuData}
                className="border w-55 pl-2 rounded py-1 text-sm"
              />
              <textarea
                placeholder="Add Description"
                name="description"
                value={taskMenuData.description}
                onChange={handleTaskMenuData}
                className="border w-55 h-25 pl-2 text-sm rounded pt-1"
              ></textarea>

              <button
                className="bg-amber-400 px-3 py-1 rounded text-white font-semibold hover:cursor-pointer"
                onClick={handleSubmitTask}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {editTaskMenu && (
        <div className="h-screen w-full flex flex-col justify-center items-center shadow-2xl bg-transparent fixed inset-0 z-50">
          <div className="bg-white h-[17rem] w-[17rem] rounded-lg shadow-2xl">
            <div className="w-full flex justify-end pt-3 pr-2 text-xl">
              <IoCloseSharp
                onClick={handleCloseTaskMenu}
                className="hover:cursor-pointer"
              />
            </div>

            <div className="flex flex-col items-center justify-center gap-2 w-full mt-3">
              <input
                type="text"
                name="task"
                value={editTaskData.task}
                onChange={handleEditTaskData}
                placeholder="Task Name"
                className="border w-55 pl-2 rounded py-1 text-sm"
              />
              <input
                type="date"
                name="date"
                value={editTaskData.date}
                onChange={handleEditTaskData}
                className="border w-55 pl-2 rounded py-1 text-sm"
              />
              <textarea
                placeholder="Add Description"
                name="description"
                value={editTaskData.description}
                onChange={handleEditTaskData}
                className="border w-55 h-25 pl-2 text-sm rounded pt-1"
              ></textarea>

              <button
                className="bg-amber-400 px-3 py-1 rounded text-white font-semibold hover:cursor-pointer"
                onClick={() => handleEditSaveData(editTaskData._id)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="px-1">
        <div>
          <h1 className="text-2xl font-bold text-center pt-8">𝒦𝒜𝒩𝐵𝒜𝒩 𝐵𝒪𝒜𝑅𝒟</h1>

          <div className="w-full flex justify-center mt-5">
            <button className="rounded text-[2rem]">
              <IoIosAddCircle
                className="bg-black text-white rounded-full hover:cursor-pointer hover:bg-amber-400"
                onClick={handleOpenTaskMenu}
              />
            </button>
          </div>
        </div>

        <div className="flex justify-around sm:justify-center sm:gap-5 mt-5">
          {["ToDo", "Doing", "Done"].map((status) => (
            <section
              key={status}
              className={`w-[32vw] md:w-[15rem] shadow-2xl border rounded`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, status)}
            >
              <h1
                className={`text-sm font-bold text-center p-1 md:text-lg ${status === "ToDo"
                  ? "bg-red-200"
                  : status === "Doing"
                    ? "bg-yellow-200"
                    : "bg-green-200"
                  }`}
              >
                {status}
              </h1>

              <div className="mt-2 mb-2 rounded-lg mx-1 px-[0.100rem] sm:px-2">
                {userTaskData
                  .filter((task) => task.status === status)
                  .map((items, index) => (
                    <div
                      key={items._id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, items)}
                      className="mt-1 bg-gray-100 sm:rounded-lg sm:py-2 cursor-grab"
                      onClick={() => handleOpenTaskData(items._id)}
                    >
                      <div className="w-full  py-1 px-[0.200rem] sm:px-2">
                        <h1 className="text-[0.700rem] font-bold text-center sm:text-[0.900rem]">
                          {items.task}
                        </h1>
                      </div>

                      {openTaskMenuData === items._id && (
                        <div>
                          <div className="w-full px-[0.200rem] sm:px-2">
                            <h1 className="text-[0.600rem] font-semibold sm:text-[0.800rem] text-center">
                              {items.date}
                            </h1>
                          </div>

                          <div className="mt-1 px-[0.200rem] pb-1 sm:px-2">
                            <p className="text-[0.500rem] text-center sm:text-[0.700rem]">
                              {items.description}
                            </p>
                          </div>

                          <div className="mt-1 px-[0.200rem] pb-1 sm:px-2">
                            <p className="text-[0.500rem] text-center sm:text-[0.700rem]">
                              {statusResult}
                            </p>
                          </div>

                          <div className="flex justify-center gap-3 pr-1 pb-2 mt-2">
                            <MdOutlineModeEditOutline
                              className="text-[0.800rem] text-green-500 sm:text-[1.1rem] hover:cursor-pointer"
                              onClick={() => handleEditTask(items._id)}
                            />
                            <RiDeleteBin6Line
                              className="text-[0.800rem] text-red-500 sm:text-[1.2rem] hover:cursor-pointer"
                              onClick={() => handleDeleteTsk(items._id)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashBoard;