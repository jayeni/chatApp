import React from "react";
import "../App.css";

class chatmsg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const usermsg = (
      <div className="msg_right">
        <div className="msg_user"> {this.props.msg.user}</div>
        <div className="msg_text"> {this.props.msg.text}</div>
      </div>
    );
    const othersmsg = (
      <div className="msg_left">
        <div className="msg_user"> {this.props.msg.user}</div>
        <div className="msg_text"> {this.props.msg.text}</div>
      </div>
    );
    return <div>{this.props.msg.isuser == true ? usermsg : othersmsg}</div>;
  }
}

export default chatmsg;
