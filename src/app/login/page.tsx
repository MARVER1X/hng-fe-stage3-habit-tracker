import LoginForm from '@/components/auth/LoginForm';

/**
 * Login Page Route.
 * Renders the LoginForm within a centered layout.
 */
export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <LoginForm />
    </main>
  );
}
