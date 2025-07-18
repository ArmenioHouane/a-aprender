import mongoose, { type Document, Schema } from "mongoose"
import type { IUser } from "./user"

export interface IMessage extends Document {
  conversation: mongoose.Types.ObjectId
  sender: IUser["_id"]
  content: string
  attachments?: string[]
  readBy: IUser["_id"][]
  createdAt: Date
}

const messageSchema: Schema<IMessage> = new Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    attachments: [{ type: String }],
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
)

const Message = mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema)

export default Message

