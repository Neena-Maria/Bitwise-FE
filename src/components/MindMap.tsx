import { ForceGraph3D } from "react-force-graph";
import SpriteText from "three-spritetext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMindMapData } from "../api";

const MindMap = () => {
  const { id = "" } = useParams();
  const [data, setData] = useState<any>();

  const getLink = (id: string, type: string) => {
    if (type === "GOOGLE_DOC") {
      return `google-doc/${id}`;
    } else if (type === "BITWISE_DOC") {
      return `documents/${id}`;
    } else return `board?ticketId=${id}`;
  };

  const fetchMindMapData = async () => {
    const response = await getMindMapData(id);
    const responseData = await response.json();
    if (responseData.data) {
      const mindMapData = {
        nodes: responseData.data.nodes.map((node: any) => ({
          id: node.id,
          label: node.name ?? "-",
          color: "#2f6fed",
          //   group: node.type,
          href: `http://localhost:3002/workspace/${id}/${getLink(
            node.id,
            node.type
          )}`,
          hoverText: node.name,
          type: node.type,
        })),
        links: responseData.data.links,
      };
      setData(mindMapData);
    }
  };
  useEffect(() => {
    fetchMindMapData();
  }, []);

  // const data = {
  //   nodes: [
  //     {
  //       id: "Node 1",
  //       label: "label1",
  //       color: "#2f6fed",
  //       group: 1,
  //       href: "https://example.com/node1",
  //       hoverText: "Node 1 details",
  //     },
  //     {
  //       id: "Node 2",
  //       label: "label12",
  //       group: 1,
  //       href: "https://example.com/node2",
  //       hoverText: "Node 2 details",
  //     },
  //     {
  //       id: "Node 3",
  //       label: "label3",
  //       group: 2,
  //       href: "https://example.com/node3",
  //       hoverText: "Node 3 details",
  //     },
  //     {
  //       id: "Node 4",
  //       label: "label4asdckjwhwkfjwefcije;fok elijeiljfe",
  //       group: 2,
  //       href: "https://example.com/node4",
  //       hoverText: "Node 4 details",
  //     },
  //   ],
  //   links: [
  //     { source: "Node 1", target: "Node 2" },
  //     { source: "Node 1", target: "Node 3" },
  //     { source: "Node 2", target: "Node 4" },
  //     { source: "Node 4", target: "Node 2" },
  //   ],
  // };

  const getLabelColor = (d: any) => {
    console.log("node", d);
    if (d.type === "BITWISE_DOC") return "#38bdf8";
    else if (d.type === "BITWISE_TICKET") return "#dc2626";
    else if (d.type === "GOOGLE_DOC") return "#16a34a";
    else return "";
  };

  // const getNodeColor = (d: any) => {
  //   if (d.type === "BITWISE_DOC") return 'rgb(121,126,246)';
  //   else if (d.type === "BITWISE_TICKET") return "rgb(80 7 36)";
  //   else if (d.type === "GOOGLE_DOC") return "rgb(190 18 60)";
  //   else return "";
  // };

  return (
    <div className="h-full w-[300px] border-l border-zinc-400">
      <ForceGraph3D
        width={540}
        graphData={data}
        // nodeLabel={(node) => node.label}   // on hover data
        onNodeClick={(node) => {
          if (node.href) {
            window.open(node.href, "_blank");
          }
        }}
        // onNodeHover={(node: any) => {
        //   if (node?.hoverText) {
        //     console.log(node?.hoverText);
        //   }
        // }}
        // nodeThreeObject={(node: any) => {
        //   const label1 = document.createElement("div");
        //   label1.className = "text-[#2f6fed]";
        //   label1.textContent = node.id;
        //   return label1;
        // }}
        nodeThreeObject={(node: any) => {
          const sprite = new SpriteText(
            node.label.length > 6 ? `${node.label.slice(0, 7)}...` : node.label
          );
          sprite.color = getLabelColor(node);
          sprite.textHeight = 8;
          return sprite;
        }}
        nodeThreeObjectExtend={true}
        linkColor={(e) => "#544f5b"}
        linkOpacity={2}
        linkWidth={1}
        backgroundColor="#fff"
        // nodeColor={(d) => getNodeColor(d)} // bg color of circular node
        nodeRelSize={0} // size of circular node
        // nodeLabel={0}
      />
    </div>
  );
};

export default MindMap;
