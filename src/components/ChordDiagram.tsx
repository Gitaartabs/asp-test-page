type Props = {
  name: string;
  // Frets per string, low E (6th) → high E (1st).
  // -1 = muted (X), 0 = open (O), >=1 = fretted note.
  frets: [number, number, number, number, number, number];
  // Optional finger numbers per string (1=index, 2=middle, 3=ring, 4=pinky).
  // Use 0 or undefined for "no finger label".
  fingers?: [number, number, number, number, number, number];
  // First fret shown in the diagram. When > 1, a "fr.X" label appears.
  startFret?: number;
  // Optional barre: { fret, fromString, toString } where strings are 1..6 (1 = high E).
  barre?: { fret: number; fromString: number; toString: number };
  // Visual size in pixels.
  size?: number;
};

export default function ChordDiagram({
  name,
  frets,
  fingers,
  startFret = 1,
  barre,
  size = 140,
}: Props) {
  const numStrings = 6;
  const numFrets = 5;

  // Layout: strings vertical, low E on the LEFT (index 0).
  const padX = 14;
  const padTop = 28;
  const padBottom = 14;
  const width = size;
  const height = size * 1.15;
  const gridW = width - padX * 2;
  const gridH = height - padTop - padBottom;
  const stringGap = gridW / (numStrings - 1);
  const fretGap = gridH / numFrets;

  const stringX = (s: number) => padX + s * stringGap; // s: 0..5 (low E → high E)
  const fretY = (f: number) => padTop + f * fretGap; // f: 0..numFrets

  const showNutLine = startFret === 1;

  return (
    <div className="inline-flex flex-col items-center">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="select-none"
        aria-label={`Chord diagram: ${name}`}
      >
        {/* Title */}
        <text
          x={width / 2}
          y={14}
          textAnchor="middle"
          className="fill-white"
          style={{ font: "600 13px ui-sans-serif, system-ui" }}
        >
          {name}
        </text>

        {/* Nut (thick top line) when on first position */}
        {showNutLine && (
          <line
            x1={padX - 1}
            y1={padTop}
            x2={width - padX + 1}
            y2={padTop}
            stroke="currentColor"
            strokeWidth={4}
            className="text-white"
          />
        )}

        {/* "fr.X" indicator for higher positions */}
        {!showNutLine && (
          <text
            x={padX - 6}
            y={padTop + fretGap / 2 + 4}
            textAnchor="end"
            className="fill-white/60"
            style={{ font: "500 10px ui-sans-serif, system-ui" }}
          >
            {startFret}fr
          </text>
        )}

        {/* Frets (horizontal) */}
        {Array.from({ length: numFrets + 1 }).map((_, i) => (
          <line
            key={`fret-${i}`}
            x1={padX}
            y1={fretY(i)}
            x2={width - padX}
            y2={fretY(i)}
            stroke="currentColor"
            strokeWidth={i === 0 && showNutLine ? 0 : 1}
            className="text-white/35"
          />
        ))}

        {/* Strings (vertical) */}
        {Array.from({ length: numStrings }).map((_, s) => (
          <line
            key={`string-${s}`}
            x1={stringX(s)}
            y1={padTop}
            x2={stringX(s)}
            y2={padTop + gridH}
            stroke="currentColor"
            strokeWidth={1}
            className="text-white/55"
          />
        ))}

        {/* Open / muted markers above the nut */}
        {frets.map((f, s) => {
          if (f === 0) {
            return (
              <circle
                key={`open-${s}`}
                cx={stringX(s)}
                cy={padTop - 9}
                r={4.5}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="text-white/80"
              />
            );
          }
          if (f === -1) {
            return (
              <text
                key={`mute-${s}`}
                x={stringX(s)}
                y={padTop - 5}
                textAnchor="middle"
                className="fill-white/70"
                style={{ font: "700 11px ui-sans-serif, system-ui" }}
              >
                ×
              </text>
            );
          }
          return null;
        })}

        {/* Barre */}
        {barre && (
          <rect
            x={stringX(numStrings - barre.fromString) - 7}
            y={fretY(barre.fret - startFret) + fretGap / 2 - 7}
            width={
              stringX(numStrings - barre.toString) -
              stringX(numStrings - barre.fromString) +
              14
            }
            height={14}
            rx={7}
            className="fill-brand-400"
          />
        )}

        {/* Finger dots */}
        {frets.map((f, s) => {
          if (f <= 0) return null;
          const localFret = f - startFret + 1;
          if (localFret < 1 || localFret > numFrets) return null;
          const cx = stringX(s);
          const cy = fretY(localFret) - fretGap / 2;
          const finger = fingers?.[s];
          return (
            <g key={`dot-${s}`}>
              <circle cx={cx} cy={cy} r={9} className="fill-brand-400" />
              {finger ? (
                <text
                  x={cx}
                  y={cy + 3.5}
                  textAnchor="middle"
                  className="fill-brand-950"
                  style={{ font: "700 10px ui-sans-serif, system-ui" }}
                >
                  {finger}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
