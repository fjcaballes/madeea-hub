// Madeline's animated "orb" — a morphing gradient sphere wrapped in a cloud of
// 60 orbiting particles (3D). The orbit geometry is authored for a 126px logical
// sphere (see orb.css keyframes) and scaled to the requested display size.
//
// NOTE: the scale lives on a dedicated wrapper, NOT on `.orb-float`. The float
// animation drives `transform`, which would otherwise clobber an inline scale
// and render the orb at full 126px.
const LOGICAL = 126;
// Many more particles than orbit keyframes (60) — extras reuse orbits with
// distinct durations/delays so the cloud looks dense without new keyframes.
const COUNT = 300;
const PARTICLES = Array.from({ length: COUNT }, (_, i) => ({
  hue: 16 + Math.round((i / (COUNT - 1)) * 8),
  duration: (4 + ((i * 7) % 30) / 10).toFixed(2),
  delay: (i * 0.011).toFixed(2),
  orbit: `orbit${(i % 60) + 1}`,
}));

export function Orb({ size = 44 }: { size?: number }) {
  const scale = size / LOGICAL;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size, overflow: "visible" }} aria-hidden="true">
      {/* Scaling wrapper (no animation) so the scale is never overridden. */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{ width: LOGICAL, height: LOGICAL, marginLeft: -LOGICAL / 2, marginTop: -LOGICAL / 2, transform: `scale(${scale})`, overflow: "visible" }}
      >
        <div className="orb-float relative h-full w-full">
          <div className="orb-sphere" />
          <div className="orb-spin">
            {PARTICLES.map((p, i) => (
              <span
                key={i}
                className="orb-particle"
                style={{
                  background: `hsl(${p.hue},100%,58%)`,
                  animation: `${p.orbit} ${p.duration}s ease-in-out infinite`,
                  animationDelay: `${p.delay}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
