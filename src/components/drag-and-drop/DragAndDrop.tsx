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

const DragAndDrop = () => {
  const [items, setItems] = useState<any>({
    todo: [
      {
        id: "1",
        title: "Websocket integration",
        description: "Websocket integration",
        status: "todo",
      },
      {
        id: "2",
        title: "Api integration",
        description: "Api integration",
        status: "todo",
      },
    ],
    inprogress: [
      {
        id: "3",
        title: "Document Editor",
        description: "Document Editor",
        status: "inprogress",
      },
      {
        id: "4",
        title: "Mindmap ui",
        description: "Mindmap ui",
        status: "inprogress",
      },
    ],
    inreview: [
      {
        id: "5",
        title: "Bitwise board ui",
        description: "Bitwise board ui",
        status: "inreview",
      },
    ],
    done: [
      {
        id: "6",
        title: "Login page",
        description: "Login page",
        status: "done",
      },
      { id: "7", title: "List page", description: "List page", status: "done" },
    ],
  });
  const [activeId, setActiveId] = useState<any>();

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
          if (item.id === active.id) {
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
      <Container id="todo" items={items.todo} title="To Do" />
      <Container id="inprogress" items={items.inprogress} title="In Progress" />
      <Container id="inreview" items={items.inreview} title="In Review" />
      <Container id="done" items={items.done} title="Done" />
      <DragOverlay dropAnimation={dropAnimationConfig}>
        {activeId ? <Item item={findItem(activeId)} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DragAndDrop;
