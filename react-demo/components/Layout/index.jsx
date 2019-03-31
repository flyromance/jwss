import React, { Component, Children } from "react";

export default class Layout extends Component {
  render() {
    // 如果不是数组，直接用map就会报错
    console.log(this.props.children);

    // React.Children.map forEach toArray count

    return (
      <div>
        <div className="header">header</div>
        {/* <div className="body">{this.props.children.map(child => child())}</div> */}
        {/* <div className="body">
          {Children.map(this.props.children, child => {
            console.log(child);
            return '123';
          })}
        </div> */}
        <div className="body">
          {Children.toArray(this.props.children).map(child => {
            return child
          })}
        </div>
        <div className="footer">footer</div>
      </div>
    );
  }
}
