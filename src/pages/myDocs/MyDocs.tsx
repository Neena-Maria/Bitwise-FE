import { useNavigate, useParams } from "react-router-dom";
import ListCard from "../../components/ListCard";
import { getMyDocs } from "../../api";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { createMyDoc } from "../../api";
import SideBar from "../../components/sidebar/Sidebar";

const MyDocs = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [myDocsData, setMyDocsData] = useState<{ id: string; name: string }[]>(
    []
  );
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [docName, setDocName] = useState<string>("");


  async function fetchMyDocs() {
    const response = await getMyDocs(id as string);
    const responseData = await response.json();
    console.log("res", responseData);
    if (responseData.data[0]) {
      setMyDocsData(responseData.data);
    }
  }

  useEffect(() => {
    fetchMyDocs();
  }, []);

  const handleSaveMyDoc = async () => {
    const request = {
      workspaceId: id,
      name: docName,
    };
    const res = await createMyDoc(request);
    if (res.ok) {
      fetchMyDocs();
    }
    setShowAddModal(false);
    setDocName("");
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SideBar />
      <div className="h-full w-full px-8">
        <div className="flex mt-10">
          <p className="font-semibold text-lg">My Notes</p>
          <Button
            variant="primary"
            label="+ Add My Docs"
            onClick={() => {
              setShowAddModal(true);
            }}
            className="ml-auto mr-1 mb-5"
          />
        </div>
        {myDocsData.map((item: any) => (
          <ListCard
            name={item.name}
            handleClick={() =>
              navigate(`/workspace/${id}/documents/${item.id}`)
            }
          />
        ))}
        {showAddModal && (
          <Modal
            isOpen={showAddModal}
            onCancel={() => {
              setShowAddModal(false);
              setDocName("");
            }}
          >
            <div className="max-w-[600px]">
              <p className="w-[500px] px-6 py-4">Add My Doc </p>
              <hr />
              <div className="px-6 mt-4 mb-6">
                <p className="mb-2">Name</p>
                <input
                  placeholder="Workspace Name"
                  className="outline-none border-2 px-2 h-10 w-full border-[#BBC0C5] rounded-lg"
                  onChange={(e) => setDocName(e.target.value)}
                  value={docName}
                />
              </div>
            </div>
            <div className="mt-5 flex flex-row px-6 mb-6">
              <Button
                label="Submit"
                className="mr-5"
                variant="primary"
                onClick={handleSaveMyDoc}
              />
              <Button
                label="Cancel"
                variant="secondary"
                onClick={() => {
                  setShowAddModal(false);
                  setDocName("");
                }}
              />
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default MyDocs;
