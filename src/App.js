import React from "react";
import "./App.css";
import io from "socket.io-client";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMsg: "",
      chatLog: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const usrName = window.prompt("What is your name?");
    this.socket = io("http://localhost:3000");
    console.log(usrName);
    this.socket.emit("new_user", usrName);

    this.socket.on("user_connected", usrName => {
      let tempLog = this.state.chatLog;
      tempLog.push(`${usrName} joined`);
      this.setState({ chatLog: tempLog });
    });

    this.socket.on("chat-message", message => {
      let tempLog = this.state.chatLog;
      tempLog.push(`${message.userName}:${message.text}`);
      this.setState({ chatLog: tempLog });
    });
  }
  handleChange(event) {
    this.setState({ chatMsg: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.socket.emit("chat-message", this.state.chatMsg);
    let tempMsg = this.state.chatMsg;
    let tempLog = this.state.chatLog;
    tempLog.push(`You:${tempMsg}`);
    this.setState({ chatLog: tempLog, chatMsg: "" });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              value={this.state.chatMsg}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.chatLog.map((msg, index) => (
          <div key={index}> {msg}</div>
        ))}
      </div>
    );
  }
}

export default App;
