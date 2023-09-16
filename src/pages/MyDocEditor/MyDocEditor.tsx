import TextEditor from "../../components/textEditor/TextEditor";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { getAllItems } from "../../api";
import SideBar from "../../components/sidebar/Sidebar";

const socket = io("http://localhost:3001"); // Replace with your socket server URL

const DocumentEditor = () => {
  const [message, setMessage] = useState<any>("");
  const [linkedNodes, setLinkedNodes] = useState<any>({});
  const [savedData, setSavedData] = useState<any>({});
  const [allDocs, setAllDocs] = useState<any>([]);

  const { myDocId = "", id } = useParams();

  const getItems = async () => {
    const response = await getAllItems(id as string);
    const responseData = await response.json();
    const allDocs = responseData?.data?.nodes.map((n: any) => ({
        ...n,
        text: n.name,
        value: n.id,
        url: n.type === "BITWISE_DOC" ? `http://localhost:3002/workspace/${id}/documents/${n.id}` : (n.type === "BITWISE_TICKET" ? `http://localhost:3002/workspace/${id}/borad?taskId=${n.id}` : `http://localhost:3002/workspace/${id}/google-docs/${n.id}`) 
    }))
    setAllDocs(allDocs ?? []);
  };
  
  useEffect(() => {
    if(IdleDeadline) {
        getItems();
    }
  }, [id]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.emit("findOne", JSON.stringify({ id: myDocId }));

    socket.on("messageUpdated", (data) => {
        console.log("Data ====>" ,data);
      const parsedData: any = JSON.parse(data);
      if (parsedData?.id) {
        if (myDocId && parsedData?.id === myDocId) {
          setMessage(parsedData.message);
          setLinkedNodes(parsedData.linkedNodes);
          setSavedData(parsedData);
        }
      }
    });

    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, []);

  

  const updateData = (data: any) => {
    if(savedData?.id && data.message !== message) {
        console.log(data);
      socket.emit("updateMessage", JSON.stringify({
        ...savedData, 
        message: data.message,
        linkedNodes: data.linkedNodes,
      }));
    }
  };

  return (
    <div className="flex h-screen w-screen">
    <SideBar />
    <div className="h-full w-full flex">
    <TextEditor message={message} linkedNodes={linkedNodes} setMessage={setMessage} setLinkedNodes={setLinkedNodes} updateData={updateData} allDocs={allDocs} />
    </div>
  </div>
  );
};

export default DocumentEditor;
