import { useNavigate, useParams } from "react-router-dom";
import ListCard from "../../components/ListCard";
import SideBar from "../../components/sidebar/Sidebar";

const GoogleDocs = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();

  const workspaceData = [
    { id: "1", name: "workspace1" },
    { id: "2", name: "workspace2" },
    { id: "3", name: "workspace3" },
    { id: "4", name: "workspace4" },
    { id: "5", name: "workspace5" },
    { id: "6", name: "workspace6" },
    { id: "7", name: "workspace7" },
    { id: "8", name: "workspace8" },
    { id: "9", name: "workspace9" },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SideBar />
      <div className="h-full w-full px-8">
        <p className="font-bold text-xl mt-6">External Docs</p>
        {workspaceData.map((item) => (
          <ListCard
            name={item.name}
            handleClick={() =>
              navigate(`/workspace/${workspaceId}/google-docs/${item.id}`)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default GoogleDocs;
