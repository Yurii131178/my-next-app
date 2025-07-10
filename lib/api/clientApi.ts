import { nextServer } from './api';

export type Note = {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type NoteListResponse = {
  notes: Note[];
  total: number;
};

export type NewNoteData = {
  title: string;
  content: string;
  categoryId: string;
};

export const getNotes = async (categoryId?: string, title?: string) => {
  const res = await nextServer.get<NoteListResponse>('/notes', {
    params: { categoryId, title },
  });
  return res.data;
};

export const getSingleNote = async (id: string) => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const getCategories = async () => {
  const res = await nextServer<Category[]>('/categories');
  return res.data;
};

export const createNote = async (payload: NewNoteData) => {
  const res = await nextServer.post<Note>('/notes', payload);
  return res.data;
};

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  // role: 'USER';
  createdAt: Date;
  updatedAt: Date;
};

export const register = async (payload: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', payload);
  return res.data;
};

// Функція login

export type LoginRequest = {
  email: string;
  password: string;
};
export const login = async (payload: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', payload);
  return res.data;
};

// Реалізація перевірки сесії

// Оскільки логікою створення і перевірки токенів керує бекенд, щоб дізнатися, чи дійсні поточні токени в браузері, нам потрібно зробити GET-запит до /auth/session. У відповідь ми отримаємо або нові токени, або 401, що означає, що користувач не авторизований.

// Створюємо метод checkSession:
// lib/api.ts

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/auth/me');
  return data;
};

/**запит до API - logout*/

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

/** Форма редагування профілю
Тепер додамо на сторінку EditProfile форму редагування профілю. Створюємо метод в clientApi.ts:*/

export type UpdateUserRequest = {
  userName?: string;
  photoUrl?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.put<User>('/auth/me', payload);
  return res.data;
};
