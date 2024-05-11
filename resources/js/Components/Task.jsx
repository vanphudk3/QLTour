import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 5px 5px 5px 2px grey;
  padding: 8px;
  color: #000;
  margin-bottom: 8px;
  min-height: 90px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${(props) => bgcolorChange(props)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const TextContent = styled.div``;

const Icons = styled.div`
  display: flex;
  justify-content: end;
  padding: 2px;
`;
function bgcolorChange(props) {
  return props.isDragging
    ? "lightgreen"
    : props.isDraggable
    ? props.isBacklog
      ? "#F2D7D5"
      : "#DCDCDC"
    : props.isBacklog
    ? "#F2D7D5"
    : "#EAF4FC";
}

export default function Task({ task, index }) {
  const isDraggable = task.isDraggable;
  const isBacklog = task.isBacklog;
  return (
    <Draggable
      draggableId={`${task.id}`}
      index={index}
    //   isDragDisabled={!isDraggable}
      key={task.id}
    >
      {(provided, snapshot) => (
        <Container
          className="task"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // isDragging={snapshot.isDragging}
          isDraggable={isDraggable}
          isBacklog={isBacklog}
        >
          <TextContent dangerouslySetInnerHTML={{ __html: task.content }} />
          <Icons>
            {isDraggable ? (
              <div>
                <i className="fas fa-edit"></i>
                <i className="fas fa-trash"></i>
              </div>
            ) : (
              ""
            )}
          </Icons>
        </Container>
      )}
    </Draggable>
  );
}