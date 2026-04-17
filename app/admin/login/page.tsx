import Image from "next/image";
import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc] p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <Image src="/usc-logo.png" alt="USC Logo" width={56} height={56} />
          <h1 className="text-2xl font-semibold text-gray-900">Admin Access</h1>
          <p className="text-sm text-gray-500">
            Enter the admin password to view PhishQuest results.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
