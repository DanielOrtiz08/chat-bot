import React from 'react';
import MessageBubble from './MessageBubble';
import { Message } from '../types/chat';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  // Group consecutive messages by the same sender
  const groupedMessages: Message[][] = [];
  
  messages.forEach((message) => {
    const lastGroup = groupedMessages[groupedMessages.length - 1];
    
    if (lastGroup && lastGroup[0].role === message.role) {
      lastGroup.push(message);
    } else {
      groupedMessages.push([message]);
    }
  });

  return (
    <div className="space-y-4">
      {groupedMessages.map((group, groupIndex) => (
        <div 
          key={`group-${groupIndex}`}
          className={`flex ${group[0].role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className="max-w-[75%] space-y-1">
            {group.map((message, messageIndex) => (
              <MessageBubble 
                key={message.id} 
                message={message}
                isFirstInGroup={messageIndex === 0}
                isLastInGroup={messageIndex === group.length - 1}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;