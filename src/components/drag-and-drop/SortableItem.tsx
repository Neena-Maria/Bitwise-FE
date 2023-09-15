import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Item } from "./Item";

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
