import React, { Component } from "React";

// import "./index.css";

export default class TodoItem extends Component {
  state = {
    value: ""
  };

  render() {
    return (
      <div className="todo-input">
        <input
          value={this.state.value}
          onChange={e => {
            this.setState({ value: e.target.value });
          }}
        />
        <button
          onClick={e => {
            this.props.onAdd(this.state.value);
            this.setState({
              value: ""
            });
          }}
        >
          add
        </button>
      </div>
    );
  }
}
