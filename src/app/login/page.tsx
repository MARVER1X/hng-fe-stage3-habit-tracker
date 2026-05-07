import LoginForm from '@/components/auth/LoginForm';

/**
 * Login page route renders the authentication entry point.
 */
export default function LoginPage() {
  return (
    // Centered layout for the login form is rendered
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <LoginForm />
    </main>
  );
}
