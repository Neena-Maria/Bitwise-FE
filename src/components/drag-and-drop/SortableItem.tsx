import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { statusColors } from "../../constants";

export function Item(props: { item: any }) {
  const { item } = props;
  const status: "todo" | "inprogress" | "inreview" | "done" = item.status;
  return (
    <div
      className={`w-full h-[60px] flex items-center bg-white my-[10px] p-4 border-l-4`}
      style={{ borderColor: statusColors[status] }}
    >
      {item.title}
    </div>
  );
}

const SortableItem = (props: { item: any }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item item={props.item} />
    </div>
  );
};
export default SortableItem;
