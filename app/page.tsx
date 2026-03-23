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
  "Once documents are provided, a Resources Verification & Goals Exploration meeting is scheduled. Families do not need to commit to FinancialFamilies before this meeting.",
  "About four weeks later, a full planning meeting explores planning scenarios, investment recommendations, and implementation.",
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
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">{children}</div>
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

function SimpleHeader({ showHome, goHome }: { showHome: boolean; goHome: () => void }) {
  return (
    <div className="relative mb-8 flex items-center justify-center">
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
  const [showOverview, setShowOverview] = useState(false);
  const overviewRef = useRef<HTMLDivElement | null>(null);
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
    if (key !== "investments") setSelectedTopic(null);
  };

  const goHome = () => setCurrent("home");

  const handleOverviewToggle = () => {
    setShowOverview((prev) => {
      const next = !prev;
      if (!prev) {
        setTimeout(() => {
          overviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
      return next;
    });
  };

  const handleInvestmentTopicClick = (topic: string) => {
  setSelectedTopic(topic);

  if (topic === "Stocks: how equities drive growth") {
    window.open("/stocks-franklin-templeton.pdf", "_blank");
    return;
  }

  setTimeout(() => {
    investmentTopicRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
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

          <div className="px-2 pb-1 pt-2 lg:col-span-12">
            <h2 className="text-xl font-semibold md:text-2xl" style={{ color: brand.ink }}>
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
        <SectionFrame title="About Tim Hamilton" subtitle="A little about the person and values behind FinancialFamilies.">
          <Panel>
            <PanelBody className="space-y-5 text-base leading-8 md:text-lg">
              <p>FinancialFamilies was launched in 2014 to provide fiduciary, fee-only wealth advice to loving households.</p>
              <p>
                Tim Hamilton works directly with every client family. When families call FinancialFamilies, they speak with the person responsible for their planning.
              </p>
              <p>
                The firm focuses on thoughtful financial planning, transparent pricing, and investment management designed to support family goals.
              </p>
              <p>
                Many families come to FinancialFamilies after experiencing a more transactional or product-driven advisory relationship.
              </p>

              <div className="grid gap-4 pt-2 md:grid-cols-2">
                <Feature title="MBA from Ohio State" icon={Briefcase} />
                <Feature title="CFP® Practitioner" icon={CheckCircle2} />
                <Feature title="NAPFA Member" icon={ShieldCheck} />
                <Feature title="Independent Firm Owner" icon={HeartHandshake} />
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
              <div className="mb-4 space-y-2">
                <div className="text-base md:text-lg" style={{ color: brand.slate }}>
                  Families pay a simple flat annual planning fee rather than a percentage of assets.
                </div>
                <div className="text-2xl font-semibold">FinancialFamilies Fee Structure</div>
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
                <div className="text-2xl font-semibold">What fee-only means here</div>
                <div className="space-y-4 text-base leading-8 md:text-lg">
                  <p>
                    FinancialFamilies does not accept compensation from financial institutions and instead uses transparent pricing intended to align with client interests and fiduciary duty.
                  </p>
                  <p>No product revenue. No pressure to fit families into someone else’s agenda.</p>
                  <p>The structure is designed so advice stands on its own merits.</p>
                </div>
              </PanelBody>
            </Panel>

            <Panel>
              <PanelBody className="space-y-4">
                <div className="text-2xl font-semibold">Why that matters</div>
                <ComparisonRow left="Commissions can bias recommendations" right="Fee-only removes product compensation" />
                <ComparisonRow left="AUM pricing can create asset-gathering incentives" right="Flat-fee pricing reduces those conflicts" />
                <ComparisonRow left="Fee-based is often misunderstood" right="Fee-only is cleaner and easier to evaluate" />
                <ComparisonRow left="Advice can become sales-adjacent" right="Advice stays closer to planning and stewardship" />
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
        <SectionFrame title="Choose Your Path" subtitle="Families can begin building a plan or explore at their own pace.">
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <ChoiceCard
                title="Option 1"
                subtitle="Begin building a plan"
                text="Start organizing your goals, accounts, and financial structure inside professional planning software to begin building a real financial plan together."
                accent={brand.blue}
                buttonLabel="Launch Plan"
                onButtonClick={() => window.open(launchPlanUrl, "_blank")}
              />
              <ChoiceCard
                title="Option 2"
                subtitle="Stay at the overview level"
                text="Continue learning about the process and philosophy first. Many families prefer to explore before committing to the planning process."
                accent={brand.orange}
                buttonLabel="Planning Overview"
                onButtonClick={handleOverviewToggle}
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
                          "Budgeting",
                          "Saving and spending both matter. Families need a plan that supports long-term goals without losing sight of real life.",
                        ],
                        [
                          "Estate Planning Coordination",
                          "While legal documents are drafted elsewhere, FinancialFamilies helps families stay organized, aligned, and current over time.",
                        ],
                        [
                          "Life Planning",
                          "Whether life brings a new job, a move, stock options, pension decisions, or a major purchase, planning helps families make a wide range of decisions with clarity.",
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
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {investmentTopics.map((topic) => {
        const isActive = selectedTopic === topic;

        return (
          <AppButton
            key={topic}
            onClick={() => handleInvestmentTopicClick(topic)}
            style={{
              background: isActive ? brand.orangeSoft : brand.blueSoft,
              color: isActive ? brand.orangeDeep : brand.blueDeep,
              border: `1px solid ${brand.border}`,
              boxShadow: brand.shadow,
              transform: isActive ? "scale(1.02)" : "scale(1)",
              transition: "all 0.15s ease",
            }}
          >
            {topic}
          </AppButton>
        );
      })}
    </div>

              <div ref={investmentTopicRef}>
                {selectedTopic === "Portfolio allocation: stocks and bonds" && <AllocationTopicPanel />}
                {selectedTopic === "Expense ratios: cost discipline" && <ExpenseTopicPanel brand={brand} />}
                {selectedTopic === "Stock diversification" && <StockDiversificationPanel brand={brand} />}
                {selectedTopic === "Volatility: how markets move" && <VolatilityTopicPanel brand={brand} />}
                {selectedTopic === "Rebalancing: shifting from recent winners to recent laggards" && (
                  <RebalancingTopicPanel brand={brand} />)}
		{selectedTopic === "Bonds: stability and income" && (<BondsTopicPanel brand={brand} />)}
		{selectedTopic === "Bond diversification" && (<BondDiversificationPanel brand={brand} />)}
		{selectedTopic === "Asset location: placing investments in the right accounts" && (<AssetLocationTopicPanel brand={brand}  		/>)}
		{selectedTopic === "Tax-loss harvesting" && (<TaxLossHarvestingPanel brand={brand} />)}
		{selectedTopic === "Spending: investing to support life goals" && (<SpendingTopicPanel brand={brand} />)}
		{selectedTopic === "Altruist custodial platform" && (<AltruistTopicPanel brand={brand} />)}
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