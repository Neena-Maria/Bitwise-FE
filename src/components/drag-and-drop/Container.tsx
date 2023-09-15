import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";
import { statusColors } from "../../constants";

const Container = (props: { id: string; items: any; title: string }) => {
  const { id, items, title } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  const status = id as "todo" | "inprogress" | "inreview" | "done";

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        className="bg-[#F4F5F7] w-full p-8 h-full flex max-w-[300px] flex-col rounded-md"
      >
        <div
          className="py-1 text-base font-semibold"
          style={{ color: statusColors[status] }}
        >
          {title}
        </div>
        {items.map((item: any) => (
          <SortableItem key={item.id} item={item} />
        ))}
      </div>
    </SortableContext>
  );
};

export default Container;
