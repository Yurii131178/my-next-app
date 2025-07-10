// middleware.ts

// import { NextRequest } from 'next/server';

// const privateRoutes = ['/profile'];

// export async function middleware(request: NextRequest) {}

// export const config = {};

//.......................................................................//

/**Логіка хендлера auth/session не змінюється
 * 
--------------------------Оновлення логіки middleware---------------------
Тепер додаємо виклик checkServerSession у middleware й обробляємо відповідь так само як у хендлері auth/session:  */

// middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile'];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  // Шлях, на який користувач намагається перейти
  const { pathname } = request.nextUrl;
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isPrivateRoute) {
    if (!accessToken) {
      if (refreshToken) {
        // Отримуємо нові cookie
        const data = await checkServerSession();
        const setCookie = data.headers['set-cookie'];

        if (setCookie) {
          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: Number(parsed['Max-Age']),
            };
            if (parsed.accessToken)
              cookieStore.set('accessToken', parsed.accessToken, options);
            if (parsed.refreshToken)
              cookieStore.set('refreshToken', parsed.refreshToken, options);
          }

          // важливо — передаємо нові cookie далі, щоб оновити їх у браузері
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }

      // немає жодного токена — редірект на сторінку входу
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // публічний маршрут або accessToken є — дозволяємо доступ
  return NextResponse.next();
}

/**=======Налаштування config==============
У config вказуємо, для яких маршрутів має запускатися middleware. 
Для цього служить властивість matcher: */

export const config = {
  matcher: ['/profile'],
};
