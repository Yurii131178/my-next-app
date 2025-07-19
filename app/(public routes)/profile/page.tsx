// import { Metadata } from 'next';
// import Link from 'next/link';
// export const metadata: Metadata = {
//   title: 'Ptofile',
//   description: 'page far User profile',
// };

// const Profile = () => {
//   return (
//     <section>
//       <h1>My Profile</h1>
//       <h2>Name: User name</h2>
//       <p>
//         Some description: Lorem, ipsum dolor sit amet consectetur adipisicing
//         elit. Cumque non quis, vero consectetur eum at commodi facere error,
//         laborum,
//       </p>
//       <br />
//       <hr />
//       <br />
//       <Link style={{ color: 'red' }} href="/profile/edit">
//         Edit profile
//       </Link>
//       <br />
//       <br />
//     </section>
//   );
// };

// export default Profile;

//////////////////////////

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMe } from '@/lib/api/clientApi';

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.userName ?? '');
      setPhotoUrl(user.photoUrl ?? '');
    });
  }, []);

  return (
    <section>
      <h1>My Profile</h1>

      {photoUrl && (
        <>
          <img
            src={photoUrl}
            alt="User Avatar"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <br />
        </>
      )}

      <h2>Name: {userName || 'User name'}</h2>
      <p>
        Some description: Lorem ipsum dolor sit amet consectetur adipisicing
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
