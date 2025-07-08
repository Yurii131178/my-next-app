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
