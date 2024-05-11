import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function KanbanBoard(props) {
    const { children, onDragEnd } = props;

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{display: "flex",justifyContent: "space-between",alignItems: "center",flexDirection: "row",}}>
                {children}
            </div>
        </DragDropContext>
    );
}