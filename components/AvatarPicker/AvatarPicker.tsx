// components/AvatarPicker/AvatarPicker.tsx

// 'use client';

// const AvatarPicker = () => {
//   return (
//     <div>
//       <label>
//         📷 Choose photo
//         <input type="file" accept="image/*" />
//       </label>
//     </div>
//   );
// };

// export default AvatarPicker;

/**Цей інпут має type="file" і приймає лише зображення – завдяки accept="image/*".

//-----------------------------------------//
Додаємо обробник події
Далі додамо обробник на зміну файлу: */

// components/AvatarPicker/AvatarPicker.tsx

// 'use client';

// const AvatarPicker = () => {
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     console.log('file', file);
//   };

//   return (
//     <div>
//       <label>
//         📷 Choose photo
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//       </label>
//     </div>
//   );
// };

// export default AvatarPicker;

//--------------------------------------//

/**=======Додаємо перевірки типу та розміру=============//

Використаємо useState для помилки та додамо перевірки:
- чи це дійсно зображення;
- чи не перевищує розмір 5MB. */

// components/AvatarPicker/AvatarPicker.tsx

// 'use client';

// import { useState } from 'react';

// const AvatarPicker = () => {
//   const [error, setError] = useState('');

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     setError('');

//     if (file) {
//       // Перевіряємо тип файлу
//       if (!file.type.startsWith('image/')) {
//         setError('Only images');
//         return; // до побачення
//       }

//       // Перевіряємо розмір файлу (максимум 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         setError('Max file size 5MB');
//         return; // до побачення
//       }
//     }
//   };

//   return (
//     <div>
//       <label>
//         📷 Choose photo
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//       </label>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default AvatarPicker;
//------------------------------------------------------------//

/**Відображаємо превʼю

Використаємо FileReader, щоб створити превʼю для обраного файлу:

--додаємо стан для збереження previewUrl
--для отримання url з файлу використовуємо FileReader
--створюємо екземпляр FileReader
--в метод onloadend додаємо логіку оновлення стану previewUrl
--викликаємо readAsDataURL передаючи у нього файл */

//=============================================//

// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';

// const AvatarPicker = () => {
//   const [previewUrl, setpreviewUrl] = useState(''); // додаємо стан для збереження previewUrl
//   const [error, setError] = useState('');

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     setError('');

//     if (file) {
//       // Перевіряємо тип файлу
//       if (!file.type.startsWith('image/')) {
//         setError('Only images');
//         return; // до побачення
//       }

//       // Перевіряємо розмір файлу (максимум 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         setError('Max file size 5MB');
//         return; // до побачення
//       }

//       // для отримання url з файлу використовуємо FileReader
//       // створюємо екземпляр FileReader

//       const reader = new FileReader();

//       //в метод onloadend додаємо логіку оновлення стану previewUrl

//       reader.onloadend = () => {
//         setpreviewUrl(reader.result as string);
//       };

//       // викликаємо readAsDataURL передаючи у нього файл */

//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div>
//       {/* Відображаємо прев'ю якщо зображення існує */}
//       {previewUrl ? (
//         <Image src={previewUrl} alt="Preview" width={300} height={300} />
//       ) : (
//         <label>
//           📷 Choose photo
//           <input type="file" accept="image/*" onChange={handleFileChange} />
//         </label>
//       )}
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default AvatarPicker;

/**Тепер у нас є можливість вибрати фото і побачити його превʼю, а далі ми реалізуємо редагування і видалення фото через зовнішню форму, яка буде відповідати за редагування всього профілю. */

//------------------------------------------------//

/** Пропс зображення

- Додаємо AvatarPicker проп profilePhotoUrl, тобто посилання на фото, яке    бекенд повертає при завантаженні сторінки або оновленні. 
- Через useEffect запишемо це значення в стан.*/
//=====================================================//

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Props = {
  profilePhotoUrl?: string;
};

const AvatarPicker = ({ profilePhotoUrl }: Props) => {
  const [previewUrl, setpreviewUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (profilePhotoUrl) {
      setpreviewUrl(profilePhotoUrl);
    }
  }, [profilePhotoUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Only images');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Max file size 5MB');
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setpreviewUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {/* Відображаємо прев'ю якщо зображення існує */}
      {previewUrl ? (
        <Image src={previewUrl} alt="Preview" width={300} height={300} />
      ) : (
        <label>
          📷 Choose photo
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default AvatarPicker;
