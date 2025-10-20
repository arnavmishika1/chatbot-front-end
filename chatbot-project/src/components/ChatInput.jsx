import dayjs from 'dayjs';
import { useState } from "react";
import { Chatbot } from 'supersimpledev';
import LoadingMessageImage from '../assets/loading-spinner.gif';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {
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
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
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
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
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