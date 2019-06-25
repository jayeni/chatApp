import React from "react";
import "../App.css";
import io from "socket.io-client";
import Chatmsg from "./chatmsg";

class chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="chatroom">
        {this.props.chatLog.map((msg, index) => (
          <Chatmsg key={index} msg={msg} />
        ))}
      </div>
    );
  }
}

export default chatroom;
