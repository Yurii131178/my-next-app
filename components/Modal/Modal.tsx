'use client';
import { useRouter } from 'next/navigation';
import css from './Modal.module.css'; // Імпортуємо ваш CSS-модуль

type Props = {
  children: React.ReactNode;
};

const Modal = ({ children }: Props) => {
  const router = useRouter();

  const close = () => router.back();

  return (
    // Застосовуємо клас для оверлею (напівпрозорого фону)
    <div className={css.overlay}>
      {/* Застосовуємо клас для самого вмісту модального вікна */}
      <div className={css.modalContent}>
        {children}
        {/* Застосовуємо клас для кнопки закриття */}
        <button onClick={close} className={css.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
