import React, { Component }  from 'react';
import './App.css'

class App extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      inputValue: '', // take input from user
      listContainer: [], // array to store tasks
    }
  }
  
  // input handler
  handleInput = (event) => {
    // console.log(event.target.value);
    this.setState({
      inputValue: event.target.value
    });
  };
  
  // function to add a task
  addTask = () => {
    const { inputValue, listContainer } = this.state;
    
    if (inputValue.trim() === '') { //check if input is not empty
      alert('Please enter a task!...');
    } else {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      // console.log(newTask);
      this.setState({
        listContainer: [...listContainer, newTask],
        inputValue: '', // clear input field
      });
      alert('Task added successfully!...');
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
    });
  };


  render() {
    const { inputValue, listContainer } = this.state;
    return(
      <div className = "App" >
        <h1>To-Do List</h1>
        <div className="input-container">
          <input type="text" name="task" placeholder='Enter a task...' value={inputValue} onChange={this.handleInput} />
          <button type="button" onClick={this.addTask}>Add Task</button>
        </div>
        <ul className='task-list'>
          {(listContainer.length === 0) ? (
            <p>No task yet. Add one above!</p>
          ) : (
              listContainer.map((task) => (
                <li key={task.id}>
                  <input type="checkbox" checked={task.completed} onChange={() => this.toggleTask(task.id)} />
                  <span>{task.text}</span>
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