// components/NoteItem/NoteItem.tsx

// import { Note } from '../../lib/api';
// import css from './NoteItem.module.css';

// type Props = {
//   item: Note;
// };

// const NoteItem = ({ item }: Props) => {
//   return (
//     <li>
//       <p className={css.NoteItem}>{item.title}</p>
//     </li>
//   );
// };

// export default NoteItem;
/////////////////////////////
/**Навігація на сторінку нотатки

Для цього нам потрібно у компоненті NoteItem.tsx додати логіку навігації, за допомогою Link */
import Link from 'next/link';
import { Note } from '@/lib/api';
import css from './NoteItem.module.css';

type Props = {
  item: Note;
};

const NoteItem = ({ item }: Props) => {
  return (
    <li>
      <Link href={`/notes/${item.id}`} className={css.noteItem}>
        {item.title}
      </Link>
    </li>
  );
};

export default NoteItem;
