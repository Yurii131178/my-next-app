// app/(public routes)/sign-up/page.tsx

'use client';

const SignUp = () => {
  const handleSubmit = async (formData: FormData) => {
    // ...
  };

  return (
    <>
      <h1>Sign up</h1>
      <form action={handleSubmit}>
        <label>
          Username
          <input type="text" name="userName" required />
        </label>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default SignUp;
