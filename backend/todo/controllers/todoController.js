const Todo = require("../models/Todo");
const asyncHandler = require("express-async-handler");

// @desc    Create a new todo
// @route   POST /api/todos/:userId
// @access  Private
const createTodo = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { title, description } = req.body;

  console.log(userId, " ", title, " ", description);

  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }
  console.log("TItle is present.");
  // // Ensure valid userId format
  // if (!mongoose.Types.ObjectId.isValid(userId)) {
  //   res.status(400);
  //   throw new Error("Invalid user ID");
  // }
  console.log("User is valid.");
  const newTodo = new Todo({ userId, title, description });
  const savedTodo = await newTodo.save();

  res.status(201).json(savedTodo);
});

// @desc    Get all todos for a user
// @route   GET /api/todos/:userId
// @access  Private
const getAllTodos = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const todos = await Todo.find({ userId });

  if (!todos.length) {
    res.status(404);
    throw new Error("No todos found for this user");
  }

  res.status(200).json(todos);
});

// @desc    Update a todo
// @route   PUT /api/todos/:userId/:todoId
// @access  Private
const updateTodo = asyncHandler(async (req, res) => {
  const { userId, todoId } = req.params;
  const { title, description } = req.body;

  console.log("Params: ", req.params);
  console.log("Body: ", req.body);

  const updatedTodo = await Todo.findByIdAndUpdate(
    todoId,
    { $set: { title, description } },
    { new: true, runValidators: true }
  );

  if (!updatedTodo || updatedTodo.userId.toString() !== userId) {
    res.status(404);
    throw new Error("Todo not found or unauthorized");
  }

  res.status(200).json(updatedTodo);
});

// @desc    Delete a todo
// @route   DELETE /api/todos/:userId/:todoId
// @access  Private
const deleteTodo = asyncHandler(async (req, res) => {
  const { userId, todoId } = req.params;

  const deletedTodo = await Todo.findByIdAndDelete(todoId);

  if (!deletedTodo || deletedTodo.userId.toString() !== userId) {
    res.status(404);
    throw new Error("Todo not found or unauthorized");
  }

  res.status(200).json({ message: "Todo deleted successfully" });
});

// @desc    Toggle todo completion status
// @route   PATCH /api/todos/:userId/:todoId/toggle
// @access  Private
const toggleTodoCompletion = asyncHandler(async (req, res) => {
  const { userId, todoId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(todoId)
  ) {
    res.status(400);
    throw new Error("Invalid user ID or Todo ID");
  }

  const todo = await Todo.findOne({ _id: todoId, userId });

  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  todo.isCompleted = !todo.isCompleted;
  await todo.save();

  res.status(200).json({
    message: `Todo marked as ${todo.isCompleted ? "completed" : "incomplete"}`,
    todo,
  });
});

module.exports = {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
  toggleTodoCompletion,
};
