// Define all possible permissions as constants to avoid typos
export const PERMISSIONS = {
  // Dashboard permissions
  DASHBOARD: {
    STUDENT: "dashboard.student.access",
    ADMIN: "dashboard.admin.access",
    INSTRUCTOR: "dashboard.instructor.access",
  },

  // Student-specific permissions
  STUDENT: {
    HOME: "student.home.view",
    COURSES: {
      VIEW: "student.courses.view",
      LESSONS: "student.courses.lessons.view",
      PROGRESS: "student.courses.progress.view",
      ASSIGNMENTS: "student.courses.assignments.view",
    },
    DISCUSSIONS: "student.discussions.access",
    SETTINGS: {
      VIEW: "student.settings.view",
      ACCOUNT: "student.settings.account.manage",
      BILLING: "student.settings.billing.manage",
      NOTIFICATIONS: "student.settings.notifications.manage",
    },
  },

  // Instructor-specific permissions
  INSTRUCTOR: {
    COURSES: {
      MANAGE: "instructor.courses.manage",
      CREATE: "instructor.courses.create",
      EDIT: "instructor.courses.edit",
      DELETE: "instructor.courses.delete",
    },
    DISCUSSIONS: "instructor.discussions.manage",
    STUDENTS: {
      VIEW: "instructor.students.view",
      MANAGE: "instructor.students.manage",
    },
  },

  // Admin-specific permissions
  ADMIN: {
    USERS: {
      VIEW: "admin.users.view",
      MANAGE: "admin.users.manage",
    },
  },
} as const

// Define the available roles
export type Role = "student" | "admin" | "guest" | "instructor"

// Define student permissions array
const studentPermissions = [
  PERMISSIONS.DASHBOARD.STUDENT,
  PERMISSIONS.STUDENT.HOME,
  PERMISSIONS.STUDENT.COURSES.VIEW,
  PERMISSIONS.STUDENT.COURSES.LESSONS,
  PERMISSIONS.STUDENT.COURSES.PROGRESS,
  PERMISSIONS.STUDENT.COURSES.ASSIGNMENTS,
  PERMISSIONS.STUDENT.DISCUSSIONS,
  PERMISSIONS.STUDENT.SETTINGS.VIEW,
  PERMISSIONS.STUDENT.SETTINGS.ACCOUNT,
  PERMISSIONS.STUDENT.SETTINGS.BILLING,
  PERMISSIONS.STUDENT.SETTINGS.NOTIFICATIONS,
] as const

// Define instructor permissions array
const instructorPermissions = [
  PERMISSIONS.DASHBOARD.INSTRUCTOR,
  PERMISSIONS.INSTRUCTOR.COURSES.MANAGE,
  PERMISSIONS.INSTRUCTOR.COURSES.CREATE,
  PERMISSIONS.INSTRUCTOR.COURSES.EDIT,
  PERMISSIONS.INSTRUCTOR.COURSES.DELETE,
  PERMISSIONS.INSTRUCTOR.DISCUSSIONS,
  PERMISSIONS.INSTRUCTOR.STUDENTS.VIEW,
  PERMISSIONS.INSTRUCTOR.STUDENTS.MANAGE,
] as const

// Define admin permissions array
const adminPermissions = [
  PERMISSIONS.DASHBOARD.ADMIN,
  PERMISSIONS.ADMIN.USERS.VIEW,
  PERMISSIONS.ADMIN.USERS.MANAGE,
] as const

// Define the permissions for each role
export const roles: Record<Role, string[]> = {
  student: [...studentPermissions],
  instructor: [...instructorPermissions, ...studentPermissions], // Instructors get both instructor and student permissions
  admin: [...adminPermissions, ...instructorPermissions, ...studentPermissions], // Admins get all permissions
  guest: [],
}

// Map routes to required permissions
export const routePermissions: Record<string, string> = {
  "/dashboard/student/home": PERMISSIONS.STUDENT.HOME,
  "/dashboard/admin/user": PERMISSIONS.ADMIN.USERS.MANAGE,
  "/dashboard/student/courses": PERMISSIONS.STUDENT.COURSES.VIEW,
  "/dashboard/student/discussions": PERMISSIONS.STUDENT.DISCUSSIONS,
  "/dashboard/student/settings": PERMISSIONS.STUDENT.SETTINGS.VIEW,
  "/dashboard/student/settings/account": PERMISSIONS.STUDENT.SETTINGS.ACCOUNT,
  "/dashboard/student/settings/billing": PERMISSIONS.STUDENT.SETTINGS.BILLING,
  "/dashboard/student/settings/notifications": PERMISSIONS.STUDENT.SETTINGS.NOTIFICATIONS,
  "/dashboard/student/courses/lessons": PERMISSIONS.STUDENT.COURSES.LESSONS,
  "/dashboard/student/courses/progress": PERMISSIONS.STUDENT.COURSES.PROGRESS,
  "/dashboard/student/courses/assignments": PERMISSIONS.STUDENT.COURSES.ASSIGNMENTS,
  "/dashboard/instructor/courses": PERMISSIONS.INSTRUCTOR.COURSES.MANAGE,
  "/dashboard/instructor/courses/create": PERMISSIONS.INSTRUCTOR.COURSES.CREATE,
  "/dashboard/instructor/courses/edit": PERMISSIONS.INSTRUCTOR.COURSES.EDIT,
  "/dashboard/instructor/courses/delete": PERMISSIONS.INSTRUCTOR.COURSES.DELETE,
  "/dashboard/instructor/discussions": PERMISSIONS.INSTRUCTOR.DISCUSSIONS,
  "/dashboard/instructor/students": PERMISSIONS.INSTRUCTOR.STUDENTS.VIEW,
}

// Helper function to check if a user has permission for a route
export function hasPermission(userRole: Role, route: string): boolean {
  const requiredPermission = routePermissions[route]
  if (!requiredPermission) return true // If no permission is required, allow access
  return roles[userRole].includes(requiredPermission)
}