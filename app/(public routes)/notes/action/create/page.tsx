/**Сторінка створення нотатки

Почнемо зі сторінки за шляхом /notes/action/create/page.tsx. */

import { getCategories } from '@/lib/api';

const CreateNote = async () => {
  const categories = await getCategories;
  return <div>CreateNote</div>;
};

export default CreateNote;
