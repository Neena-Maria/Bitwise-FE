import { useEffect, useState } from "react";
import { StatusTitles, statusColors } from "../../constants";
import Modal from "../Modal";
import { getTicketById } from "../../api";
import { useSearchParams } from "react-router-dom";

export const Item = (props: { item: any }) => {
  const { item } = props;
  const status: "OPEN" | "IN_PROGRESS" | "UNDER_REVIEW" | "COMPLETED" =
    item.status;
  const [open, isOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const ticketId = searchParams.get("ticketId");
    if (ticketId === item.id) {
      setSelectedItem(item);
      isOpen(true);
    }
  }, [searchParams]);

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
              setSelectedItem(item);
              isOpen(true);
            }}
          >
            View Details
          </button>
        </div>
      </div>
      <Modal isOpen={open} onCancel={() => isOpen(false)}>
        <p className="w-[400px] px-6 py-4 font-semibold text-lg">
          {selectedItem?.title}
        </p>
        <hr />
        <div className="px-6">
          <div className="py-4 text-wrap">{selectedItem?.description}</div>
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
