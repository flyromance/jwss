import React, { Component } from "React";

import Input from "./Input";
import Item from "./Item";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  addItem = val => {
    this.setState({
      list: this.state.list.concat(val)
    });
  };

  deleteItem = i => {
    this.state.list.splice(i, 1);
    this.setState({
      list: this.state.list
    });
  };

  render() {
    return (
      <div className="todo-box">
        <div className="todo-input">
          <Input onAdd={this.addItem} />
        </div>
        <div className="todo-list">
          {this.state.list.map((item, idx) => (
            <Item title={item} key={idx} idx={idx} onDelete={this.deleteItem} />
          ))}
        </div>
      </div>
    );
  }
}
