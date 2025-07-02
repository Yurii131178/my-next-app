import Link from 'next/link';
import { getCategories } from '@/lib/api';

const NotesSidebar = async () => {
  const categories = await getCategories();

  return (
    <>
      {/* додавємо посилання на пейджу CreateNote */}
      <Link href="/notes/action/create">CreateNote</Link>
      <ul
        style={{
          color: 'white',
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <li>
          <Link href={`/notes/filter/all`}>All notes</Link>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/notes/filter/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NotesSidebar;
