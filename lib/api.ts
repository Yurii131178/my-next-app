import axios from 'axios';

// axios.defaults.baseURL = 'https://next-docs-api.onrender.com';

// axios.defaults.baseURL = 'http://localhost:3000/api'; // переїодимо до авторизації = додамо

const nextServer = axios.create({
  baseURL: 'https://next-docs-api.onrender.com',
  withCredentials: true,
});

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

// Функція register
/**
 * Реєстрація – це POST-запит. 
 * Ми відправляємо дані, які користувач ввів у формі, 
 * а сервер створює новий обліковий запис і повертає нам об’єкт користувача.
Опишемо типи запиту та створимо функцію, яка його виконає: */

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
export const login = async (payload: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/login', payload);
  return res.data;
};
