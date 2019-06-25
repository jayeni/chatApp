import React from "react";
import "./App.css";
import io from "socket.io-client";
import Chatroom from "./components/chatroom";
import Userlog from "./components/userlog";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMsg: "",
      chatLog: [],
      userLog: []
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
      let tempLog = this.state.userLog;
      //tempLog.push({ user: usrName, text: tempMsg });
      var today = new Date();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      tempLog.push(`${time}: ${usrName} connected`);
      this.setState({ userLog: tempLog });

      this.socket.on("user-disconnected", userName => {
        let tempLog = this.state.userLog;
        tempLog.push(`${time}: ${usrName} connected`);
        this.setState({ userLog: tempLog });
      });
    });

    this.socket.on("chat-message", message => {
      let tempLog = this.state.chatLog;
      tempLog.push({
        user: message.userName,
        text: message.text,
        isuser: false
      });
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
    tempLog.push({ user: "You", text: tempMsg, isuser: true });
    this.setState({ chatLog: tempLog, chatMsg: "" });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <div className="app_wrapper">
          <div className="chat_wrapper">
            <Chatroom chatLog={this.state.chatLog} />
            <form onSubmit={this.handleSubmit} className="Form">
              <label>
                <input
                  class="form_input"
                  value={this.state.chatMsg}
                  onChange={this.handleChange}
                />
              </label>
            </form>
          </div>
          <div className="log_container">
            <Userlog userLog={this.state.userLog} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
