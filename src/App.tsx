import { motion } from "framer-motion";
import {
  Bot,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Clipboard,
  Home,
  MapPin,
  MessageCircle,
  PenLine,
  Send,
  UserRound,
} from "lucide-react";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Page = "home" | "courses" | "ai" | "booking" | "profile";
type CourseTone = "pen" | "brush" | "painting" | "sketch";

type Course = {
  title: string;
  tag: string;
  description: string;
  age: string;
  tone: CourseTone;
};

type BookingForm = {
  studentName: string;
  age: string;
  parentName: string;
  phone: string;
  course: string;
  time: string;
  note: string;
};

type ChatMessage = {
  role: "ai" | "user";
  content: string;
};

const WECHAT_ID = "QYSH_XXXX";

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

const navItems: Array<{ label: string; page: Page; icon: typeof Home }> = [
  { label: "首頁", page: "home", icon: Home },
  { label: "課程", page: "courses", icon: BookOpen },
  { label: "AI客服", page: "ai", icon: Bot },
  { label: "報名", page: "booking", icon: PenLine },
  { label: "我的", page: "profile", icon: UserRound },
];

const emptyBooking: BookingForm = {
  studentName: "",
  age: "",
  parentName: "",
  phone: "",
  course: "",
  time: "",
  note: "",
};

function getAiAnswer(question: string) {
  const text = question.toLowerCase();
  if (text.includes("年齡") || text.includes("幾歲") || text.includes("岁")) {
    return "青越書畫建議 6 歲以上孩子開始系統學習。若孩子更小，也可以先做一次藝術啟蒙測評，老師會看握筆、專注時長和興趣來建議。";
  }
  if (text.includes("試課") || text.includes("试听") || text.includes("體驗")) {
    return "可以預約藝術試課。請留下孩子年齡、想學方向和方便時間，老師會為您安排適合的書法、國畫或素描體驗課。";
  }
  if (text.includes("課程") || text.includes("零基礎") || text.includes("基础")) {
    return "零基礎孩子可先從硬筆書法或國畫啟蒙開始；若希望建立筆墨審美，可選毛筆書法；想提升觀察與造型能力，可以選素描基礎。";
  }
  if (text.includes("報名") || text.includes("预约") || text.includes("預約")) {
    return "您可以點擊底部「報名」，填寫學生姓名、年齡、家長手機和可上課時間。提交後請添加報名老師微信，老師會進一步確認課程。";
  }
  if (text.includes("學費") || text.includes("费用") || text.includes("費用") || text.includes("价格")) {
    return "學費會根據課程類型、班型與課時包不同而有所差異。建議先提交預約，老師會根據孩子情況給您介紹最合適的方案。";
  }
  if (text.includes("地址") || text.includes("校區") || text.includes("校区")) {
    return "校區地址目前請以報名老師確認為準。您可以先添加青越書畫報名老師微信：QYSH_XXXX。";
  }
  return "這個問題我可以先幫您記錄。若需要更準確的課程建議，請添加老師微信 QYSH_XXXX，或在「報名」頁留下信息。";
}

function copyText(text: string) {
  void navigator.clipboard?.writeText(text);
}

function Header() {
  return (
    <header className="relative z-20 flex items-center justify-between px-5 pt-5">
      <div className="flex min-w-0 items-center gap-3.5">
        <div className="grid h-[58px] w-[58px] shrink-0 place-items-center rounded-full bg-qing-ink text-[30px] font-semibold text-qing-card shadow-[0_14px_30px_rgba(53,89,68,0.28)] ring-4 ring-white/55 font-song">
          青
        </div>
        <div className="min-w-0">
          <p className="font-song text-[28px] font-bold leading-none tracking-[0.08em] text-qing-text">
            青越書畫
          </p>
          <p className="mt-2 truncate text-[12px] tracking-[0.18em] text-qing-text/78 font-song">
            讓孩子在一筆一畫中成長
          </p>
        </div>
      </div>
      <div className="grid h-[54px] w-[54px] shrink-0 place-items-center rounded-[12px] border-2 border-qing-cinnabar bg-qing-cinnabar/5 text-center text-[13px] font-bold leading-[1.05] text-qing-cinnabar shadow-seal font-song">
        <span>
          青越
          <br />
          書畫
        </span>
      </div>
    </header>
  );
}

