// app/(public routes)/sign-up/page.tsx
'use client';
import styles from './SignUp.module.css';

const SignUp = () => {
  const handleSubmit = async (formData: FormData) => {
    // ...
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
