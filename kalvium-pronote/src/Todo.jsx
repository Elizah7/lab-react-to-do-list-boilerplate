import React, { Component } from 'react';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: '',
      editingTodoId: null,
      editingTodoTitle: '',
    };
  }

  addTodo = () => {
    const { newTodo, todos } = this.state;
    if (newTodo.trim() === '') return;

    this.setState({
      todos: [...todos, { id: Date.now(), title: newTodo, completed: false }],
      newTodo: '',
    });
  };

  updateTodo = (id, updates) => {
    const { todos } = this.state;
    const updatedTodos = todos.map(todo => (todo.id === id ? { ...todo, ...updates } : todo));
    this.setState({
      todos: updatedTodos,
      editingTodoId: null,
      editingTodoTitle: '',
    });
  };

  deleteTodo = (id) => {
    const { todos } = this.state;
    const updatedTodos = todos.filter(todo => todo.id !== id);
    this.setState({
      todos: updatedTodos,
      editingTodoId: null,
      editingTodoTitle: '',
    });
  };

  startEditing = (id, title) => {
    this.setState({ editingTodoId: id, editingTodoTitle: title });
  };

  handleEditingChange = (e) => {
    this.setState({ editingTodoTitle: e.target.value });
  };

  render() {
    const { todos, newTodo, editingTodoId, editingTodoTitle } = this.state;

    return (
      <div>
        <h1>Todo App</h1>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {editingTodoId === todo.id ? (
                <div>
                  <input
                    type="text"
                    value={editingTodoTitle}
                    onChange={this.handleEditingChange}
                  />
                  <button onClick={() => this.updateTodo(todo.id, { title: editingTodoTitle })}>
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => this.updateTodo(todo.id, { completed: !todo.completed })}
                  />
                  <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.title}
                  </span>
                  <button onClick={() => this.startEditing(todo.id, todo.title)}>Edit</button>
                  <button onClick={() => this.deleteTodo(todo.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => this.setState({ newTodo: e.target.value })}
          />
          <button onClick={this.addTodo}>Add Todo</button>
        </div>
      </div>
    );
  }
}

export default TodoApp;