function InkLandscape({ className }: { className?: string }) {
  return (
    <svg
      className={cn("pointer-events-none absolute text-qing-ink", className)}
      viewBox="0 0 260 210"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13 165C43 124 73 109 102 131C123 147 139 145 160 111C186 68 213 52 247 92V210H13V165Z"
        fill="url(#mountainA)"
      />
      <path
        d="M43 178C70 150 97 144 123 158C147 171 166 155 189 131C211 109 230 114 252 137"
        stroke="currentColor"
        strokeOpacity="0.16"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M169 63C178 56 188 56 198 63M204 76C211 70 219 70 227 76M142 82C150 76 158 76 166 82"
        stroke="currentColor"
        strokeOpacity="0.24"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M205 18C201 49 201 79 211 109"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M211 43C232 33 242 31 256 30M211 59C194 50 184 46 170 45M214 78C235 73 246 73 258 75M208 96C190 87 179 83 162 82"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="mountainA" x1="132" x2="132" y1="56" y2="210">
          <stop stopColor="#355944" stopOpacity="0.22" />
          <stop offset="0.66" stopColor="#355944" stopOpacity="0.08" />
          <stop offset="1" stopColor="#FFFDF8" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BambooWash({ className }: { className?: string }) {
  return (
    <svg
      className={cn("pointer-events-none absolute text-qing-ink", className)}
      viewBox="0 0 170 130"
      fill="none"
      aria-hidden="true"
    >
      <path d="M103 8C93 44 91 77 103 119" stroke="currentColor" strokeOpacity="0.11" strokeWidth="4" strokeLinecap="round" />
      <path d="M114 25C134 13 149 11 165 16M109 48C86 38 73 35 55 37M111 71C133 62 150 61 166 66M103 90C82 82 69 80 50 83" stroke="currentColor" strokeOpacity="0.1" strokeWidth="4" strokeLinecap="round" />
      <path d="M22 95C54 70 93 68 131 99" stroke="currentColor" strokeOpacity="0.08" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}

function Seal({ children, small = false }: { children: string; small?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[9px] border border-qing-cinnabar/70 bg-qing-cinnabar/8 font-semibold leading-none text-qing-cinnabar font-song",
        small ? "px-2 py-1 text-[12px]" : "px-2.5 py-1.5 text-[13px]",
      )}
    >
      {children}
    </span>
  );
}

function PrimaryButton({
  children,
  onClick,
  variant = "solid",
  className,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "solid" | "outline" | "soft";
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "inline-flex h-[58px] items-center justify-center gap-2 rounded-2xl px-4 text-[15px] font-semibold transition active:scale-[0.98] font-song",
        variant === "solid" &&
          "bg-qing-ink text-qing-card shadow-[0_14px_28px_rgba(53,89,68,0.25)]",
        variant === "outline" &&
          "border border-qing-ink bg-qing-card/75 text-qing-ink shadow-[0_12px_22px_rgba(53,89,68,0.08)]",
        variant === "soft" &&
          "bg-qing-ink/8 text-qing-ink ring-1 ring-qing-ink/10",
        className,
      )}
    >
      {children}
    </button>
  );
}

