// app/profile/edit/page.tsx

// import AvatarPicker from '@/components/AvatarPicker/AvatarPicker';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'EditProfile',
//   description: 'Edit your user details and settigs',
// };

// const EditProfile = () => {
//   return (
//     <div>
//       <h1 style={{ color: 'teal' }}>EditProfile Page</h1>
//       {/* Підключаємо на сторінку AvatarPicker */}
//       <AvatarPicker />
//     </div>
//   );
// };

// export default EditProfile;

////////////////Додаємо форму зі станом та слухачами://///////

// 'use client';
// import AvatarPicker from '@/components/AvatarPicker/AvatarPicker';
// import { updateMe } from '@/lib/api/clientApi';
// import { Metadata } from 'next';
// import { useState } from 'react';

// export const metaData: Metadata = {
//   title: 'EditProfile',
//   description: 'Edit your user details and settigs',
// };

// const EditProfile = () => {
//   const [userName, setUserName] = useState(''); // додаємо стан

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setUserName(event.target.value);
//   };

//   const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
//     event?.preventDefault();
//     await updateMe({ userName, photoUrl: '' });
//   };

//   return (
//     <div>
//       <h1 style={{ color: 'teal' }}>EditProfile Page</h1>
//       {/* Підключаємо на сторінку AvatarPicker */}
//       <AvatarPicker />
//       <form onSubmit={handleSaveUser}>
//         <input type="text" value={userName} onChange={handleChange} />
//         <button type="submit">Save user</button>
//       </form>
//     </div>
//   );
// };

// export default EditProfile;

/////////////Додаємо логіку getMe у поточну сторінку://///////

'use client';

import { useEffect, useState } from 'react';
import AvatarPicker from '@/components/AvatarPicker/AvatarPicker';
import { getMe, updateMe } from '@/lib/api/clientApi';

const EditProfile = () => {
  const [userName, setUserName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [imagaFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.userName ?? '');
      setPhotoUrl(user.photoUrl ?? '');
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateMe({ userName, photoUrl });
  };

  return (
    <div>
      <h1>Edit profile</h1>
      <br />
      <AvatarPicker profilePhotoUrl={photoUrl} onChangePhoto={setImageFile} />
      <br />
      <form onSubmit={handleSaveUser}>
        <input type="text" value={userName} onChange={handleChange} />
        <br />
        <button type="submit">Save user</button>
      </form>
    </div>
  );
};

export default EditProfile;
