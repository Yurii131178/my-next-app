// components/NoteItem/NoteItem.tsx

import { Note } from '../../lib/api';
import css from './NoteItem.module.css';

type Props = {
  item: Note;
};

const NoteItem = ({ item }: Props) => {
  return (
    <li>
      <p className={css.NoteItem}>{item.title}</p>
    </li>
  );
};

export default NoteItem;
