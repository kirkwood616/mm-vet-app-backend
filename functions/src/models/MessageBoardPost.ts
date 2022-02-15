interface MessageBoardPost {
  id?: string;
  dateTime: string;
  board: string;
  user: string;
  title: string;
  message: string;
  replies: MessageBoardPost[];
}

export default MessageBoardPost;
