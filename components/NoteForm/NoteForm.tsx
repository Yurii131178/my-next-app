'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Category, createNote, NewNoteData } from '@/lib/api';
import styles from './NoteForm.module.css';

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData) as NewNoteData;
    mutate(values);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        <span>Title</span>
        <input type="text" name="title" required className={styles.input} />
      </label>

      <label className={styles.label}>
        <span>Content</span>
        <textarea
          name="content"
          required
          className={styles.textarea}
        ></textarea>
      </label>

      <label className={styles.label}>
        <span>Category</span>
        <select name="categoryId" required className={styles.select}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.button}>
          Create
        </button>
        <button
          type="button"
          onClick={() => router.push('/notes/filter/all')}
          className={styles.button}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
////////////////////чернетка/////////////////////////////
// components/NoteForm/NoteForm.tsx

// 'use client';

// import { Category, createNote, NewNoteData } from '@/lib/api';
// import { useMutation } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation';
// // 1. Імпортуємо хук
// import { useNoteDraftStore } from '@/lib/stores/NoteStore';
// import styles from './NoteForm.module.css';

// type Props = {
//   categories: Category[];
// };

// const NoteForm = ({ categories }: Props) => {
//   const router = useRouter();

//   // 2. Викликаємо хук і отримуємо значення
//   const { draft, setDraft, clearDraft } = useNoteDraftStore();

//   // 3. Оголошуємо функцію для onChange щоб при зміні будь-якого
//   // елемента форми оновити чернетку нотатки в сторі
//   const handleChange = (
//     event: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >,
//   ) => {
//     // 4. Коли користувач змінює будь-яке поле форми — оновлюємо стан
//     setDraft({
//       ...draft,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const { mutate } = useMutation({
//     mutationFn: createNote,
//     // 5. При успішному створенні нотатки очищуємо чернетку
//     onSuccess: () => {
//       clearDraft();
//       router.push('/notes/filter/all');
//     },
//   });

//   const handleSubmit = (formData: FormData) => {
//     const values = Object.fromEntries(formData) as NewNoteData;
//     mutate(values);
//   };

//   const handleCancel = () => router.push('/notes/filter/all');

//   // 6. До кожного елемента додаємо defaultValue та onChange
//   // щоб задати початкове значення із чернетки
//   // та при зміні оновити чернетку в сторі
//   return (
//     <form className={styles.form} action={handleSubmit}>
//       <label className={styles.label}>
//         Title
//         <input
//           type="text"
//           name="title"
//           defaultValue={draft?.title}
//           onChange={handleChange}
//         />
//       </label>

//       <label className={styles.label}>
//         Content
//         <textarea
//           name="content"
//           defaultValue={draft?.content}
//           onChange={handleChange}
//         ></textarea>
//       </label>

//       <label className={styles.label}>
//         Category
//         <select
//           name="category"
//           defaultValue={draft?.categoryId}
//           onChange={handleChange}
//         >
//           {categories.map((category) => (
//             <option key={category.id} value={category.id}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//       </label>

//       <div className={styles.actions}>
//         <button type="submit">Create</button>
//         <button type="button" onClick={handleCancel}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// export default NoteForm;
