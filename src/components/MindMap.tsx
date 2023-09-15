
import { ForceGraph3D } from 'react-force-graph';

const MindMap = () => {
  const data = {
    nodes: [
      { id: 'Node 1', group: 1, href: 'https://example.com/node1', hoverText: 'Node 1 details' },
      { id: 'Node 2', group: 1, href: 'https://example.com/node2', hoverText: 'Node 2 details' },
      { id: 'Node 3', group: 2, href: 'https://example.com/node3', hoverText: 'Node 3 details' },
      { id: 'Node 4', group: 2, href: 'https://example.com/node4', hoverText: 'Node 4 details' },
    ],
    links: [
      { source: 'Node 1', target: 'Node 2' },
      { source: 'Node 1', target: 'Node 3' },
      { source: 'Node 2', target: 'Node 4' },
      { source: 'Node 4', target: 'Node 2' },
    ],
  };

  return (
    <div>
      <ForceGraph3D
        graphData={data}
        nodeLabel={(node) => node.id}
        onNodeClick={(node) => {
          if (node.href) {
            window.open(node.href, '_blank');
          }
        }}
        onNodeHover={(node: any) => {
          if (node?.hoverText) {
            console.log(node?.hoverText);
          }
        }}
        nodeThreeObject={(node: any) => {
          const label = document.createElement('div');
          label.className = 'text-white';
          label.textContent = node.id;
          return label;
        }}
        nodeThreeObjectExtend={true}
      />
    </div>
  );
}

export default MindMap;
