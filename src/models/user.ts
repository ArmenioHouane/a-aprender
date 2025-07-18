import mongoose, { Schema, type Document } from "mongoose"
import type { ICourse } from "./course"

export enum PlanType {
  TRIAL = "Trial",
  BASIC = "Basic",
  PRO = "Pro",
  ENTERPRISE = "Enterprise",
}

enum PrivacySettings {
  EVERYONE = "Everyone can see my profile",
  FOLLOWERS = "Only followers can see my profile",
}

enum MessagePermissions {
  EVERYONE = "Everyone",
  ADMIN = "Admin",
  NOBODY = "Nobody",
}

// Base interface for all user types
export interface IUser extends Document {
  firebaseId?: string
  name?: string
  country?: string
  username?: string
  email: string
  phoneNumber?: string
  privacySettings: PrivacySettings
  messagePermissions: MessagePermissions
  password?: string
  avatar?: string
  role:"admin"| "instructor" | "student" | "guest"
  status: "Active" | "Inactive"
  plan: PlanType
  planStartDate?: Date
  planEndDate?: Date
  balance: number
  accessLevel: "Basic" | "Limited" | "Full"
}

// Student-specific interface
export interface IStudent extends IUser {
  enrolledCourses: Array<{
    course: ICourse["_id"]
    enrollmentDate: Date
    completionStatus: number
    isCompleted: boolean
  }>
  wishlist?: ICourse["_id"][]
  certificates?: Array<{
    courseId: ICourse["_id"]
    issueDate: Date
    certificateUrl: string
  }>
  learningProgress?: {
    totalHoursSpent: number
    lastActive: Date
  }
}

// Instructor-specific interface
export interface IInstructor extends IUser {
  coursesCreated: ICourse["_id"][]
  students: mongoose.Types.ObjectId[]
  revenue: number
  bio?: string
  expertise?: string[]
  socialLinks?: {
    website?: string
    linkedin?: string
    twitter?: string
    youtube?: string
  }
  ratings?: {
    average: number
    count: number
  }
}

const enrolledCourseSchema = new Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    enrollmentDate: { type: Date, default: Date.now },
    completionStatus: { type: Number, default: 0, min: 0, max: 100 },
    isCompleted: { type: Boolean, default: false },
  },
  { _id: false },
)

// Base User Schema
const UserSchema: Schema = new Schema<IUser>(
  {
    firebaseId: { type: String, unique: true, sparse: true },
    name: { type: String },
    country: { type: String },
    username: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    privacySettings: {
      type: String,
      enum: Object.values(PrivacySettings),
      default: PrivacySettings.EVERYONE,
    },
    messagePermissions: {
      type: String,
      enum: Object.values(MessagePermissions),
      default: MessagePermissions.EVERYONE,
    },
    password: {
      type: String,
      required: function () {
        return !this.firebaseId
      }, // Only require password if not using social login
    },
    avatar: { type: String },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    role: {
      type: String,
      enum: ["admin", "instructor", "student", "guest"],
      default: "guest",
    },
    plan: { type: String, enum: Object.values(PlanType), default: PlanType.TRIAL },
    planStartDate: { type: Date },
    planEndDate: { type: Date },
    balance: { type: Number, default: 0, min: 0 },
    accessLevel: { type: String, enum: ["Basic", "Limited", "Full"], default: "Basic" },
  },
  {
    timestamps: true,
    discriminatorKey: "role", // Use role as the discriminator key
  },
)

// Create the base model
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

// Student Schema (discriminator)
const StudentSchema = new Schema<IStudent>({
  enrolledCourses: [enrolledCourseSchema],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  certificates: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      issueDate: { type: Date, default: Date.now },
      certificateUrl: { type: String },
    },
  ],
  learningProgress: {
    totalHoursSpent: { type: Number, default: 0 },
    lastActive: { type: Date },
  },
})

// Instructor Schema (discriminator)
const InstructorSchema = new Schema<IInstructor>({
  coursesCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  revenue: { type: Number, default: 0 },
  bio: { type: String },
  expertise: [{ type: String }],
  socialLinks: {
    website: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    youtube: { type: String },
  },
  ratings: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 },
  },
})

// Create discriminator models - FIX: Check if models already exist before creating
export const Student = mongoose.models.student || User.discriminator<IStudent>("student", StudentSchema)
export const Instructor = mongoose.models.instructor || User.discriminator<IInstructor>("instructor", InstructorSchema)

export default User

