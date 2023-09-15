import { useNavigate, useParams } from "react-router-dom";
import ListCard from "../../components/ListCard";

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
    <div className="h-full w-full">
      <p className="font-medium text-lg">External Docs</p>
      {workspaceData.map((item) => (
        <ListCard
          name={item.name}
          handleClick={() =>
            navigate(`/workspace/${workspaceId}/google-docs/${item.id}`)
          }
        />
      ))}
    </div>
  );
};

export default GoogleDocs;
