import React from "react";
import "../App.css";
import Chatmsg from "./chatmsg";

class userlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="userlog">
        {this.props.userLog.map((msg, index) => (
          <div> {msg} </div>
        ))}
      </div>
    );
  }
}

export default userlog;
