import axios from 'axios';

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

// axios.defaults.baseURL = 'https://next-docs-api.onrender.com';

axios.defaults.baseURL = 'http://localhost:3000/api';

export const getNotes = async (categoryId?: string, title?: string) => {
  const res = await axios.get<NoteListResponse>('/notes', {
    params: { categoryId, title },
  });
  return res.data;
};

export const getSingleNote = async (id: string) => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};

export const getCategories = async () => {
  const res = await axios<Category[]>('/categories');
  return res.data;
};

export const createNote = async (data: NewNoteData) => {
  const res = await axios.post<Note>('/notes', data);
  return res.data;
};
