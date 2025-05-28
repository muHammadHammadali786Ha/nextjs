'use client';

import { AuthContext } from '@/context/store';
import { useContext, useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const SOCKET_URL = 'http://localhost:7001'; // Backend API URL
const socket = io(SOCKET_URL, { autoConnect: false });

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { auth } = useContext(AuthContext);

  // Fetch users function
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${SOCKET_URL}/api/users/`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, [auth.token]);

  // Fetch messages function
  const fetchMessages = useCallback(async (userId) => {
    try {
      const response = await axios.get(`${SOCKET_URL}/api/messages/${userId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    }
  }, [auth.token]);

  // Socket event handlers
  const handleGetOnlineUsers = (onlineUsers) => {
    setUsers(onlineUsers);
  };

  const handleNewMessage = (message) => {
    if (selectedUser && message.senderId === selectedUser._id) {
      setMessages((prev) => [...prev, message]);
    }
  };

  // Send message function
  const sendMessage = async () => {
    if (!input.trim() || !selectedUser) return;
    const newMessage = {
      senderId: auth.userId,
      receiverId: selectedUser._id,
      message: input,
    };
    try {
      const response = await axios.post(
        `${SOCKET_URL}/api/message/send/${selectedUser._id}`,
        { message: input },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      if (response.status === 200) {
        socket.emit('sendMessage', newMessage);
        setMessages((prev) => [...prev, newMessage]);
        setInput('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Handle user selection
  const handleUserClick = (user) => {
    console.log('User clicked:', user); // Debugging
    if (selectedUser?._id === user._id) return;

    setSelectedUser(user);
    fetchMessages(user._id); // Fetch messages only when the user is changed
  };

  useEffect(() => {
    fetchUsers();
    socket.connect();
    console.log('Socket connected:', socket.connected);

    socket.on('getOnlineUsers', handleGetOnlineUsers);
    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('getOnlineUsers', handleGetOnlineUsers);
      socket.off('newMessage', handleNewMessage);
      socket.disconnect();
    };
  }, [fetchUsers]);

  return (
    <div className="flex bg-gray-100 h-screen">
      {/* User List */}
      <div className="w-1/4 bg-white p-4 shadow-md">
        <h2 className="text-lg font-bold mb-4">Users</h2>
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user._id}
              className={`p-2 cursor-pointer rounded ${
                selectedUser?._id === user._id
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200'
              }`}
              onClick={() => handleUserClick(user)}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col w-3/4 p-4">
        <div className="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow">
          {selectedUser ? (
            messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-2 rounded ${
                    msg.senderId === auth.userId
                      ? 'bg-blue-500 text-white self-end'
                      : 'bg-gray-300'
                  }`}
                >
                  {msg.message}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                No messages yet. Start the conversation!
              </p>
            )
          ) : (
            <p className="text-gray-500 text-center">
              Select a user to start chatting
            </p>
          )}
        </div>

        {/* Message Input */}
        {selectedUser && (
          <div className="flex mt-4">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l-lg"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-blue-500 text-white rounded-r-lg"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
