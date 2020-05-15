import React from "react";
import moment from "moment";
import { Input } from "../Input/Input";
import { Item } from "../Item/Item";
import "./ToDoList.css";

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      list: [
        {
          id: 5,
          value: "Learn React",
          date: "7:30 PM",
          checked: false,
        },
        {
          id: 2,
          value: "Move on to API",
          date: "8:30 PM",
          checked: false,
        },
        {
          id: 53,
          value: "Clean the house",
          date: "9:30 PM",
          checked: false,
        },
        {
          id: 4,
          value: "Watch that movie",
          date: "10:30 PM",
          checked: false,
        },
      ],
    };
  }

  addItem(e) {
    e.preventDefault();
    if (this.state.item !== "") {
      const newItem = {
        id: 1 + Math.random(),
        value: this.state.item.slice(),
        date: moment().format("LT"),
        checked: false,
      };
      let list = [...this.state.list];
      list.push(newItem);
      this.setState({ list, newItem, item: "" });
    }
  }

  updateInput(key, value) {
    this.setState({ [key]: value });
  }

  crossItem(id) {
    let list = this.state.list;
    const item = list.findIndex((item) => item.id === id);
    let updatedItem = list[item];
    updatedItem.checked = !updatedItem.checked;
    const newToDoList = [...list];
    newToDoList[item] = updatedItem;
    this.setState({ list: newToDoList });
  }

  render() {
    return (
      <div className="ToDoContainer">
        <div className="ToDoList">
          <div className="TodoHeader">
            <h2>To Do:</h2>
            <span className="DateHeading">{moment().format("lll")}</span>
            <Input
              onChange={(e) => this.updateInput("item", e.target.value)}
              onSubmit={(e) => this.addItem(e)}
              value={this.state.item}
            />
          </div>
          <ul className="ListCont">
            {this.state.list.map((item) => (
              <Item
                key={item.id}
                checked={item.checked}
                id={item.id}
                crossItem={() => this.crossItem(item.id)}
                value={item.value}
                date={item.date}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ToDoList;
