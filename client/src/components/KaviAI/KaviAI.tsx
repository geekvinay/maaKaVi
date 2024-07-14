/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import axios from 'axios';

const KaviAI = ({ article, code }: { article: string, code: string; }) => {
    console.log('code: ', code);
    console.log('article: ', article);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        handleMessage('Hello! I am KaviAI, your friendly chatbot. How can I assist you today?', 'ai');
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleMessage = (msg: any, sender: 'user' | 'ai') => {
        // Add a flag to identify AI messages for typewriter effect
        const newMessage = { message: msg, sender: sender, animate: sender === 'ai' };
        setMessages((prevMessages: any) => [...prevMessages, newMessage]);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSend = () => {
        if (message.trim() !== '') {

            handleMessage(message, 'user');
            handleResponse(message);
            setMessage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const fetchAIResponse = async (userInput: string) => {
        const response = await axios.post("http://localhost:3031/v1/kavi/conversation", { context: code, query: userInput });
        console.log('ai-response: ', response);
        return response.data;
    };

    const handleRefresh = () => {
        setMessages([]);
        // handleMessage('Hello! I am KaviAI, your friendly chatbot. How can I assist you today?', 'ai');
    };

    const handleResponse = async (userInput: string) => {
        let response: any;
        switch (userInput.toLowerCase()) {
            case 'hello':
                handleMessage('KaviAI: Hello! How can I assist you today?', 'ai');
                break;
            case 'how are you':
                handleMessage('KaviAI: I am doing well, thank you for asking!', 'ai');
                break;
            case 'what can you do':
                handleMessage('KaviAI: I am capable of assisting you with a variety of tasks. Please let me know how I can help!', 'ai');
                break;
            default:
                response = await fetchAIResponse(userInput);
                console.log('response: ', response.data);
                handleMessage(response.data.data[0], 'ai');
                break;
        }
    };

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Run animejs animation on AI messages with 'animate' flag
    useEffect(() => {
        messages.forEach((msg: any, index: number) => {
            if (msg.animate && !msg.animated) {
                anime.timeline({ loop: false })
                    .add({
                        targets: `.message-${index} .message-text`,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        easing: 'easeOutExpo',
                        duration: 1000,
                        delay: (_, i) => 100 * i,
                    });
                setMessages((prevMessages: any) => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[index].animated = true;
                    return updatedMessages;
                });
            }
        });
    }, [messages]);

    return (
        <div className='w-full h-full base-bg text-white rounded-lg p-4'>
            <div className="flex flex-col h-full">
                <div className="overflow-auto flex-grow base-h-bg rounded-md chat-window py-4 max-h-[70vh]">
                    {messages.map((msg: any, index: number) => (
                        <div
                            key={index}
                            className={`message message-${index} rounded-lg max-w-[60%] py-4 px-4 mb-4 ${msg.sender === 'user' ? 'ml-auto' : 'mr-auto'} base-bg mx-4`}
                        >
                            <span className="message-text">{msg.message}</span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="flex items-center mt-8">
                    <input
                        type="text"
                        value={message}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        className="flex-grow px-4 py-4 rounded-l-lg base-h-bg focus:outline-none text-white"
                    />
                    <button
                        onClick={handleSend}
                        className="bg-gray-700 hover:bg-gray-700 text-white px-8 py-4 rounded-r-lg"
                    >
                        Send
                    </button>
                    <button
                        onClick={handleRefresh}
                        className="bg-gray-700 hover:bg-gray-700 text-white px-4 py-4 rounded-lg ml-2"
                    >
                        Refresh
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KaviAI;
