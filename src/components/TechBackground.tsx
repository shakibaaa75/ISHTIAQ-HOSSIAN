// NOTE: this file no longer imports "framer-motion". Every decorative loop
// that used to be `repeat: Infinity` is now a plain CSS animation defined in
// tech-animations.css (make sure that file is imported globally, e.g. from
// main.tsx: `import "./styles/tech-animations.css";`). Nothing about the
// look changed — only how the animations are powered — and it's the fix for
// the device heating up: this file alone used to run 100+ concurrent
// JS-driven animation loops (68 of them just from the two DataStream
// columns).

import type { CSSProperties } from "react";

// Small helper so TS is happy about custom CSS properties (--ta-op-a, etc.)
const vars = (v: Record<string, string | number>) => v as CSSProperties;

// ═══════════════════════════════════════════════════════
//  ANIMATED OSCILLOSCOPE WAVEFORM
// ═══════════════════════════════════════════════════════
function OscilloscopeWave({
  type = "sine",
  className = "",
}: {
  type?: "sine" | "square" | "sawtooth";
  className?: string;
}) {
  const paths = {
    sine: "M0 30 Q25 5, 50 30 T100 30 T150 30 T200 30",
    square:
      "M0 30 H25 V10 H50 V30 H75 V10 H100 V30 H125 V10 H150 V30 H175 V10 H200 V30",
    sawtooth:
      "M0 30 L25 10 L25 30 L50 10 L50 30 L75 10 L75 30 L100 10 L100 30 L125 10 L125 30 L150 10 L150 30 L175 10 L175 30 L200 10 L200 30",
  };

  return (
    <svg viewBox="0 0 200 60" className={className} fill="none">
      <g opacity="0.2">
        {[0, 20, 40, 60, 80, 100].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="200"
            y2={y}
            stroke="currentColor"
            strokeWidth="0.3"
          />
        ))}
        {[0, 40, 80, 120, 160, 200].map((x) => (
          <line
            key={x}
            x1={x}
            y1="0"
            x2={x}
            y2="60"
            stroke="currentColor"
            strokeWidth="0.3"
          />
        ))}
      </g>
      <path
        d={paths[type]}
        stroke="currentColor"
        strokeWidth="1.5"
        className="ta-flicker"
        style={vars({ "--ta-op-b": 1, animationDuration: "2.5s" })}
      />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
