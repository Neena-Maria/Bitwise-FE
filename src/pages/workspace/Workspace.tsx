import { useState } from "react";
import { useNavigate } from "react-router-dom";

import update from "immutability-helper";

import { ReactComponent as WorkSpaceIcon } from "../../icons/workspace.svg";
import { ReactComponent as UsersIcon } from "../../icons/users.svg";
import { ReactComponent as AdminIcon } from "../../icons/admin.svg";
import { ReactComponent as EditIcon } from "../../icons/edit.svg";

import Modal from "../../components/Modal";
import Chip from "../../components/Chip";
import Button from "../../components/Button";

const WorkSpace = () => {
  const navigate = useNavigate();

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const [workspaceName, setWorkspaceName] = useState<string>("");
  const [emailId, setEmailId] = useState<string>("");
  const [emailList, setEmailList] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  // TODO take data from api
  const list = [
    {
      id: "1",
      name: "workspace 1",
      admin: "adasd",
      accessCount: 5,
      description: "sdfadfafadfafddsfa",
    },
    {
      id: "2",
      name: "workspace 2",
      admin: "adasd",
      accessCount: 5,
      description: "sdfadfafadfafddsfa",
    },
    {
      id: "3",
      name: "workspace 3",
      admin: "adasd",
      accessCount: 5,
      description: "sdfadfafadfafddsfa",
    },
    {
      id: "4",
      name: "workspace 4",
      admin: "adasd",
      accessCount: 5,
      description: "sdfadfafadfafddsfa",
    },
    {
      id: "5",
      name: "workspace 5",
      accessCount: 5,
      description: "sdfadfafadfafddsfa",
    },
    {
      id: "6",
      name: "workspace 6",
      admin: "adasd",
      accessCount: 5,
      description: "sdfadfafadfafddsfa",
    },
    {
      id: "7",
      name: "workspace 7",
      admin: "adasd",
      accessCount: 5,
      description: "sdfadfafadfafddsfa",
    },
    {
      id: "8",
      name: "workspace 8",
      admin: "adasd",
      accessCount: 5,
      description: "sdfadfafadfafddsfa",
    },
    {
      id: "9",
      name: "workspace 9",
      admin: "adasd",
      accessCount: 5,
      description: "sdfadfafadfafddsfa",
    },
    {
      id: "10",
      name: "workspace 10",
      admin: "adasd",
      accessCount: 5,
      description: "sdfadfafadfafddsfa",
    },
    {
      id: "11",
      name: "workspace 11",
      admin: "adasd",
      accessCount: 5,
      description: "sdfadfafadfafddsfa",
    },
  ];

  const findIndex = (item: string) =>
    emailList.findIndex((email) => email === item);

  const onRemoveChip = (chipData: string) => {
    let temp: string[] = [];
    let emailData = chipData.trim();
    const index = findIndex(emailData);
    if (index > -1) {
      temp = update(emailList, { $splice: [[index, 1]] });
    }
    setEmailList(temp);
  };

  const handleEmailKeyDown = (e: any) => {
    if (["Enter", ","].includes(e.key)) {
      setEmailId("");
      e.preventDefault();
      let temp: string[] = [];
      let emailData = emailId.trim();
      const index = findIndex(emailData);
      if (index < 0) {
        temp = update(emailList, { $push: [emailData] });
        setEmailList(temp);
      }
    }
  };

  return (
    <div className="h-screen w-screen overflow-x-auto">
      <p className="mb-16 mt-10 flex items-center justify-center text-3xl font-extrabold">
        My Workspaces
      </p>
      <Button
        label="+ Add Workspace"
        variant="primary"
        onClick={() => setShowAddModal(true)}
        className="ml-auto mr-10 mb-5"
      />
      <div className="flex flex-col items-center mb-4 mr-10">
        {list.map((item) => (
          <div
            className="relative w-[1500px] p-3 py-6 mt-3 rounded-lg border border-[#E8EAEB] bg-[#f2f4fc]"
            role="presentation"
            onClick={() => {
              // TODO navigate to /workspace/id
              navigate("/login");
            }}
          >
            <div className="grid grid-cols-5">
              <div className="flex items-center">
                <WorkSpaceIcon className="h-5 w-5 ml-3" />
                <p className="ml-4 text-lg">{item.name}</p>
              </div>
              <div className="flex items-center">
                <UsersIcon className="h-5 w-5 mr-4" />
                <p className="text-lg">{item.accessCount}</p>
              </div>
              <div className="flex flex-row">
                <AdminIcon className="h-5 w-5 mr-4" />
                <p className="text-lg">{item.admin}</p>
              </div>
              <p className="text-lg">{item.description}</p>
              <div
                role="presentation"
                className="hover:bg-sky-200 w-fit p-2 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <EditIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
      {(showAddModal || showEditModal) && (
        <Modal
          isOpen={showAddModal}
          onCancel={() => {
            setShowAddModal(false);
            setShowEditModal(false);
            setEmailId("");
            setWorkspaceName("");
            setEmailList([]);
            setDescription("");
          }}
        >
          <div className="max-w-[600px]">
            <p className="w-[500px] px-6 py-4">Add New Workspace </p>
            <hr />
            <div className="px-6 mt-4 mb-6">
              <p className="mb-2">Name</p>
              <input
                placeholder="Workspace Name"
                className="outline-none border-2 px-2 h-10 w-full border-[#BBC0C5] rounded-lg"
                onChange={(e) => setWorkspaceName(e.target.value)}
                value={workspaceName}
              />
              <p className="mb-2 mt-4">Description</p>
              <textarea
                placeholder="Description"
                className="outline-none border-2 px-2  w-full border-[#BBC0C5] rounded-lg"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                rows={4}
                cols={50}
              />
              <p className="mt-2 mb-2">Email</p>
              <input
                placeholder="Email Ids"
                className="outline-none border-2 px-2 h-10 w-full border-[#BBC0C5] rounded-lg"
                onChange={(e) => setEmailId(e.target.value)}
                value={emailId}
                onKeyDown={handleEmailKeyDown}
              />
              <div className="max-h-[100px] flex-wrap w-full flex mt-4 overflow-x-hidden overflow-y-auto">
                {emailList.map((item) => (
                  <Chip
                    label={item}
                    onRemove={() => onRemoveChip(item)}
                    className="mr-3 mt-3"
                  />
                ))}
              </div>

              <div className="mt-5 flex flex-row">
                <Button
                  label="Submit"
                  className="mr-5"
                  variant="primary"
                  onClick={() => {
                    /* TODO: call api */
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setEmailId("");
                    setWorkspaceName("");
                    setEmailList([]);
                    setDescription("");
                  }}
                />
                <Button
                  label="Cancel"
                  variant="secondary"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setEmailId("");
                    setWorkspaceName("");
                    setEmailList([]);
                    setDescription("");
                  }}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default WorkSpace;
