// components/NoteList/NoteList.tsx

import { Note } from '../../lib/api/clientApi';
import NoteItem from '../NoteItem/NoteItem';

type Props = {
  notes: Note[];
};

const NoteList = ({ notes }: Props) => {
  return (
    <ul style={{ listStyle: 'none' }}>
      {notes.map((note) => (
        <NoteItem key={note.id} item={note} />
      ))}
    </ul>
  );
};

export default NoteList;
