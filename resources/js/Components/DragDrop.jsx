import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Button } from "@mui/material";
import BasicTooltip from "@/Components/Toolip";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Task from "./Task";
import "../../css/app.css";

const Container = styled.div`
    background-color: #f4f5f7;
    border-radius: 2.5px;
    width: 300px;
    height: 475px;
    /* overflow-y: scroll; */
    overflow: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
    border: 1px solid gray;
`;

const Title = styled.h3`
    padding: 8px;
    background-color: pink;
    text-align: center;
`;
const TaskList = styled.div`
    padding: 3px;
    transition: background-color 0.2s ease;
    background-color: #f4f5f7;
    flex-grow: 1;
    min-height: 100px;
    max-height: 400px;
    overflow-y: auto; // Add overflow-y
`;

export default function DragDrop({ title, tasks, id, createTask }) {
    return (
        <Container className="column">
            <Title
                style={{
                    backgroundColor: "lightblue",
                    position: "sticky",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                {title}
                {createTask && (
                    <BasicTooltip title="Create" placement="top" arrow>
                        <Fab
                            size="small"
                            color="primary"
                            aria-label="add"
                            onClick={() => createTask(id)}
                        >
                            <AddIcon />
                        </Fab>
                    </BasicTooltip>
                )}
            </Title>

            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        // isDraggingOver={snapshot.isDraggingOver}
                    >
                        {tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>
        </Container>
    );
}
