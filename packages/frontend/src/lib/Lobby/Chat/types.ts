export type ChatMessageType = {
  id: string;
  message: string;
  createdAt: Date;
  user: {
    id: string;
    username: string;
  };
};
