import { useState, useRef, useEffect } from 'react'
import { Chatbot } from 'supersimpledev';
import RobotImageProfile from './assets/robot.png';
import UserImageProfile from './assets/user.png';
import LoadingMessageImage from './assets/loading-spinner.gif';
import './App.css'

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if(isLoading || inputText === '') {
      return;
    }

    // Set isLoading to true at the start, and set it to
    // false after everything is done.
    setIsLoading(true);

    // We can put this at the top of the function or
    // after the first setChatMessages(). Both work.
    setInputText('');

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      },
      // Solution 2:
      // Another solution is to add the Loading... message
      // to newChatMessages, but we have to remove it later.
      {
        message: <img src={LoadingMessageImage} className="loading-spinner" />,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ];

    setChatMessages(newChatMessages);
    
    // Solution 1:
    // setChatMessages([
    //   ...newChatMessages,
    //   // This creates a temporary Loading... message.
    //   // Because we don't save this message in newChatMessages,
    //   // it will be remove later, when we add the response.
    //   {
    //     message: 'Loading...',
    //     sender: 'robot',
    //     id: crypto.randomUUID()
    //   }
    // ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      // ...newChatMessages,
      // Solution 2:
      // This makes a copy of newChatMessages, but without the
      // last message in the array.
      ...newChatMessages.slice(0, newChatMessages.length - 1),
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    // Set isLoading to false after everything is done.
    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if(event.key === 'Enter') {
      sendMessage();
    } else if(event.key === 'Escape') {
      setInputText('');
    }
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
    </div>
  );
}

function ChatMessage({ message, sender }) {
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

// To use a function as a hook, the function name must
// start with "use".
function useAutoScroll(dependencies) {
  // It's highly recommend to rename this to something
  // more generic like containerRef. This will make the
  // code make more sense if we ever reuse this code in
  // other components.
  const containerRef = useRef(null);
  useEffect(() => {
    const containerElem = containerRef.current;
    if(containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, dependencies);

  return containerRef;
}

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll([chatMessages]);
  
  return (
    <div className="chat-messages-container"
      ref={chatMessagesRef}
    >
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

function App() {
  // const [ chatMessages, setChatMessages ] = React.useState([{
  //   message: 'hello chatbot',
  //   sender: 'user',
  //   id: 'id1'
  // }, {
  //   message: 'Hello! How can I help you?',
  //   sender: 'robot',
  //   id: 'id2'
  // }, {
  //   message: 'can you get me todays date?',
  //   sender: 'user',
  //   id: 'id3'
  // }, {
  //   message: 'Today is October 14',
  //   sender: 'robot',
  //   id: 'id4'
  // }]);
  const [ chatMessages, setChatMessages ] = useState([]);
  // const [ chatMessages, setChatMessages ] = array;
  // const chatMessages = array[0];
  // const setChatMessages = array[1];

  return (
    <div className="app-container">
      {
        chatMessages.length === 0 && (
          <p className="welcome-message">
            Welcome to the chatbot project! Send a message using the textbox below.
          </p>
        )
      }
      <ChatMessages 
        chatMessages={chatMessages}
      />
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
