type Brand = {
  blue: string;
  blueDeep: string;
  blueSoft: string;
  orange: string;
  orangeDeep: string;
  orangeSoft: string;
  ink: string;
  slate: string;
  cream: string;
  white: string;
  border: string;
  shadow: string;
};

const rebalancingPhases = [
  {
    title: "What usually happens",
    text: "Recent winners grow into a larger share of the portfolio while recent laggards shrink. Left alone, the portfolio drifts away from its intended structure.",
  },
  {
    title: "What disciplined rebalancing does",
    text: "Rebalancing trims categories that have recently outperformed and adds to categories that have recently underperformed, bringing the portfolio back toward its target design.",
  },
  {
    title: "Why it matters",
    text: "Rebalancing helps control concentration risk and reinforces a disciplined buy-lower / trim-higher process instead of letting emotion or recent headlines drive decisions.",
  },
];

export default function RebalancingTopicPanel({ brand }: { brand: Brand }) {
  return (
    <div className="mt-6 rounded-[1.5rem] p-6" style={{ background: brand.white, boxShadow: brand.shadow }}>
      <div className="mb-2 text-lg font-medium">Disciplined portfolios do not simply drift with recent performance</div>
      <div className="mb-4 text-2xl font-semibold">Rebalancing: shifting from recent winners to recent laggards</div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {rebalancingPhases.map((phase) => (
          <div key={phase.title} className="rounded-xl p-5" style={{ background: brand.blueSoft }}>
            <div className="mb-2 text-lg font-semibold" style={{ color: brand.blueDeep }}>{phase.title}</div>
            <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>{phase.text}</div>
          </div>
        ))}
      </div>

      <div className="mb-4 text-base font-medium">
        Rebalancing often means selling some of what has recently done best and adding to what has recently lagged.
      </div>

      <div className="mb-4 text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
        That can feel uncomfortable in the moment, but it is one of the clearest ways to impose discipline on a portfolio. Rather than chasing what has already run ahead, the portfolio is brought back toward its intended allocation.
      </div>

      <div className="text-sm md:text-base" style={{ color: brand.slate }}>
        FinancialFamilies uses rebalancing to maintain diversification, manage concentration risk, and reinforce a long-term process rather than a momentum-driven one.
      </div>
    </div>
  );
}