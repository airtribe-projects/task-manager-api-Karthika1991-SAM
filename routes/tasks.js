const express = require('express');
const router = express.Router();
const { tasks } = require('../task.json');


// Define route for GET /tasks/:id
router.get('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// GET route to retrieve tasks, with optional filtering by completion status
router.get('/', (req, res) => {
    const { completed, sort, priority } = req.query; // Get the 'completed' and 'sort' query parameters
  
    // If completed is provided, filter tasks
    let filteredTasks = tasks;
  
    if (completed !== undefined) {
      const isCompleted = completed === 'true'; // Convert to boolean
      filteredTasks = filteredTasks.filter(task => task.completed === isCompleted);
    }
  
    // If sort is provided, sort tasks by creation date
    if (sort) {
      filteredTasks.sort((a, b) => {
         return sort === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt; // Ascending or descending
      });
    }
  
    res.status(200).json(filteredTasks);
  });

router.post('/', (req, res) => {

    const { title, description ,completed, priority} = req.body; // Destructure the request body

  // Validation: Ensure name and description are provided
  if (!title || typeof title!=='string') {
    return res.status(400).json({ error: 'Title is required and it should be a string.' });
  }
  if (!description || typeof description!=='string') {
    return res.status(400).json({ error: 'description is required and it should be a string.' });
  }


  // Validation: Ensure completed is a boolean
  if ( typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed is required and  status must be a boolean.' });
  }

    // Validation: Ensure priority is one of low, medium, or high
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ error: 'Priority must be low, medium, or high.' });
    }

    const newTask = {
      id: tasks.length + 1,  // This is just for example; you should use unique ID generation
      title: req.body.title,
      description: req.body.description,
      completed:req.body.completed,
      createdAt: new Date(), // Set creation date to now
     priority: priority // Set the priority

    };
    tasks.push(newTask);
    res.status(201).json(newTask);  
})
router.put('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);  // Get the task ID from the URL
   const taskIndex = tasks.findIndex(t => t.id === taskId);  // Find the task by ID

   if (!req.body.title || typeof req.body.title !=='string') {
    return res.status(400).json({ error: 'Title is required and it should be a string.' });
  }

  if (!req.body.description || typeof req.body.description !=='string') {
    return res.status(400).json({ error: 'Description is required and it should be a string.' });
  }

  // Validation: Ensure completed is a boolean (if provided)
  if (req.body.completed !== undefined && typeof req.body.completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed status must be a boolean.' });
  }


  // Validation: Ensure priority is one of low, medium, or high (if provided)
  if (req.body.priority !== undefined && !['low', 'medium', 'high'].includes(req.body.priority)) {
    return res.status(400).json({ error: 'Priority must be low, medium, or high.' });
  }
  
  if (taskIndex !== -1) {
    tasks[taskIndex] = {
      id: taskId,
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed !== undefined ? req.body.completed : tasks[taskIndex].completed,
      createdAt: tasks[taskIndex].createdAt, // Keep the original creation date
      priority: req.body.priority !== undefined ? req.body.priority : tasks[taskIndex].priority // Update priority if provided
    };
    res.status(200).json(tasks[taskIndex]);
  } else {
    // Task not found, respond with 404
    res.status(404).json({ error: 'Task not found' });
  }
});
// DELETE route to remove a task
router.delete('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);  // Get the task ID from the URL
    const taskIndex = tasks.findIndex(t => t.id === taskId);  // Find the task by ID
  
    if (taskIndex !== -1) {
      // Remove the task from the array
      tasks.splice(taskIndex, 1);
      
      // Respond with a success message
      res.status(200).send({ message: 'Task deleted successfully' });  // No content response
    } else {
      // If task not found, respond with a 404 error
      res.status(404).json({ error: 'Task not found' });
    }
  });
module.exports = router;
