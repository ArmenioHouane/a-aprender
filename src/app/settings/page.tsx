import { AccountSettings } from "./account-settings"
import { PrivacySettings } from "./privacy-settings"
import { NotificationSettings } from "./notification-settings"
import { LanguageRegionSettings } from "./language-region-settings"
import { HelpSupportSettings } from "./help-support-settings"
import Header from "@/components/header"


export default function SettingsPage() {
  return (
    <>
    <Header />
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold  my-8">Settings</h1>
      <div className="space-y-8">
        <AccountSettings />
        <PrivacySettings />
        <NotificationSettings />
        <LanguageRegionSettings />
        <HelpSupportSettings />
      </div>
    </main>
    </>
  )
}

