import mongoose, { type Document, Schema } from "mongoose"
import type { IUser } from "./user"
import type { ICourse } from "./course"
import type { IPayment } from "./payment"

export enum NotificationType {
  COURSE_ENROLLMENT = "Course Enrollment",
  COURSE_UPDATE = "Course Update",
  PAYMENT_CONFIRMATION = "Payment Confirmation",
  PLAN_EXPIRY = "Plan Expiry",
  NEW_MESSAGE = "New Message",
  SYSTEM = "System Notification",
}

export interface INotification extends Document {
  user: IUser["_id"]
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  course?: ICourse["_id"]
  payment?: IPayment["_id"]
  conversation?: mongoose.Types.ObjectId
  createdAt: Date
}

const notificationSchema: Schema<INotification> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
  },
  {
    timestamps: true,
  },
)

const Notification = mongoose.models.Notification || mongoose.model<INotification>("Notification", notificationSchema)

export default Notification

