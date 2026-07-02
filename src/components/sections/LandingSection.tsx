'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { Sparkles, Navigation, Briefcase, Gamepad2, ArrowRight, Share2, Mail, Globe } from 'lucide-react'

export const LandingSection = () => {
  const [activeTab, setActiveTab] = useState('/')

  const navItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Kami', href: '#tentang-kami' },
    { name: 'Layanan', href: '#layanan' },
    { name: 'Kontak', href: '#kontak' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" onClick={() => setActiveTab('/')}>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-blue-900 tracking-tight">YO-MAP</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-600">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setActiveTab(item.href)}
                className={`relative py-1 transition-colors duration-300 ${
                  activeTab === item.href ? 'text-blue-900' : 'hover:text-blue-900'
                } after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:bg-blue-900 after:transition-all after:duration-300 after:-translate-x-1/2 ${
                  activeTab === item.href ? 'after:w-full' : 'after:w-0 hover:after:w-1/2'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="font-semibold text-blue-900 hover:bg-blue-50">Masuk</Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-[#0B3B60] hover:bg-[#0a3356] text-white font-semibold rounded-full px-6">Daftar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f0f7fc] to-white py-20 lg:py-32">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[80px] opacity-70 translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-100/80 text-blue-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              <Sparkles size={14} className="text-blue-600" /> Make Your Future Better
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-[#0B3B60] leading-[1.1] tracking-tight">
              Rangkai Masa Depanmu Bersama YO-MAP
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              Peta masa depanmu ada di tanganmu. Yuk kenali dirimu dan tentukan jurusan impianmu demi masa depan yang cerah bersama YO MAP!
            </p>
            <div>
              <Link href="/auth/register">
                <Button className="bg-[#0B3B60] hover:bg-[#0a3356] text-white text-base font-semibold px-8 py-6 rounded-xl shadow-xl shadow-blue-900/20 group">
                  Mulai Sekarang 
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-orange-100 rounded-[3rem] rotate-3 opacity-60 blur-sm"></div>
            <div className="relative bg-white rounded-[2rem] p-4 shadow-2xl overflow-hidden border border-white/50 border-r-0 border-b-0 backdrop-blur-xl">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-slate-100">
                <Image src="/images/hero-v2.png" alt="Siswa Belajar Bersama" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="bg-[#FFF8ED] py-12 border-y border-orange-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-orange-200/60">
          <div className="text-center px-4">
            <h3 className="text-4xl font-black text-[#0B3B60]">40+</h3>
            <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-widest">Metrik Psikometri</p>
          </div>
          <div className="text-center px-4">
            <h3 className="text-4xl font-black text-[#0B3B60]">250+</h3>
            <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-widest">Jalur Karier</p>
          </div>
          <div className="text-center px-4">
            <h3 className="text-4xl font-black text-[#0B3B60]">98%</h3>
            <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-widest">Kepuasan Pengguna</p>
          </div>
          <div className="text-center px-4">
            <h3 className="text-4xl font-black text-[#0B3B60]">50+</h3>
            <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-widest">Universitas Mitra</p>
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section id="tentang-kami" className="bg-[#0B3B60] py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-16">
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200">Tentang Kami</h4>
            <h2 className="text-3xl md:text-4xl font-bold">Mengapa YO MAP hadir?</h2>
            <p className="text-blue-100 text-lg leading-relaxed max-w-2xl mx-auto">
              Kami melihat realitas yang menantang di dunia pendidikan dan profesional Indonesia saat ini.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white rounded-3xl p-8 text-slate-900 shadow-2xl">
              <h3 className="text-6xl font-black text-[#0B3B60] mb-2 tracking-tighter">61%</h3>
              <h4 className="text-xl font-bold mb-3">Siswa Kekurangan Informasi</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Siswa kekurangan informasi untuk mengenali minat dan bakatnya.
              </p>
              <p className="text-xs font-medium text-slate-400">Kusmana, N. I. D., et al. 2024</p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 text-slate-900 shadow-2xl">
              <h3 className="text-5xl md:text-6xl font-black text-[#0B3B60] mb-2 tracking-tighter">50–60%</h3>
              <h4 className="text-xl font-bold mb-3">Mahasiswa Salah Jurusan</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Akibat minimnya informasi mengenai kapasitas &amp; kemampuan diri (pra-kuliah) sehingga motivasi belajar menurun secara signifikan.
              </p>
              <p className="text-xs font-medium text-slate-400">Persoalan Salah Jurusan Mahasiswa, binus.ac.id, 2025.</p>
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-blue-50 font-medium leading-relaxed max-w-3xl mx-auto">
            Di tengah minimnya informasi dan rendahnya motivasi, YO-MAP lahir sebagai jawaban. Kami hadir sebagai wadah untuk mengenali minat bakat, mengatasi keraguan dan merancang strategi matang pasca-lulus sekolah. Mulai langkah hebatmu hari ini bersama fitur unggulan kami.
          </p>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="layanan" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B3B60]">Eksplorasi Fitur Unggulan</h2>
            <p className="text-slate-600">
              Kami mengintegrasikan teknologi terkini untuk memberikan panduan karir paling akurat untukmu.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 flex flex-col">
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <Image src="/images/feat-tes.png" alt="Tes Minat & Bakat" fill className="object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-slate-900 mb-2">Tes Minat & Bakat</h3>
                <p className="text-sm text-slate-500 mb-6 flex-1">
                  Kenali potensi dirimu lebih dalam melalui tes psikologi yang akurat dan komprehensif.
                </p>
                <Link href="/auth/register">
                  <Button variant="ghost" className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-sm">
                    Mulai Tes Sekarang &rarr;
                  </Button>
                </Link>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 flex flex-col">
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <Image src="/images/feat-jurusan.png" alt="Rekomendasi Jurusan" fill className="object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-slate-900 mb-2">Rekomendasi Jurusan</h3>
                <p className="text-sm text-slate-500 mb-6 flex-1">
                  Dapatkan pilihan jurusan kuliah terbaik yang sesuai dengan minat, bakat, dan cita-citamu.
                </p>
                <Link href="/auth/register">
                  <Button variant="ghost" className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-sm">
                    Lihat Rekomendasi <Navigation size={14} className="ml-2 inline-block" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 flex flex-col">
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <Image src="/images/feat-kerja.png" alt="Prospek Kerja" fill className="object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-slate-900 mb-2">Prospek Kerja</h3>
                <p className="text-sm text-slate-500 mb-6 flex-1">
                  Eksplorasi peluang karir masa depan dan gaji rata-rata untuk setiap jurusan pilihanmu.
                </p>
                <Link href="/auth/register">
                  <Button variant="ghost" className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-sm">
                    Eksplorasi Karir <Briefcase size={14} className="ml-2 inline-block" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 flex flex-col">
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <Image src="/images/feat-game.png" alt="Kompas Masa Depan" fill className="object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-slate-900 mb-2">Kompas Masa Depan</h3>
                <p className="text-sm text-slate-500 mb-6 flex-1">
                  Belajar eksplorasi karir dengan cara yang seru dan menyenangkan melalui Career Adventure.
                </p>
                <Link href="/auth/register">
                  <Button variant="ghost" className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-sm">
                    Mainkan Sekarang <Gamepad2 size={14} className="ml-2 inline-block" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#1b507e] to-[#0B3B60] rounded-3xl p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Siap Merancang Masa Depanmu?</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Gabung dengan ribuan siswa lainnya yang telah menemukan jalan mereka bersama YO-MAP. Mulai perjalananmu hari ini secara gratis.
            </p>
            <div className="pt-4">
              <Link href="/auth/register">
                <Button className="bg-white !text-[#0B3B60] hover:bg-slate-50 font-bold text-lg px-10 py-6 rounded-full shadow-xl">
                  Daftar Gratis Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="kontak" className="bg-[#061c31] text-slate-400 py-16 border-t border-blue-900/50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="text-2xl font-black text-white tracking-tight">YO-MAP</div>
            <p className="text-sm leading-relaxed text-slate-500">
              Solusi navigasi karir cerdas untuk generasi masa depan Indonesia. Membantu setiap individu menemukan jalannya.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              <div className="w-8 h-8 rounded-full border border-slate-500 bg-transparent flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-colors cursor-pointer">
                <Share2 size={16} />
              </div>
              <div className="w-8 h-8 rounded-full border border-slate-500 bg-transparent flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-colors cursor-pointer">
                <Mail size={16} />
              </div>
              <div className="w-8 h-8 rounded-full border border-slate-500 bg-transparent flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-colors cursor-pointer">
                <Globe size={16} />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Bantuan</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Pusat Bantuan</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Kontak Kami</Link></li>

            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row items-center justify-between">
          <p>&copy; 2026 YO-MAP. Hak Cipta Dilindungi.</p>
          <p className="mt-2 md:mt-0">Temukan karir impianmu bersama kami.</p>
        </div>
      </footer>
    </div>
  )
}