//  ANIMATED MOTOR COIL
// ═══════════════════════════════════════════════════════
function MotorCoil({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      {[60, 80, 100].map((r, i) => (
        <ellipse
          key={r}
          cx="100"
          cy="100"
          rx={r}
          ry={r * 0.6}
          stroke="currentColor"
          strokeWidth="0.5"
          className="ta-pulse"
          style={vars({
            "--ta-op-a": 0.15,
            "--ta-op-b": 0.4,
            animationDuration: `${3 + i}s`,
          })}
        />
      ))}
      {[30, 42, 54, 66, 78].map((r, i) => (
        <circle
          key={r}
          cx="100"
          cy="100"
          r={r}
          stroke="currentColor"
          strokeWidth="0.8"
          className="ta-pulse"
          style={vars({
            "--ta-op-a": 0.3,
            "--ta-op-b": 0.7,
            animationDuration: "2s",
            animationDelay: `${i * 0.3}s`,
          })}
        />
      ))}
      <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="1" />
      <circle
        cx="100"
        cy="100"
        r="12"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <circle cx="100" cy="100" r="5" fill="currentColor" opacity="0.6" />
      <path d="M100 30 V10" stroke="currentColor" strokeWidth="1" />
      <path d="M100 170 V190" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="10" r="2" fill="currentColor" />
      <circle cx="100" cy="190" r="2" fill="currentColor" />
      <text
        x="92"
        y="8"
        fill="currentColor"
        fontSize="8"
        fontFamily="monospace"
        opacity="0.5"
      >
        N
      </text>
      <text
        x="92"
        y="198"
        fill="currentColor"
        fontSize="8"
        fontFamily="monospace"
        opacity="0.5"
      >
        S
      </text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
//  7-SEGMENT DISPLAY
// ═══════════════════════════════════════════════════════
function SevenSegmentDisplay({ className = "" }: { className?: string }) {
  const segmentMap: Record<string, string> = {
    "0": "M10 5 H30 M40 5 H60 M10 55 H30 M40 55 H60 M5 10 V25 M35 10 V25 M65 10 V25 M5 35 V50 M35 35 V50 M65 35 V50",
    "1": "M35 10 V25 M35 35 V50 M30 5 H40",
    "2": "M10 5 H30 M40 5 H60 M10 55 H30 M40 55 H60 M5 35 V50 M35 10 V25 M65 10 V25 M35 35 V50",
    "3": "M10 5 H30 M40 5 H60 M10 55 H30 M40 55 H60 M35 10 V25 M35 35 V50 M65 10 V25 M65 35 V50",
    "4": "M10 30 H30 M35 10 V25 M35 35 V50 M65 10 V25 M65 35 V50",
    "5": "M10 5 H30 M40 5 H60 M10 55 H30 M40 55 H60 M5 10 V25 M35 35 V50 M65 10 V25 M65 35 V50",
    "6": "M10 5 H30 M40 5 H60 M10 55 H30 M40 55 H60 M5 10 V25 M5 35 V50 M35 35 V50 M65 10 V25 M65 35 V50",
    "7": "M10 5 H30 M40 5 H60 M35 10 V25 M35 35 V50",
    "8": "M10 5 H30 M40 5 H60 M10 55 H30 M40 55 H60 M5 10 V25 M5 35 V50 M35 10 V25 M35 35 V50 M65 10 V25 M65 35 V50",
    "9": "M10 5 H30 M40 5 H60 M10 55 H30 M40 55 H60 M5 10 V25 M35 10 V25 M35 35 V50 M65 10 V25 M65 35 V50",
  };

  const digits = ["1", "2", "0", "5"];

  return (
    <svg viewBox="0 0 280 80" className={className} fill="none">
      <rect
        x="2"
        y="2"
        width="276"
        height="76"
        rx="4"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />
      <rect
        x="8"
        y="8"
        width="264"
        height="64"
        rx="2"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.3"
      />
      {digits.map((digit, i) => (
        <g
          key={i}
          transform={`translate(${20 + i * 65}, 10)`}
          className="ta-pulse"
          style={vars({
            "--ta-op-a": 0.2,
            "--ta-op-b": 0.9,
            animationDuration: "2.5s",
            animationDelay: `${i * 0.6}s`,
          })}
        >
          <path
            d={segmentMap[digit]}
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      ))}
      <circle cx="245" cy="60" r="3" fill="currentColor" opacity="0.6" />
      <text
        x="260"
        y="25"
        fill="currentColor"
        fontSize="10"
        fontFamily="monospace"
        opacity="0.6"
      >
        V
      </text>
      <text
        x="260"
        y="38"
        fill="currentColor"
        fontSize="6"
        fontFamily="monospace"
        opacity="0.5"
      >
        DC
      </text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
//  DRONE WIREFRAME
// ═══════════════════════════════════════════════════════
function DroneWireframe({ className = "" }: { className?: string }) {
  const rotors = [
    { cx: 150, cy: 50 },
    { cx: 250, cy: 150 },
    { cx: 150, cy: 250 },
    { cx: 50, cy: 150 },
  ];

  return (
    <svg viewBox="0 0 300 300" className={className} fill="none">
      <rect
        x="120"
        y="120"
        width="60"
        height="60"
        rx="8"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="130"
        y="130"
        width="40"
        height="40"
        rx="4"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.5"
      />
      <circle cx="150" cy="150" r="8" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="150" cy="150" r="3" fill="currentColor" opacity="0.6" />
      <line
        x1="150"
        y1="120"
        x2="150"
        y2="60"
        stroke="currentColor"
        strokeWidth="1"
      />
      <line
        x1="180"
        y1="150"
        x2="240"
        y2="150"
        stroke="currentColor"
        strokeWidth="1"
      />
      <line
        x1="150"
        y1="180"
        x2="150"
        y2="240"
        stroke="currentColor"
        strokeWidth="1"
      />
      <line
        x1="120"
        y1="150"
        x2="60"
        y2="150"
        stroke="currentColor"
        strokeWidth="1"
      />
      {rotors.map((pos, i) => (
        <g key={i}>
          <circle
            cx={pos.cx}
            cy={pos.cy}
            r="18"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx={pos.cx}
            cy={pos.cy}
            r="12"
            stroke="currentColor"
            strokeWidth="0.6"
          />
          <circle
            cx={pos.cx}
            cy={pos.cy}
            r="5"
            fill="currentColor"
            opacity="0.5"
          />
          <ellipse
            cx={pos.cx}
            cy={pos.cy}
            rx="22"
            ry="4"
            stroke="currentColor"
            strokeWidth="0.4"
            opacity="0.3"
            className="ta-spin"
            style={vars({
              animationDuration: `${0.2 + i * 0.08}s`,
              transformOrigin: `${pos.cx}px ${pos.cy}px`,
              transformBox: "view-box",
            })}
          />
        </g>
      ))}
      <path d="M135 180 L120 220" stroke="currentColor" strokeWidth="0.8" />
      <path d="M165 180 L180 220" stroke="currentColor" strokeWidth="0.8" />
      <line
        x1="110"
        y1="220"
        x2="190"
        y2="220"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <circle cx="150" cy="165" r="6" stroke="currentColor" strokeWidth="0.8" />
      <line
        x1="150"
        y1="171"
        x2="150"
        y2="178"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <rect
        x="144"
        y="178"
        width="12"
        height="8"
        rx="2"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <path
        d="M150 150 Q170 130, 190 150"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        className="ta-flicker"
        style={vars({ "--ta-op-b": 0.6, animationDuration: "2s" })}
      />
      <path
        d="M150 150 Q175 120, 200 150"
        stroke="currentColor"
        strokeWidth="0.4"
        fill="none"
        className="ta-flicker"
        style={vars({
          "--ta-op-b": 0.4,
          animationDuration: "2s",
          animationDelay: "0.3s",
        })}
      />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
//  LOGIC GATE CIRCUIT
// ═══════════════════════════════════════════════════════
function LogicGateCircuit({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 200" className={className} fill="none">
      <line
        x1="0"
        y1="50"
        x2="60"
        y2="50"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <line
        x1="0"
        y1="80"
        x2="60"
        y2="80"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <circle cx="0" cy="50" r="2" fill="currentColor" />
      <circle cx="0" cy="80" r="2" fill="currentColor" />
      <path
        d="M60 40 H80 Q100 40, 100 65 Q100 90, 80 90 H60 V40 Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="100" cy="65" r="4" stroke="currentColor" strokeWidth="0.8" />
      <text
        x="68"
        y="72"
        fill="currentColor"
        fontSize="10"
        fontFamily="monospace"
        opacity="0.6"
      >
        AND
      </text>
      <line
        x1="104"
        y1="65"
        x2="140"
        y2="65"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <line
        x1="0"
        y1="120"
        x2="120"
        y2="120"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <line
        x1="120"
        y1="120"
        x2="120"
        y2="100"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <circle cx="0" cy="120" r="2" fill="currentColor" />
      <path
        d="M140 55 Q150 55, 155 80 Q150 105, 140 105"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M140 55 Q130 55, 125 80 Q130 105, 140 105"
        stroke="currentColor"
        strokeWidth="1"
      />
      <line
        x1="125"
        y1="55"
        x2="140"
        y2="55"
        stroke="currentColor"
        strokeWidth="1"
      />
      <line
        x1="125"
        y1="105"
        x2="140"
        y2="105"
        stroke="currentColor"
        strokeWidth="1"
      />
      <text
        x="138"
        y="85"
        fill="currentColor"
        fontSize="10"
        fontFamily="monospace"
        opacity="0.6"
      >
        OR
      </text>
      <line
        x1="155"
        y1="80"
        x2="200"
        y2="80"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <polygon
        points="200,70 200,90 220,80"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="224" cy="80" r="4" stroke="currentColor" strokeWidth="0.8" />
      <text
        x="202"
        y="85"
        fill="currentColor"
        fontSize="8"
        fontFamily="monospace"
        opacity="0.6"
      >
        NOT
      </text>
      <line
        x1="228"
        y1="80"
        x2="280"
        y2="80"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <circle cx="280" cy="80" r="3" fill="currentColor" />
      <text
        x="5"
        y="45"
        fill="currentColor"
        fontSize="6"
        fontFamily="monospace"
        opacity="0.4"
      >
        A
      </text>
      <text
        x="5"
        y="75"
        fill="currentColor"
        fontSize="6"
        fontFamily="monospace"
        opacity="0.4"
      >
        B
      </text>
      <text
        x="5"
        y="115"
        fill="currentColor"
        fontSize="6"
        fontFamily="monospace"
        opacity="0.4"
      >
        C
      </text>
      <text
        x="285"
        y="75"
        fill="currentColor"
        fontSize="6"
        fontFamily="monospace"
        opacity="0.4"
      >
        Q
      </text>
      {/* Signal pulse traveling — same waypoints as before, now CSS-driven */}
      <circle
        r="2.5"
        fill="currentColor"
        className="ta-logic-signal"
        style={vars({ animationDuration: "4s" })}
      />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
//  SOLDERING IRON WITH PARTICLES
// ═══════════════════════════════════════════════════════
function SolderingIron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 200" className={className} fill="none">
      <rect
        x="55"
        y="120"
        width="40"
        height="60"
        rx="6"
        stroke="currentColor"
        strokeWidth="1"
      />
      <line
        x1="60"
        y1="130"
        x2="90"
        y2="130"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <line
        x1="60"
        y1="140"
        x2="90"
        y2="140"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <line
        x1="60"
        y1="150"
        x2="90"
        y2="150"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <line
        x1="60"
        y1="160"
        x2="90"
        y2="160"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <line
        x1="55"
        y1="135"
        x2="50"
        y2="135"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <line
        x1="55"
        y1="145"
        x2="50"
        y2="145"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <line
        x1="55"
        y1="155"
        x2="50"
        y2="155"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <line
        x1="95"
        y1="135"
        x2="100"
        y2="135"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <line
        x1="95"
        y1="145"
        x2="100"
        y2="145"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <line
        x1="95"
        y1="155"
        x2="100"
        y2="155"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <rect
        x="65"
        y="80"
        width="20"
        height="40"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <line
        x1="70"
        y1="85"
        x2="70"
        y2="115"
        stroke="currentColor"
        strokeWidth="0.3"
        opacity="0.5"
      />
      <line
        x1="80"
        y1="85"
        x2="80"
        y2="115"
        stroke="currentColor"
        strokeWidth="0.3"
        opacity="0.5"
      />
      <polygon
        points="68,80 82,80 78,50 72,50"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <line
        x1="72"
        y1="50"
        x2="78"
        y2="50"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="75"
        cy="48"
        r="6"
        fill="currentColor"
        className="ta-ring"
        style={vars({
          "--ta-r-a": 4,
          "--ta-r-b": 9,
          "--ta-op-a": 0.1,
          animationDuration: "1.5s",
        })}
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx={75 + (i - 2) * 3}
          cy="45"
          r={1.5 + i * 0.3}
          fill="currentColor"
          className="ta-rise"
          style={vars({
            "--ta-dx": `${(i - 2) * 7}px`,
            "--ta-dy": `${-(40 + i * 8)}px`,
            animationDuration: `${2 + i * 0.5}s`,
            animationDelay: `${i * 0.4}s`,
          })}
        />
      ))}
      <path
        d="M75 180 Q75 195, 60 200"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 2"
      />
      <text
        x="100"
        y="100"
        fill="currentColor"
        fontSize="6"
        fontFamily="monospace"
        opacity="0.4"
      >
        350°C
      </text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
//  BINARY DATA STREAM
// ═══════════════════════════════════════════════════════
function DataStream({ className = "" }: { className?: string }) {
  const bits = "10110100101101001011010010110100".split("");
  return (
    <svg viewBox="0 0 60 300" className={className} fill="none">
      {bits.map((bit, i) => (
        <text
          key={i}
          x="30"
          y={i * 14 + 10}
          fill="currentColor"
          fontSize="9"
          fontFamily="monospace"
          textAnchor="middle"
          className="ta-pulse"
          style={vars({
            "--ta-op-a": 0.1,
            "--ta-op-b": 0.7,
            animationDuration: "2s",
            animationDelay: `${i * 0.15}s`,
          })}
        >
          {bit}
        </text>
      ))}
      <line
        x1="30"
        y1="0"
        x2="30"
        y2="300"
        stroke="currentColor"
        strokeWidth="0.3"
        opacity="0.1"
        strokeDasharray="2 4"
      />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
//  BREADBOARD WITH JUMPER WIRES
// ═══════════════════════════════════════════════════════
function Breadboard({ className = "" }: { className?: string }) {
  const wires = [
    { d: "M30 55 Q50 35, 70 55", dash: undefined, delay: 0 },
    { d: "M90 70 Q110 45, 130 70", dash: "3 2", delay: 1 },
    { d: "M150 55 Q170 30, 190 55", dash: "1 3", delay: 2 },
    { d: "M210 70 Q230 45, 250 70", dash: undefined, delay: 3 },
  ];

  return (
    <svg viewBox="0 0 300 120" className={className} fill="none">
      <rect
        x="10"
        y="20"
        width="280"
        height="80"
        rx="4"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        x1="15"
        y1="30"
        x2="285"
        y2="30"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.2"
      />
      <line
        x1="15"
        y1="90"
        x2="285"
        y2="90"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.2"
      />
      {[40, 55, 70, 85].map((y) =>
        [30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250].map((x) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="2"
            stroke="currentColor"
            strokeWidth="0.3"
            opacity="0.15"
          />
        )),
      )}
      {wires.map((w, i) => (
        <path
          key={i}
          d={w.d}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray={w.dash}
          className="ta-flicker"
          style={vars({
            "--ta-op-b": 1,
            animationDuration: "4s",
            animationDelay: `${w.delay}s`,
          })}
        />
      ))}
      <rect
        x="110"
        y="45"
        width="40"
        height="20"
        rx="2"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
      />
      <circle cx="115" cy="50" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="115" cy="60" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="145" cy="50" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="145" cy="60" r="1.5" fill="currentColor" opacity="0.3" />
      <text
        x="125"
        y="58"
        fill="currentColor"
        fontSize="5"
        fontFamily="monospace"
        opacity="0.3"
      >
        IC
      </text>
      <polygon
        points="200,48 205,55 195,55"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.4"
      />
      <polygon
        points="200,48 205,55 195,55"
        fill="currentColor"
        className="ta-pulse"
        style={vars({
          "--ta-op-a": 0,
          "--ta-op-b": 0.4,
          animationDuration: "1.5s",
        })}
      />
      <line
        x1="200"
        y1="55"
        x2="200"
        y2="65"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.3"
      />
      <line
        x1="195"
        y1="55"
        x2="195"
        y2="65"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.3"
      />
      <path
        d="M50 55 H55 L57 50 L61 60 L65 50 L69 60 L71 55 H76"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
      />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
//  TRANSFORMER / E-I CORE
// ═══════════════════════════════════════════════════════
function TransformerCore({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      <rect
        x="30"
        y="40"
        width="25"
        height="120"
        rx="2"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="55"
        y="40"
        width="25"
        height="40"
        rx="2"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="55"
        y="120"
        width="25"
        height="40"
        rx="2"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="120"
        y="40"
        width="25"
        height="120"
        rx="2"
        stroke="currentColor"
        strokeWidth="1"
      />
      {[45, 55, 65, 75, 85, 95, 105, 115].map((y, i) => (
        <line
          key={y}
          x1="52"
          y1={y}
          x2="98"
          y2={y}
          stroke="currentColor"
          strokeWidth="0.8"
          className="ta-pulse"
          style={vars({
            "--ta-op-a": 0.2,
            "--ta-op-b": 0.6,
            animationDuration: "1.5s",
            animationDelay: `${i * 0.1}s`,
          })}
        />
      ))}
      {[50, 70, 90, 110, 130].map((y, i) => (
        <path
          key={y}
          d={`M20 ${y} H180`}
          stroke="currentColor"
          strokeWidth="0.4"
          className="ta-flicker"
          style={vars({
            "--ta-op-b": 0.3,
            animationDuration: "3s",
            animationDelay: `${i * 0.4}s`,
          })}
        />
      ))}
      <circle cx="48" cy="50" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="102" cy="110" r="2" fill="currentColor" opacity="0.5" />
      <text
        x="42"
        y="35"
        fill="currentColor"
        fontSize="7"
        fontFamily="monospace"
        opacity="0.4"
      >
        PRI
      </text>
      <text
        x="125"
        y="35"
        fill="currentColor"
        fontSize="7"
        fontFamily="monospace"
        opacity="0.4"
      >
        SEC
      </text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════
export default function TechBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Blueprint grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]">
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-[#1A1A1A] dark:text-white"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* 1. OSCILLOSCOPE WAVES — top left */}
      <div className="absolute top-[5%] left-[2%] w-[200px] sm:w-[260px] lg:w-[340px] opacity-[0.12] dark:opacity-[0.18] text-[#1A1A1A] dark:text-white hidden md:block">
        <OscilloscopeWave type="sine" className="w-full" />
      </div>
      <div className="absolute top-[14%] left-[6%] w-[160px] sm:w-[200px] opacity-[0.08] dark:opacity-[0.14] text-[#1A1A1A] dark:text-white hidden lg:block">
        <OscilloscopeWave type="square" className="w-full" />
      </div>

      {/* 2. MOTOR COIL — top right */}
      <div className="absolute top-[3%] right-[3%] w-[160px] sm:w-[220px] lg:w-[280px] opacity-[0.10] dark:opacity-[0.16] text-[#1A1A1A] dark:text-white hidden sm:block">
        <MotorCoil className="w-full" />
      </div>

      {/* 3. 7-SEGMENT DISPLAY — mid left */}
      <div className="absolute top-[38%] left-[1%] w-[180px] sm:w-[220px] lg:w-[280px] opacity-[0.10] dark:opacity-[0.16] text-[#1A1A1A] dark:text-white hidden lg:block">
        <SevenSegmentDisplay className="w-full" />
      </div>

      {/* 4. DRONE — mid right */}
      <div className="absolute top-[32%] right-[1%] w-[200px] sm:w-[260px] lg:w-[340px] opacity-[0.08] dark:opacity-[0.14] text-[#1A1A1A] dark:text-white hidden md:block">
        <DroneWireframe className="w-full" />
      </div>

      {/* 5. LOGIC GATES — bottom left */}
      <div className="absolute bottom-[12%] left-[3%] w-[220px] sm:w-[280px] lg:w-[360px] opacity-[0.10] dark:opacity-[0.16] text-[#1A1A1A] dark:text-white hidden sm:block">
        <LogicGateCircuit className="w-full" />
      </div>

      {/* 6. SOLDERING IRON — bottom right */}
      <div className="absolute bottom-[6%] right-[6%] w-[110px] sm:w-[140px] lg:w-[180px] opacity-[0.10] dark:opacity-[0.16] text-[#1A1A1A] dark:text-white hidden md:block">
        <SolderingIron className="w-full" />
      </div>

      {/* 7. DATA STREAM — right edge */}
      <div className="absolute top-[18%] right-[0.5%] w-[45px] sm:w-[55px] opacity-[0.08] dark:opacity-[0.14] text-[#1A1A1A] dark:text-white hidden lg:block">
        <DataStream className="w-full" />
      </div>
      <div className="absolute top-[52%] right-[0.3%] w-[35px] sm:w-[45px] opacity-[0.06] dark:opacity-[0.12] text-[#1A1A1A] dark:text-white hidden xl:block">
        <DataStream className="w-full" />
      </div>

      {/* 8. BREADBOARD — bottom center */}
      <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[300px] sm:w-[400px] lg:w-[500px] opacity-[0.08] dark:opacity-[0.14] text-[#1A1A1A] dark:text-white hidden sm:block">
        <Breadboard className="w-full" />
      </div>

      {/* 9. TRANSFORMER — mid-left lower */}
      <div className="absolute top-[58%] left-[8%] w-[120px] sm:w-[160px] lg:w-[200px] opacity-[0.07] dark:opacity-[0.13] text-[#1A1A1A] dark:text-white hidden lg:block">
        <TransformerCore className="w-full" />
      </div>

      {/* 10. SCHEMATIC SYMBOLS */}
      <svg
        viewBox="0 0 100 30"
        className="absolute top-[25%] left-[12%] w-[80px] sm:w-[100px] opacity-[0.08] dark:opacity-[0.14] text-[#1A1A1A] dark:text-white hidden lg:block"
        fill="none"
      >
        <path
          d="M0 15 H20 L25 5 L35 25 L45 5 L55 25 L65 5 L75 25 L80 15 H100"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="0" cy="15" r="2.5" fill="currentColor" />
        <circle cx="100" cy="15" r="2.5" fill="currentColor" />
      </svg>

      <svg
        viewBox="0 0 40 60"
        className="absolute top-[48%] left-[10%] w-[30px] sm:w-[40px] opacity-[0.07] dark:opacity-[0.12] text-[#1A1A1A] dark:text-white hidden xl:block"
        fill="none"
      >
        <line
          x1="10"
          y1="0"
          x2="10"
          y2="25"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="30"
          y1="0"
          x2="30"
          y2="25"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="25"
          x2="40"
          y2="25"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="0"
          y1="35"
          x2="40"
          y2="35"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="10"
          y1="35"
          x2="10"
          y2="60"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="30"
          y1="35"
          x2="30"
          y2="60"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <svg
        viewBox="0 0 60 40"
        className="absolute top-[60%] right-[16%] w-[50px] sm:w-[60px] opacity-[0.07] dark:opacity-[0.12] text-[#1A1A1A] dark:text-white hidden lg:block"
        fill="none"
      >
        <line
          x1="0"
          y1="20"
          x2="20"
          y2="20"
          stroke="currentColor"
          strokeWidth="1"
        />
        <polygon
          points="20,10 20,30 40,20"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <line
          x1="40"
          y1="10"
          x2="40"
          y2="30"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <line
          x1="40"
          y1="20"
          x2="60"
          y2="20"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <svg
        viewBox="0 0 100 30"
        className="absolute top-[72%] left-[18%] w-[70px] sm:w-[90px] opacity-[0.07] dark:opacity-[0.12] text-[#1A1A1A] dark:text-white hidden lg:block"
        fill="none"
      >
        <path
          d="M0 15 H10 Q15 5, 20 15 Q25 25, 30 15 Q35 5, 40 15 Q45 25, 50 15 Q55 5, 60 15 Q65 25, 70 15 Q75 5, 80 15 H100"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="0" cy="15" r="2" fill="currentColor" />
        <circle cx="100" cy="15" r="2" fill="currentColor" />
      </svg>

      <svg
        viewBox="0 0 40 30"
        className="absolute top-[82%] right-[22%] w-[35px] sm:w-[45px] opacity-[0.06] dark:opacity-[0.11] text-[#1A1A1A] dark:text-white hidden xl:block"
        fill="none"
      >
        <line
          x1="20"
          y1="0"
          x2="20"
          y2="15"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="5"
          y1="15"
          x2="35"
          y2="15"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="10"
          y1="20"
          x2="30"
          y2="20"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="15"
          y1="25"
          x2="25"
          y2="25"
          stroke="currentColor"
          strokeWidth="0.8"
        />
      </svg>

      {/* 11. HEX BOLT CLUSTER */}
      <svg
        viewBox="0 0 200 200"
        className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[140px] sm:w-[180px] lg:w-[220px] opacity-[0.06] dark:opacity-[0.10] text-[#1A1A1A] dark:text-white"
        fill="none"
      >
        <g transform="translate(100, 100)">
          <polygon
            points="0,-35 30.3,-17.5 30.3,17.5 0,35 -30.3,17.5 -30.3,-17.5"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <circle r="12" stroke="currentColor" strokeWidth="0.6" />
          <circle r="4" fill="currentColor" opacity="0.4" />
          <line
            x1="-6"
            y1="0"
            x2="6"
            y2="0"
            stroke="currentColor"
            strokeWidth="0.4"
          />
          <line
            x1="0"
            y1="-6"
            x2="0"
            y2="6"
            stroke="currentColor"
            strokeWidth="0.4"
          />
        </g>
        <g transform="translate(45, 45)" opacity="0.4">
          <polygon
            points="0,-18 15.6,-9 15.6,9 0,18 -15.6,9 -15.6,-9"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        </g>
        <g transform="translate(155, 45)" opacity="0.4">
          <polygon
            points="0,-18 15.6,-9 15.6,9 0,18 -15.6,9 -15.6,-9"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        </g>
        <g transform="translate(45, 155)" opacity="0.4">
          <polygon
            points="0,-18 15.6,-9 15.6,9 0,18 -15.6,9 -15.6,-9"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        </g>
        <g transform="translate(155, 155)" opacity="0.4">
          <polygon
            points="0,-18 15.6,-9 15.6,9 0,18 -15.6,9 -15.6,-9"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        </g>
      </svg>

      {/* 12. PULSING SIGNAL NODE */}
      <div className="absolute top-[45%] right-[28%] hidden lg:block opacity-[0.12]">
        <svg
          viewBox="0 0 60 60"
          className="w-[45px] text-[#1A1A1A] dark:text-white"
          fill="none"
        >
          <circle cx="30" cy="30" r="4" fill="currentColor" />
          <circle
            cx="30"
            cy="30"
            r="8"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="ta-ring"
            style={vars({
              "--ta-r-a": 8,
              "--ta-r-b": 28,
              "--ta-op-a": 0.5,
              animationDuration: "3s",
            })}
          />
          <circle
            cx="30"
            cy="30"
            r="14"
            stroke="currentColor"
            strokeWidth="0.3"
            fill="none"
            className="ta-ring"
            style={vars({
              "--ta-r-a": 14,
              "--ta-r-b": 38,
              "--ta-op-a": 0.3,
              animationDuration: "3s",
              animationDelay: "0.5s",
            })}
          />
        </svg>
      </div>

      {/* 13. CORNER BRACKETS */}
      <svg
        viewBox="0 0 60 60"
        className="absolute top-3 right-4 w-[30px] sm:w-[40px] opacity-[0.08] dark:opacity-[0.14] text-[#1A1A1A] dark:text-white"
        fill="none"
      >
        <path d="M60 0 H40 V10" stroke="currentColor" strokeWidth="1.2" />
        <path d="M60 0 V20" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="40" cy="10" r="2.5" fill="currentColor" />
        <circle cx="60" cy="20" r="2.5" fill="currentColor" />
      </svg>

      <svg
        viewBox="0 0 60 60"
        className="absolute bottom-3 left-4 w-[30px] sm:w-[40px] opacity-[0.08] dark:opacity-[0.14] text-[#1A1A1A] dark:text-white hidden sm:block"
        fill="none"
      >
        <path d="M0 60 H20 V50" stroke="currentColor" strokeWidth="1.2" />
        <path d="M0 60 V40" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="20" cy="50" r="2.5" fill="currentColor" />
        <circle cx="0" cy="40" r="2.5" fill="currentColor" />
      </svg>

      {/* 14. SMALL ROTATING GEAR — bottom right area */}
      <svg
        viewBox="0 0 80 80"
        className="absolute bottom-[25%] right-[2%] w-[50px] sm:w-[65px] lg:w-[80px] opacity-[0.07] dark:opacity-[0.12] text-[#1A1A1A] dark:text-white hidden md:block ta-spin"
        fill="none"
        style={vars({ animationDuration: "25s", transformOrigin: "50% 50%" })}
      >
        <circle
          cx="40"
          cy="40"
          r="22"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="40"
            y1="18"
            x2="40"
            y2="12"
            stroke="currentColor"
            strokeWidth="1"
            transform={`rotate(${i * 45} 40 40)`}
          />
        ))}
        <circle
          cx="40"
          cy="40"
          r="10"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <circle cx="40" cy="40" r="4" fill="currentColor" opacity="0.5" />
      </svg>
    </div>
  );
}
