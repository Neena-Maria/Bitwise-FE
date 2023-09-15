import { useState } from "react";
import { StatusTitles, statusColors } from "../../constants";
import Modal from "../Modal";

export const Item = (props: { item: any }) => {
  const { item } = props;
  const status: "todo" | "inprogress" | "inreview" | "done" = item.status;
  const [open, isOpen] = useState(false);

  return (
    <>
      <div
        className={`relative w-full h-[80px] flex flex-col bg-white my-[10px] p-4 border-l-4`}
        style={{ borderColor: statusColors[status] }}
      >
        <div className="flex w-full justify-center">{item.title}</div>
        <div className="absolute bottom-1 right-2">
          <button
            className="text-blue-500 text-[12px] cursor-pointer p-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              isOpen(true);
            }}
          >
            View Details
          </button>
        </div>
      </div>
      <Modal isOpen={open} onCancel={() => isOpen(false)}>
        <p className="w-[400px] px-6 py-4 font-semibold text-lg">
          {item.title}{" "}
        </p>
        <hr />
        <div className="px-6">
          <div className="py-4 text-wrap">{item.description}</div>
          <div
            className="py-2 font-semibold"
            style={{ color: statusColors[status] }}
          >
            {StatusTitles[status]}
          </div>
        </div>
      </Modal>
    </>
  );
};
