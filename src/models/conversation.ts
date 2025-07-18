import mongoose, { type Document, Schema } from "mongoose"
import type { IUser } from "./user"
import type { IMessage } from "./message"

export interface IConversation extends Document {
  participants: IUser["_id"][]
  lastMessage?: IMessage["_id"]
  unreadCount: Map<string, number> // Map of userId to unread count
  isGroupChat: boolean
  groupName?: string
  groupAvatar?: string
  createdAt: Date
  updatedAt: Date
}

const conversationSchema: Schema<IConversation> = new Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    unreadCount: {
      type: Map,
      of: Number,
      default: new Map(),
    },
    isGroupChat: { type: Boolean, default: false },
    groupName: { type: String },
    groupAvatar: { type: String },
  },
  {
    timestamps: true,
  },
)

// Index to efficiently find conversations by participants
conversationSchema.index({ participants: 1 })

const Conversation = mongoose.models.Conversation || mongoose.model<IConversation>("Conversation", conversationSchema)

export default Conversation

