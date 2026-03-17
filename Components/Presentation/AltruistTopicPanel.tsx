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

export default function AltruistTopicPanel({ brand }: { brand: Brand }) {
  return (
    <div
      id="altruist"
      className="mt-6 rounded-[1.5rem] p-6"
      style={{ background: brand.white, boxShadow: brand.shadow }}
    >
      <div className="mb-2 text-lg font-medium">
        Custody and implementation
      </div>
      <div className="mb-4 text-2xl font-semibold">
        Where accounts are held
      </div>

      {/* Highlight */}
      <div
        className="mb-6 rounded-[1.25rem] p-5"
        style={{ background: brand.blueSoft, border: `1px solid ${brand.border}` }}
      >
        <div className="text-xl font-semibold" style={{ color: brand.blueDeep }}>
          Clients can hold accounts wherever they prefer
        </div>
        <div className="mt-2 text-sm md:text-base" style={{ color: brand.slate }}>
          The custodian does not change the advice. FinancialFamilies provides
          guidance regardless of where accounts are held.
        </div>
      </div>

      {/* Altruist explanation */}
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className="mb-2 font-semibold">Why Altruist is often suggested</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            Altruist is built specifically for advisors and their clients. It provides
            access to a broad range of ETFs and mutual funds without transaction fees,
            along with a modern trading and reporting platform.
          </div>
        </div>
        <div>
          <div className="mb-2 font-semibold">How they are compensated</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            FinancialFamilies does not pay Altruist and Altruist does not pay FinancialFamilies.
            Like other custodians, they are compensated for holding client accounts.
          </div>
        </div>
      </div>

      {/* Practical benefits */}
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className="mb-2 font-semibold">What clients experience</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            Altruist supports account setup, transfers, trading, and performance reporting.
            They also provide responsive service for both clients and advisors.
          </div>
        </div>
        <div>
          <div className="mb-2 font-semibold">How they fit in the industry</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            They are competing with firms like Schwab and Fidelity, but focus exclusively
            on advisor-supported relationships rather than retail accounts.
          </div>
        </div>
      </div>

      {/* Closing */}
      <div className="text-base font-medium">
        The goal is simple: make implementation easy while keeping advice independent.
      </div>
    </div>
  );
}