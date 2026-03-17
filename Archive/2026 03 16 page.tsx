"use client";

import ExpenseTopicPanel from "@/components/presentation/ExpenseTopicPanel";
import VolatilityTopicPanel from "@/components/presentation/VolatilityTopicPanel";
import RebalancingTopicPanel from "@/components/presentation/RebalancingTopicPanel";
import StockDiversificationPanel from "@/components/presentation/StockDiversificationPanel";
import React, { useRef, useState } from "react";
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
    text: "How portfolios are shaped around goals, taxes, risk, and real life.",
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

const investmentPoints = [
  "Portfolios should be customized to the family, not copied from a generic template.",
  "Stocks can drive long-term growth, but volatility must be understood and remain tolerable.",
  "Taxes materially affect investment outcomes and should influence implementation.",
  "Investment decisions should serve goals because families invest in order to spend someday.",
  "Families can hold investment accounts wherever they prefer. If no preference exists, FinancialFamilies suggests Altruist. Transferring accounts is straightforward and does not trigger taxation.",
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
        className="h-20 md:h-24 w-auto"
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
              <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">{title}</h1>
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

function Feature({ title, icon: Icon }: { title: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex items-center gap-3 rounded-[1.5rem] p-4" style={{ background: brand.cream, border: `1px solid ${brand.border}` }}>
      <div className="rounded-xl p-2" style={{ background: brand.blueSoft, color: brand.blueDeep }}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="font-medium">{title}</div>
    </div>
  );
}

function ComparisonRow({ left, right }: { left: string; right: string }) {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-[1.5rem] p-4 md:grid-cols-2" style={{ background: brand.cream, border: `1px solid ${brand.border}` }}>
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
        <div className="inline-flex rounded-full px-3 py-1 text-sm font-medium" style={{ background: `${accent}15`, color: accent }}>
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

export default function FinancialFamiliesInteractivePresentation() {
  const [current, setCurrent] = useState<SectionKey>("home");
  const [showOverview, setShowOverview] = useState(false);
  const overviewRef = useRef<HTMLDivElement | null>(null);
  const launchPlanUrl = "https://app.rightcapital.com/account/sign-up?referral=1a658ec9-ce93-4f67-bbb7-d065130e2499&type=client&advisor_id=0WrC_Va4q3RKdEwXR82G4Q";

  const goTo = (key: SectionKey) => setCurrent(key);
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

  return (
    <Shell>
      <SimpleHeader showHome={current !== "home"} goHome={goHome} />

      {current === "home" && (
        <div className="grid items-stretch gap-6 lg:grid-cols-12">
          <Panel className="overflow-hidden lg:col-span-12">
            <PanelBody className="space-y-6 pt-20 pb-16 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                  Helping loving families<br /><span style={{ color: brand.blue }}>Bring Success Home.</span>
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
                  className="w-full max-w-sm rounded-[2rem] p-6 text-left transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 md:w-[calc(50%-0.5rem)] xl:w-[calc(33.333%-0.75rem)]"
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
              <p>Tim Hamilton works directly with every client family. When families call FinancialFamilies, they speak with the person responsible for their planning.</p>
              <p>The firm focuses on thoughtful financial planning, transparent pricing, and investment management designed to support family goals.</p>
              <p>A local solo advisory practice is currently referring families to FinancialFamilies. FinancialFamilies will eventually seek to repeat that preferable transition.</p>

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
                  <p>FinancialFamilies does not accept compensation from financial institutions and instead uses transparent pricing intended to align with client interests and fiduciary duty.</p>
                  <p>No product revenue. No proprietary product shelf. No pressure to fit families into someone else’s agenda.</p>
                  <p>The structure is designed so advice can stand on its own merits.</p>
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
                  <div key={step.label} className="rounded-[1.5rem] p-4 text-center" style={{ background: brand.cream, border: `1px solid ${brand.border}` }}>
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
                  <div key={step} className="flex items-start gap-4 rounded-[1.5rem] p-4" style={{ background: brand.cream, border: `1px solid ${brand.border}` }}>
                    <div className="flex h-10 w-10 min-h-10 min-w-10 shrink-0 items-center justify-center rounded-full font-semibold" style={{ background: brand.blue, color: brand.white }}>
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
        <SectionFrame
          title="Choose Your Path"
          subtitle="Families can begin building a plan or explore at their own pace."
        >
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
                        ["Retirement Planning", "Clarify whether your retirement resources are truly on track and grounded in planning rather than wishful thinking."],
                        ["Insurance Review", "FinancialFamilies does not sell insurance products, which helps families get a straight answer about what coverage is truly needed."],
                        ["Tax Planning", "Good planning often means choosing among several possible paths with a clear understanding of the tax consequences."],
                        ["Budgeting", "Saving and spending both matter. Families need a plan that supports long-term goals without losing sight of real life."],
                        ["Estate Planning Coordination", "While legal documents are drafted elsewhere, FinancialFamilies helps families stay organized, aligned, and current over time."],
                        ["Life Planning", "Whether life brings a new job, a move, stock options, pension decisions, or a major purchase, planning helps families make decisions with clarity."],
                      ].map(([title, text]) => (
                        <div key={title} className="rounded-[1.5rem] p-5" style={{ background: brand.cream, border: `1px solid ${brand.border}` }}>
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
          title="Investment Management Approach"
          subtitle="Investments are structured to support family goals, stability, and long-term progress."
        >
          <div className="grid gap-6 lg:grid-cols-12">
            <Panel className="lg:col-span-8">
              <PanelBody className="space-y-4">
                <div className="text-2xl font-semibold">Investment management principles</div>
                <div className="space-y-4">
                  {investmentPoints.map((point) => (
                    <div key={point} className="flex items-start gap-4 rounded-[1.5rem] p-4" style={{ background: brand.cream, border: `1px solid ${brand.border}` }}>
                      <CheckCircle2 className="mt-1 h-5 w-5 min-h-5 min-w-5 shrink-0" style={{ color: brand.blueDeep }} />
                      <div className="text-base leading-7 md:text-lg">{point}</div>
                    </div>
                  ))}
                </div>
              </PanelBody>
            </Panel>

            <Panel className="lg:col-span-4">
              <PanelBody className="space-y-5 text-base leading-8 md:text-lg">
                <div className="text-2xl font-semibold">Bottom line</div>
                <p>Planning informs investing.</p>
                <p>Taxes matter.</p>
                <p>Behavior matters.</p>
                <p>Costs matter.</p>
                <p>The portfolio is there to support the life, not the other way around.</p>
              </PanelBody>
            </Panel>
          </div>
        </SectionFrame>
      )}
    </Shell>
  );
}
