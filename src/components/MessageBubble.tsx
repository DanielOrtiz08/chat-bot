import React from 'react';
import { Message } from '../types/chat';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  isFirstInGroup,
  isLastInGroup 
}) => {
  const isUser = message.role === 'user';
  
  // Determine bubble style based on position in group and sender
  const getBubbleStyle = () => {
    const baseStyle = 'px-4 py-2 inline-block text-sm';
    const colorStyle = isUser 
      ? 'bg-blue-700 text-white' 
      : 'bg-gray-100 text-gray-800';
      
    let roundedStyle = '';
    
    if (isFirstInGroup && isLastInGroup) {
      roundedStyle = isUser 
        ? 'rounded-2xl rounded-tr-md' 
        : 'rounded-2xl rounded-tl-md';
    } else if (isFirstInGroup) {
      roundedStyle = isUser 
        ? 'rounded-t-2xl rounded-bl-2xl rounded-tr-md' 
        : 'rounded-t-2xl rounded-br-2xl rounded-tl-md';
    } else if (isLastInGroup) {
      roundedStyle = isUser 
        ? 'rounded-b-2xl rounded-bl-2xl rounded-tr-md' 
        : 'rounded-b-2xl rounded-br-2xl rounded-tl-md';
    } else {
      roundedStyle = isUser 
        ? 'rounded-bl-2xl rounded-tr-md' 
        : 'rounded-br-2xl rounded-tl-md';
    }
    
    return `${baseStyle} ${colorStyle} ${roundedStyle}`;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col">
      {isFirstInGroup && (
        <div className={`flex items-center mb-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <div className="flex items-center">
            {!isUser && <Bot size={16} className="text-blue-700 mr-1" />}
            <span className={`text-xs font-medium ${isUser ? 'text-blue-700' : 'text-gray-600'}`}>
              {isUser ? 'You' : 'TechInfo AI'}
            </span>
            {isUser && <User size={16} className="text-blue-700 ml-1" />}
          </div>
        </div>
      )}
      <div className={`${isUser ? 'ml-auto' : 'mr-auto'}`}>
        <div className={getBubbleStyle()}>
          {message.content}
        </div>
      </div>
      {isLastInGroup && (
        <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTimestamp(message.timestamp)}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;