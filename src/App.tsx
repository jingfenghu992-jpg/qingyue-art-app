import { motion } from "framer-motion";
import {
  Bot,
  BookOpen,
  CalendarCheck,
  ChevronRight,
  Home,
  MessageCircle,
  PenLine,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Course = {
  title: string;
  tag: string;
  description: string;
  age: string;
  tone: "pen" | "brush" | "painting" | "sketch";
};

const courses: Course[] = [
  {
    title: "硬筆書法",
    tag: "入門",
    description: "從坐姿與筆畫開始，建立專注與書寫習慣。",
    age: "適合 6歲+",
    tone: "pen",
  },
  {
    title: "毛筆書法",
    tag: "考級",
    description: "在提按轉折之間，感受東方筆墨的節奏。",
    age: "適合 6歲+",
    tone: "brush",
  },
  {
    title: "國畫啟蒙",
    tag: "審美",
    description: "花鳥山水之美，培養審美與觀察。",
    age: "適合 6歲+",
    tone: "painting",
  },
  {
    title: "素描基礎",
    tag: "基礎",
    description: "從線條與結構開始，培養觀察與造型能力。",
    age: "適合 6歲+",
    tone: "sketch",
  },
];

const navItems = [
  { label: "首頁", icon: Home, active: true },
  { label: "課程", icon: BookOpen },
  { label: "AI客服", icon: Bot },
  { label: "報名", icon: PenLine },
  { label: "我的", icon: UserRound },
];

function InkLandscape() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[180px] w-full opacity-90"
      viewBox="0 0 390 180"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 124C36 82 72 67 106 94C130 113 153 113 181 83C218 44 259 41 296 75C326 102 350 101 390 80V180H0V124Z"
        fill="url(#mountain)"
      />
      <path
        d="M12 137C56 111 84 108 122 126C161 145 196 119 226 101C260 80 308 91 376 124"
        stroke="#355944"
        strokeOpacity="0.18"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M291 37C302 28 314 27 327 36"
        stroke="#355944"
        strokeOpacity="0.28"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M318 49C327 42 337 42 347 49"
        stroke="#355944"
        strokeOpacity="0.22"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M52 38C58 54 61 76 58 101"
        stroke="#355944"
        strokeOpacity="0.22"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M61 58C74 50 82 47 93 45M59 73C45 66 36 62 25 61M60 86C75 82 88 80 101 80"
        stroke="#355944"
        strokeOpacity="0.18"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="mountain" x1="195" x2="195" y1="48" y2="180">
          <stop stopColor="#355944" stopOpacity="0.18" />
          <stop offset="0.7" stopColor="#355944" stopOpacity="0.05" />
          <stop offset="1" stopColor="#FFFDF8" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Header() {
  return (
    <header className="relative flex items-center justify-between px-5 pt-6">
      <div className="flex items-center gap-3.5">
        <div className="grid h-[58px] w-[58px] place-items-center rounded-full bg-qing-ink text-[28px] font-semibold text-qing-card shadow-soft-ink ring-4 ring-white/45 font-song">
          青
        </div>
        <div>
          <p className="font-song text-[24px] font-semibold leading-tight tracking-[0.08em] text-qing-text">
            青越書畫
          </p>
          <p className="mt-1 text-[12px] tracking-[0.16em] text-qing-muted">
            讓孩子在一筆一畫中成長
          </p>
        </div>
      </div>

      <div className="seal-text flex h-[58px] w-[44px] items-center justify-center rounded-[12px] border-2 border-qing-cinnabar/80 bg-qing-cinnabar/8 text-[12px] font-semibold leading-none text-qing-cinnabar shadow-seal font-song">
        青越書畫
      </div>
    </header>
  );
}

function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="hero-wash paper-texture relative mx-4 mt-5 overflow-hidden rounded-[34px] border border-white/70 px-5 pb-6 pt-7 shadow-soft-ink"
    >
      <InkLandscape />
      <div className="relative z-10">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-qing-ink/12 bg-white/48 px-3 py-1.5 text-[12px] font-medium tracking-[0.12em] text-qing-ink">
          <Sparkles size={14} />
          AI招生系統
        </div>
        <h1 className="font-song text-[34px] font-semibold leading-[1.18] tracking-[0.02em] text-qing-text">
          在一筆一畫之間，
          <br />
          讓孩子看見
          <span className="relative inline-block text-qing-ink">
            專注與審美
            <span className="absolute bottom-0 left-0 h-2 w-full rounded-full bg-qing-ink/10" />
          </span>
          。
        </h1>
        <p className="mt-5 max-w-[305px] text-[15px] leading-7 text-qing-muted">
          承千年筆墨意蘊，陪孩子寫好第一筆。
          <br />
          在安靜的尺度中，開啟藝術啟蒙之窗。
        </p>
        <div className="mt-8 grid gap-3">
          <Button className="w-full">
            立即諮詢 AI書畫顧問
            <Send size={17} />
          </Button>
          <Button className="w-full" variant="secondary">
            預約藝術試課
            <CalendarCheck size={17} />
          </Button>
        </div>
      </div>
    </motion.section>
  );
}

function AiAdvisorCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="px-4"
    >
      <Card className="relative mt-5 overflow-hidden">
        <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-qing-ink/10 blur-2xl" />
        <div className="absolute bottom-0 right-0 h-24 w-28 rounded-tl-full bg-qing-cinnabar/8" />
        <CardHeader className="relative flex-row items-start justify-between gap-4 p-5 pb-3">
          <div>
            <p className="mb-1 text-[12px] font-medium tracking-[0.18em] text-qing-muted">
              PERSONAL ADVISOR
            </p>
            <h2 className="font-song text-[25px] font-semibold tracking-[0.04em] text-qing-text">
              AI 書畫顧問
            </h2>
          </div>
          <span className="rounded-[10px] border border-qing-cinnabar/65 px-2.5 py-1 text-[13px] font-semibold text-qing-cinnabar font-song">
            智能
          </span>
        </CardHeader>
        <CardContent className="relative p-5 pt-0">
          <div className="flex gap-4">
            <div className="grid h-[74px] w-[74px] shrink-0 place-items-center rounded-3xl bg-[radial-gradient(circle_at_35%_30%,rgba(255,253,248,0.95),rgba(53,89,68,0.13)),linear-gradient(145deg,rgba(53,89,68,0.16),rgba(184,91,70,0.08))]">
              <MessageCircle className="text-qing-ink" size={32} strokeWidth={1.7} />
            </div>
            <div className="min-w-0">
              <p className="text-[15px] leading-7 text-qing-muted">
                不知道孩子適合哪門課？
                <br />
                先問問 AI，為您推薦最合適的課程。
              </p>
              <button className="mt-3 inline-flex items-center gap-1 text-[14px] font-semibold text-qing-ink">
                開始測評
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CourseIllustration({ tone }: { tone: Course["tone"] }) {
  const base =
    "relative h-[92px] overflow-hidden rounded-[22px] border border-white/55";
  const backgrounds: Record<Course["tone"], string> = {
    pen: "bg-[radial-gradient(circle_at_22%_20%,rgba(255,253,248,0.95),transparent_28%),linear-gradient(135deg,rgba(53,89,68,0.18),rgba(247,241,230,0.8))]",
    brush:
      "bg-[radial-gradient(circle_at_74%_78%,rgba(31,36,31,0.15),transparent_26%),linear-gradient(135deg,rgba(53,89,68,0.22),rgba(255,253,248,0.78))]",
    painting:
      "bg-[radial-gradient(circle_at_74%_24%,rgba(184,91,70,0.18),transparent_20%),linear-gradient(135deg,rgba(255,253,248,0.9),rgba(53,89,68,0.14))]",
    sketch:
      "bg-[radial-gradient(circle_at_30%_32%,rgba(31,36,31,0.09),transparent_24%),linear-gradient(135deg,rgba(255,253,248,0.92),rgba(102,107,99,0.12))]",
  };

  return (
    <div className={cn(base, backgrounds[tone])}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 150 92" fill="none">
        {tone === "pen" && (
          <>
            <rect x="24" y="22" width="60" height="45" rx="6" fill="#FFFDF8" opacity="0.82" />
            <path d="M34 35H72M34 47H70M34 59H60" stroke="#355944" strokeOpacity="0.32" strokeWidth="2" strokeLinecap="round" />
            <path d="M94 20L116 42L78 80L66 84L70 72L108 34" stroke="#355944" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity="0.78" />
            <path d="M104 29L112 37" stroke="#FFFDF8" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </>
        )}
        {tone === "brush" && (
          <>
            <ellipse cx="54" cy="66" rx="30" ry="9" fill="#1F241F" opacity="0.13" />
            <path d="M84 14C86 31 84 48 77 63C73 71 65 76 58 72C51 68 55 58 61 52C73 40 78 27 84 14Z" fill="#355944" opacity="0.78" />
            <path d="M88 10L101 18L84 43L76 38L88 10Z" fill="#B85B46" opacity="0.55" />
            <rect x="29" y="57" width="46" height="18" rx="9" fill="#355944" opacity="0.18" />
            <path d="M30 31C42 26 54 27 65 33" stroke="#355944" strokeOpacity="0.26" strokeWidth="3" strokeLinecap="round" />
          </>
        )}
        {tone === "painting" && (
          <>
            <path d="M20 68C40 43 64 36 87 58C100 70 118 66 132 48" stroke="#355944" strokeOpacity="0.24" strokeWidth="7" strokeLinecap="round" />
            <path d="M56 63C57 45 62 28 72 18" stroke="#355944" strokeOpacity="0.62" strokeWidth="3" strokeLinecap="round" />
            <path d="M73 28C89 21 101 24 110 36C94 40 82 38 73 28Z" fill="#355944" opacity="0.38" />
            <path d="M62 42C47 35 39 36 30 46C43 51 54 50 62 42Z" fill="#355944" opacity="0.25" />
            <circle cx="108" cy="27" r="8" fill="#B85B46" opacity="0.45" />
            <path d="M112 20C119 14 128 14 136 20" stroke="#355944" strokeOpacity="0.24" strokeWidth="2" strokeLinecap="round" />
          </>
        )}
        {tone === "sketch" && (
          <>
            <path d="M42 65L65 26L89 65H42Z" stroke="#355944" strokeOpacity="0.52" strokeWidth="3" strokeLinejoin="round" />
            <circle cx="98" cy="50" r="21" stroke="#1F241F" strokeOpacity="0.28" strokeWidth="3" />
            <rect x="31" y="52" width="34" height="22" rx="3" stroke="#B85B46" strokeOpacity="0.48" strokeWidth="2.5" />
            <path d="M23 78H127M37 36L119 72M116 30L49 78" stroke="#1F241F" strokeOpacity="0.12" strokeWidth="1.6" strokeLinecap="round" />
          </>
        )}
      </svg>
    </div>
  );
}

