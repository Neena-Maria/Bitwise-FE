import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { DropAnimation } from "@dnd-kit/core";
import { useState } from "react";
import Container from "./Container";
import { Item } from "./Item";
import { TicketStatus } from "../../constants";
import { changeTaskStatus } from "../../api";

const DragAndDrop = ({ tasks }: any) => {
  const [activeId, setActiveId] = useState<any>();
  const [items, setItems] = useState<any>(tasks);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getFullItemsList = () => {
    let fullItemsList: any = [];
    Object.values(items).forEach((item: any) => {
      fullItemsList.push([...item]);
    });
    return fullItemsList.flat();
  };

  const findContainer = (id: any) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) =>
      items[key].map((item: any) => item.id).includes(id)
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  };

  const handleDragOver = (event: any) => {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;
    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);
    const changedStatus =
      over?.data?.current?.sortable?.containerId ?? over?.data?.id;

    if (changedStatus) {
      Object.values(items).forEach((itemList: any) => {
        for (let item of itemList) {
          if (item.id === active.id && item.status !== changedStatus) {
            changeTaskStatus({ status: changedStatus }, active.id);
            item.status = changedStatus;
          }
        }
      });
    }

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev: any) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex((item: any) => item.id === id);
      const overIndex = overItems.findIndex((item: any) => item.id === overId); //overId

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect?.offsetTop > over.rect?.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item: any) => item.id !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].findIndex(
      (item: any) => item.id === active.id
    );
    const overIndex = items[overContainer].findIndex(
      (item: any) => item.id === overId
    );

    if (activeIndex !== overIndex) {
      setItems((items: any) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }
    setActiveId(null);
  };

  const findItem = (id: string) => {
    return getFullItemsList().find((item: any) => item.id === id);
  };

  const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.4",
        },
      },
    }),
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Container
        id={TicketStatus.OPEN}
        items={items[TicketStatus.OPEN]}
        title="To Do"
      />
      <Container
        id={TicketStatus.IN_PROGRESS}
        items={items[TicketStatus.IN_PROGRESS]}
        title="In Progress"
      />
      <Container
        id={TicketStatus.UNDER_REVIEW}
        items={items[TicketStatus.UNDER_REVIEW]}
        title="In Review"
      />
      <Container
        id={TicketStatus.COMPLETED}
        items={items[TicketStatus.COMPLETED]}
        title="Done"
      />
      <DragOverlay dropAnimation={dropAnimationConfig}>
        {activeId ? <Item item={findItem(activeId)} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DragAndDrop;
