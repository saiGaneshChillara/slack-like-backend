const Task = require('../models/Task');

/**
 * Retrieves a list of tasks of the given Team from the database.
 *
 * @param {Object} req - The request object containing query parameters and other information.
 * @param {Object} res - The response object to send back the retrieved tasks.
 *
 * @returns {void}
 *
 * @example
 * // GET /tasks/?teamId={teamId}

 */
exports.getTasks = async (req, res) => {
    const { teamId } = req.query;

    try {
        const tasks = await Task.find({ teamId });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
        })
    }
};

/**
 * Creates a new task in the database.
 *
 * @param {Object} req - The request object containing the task data to be created.
 * @param {Object} res - The response object to send back the created task.
 *
 * @returns {void}
 *
 * @example
 * // POST /tasks/
 * // Request Body: { title: 'Task Title', description: 'Task Description', dueDate: 'Due Date', 
 * assignedTo: 'Assigned User' }
 *
 */
exports.createTask = async (req, res) => {
  const { title, description, dueDate, assignedTo } = req.body;
  const { teamId } = req.query;
  
  try {
    const task = new Task({
        title,
        description,
        dueDate,
        assignedTo,
        teamId
    });

    await task.save();
    res.status(201).json({ task });
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    })
  }
};

/**
 * Updates an existing task in the database.
 *
 * @param {Object} req - The request object containing the task data to be updated.
 * @param {Object} res - The response object to send back the updated task.
 *
 * @returns {void}
 *
 * @example
 * // PUT /tasks/{taskId}
 * // Request Body: { title: 'Updated Task Title', description: 'Updated Task Description', 
 * dueDate: 'Updated Due Date', assignedTo: 'Updated Assigned User' }
 *
 */
exports.updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { title, description, dueDate, assignedTo, status } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(taskId, {
            title,
            description,
            dueDate,
            assignedTo,
            status
        });
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ task });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
        })
    }
};

/**
 * Deletes a task from the database.
 *
 * @param {Object} req - The request object containing the task ID to be deleted.
 * @param {Object} res - The response object to send back the result of the deletion.
 *
 * @returns {void}
 *
 * @example
 * // DELETE /tasks/{taskId}
 *
 */
exports.deleteTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(204).json({
            message: 'Task deleted successfully',
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
        })
    }
};