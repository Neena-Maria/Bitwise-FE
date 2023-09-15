import DragAndDrop from "../../components/drag-and-drop/DragAndDrop";

const Board = () => (
  <div className="h-[calc(100vh-100px)] px-8 py-4">
    <div className="text-2xl font-semibold"> Bitwise Board</div>
    <div className="flex flex-row gap-8 my-8 h-full w-full">
      <DragAndDrop />
    </div>
  </div>
);

export default Board;
