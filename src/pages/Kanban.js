import React, { useState } from 'react';
import Board from 'react-kanban-dnd';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const initialBoard = {
  columns: [
    {
      id: 1,
      title: 'To Do',
      tasks: [{ id: 1, title: 'Task 1' }],
    },
    {
      id: 2,
      title: 'In Progress',
      tasks: [{ id: 2, title: 'Task 2' }],
    },
    {
      id: 3,
      title: 'Done',
      tasks: [{ id: 3, title: 'Task 3' }],
    },
  ],
};

const Kanban = () => {
  const [board, setBoard] = useState(initialBoard);
  const [open, setOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  const handleTaskDragEnd = (updatedBoard) => {
    if (updatedBoard && typeof updatedBoard === 'object') {
      setBoard(updatedBoard);
    } else {
      console.error('Invalid board state:', updatedBoard);
    }
  };

  const handleAddTask = (columnId) => {
    if (!newTaskTitle) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
    };

    const updatedBoard = {
      ...board,
      columns: board.columns.map((column) => {
        if (column.id === columnId) {
          return { ...column, tasks: [...column.tasks, newTask] };
        }
        return column;
      }),
    };

    setBoard(updatedBoard);
    setNewTaskTitle('');
    setOpen(false);
  };

  const handleDeleteTask = (columnId, taskId) => {
    const updatedBoard = {
      ...board,
      columns: board.columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== taskId),
          };
        }
        return column;
      }),
    };

    setBoard(updatedBoard);
  };

  const handleAddColumn = () => {
    if (!newColumnTitle) return;

    const newColumn = {
      id: Date.now(),
      title: newColumnTitle,
      tasks: [],
    };

    setBoard({ ...board, columns: [...board.columns, newColumn] });
    setNewColumnTitle('');
  };

  const handleDeleteColumn = (columnId) => {
    const updatedBoard = {
      ...board,
      columns: board.columns.filter((column) => column.id !== columnId),
    };

    setBoard(updatedBoard);
  };

  const handleOpenDialog = (columnId) => {
    setSelectedColumnId(columnId);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setNewTaskTitle('');
  };

  return (
    <div>
      <h2>Kanban Board</h2>
      <Board
        board={board}
        onTaskDragEnd={handleTaskDragEnd}
        renderColumnHeader={(column) => (
          <div>
            <h3>{column.title}</h3>
            <Button
              variant="contained"
              color="primary"
              onClick={() => (column.id ? handleOpenDialog(column.id) : null)}
              disabled={!column.id}
            >
              Add Task
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => (column.id ? handleDeleteColumn(column.id) : null)}
              disabled={!column.id}
            >
              Delete Column
            </Button>
          </div>
        )}
        renderTask={(task) => <div>{task.title}</div>}
        onTaskClick={(task) => {
          if (task.id) handleDeleteTask(task.columnId, task.id);
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        style={{ marginTop: '1rem' }}
      >
        Add Column
      </Button>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Task Title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleAddTask(selectedColumnId)}>Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={!open} onClose={() => setOpen(true)}>
        <DialogTitle>Add Column</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Column Title"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddColumn}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Kanban;