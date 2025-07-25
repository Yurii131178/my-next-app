'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../lib/stores/authStore';
import { logout } from '@/lib/api/clientApi';
import styles from './UserItem.module.css';

const AuthNavigation = () => {
  const router = useRouter();
  // Отримуємо поточну сесію та юзера
  const { isAuthenticated, user } = useAuthStore();
  // Отримуємо метод очищення глобального стану
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const handleLogout = async () => {
    // Викликаємо logout
    await logout();
    // Чистимо глобальний стан
    clearIsAuthenticated();
    // Виконуємо навігацію на сторінку авторизації
    router.push('/sign-in');
  };

  // Якщо є сесія - відображаємо кнопку Logout та інформацію про користувача
  // інакше - лінки для авторизації
  return isAuthenticated ? (
    <li className={styles.userItem}>
      <p className={styles.userLabel}>User: {user?.userName}</p>
      <button onClick={handleLogout}>Logout</button>
    </li>
  ) : (
    <>
      <li>
        <Link href="/sign-in">Login</Link>
      </li>
      <li>
        <Link href="/sign-up">Sign up</Link>
      </li>
    </>
  );
};

export default AuthNavigation;
