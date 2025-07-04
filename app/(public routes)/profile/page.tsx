import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Ptofile',
  description: 'page far User profile',
};

const Profile = () => {
  return (
    <section>
      <h1>My Profile</h1>
      <h2>Name: User name</h2>
      <p>
        Some description: Lorem, ipsum dolor sit amet consectetur adipisicing
        elit. Cumque non quis, vero consectetur eum at commodi facere error,
        laborum,
      </p>
      <br />
      <hr />
      <br />
      <Link style={{ color: 'red' }} href="/profile/edit">
        Edit profile
      </Link>
      <br />
      <br />
    </section>
  );
};

export default Profile;
