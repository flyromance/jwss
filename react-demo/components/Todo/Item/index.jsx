import React, { Component } from "React";

// import "./index.css";

export default class TodoItem extends Component {
  render() {
    return (
      <div className="todo-item">
        {this.props.title}
        <button
          onClick={e => {
            console.log(this.props.idx);
            this.props.onDelete(this.props.idx);
          }}
        >
          delete
        </button>
      </div>
    );
  }
}