function SectionTitle({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4 px-5">
      <div className="flex items-center gap-2.5">
        <span className="h-8 w-2 rounded-full bg-[linear-gradient(180deg,#355944,#B85B46)] shadow-[0_6px_14px_rgba(53,89,68,0.24)]" />
        <h2 className="font-song text-[27px] font-bold tracking-[0.06em] text-qing-text">
          {title}
        </h2>
      </div>
      {action && (
        <button
          onClick={onAction}
          className="inline-flex shrink-0 items-center gap-1 text-[14px] text-qing-text/80 font-song"
        >
          {action}
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}

function CourseIllustration({ tone }: { tone: CourseTone }) {
  const background: Record<CourseTone, string> = {
    pen: "bg-[radial-gradient(circle_at_20%_16%,rgba(255,253,248,0.98),transparent_28%),linear-gradient(145deg,rgba(247,241,230,0.95),rgba(53,89,68,0.12))]",
    brush:
      "bg-[radial-gradient(circle_at_70%_72%,rgba(31,36,31,0.18),transparent_25%),linear-gradient(145deg,rgba(255,253,248,0.92),rgba(53,89,68,0.18))]",
    painting:
      "bg-[radial-gradient(circle_at_72%_24%,rgba(184,91,70,0.16),transparent_18%),linear-gradient(145deg,rgba(255,253,248,0.95),rgba(53,89,68,0.13))]",
    sketch:
      "bg-[radial-gradient(circle_at_30%_28%,rgba(31,36,31,0.1),transparent_24%),linear-gradient(145deg,rgba(255,253,248,0.96),rgba(102,107,99,0.12))]",
  };

  return (
    <div className={cn("relative h-[118px] overflow-hidden rounded-t-[22px]", background[tone])}>
      <div className="absolute inset-0 opacity-45 paper-texture" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 140" fill="none" aria-hidden="true">
        {tone === "pen" && (
          <>
            <path d="M0 96C51 73 112 79 220 54V140H0V96Z" fill="#355944" opacity="0.08" />
            <rect x="22" y="25" width="84" height="76" rx="8" fill="#FFFDF8" opacity="0.82" />
            <path d="M38 48H92M38 64H88M38 81H77" stroke="#B85B46" strokeOpacity="0.25" strokeWidth="2" />
            <path d="M38 37H90M38 37V92M64 37V92M90 37V92M38 55H90M38 73H90M38 92H90" stroke="#355944" strokeOpacity="0.13" />
            <path d="M112 78L158 32L181 55L134 102L111 109L112 78Z" fill="#1F241F" opacity="0.84" />
            <path d="M153 37L176 60" stroke="#D7C5A9" strokeWidth="5" strokeLinecap="round" />
          </>
        )}
        {tone === "brush" && (
          <>
            <path d="M23 92C55 72 91 73 125 91C154 107 182 96 207 78" stroke="#1F241F" strokeOpacity="0.22" strokeWidth="10" strokeLinecap="round" />
            <ellipse cx="143" cy="94" rx="40" ry="14" fill="#1F241F" opacity="0.16" />
            <ellipse cx="143" cy="92" rx="28" ry="9" stroke="#1F241F" strokeOpacity="0.45" strokeWidth="5" />
            <path d="M72 18L126 49" stroke="#7A4D2A" strokeWidth="13" strokeLinecap="round" />
            <path d="M121 47C105 56 92 68 82 86C78 94 68 99 61 94C54 89 59 78 67 72C83 59 96 49 121 47Z" fill="#355944" opacity="0.88" />
          </>
        )}
        {tone === "painting" && (
          <>
            <path d="M20 100C54 58 91 48 129 80C152 99 180 87 207 58" stroke="#355944" strokeOpacity="0.22" strokeWidth="12" strokeLinecap="round" />
            <path d="M80 110C82 74 91 43 111 17" stroke="#355944" strokeOpacity="0.62" strokeWidth="4" strokeLinecap="round" />
            <path d="M110 35C136 21 157 25 175 47C147 54 127 51 110 35Z" fill="#355944" opacity="0.35" />
            <path d="M89 68C62 53 46 58 29 78C53 87 73 82 89 68Z" fill="#355944" opacity="0.24" />
            <circle cx="169" cy="30" r="13" fill="#B85B46" opacity="0.5" />
          </>
        )}
        {tone === "sketch" && (
          <>
            <path d="M58 105L95 35L133 105H58Z" stroke="#355944" strokeOpacity="0.55" strokeWidth="4" strokeLinejoin="round" />
            <circle cx="146" cy="73" r="33" stroke="#1F241F" strokeOpacity="0.3" strokeWidth="4" />
            <rect x="35" y="81" width="56" height="35" rx="4" stroke="#B85B46" strokeOpacity="0.5" strokeWidth="3" />
            <path d="M24 122H190M48 49L177 112M177 38L68 124" stroke="#1F241F" strokeOpacity="0.13" strokeWidth="2" strokeLinecap="round" />
          </>
        )}
      </svg>
    </div>
  );
}

function HomeHero({ go }: { go: (page: Page) => void }) {
  return (
    <section className="relative mt-8 px-5 pb-2">
      <InkLandscape className="right-0 top-[-8px] h-[220px] w-[260px] opacity-95" />
      <div className="relative z-10 pt-8">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-[330px] whitespace-pre-line font-song text-[34px] font-bold leading-[1.35] tracking-[0.06em] text-qing-text"
        >
          在一筆一畫之間，
          {"\n"}讓孩子看見
          <span className="text-qing-ink">專注與審美</span>。
        </motion.h1>
        <div className="mt-4 flex w-[150px] items-center gap-3">
          <span className="h-px flex-1 bg-qing-text/22" />
          <span className="h-2 w-2 rounded-full border border-qing-cinnabar bg-qing-card" />
          <span className="h-px flex-1 bg-qing-text/22" />
        </div>
        <p className="mt-6 max-w-[315px] font-song text-[15px] leading-8 tracking-[0.08em] text-qing-text/75">
          承千年筆墨意蘊，陪孩子寫好第一筆。
          <br />
          在安靜的尺度中，開啟藝術啟蒙之窗。
        </p>
        <div className="mt-8 grid grid-cols-[1.15fr_0.9fr] gap-4">
          <PrimaryButton onClick={() => go("ai")} className="px-3 text-[14px]">
            <MessageCircle size={22} />
            立即諮詢 AI書畫顧問
          </PrimaryButton>
          <PrimaryButton onClick={() => go("booking")} variant="outline" className="px-3 text-[14px]">
            <CalendarCheck size={21} />
            預約藝術試課
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

function AiAdvisorCard({ go }: { go: (page: Page) => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.45 }}
      onClick={() => go("ai")}
      className="relative mx-5 mt-8 flex min-h-[126px] w-[calc(100%-2.5rem)] items-center gap-4 overflow-hidden rounded-[24px] border border-qing-ink/10 bg-qing-card/74 p-5 text-left shadow-[0_16px_36px_rgba(53,89,68,0.16)] backdrop-blur"
    >
      <BambooWash className="bottom-0 right-0 h-[132px] w-[175px] opacity-95" />
      <div className="relative grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full bg-white/82 shadow-[0_12px_24px_rgba(31,36,31,0.13)]">
        <div className="grid h-[50px] w-[50px] place-items-center rounded-full bg-qing-ink text-qing-card">
          <Bot size={28} />
        </div>
      </div>
      <div className="relative min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="font-song text-[24px] font-bold tracking-[0.06em] text-qing-text">
            AI 書畫顧問
          </h2>
          <Seal small>智能</Seal>
        </div>
        <p className="mt-2 font-song text-[15px] leading-6 text-qing-text/72">
          不知道孩子適合哪門課？先問問 AI，為您推薦最合適的課程。
        </p>
      </div>
      <ChevronRight className="relative shrink-0 text-qing-ink" size={26} />
    </motion.button>
  );
}

function HomeCourseCard({ course }: { course: Course }) {
  return (
    <article className="relative w-[178px] shrink-0 overflow-hidden rounded-[20px] border border-qing-ink/10 bg-qing-card shadow-[0_12px_28px_rgba(53,89,68,0.16)]">
      <div className="relative">
        <CourseIllustration tone={course.tone} />
        <div className="absolute left-3 top-3">
          <Seal small>{course.tag}</Seal>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-song text-[20px] font-bold tracking-[0.05em] text-qing-text">
          {course.title}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-[44px] font-song text-[13px] leading-[1.7] text-qing-text/70">
          {course.description.replace("，", "\n")}
        </p>
        <p className="mt-3 flex items-center gap-1 text-[13px] text-qing-ink font-song">
          <UserRound size={15} />
          {course.age}
        </p>
      </div>
    </article>
  );
}

function HomePage({ go }: { go: (page: Page) => void }) {
  return (
    <>
      <HomeHero go={go} />
      <AiAdvisorCard go={go} />
      <section className="mt-8">
        <SectionTitle title="精品課程" action="查看全部課程" onAction={() => go("courses")} />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-5 pb-4">
          {courses.slice(0, 3).map((course) => (
            <HomeCourseCard key={course.title} course={course} />
          ))}
        </div>
      </section>
    </>
  );
}

function CourseGridCard({ course, go }: { course: Course; go: (page: Page) => void }) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-qing-ink/10 bg-qing-card shadow-[0_14px_28px_rgba(53,89,68,0.13)]">
      <div className="relative">
        <CourseIllustration tone={course.tone} />
        <div className="absolute left-3 top-3">
          <Seal small>{course.tag}</Seal>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-song text-[20px] font-bold tracking-[0.05em] text-qing-text">
          {course.title}
        </h3>
        <p className="mt-2 min-h-[62px] font-song text-[13px] leading-[1.7] text-qing-text/70">
          {course.description}
        </p>
        <p className="mt-2 flex items-center gap-1 text-[13px] text-qing-ink font-song">
          <UserRound size={14} />
          {course.age}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => go("ai")}
            className="h-10 rounded-xl bg-qing-ink/8 text-[13px] font-semibold text-qing-ink font-song"
          >
            查看詳情
          </button>
          <button
            type="button"
            onClick={() => go("booking")}
            className="h-10 rounded-xl bg-qing-ink text-[13px] font-semibold text-qing-card font-song"
          >
            預約試課
          </button>
        </div>
      </div>
    </article>
  );
}

