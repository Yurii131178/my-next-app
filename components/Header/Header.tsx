// import css from './Header.module.css';
// import Link from 'next/link';

// const Header = () => {
//   return (
//     <header className={css.header}>
//       <Link href="/" aria-label="Home">
//         NoteHub
//       </Link>
//       <nav aria-label="Main Navigation">
//         <ul className={css.navigation}>
//           <li>
//             <Link href="/">Home</Link>
//           </li>
//           <li>
//             <Link href="/notes">Notes</Link>
//           </li>
//           <li>
//             <Link href="/profile">Profile</Link>
//           </li>
//           <li>
//             <Link href="/about">About</Link>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;

//////////////////////////////

/**Фільтрація нотаток за категорією

У нотаток є категорії – це передбачено бекендом. Тому реалізуємо логіку фільтрації за категоріями через окремі маршрути.

Перше, що ми зробимо – це змінимо хедер. Замість звичайної навігації на сторінку /notes ми додамо меню з категоріями нотаток.

Крок 1. Запит на отримання категорій => Додаємо запит на отримання списку категорій до lib/api.ts:

Крок 2. Додаємо меню до Header.tsx*/

// components/Header/Header.tsx

// import Link from 'next/link';
// import css from './Header.module.css';
// import { getCategories } from '@/lib/api';
// import CategoriesMenu from '../CategoriesMenu/CategoriesMenu';

// const Header = async () => {
//   const categories = await getCategories();

//   const handleClick = () => {
//     // ...
//   };

//   return (
//     <header className={css.header}>
//       <Link href="/" aria-label="Home">
//         NoteHub
//       </Link>
//       <nav aria-label="Main Navigation">
//         <ul className={css.navigation}>
//           <li>
//             <button onClick={handleClick}>Open menu</button>
//           </li>
//           <li>
//             <CategoriesMenu categories={categories} />
//           </li>
//           <li>
//             <Link href="/profile">Profile</Link>
//           </li>
//           <li>
//             <Link href="/about">About</Link>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;

//////////////////////

// import Link from 'next/link';
// import { getCategories } from '@/lib/api';
// import CategoriesMenu from '../CategoriesMenu/CategoriesMenu';
// import css from './Header.module.css';
// import AuthNavigation from '../AuthNavigation/AuthNavigation';

// const Header = async () => {
//   const categories = await getCategories();

//   return (
//     <header className={css.header}>
//       <Link href="/" aria-label="Home">
//         NoteHub
//       </Link>
//       <nav aria-label="Main Navigation">
//         <ul className={css.navigation}>
//           <li>
//             <CategoriesMenu categories={categories} />
//           </li>
//           <li>
//             <Link href="/profile">Profile</Link>
//           </li>
//           <li>
//             <Link href="/about">About</Link>
//           </li>
//           {/* Нові посилання */}
//           {/* <li>
//             <Link href="/sign-in">Login</Link>
//           </li> */}
//           {/* <li>
//             <Link href="/sign-up">Register</Link>
//           </li> */}

//           {/*ми прибираємо Register/Login та кладемо замість них*/}
//           {/* Відображаємо компонент */}
//           <AuthNavigation />
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;

////////Оновлюємо Header
// Ми приберемо з Header виклик getCategories://///////

// components/Header/Header.tsx

import css from './Header.module.css';
import Link from 'next/link';
import CategoriesMenu from '../CategoriesMenu/CategoriesMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

const Header = () => {
  // Прибираємо запит
  // const categories = await getCategories()

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        Note HUB
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            {/* Пропс categories тепер не приходять з SSR */}
            <CategoriesMenu />
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
