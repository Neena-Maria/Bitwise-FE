import TextEditor from "../../components/textEditor/TextEditor";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:3001"); // Replace with your socket server URL

const GoogleDocEditor = () => {
  const [message, setMessage] = useState<any>("");
  const [linkedNodes, setLinkedNodes] = useState<any>({});
  const [savedData, setSavedData] = useState<any>({});

  const { googleDocId = "" } = useParams();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.emit("findOne", JSON.stringify({ id: googleDocId }));

    socket.on("messageUpdated", (data) => {
      const parsedData: any = JSON.parse(data);
      if (parsedData?.id) {
        if (googleDocId && parsedData?.id === googleDocId) {
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
      socket.emit("updateMessage", JSON.stringify({
        ...savedData, 
        message: data.message,
        linkedNodes: data.linkedNodes,
      }));
    }
  };

  return (
    <>
      <TextEditor message={message} linkedNodes={linkedNodes} setMessage={setMessage} setLinkedNodes={setLinkedNodes} updateData={updateData} />
    </>
  );
};

export default GoogleDocEditor;
