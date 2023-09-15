import { useEffect, useState } from "react";
import DragAndDrop from "../../components/drag-and-drop/DragAndDrop";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { getAllTasks, createTask } from "../../api";
import { TicketStatus } from "../../constants";
import { useParams } from "react-router-dom";
import SideBar from "../../components/sidebar/Sidebar";

const Board = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<any>();
  const { workspaceId = "" } = useParams();

  const onCloseModal = () => {
    setShowCreateModal(false);
    setTitle("");
    setDescription("");
  };

  const getTasksByStatus = (taskList: any, status: string) => {
    return taskList.filter((task: any) => task.status === status);
  };

  async function fetchTasks() {
    const response = await getAllTasks(workspaceId);
    const responseData = await response.json();
    if (responseData.data) {
      const openTasks = getTasksByStatus(responseData.data, TicketStatus.OPEN);
      const inProgressTasks = getTasksByStatus(
        responseData.data,
        TicketStatus.IN_PROGRESS
      );
      const underReviewTasks = getTasksByStatus(
        responseData.data,
        TicketStatus.UNDER_REVIEW
      );
      const completedTasks = getTasksByStatus(
        responseData.data,
        TicketStatus.COMPLETED
      );
      const statusObject = {
        [TicketStatus.OPEN]: openTasks,
        [TicketStatus.IN_PROGRESS]: inProgressTasks,
        [TicketStatus.UNDER_REVIEW]: underReviewTasks,
        [TicketStatus.COMPLETED]: completedTasks,
      };
      setTasks(statusObject);
    }
  }

  const createNewTask = async () => {
    const payload = {
      title,
      description,
      workspaceId: workspaceId,
    };
    const response = await createTask(payload);
    if (response.ok) {
      await fetchTasks();
      setTimeout(() => {
        window.location.reload();
      });
      onCloseModal();
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen w-screen">
      <SideBar />
      <div className="min-h-[calc(100vh-100px)] px-8 py-4 w-full">
        <div className="flex flex-row justify-between items-center">
          <div className="text-2xl font-semibold"> Bitwise Board </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            label="+ Create Task"
            variant="primary"
          />
        </div>
        <div className="flex flex-row gap-8 my-8 h-full w-full">
          {tasks && <DragAndDrop tasks={tasks} />}
        </div>
      </div>
      <Modal isOpen={showCreateModal} onCancel={onCloseModal}>
        <div>
          <p className="w-[500px] px-6 py-4">Add New Task </p>
          <hr />
          <div className="px-6 mt-4 mb-6">
            <p className="mb-2">Name</p>
            <input
              placeholder="Title"
              className="outline-none border-2 px-2 h-10 w-full border-[#BBC0C5] rounded-lg"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <p className="my-2">Description</p>
            <textarea
              placeholder="Description"
              className="outline-none border-2 px-2  w-full border-[#BBC0C5] rounded-lg"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              rows={4}
              cols={50}
            />

            <div className="mt-5">
              <button
                onClick={createNewTask}
                className="bg-blue-500 hover:bg-blue-800 rounded-lg p-2 text-white"
              >
                Submit
              </button>
              <button
                className="ml-3 border border-blue-500 hover:bg-blue-200 rounded-lg p-2 text-blue-800"
                onClick={onCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Board;
