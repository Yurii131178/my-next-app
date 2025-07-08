// app/(public routes)/sign-up/page.tsx
'use client';
import styles from './SignUp.module.css';

// Додаємо імпорти
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterRequest } from '@/lib/api';

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
      // Типізуємо дані форми
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      // Виконуємо запит
      const res = await register(formValues);
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
      <h1>Sign up</h1>
      <form action={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Username
          <input type="text" name="userName" required />
        </label>
        <label className={styles.label}>
          Email
          <input type="email" name="email" required />
        </label>
        <label className={styles.label}>
          Password
          <input type="password" name="password" required />
        </label>
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </>
  );
};

export default SignUp;
