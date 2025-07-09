'use client';

import Link from 'next/link';
import { useAuthStore } from '../../lib/stores/authStore';

const AuthNavigation = () => {
  // Отримуємо поточну сесію та юзера
  const { isAuthenticated, user } = useAuthStore();

  const handleLogout = () => {};

  // Якщо є сесія - відображаємо Logout та інформацію про користувача
  // інакше - посилання на логін та реєстрацію
  return isAuthenticated ? (
    <li>
      <p>{user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </li>
  ) : (
    <>
      <li>
        <Link href="/sign-in">Login</Link>
      </li>
      <li>
        <Link href="/sign-up">Register</Link>
      </li>
    </>
  );
};

export default AuthNavigation;
