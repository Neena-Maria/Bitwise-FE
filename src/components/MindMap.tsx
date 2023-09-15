import { ForceGraph3D } from "react-force-graph";
import SpriteText from "three-spritetext";

const MindMap = () => {
  const data = {
    nodes: [
      {
        id: "Node 1",
        label: "label1",
        color: "#2f6fed",
        group: 1,
        href: "https://example.com/node1",
        hoverText: "Node 1 details",
      },
      {
        id: "Node 2",
        label: "label12",
        group: 1,
        href: "https://example.com/node2",
        hoverText: "Node 2 details",
      },
      {
        id: "Node 3",
        label: "label3",
        group: 2,
        href: "https://example.com/node3",
        hoverText: "Node 3 details",
      },
      {
        id: "Node 4",
        label: "label4asdckjwhwkfjwefcije;fok elijeiljfe",
        group: 2,
        href: "https://example.com/node4",
        hoverText: "Node 4 details",
      },
    ],
    links: [
      { source: "Node 1", target: "Node 2" },
      { source: "Node 1", target: "Node 3" },
      { source: "Node 2", target: "Node 4" },
      { source: "Node 4", target: "Node 2" },
    ],
  };

  return (
    <div>
      <ForceGraph3D
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
          const sprite = new SpriteText(node.label);
          sprite.color = node.color;
          sprite.textHeight = 6;
          return sprite;
        }}
        nodeThreeObjectExtend={true}
        linkColor={(e) => "#2f6fed"}
        linkWidth={1}
        backgroundColor="#c4c4c2"
        nodeColor={(d) => "#ff0000"} // bg color of circular node
        nodeRelSize={0} // size of circular node
        // nodeLabel={}
      />
    </div>
  );
};

export default MindMap;
