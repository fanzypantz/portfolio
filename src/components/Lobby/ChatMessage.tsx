import { Message } from "@components/Lobby/LobbyChat";

const ChatMessage = ({ message }: { message: Message }) => {
  return (
    <div key={message.id}>
      <div>
        <span>{message.username}</span>
        <span>: </span>
        <span>{message.message}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
