import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  BookOpen,
  Eye,
  Check,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { quizQuestions } from '../../data/quizData';
import DeviceScene from '../models/DeviceScene';
import { soundManager } from '../../utils/audio';

export default function QuizView() {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [matchingSelections, setMatchingSelections] = useState({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [historyAnswers, setHistoryAnswers] = useState([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Initialize and shuffle questions on mount
  useEffect(() => {
    restartQuiz();
  }, []);

  const restartQuiz = () => {
    soundManager.playClick();
    // Pick 15 randomized questions from the bank of 20
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 15);
    setShuffledQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setMatchingSelections({});
    setIsAnswerSubmitted(false);
    setUserScore(0);
    setHistoryAnswers([]);
    setIsQuizCompleted(false);
  };

  const currentQ = shuffledQuestions[currentIndex];

  // Handle single choice selection
  const handleSelectOption = (idx) => {
    if (isAnswerSubmitted) return;
    soundManager.playClick();
    setSelectedAnswer(idx);
  };

  // Handle matching pair selection
  const handleMatchingSelect = (item, match) => {
    if (isAnswerSubmitted) return;
    soundManager.playClick();
    setMatchingSelections((prev) => ({
      ...prev,
      [item]: match
    }));
  };

  // Submit answer for immediate evaluation
  const handleSubmitAnswer = () => {
    if (isAnswerSubmitted) return;

    let isCorrect = false;

    if (currentQ.type === 'matching') {
      const allSelected = currentQ.pairs.every((p) => matchingSelections[p.item] !== undefined && matchingSelections[p.item] !== "");
      if (!allSelected) {
        alert("Silakan hubungkan semua pasangan perangkat terlebih dahulu!");
        return;
      }
      isCorrect = currentQ.pairs.every((p) => matchingSelections[p.item] === p.match);
    } else {
      if (selectedAnswer === null) {
        alert("Pilih salah satu jawaban terlebih dahulu!");
        return;
      }
      isCorrect = selectedAnswer === currentQ.correctAnswer;
    }

    setIsAnswerSubmitted(true);

    if (isCorrect) {
      soundManager.playCorrect();
      setUserScore((prev) => prev + 1);
    } else {
      soundManager.playWrong();
    }

    setHistoryAnswers((prev) => [
      ...prev,
      {
        question: currentQ,
        userSelection: currentQ.type === 'matching' ? matchingSelections : selectedAnswer,
        isCorrect
      }
    ]);
  };

  // Move to next question or show final score
  const handleNextQuestion = () => {
    soundManager.playClick();
    if (currentIndex + 1 < shuffledQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setMatchingSelections({});
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      const finalScore = Math.round((userScore / shuffledQuestions.length) * 100);
      
      if (finalScore >= 70) {
        try {
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    }
  };

  if (shuffledQuestions.length === 0) {
    return <div className="p-8 text-center text-slate-300 font-bold">Memuat soal kuis...</div>;
  }

  // --- SCOREBOARD RESULT VIEW ---
  if (isQuizCompleted) {
    const finalScore = Math.round((userScore / shuffledQuestions.length) * 100);
    let gradeTitle = "Ahli Jaringan Komputer (Master)";
    let gradeBadge = "bg-emerald-950 text-emerald-200 border-2 border-emerald-400 shadow-md";
    let gradeDesc = "Luar biasa! Pemahamanmu mengenai perangkat keras jaringan dan protokol dasar sangat mendalam dan siap diaplikasikan pada proyek PPLG.";

    if (finalScore < 60) {
      gradeTitle = "Perlu Pengayaan Materi";
      gradeBadge = "bg-amber-950 text-amber-200 border-2 border-amber-400 shadow-md";
      gradeDesc = "Jangan patah semangat! Pelajari kembali materi jelajah 3D dan coba simulasi kabel untuk memperkuat pemahaman.";
    } else if (finalScore < 80) {
      gradeTitle = "Teknisi Jaringan Terampil";
      gradeBadge = "bg-cyan-950 text-cyan-200 border-2 border-cyan-400 shadow-md";
      gradeDesc = "Bagus! Kamu sudah memahami fungsi dasar perangkat, OSI layer, dan alur transmisi data dengan baik.";
    }

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="cyber-card rounded-3xl p-8 sm:p-12 text-center space-y-6 border-2 border-cyan-400/40 shadow-2xl">
          <div className="w-18 h-18 rounded-2xl bg-gradient-to-tr from-cyan-400 via-sky-400 to-blue-500 mx-auto flex items-center justify-center text-slate-950 shadow-2xl shadow-cyan-400/40 border-2 border-white">
            <Award className="w-9 h-9 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Hasil Evaluasi Kuis Jaringan
            </h2>
            <p className="text-sm text-slate-200 font-medium">
              Evaluasi Pemahaman Materi Jaringan Komputer Dasar Siswa SMK PPLG
            </p>
          </div>

          {/* Big Score Box */}
          <div className="inline-block p-7 rounded-3xl bg-[#0f1b36] border-2 border-cyan-400 shadow-2xl">
            <div className="text-5xl sm:text-6xl font-black text-cyan-300 font-mono drop-shadow">
              {finalScore}<span className="text-2xl text-slate-400 font-normal">/100</span>
            </div>
            <div className="text-xs font-bold text-slate-200 mt-2 bg-[#17274a] px-3 py-1 rounded-full border border-slate-600">
              Benar {userScore} dari {shuffledQuestions.length} Soal
            </div>
          </div>

          {/* Predikat */}
          <div className="max-w-md mx-auto space-y-2.5">
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${gradeBadge}`}>
              {gradeTitle}
            </span>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
              {gradeDesc}
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={restartQuiz}
              className="px-7 py-3.5 rounded-xl font-extrabold text-xs bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:shadow-xl hover:shadow-cyan-400/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer border border-white/60 shadow-lg"
            >
              <RotateCcw className="w-4 h-4 stroke-[2.5]" />
              <span>Ulangi Kuis (Acak Soal Baru)</span>
            </button>
          </div>
        </div>

        {/* Detailed Question Review & Discussion */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" /> Pembahasan Lengkap Jawaban Kuis
          </h3>

          <div className="space-y-3">
            {historyAnswers.map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border-2 text-xs leading-relaxed space-y-2.5 shadow-lg ${
                  item.isCorrect
                    ? 'bg-[#0e2c20] border-emerald-400'
                    : 'bg-[#361313] border-red-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-white text-sm">Soal #{idx + 1}</span>
                  <span className={`px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider border ${
                    item.isCorrect ? 'bg-emerald-950 text-emerald-200 border-emerald-300' : 'bg-red-950 text-red-200 border-red-300'
                  }`}>
                    {item.isCorrect ? "BENAR" : "SALAH"}
                  </span>
                </div>
                <p className="text-white font-bold text-sm leading-relaxed">{item.question.question}</p>
                <div className="p-3.5 rounded-xl bg-[#0e172a] border border-slate-700 text-slate-100 text-xs space-y-1.5 shadow-inner">
                  <span className="font-extrabold text-cyan-300 block text-xs uppercase tracking-wider">Pembahasan Edukatif:</span>
                  <p className="font-medium leading-relaxed">{item.question.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- ACTIVE QUESTION VIEW ---
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Quiz Progress Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-slate-700/80">
        <div>
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-cyan-400" /> Kuis Interaktif SMK PPLG
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
            Soal {currentIndex + 1} dari {shuffledQuestions.length}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-200">Skor Sementara:</span>
          <span className="text-sm font-black text-cyan-300 font-mono px-3 py-1 rounded-full bg-[#121e3a] border-2 border-cyan-400 shadow-sm">
            {userScore}
          </span>
        </div>
      </div>

      {/* Progress Bar with High Contrast */}
      <div className="w-full h-2.5 bg-[#121c35] rounded-full overflow-hidden border border-slate-700">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 transition-all duration-300 shadow-md shadow-cyan-400/50"
          style={{ width: `${((currentIndex + 1) / shuffledQuestions.length) * 100}%` }}
        />
      </div>

      {/* Main Question Card with High Contrast */}
      <div className="cyber-card rounded-3xl p-6 sm:p-8 space-y-6 border-2 border-cyan-400/40 shadow-2xl">
        
        {/* Question Type Badge */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#16274a] text-cyan-200 border-2 border-cyan-400/60 shadow-sm">
            {currentQ.type === 'multiple-choice' && "Pilihan Ganda"}
            {currentQ.type === 'true-false' && "Benar atau Salah"}
            {currentQ.type === '3d-guess' && "Tebak Model 3D"}
            {currentQ.type === 'matching' && "Cocokkan Pasangan"}
          </span>
        </div>

        {/* Question Text */}
        <h3 className="text-base sm:text-lg font-black text-white leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Interactive 3D Model Display for '3d-guess' type questions */}
        {currentQ.type === '3d-guess' && (
          <div className="h-64 sm:h-72 w-full rounded-2xl overflow-hidden border-2 border-cyan-400 relative shadow-2xl">
            <div className="absolute top-3 left-3 z-10 text-[11px] font-bold bg-[#0c162e]/95 px-3 py-1.5 rounded-full text-cyan-200 border border-cyan-400/50 shadow-md">
              Putar 360° untuk Mengamati Model
            </div>
            <DeviceScene
              deviceId={currentQ.deviceId}
              autoRotate={true}
              showHotspots={false}
              enableFloat={true}
            />
          </div>
        )}

        {/* Question Options Selection with High Contrast Buttons */}
        {currentQ.type === 'matching' ? (
          // Matching Type Layout
          <div className="space-y-4 pt-2">
            <span className="text-xs font-bold text-slate-200 block">
              Pilih peran yang sesuai untuk setiap perangkat:
            </span>
            <div className="space-y-3">
              {currentQ.pairs.map((p, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-3.5 rounded-2xl bg-[#14203a] border-2 border-slate-700 shadow-md">
                  <div className="sm:col-span-4 font-black text-sm text-cyan-300">
                    {p.item}
                  </div>
                  <div className="sm:col-span-8">
                    <select
                      value={matchingSelections[p.item] || ""}
                      onChange={(e) => handleMatchingSelect(p.item, e.target.value)}
                      disabled={isAnswerSubmitted}
                      className="w-full bg-[#0a1224] border-2 border-slate-600 text-xs font-bold text-white rounded-xl p-2.5 focus:border-cyan-400 outline-none shadow-inner"
                    >
                      <option value="">-- Pilih Peran yang Tepat --</option>
                      {currentQ.pairs.map((opt, oIdx) => (
                        <option key={oIdx} value={opt.match}>{opt.match}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Multiple Choice / True-False Layout
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              let btnStyle = "bg-[#13203c] border-2 border-slate-600/90 text-slate-100 hover:border-cyan-400 hover:bg-[#1a2c52] shadow-md";

              if (isAnswerSubmitted) {
                if (idx === currentQ.correctAnswer) {
                  btnStyle = "bg-[#0d3b2a] border-2 border-emerald-400 text-emerald-100 font-black shadow-xl ring-2 ring-emerald-400";
                } else if (isSelected && idx !== currentQ.correctAnswer) {
                  btnStyle = "bg-[#3d1313] border-2 border-red-400 text-red-100 shadow-xl ring-2 ring-red-400";
                }
              } else if (isSelected) {
                btnStyle = "bg-[#142b58] border-2 border-cyan-300 text-cyan-100 shadow-xl shadow-cyan-400/30 font-black ring-4 ring-cyan-400/30";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`p-4 rounded-2xl border-2 text-left text-xs sm:text-sm transition-all duration-200 flex items-start gap-3.5 cursor-pointer ${btnStyle}`}
                >
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 shadow-sm ${
                    isSelected ? 'bg-cyan-400 text-slate-950 border-white' : 'bg-[#1b2b4e] border-slate-500 text-white'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed font-medium">{option}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Immediate Feedback Box with High Contrast */}
        {isAnswerSubmitted && (
          <div className="p-5 rounded-2xl bg-[#0c162e] border-2 border-cyan-400 space-y-2.5 animate-in fade-in duration-300 shadow-2xl">
            <div className="flex items-center gap-2">
              {currentQ.type === 'matching' ? (
                currentQ.pairs.every((p) => matchingSelections[p.item] === p.match) ? (
                  <span className="text-emerald-400 font-black text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" /> Jawabanmu Benar!
                  </span>
                ) : (
                  <span className="text-red-400 font-black text-sm flex items-center gap-2">
                    <XCircle className="w-5 h-5 stroke-[2.5]" /> Ada Pasangan yang Belum Tepat!
                  </span>
                )
              ) : selectedAnswer === currentQ.correctAnswer ? (
                <span className="text-emerald-400 font-black text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" /> Jawabanmu Benar!
                </span>
              ) : (
                <span className="text-red-400 font-black text-sm flex items-center gap-2">
                  <XCircle className="w-5 h-5 stroke-[2.5]" /> Jawaban Kurang Tepat!
                </span>
              )}
            </div>

            <div className="text-xs text-slate-100 leading-relaxed font-normal bg-[#14203a] p-3.5 rounded-xl border border-slate-700">
              <span className="font-black text-cyan-300 block mb-1 uppercase tracking-wider text-xs">Pembahasan:</span>
              {currentQ.explanation}
            </div>
          </div>
        )}

        {/* Bottom Actions with Solid Buttons */}
        <div className="pt-4 border-t-2 border-slate-700/80 flex items-center justify-between">
          <div className="text-xs font-semibold text-slate-300">
            {!isAnswerSubmitted ? "Pilih jawaban lalu tekan Periksa Jawaban" : "Klik Selanjutnya untuk melanjutkan"}
          </div>

          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              className="px-6 py-3 rounded-xl font-black text-xs bg-cyan-400 text-slate-950 hover:bg-cyan-300 hover:shadow-xl hover:shadow-cyan-400/40 transition-all cursor-pointer border border-white/60 shadow-lg"
            >
              Periksa Jawaban
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 rounded-xl font-black text-xs bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-xl shadow-cyan-400/40 border border-white/60"
            >
              <span>{currentIndex + 1 === shuffledQuestions.length ? "Lihat Skor Akhir" : "Soal Selanjutnya"}</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