function CoursesPage({ go }: { go: (page: Page) => void }) {
  return (
    <div className="px-5 pt-8">
      <PageHeading
        title="精品課程"
        subtitle="從一筆一畫開始，為孩子建立審美與專注。"
      />
      <div className="mt-6 grid grid-cols-2 gap-4">
        {courses.map((course) => (
          <CourseGridCard key={course.title} course={course} go={go} />
        ))}
      </div>
      <div className="relative mt-7 overflow-hidden rounded-[26px] border border-qing-ink/10 bg-qing-card/76 p-5 shadow-soft-ink">
        <BambooWash className="-right-6 bottom-0 h-[120px] w-[160px]" />
        <h3 className="relative font-song text-[22px] font-bold tracking-[0.05em] text-qing-text">
          不知道孩子適合哪一門？
        </h3>
        <p className="relative mt-2 font-song text-[15px] leading-7 text-qing-text/70">
          問問 AI 書畫顧問，先了解孩子的年齡、基礎與興趣方向。
        </p>
        <PrimaryButton onClick={() => go("ai")} className="relative mt-4 w-full">
          諮詢 AI 書畫顧問
          <ChevronRight size={18} />
        </PrimaryButton>
      </div>
    </div>
  );
}

function PageHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/65 bg-qing-card/58 px-5 py-6 shadow-[0_14px_32px_rgba(53,89,68,0.12)]">
      <InkLandscape className="-right-8 -top-10 h-[180px] w-[230px] opacity-50" />
      <div className="relative">
        <h1 className="font-song text-[31px] font-bold tracking-[0.08em] text-qing-text">
          {title}
        </h1>
        <div className="mt-3 flex w-[120px] items-center gap-3">
          <span className="h-px flex-1 bg-qing-text/20" />
          <span className="h-2 w-2 rounded-full border border-qing-cinnabar bg-qing-card" />
          <span className="h-px flex-1 bg-qing-text/20" />
        </div>
        <p className="mt-4 max-w-[270px] font-song text-[15px] leading-7 text-qing-text/72">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function AiPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      content:
        "您好，我是青越書畫 AI 顧問。可以為您解答課程、試課、報名與孩子適合方向。",
    },
  ]);
  const [input, setInput] = useState("");
  const questions = ["孩子幾歲可以學？", "有沒有試課？", "哪門課適合零基礎？", "如何報名？", "學費怎麼了解？"];

  function sendMessage(text: string) {
    const question = text.trim();
    if (!question) return;
    setMessages((current) => [
      ...current,
      { role: "user", content: question },
      { role: "ai", content: getAiAnswer(question) },
    ]);
    setInput("");
  }

  return (
    <div className="px-5 pt-8">
      <PageHeading
        title="AI 書畫顧問"
        subtitle="24小時解答課程、試課與報名疑問。"
      />
      <div className="mt-6 space-y-4 pb-[104px]">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[82%] rounded-[22px] px-4 py-3 font-song text-[15px] leading-7 shadow-[0_10px_24px_rgba(53,89,68,0.1)]",
                message.role === "user"
                  ? "rounded-br-md bg-qing-ink text-qing-card"
                  : "rounded-bl-md border border-qing-ink/10 bg-qing-card text-qing-text/78",
              )}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {questions.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => sendMessage(question)}
              className="rounded-2xl border border-qing-ink/10 bg-qing-card/75 px-3 py-3 text-left font-song text-[14px] leading-5 text-qing-text/80 shadow-[0_8px_18px_rgba(53,89,68,0.08)]"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
      <div className="fixed bottom-[76px] left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 bg-gradient-to-t from-qing-paper via-qing-paper to-qing-paper/0 px-5 pb-3 pt-8">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage(input);
          }}
          className="flex gap-2 rounded-[22px] border border-qing-ink/10 bg-qing-card/92 p-2 shadow-[0_12px_28px_rgba(53,89,68,0.14)] backdrop-blur"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="請輸入想了解的問題"
            className="min-w-0 flex-1 bg-transparent px-3 font-song text-[15px] text-qing-text outline-none placeholder:text-qing-muted/75"
          />
          <button
            type="submit"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-qing-ink text-qing-card"
            aria-label="發送"
          >
            <Send size={19} />
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="font-song text-[14px] font-semibold tracking-[0.06em] text-qing-text">
        {label}
        {required && <span className="text-qing-cinnabar"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-2xl border border-qing-ink/10 bg-qing-card/82 px-4 font-song text-[15px] text-qing-text outline-none transition placeholder:text-qing-muted/62 focus:border-qing-ink/40 focus:ring-4 focus:ring-qing-ink/8"
      />
    </label>
  );
}

