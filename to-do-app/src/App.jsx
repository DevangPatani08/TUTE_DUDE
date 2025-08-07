import React, { Component } from 'react';
import './App.css'

class App extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      inputValue: '', // take input from user
      listContainer: [], // array to store tasks
      error: '', // for validation errors
      success: '' // for success messages
    }
  }
  
  // input handler
  handleInput = (event) => {
    this.setState({
      inputValue: event.target.value,
      error: '', // clear error when user types
      success: '' // clear success message when user types
    });
  };
  
  // function to add a task
  addTask = () => {
    const { inputValue, listContainer } = this.state;
    
    if (inputValue.trim() === '') {
      this.setState({
        error: 'Please enter a task!...',
        success: ''
      });
    } else {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      
      this.setState({
        listContainer: [...listContainer, newTask],
        inputValue: '', // clear input field
        error: '', // clear any previous error
        success: 'Task added successfully!...'
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        this.setState({ success: '' });
      }, 3000);
    }
  };
  
  // function to toggle a task
  toggleTask = (id) => {
    const { listContainer } = this.state;
    this.setState({
      listContainer: listContainer.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    });
  };
  
  // function to delete a task
  deleteTask = (id) => {
    const { listContainer } = this.state;
    this.setState({
      listContainer: listContainer.filter((task) => task.id !== id),
      success: 'Task deleted successfully!...'
    });

    // Clear success message after 3 seconds
    setTimeout(() => {
      this.setState({ success: '' });
    }, 3000);
  };

  render() {
    const { inputValue, listContainer, error, success } = this.state;
    return(
      <div className = "App" >
        <h1>My To-Do List 📝</h1>
        <div className="input-container">
          <input  className={`input ${error ? 'error' : ''}`} type="text" name="task" placeholder='Enter a task...' value={inputValue} onChange={this.handleInput} />
          <button className='button' type="button" onClick={this.addTask}>Add Task</button>
        </div>
        
        {/* Validation messages */}
        {error && <div className="message error">{error}</div>}
        {success && <div className="message success">{success}</div>}
        
        <ul className='task-list'>
          {(listContainer.length === 0) ? (
            <p>No tasks yet! Add some above. ⬆️</p>
          ) : (
              listContainer.map((task) => (
                <li key={task.id}>
                  <div>
                    <input type="checkbox" checked={task.completed} onChange={() => this.toggleTask(task.id)} />
                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'gray' : 'black' }}>{task.text}</span>
                  </div>
                  <button type="button" onClick={() => this.deleteTask(task.id)}>Delete</button>
                </li>
              ))
          )}
        </ul>
      </div>
    );
  }
}

export default App;