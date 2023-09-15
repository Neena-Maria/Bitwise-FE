import { useState } from "react";
import DragAndDrop from "../../components/drag-and-drop/DragAndDrop";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

const Board = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const onCloseModal = () => {
    setShowCreateModal(false);
    setTitle("");
    setDescription("");
    setStatus("todo");
  };

  return (
    <>
      <div className="h-[calc(100vh-100px)] px-8 py-4">
        <div className="flex flex-row justify-between items-center">
          <div className="text-2xl font-semibold"> Bitwise Board </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            label="+ Create Task"
            variant="primary"
          />
        </div>
        <div className="flex flex-row gap-8 my-8 h-full w-full">
          <DragAndDrop />
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
            <p className="my-2">Status</p>

            <select
              onChange={(event) => setStatus(event.target.value)}
              value={status}
              className="outline-none border-2 px-2 h-10 w-full border-[#BBC0C5] rounded-lg"
            >
              <option value="todo">Todo</option>
              <option value="inprogress">In Progress</option>
              <option value="inreview">In Review</option>
              <option value="done">Done</option>
            </select>

            <div className="mt-5">
              <button
                onClick={onCloseModal}
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
    </>
  );
};

export default Board;
