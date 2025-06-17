// // app/notes/[id]/page.tsx

// type Props = {
//   params: Promise<{ id: string }>;
// };

// const NoteDetails = async ({ params }: Props) => {
//   const { id } = await params;
//   console.log('note id:', id);

//   return <div>NoteDetails</div>;
// };

// export default NoteDetails;

///////////////
// import { getSingleNote } from '@/lib/api';

// type Props = {
//   params: Promise<{ id: string }>;
// };

// const NoteDetails = async ({ params }: Props) => {
//   const { id } = await params;
//   const note = await getSingleNote(id);
//   console.log(note);

//   return <div>NoteDetails</div>;
// };

// export default NoteDetails;
/////////// ---FINAL--- ///////////////
//............................

import { getSingleNote } from '@/lib/api';

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const note = await getSingleNote(id);

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <button>Edit</button>
      <p>{formattedDate}</p>
    </div>
  );
};

export default NoteDetails;

//............................
