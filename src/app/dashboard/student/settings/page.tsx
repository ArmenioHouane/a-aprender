import { ProfileSettings } from "./profile-settings"
import { AccountSettings } from "./account-settings"
import { NotificationSettings } from "./notification-settings"
import { SecurityPrivacySettings } from "./security-privacy-settings"


export default function SettingsPage() {
  return (
    <>
  
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold my-8">Settings</h1>
        <div className="space-y-8">
          <ProfileSettings />
          <AccountSettings />
          <NotificationSettings />
          <SecurityPrivacySettings />
        </div>
      </main>
    </>
  )
}

