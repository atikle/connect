import React, { useState, useEffect, useRef } from 'react';

// Main App component for the chatbot
const App = () => {
  // State to hold chat messages
  const [messages, setMessages] = useState([]);
  // State for the current message being typed by the user
  const [inputMessage, setInputMessage] = useState('');
  // Ref to scroll to the bottom of the chat history
  const messagesEndRef = useRef(null);
  // State to manage loading indicator during API calls
  const [isLoading, setIsLoading] = useState(false);

  // Scroll to the bottom of the chat history whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return; // Don't send empty messages

    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Add user message to chat history
    setInputMessage(''); // Clear the input field

    setIsLoading(true); // Show loading indicator

    try {
      // Prepare the chat history for the API call
      let chatHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));
      chatHistory.push({ role: "user", parts: [{ text: inputMessage }] }); // Add the current user message

      const payload = { contents: chatHistory };
      const apiKey = ""; // API key will be provided by the Canvas environment
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      // Make the API call to Gemini
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const botResponseText = result.candidates[0].content.parts[0].text;
        const botMessage = { text: botResponseText, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]); // Add bot's response to chat history
      } else {
        // Handle cases where the response structure is unexpected or content is missing
        setMessages((prevMessages) => [...prevMessages, { text: "Error: Could not get a response from the bot.", sender: 'bot' }]);
        console.error("Unexpected API response structure:", result);
      }
    } catch (error) {
      console.error('Error fetching bot response:', error);
      setMessages((prevMessages) => [...prevMessages, { text: "Error: Failed to connect to the bot.", sender: 'bot' }]);
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  // Function to handle Enter key press in the input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Prevent new line on Enter, allow with Shift+Enter
      e.preventDefault(); // Prevent default form submission
      handleSendMessage();
    }
  };

  return (
    // Outer container for the chatbot, designed to be placed inside any div
    // Uses flexbox for layout and dark theme colors
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-gray-900 to-black text-gray-100 rounded-lg shadow-2xl font-inter overflow-hidden">
      {/* Chatbot Header */}
      <div className="flex items-center p-4 bg-gray-950 border-b border-gray-800 shadow-lg">
        {/* Logo */}
        <img
          src="https://atikle.github.io/resource/atikle_connect/atikle_connect-icon-transparent.png"
          alt="Synapse Logo"
          className="w-10 h-10 mr-3 rounded-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/333333/FFFFFF?text=Logo'; }} // Fallback for image loading errors
        />
        {/* Name */}
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Synapse by atikle
        </h1>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <p>Start a conversation with Synapse!</p>
            <p className="text-sm">Type your message below.</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-xl shadow-md ${
                msg.sender === 'user'
                  ? 'bg-blue-700 text-white rounded-br-none'
                  : 'bg-gray-800 text-gray-200 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="max-w-[70%] p-3 rounded-xl shadow-md bg-gray-800 text-gray-200 rounded-bl-none">
              <div className="flex items-center">
                <div className="animate-pulse flex space-x-2">
                  <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
                  <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
                  <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
                </div>
                <span className="ml-2 text-sm">Typing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} /> {/* Scroll target */}
      </div>

      {/* Message Input Area */}
      <div className="p-4 bg-gray-950 border-t border-gray-800 flex items-center shadow-inner">
        <textarea
          className="flex-1 p-3 mr-3 bg-gray-800 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none h-12 overflow-hidden custom-scrollbar"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          rows="1" // Start with one row
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Send'
          )}
        </button>
      </div>

      {/* Custom Scrollbar Styles (Tailwind doesn't have direct scrollbar styling) */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a; /* Dark track */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4a4a4a; /* Darker thumb */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #5a5a5a; /* Even darker thumb on hover */
        }
        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #4a4a4a #1a1a1a;
        }
      `}</style>
    </div>
  );
};

export default App;
