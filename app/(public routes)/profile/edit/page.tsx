// app/profile/edit/page.tsx

import AvatarPicker from '@/components/AvatarPicker/AvatarPicker';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EditProfile',
  description: 'Edit your user details and settigs',
};

const EditProfile = () => {
  return (
    <div>
      <h1 style={{ color: 'teal' }}>EditProfile Page</h1>
      {/* Підключаємо на сторінку AvatarPicker */}
      <AvatarPicker />
    </div>
  );
};

export default EditProfile;
