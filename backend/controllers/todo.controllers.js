import Todo from "../Models/todo.models.js";

const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    user: req.user._id
  });

  try {
    const newTodo = await todo.save();
    res.status(200).json({
      message: "Todo saved successfully",
      newTodo
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to add todo",
      error
    });
  }
};

const showTodo = async (req, res) => {
  try {
    const alltodo = await Todo.find({ user: req.user._id });
    res.status(200).json({
      message: "Here are all todos",
      alltodo
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to get todos",
      error
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deletethis = await Todo.findByIdAndDelete(req.params.id);

    if (!deletethis) {
      return res.status(400).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo successfully deleted"
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to delete todo",
      error
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const updatingtodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!updatingtodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      updatingtodo
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to update todo",
      error
    });
  }
};

export { createTodo, showTodo, deleteTodo, updateTodo };
