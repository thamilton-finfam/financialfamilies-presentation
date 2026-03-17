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

export default function VolatilityTopicPanel({ brand }: { brand: Brand }) {
  return (
    <div className="mt-6 rounded-[1.5rem] p-6" style={{ background: brand.white, boxShadow: brand.shadow }}>
      <div className="mb-2 text-lg font-medium">Volatility is the price of growth</div>
      <div className="mb-4 text-2xl font-semibold">How markets actually behave</div>

      <div className="mb-6 rounded-[1.25rem] p-5" style={{ background: brand.orangeSoft, border: `1px solid ${brand.border}` }}>
        <div className="text-xl font-semibold" style={{ color: brand.orangeDeep }}>
          Stocks can lose 25% or more in a single year
        </div>
        <div className="mt-2 text-sm md:text-base" style={{ color: brand.slate }}>
          This level of decline is not unusual. It has happened multiple times historically and is part of how equity markets behave.
        </div>
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className="mb-2 font-semibold">The reality most families face</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            Most families are comfortable with growth in theory, but experience discomfort when volatility shows up in reality. That gap between expectation and experience is where mistakes are often made.
          </div>
        </div>
        <div>
          <div className="mb-2 font-semibold">Why it happens</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            Markets continuously adjust based on earnings expectations, interest rates, and investor behavior. These adjustments create short-term declines that are opportunities for long-term returns.
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className="mb-2 font-semibold">How we manage it</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            We use stocks for long-term growth, but we do not rely on them alone. Bonds are intentionally included to help preserve capital and reduce the impact of market declines.
          </div>
        </div>
        <div>
          <div className="mb-2 font-semibold">Why structure matters</div>
          <div className="text-sm leading-6 md:text-base" style={{ color: brand.slate }}>
            A well-structured portfolio allows you to stay invested during difficult markets, which is ultimately what drives long-term success.
          </div>
        </div>
      </div>

      <div className="text-base font-medium">
        Volatility is not a flaw — it is a condition that must be respected and planned for.
      </div>
    </div>
  );
}