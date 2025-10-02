import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../Component/Utils";
import { IoIosAddCircle } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";

const DashBoard = () => {
  const navigate = useNavigate();
  const [isOpenTask, setIsOpenTask] = useState(false);
  const [taskMenuData, setTaskMenuData] = useState({
    task: "",
    date: "",
    description: "",
  });
  const [userTaskData, setUserTaskData] = useState([]);

  const handleLogOut = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setTimeout(() => {
      handleSuccess("You’ve Logged Out Successfully! ✅");
      navigate("/login");
    }, 1000);
  };

  const handleOpenTaskMenu = () => {
    setIsOpenTask(true);
  };

  const handleCloseTaskMenu = () => {
    setIsOpenTask(false);
  };

  const handleTaskMenuData = (e) => {
    const { name, value } = e.target;
    const data = { ...taskMenuData };
    data[name] = value;
    setTaskMenuData(data);
  };

  const handleSubmitTask = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const responce = await fetch("http://localhost:3000/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...taskMenuData, userId }),
      });
      const result = await responce.json();

      const { success, message } = result;
      if (success) {
        setIsOpenTask(false);
        handleSuccess(message);
        setTaskMenuData({
          task: "",
          date: "",
          description: "",
        });
      }
    } catch (error) {
      return handleError("Something went wrong while saving task!");
    }
  };

  const fetchAllUserTask = async (req, res) => {
    const userId = localStorage.getItem("userId");
    const URL = `http://localhost:3000/getTask/${userId}`;
    const responce = await fetch(URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const { message, success, data } = await responce.json();
    if (success) {
      setUserTaskData(data);
    }
  };

  useEffect(() => {
    fetchAllUserTask();
  }, [taskMenuData]);

  return (
    <>
      <header className="bg-blue-500 w-full">
        <div className="flex justify-between items-center h-[5rem] px-5 sm:px-8 md:px-10 lg:px-12">
          <p className="text-white font-semibold text-[1rem] w-40 text-center sm:w-full sm:text-start sm:text-xl">
            ​Hi <span>{localStorage.getItem("name")} </span>
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

      {isOpenTask ? (
        <div className="h-screen border border-gray-300 w-full flex flex-col justify-center items-center shadow-2xl bg-transparent fixed inset-0 z-50">
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
                save
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div
        className={`px-1 ${
          isOpenTask ? "bg-gray-100 opacity-50 h-[calc(100vh-5rem)]" : ""
        }`}
      >
        <h1 className="text-2xl font-bold text-center pt-8">𝒦𝒜𝒩𝐵𝒜𝒩 𝐵𝒪𝒜𝑅𝒟</h1>

        <div className="w-full flex justify-center mt-5">
          <button className="rounded text-[2rem]">
            <IoIosAddCircle
              className="bg-black text-white rounded-full hover:cursor-pointer hover:bg-amber-400"
              onClick={handleOpenTaskMenu}
            />
          </button>
        </div>

        <div className="flex justify-around sm:justify-center sm:gap-5 mt-5">
          <section className="w-[32vw] md:w-[15rem] shadow-2xl">
            <h1 className="text-sm font-bold bg-red-200 text-center p-1 md:text-lg">
              ToDo
            </h1>
            <div className=" mt-2 mb-2 rounded-lg mx-1 px-[0.100rem] sm:px-2">
              {userTaskData.map((items, index) => (
                <div
                  key={index}
                  className="mt-1 bg-gray-100 sm:rounded-lg sm:py-2"
                >
                  <div className="w-full flex justify-between items-center py-1 px-[0.200rem] sm:px-2">
                    <h1 className="text-[0.700rem] font-semibold sm:text-[0.900rem]">
                      {items.task}
                    </h1>

                    <MdDeleteForever className="text-[0.800rem] text-red-500 sm:text-[1.1rem] w-4" />
                  </div>

                  <div className="w-full px-[0.200rem] sm:px-2">
                    <h1 className="text-[0.600rem] sm:text-[0.800rem]">
                      {items.date}
                    </h1>
                  </div>

                  <div className="mt-1 px-[0.200rem] pb-1 sm:px-2">
                    <p className="text-[0.500rem] sm:text-[0.700rem]">
                      {items.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="w-[32vw] md:w-[15rem]">
            <h1 className="text-sm font-bold bg-yellow-200 text-center p-1 md:text-lg">
              Doing
            </h1>
          </section>

          <section className="w-[32vw] md:w-[15rem]">
            <h1 className="text-sm font-bold bg-green-200 text-center p-1 md:text-lg">
              Done
            </h1>
          </section>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
