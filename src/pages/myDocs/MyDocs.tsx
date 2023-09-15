import { useNavigate, useParams } from "react-router-dom";
import ListCard from "../../components/ListCard";

const MyDocs = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();

  const MyDocsData = [
    { id: "1", name: "doc1" },
    { id: "2", name: "doc2" },
    { id: "3", name: "doc3" },
    { id: "4", name: "doc4" },
    { id: "5", name: "doc5" },
    { id: "6", name: "doc6" },
    { id: "7", name: "doc7" },
    { id: "8", name: "doc8" },
    { id: "9", name: "doc9" },
  ];

  return (
    <div className="h-full w-full">
      <p className="font-medium text-lg">My Notes</p>
      {MyDocsData.map((item) => (
        <ListCard
          name={item.name}
          handleClick={() =>
            navigate(`/workspace/${workspaceId}/documents/${item.id}`)
          }
        />
      ))}
    </div>
  );
};

export default MyDocs;
