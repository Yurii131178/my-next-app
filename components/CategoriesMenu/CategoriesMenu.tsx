// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import { Category } from '@/lib/api';
// import css from './CategoriesMenu.module.css';

// type Props = {
//   categories: Category[];
// };

// const CategoriesMenu = ({ categories }: Props) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);

//   return (
//     <div className={css.menuContainer}>
//       <button onClick={toggle} className={css.menuBtn}>
//         Notes
//       </button>
//       {isOpen && (
//         <ul className={css.menu}>
//           <li className={css.menuItem}>
//             <Link href={`/notes/filter/all`} onClick={toggle}>
//               All notes
//             </Link>
//           </li>
//           {categories.map((category) => (
//             <li key={category.id} className={css.menuItem}>
//               <Link href={`/notes/filter/${category.id}`} onClick={toggle}>
//                 {category.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CategoriesMenu;

/////Робимо його клієнтським і саме тут виконуємо запит за допомогою useEffect:////////////////////
// components/CategoriesMenu/CategoriesMenu.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Category, getCategories } from '@/lib/api/clientApi';
import css from './CategoriesMenu.module.css';

const CategoriesMenu = () => {
  const [isOpen, setIsOpenMenu] = useState<boolean>(false);

  const toggle = () => setIsOpenMenu(!isOpen);

  // Додаємо стан
  const [categories, setCategories] = useState<Category[]>([]);

  // Додаємо ефект для запиту
  useEffect(() => {
    // Змінюємо стан
    getCategories().then((data) => setCategories(data));
  }, []);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuBtn}>
        Notes
      </button>
      {isOpen && (
        <ul className={css.menu}>
          <li className={css.menuItem}>
            <Link href={`/notes/filter/all`} onClick={toggle}>
              All notes
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id} className={css.menuItem}>
              <Link href={`/notes/filter/${category.id}`} onClick={toggle}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesMenu;
