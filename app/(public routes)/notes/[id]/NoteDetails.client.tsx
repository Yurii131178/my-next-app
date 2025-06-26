// app/notes/[id]/NoteDetails.client.tsx

// 'use client';

// import { useQuery } from '@tanstack/react-query';
// import { useParams } from 'next/navigation';
// import { getSingleNote } from '@/lib/api';

// const NoteDetailsClient = () => {
//   const { id } = useParams<{ id: string }>();

//   const {
//     data: note,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ['note', id],
//     queryFn: () => getSingleNote(id),
//     refetchOnMount: false,
//   });

//   if (isLoading) return <p>Loading...</p>;

//   if (error || !note) return <p>Some error..</p>;

//   const formattedDate = note.updatedAt
//     ? `Updated at: ${note.updatedAt}`
//     : `Created at: ${note.createdAt}`;

// //   //Програмна навігація
// // Маючи фільтрацію нотаток за категорією, виникає бажання – мати можливість зі сторінки деталей повертатися назад. Отже, нам потрібна кнопка “Назад” у компоненті NoteDetailsClient.

//   const handleGoBack = () => {};

//   return (
//     <div>
//       <button onClick={handleGoBack}>Back</button>
//       <h2>{note.title}</h2>
//       <p>{note.content}</p>
//       <p>{formattedDate}</p>
//     </div>
//   );
// };

// export default NoteDetailsClient;

//////////////////////////////// фінальний код ///////////////////////

'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { getSingleNote } from '@/lib/api';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
    refetchOnMount: false,
  });

  const handleGoBack = () => {
    const isSure = confirm('Are you sure?');
    if (isSure) {
      router.back();
    }
  };

  if (isLoading) return <p>Loading...</p>;

  if (error || !note) return <p>Some error..</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <div>
      <button onClick={handleGoBack}>Back</button>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>{formattedDate}</p>
    </div>
  );
};

export default NoteDetailsClient;
