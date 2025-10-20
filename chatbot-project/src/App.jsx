import { useEffect, useState } from 'react'
import { Chatbot } from 'supersimpledev';
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import './App.css'

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

  useEffect(() => {
    Chatbot.addResponses({
      'goodbye': 'Goodbye. Have a nice day!',
      'give me a unique id': function() {
        return `sure! Here's a unique ID: ${crypto.randomUUID()}`;
      }
    });
    
    // [] tells useEffect to only run once. We only want to run
    // this setup code once because we only want to add these
    // extra responses once.
  }, []);

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
