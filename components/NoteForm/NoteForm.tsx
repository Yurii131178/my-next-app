// 'use client';

// import { useRouter } from 'next/navigation';
// import { useMutation } from '@tanstack/react-query';
// import { Category, createNote, NewNoteData } from '@/lib/api';
// import styles from './NoteForm.module.css';

// type Props = {
//   categories: Category[];
// };

// const NoteForm = ({ categories }: Props) => {
//   const router = useRouter();

//   const { mutate } = useMutation({
//     mutationFn: createNote,
//     onSuccess: () => {
//       router.push('/notes/filter/all');
//     },
//   });

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const values = Object.fromEntries(formData) as NewNoteData;
//     mutate(values);
//   };

//   return (
//     <form onSubmit={handleSubmit} className={styles.form}>
//       <label className={styles.label}>
//         <span>Title</span>
//         <input type="text" name="title" required className={styles.input} />
//       </label>

//       <label className={styles.label}>
//         <span>Content</span>
//         <textarea
//           name="content"
//           required
//           className={styles.textarea}
//         ></textarea>
//       </label>

//       <label className={styles.label}>
//         <span>Category</span>
//         <select name="categoryId" required className={styles.select}>
//           {categories.map((category) => (
//             <option key={category.id} value={category.id}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//       </label>

//       <div className={styles.buttonGroup}>
//         <button type="submit" className={styles.button}>
//           Create
//         </button>
//         <button
//           type="button"
//           onClick={() => router.push('/notes/filter/all')}
//           className={styles.button}
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// export default NoteForm;
////////////////////чернетка/////////////////////////////
// components/NoteForm/NoteForm.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Category, createNote, NewNoteData } from '@/lib/api';
import styles from './NoteForm.module.css';
// ІМПОРТУЄМО ХУК
import { useNoteDraftStore } from '@/lib/stores/noteStore';

type Props = {
  categories: Category[];
};

const NoteForm = ({ categories }: Props) => {
  const router = useRouter();

  // 2. Викликаємо хук і отримуємо значення
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

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
