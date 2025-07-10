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

// import { getSingleNote } from '@/lib/api';

// type Props = {
//   params: Promise<{ id: string }>;
// };

// const NoteDetails = async ({ params }: Props) => {
//   const { id } = await params;
//   const note = await getSingleNote(id);

//   const formattedDate = note.updatedAt
//     ? `Updated at: ${note.updatedAt}`
//     : `Created at: ${note.createdAt}`;

//   return (
//     <div>
//       <h2>{note.title}</h2>
//       <p>{note.content}</p>
//       <button>Edit</button>
//       <p>{formattedDate}</p>
//     </div>
//   );
// };

// export default NoteDetails;

//............................
/**Prefetch і кешування

Далі, до серверного компонента app/notes/[id]/page.tsx повертаємо логіку читання ідентифікатора із параметрів. Також додамо код, щоб компонент завантажував дані заздалегідь (prefetch). */
//.........................
// import { QueryClient } from '@tanstack/react-query';
// import { getSingleNote } from '@/lib/api';
// import NoteDetailsClient from './NoteDetails.client';

// type Props = {
//   params: Promise<{ id: string }>;
// };

// const NoteDetails = async ({ params }: Props) => {
//   const { id } = await params;
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ['note', id],
//     queryFn: () => getSingleNote(id),
//   });

//   return <NoteDetailsClient />;
// };

// export default NoteDetails;
//.........................
//////////////////////////////
/**Для того, щоб використати ці дані в клієнтському компоненті, необхідно використати HydrationBoundary із React Query. */
//........................
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { getSingleNote } from '@/lib/api/clientApi';
import NoteDetailsClient from './NoteDetails.client';

type Props = {
  params: Promise<{ id: string }>;
};

// Динамічні мета-теги === асинхронна функція generateMetadata():

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const note = await getSingleNote(id);

  return {
    title: `${note.title}`,
    description: note.content.slice(0, 30),
  };
}

//Назва нотатки тепер відображається у вкладці браузера:

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
//.................................

// ===================з конспекту=======