function BookingPage({
  go,
  onBookingSaved,
}: {
  go: (page: Page) => void;
  onBookingSaved: (booking: BookingForm) => void;
}) {
  const [form, setForm] = useState<BookingForm>(emptyBooking);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof BookingForm>(key: K, value: BookingForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const requiredFields: Array<keyof BookingForm> = [
      "studentName",
      "age",
      "parentName",
      "phone",
      "course",
      "time",
    ];
    if (requiredFields.some((field) => !form[field].trim())) {
      setError("請完整填寫必填信息。");
      return;
    }
    if (!/^1[3-9]\d{9}$|^[0-9+\-\s]{8,}$/.test(form.phone.trim())) {
      setError("請填寫正確的手機號。");
      return;
    }
    localStorage.setItem("qingyue-booking", JSON.stringify(form));
    onBookingSaved(form);
    setError("");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="px-5 pt-8">
        <div className="relative overflow-hidden rounded-[30px] border border-qing-ink/10 bg-qing-card/78 p-6 text-center shadow-soft-ink">
          <InkLandscape className="-right-10 bottom-0 h-[170px] w-[230px] opacity-50" />
          <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-qing-ink/10 text-qing-ink">
            <CheckCircle2 size={36} />
          </div>
          <h1 className="relative mt-5 font-song text-[30px] font-bold tracking-[0.08em] text-qing-text">
            報名成功
          </h1>
          <p className="relative mt-3 font-song text-[16px] leading-8 text-qing-text/72">
            請添加青越書畫報名老師微信
          </p>
          <div className="relative mt-5 rounded-2xl border border-qing-cinnabar/20 bg-qing-cinnabar/7 px-4 py-3 font-song text-[20px] font-bold tracking-[0.08em] text-qing-cinnabar">
            微信號：{WECHAT_ID}
          </div>
          <div className="relative mt-5 grid grid-cols-2 gap-3">
            <PrimaryButton onClick={() => copyText(WECHAT_ID)}>
              <Clipboard size={18} />
              複製微信號
            </PrimaryButton>
            <PrimaryButton onClick={() => go("profile")} variant="outline">
              查看我的
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-8">
      <PageHeading
        title="預約藝術試課"
        subtitle="留下信息，老師會為您安排適合孩子的課程。"
      />
      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 rounded-[28px] border border-qing-ink/10 bg-qing-card/75 p-5 shadow-soft-ink"
      >
        <Field label="學生姓名" value={form.studentName} onChange={(value) => update("studentName", value)} placeholder="請填寫學生姓名" required />
        <Field label="年齡" value={form.age} onChange={(value) => update("age", value)} placeholder="例如：7歲" required />
        <Field label="家長姓名" value={form.parentName} onChange={(value) => update("parentName", value)} placeholder="請填寫家長姓名" required />
        <Field label="手機號" value={form.phone} onChange={(value) => update("phone", value)} placeholder="請填寫聯繫手機" required />
        <label className="block">
          <span className="font-song text-[14px] font-semibold tracking-[0.06em] text-qing-text">
            想學課程 <span className="text-qing-cinnabar">*</span>
          </span>
          <select
            value={form.course}
            onChange={(event) => update("course", event.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-qing-ink/10 bg-qing-card/82 px-4 font-song text-[15px] text-qing-text outline-none focus:border-qing-ink/40 focus:ring-4 focus:ring-qing-ink/8"
          >
            <option value="">請選擇課程</option>
            {courses.map((course) => (
              <option key={course.title} value={course.title}>
                {course.title}
              </option>
            ))}
          </select>
        </label>
        <Field label="可上課時間" value={form.time} onChange={(value) => update("time", value)} placeholder="例如：週六下午" required />
        <label className="block">
          <span className="font-song text-[14px] font-semibold tracking-[0.06em] text-qing-text">
            備註
          </span>
          <textarea
            value={form.note}
            onChange={(event) => update("note", event.target.value)}
            placeholder="可補充孩子基礎、學習目標等"
            className="mt-2 min-h-24 w-full resize-none rounded-2xl border border-qing-ink/10 bg-qing-card/82 px-4 py-3 font-song text-[15px] leading-6 text-qing-text outline-none placeholder:text-qing-muted/62 focus:border-qing-ink/40 focus:ring-4 focus:ring-qing-ink/8"
          />
        </label>
        {error && (
          <p className="rounded-2xl bg-qing-cinnabar/9 px-4 py-3 font-song text-[14px] text-qing-cinnabar">
            {error}
          </p>
        )}
        <PrimaryButton type="submit" className="w-full">
          提交預約
          <ChevronRight size={18} />
        </PrimaryButton>
      </form>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-qing-ink/8 py-3 last:border-b-0">
      <span className="shrink-0 font-song text-[14px] text-qing-muted">{label}</span>
      <span className="text-right font-song text-[15px] font-semibold text-qing-text/82">
        {value}
      </span>
    </div>
  );
}

function ProfilePage({ booking, go }: { booking: BookingForm | null; go: (page: Page) => void }) {
  return (
    <div className="px-5 pt-8">
      <PageHeading title="我的預約" subtitle="查看最近一次報名信息與老師聯繫方式。" />
      <section className="mt-6 rounded-[28px] border border-qing-ink/10 bg-qing-card/75 p-5 shadow-soft-ink">
        <h2 className="font-song text-[23px] font-bold tracking-[0.06em] text-qing-text">
          最近報名信息
        </h2>
        {booking ? (
          <div className="mt-3">
            <InfoRow label="學生" value={booking.studentName} />
            <InfoRow label="年齡" value={booking.age} />
            <InfoRow label="家長" value={booking.parentName} />
            <InfoRow label="手機" value={booking.phone} />
            <InfoRow label="課程" value={booking.course} />
            <InfoRow label="時間" value={booking.time} />
            {booking.note && <InfoRow label="備註" value={booking.note} />}
          </div>
        ) : (
          <div className="mt-4 rounded-[22px] bg-qing-ink/7 px-4 py-5 text-center font-song text-[15px] text-qing-muted">
            暫未提交報名信息
            <PrimaryButton onClick={() => go("booking")} className="mt-4 w-full">
              去預約試課
            </PrimaryButton>
          </div>
        )}
      </section>

      <section className="relative mt-5 overflow-hidden rounded-[28px] border border-qing-cinnabar/15 bg-qing-card/75 p-5 shadow-soft-ink">
        <BambooWash className="-right-7 bottom-0 h-[120px] w-[160px]" />
        <h2 className="relative font-song text-[23px] font-bold tracking-[0.06em] text-qing-text">
          老師微信卡片
        </h2>
        <div className="relative mt-3 space-y-2 font-song text-[15px] text-qing-text/78">
          <p>老師：青越書畫報名老師</p>
          <p className="text-[19px] font-bold tracking-[0.08em] text-qing-cinnabar">
            微信號：{WECHAT_ID}
          </p>
        </div>
        <PrimaryButton onClick={() => copyText(WECHAT_ID)} className="relative mt-4 w-full">
          <Clipboard size={18} />
          複製微信號
        </PrimaryButton>
      </section>

      <section className="mt-5 rounded-[28px] border border-qing-ink/10 bg-qing-card/75 p-5 shadow-soft-ink">
        <h2 className="font-song text-[23px] font-bold tracking-[0.06em] text-qing-text">
          機構信息
        </h2>
        <div className="mt-3">
          <InfoRow label="機構" value="青越書畫" />
          <InfoRow label="地址" value="請填寫校區地址" />
          <InfoRow label="上課時間" value="請添加正式時間" />
          <InfoRow label="聯繫方式" value="請添加電話" />
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-qing-ink/7 px-4 py-3 font-song text-[14px] text-qing-text/72">
          <MapPin size={18} className="text-qing-ink" />
          校區信息將由老師確認後同步。
        </div>
      </section>
    </div>
  );
}

function BottomNav({ page, go }: { page: Page; go: (page: Page) => void }) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-50 h-[76px] w-full max-w-[430px] -translate-x-1/2 border-t border-qing-ink/10 bg-qing-card/86 px-3 pb-[env(safe-area-inset-bottom)] pt-2 shadow-[0_-12px_32px_rgba(53,89,68,0.15)] backdrop-blur-xl">
      <div className="grid h-full grid-cols-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.page === page;
          return (
            <button
              type="button"
              key={item.label}
              onClick={() => go(item.page)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-2xl text-[12px] transition font-song",
                active ? "font-bold text-qing-ink" : "text-qing-muted",
              )}
            >
              <span
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full transition",
                  active && "bg-qing-ink/12 shadow-[0_6px_14px_rgba(53,89,68,0.12)]",
                )}
              >
                <Icon size={20} strokeWidth={active ? 2.6 : 1.8} />
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
  const [page, setPage] = useState<Page>("home");
  const [booking, setBooking] = useState<BookingForm | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("qingyue-booking");
    if (stored) {
      try {
        setBooking(JSON.parse(stored) as BookingForm);
      } catch {
        localStorage.removeItem("qingyue-booking");
      }
    }
  }, []);

  const content = useMemo(() => {
    if (page === "home") return <HomePage go={setPage} />;
    if (page === "courses") return <CoursesPage go={setPage} />;
    if (page === "ai") return <AiPage />;
    if (page === "booking") {
      return <BookingPage go={setPage} onBookingSaved={setBooking} />;
    }
    return <ProfilePage booking={booking} go={setPage} />;
  }, [booking, page]);

  return (
    <main className="min-h-screen bg-qing-paper text-qing-text font-song">
      <div className="bottom-safe paper-texture relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-qing-paper">
        <div className="pointer-events-none absolute -left-24 top-32 h-56 w-56 rounded-full bg-qing-ink/8 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-[420px] h-56 w-56 rounded-full bg-qing-cinnabar/7 blur-3xl" />
        <Header />
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
        >
          {content}
        </motion.div>
      </div>
      <BottomNav page={page} go={setPage} />
    </main>
  );
}
