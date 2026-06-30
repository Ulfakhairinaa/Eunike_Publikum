'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, RotateCcw } from 'lucide-react'

type Scenario = {
  id: number
  question: string
  options: { label: string; trait: string }[]
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    question: 'Di hari Sabtu, kamu lebih memilih menghabiskan waktu dengan...',
    options: [
      { label: '🔧 Memperbaiki sepeda atau elektronik rusak di rumah', trait: 'R' },
      { label: '📚 Membaca buku ilmu pengetahuan atau memecahkan teka-teki', trait: 'I' },
      { label: '🎨 Menggambar, melukis, atau belajar alat musik baru', trait: 'A' },
      { label: '👥 Hang out dan ngobrol seru bareng teman-teman', trait: 'S' },
    ]
  },
  {
    id: 2,
    question: 'Kamu diberi proyek bebas di sekolah. Kamu pasti memilih tema...',
    options: [
      { label: '🤖 Membuat robot atau alat otomatis sederhana', trait: 'R' },
      { label: '🔬 Meneliti dampak polusi pada makhluk hidup', trait: 'I' },
      { label: '🎬 Membuat film pendek atau karya seni kreatif', trait: 'A' },
      { label: '🌍 Kampanye sosial untuk isu lingkungan atau kesehatan', trait: 'S' },
    ]
  },
  {
    id: 3,
    question: 'Kalau kamu jadi pemimpin di OSIS, program unggulanmu adalah...',
    options: [
      { label: '⚙️ Workshop teknik / elektronik untuk siswa', trait: 'R' },
      { label: '🧪 Olimpiade sains dan cerdas cermat', trait: 'I' },
      { label: '🎭 Festival seni, budaya, dan kreativitas', trait: 'A' },
      { label: '🤝 Bakti sosial dan program mentoring adik kelas', trait: 'S' },
    ]
  },
  {
    id: 4,
    question: 'Kamu mendapat hadiah Rp1 juta. Kamu akan...',
    options: [
      { label: '🛠️ Beli peralatan untuk hobi teknik / kerajinan', trait: 'R' },
      { label: '💻 Ikut kursus online coding, sains, atau matematika', trait: 'I' },
      { label: '🖌️ Beli alat melukis, kamera, atau perlengkapan musik', trait: 'A' },
      { label: '🍽️ Traktir teman-teman makan atau support teman yang butuh bantuan', trait: 'S' },
    ]
  },
  {
    id: 5,
    question: 'Di masa depan, kamu bermimpi bekerja sebagai...',
    options: [
      { label: '👷 Insinyur atau teknisi di lapangan', trait: 'R' },
      { label: '🔭 Ilmuwan, peneliti, atau dokter spesialis', trait: 'I' },
      { label: '🎨 Desainer, penulis, atau musisi profesional', trait: 'A' },
      { label: '🏫 Guru, konselor, atau pekerja sosial', trait: 'S' },
    ]
  },
]

const TRAIT_MAJORS: Record<string, { label: string; majors: string[] }> = {
  R: {
    label: 'Realistic (Teknis & Praktikal)',
    majors: ['Teknik Mesin', 'Teknik Elektro', 'Teknik Sipil', 'Teknik Informatika', 'Arsitektur']
  },
  I: {
    label: 'Investigative (Ilmiah & Analitis)',
    majors: ['Kedokteran', 'Matematika', 'Fisika', 'Ilmu Komputer', 'Biologi / Bioteknologi']
  },
  A: {
    label: 'Artistic (Kreatif & Ekspresif)',
    majors: ['Desain Komunikasi Visual (DKV)', 'Seni Rupa', 'Pendidikan Musik', 'Sastra', 'Film & Televisi']
  },
  S: {
    label: 'Social (Sosial & Peduli)',
    majors: ['Pendidikan', 'Psikologi', 'Ilmu Komunikasi', 'Kesehatan Masyarakat', 'Pekerjaan Sosial']
  },
}

export default function SimulasiJurusanPage() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({ R: 0, I: 0, A: 0, S: 0 })
  const [finished, setFinished] = useState(false)

  const handleAnswer = (trait: string) => {
    const newScores = { ...scores, [trait]: (scores[trait] || 0) + 1 }
    setScores(newScores)

    if (currentIdx + 1 >= SCENARIOS.length) {
      setFinished(true)
    } else {
      setCurrentIdx(currentIdx + 1)
    }
  }

  const handleReset = () => {
    setCurrentIdx(0)
    setScores({ R: 0, I: 0, A: 0, S: 0 })
    setFinished(false)
  }

  const sortedTraits = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const topTrait = sortedTraits[0][0]
  const progress = Math.round(((currentIdx) / SCENARIOS.length) * 100)

  if (finished) {
    const result = TRAIT_MAJORS[topTrait]
    return (
      <div className="p-8 space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Simulasi Jurusan</h1>
          <p className="text-slate-500 mt-1">Berdasarkan jawabanmu, berikut rekomendasi simulasimu!</p>
        </div>

        <div className="bg-primary/10 rounded-2xl p-6 text-center border border-primary/20">
          <CheckCircle2 size={40} className="text-primary mx-auto mb-3" />
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Karakter Dominan</p>
          <p className="text-2xl font-black text-primary">{result?.label}</p>
        </div>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="border-b py-4">
            <CardTitle className="text-base">🎓 Jurusan yang Cocok Untukmu</CardTitle>
          </CardHeader>
          <CardContent className="pt-5 space-y-2">
            {result?.majors.map((major, idx) => (
              <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg border ${idx === 0 ? 'border-primary/30 bg-primary/5' : 'border-slate-100 bg-slate-50'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {idx + 1}
                </span>
                <span className="text-sm font-medium text-slate-700">{major}</span>
                {idx === 0 && <span className="ml-auto text-xs text-primary font-bold">Terbaik ✨</span>}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          {sortedTraits.map(([trait, score]) => (
            <div key={trait} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 text-sm">
              <span className="font-medium text-slate-600">{trait} — {TRAIT_MAJORS[trait]?.label.split('(')[0].trim()}</span>
              <span className="font-bold text-primary">{score}/{SCENARIOS.length}</span>
            </div>
          ))}
        </div>

        <Button onClick={handleReset} variant="outline" className="flex items-center gap-2">
          <RotateCcw size={16} />
          Ulangi Simulasi
        </Button>
      </div>
    )
  }

  const scenario = SCENARIOS[currentIdx]

  return (
    <div className="p-8 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Simulasi Jurusan</h1>
        <p className="text-slate-500 mt-1">Jawab 5 skenario singkat ini untuk melihat jurusan yang paling cocok denganmu.</p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Skenario {currentIdx + 1} dari {SCENARIOS.length}</span>
          <span className="text-primary font-semibold">{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div className="bg-primary rounded-full h-2 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="border-b py-5">
          <CardTitle className="text-lg text-slate-800">{scenario.question}</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          {scenario.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option.trait)}
              className="w-full text-left p-4 rounded-xl border border-slate-200 bg-white hover:border-primary hover:bg-primary/5 hover:shadow-sm transition-all text-sm font-medium text-slate-700 active:scale-[0.98]"
            >
              {option.label}
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
