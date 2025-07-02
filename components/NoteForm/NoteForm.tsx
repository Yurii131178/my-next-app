// // components/NoteForm/NoteForm.tsx

// 'use client';

// import { useRouter } from 'next/navigation';
// import { Category } from '@/lib/api';

// type Props = {
//   categories: Category[];
// };

// const NoteForm = ({ categories }: Props) => {
//   const router = useRouter();

//   const handleCancel = () => router.push('/notes/filter/all');

//   const handleSubmit = (formData: FormData) => {
//     const values = Object.fromEntries(formData);
//     console.log(values);
//   };

//   return (
//     <form action={handleSubmit}>
//       <label>
//         Title
//         <input type="text" name="title" />
//       </label>

//       <label>
//         Content
//         <textarea name="content"></textarea>
//       </label>

//       <label>
//         Category
//         <select name="category">
//           {categories.map((category) => (
//             <option key={category.id} value={category.id}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//       </label>

//       <div>
//         <button type="submit">Create</button>
//         <button type="button" onClick={handleCancel}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// export default NoteForm;

/////////////

// components/NoteForm/NoteForm.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Category, createNote, NewNoteData } from '@/lib/api';
import css from './NoteForm.module.css';

type Props = {
  categories: Category[];
};

const NoteForm = ({ categories }: Props) => {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      router.push('/notes/filter/all');
    },
  });

  const handleCancel = () => router.push('/notes/filter/all');

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData);
    const noteData: NewNoteData = {
      title: values.title as string,
      content: values.content as string,
      categoryId: values.categoryId as string,
    };
    mutate(noteData);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <label className={css.label}>
        Title
        <input type="text" name="title" className={css.input} />
      </label>

      <label className={css.label}>
        Content
        <textarea name="content" className={css.textarea}></textarea>
      </label>

      <label className={css.label}>
        Category
        <select name="categoryId" className={css.select}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <div className={css.buttonGroup}>
        <button type="submit" className={css.submitBtn}>
          Create
        </button>
        <button type="button" onClick={handleCancel} className={css.cancelBtn}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
