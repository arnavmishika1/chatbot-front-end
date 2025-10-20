import RobotImageProfile from '../assets/robot.png';
import UserImageProfile from '../assets/user.png';

export function ChatMessage({ message, sender }) {
  // const message = props.message;
  // const sender = props.sender;
  // const { message, sender } = props;

  /*
  if(sender === 'robot') {
    return (
      <div>
        <img src="robot.png" width="50" />
        {message}
      </div>
    );
  }
  */

  return (
    <div className={
      sender === 'user'
        ? 'chat-message-user'
        : 'chat-message-robot'
    }>
      {sender === 'robot' && (
        <img src={RobotImageProfile} className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {message}
      </div>
      {sender === 'user' && (
        <img src={UserImageProfile} className="chat-message-profile" />
      )}
    </div>
  );
}