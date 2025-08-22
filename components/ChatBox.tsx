import { useState } from 'react';

export default function ChatBox() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    
    const userMessage = input;
    setInput('');
    setLoading(true);
    
    // Add user message immediately
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.reply || 'Sorry, I could not process your request.' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, there was an error processing your request. Please check your configuration.' }]);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbox">
      <div className="messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            Welcome! Ask me anything about the documents in your Google Drive.
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role}>{m.text}</div>
        ))}
        {loading && (
          <div className="ai loading">Thinking...</div>
        )}
      </div>
      <div className="input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me something..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}