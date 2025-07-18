import mongoose, { type Document, Schema } from "mongoose"
import type { IUser } from "./user"

enum CourseLevel {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
}

interface Review {
  user: IUser["_id"]
  rating: number
  reviewText: string
  date: Date
}

interface Lesson {
  title: string
  videoUrl: string
  duration: number
  description?: string
  resources?: string[]
  isPreview?: boolean
}

export interface ICourse extends Document {
  title: string
  instructor: IUser["_id"] // Changed from author string to instructor reference
  publicationDate: Date
  lastUpdated: Date
  description: string
  rating: number
  price: number
  level: CourseLevel
  language: string
  topic: string
  duration: number
  studentsEnrolled: number
  imageUrl?: string
  videoPreviewUrl?: string
  prerequisites?: string[]
  certification: boolean
  lessons?: Lesson[] // Added lessons array
  reviews: Review[]
  createdAt: Date
  updatedAt: Date
}

const reviewSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 0, max: 5 },
    reviewText: { type: String, trim: true },
    date: { type: Date, default: Date.now },
  },
  { _id: false },
)

const lessonSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    duration: { type: Number, required: true, min: 0 }, // Duration in minutes
    description: { type: String },
    resources: [{ type: String }],
    isPreview: { type: Boolean, default: false },
  },
  { _id: true }, // Each lesson gets its own ID
)

const courseSchema: Schema<ICourse> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Changed from author to instructor
    publicationDate: { type: Date, required: true },
    lastUpdated: { type: Date, required: true },
    description: { type: String, required: true, trim: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    price: { type: Number, required: true, min: 0 },
    level: { type: String, enum: Object.values(CourseLevel), required: true },
    language: { type: String, required: true },
    topic: { type: String, required: true },
    duration: { type: Number, required: true }, // Duration in hours
    studentsEnrolled: { type: Number, default: 0 },
    imageUrl: { type: String },
    videoPreviewUrl: { type: String },
    prerequisites: { type: [String] },
    certification: { type: Boolean, default: false },
    lessons: [lessonSchema], // Added lessons array
    reviews: { type: [reviewSchema], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
)

courseSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

const Course = mongoose.models.Course || mongoose.model<ICourse>("Course", courseSchema)

export default Course

