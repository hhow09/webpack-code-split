import React from "react";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "store/actionTypes.js";

class Filter extends React.Component {
  onFilterChange = filter => {
    this.props.onFilterChange(filter);
  };

  render() {
    return (
      <div style={{ display: "flex" }}>
        <button onClick={this.onFilterChange.bind(this, SHOW_ALL)}>All</button>
        <button onClick={this.onFilterChange.bind(this, SHOW_COMPLETED)}>completed</button>
        <button onClick={this.onFilterChange.bind(this, SHOW_ACTIVE)}>active</button>
      </div>
    );
  }
}

export default Filter;
