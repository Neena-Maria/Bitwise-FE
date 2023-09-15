import { useNavigate, useParams } from "react-router-dom";
import ListCard from "../../components/ListCard";
import SideBar from "../../components/sidebar/Sidebar";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { createGoogleDoc, getGoogleDocs } from "../../api";
import MindMap from "../../components/MindMap";

const GoogleDocs = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id", id);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [docName, setDocName] = useState<string>("");
  const [myDocsData, setMyDocsData] = useState<{ id: string; name: string }[]>(
    []
  );

  async function fetchGoogleDocs() {
    const response = await getGoogleDocs(id as string);
    const responseData = await response.json();
    console.log("res", responseData);
    if (responseData.data[0]) {
      setMyDocsData(responseData.data);
    }
  }

  useEffect(() => {
    fetchGoogleDocs();
  }, []);

  const handleSaveMyDoc = async () => {
    const request = {
      workspaceId: id,
      name: docName,
    };
    const res = await createGoogleDoc(request);
    if (res.ok) {
      fetchGoogleDocs();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    setShowAddModal(false);
    setDocName("");
  };
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SideBar />
      <div className="h-full w-[55%] px-8">
        <div className="flex mt-10">
          <p className="font-bold text-xl mt-6">Google Docs</p>
          <Button
            variant="primary"
            label="+ Add Google Docs"
            onClick={() => {
              setShowAddModal(true);
            }}
            className="ml-auto mr-1 mb-5"
          />
        </div>
        {myDocsData.map((item) => (
          <ListCard
            name={item.name}
            handleClick={() =>
              navigate(`/workspace/${id}/google-docs/${item.id}`)
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
                  placeholder="Google Doc Name"
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
      <MindMap />
    </div>
  );
};

export default GoogleDocs;
