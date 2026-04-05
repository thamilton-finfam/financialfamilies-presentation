"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  CheckCircle2,
  HeartHandshake,
  Home,
  LineChart,
  Map,
  PlayCircle,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import ExpenseTopicPanel from "@/Components/Presentation/ExpenseTopicPanel";
import VolatilityTopicPanel from "@/Components/Presentation/VolatilityTopicPanel";
import RebalancingTopicPanel from "@/Components/Presentation/RebalancingTopicPanel";
import StockDiversificationPanel from "@/Components/Presentation/StockDiversificationPanel";
import BondsTopicPanel from "@/Components/Presentation/BondsTopicPanel";
import BondDiversificationPanel from "@/Components/Presentation/BondDiversificationPanel";
import AssetLocationTopicPanel from "@/Components/Presentation/AssetLocationTopicPanel";
import TaxLossHarvestingPanel from "@/Components/Presentation/TaxLossHarvestingPanel";
import SpendingTopicPanel from "@/Components/Presentation/SpendingTopicPanel";
import AltruistTopicPanel from "@/Components/Presentation/AltruistTopicPanel";

type SectionKey = "home" | "about" | "fiduciary" | "process" | "choice" | "investments";

type NavCard = {
  key: Exclude<SectionKey, "home">;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  text: string;
};

type ChoiceCardProps = {
  title: string;
  subtitle: string;
  text: string;
  accent: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
};

const brand = {
  blue: "#2495D3",
  blueDeep: "#176EA8",
  blueSoft: "#EAF6FD",
  orange: "#F79436",
  orangeDeep: "#F45C29",
  orangeSoft: "#FFF3E7",
  ink: "#0E2230",
  slate: "#355062",
  cream: "#FFFDF9",
  white: "#FFFFFF",
  border: "rgba(23, 110, 168, 0.12)",
  shadow: "0 12px 40px rgba(14, 34, 48, 0.10)",
} as const;

const navCards: NavCard[] = [
  {
    key: "about",
    label: "About Tim",
    icon: UserRound,
    text: "Professional background, credentials, and practice philosophy.",
  },
  {
    key: "fiduciary",
    label: "Fee-Only Fiduciary",
    icon: ShieldCheck,
    text: "Transparent annual pricing with no commissions and no AUM drag.",
  },
  {
    key: "process",
    label: "Planning Process",
    icon: Map,
    text: "How a new client relationship becomes an organized plan.",
  },
  {
    key: "choice",
    label: "Start a Plan or Stay High-Level",
    icon: PlayCircle,
    text: "Learn about financial planning or dive right in!",
  },
  {
    key: "investments",
    label: "Investment Approach",
    icon: LineChart,
    text: "Explore the principles behind how FinancialFamilies constructs and manages portfolios.",
  },
];

const first60DayTimeline = [
  { week: "Today", label: "Introduction meeting" },
  { week: "Week 1", label: "Upload financial documents to secure vault or deliver directly" },
  { week: "Week 2", label: "Resources Verification & Goals Exploration meeting" },
  { week: "Week 6", label: "First full planning meeting" },
  { week: "Ongoing", label: "Implementation and year-round availability" },
];

const processDetails = [
  "After the introduction meeting, families receive a short list of data-gathering requests tailored to their situation.",
  "Documents are uploaded to a secure vault or delivered directly.",
  "Once documents are provided, a Resources Verification & Goals Exploration meeting is scheduled. Families generally commit to FinancialFamilies at that next meeting.",
  "About four weeks later, we thoroughly explore a wide range of planning topics, investment recommendations, and implementation.",
  "After implementation begins, clients have year-round access via in-person meetings, virtual meetings, email, or phone. Most families become accustomed to ready availability and prefer two meetings per year. At least one formal annual meeting is requested.",
];

const investmentTopics = [
  "Stocks: how equities drive growth",
  "Bonds: stability and income",
  "Portfolio allocation: stocks and bonds",
  "Stock diversification",
  "Bond diversification",
  "Expense ratios: cost discipline",
  "Volatility: how markets move",
  "Spending: investing to support life goals",
  "Asset location: placing investments in the right accounts",
  "Tax-loss harvesting",
  "Rebalancing: shifting from recent winners to recent laggards",
  "Altruist custodial platform",
];

