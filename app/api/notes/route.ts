// app/api/notes/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';

export async function GET(request: NextRequest) {
  const categoryId = request.nextUrl.searchParams.get('categoryId');

  const { data } = await api('/notes', {
    params: { categoryId },
  });

  if (data) {
    return NextResponse.json(data);
  }

  return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
}

export async function POST(request: NextRequest) {
  // Отримуємо дані з тіла запиту
  const body = await request.json();

  // Передаємо їх далі на бекенд нотаток
  const { data } = await api.post('/notes', body);

  if (data) {
    return NextResponse.json(data);
  }

  return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
}

/**Зверни увагу:

*будь-яка функція хендлера отримує об’єкт request як параметр;
*ми використовуємо фільтрацію, передаючи параметри через searchParams;
*через request.nextUrl маємо повний доступ до запиту, включаючи query-параметри. 
=================================================================================
Під час виклику createNote у компоненті ви передаєте обʼєкт нової нотатки. 
Ці дані автоматично потрапляють у request на Next-сервері, 
і функція POST обробляє їх за допомогою request.json().

Next автоматично визначає, яку функцію викликати – GET чи POST – залежно від типу запиту.

*/
