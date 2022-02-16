import { ObjectId } from "mongodb";

interface MessageBoardPost {
  _id?: ObjectId;
  dateTime: string;
  board: string;
  user: string;
  title: string;
  message: string;
  replies: MessageBoardPost[];
}

export default MessageBoardPost;
