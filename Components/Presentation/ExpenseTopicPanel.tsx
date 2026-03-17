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

const expenseExamples = [
  { label: "Typical mutual fund portfolio", value: "~1.19%" },
  { label: "Low-cost ETF structure", value: "~0.10%–0.20%" },
];

const annualCostExamples = [
  { label: "At 1.19%", value: "$11,900 / year" },
  { label: "At 0.15%", value: "$1,500 / year" },
  { label: "Annual difference", value: "$10,400 / year" },
];

export default function ExpenseTopicPanel({ brand }: { brand: Brand }) {
  return (
    <div className="mt-6 rounded-[1.5rem] p-6" style={{ background: brand.white, boxShadow: brand.shadow }}>
      <div className="mb-2 text-lg font-medium">Cost is one of the few investment variables families can directly control</div>
      <div className="mb-4 text-2xl font-semibold">Expense ratios: cost discipline</div>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        {expenseExamples.map((item) => (
          <div key={item.label} className="rounded-xl p-5 text-center" style={{ background: brand.blueSoft }}>
            <div className="text-xl font-bold" style={{ color: brand.blueDeep }}>{item.value}</div>
            <div className="mt-1 text-sm" style={{ color: brand.slate }}>{item.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-6 rounded-[1.25rem] p-5" style={{ background: brand.orangeSoft, border: `1px solid ${brand.border}` }}>
        <div className="mb-3 text-lg font-semibold">On a $1,000,000 portfolio</div>
        <div className="grid gap-4 md:grid-cols-3">
          {annualCostExamples.map((item) => (
            <div key={item.label} className="rounded-xl p-4 text-center" style={{ background: brand.white }}>
              <div className="text-lg font-bold" style={{ color: brand.orangeDeep }}>{item.value}</div>
              <div className="mt-1 text-sm" style={{ color: brand.slate }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className="mb-2 font-semibold">Why low cost matters</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            Every dollar paid in fund expenses is a dollar that no longer compounds for the family. Costs matter every year, not just once.
          </div>
        </div>
        <div>
          <div className="mb-2 font-semibold">How FinancialFamilies responds</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            The portfolio structure leans heavily on low-cost, transaction-free ETFs so more of the return stays with the family rather than the fund company.
          </div>
        </div>
      </div>

      <div className="text-sm md:text-base" style={{ color: brand.slate }}>
        Lower expense ratios do not guarantee better outcomes, but reducing unnecessary drag improves the odds that families keep more of what markets provide.
      </div>
    </div>
  );
}