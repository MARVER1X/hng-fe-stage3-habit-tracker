import SignupForm from '@/components/auth/SignupForm';

/**
 * Signup page route renders the registration entry point.
 */
export default function SignupPage() {
  return (
    // Centered layout for the registration form is rendered
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <SignupForm />
    </main>
  );
}
