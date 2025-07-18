
export const PERMISSIONS = {
  DASHBOARD: {
    STUDENT: "dashboard.student.access",
    ADMIN: "dashboard.admin.access",
  },
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

  ADMIN: {
    USERS: {
      VIEW: "admin.users.view",
      MANAGE: "admin.users.manage",
    },
  },
} as const

// Define the available roles
export type Role = "student" | "admin" | "guest"

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

// Define admin permissions array
const adminPermissions = [
  PERMISSIONS.DASHBOARD.ADMIN,
  PERMISSIONS.ADMIN.USERS.VIEW,
  PERMISSIONS.ADMIN.USERS.MANAGE,
] as const

// Define the permissions for each role
export const roles: Record<Role, readonly string[]> = {
  student: studentPermissions,
  admin: [...adminPermissions, ...studentPermissions],
  guest: [],
} as const

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
}

// Helper function to validate role
function isValidRole(role: unknown): role is Role {
  return typeof role === "string" && role in roles
}

// Helper function to check if a user has a specific permission
export function hasPermission(userRole: Role, permission: string): boolean {
  // Validate the role
  if (!isValidRole(userRole)) {
    console.warn(`Invalid role provided: ${userRole}`)
    return false
  }

  // Get the permissions for the role
  const rolePermissions = roles[userRole]

  // Check if the permission exists in the role's permissions
  return Array.isArray(rolePermissions) && rolePermissions.includes(permission)
}

// Helper function to check if a user has permission for a specific route
export function checkRoutePermission(userRole: Role, route: string): boolean {
  // Validate the role
  if (!isValidRole(userRole)) {
    console.warn(`Invalid role provided: ${userRole}`)
    return false
  }

  // Get the required permission for the route
  const requiredPermission = routePermissions[route]

  // If no permission is required for this route, allow access
  if (!requiredPermission) {
    return true
  }

  // Check if the user has the required permission
  return hasPermission(userRole, requiredPermission)
}

