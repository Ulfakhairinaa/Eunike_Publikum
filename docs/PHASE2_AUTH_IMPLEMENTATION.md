# PHASE 2: AUTHENTICATION - IMPLEMENTATION CHECKLIST
**Timeline**: 2-3 hours | **Status**: START HERE

---

## ✅ Checklist Master

```
PHASE 2.1 - Verify Supabase
[ ] Check src/lib/supabase/server.ts exists & has correct config
[ ] Check src/lib/supabase/client.ts exists & has correct config
[ ] Test connection: npm run dev → check console for errors

PHASE 2.2 - Login Page
[ ] Create/Update src/app/auth/login/page.tsx with Shadcn Form
[ ] Implement email + password inputs
[ ] Call Supabase signInWithPassword()
[ ] Add error handling & loading state
[ ] Add link to register page

PHASE 2.3 - Register Page
[ ] Create/Update src/app/auth/register/page.tsx with Shadcn Form
[ ] Implement email + password + nama_lengkap inputs
[ ] Call Supabase signUp()
[ ] Handle user creation in User table
[ ] Add error handling & success redirect

PHASE 2.4 - Middleware
[ ] Create middleware.ts at root if doesn't exist
[ ] Protect /app/* routes
[ ] Redirect unauthenticated to /auth/login
[ ] Allow /auth/* and / for public

PHASE 2.5 - Test
[ ] Register new account
[ ] Logout & login
[ ] Access protected route without auth (should redirect)
[ ] Access /dashboard after login (should work)
```

---

## 📄 Code Templates Ready to Use

### File 1: `src/lib/supabase/server.ts`
**Status**: Verify this exists and looks like below

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};
```

---

### File 2: `src/lib/supabase/client.ts`
**Status**: Verify this exists and looks like below

```typescript
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
```

---

### File 3: `src/app/auth/actions.ts` (Server Actions)
**Status**: Create or update if missing

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(email: string, password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/app/dashboard", "layout");
  redirect("/app/dashboard");
}

export async function register(
  email: string,
  password: string,
  nama_lengkap: string
) {
  const supabase = await createClient();

  // Sign up user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Insert into User table
  const { error: insertError } = await supabase
    .from("User")
    .insert([
      {
        id: data.user?.id,
        email,
        nama_lengkap,
        status_verifikasi: "unverified", // Can be auto-verified for MVP
      },
    ]);

  if (insertError) {
    return { error: insertError.message };
  }

  revalidatePath("/auth/login", "layout");
  redirect("/auth/login?registered=true");
}

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}
```

---

### File 4: `src/app/auth/login/page.tsx`
**Status**: Create or update

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result?.error) {
        setError(result.error);
      }
      // On success, login() redirects automatically
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Masuk ke YO MAP
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Atau{" "}
            <Link href="/auth/register" className="text-blue-600 hover:underline">
              daftar akun baru
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Loading..." : "Masuk"}
          </Button>
        </form>
      </div>
    </div>
  );
}
```

---

### File 5: `src/app/auth/register/page.tsx`
**Status**: Create or update

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import { register } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nama_lengkap, setNamaLengkap] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      setLoading(false);
      return;
    }

    try {
      const result = await register(email, password, nama_lengkap);
      if (result?.error) {
        setError(result.error);
      }
      // On success, register() redirects automatically
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Daftar YO MAP
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Masuk di sini
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <Label htmlFor="nama">Nama Lengkap</Label>
            <Input
              id="nama"
              type="text"
              value={nama_lengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
              required
              placeholder="Nama lengkap Anda"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Minimal 6 karakter"
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {loading ? "Loading..." : "Daftar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
```

---

### File 6: `middleware.ts` (Root Level)
**Status**: Create at root (same level as src/)

```typescript
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Update user session
  let response = await updateSession(request);

  // Protect /app/* routes
  const protectedPaths = ["/app"];
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  const isAuthPath = pathname.startsWith("/auth");
  const isPublic = pathname === "/" || pathname.startsWith("/public");

  const user = response.headers.get("x-user"); // Set by updateSession if authenticated

  if (isProtected && !user) {
    // Redirect to login if trying to access protected route without auth
    return Response.redirect(new URL("/auth/login", request.url));
  }

  if (isAuthPath && user) {
    // Redirect to dashboard if already logged in and trying to access auth pages
    return Response.redirect(new URL("/app/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)",
  ],
};
```

**Note**: If above doesn't work, use simpler version:

```typescript
import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data } = await supabase.auth.getUser();

  // Protect /app routes
  if (request.nextUrl.pathname.startsWith("/app") && !data.user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect logged-in users away from auth pages
  if (request.nextUrl.pathname.startsWith("/auth") && data.user) {
    return NextResponse.redirect(new URL("/app/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*?)"],
};
```

---

## 🧪 Testing Checklist

After implementing all above:

```
[ ] npm run dev runs without errors
[ ] Visit http://localhost:3000 → should show landing page
[ ] Click "Daftar" → goes to /auth/register
[ ] Fill form & submit → creates user in Supabase
[ ] Redirects to /auth/login with success message
[ ] Click "Masuk" → goes to /auth/login
[ ] Login with credentials → redirects to /app/dashboard
[ ] Visit /app/dashboard while logged in → works
[ ] Visit /app/dashboard without login → redirects to /auth/login
[ ] Click logout button → redirects to home
[ ] Try to access /app/* without login → redirects to /auth/login
```

---

## 🐛 Common Issues & Fixes

### Issue 1: "NEXT_PUBLIC_SUPABASE_URL not found"
**Fix**: Verify .env.local has these:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
```

### Issue 2: "User table doesn't exist"
**Fix**: 
```bash
npx prisma migrate deploy
npx prisma db push
```

### Issue 3: "Middleware not working"
**Fix**: Make sure middleware.ts is at ROOT level (same level as src/), not inside src/

### Issue 4: "Cookies not being set"
**Fix**: Check Supabase project settings:
- Go to Project Settings → Auth
- Ensure "Enable access control" is OFF for MVP
- Ensure cookie settings allow localhost

---

## ⏱️ Time Estimate

- Supabase verification: 15 min
- Login page: 20 min
- Register page: 20 min
- Middleware: 15 min
- Testing: 20 min
- **Total: ~90 minutes**

---

## Next Steps After Phase 2

Once Phase 2 is working:
1. Dashboard page should exist at `/app/dashboard`
2. Start Phase 3.1 (Data Seeding)
3. Build Quiz UI in parallel

---

**Ready to implement Phase 2?** Start with file 1 verification! 🚀
