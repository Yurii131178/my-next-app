// 'use client';

// import Link from 'next/link';
// import { useAuthStore } from '../../lib/stores/authStore';

// const AuthNavigation = () => {
//   // Отримуємо поточну сесію та юзера
//   const { isAuthenticated, user } = useAuthStore();

//   const handleLogout = () => {};

//   // Якщо є сесія - відображаємо Logout та інформацію про користувача
//   // інакше - посилання на логін та реєстрацію
//   return isAuthenticated ? (
//     <li>
//       <p>{user?.email}</p>
//       <button onClick={handleLogout}>Logout</button>
//     </li>
//   ) : (
//     <>
//       <li>
//         <Link href="/sign-in">Login</Link>
//       </li>
//       <li>
//         <Link href="/sign-up">Register</Link>
//       </li>
//     </>
//   );
// };

// export default AuthNavigation;

//// Оновлюємо AuthNavigation, щоб додати справжню дію логауту до handleLogout: //

// components/AuthNavigation/AuthNavigation.tsx

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../lib/stores/authStore';
import { logout } from '@/lib/api/clientApi';

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
        <Link href="/sign-up">Sign up</Link>
      </li>
    </>
  );
};

export default AuthNavigation;
