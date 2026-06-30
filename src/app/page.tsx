import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light-blue to-white font-sans animate-in fade-in zoom-in duration-700">
      <main className="max-w-4xl mx-auto px-6 py-16 text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-6 tracking-tight">
          Temukan Potensimu. Raih Karier Impianmu.
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl">
          Kenali minat dan bakatmu dengan tes terkalibrasi kami, lalu temukan rekomendasi jurusan terbaik untuk masa depan gemilangmu.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <Link 
            href="/test" 
            className="flex items-center justify-center bg-primary text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary-accent"
          >
            Mulai Tes
          </Link>
          <Link 
            href="/auth/login" 
            className="flex items-center justify-center bg-white text-primary border-2 border-primary font-semibold py-3 px-8 rounded-full shadow-sm transition-all duration-300 hover:scale-105 hover:bg-gray-50"
          >
            Masuk / Daftar
          </Link>
        </div>
      </main>
    </div>
  );
}
