// app/notes/action/create

/**Сторінка створення нотатки

1. Почнемо зі сторінки за шляхом /notes/action/create/page.tsx. */

import NoteForm from '@/components/NoteForm/NoteForm';
import { getCategories } from '@/lib/api';

const CreateNote = async () => {
  const categories = await getCategories();
  return (
    <>
      <NoteForm categories={categories} />
    </>
  );
};

export default CreateNote;
