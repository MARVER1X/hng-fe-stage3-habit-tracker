import SignupForm from '@/components/auth/SignupForm';

/**
 * Signup Page Route.
 * Renders the SignupForm within a centered layout.
 */
export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <SignupForm />
    </main>
  );
}
