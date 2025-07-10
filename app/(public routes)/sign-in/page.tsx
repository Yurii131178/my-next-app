// app/(public routes)/sign-in/page.tsx

'use client';

import styles from '../sign-up/SignUp.module.css';

// Додаємо імпорти
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, LoginRequest } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/stores/authStore';

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  // Отримуємо метод із стора
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      // Типізуємо дані форми
      const formValues = Object.fromEntries(formData) as LoginRequest;
      // Виконуємо запит
      const res = await login(formValues);
      // Виконуємо редірект або відображаємо помилку
      if (res) {
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.log('error', error);
      setError('Invalid email or password');
    }
  };

  return (
    <>
      <h1>Sign in</h1>
      <form action={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Email
          <input type="email" name="email" required />
        </label>
        <label className={styles.label}>
          Password
          <input type="password" name="password" required />
        </label>
        <button type="submit" className={styles.button}>
          Log in
        </button>
      </form>
    </>
  );
};

export default SignIn;