function Courses() {
  return (
    <section className="mt-7 px-4">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-[12px] font-medium tracking-[0.2em] text-qing-cinnabar">
            SELECTED COURSES
          </p>
          <h2 className="mt-1 font-song text-[26px] font-semibold tracking-[0.04em] text-qing-text">
            精品課程
          </h2>
        </div>
        <button className="text-[13px] font-semibold text-qing-ink">全部</button>
      </div>
      <div className="grid grid-cols-2 gap-3.5">
        {courses.map((course, index) => (
          <motion.article
            key={course.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.05, duration: 0.45, ease: "easeOut" }}
            className="rounded-[26px] border border-qing-ink/9 bg-qing-card/88 p-3 shadow-[0_14px_32px_rgba(53,89,68,0.1)]"
          >
            <CourseIllustration tone={course.tone} />
            <div className="mt-3 flex items-center justify-between gap-2">
              <h3 className="font-song text-[18px] font-semibold tracking-[0.03em] text-qing-text">
                {course.title}
              </h3>
              <span className="shrink-0 rounded-full bg-qing-cinnabar/10 px-2 py-0.5 text-[11px] font-semibold text-qing-cinnabar">
                {course.tag}
              </span>
            </div>
            <p className="mt-2 min-h-[60px] text-[12.5px] leading-5 text-qing-muted">
              {course.description}
            </p>
            <p className="mt-2 text-[12px] font-semibold text-qing-ink">{course.age}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-50 h-[76px] w-full max-w-[430px] -translate-x-1/2 border-t border-qing-ink/10 bg-qing-card/82 px-3 pb-[env(safe-area-inset-bottom)] pt-2 shadow-[0_-12px_30px_rgba(53,89,68,0.12)] backdrop-blur-xl">
      <div className="grid h-full grid-cols-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-medium transition",
                item.active ? "text-qing-ink" : "text-qing-muted/78",
              )}
            >
              <span
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full transition",
                  item.active && "bg-qing-ink/10",
                )}
              >
                <Icon size={19} strokeWidth={item.active ? 2.4 : 1.9} />
              </span>
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-qing-paper font-sans text-qing-text">
      <div className="bottom-safe paper-texture relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-qing-paper">
        <div className="pointer-events-none absolute -left-24 top-28 h-56 w-56 rounded-full bg-qing-ink/8 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-[360px] h-56 w-56 rounded-full bg-qing-cinnabar/8 blur-3xl" />
        <Header />
        <Hero />
        <AiAdvisorCard />
        <Courses />
      </div>
      <BottomNav />
    </main>
  );
}