const allocationBuckets = [
  { label: "Stocks", range: "Primary growth engine" },
  { label: "Bonds", range: "Primary stability layer" },
];

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(36,149,211,0.10), transparent 28%), radial-gradient(circle at bottom right, rgba(247,148,54,0.10), transparent 32%), linear-gradient(180deg, #FFFEFB 0%, #F8FBFD 100%)",
        color: brand.ink,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
  {children}
</div>
    </div>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[2rem] border-0 ${className}`}
      style={{ background: brand.white, boxShadow: brand.shadow }}
    >
      {children}
    </div>
  );
}

function PanelBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-8 md:p-10 ${className}`}>{children}</div>;
}

function AppButton({
  children,
  onClick,
  style,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border-0 px-6 py-4 font-medium transition-transform hover:scale-[1.01] ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}
function ReturnToTopics({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <div className="mt-8 flex justify-center">
      <AppButton
        onClick={onClick}
        style={{
          background: brand.white,
          color: brand.blueDeep,
          border: `1px solid ${brand.border}`,
          boxShadow: brand.shadow,
        }}
      >
        Return to topics
      </AppButton>
    </div>
  );
}

function SimpleHeader({ showHome, goHome }: { showHome: boolean; goHome: () => void }) {
  return (
    <div
      className="sticky top-0 z-50 mb-8 rounded-[1.5rem] px-4 py-3"
      style={{
  background: brand.cream,
  boxShadow: "0 8px 24px rgba(14, 34, 48, 0.08)",
}}
    >
      <div className="relative flex items-center justify-center">
        <img
          src="/financialfamilies-logo.png"
          alt="FinancialFamilies Logo"
          className="h-20 w-auto md:h-24"
        />

        {showHome && (
          <div className="absolute right-0">
            <AppButton
              onClick={goHome}
              className="flex items-center"
              style={{ background: brand.white, boxShadow: brand.shadow, color: brand.ink }}
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </AppButton>
          </div>
        )}
      </div>
    </div>
  );
}
function SectionFrame({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={title}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.28 }}
        className="space-y-6"
      >
        <Panel>
          <PanelBody>
            <div className="max-w-4xl space-y-4">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                {title}
              </h1>
              <p className="text-lg leading-relaxed md:text-2xl" style={{ color: brand.slate }}>
                {subtitle}
              </p>
            </div>
          </PanelBody>
        </Panel>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function Feature({
  title,
  icon: Icon,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-[1.5rem] p-4"
      style={{ background: brand.cream, border: `1px solid ${brand.border}` }}
    >
      <div className="rounded-xl p-2" style={{ background: brand.blueSoft, color: brand.blueDeep }}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="font-medium">{title}</div>
    </div>
  );
}

function ComparisonRow({ left, right }: { left: string; right: string }) {
  return (
    <div
      className="grid grid-cols-1 gap-3 rounded-[1.5rem] p-4 md:grid-cols-2"
      style={{ background: brand.cream, border: `1px solid ${brand.border}` }}
    >
      <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
        {left}
      </div>
      <div className="text-sm font-medium leading-6 md:text-base">{right}</div>
    </div>
  );
}

function ChoiceCard({ title, subtitle, text, accent, buttonLabel, onButtonClick }: ChoiceCardProps) {
  return (
    <Panel>
      <PanelBody className="space-y-5">
        <div
          className="inline-flex rounded-full px-3 py-1 text-sm font-medium"
          style={{ background: `${accent}15`, color: accent }}
        >
          {title}
        </div>
        <div className="text-2xl font-semibold leading-tight md:text-3xl">{subtitle}</div>
        <div className="text-base leading-8 md:text-lg" style={{ color: brand.slate }}>
          {text}
        </div>
        {buttonLabel && (
          <AppButton onClick={onButtonClick} className="w-fit" style={{ background: accent, color: brand.white }}>
            {buttonLabel}
          </AppButton>
        )}
      </PanelBody>
    </Panel>
  );
}

function AllocationTopicPanel() {
  return (
    <div className="mt-6 rounded-[1.5rem] p-6" style={{ background: brand.white, boxShadow: brand.shadow }}>
      <div className="mb-2 text-lg font-medium">
        Portfolio design begins with the balance between growth and stability
      </div>
      <div className="mb-4 text-2xl font-semibold">Portfolio allocation: stocks and bonds</div>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        {allocationBuckets.map((bucket) => (
          <div key={bucket.label} className="rounded-xl p-5" style={{ background: brand.blueSoft }}>
            <div className="text-xl font-bold" style={{ color: brand.blueDeep }}>
              {bucket.label}
            </div>
            <div className="mt-1 text-sm" style={{ color: brand.slate }}>
              {bucket.range}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className="mb-2 font-semibold">Stocks</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            Stocks are expected to deliver most of the portfolio’s long-term growth, but they come with larger year-to-year swings.
          </div>
        </div>
        <div>
          <div className="mb-2 font-semibold">Bonds</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            Bonds are generally there to reduce volatility, provide stability, and help support spending needs when markets are uncomfortable.
          </div>
        </div>
      </div>

      <div className="mb-4 text-base font-medium">
        The most important investment decision is often not which fund to buy, but how much of the household portfolio belongs in stocks versus bonds.
      </div>

      <div className="text-sm md:text-base" style={{ color: brand.slate }}>
        FinancialFamilies uses planning to determine an allocation that is both growth-oriented and behaviorally tolerable.
      </div>
    </div>
  );
}

export default function FinancialFamiliesInteractivePresentation() {
  const [current, setCurrent] = useState<SectionKey>("home");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [lastSelectedTopic, setLastSelectedTopic] = useState<string | null>(null);
  const [showOverview, setShowOverview] = useState(false);
  const overviewRef = useRef<HTMLDivElement | null>(null);
useEffect(() => {
  window.scrollTo({ top: 0, behavior: "auto" });
}, [current]);
const investmentSectionTopRef = useRef<HTMLDivElement | null>(null);
const investmentTopicRef = useRef<HTMLDivElement | null>(null);

  const launchPlanUrl =
    "https://app.rightcapital.com/account/sign-up?referral=1a658ec9-ce93-4f67-bbb7-d065130e2499&type=client&advisor_id=0WrC_Va4q3RKdEwXR82G4Q";

  const sectionOrder: SectionKey[] = ["home", "about", "fiduciary", "process", "choice", "investments"];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const idx = sectionOrder.indexOf(current);
      if (e.key === "ArrowRight" && idx < sectionOrder.length - 1) {
        setCurrent(sectionOrder[idx + 1]);
      }
      if (e.key === "ArrowLeft" && idx > 0) {
        setCurrent(sectionOrder[idx - 1]);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current]);

  const goTo = (key: SectionKey) => {
  setCurrent(key);
  if (key !== "investments") {
    setSelectedTopic(null);
    setLastSelectedTopic(null);
  }
};

  const goHome = () => {
  setCurrent("home");
  setSelectedTopic(null);
  setLastSelectedTopic(null);
};

  const handleOverviewToggle = () => {
    setShowOverview((prev) => {
      const next = !prev;
      if (!prev) {
  setTimeout(() => {
    const y =
      (overviewRef.current?.getBoundingClientRect().top ?? 0) +
      window.scrollY -
      120;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }, 50);
}
      return next;
    });
  };

  const handleInvestmentTopicClick = (topic: string) => {
  setSelectedTopic(topic);
  setLastSelectedTopic(topic);

  setTimeout(() => {
    const y =
      (investmentTopicRef.current?.getBoundingClientRect().top ?? 0) +
      window.scrollY -
      120;

    window.scrollTo({
      top: Math.max(0, y),
      behavior: "smooth",
    });
  }, 50);
};

  return (
    <Shell>
      <SimpleHeader showHome={current !== "home"} goHome={goHome} />

      {current === "home" && (
        <div className="grid items-stretch gap-6 lg:grid-cols-12">
          <Panel className="overflow-hidden lg:col-span-12">
            <PanelBody className="space-y-6 pb-16 pt-20 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                  Helping loving families
                  <br />
                  <span style={{ color: brand.blue }}>Bring Success Home.</span>
                </h1>
              </div>
            </PanelBody>
          </Panel>

          <div className="px-2 pb-2 pt-4 text-center lg:col-span-12">
  <h2
    className="text-xl font-semibold md:text-2xl"
    style={{ color: brand.ink }}
  >
    What would you like to explore today?
  </h2>
</div>

          <div className="flex flex-wrap justify-center gap-4 lg:col-span-12">
            {navCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.key}
                  type="button"
                  onClick={() => goTo(card.key)}
                  className="w-full max-w-sm rounded-[2rem] p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] md:w-[calc(50%-0.5rem)] xl:w-[calc(33.333%-0.75rem)]"
                  style={{ background: brand.white, boxShadow: brand.shadow }}
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl p-3" style={{ background: brand.orangeSoft, color: brand.orangeDeep }}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg font-semibold">{card.label}</div>
                      <div className="text-sm leading-6" style={{ color: brand.slate }}>
                        {card.text}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {current === "about" && (
  <SectionFrame
    title="About Tim Hamilton"
    subtitle="FinancialFamilies was built to be the kind of place I would trust with my own family."
  >
    <Panel>
      <PanelBody className="grid gap-10 md:grid-cols-2 items-start">

        {/* LEFT SIDE — TEXT */}
        <div className="space-y-5 text-base leading-8 md:text-lg">

  <p className="text-lg font-medium">
   
    FinancialFamilies was launched in 2014 to provide fiduciary, fee-only financial advice
    to families who want clarity, not confusion.
  </p>

  <p>
    When you work with FinancialFamilies, you work directly with me. When you call,
    you’re not routed through a system or handed off — you’re talking to the person
    responsible for your plan.
  </p>

  <p>
    The work focuses on practical planning, transparent pricing, and investment decisions
    that support real life — not product sales or unnecessary complexity.
  </p>

  <p>
    Many families come here after experiencing advice that felt transactional,
    rushed, or disconnected. This is meant to be the opposite of that.
  </p>

  <p>
    The goal is simple: help families make clear decisions, stay organized,
    and move forward with confidence.
  </p>

  <div className="space-y-3 pt-2">
  <div className="flex justify-center">
    <Feature title="NAPFA Member" icon={ShieldCheck} />
  </div>
  <div className="flex justify-center">
    <Feature title="CFP® Practitioner" icon={CheckCircle2} />
  </div>
  <div className="flex justify-center">
    <Feature title="MBA from Ohio State" icon={Briefcase} />
  </div>
  <div className="flex justify-center">
    <Feature title="Independent Firm Owner" icon={HeartHandshake} />
  </div>
</div>
</div>

        {/* RIGHT SIDE — IMAGES */}
        <div className="space-y-4">
  {/* Headshot */}
  <div className="overflow-hidden rounded-3xl">
    <img
      src="/images/tim-headshot.jpg"
      alt="Tim Hamilton"
      className="w-full h-auto object-cover"
    />
  </div>

  {/* Family photo on its own row */}
  <div className="overflow-hidden rounded-2xl">
    <img
      src="/images/family.jpg"
      alt="Tim with family"
      className="w-full h-auto object-cover"
    />
  </div>

  {/* Office + front door below */}
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <div className="overflow-hidden rounded-2xl self-start">
    <img
      src="/images/office.jpg"
      alt="Office meeting space"
      className="w-full h-auto object-cover"
    />
  </div>

  <div className="overflow-hidden rounded-2xl self-start">
    <img
      src="/images/front-door.jpg"
      alt="Welcome home"
      className="w-full h-auto object-cover"
    />
  </div>
</div>
</div>

      </PanelBody>
    </Panel>
  </SectionFrame>
)}

      {current === "fiduciary" && (
        <SectionFrame
          title="Fee-Only Fiduciary"
          subtitle="FinancialFamilies is structured to keep advice aligned with families."
        >
          <Panel>
            <PanelBody>
              <div className="mb-4 space-y-3">
  <div className="text-lg md:text-xl font-medium">
    You pay a clear annual fee — not a percentage of your investments.
  </div>
  <div className="text-base md:text-lg" style={{ color: brand.slate }}>
    That keeps advice focused on what’s best for your family, not on gathering or managing assets.
  </div>
  <div className="text-2xl font-semibold pt-2">FinancialFamilies Fee Structure</div>
</div>
              <div className="overflow-hidden rounded-[1.25rem] border" style={{ borderColor: brand.border }}>
                <div className="grid grid-cols-2 text-center font-semibold" style={{ background: brand.blueDeep, color: brand.white }}>
                  <div className="p-3">Net Worth</div>
                  <div className="p-3">Fee</div>
                </div>
                <div className="grid grid-cols-2 text-center" style={{ background: brand.blueSoft }}>
                  <div className="p-3">Under $1,000,000</div>
                  <div className="p-3 font-medium">$2,000 / year</div>
                </div>
                <div className="grid grid-cols-2 text-center" style={{ background: brand.white }}>
                  <div className="p-3">Above $1,000,000</div>
                  <div className="p-3 font-medium">$3,000 / year</div>
                </div>
              </div>
            </PanelBody>
          </Panel>

          <div className="grid gap-6 lg:grid-cols-2">
            <Panel>
              <PanelBody className="space-y-5">
                <div className="text-2xl font-semibold">What fee-only means</div>
<div className="space-y-4 text-base leading-8 md:text-lg">
  <p>
    FinancialFamilies is paid directly by the families it serves. There is no
    compensation from financial products, commissions, or outside incentives.
  </p>
  <p>
    That means recommendations don’t depend on what you buy, where you invest,
    or how your assets are managed.
  </p>
  <p>
    The advice stands on its own — simple, direct, and aligned with your goals.
  </p>
</div>
              </PanelBody>
            </Panel>

            <Panel>
              <PanelBody className="space-y-4">
                <div className="text-2xl font-semibold">Why families care</div>
<div className="text-base md:text-lg" style={{ color: brand.slate }}>
  Different compensation models can quietly influence advice. This structure is designed to remove that pressure.
</div>
                <ComparisonRow
  left="Some advisors are paid through commissions"
  right="You receive advice without product incentives"
/>

<ComparisonRow
  left="Asset-based fees can reward gathering more assets"
  right="Your fee doesn’t depend on how much you invest"
/>

<ComparisonRow
  left="Compensation structures aren’t always obvious"
  right="You know exactly how FinancialFamilies is paid"
/>

<ComparisonRow
  left="Advice can drift toward sales over time"
  right="The focus stays on planning and long-term decisions"
/>
              </PanelBody>
            </Panel>
          </div>
        </SectionFrame>
      )}

      {current === "process" && (
        <SectionFrame
          title="The Planning Process"
          subtitle="A thoughtful planning process designed to help families move forward with confidence."
        >
          <Panel className="mb-6">
            <PanelBody>
              <div className="mb-4 text-2xl font-semibold">Typical first 60 days</div>
              <div className="grid gap-4 md:grid-cols-5">
                {first60DayTimeline.map((step) => (
                  <div
                    key={step.label}
                    className="rounded-[1.5rem] p-4 text-center"
                    style={{ background: brand.cream, border: `1px solid ${brand.border}` }}
                  >
                    <div className="text-sm font-semibold" style={{ color: brand.blueDeep }}>
                      {step.week}
                    </div>
                    <div className="text-sm leading-6 md:text-base">{step.label}</div>
                  </div>
                ))}
              </div>
            </PanelBody>
          </Panel>

          <Panel>
            <PanelBody className="space-y-5">
              <div className="text-2xl font-semibold">How new client work tends to flow</div>
              <div className="space-y-4">
                {processDetails.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-4 rounded-[1.5rem] p-4"
                    style={{ background: brand.cream, border: `1px solid ${brand.border}` }}
                  >
                    <div
                      className="flex h-10 w-10 min-h-10 min-w-10 shrink-0 items-center justify-center rounded-full font-semibold"
                      style={{ background: brand.blue, color: brand.white }}
                    >
                      {index + 1}
                    </div>
                    <div className="text-base leading-7 md:text-lg">{step}</div>
                  </div>
                ))}
              </div>
            </PanelBody>
          </Panel>
        </SectionFrame>
      )}

      {current === "choice" && (
  <SectionFrame title="Choose Your Path" subtitle="Families can start with an overview and launch when they are ready!">
       <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
  <ChoiceCard
    title="Overview"
    subtitle="Start with the overview"
    text="We'll cover a world of topics together. Money matters."
    accent={brand.orange}
    buttonLabel="Planning Overview"
    onButtonClick={handleOverviewToggle}
  />

  <ChoiceCard
    title="Launch"
    subtitle="Launch your plan"
    text="Begin organizing your resources and goals so a real plan can start taking shape."
    accent={brand.blue}
    buttonLabel="Launch Plan"
    onButtonClick={() => window.open(launchPlanUrl, "_blank")}
  />
</div>

            {showOverview && (
              <div ref={overviewRef}>
                <Panel>
                  <PanelBody className="space-y-6">
                    <div className="space-y-2">
                      <div className="text-2xl font-semibold">Planning Overview</div>
                      <p className="text-base leading-8 md:text-lg" style={{ color: brand.slate }}>
                        FinancialFamilies takes a fiduciary approach to planning that keeps your family at the heart of the matter.
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        [
                          "Retirement Planning",
                          "Clarify whether your retirement resources are truly on track and grounded in planning rather than wishful thinking.",
                        ],
                        [
                          "Insurance Review",
                          "FinancialFamilies does not sell insurance products, which helps families get a straight answer about what coverage is truly needed.",
                        ],
                        [
                          "Tax Planning",
                          "Good planning often means choosing among several possible paths with a clear understanding of the tax consequences.",
                        ],
                        [
                          "Health and Long-Term Care Planning",
                          "Families need a plan that supports long-term health goals and informs proper utilization of resources.",
                        ],
                        [
                          "Estate Planning Coordination",
                          "While legal documents are drafted elsewhere, FinancialFamilies helps families stay organized, aligned, and current over time.",
                        ],
                        [
                          "Life Planning",
                          "Whether life brings a new job, an inheritance, a growing family, or endless other possibilities, families make decisions with clarity.",
                        ],
                      ].map(([title, text]) => (
                        <div
                          key={title}
                          className="rounded-[1.5rem] p-5"
                          style={{ background: brand.cream, border: `1px solid ${brand.border}` }}
                        >
                          <div className="mb-2 text-lg font-semibold">{title}</div>
                          <p className="text-base leading-7" style={{ color: brand.slate }}>
                            {text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </PanelBody>
                                </Panel>

                <div className="mt-8 flex justify-center">
                  <AppButton
                    onClick={() => {
  setShowOverview(false);
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 0);
}}
                    style={{
                      background: brand.white,
                      color: brand.blueDeep,
                      border: `1px solid ${brand.border}`,
                      boxShadow: brand.shadow,
                    }}
                  >
                    Return to Choose Your Path
                  </AppButton>
                </div>
              </div>
            )}
          </div>
        </SectionFrame>
      )}

      {current === "investments" && (
        <SectionFrame
          title="Investment Approach"
          subtitle="Explore the principles behind how FinancialFamilies constructs and manages portfolios."
        >
          <Panel>
            <PanelBody>
<div ref={investmentSectionTopRef} />
             <div className="space-y-8">

  {/* Foundations */}
  <div>
    <div className="mb-4 flex items-center justify-center">
  <div
    className="rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide"
    style={{
      background: brand.blueSoft,
      color: brand.blueDeep,
    }}
  >
    Foundations
  </div>
</div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[
        "Portfolio allocation: stocks and bonds",
        "Stocks: how equities drive growth",
        "Bonds: stability and income",
      ].map((topic) => {
         const isActive =
    selectedTopic === topic ||
    (selectedTopic === null && lastSelectedTopic === topic);

        return (
          <AppButton
            key={topic}
            onClick={() => handleInvestmentTopicClick(topic)}
            style={{
              background: isActive ? brand.orangeSoft : brand.blueSoft,
              color: isActive ? brand.orangeDeep : brand.blueDeep,
              border: `1px solid ${brand.border}`,
              boxShadow: brand.shadow,
            }}
          >
            {topic}
          </AppButton>
        );
      })}
    </div>
  </div>

  {/* Portfolio Construction */}
  <div>
    <div className="mb-4 flex items-center justify-center">
  <div
    className="rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide"
    style={{
      background: brand.blueSoft,
      color: brand.blueDeep,
    }}
  >
    Portfolio Construction
  </div>
</div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[
        "Stock diversification",
        "Bond diversification",
        "Asset location: placing investments in the right accounts",
      ].map((topic) => {
          const isActive =
    selectedTopic === topic ||
    (selectedTopic === null && lastSelectedTopic === topic);

        return (
          <AppButton
            key={topic}
            onClick={() => handleInvestmentTopicClick(topic)}
            style={{
              background: isActive ? brand.orangeSoft : brand.blueSoft,
              color: isActive ? brand.orangeDeep : brand.blueDeep,
              border: `1px solid ${brand.border}`,
              boxShadow: brand.shadow,
            }}
          >
            {topic}
          </AppButton>
        );
      })}
    </div>
  </div>

  {/* Ongoing Management */}
  <div>
    <div className="mb-4 flex items-center justify-center">
  <div
    className="rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide"
    style={{
      background: brand.blueSoft,
      color: brand.blueDeep,
    }}
  >
    Ongoing Management
  </div>
</div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[
        "Expense ratios: cost discipline",
        "Volatility: how markets move",
        "Rebalancing: shifting from recent winners to recent laggards",
        "Tax-loss harvesting",
        "Spending: investing to support life goals",
        "Altruist custodial platform",
      ].map((topic) => {
          const isActive =
    selectedTopic === topic ||
    (selectedTopic === null && lastSelectedTopic === topic);

        return (
          <AppButton
            key={topic}
            onClick={() => handleInvestmentTopicClick(topic)}
            style={{
              background: isActive ? brand.orangeSoft : brand.blueSoft,
              color: isActive ? brand.orangeDeep : brand.blueDeep,
              border: `1px solid ${brand.border}`,
              boxShadow: brand.shadow,
            }}
          >
            {topic}
          </AppButton>
        );
      })}
    </div>
  </div>

</div>
<div
  className="mt-6 text-base md:text-lg text-center max-w-2xl mx-auto"
  style={{ color: brand.slate }}
>
  The goal isn’t complexity — it’s making consistent, thoughtful decisions over time.
</div>
             <div ref={investmentTopicRef}>
  {selectedTopic === "Stocks: how equities drive growth" && (
    <div className="mt-6 space-y-4">
      <div className="text-xl font-semibold">
        Stocks: how equities drive growth
      </div>

      <div className="text-base md:text-lg" style={{ color: brand.slate }}>
        This overview explains how equities contribute to long-term portfolio growth.
      </div>
<ReturnToTopics
        onClick={() => {
  setSelectedTopic(null);
  setTimeout(() => {
    const y =
      (investmentSectionTopRef.current?.getBoundingClientRect().top ?? 0) +
      window.scrollY -
      170;

    window.scrollTo({
      top: Math.max(0, y),
      behavior: "smooth",
    });
  }, 0);
}}
      />
      <div className="rounded-[1.5rem] overflow-hidden" style={{ boxShadow: brand.shadow }}>
        <iframe
          src="/stocks-franklin-templeton.pdf"
          className="w-full h-[700px]"
        />
      </div>

      
    </div>
  )}

  {selectedTopic === "Portfolio allocation: stocks and bonds" && (
    <>
      <AllocationTopicPanel />
      <ReturnToTopics
        onClick={() => {
  setSelectedTopic(null);
  setTimeout(() => {
    const y =
      (investmentSectionTopRef.current?.getBoundingClientRect().top ?? 0) +
      window.scrollY -
      140;

    window.scrollTo({
      top: Math.max(0, y),
      behavior: "smooth",
    });
  }, 0);
}}
      />
    </>
  )}

  {selectedTopic === "Expense ratios: cost discipline" && (
    <>
      <ExpenseTopicPanel brand={brand} />
      <ReturnToTopics
        onClick={() => {
  setSelectedTopic(null);
  setTimeout(() => {
    const y =
      (investmentSectionTopRef.current?.getBoundingClientRect().top ?? 0) +
      window.scrollY -
      140;

    window.scrollTo({
      top: Math.max(0, y),
      behavior: "smooth",
    });
  }, 0);
}}
      />
    </>
  )}

  {selectedTopic === "Stock diversification" && (
    <>
      <StockDiversificationPanel brand={brand} />
      <ReturnToTopics
        onClick={() => {
  setSelectedTopic(null);
  setTimeout(() => {
    const y =
      (investmentSectionTopRef.current?.getBoundingClientRect().top ?? 0) +
      window.scrollY -
      170;

    window.scrollTo({
      top: Math.max(0, y),
      behavior: "smooth",
    });
  }, 0);
}}
      />
    </>
  )}

  {selectedTopic === "Volatility: how markets move" && (
    <>
      <VolatilityTopicPanel brand={brand} />
      <ReturnToTopics
        onClick={() => {
  setSelectedTopic(null);
  setTimeout(() => {
    const y =
      (investmentSectionTopRef.current?.getBoundingClientRect().top ?? 0) +
      window.scrollY -
      140;

    window.scrollTo({
      top: Math.max(0, y),
      behavior: "smooth",
    });
  }, 0);
}}
      />
    </>
  )}

  {selectedTopic === "Rebalancing: shifting from recent winners to recent laggards" && (
    <>
      <RebalancingTopicPanel brand={brand} />
      <ReturnToTopics
        onClick={() => {
  setSelectedTopic(null);
  setTimeout(() => {
    const y =
      (investmentSectionTopRef.current?.getBoundingClientRect().top ?? 0) +
      window.scrollY -
      140;

    window.scrollTo({
      top: Math.max(0, y),
      behavior: "smooth",
    });
  }, 0);
}}
      />
    </>
  )}

  {selectedTopic === "Bonds: stability and income" && (
    <>
      <BondsTopicPanel brand={brand} />
      <ReturnToTopics
        onClick={() => {
  setSelectedTopic(null);
  setTimeout(() => {
    const y =
      (investmentSectionTopRef.current?.getBoundingClientRect().top ?? 0) +
      window.scrollY -
      140;

    window.scrollTo({
      top: Math.max(0, y),
      behavior: "smooth",
    });
  }, 0);
}}
      />
    </>
  )}

  {selectedTopic === "Bond diversification" && (
    <>
      <BondDiversificationPanel brand={brand} />
      <ReturnToTopics
        onClick={() => {
  setSelectedTopic(null);
  setTimeout(() => {
    const y =
      (investmentSectionTopRef.current?.getBoundingClientRect().top ?? 0) +
      window.scrollY -
      170;

    window.scrollTo({
      top: Math.max(0, y),
      behavior: "smooth",
    });
  }, 0);
}}
      />
    </>
  )}

  {selectedTopic === "Asset location: placing investments in the right accounts" && (
    <>
      <AssetLocationTopicPanel brand={brand} />
      <ReturnToTopics
        onClick={() => {
  setSelectedTopic(null);
  setTimeout(() => {
    const y =
      (investmentSectionTopRef.current?.getBoundingClientRect().top ?? 0) +
      window.scrollY -
      140;

    window.scrollTo({
      top: Math.max(0, y),
      behavior: "smooth",
    });
  }, 0);
}}
      />
    </>
  )}

  {selectedTopic === "Tax-loss harvesting" && (
    <>
      <TaxLossHarvestingPanel brand={brand} />
      <ReturnToTopics
        onClick={() => {
  setSelectedTopic(null);
  setTimeout(() => {
    const y =
      (investmentSectionTopRef.current?.getBoundingClientRect().top ?? 0) +
      window.scrollY -
      140;

    window.scrollTo({
      top: Math.max(0, y),
      behavior: "smooth",
    });
  }, 0);
}}
      />
    </>
  )}

  {selectedTopic === "Spending: investing to support life goals" && (
    <>
      <SpendingTopicPanel brand={brand} />
      <ReturnToTopics
        onClick={() => {
  setSelectedTopic(null);
  setTimeout(() => {
    const y =
      (investmentSectionTopRef.current?.getBoundingClientRect().top ?? 0) +
      window.scrollY -
      140;

    window.scrollTo({
      top: Math.max(0, y),
      behavior: "smooth",
    });
  }, 0);
}}
      />
    </>
  )}

  {selectedTopic === "Altruist custodial platform" && (
    <>
      <AltruistTopicPanel brand={brand} />
      <ReturnToTopics
        onClick={() => {
  setSelectedTopic(null);
  setTimeout(() => {
    const y =
      (investmentSectionTopRef.current?.getBoundingClientRect().top ?? 0) +
      window.scrollY -
      140;

    window.scrollTo({
      top: Math.max(0, y),
      behavior: "smooth",
    });
  }, 0);
}}
      />
    </>
  )}
</div>
            </PanelBody>
          </Panel>
        </SectionFrame>
      )}
  <div
  className="mt-12 rounded-[1.5rem] p-6 text-xs leading-6 md:text-sm"
  style={{
    background: brand.cream,
    color: brand.slate,
    border: `1px solid ${brand.border}`,
  }}
><div className="mb-2 font-semibold">Important Disclosures</div>
  <p className="mb-4">
    Investing in securities involves risks, including the potential for loss of principal.
    There is no guarantee that any investment plan or strategy will be successful.
  </p>

  <p className="mb-4">
    FinancialFamilies, LLC (“FinancialFamilies”) is a registered investment adviser offering advisory services in the State of Ohio and in other jurisdictions where exempted. Registration does not imply a certain level of skill or training. The presence of this website on the Internet shall not be directly or indirectly interpreted as a solicitation of investment advisory services to persons of another jurisdiction unless otherwise permitted by statute. Follow-up or individualized responses to consumers in a particular state by FinancialFamilies in the rendering of personalized investment advice for compensation shall not be made without our first complying with jurisdiction requirements or pursuant an applicable state exemption.
  </p>

  <p>
    All written content on this site is for information purposes only. Opinions expressed herein are solely those of FinancialFamilies, unless otherwise specifically cited. Material presented is believed to be from reliable sources and no representations are made by our firm as to another parties’ informational accuracy or completeness. All information or ideas provided should be discussed in detail with an advisor, accountant or legal counsel prior to implementation.
  </p>
</div>
</Shell>
  );
}