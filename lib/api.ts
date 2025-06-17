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

export type NoteListResponse = {
  notes: Note[];
  total: number;
};

/////////////////////// створення штучної паузи, щоб побачити loader
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// export const getNotes = async () => {
//   await delay(5000);
//   const res = await axios.get<NoteListResponse>('/notes');
//   return res.data;
// };
/////////////////////

axios.defaults.baseURL = 'https://next-docs-api.onrender.com';

export const getNotes = async () => {
  const res = await axios.get<NoteListResponse>('/notes');
  return res.data;
};

export const getSingleNote = async (id: string) => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};
