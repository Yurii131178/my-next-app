// app/profile/edit/page.tsx

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EditProfile',
  description: 'Edit your user details and settigs',
};

const EditProfile = () => {
  return (
    <div>
      <h1 style={{ color: 'teal' }}>EditProfile Page</h1>
    </div>
  );
};

export default EditProfile;
