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

export default function BondsTopicPanel({ brand }: { brand: Brand }) {
  return (
    <div
      id="bonds"
      className="mt-6 rounded-[1.5rem] p-6"
      style={{ background: brand.white, boxShadow: brand.shadow }}
    >
      {/* Header */}
      <div className="mb-2 text-lg font-medium">
        Stability and capital preservation
      </div>
      <div className="mb-4 text-2xl font-semibold">
        The role of bonds in a portfolio
      </div>

      {/* Highlight box */}
      <div
        className="mb-6 rounded-[1.25rem] p-5"
        style={{
          background: brand.blueSoft,
          border: `1px solid ${brand.border}`,
        }}
      >
        <div
          className="text-xl font-semibold"
          style={{ color: brand.blueDeep }}
        >
          Bonds are not designed to compete with stocks
        </div>
        <div
          className="mt-2 text-sm md:text-base"
          style={{ color: brand.slate }}
        >
          Their role is to provide stability, help preserve capital, and support
          the portfolio during periods when stocks are declining.
        </div>
      </div>

      {/* Two column explanation */}
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className="mb-2 font-semibold">What bonds do well</div>
          <div
            className="text-sm leading-6 md:text-base"
            style={{ color: brand.slate }}
          >
            Bonds typically experience less volatility than stocks. They help
            reduce overall portfolio swings and provide a steadier component
            during difficult markets.
          </div>
        </div>
        <div>
          <div className="mb-2 font-semibold">What bonds are not meant to do</div>
          <div
            className="text-sm leading-6 md:text-base"
            style={{ color: brand.slate }}
          >
            Bonds are not expected to deliver the same long-term returns as
            stocks. They are not the primary growth engine of the portfolio.
          </div>
        </div>
      </div>

      {/* Second row */}
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className="mb-2 font-semibold">Why they matter</div>
          <div
            className="text-sm leading-6 md:text-base"
            style={{ color: brand.slate }}
          >
            When stocks decline, bonds can help stabilize the portfolio. This
            creates flexibility to meet spending needs without being forced to
            sell stocks at unfavorable times.
          </div>
        </div>
        <div>
          <div className="mb-2 font-semibold">How they fit</div>
          <div
            className="text-sm leading-6 md:text-base"
            style={{ color: brand.slate }}
          >
            A thoughtful allocation to bonds helps create a portfolio that can
            pursue growth while remaining tolerable during market downturns.
          </div>
        </div>
      </div>

      {/* Closing */}
      <div className="text-base font-medium">
        The purpose of bonds is not excitement — it is stability and resilience.
      </div>
    </div>
  );
}