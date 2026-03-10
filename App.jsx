import { useState, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
  pink: "#E91E8C",
  pinkLight: "#FF4DB2",
  pinkDark: "#C01070",
  purple: "#7C3AED",
  purpleLight: "#9F67FF",
  cyan: "#06B6D4",
  orange: "#F59E0B",
  green: "#10B981",
  red: "#EF4444",
  bg: "#F8F8FC",
  white: "#FFFFFF",
  card: "#FFFFFF",
  charcoal: "#1E1B3A",
  gray: "#6B7280",
  grayLight: "#E5E7EB",
  sidebarBorder: "#E91E8C",
};

const gradients = {
  pink: "linear-gradient(135deg, #E91E8C 0%, #FF6B9D 100%)",
  purple: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
  cyan: "linear-gradient(135deg, #06B6D4 0%, #38BDF8 100%)",
  orange: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
  green: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
  darkHeader: "linear-gradient(90deg, #1E1B3A 0%, #2D2D4E 100%)",
};

// ─── MOCK DATA GENERATORS ─────────────────────────────────────────────────────
const genTrend = (base, len = 12, variance = 10) =>
  Array.from({ length: len }, (_, i) => ({
    t: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
    v: Math.max(0, base + Math.sin(i * 0.7) * variance + (Math.random() - 0.5) * variance * 0.5),
  }));

const genHourly = (base, len = 24) =>
  Array.from({ length: len }, (_, i) => ({
    t: `${String(i).padStart(2,"0")}:00`,
    v: Math.max(0, base + Math.sin(i * 0.4) * 15 + (Math.random() - 0.5) * 10),
    v2: Math.max(0, base * 0.85 + Math.cos(i * 0.3) * 12 + (Math.random() - 0.5) * 8),
  }));

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
const Card = ({ children, style = {}, className = "" }) => (
  <div style={{
    background: T.white, borderRadius: 12, boxShadow: "0 2px 16px rgba(30,27,58,0.08)",
    padding: 20, ...style
  }} className={className}>
    {children}
  </div>
);

const GradCard = ({ title, value, sub, gradient, icon, trend }) => (
  <div style={{
    background: gradient, borderRadius: 12, padding: "20px 22px",
    color: T.white, position: "relative", overflow: "hidden", minWidth: 160
  }}>
    <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.85, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{title}</div>
    <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>{sub}</div>
    {trend && (
      <div style={{ position: "absolute", bottom: 8, right: 8, opacity: 0.3, fontSize: 28 }}>{icon}</div>
    )}
    <svg style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: 0.18 }} viewBox="0 0 200 40" height="40" width="100%">
      <path d="M0,30 Q30,10 60,25 T120,20 T180,15 T200,10 L200,40 L0,40Z" fill="white"/>
    </svg>
  </div>
);

const Badge = ({ label, color }) => {
  const colors = {
    pink: { bg: "#FFF0F8", text: T.pink },
    purple: { bg: "#F3EEFF", text: T.purple },
    cyan: { bg: "#E0F9FF", text: T.cyan },
    green: { bg: "#E6FBF5", text: T.green },
    orange: { bg: "#FFF8E6", text: T.orange },
    red: { bg: "#FFF0F0", text: T.red },
  };
  const c = colors[color] || colors.pink;
  return (
    <span style={{
      background: c.bg, color: c.text, borderRadius: 20,
      padding: "2px 10px", fontSize: 11, fontWeight: 600
    }}>{label}</span>
  );
};

const SectionTitle = ({ title, sub }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ fontSize: 16, fontWeight: 700, color: T.charcoal }}>{title}</div>
    {sub && <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>{sub}</div>}
  </div>
);

const IOTable = ({ inputs, outputs }) => (
  <Card>
    <SectionTitle title="Monitoring Parameters & Outputs" />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.gray, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
          📥 Input Parameters
        </div>
        {inputs.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "7px 10px", borderRadius: 8, marginBottom: 4,
            background: i % 2 === 0 ? "#FAFAFA" : T.white,
            border: "1px solid #F0F0F8"
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: T.pink, flexShrink: 0 }}/>
            <span style={{ fontSize: 12, color: T.charcoal, fontWeight: 500 }}>{item}</span>
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.gray, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
          📊 Output Reports
        </div>
        {outputs.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "7px 10px", borderRadius: 8, marginBottom: 4,
            background: i % 2 === 0 ? "#FFF8FC" : T.white,
            border: "1px solid #F8EEFF"
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: T.purple, flexShrink: 0 }}/>
            <span style={{ fontSize: 12, color: T.charcoal, fontWeight: 500 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  </Card>
);

const HealthGauge = ({ label, value, color }) => {
  const data = [{ value }, { value: 100 - value }];
  const colors_map = {
    green: T.green, orange: T.orange, red: T.red, pink: T.pink, purple: T.purple, cyan: T.cyan
  };
  const c = colors_map[color] || T.pink;
  return (
    <div style={{ textAlign: "center", padding: "8px 4px" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <PieChart width={90} height={90}>
          <Pie data={data} innerRadius={30} outerRadius={42} startAngle={90} endAngle={-270} dataKey="value" strokeWidth={0}>
            <Cell fill={c}/>
            <Cell fill="#F0F0F8"/>
          </Pie>
        </PieChart>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: c }}>{value}%</span>
        </div>
      </div>
      <div style={{ fontSize: 11, color: T.gray, marginTop: 4, fontWeight: 600 }}>{label}</div>
    </div>
  );
};

const AlertRow = ({ asset, issue, severity, time }) => {
  const sevColors = { Critical: "red", High: "orange", Medium: "purple", Low: "cyan" };
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "10px 12px", borderRadius: 8,
      background: T.bg, marginBottom: 6, border: "1px solid #EBEBF8"
    }}>
      <span style={{ fontSize: 16 }}>
        {severity === "Critical" ? "🔴" : severity === "High" ? "🟠" : severity === "Medium" ? "🟣" : "🔵"}
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: T.charcoal }}>{asset}</div>
        <div style={{ fontSize: 11, color: T.gray }}>{issue}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
        <Badge label={severity} color={sevColors[severity]}/>
        <span style={{ fontSize: 10, color: T.gray }}>{time}</span>
      </div>
    </div>
  );
};

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const navItems = [
  { id: "turbine", label: "Turbine", icon: "⚙️" },
  { id: "boiler", label: "Boiler", icon: "🔥" },
  { id: "chp", label: "CHP", icon: "⛏️" },
  { id: "ahp", label: "AHP", icon: "💧" },
  { id: "espfgd", label: "ESP/FGD", icon: "🌿" },
  { id: "apc", label: "APC", icon: "⚡" },
  { id: "mod", label: "MOD Prediction", icon: "📈" },
];

const Sidebar = ({ active, setActive }) => (
  <div style={{
    width: 220, background: T.white, height: "100vh", position: "fixed", left: 0, top: 0,
    borderRight: "1px solid #F0F0F8", display: "flex", flexDirection: "column",
    boxShadow: "4px 0 24px rgba(30,27,58,0.06)", zIndex: 100
  }}>
    {/* Pink left accent */}
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: gradients.pink, borderRadius: "0 4px 4px 0" }}/>

    {/* Logo */}
    <div style={{ padding: "24px 20px 16px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: gradients.pink, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: T.charcoal, letterSpacing: -0.5 }}>PowerAI</div>
          <div style={{ fontSize: 10, color: T.gray, fontWeight: 600 }}>Asset Intelligence</div>
        </div>
      </div>
    </div>

    <div style={{ padding: "0 12px", marginBottom: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: T.gray, textTransform: "uppercase", letterSpacing: 1.2, padding: "0 8px", marginBottom: 6 }}>Dashboards</div>
    </div>

    {navItems.map(item => (
      <button key={item.id} onClick={() => setActive(item.id)} style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "11px 20px 11px 24px", border: "none", cursor: "pointer",
        background: active === item.id ? "linear-gradient(90deg, #FFF0F8, #FAFAFA)" : "transparent",
        color: active === item.id ? T.pink : T.gray,
        fontWeight: active === item.id ? 700 : 500,
        fontSize: 13, textAlign: "left", width: "100%",
        borderLeft: active === item.id ? `3px solid ${T.pink}` : "3px solid transparent",
        transition: "all 0.2s",
      }}>
        <span style={{ fontSize: 16 }}>{item.icon}</span>
        {item.label}
        {active === item.id && <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: 3, background: T.pink }}/>}
      </button>
    ))}

    <div style={{ marginTop: "auto", padding: 16 }}>
      <div style={{ background: gradients.pink, borderRadius: 12, padding: "14px 16px", color: T.white }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>⚙️ System Status</div>
        <div style={{ fontSize: 11, opacity: 0.85, marginTop: 4 }}>All units online</div>
        <div style={{ fontSize: 11, marginTop: 6, background: "rgba(255,255,255,0.25)", borderRadius: 6, padding: "3px 8px", display: "inline-block" }}>LIVE</div>
      </div>
    </div>
  </div>
);

// ─── HEADER ───────────────────────────────────────────────────────────────────
const Header = ({ title, sub }) => (
  <div style={{
    background: T.white, padding: "16px 28px", borderBottom: "1px solid #F0F0F8",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    boxShadow: "0 2px 8px rgba(30,27,58,0.04)"
  }}>
    <div>
      <div style={{ fontSize: 20, fontWeight: 800, color: T.charcoal, letterSpacing: -0.5 }}>{title}</div>
      <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>{sub}</div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ fontSize: 11, color: T.gray, background: T.bg, padding: "6px 14px", borderRadius: 20, border: "1px solid #EBEBF8" }}>
        🕐 {new Date().toLocaleTimeString()}
      </div>
      <div style={{ width: 10, height: 10, borderRadius: 5, background: T.green, boxShadow: `0 0 6px ${T.green}` }}/>
      <div style={{ width: 36, height: 36, borderRadius: 18, background: gradients.pink, display: "flex", alignItems: "center", justifyContent: "center", color: T.white, fontSize: 14, fontWeight: 700 }}>
        AI
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD 1: TURBINE
// ═══════════════════════════════════════════════════════════════════════════════
const TurbineDashboard = () => {
  const vibData = genHourly(45, 24);
  const tempData = genTrend(78, 12, 8);
  const effData = genTrend(88, 12, 5);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        <GradCard title="Turbine Health" value="94%" sub="HPT + IPT + LPT" gradient={gradients.pink} icon="⚙️" trend />
        <GradCard title="Vibration Level" value="2.3mm/s" sub="Within safe limits" gradient={gradients.purple} icon="〰️" trend />
        <GradCard title="Bearing Temp" value="68°C" sub="Normal range" gradient={gradients.cyan} icon="🌡️" trend />
        <GradCard title="Efficiency" value="87.4%" sub="vs 89.1% target" gradient={gradients.orange} icon="⚡" trend />
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
        <Card>
          <SectionTitle title="Vibration Anomaly — 24hr Trend" sub="HPT Shaft Vibration (mm/s)" />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={vibData}>
              <defs>
                <linearGradient id="vg1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.pink} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={T.pink} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="vg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.purple} stopOpacity={0.25}/>
                  <stop offset="95%" stopColor={T.purple} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F8"/>
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: T.gray }} interval={3}/>
              <YAxis tick={{ fontSize: 10, fill: T.gray }}/>
              <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}/>
              <Area type="monotone" dataKey="v" stroke={T.pink} strokeWidth={2.5} fill="url(#vg1)" name="HPT"/>
              <Area type="monotone" dataKey="v2" stroke={T.purple} strokeWidth={2} fill="url(#vg2)" name="LPT"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Component Health Index" sub="Real-time status" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
            {[
              { label: "HPT", val: 91, color: "green" },
              { label: "IPT", val: 87, color: "green" },
              { label: "LPT", val: 83, color: "orange" },
              { label: "Generator", val: 95, color: "green" },
              { label: "Condenser", val: 78, color: "orange" },
              { label: "BFP", val: 88, color: "green" },
            ].map(item => <HealthGauge key={item.label} {...item} />)}
          </div>
        </Card>
      </div>

      {/* Efficiency & Alerts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <SectionTitle title="Turbine Efficiency Degradation" sub="Monthly analysis" />
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={effData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F8"/>
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: T.gray }}/>
              <YAxis domain={[75, 100]} tick={{ fontSize: 10, fill: T.gray }}/>
              <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}/>
              <Line type="monotone" dataKey="v" stroke={T.purple} strokeWidth={2.5} dot={{ fill: T.purple, r: 3 }}/>
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Active Alerts" sub="Predictive maintenance flags" />
          <AlertRow asset="LPT Bearing #3" issue="Bearing temperature trending upward" severity="Medium" time="2h ago"/>
          <AlertRow asset="Turbine Control Valve #2" issue="Valve passing detected — 0.4% leakage" severity="High" time="5h ago"/>
          <AlertRow asset="MOP Oil System" issue="Oil anomaly: viscosity deviation" severity="Low" time="1d ago"/>
          <AlertRow asset="Condenser" issue="RUL estimated at 14 days" severity="Critical" time="12m ago"/>
        </Card>
      </div>

      <IOTable
        inputs={["HPT","IPT","LPT","Generator","MOP","Governing System","Turning Gear","Condenser","Turbine Control Valves","BFP","CEP","CWP"]}
        outputs={["Vibration Anomaly Prediction","Oil Anomaly Detection","Bearing Temperature Prediction","Generator Stator Insulation Deterioration","Turbine Efficiency Degradation Analysis","Valves Passing Prediction","Spares Planning","Maintenance Planning Suggestions","Recommended Corrective Action"]}
      />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD 2: BOILER
// ═══════════════════════════════════════════════════════════════════════════════
const BoilerDashboard = () => {
  const tempData = genHourly(520, 24);
  const millData = [
    { name: "Mill A", health: 88 }, { name: "Mill B", health: 72 },
    { name: "Mill C", health: 91 }, { name: "Mill D", health: 65 },
    { name: "Mill E", health: 84 }, { name: "Mill F", health: 78 },
  ];
  const aphData = genTrend(12, 8, 3);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        <GradCard title="Boiler Health" value="86%" sub="Overall unit health" gradient={gradients.orange} icon="🔥" trend />
        <GradCard title="Steam Temp" value="537°C" sub="Main steam" gradient={gradients.pink} icon="🌡️" trend />
        <GradCard title="APH Fouling" value="8.2%" sub="Above 6% threshold" gradient={gradients.purple} icon="⚠️" trend />
        <GradCard title="Mill Health" value="79.7%" sub="Avg. 6 mills" gradient={gradients.cyan} icon="⚙️" trend />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
        <Card>
          <SectionTitle title="Metal Temperature Monitoring" sub="Pressure part temperature (°C)" />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={tempData}>
              <defs>
                <linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.orange} stopOpacity={0.35}/>
                  <stop offset="95%" stopColor={T.orange} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F8"/>
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: T.gray }} interval={3}/>
              <YAxis tick={{ fontSize: 10, fill: T.gray }}/>
              <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}/>
              <Area type="monotone" dataKey="v" stroke={T.orange} strokeWidth={2.5} fill="url(#bg1)" name="Metal Temp"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Coal Mill Health Index" sub="Per mill status" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={millData} layout="vertical" margin={{ left: 10, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F8" horizontal={false}/>
              <XAxis type="number" domain={[0,100]} tick={{ fontSize: 10, fill: T.gray }}/>
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: T.charcoal }} width={50}/>
              <Tooltip contentStyle={{ borderRadius: 8, border: "none" }}/>
              <Bar dataKey="health" radius={[0,6,6,0]}>
                {millData.map((entry, i) => (
                  <Cell key={i} fill={entry.health > 85 ? T.green : entry.health > 70 ? T.orange : T.red}/>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <SectionTitle title="APH Fouling Trend" sub="Air Pre-heater fouling % over time" />
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={aphData}>
              <defs>
                <linearGradient id="aphg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.purple} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={T.purple} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F8"/>
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: T.gray }}/>
              <YAxis tick={{ fontSize: 10, fill: T.gray }}/>
              <Tooltip contentStyle={{ borderRadius: 8, border: "none" }}/>
              <Area type="monotone" dataKey="v" stroke={T.purple} strokeWidth={2.5} fill="url(#aphg)" name="APH Fouling %"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Predictive Alerts" sub="Boiler health flags" />
          <AlertRow asset="ID Fan Bearing #2" issue="Bearing failure predicted in 7 days" severity="Critical" time="30m ago"/>
          <AlertRow asset="Coal Feeder C" issue="BTL degradation detected" severity="High" time="2h ago"/>
          <AlertRow asset="APH West" issue="Fouling above threshold — cleaning due" severity="Medium" time="4h ago"/>
          <AlertRow asset="Boiler Pressure Part" issue="RUL analysis: 34 days remaining" severity="Low" time="6h ago"/>
        </Card>
      </div>

      <IOTable
        inputs={["Boiler Pressure Part","Metal Temperature Monitoring","Thickness Survey","Weld Joint History","Component Degradation & RUL","Coal Mills","Coal Feeders","ID Fan","FD Fan","PA Fan","APH","Soot Blowers","Burners","Flame Scanners","Igniters","Oil Guns"]}
        outputs={["Vibration Anomaly Prediction","Oil Anomaly Detection","Bearing Temperature Prediction","RUL of Pressure Parts","BTL Prediction","Mill Health Index","APH Fouling","Fan Bearing Failure","Spares Planning","Maintenance Planning Suggestions","Recommended Corrective Action"]}
      />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD 3: CHP
// ═══════════════════════════════════════════════════════════════════════════════
const CHPDashboard = () => {
  const conveyorData = genHourly(72, 24);
  const beltData = [
    { name: "Belt 1A", wear: 23 }, { name: "Belt 2B", wear: 47 },
    { name: "Belt 3C", wear: 18 }, { name: "Belt 4D", wear: 68 },
    { name: "Belt 5E", wear: 35 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        <GradCard title="CHP Health Index" value="82%" sub="Coal handling plant" gradient={gradients.cyan} icon="⛏️" trend />
        <GradCard title="Coal Throughput" value="4,820 T" sub="Today vs 5,200T plan" gradient={gradients.pink} icon="📦" trend />
        <GradCard title="Crusher Efficiency" value="91%" sub="2 of 3 crushers active" gradient={gradients.purple} icon="🔨" trend />
        <GradCard title="Stacker Reclaimer" value="Active" sub="SR #1 — Normal ops" gradient={gradients.green} icon="🏗️" trend />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
        <Card>
          <SectionTitle title="Conveyor Belt Performance — 24hr" sub="Belt speed anomaly index" />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={conveyorData}>
              <defs>
                <linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.cyan} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={T.cyan} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F8"/>
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: T.gray }} interval={3}/>
              <YAxis tick={{ fontSize: 10, fill: T.gray }}/>
              <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}/>
              <Area type="monotone" dataKey="v" stroke={T.cyan} strokeWidth={2.5} fill="url(#cg1)" name="Performance Index"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Belt Wear Prediction" sub="Current wear level %" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={beltData} layout="vertical" margin={{ left: 10, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F8" horizontal={false}/>
              <XAxis type="number" domain={[0,100]} tick={{ fontSize: 10, fill: T.gray }}/>
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: T.charcoal }} width={52}/>
              <Tooltip contentStyle={{ borderRadius: 8, border: "none" }}/>
              <Bar dataKey="wear" radius={[0,6,6,0]}>
                {beltData.map((entry, i) => (
                  <Cell key={i} fill={entry.wear < 30 ? T.green : entry.wear < 60 ? T.orange : T.red}/>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <SectionTitle title="Equipment Status" sub="Real-time monitoring" />
          {[
            { name: "Wagon Tippler #1", status: "Normal", badge: "green" },
            { name: "Wagon Tippler #2", status: "Maintenance Due", badge: "orange" },
            { name: "Wobbler Feeder A", status: "Normal", badge: "green" },
            { name: "Crusher #1", status: "Critical — Stop", badge: "red" },
            { name: "Magnetic Separator", status: "Normal", badge: "green" },
            { name: "Belt Weigher B2", status: "Calibration Due", badge: "purple" },
            { name: "Locomotive L3", status: "Engine Alert", badge: "orange" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: 8, marginBottom: 4, background: T.bg, border: "1px solid #EBEBF8" }}>
              <span style={{ fontSize: 12, color: T.charcoal, fontWeight: 500 }}>⚙️ {item.name}</span>
              <Badge label={item.status} color={item.badge}/>
            </div>
          ))}
        </Card>

        <Card>
          <SectionTitle title="Predictive Alerts" sub="CHP failure flags" />
          <AlertRow asset="Crusher #1 Hammer" issue="Hammer wear at 82% — replacement due" severity="Critical" time="1h ago"/>
          <AlertRow asset="SR Gearbox" issue="Gearbox failure probability: 34%" severity="High" time="3h ago"/>
          <AlertRow asset="Belt 4D" issue="Conveyor belt failure risk elevated" severity="High" time="4h ago"/>
          <AlertRow asset="Locomotive L3" issue="Engine failure pattern detected" severity="Medium" time="8h ago"/>
        </Card>
      </div>

      <IOTable
        inputs={["Wagon Tipplers","Conveyor Belts","Wobbler Feeders","Crushers","Stacker Reclaimers","Magnetic Separators","Belt Weighers","Apron Feeders","Locomotives"]}
        outputs={["Conveyor Belt Failure Prediction","Crusher Hammer Wear Prediction","Bearing Temperature Prediction","SR Gearbox Failure Prediction","Loco Engine Failure Prediction","Bull Dozer Engine Failure Prediction","Spares Planning","Maintenance Planning Suggestions","Recommended Corrective Action"]}
      />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD 4: AHP
// ═══════════════════════════════════════════════════════════════════════════════
const AHPDashboard = () => {
  const pumpData = genHourly(65, 24);
  const siloData = genTrend(58, 12, 12);
  const waterData = [
    { name: "HP Pumps", consumption: 320 },
    { name: "LP Pumps", consumption: 210 },
    { name: "Slurry Pumps", consumption: 480 },
    { name: "Jet Pumps", consumption: 145 },
    { name: "GEHO Pumps", consumption: 380 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        <GradCard title="AHP Health Index" value="88%" sub="Ash handling plant" gradient={gradients.purple} icon="💧" trend />
        <GradCard title="Silo Level" value="67%" sub="Dry ash silos avg." gradient={gradients.cyan} icon="🏗️" trend />
        <GradCard title="Pump Wear" value="23%" sub="Slurry pump wear index" gradient={gradients.pink} icon="⚙️" trend />
        <GradCard title="Water Consumption" value="1,535 m³/h" sub="Specific consumption" gradient={gradients.orange} icon="💦" trend />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
        <Card>
          <SectionTitle title="Slurry Pump Wear Prediction" sub="Impeller wear index — 24hr" />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={pumpData}>
              <defs>
                <linearGradient id="apg1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.purple} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={T.purple} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F8"/>
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: T.gray }} interval={3}/>
              <YAxis tick={{ fontSize: 10, fill: T.gray }}/>
              <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}/>
              <Area type="monotone" dataKey="v" stroke={T.purple} strokeWidth={2.5} fill="url(#apg1)" name="Wear Index"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Water Consumption by System" sub="m³/hr by pump type" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={waterData} layout="vertical" margin={{ left: 10, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F8" horizontal={false}/>
              <XAxis type="number" tick={{ fontSize: 10, fill: T.gray }}/>
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: T.charcoal }} width={70}/>
              <Tooltip contentStyle={{ borderRadius: 8, border: "none" }}/>
              <Bar dataKey="consumption" fill={T.purple} radius={[0,6,6,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <SectionTitle title="Silo Level Forecasting" sub="Projected dry ash silo levels (%)" />
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={siloData}>
              <defs>
                <linearGradient id="slg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.cyan} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={T.cyan} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F8"/>
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: T.gray }}/>
              <YAxis tick={{ fontSize: 10, fill: T.gray }}/>
              <Tooltip contentStyle={{ borderRadius: 8, border: "none" }}/>
              <Area type="monotone" dataKey="v" stroke={T.cyan} strokeWidth={2.5} fill="url(#slg)" name="Silo Level %"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Predictive Alerts" sub="AHP failure flags" />
          <AlertRow asset="Ash Slurry Pump #3" issue="Impeller wear at 78% — replace soon" severity="Critical" time="45m ago"/>
          <AlertRow asset="Pipeline Zone B" issue="Choke-up risk elevated in section B-12" severity="High" time="2h ago"/>
          <AlertRow asset="Valve V-24" issue="Valve failure pattern detected" severity="Medium" time="5h ago"/>
          <AlertRow asset="Fly Ash Utilization" issue="Utilization below target: 84% vs 92%" severity="Low" time="1d ago"/>
        </Card>
      </div>

      <IOTable
        inputs={["Ash Slurry Pumps","HP Water Pumps","LP Water Pumps","Clinker Grinders","Hydroejectors","Jet Pumps","GEHO Pumps","Recovery Pumps","Conveying Hoppers","Valves","Ash Slurry Disposal Pipelines","Transport Air Compressors","Instrument Air Compressors","Fludizing Blowers","Dry Ash Conveying Pipelines"]}
        outputs={["Slurry Pump Wear Prediction","Pipeline Chokeup Prediction","Silo Level Forecasting","Valve Failure Detection","Specific Water Consumption","Fly Ash Utilization","Spares Planning","Maintenance Planning Suggestions","Recommended Corrective Action"]}
      />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD 5: ESP/FGD
// ═══════════════════════════════════════════════════════════════════════════════
const ESPFGDDashboard = () => {
  const espData = genHourly(94, 24);
  const emissionData = genTrend(28, 12, 8);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        <GradCard title="ESP Efficiency" value="97.2%" sub="Collection efficiency" gradient={gradients.green} icon="🌿" trend />
        <GradCard title="Emission Level" value="28 mg/Nm³" sub="Limit: 50 mg/Nm³" gradient={gradients.cyan} icon="💨" trend />
        <GradCard title="FGD Pump Wear" value="18%" sub="Circulation pump wear" gradient={gradients.pink} icon="⚙️" trend />
        <GradCard title="Rapping System" value="Normal" sub="All rappers operational" gradient={gradients.purple} icon="✅" trend />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
        <Card>
          <SectionTitle title="ESP Efficiency — 24hr Monitoring" sub="Collection efficiency % (target >96%)" />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={espData}>
              <defs>
                <linearGradient id="esg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.green} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={T.green} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F8"/>
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: T.gray }} interval={3}/>
              <YAxis domain={[85, 100]} tick={{ fontSize: 10, fill: T.gray }}/>
              <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}/>
              <Area type="monotone" dataKey="v" stroke={T.green} strokeWidth={2.5} fill="url(#esg)" name="ESP Efficiency %"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Emission Compliance Status" sub="Stack emission monitoring" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            {[
              { label: "SPM", val: 28, limit: 50, unit: "mg/Nm³", ok: true },
              { label: "SO₂", val: 180, limit: 200, unit: "mg/Nm³", ok: true },
              { label: "NOₓ", val: 225, limit: 300, unit: "mg/Nm³", ok: true },
              { label: "Mercury", val: 0.012, limit: 0.03, unit: "mg/Nm³", ok: true },
            ].map((item, i) => (
              <div key={i} style={{ background: item.ok ? "#F0FBF6" : "#FFF0F0", borderRadius: 10, padding: "12px", border: `1px solid ${item.ok ? "#C8F0DC" : "#FFCDD2"}` }}>
                <div style={{ fontSize: 11, color: T.gray, fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: item.ok ? T.green : T.red, lineHeight: 1.2 }}>{item.val}</div>
                <div style={{ fontSize: 10, color: T.gray }}>{item.unit}</div>
                <div style={{ fontSize: 10, color: item.ok ? T.green : T.red, marginTop: 2 }}>Limit: {item.limit}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <SectionTitle title="Emission Limit Breach Prediction" sub="Projected emission index trend" />
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={emissionData}>
              <defs>
                <linearGradient id="emg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.orange} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={T.orange} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F8"/>
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: T.gray }}/>
              <YAxis tick={{ fontSize: 10, fill: T.gray }}/>
              <Tooltip contentStyle={{ borderRadius: 8, border: "none" }}/>
              <Area type="monotone" dataKey="v" stroke={T.orange} strokeWidth={2.5} fill="url(#emg)" name="SPM mg/Nm³"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Predictive Alerts" sub="ESP/FGD system flags" />
          <AlertRow asset="Rectifier Transformer #4" issue="Insulation degradation detected" severity="High" time="1h ago"/>
          <AlertRow asset="Rapping System Zone 2" issue="Rapper failure imminent" severity="Medium" time="3h ago"/>
          <AlertRow asset="FGD Circulation Pump" issue="Pump wear at 62% — plan replacement" severity="Medium" time="6h ago"/>
          <AlertRow asset="Hopper Heater H3" issue="Heater anomaly — check required" severity="Low" time="12h ago"/>
        </Card>
      </div>

      <IOTable
        inputs={["Collecting Electrodes","Emitting Electrodes","Rapping System","Insulators","Rectifier Transformers","Hopper Heaters","Rapping Controllers","Hopper Level Switches","Fluidizing Pads"]}
        outputs={["ESP Efficiency Degradation Prediction","Rapping System Failure Detection","Emission Limit Breach Prediction","FGD Pump Wear Prediction","Spares Planning","Maintenance Planning Suggestions","Recommended Corrective Action"]}
      />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD 6: APC
// ═══════════════════════════════════════════════════════════════════════════════
const APCDashboard = () => {
  const apcData = genHourly(7.2, 24);
  const auxData = [
    { name: "BFP", apc: 2.8, target: 2.6 },
    { name: "CEP", apc: 0.6, target: 0.55 },
    { name: "CWP", apc: 1.1, target: 1.0 },
    { name: "ID Fan", apc: 1.4, target: 1.3 },
    { name: "PA Fan", apc: 0.8, target: 0.75 },
    { name: "FD Fan", apc: 0.5, target: 0.48 },
  ];
  const seasonalData = genTrend(7.4, 12, 0.6);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        <GradCard title="Station APC" value="7.21%" sub="vs 6.8% normative" gradient={gradients.pink} icon="⚡" trend />
        <GradCard title="Excess Air" value="22.4%" sub="High — above 18% target" gradient={gradients.orange} icon="💨" trend />
        <GradCard title="PLF" value="83.6%" sub="Plant load factor" gradient={gradients.purple} icon="🏭" trend />
        <GradCard title="CT Efficiency" value="91.2%" sub="Cooling tower" gradient={gradients.cyan} icon="🌊" trend />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
        <Card>
          <SectionTitle title="APC Real-time Monitoring" sub="Station auxiliary power consumption % — 24hr" />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={apcData}>
              <defs>
                <linearGradient id="apcg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.pink} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={T.pink} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F8"/>
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: T.gray }} interval={3}/>
              <YAxis domain={[5, 10]} tick={{ fontSize: 10, fill: T.gray }}/>
              <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}/>
              <Area type="monotone" dataKey="v" stroke={T.pink} strokeWidth={2.5} fill="url(#apcg)" name="APC %"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Auxiliary Breakdown" sub="Actual vs. best-run target (%)" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={auxData} margin={{ left: 5, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F8"/>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: T.charcoal }}/>
              <YAxis tick={{ fontSize: 10, fill: T.gray }}/>
              <Tooltip contentStyle={{ borderRadius: 8, border: "none" }}/>
              <Legend/>
              <Bar dataKey="apc" fill={T.pink} radius={[4,4,0,0]} name="Actual %"/>
              <Bar dataKey="target" fill={T.purple} radius={[4,4,0,0]} name="Target %"/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <SectionTitle title="Seasonal APC Impact" sub="Monthly APC trend with seasonal overlay" />
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={seasonalData}>
              <defs>
                <linearGradient id="seag" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.cyan} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={T.cyan} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F8"/>
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: T.gray }}/>
              <YAxis domain={[5, 10]} tick={{ fontSize: 10, fill: T.gray }}/>
              <Tooltip contentStyle={{ borderRadius: 8, border: "none" }}/>
              <Area type="monotone" dataKey="v" stroke={T.cyan} strokeWidth={2.5} fill="url(#seag)" name="APC %"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="APC Optimization Flags" />
          {[
            { issue: "High Excess Air in Unit 2 — reduce O₂ setpoint", impact: "-0.18% APC", badge: "pink" },
            { issue: "APH leakage detected — efficiency loss", impact: "-0.12% APC", badge: "orange" },
            { issue: "BFP running at suboptimal curve", impact: "-0.09% APC", badge: "purple" },
            { issue: "Coal quality impact: low GCV from Mine B", impact: "+0.23% APC", badge: "red" },
            { issue: "Best-run auxiliaries identified: FD Fan config", impact: "-0.07% APC", badge: "cyan" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, marginBottom: 5, background: T.bg, border: "1px solid #EBEBF8" }}>
              <span style={{ fontSize: 12, flex: 1, color: T.charcoal }}>{item.issue}</span>
              <Badge label={item.impact} color={item.badge}/>
            </div>
          ))}
        </Card>
      </div>

      <IOTable
        inputs={["PLF","High Excess Air","CT Efficiency","Leakages in APH","Coal Flow for Coal Mill","Feed Flow Rate for BFP","CW Flow Rate for CE","Condensate Flow Rate for CEP","Flue Gas Flow Rate for ID"]}
        outputs={["Partial Loading Impact on APC","Seasonal Impact on APC","Coal Quality Impact on APC","High SEC Auxiliaries","Best Run Auxiliaries","Maintenance Planning Suggestions","Recommended Corrective Action"]}
      />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD 7: MOD PREDICTION
// ═══════════════════════════════════════════════════════════════════════════════
const MODDashboard = () => {
  const modData = genHourly(3.42, 24);
  const coalData = [
    { mine: "Mine A", gcv_arb: 3850, gcv_ule: 4120, qty: 1240 },
    { mine: "Mine B", gcv_arb: 3620, gcv_ule: 3890, qty: 980 },
    { mine: "Mine C", gcv_arb: 4100, gcv_ule: 4380, qty: 760 },
    { mine: "Mine D", gcv_arb: 3940, gcv_ule: 4220, qty: 1120 },
    { mine: "Mine E", gcv_arb: 3710, gcv_ule: 3980, qty: 840 },
  ];
  const stackLossData = genTrend(6.4, 12, 1.2);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        <GradCard title="MOD Rate" value="₹3.42/kWh" sub="vs ₹3.28 normative" gradient={gradients.pink} icon="📈" trend />
        <GradCard title="Station ECR" value="0.682 kg/kWh" sub="Coal rate today" gradient={gradients.purple} icon="⚡" trend />
        <GradCard title="Weighted Avg GCV" value="3,890 kCal/kg" sub="ARB blended GCV" gradient={gradients.cyan} icon="🔥" trend />
        <GradCard title="Stack Loss" value="6.8%" sub="Above 6.2% target" gradient={gradients.orange} icon="💨" trend />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
        <Card>
          <SectionTitle title="Merit Order Dispatch Rate — 24hr" sub="Actual MOD rate ₹/kWh vs prediction" />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={modData}>
              <defs>
                <linearGradient id="mdg1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.pink} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={T.pink} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="mdg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.purple} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={T.purple} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F8"/>
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: T.gray }} interval={3}/>
              <YAxis domain={[2.5, 4.5]} tick={{ fontSize: 10, fill: T.gray }}/>
              <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}/>
              <Area type="monotone" dataKey="v" stroke={T.pink} strokeWidth={2.5} fill="url(#mdg1)" name="Actual MOD ₹"/>
              <Area type="monotone" dataKey="v2" stroke={T.purple} strokeWidth={2} fill="url(#mdg2)" name="Predicted ₹"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Coal Matrix Simulation" sub="Source-wise coal GCV analysis" />
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead>
                <tr style={{ background: gradients.darkHeader }}>
                  {["Mine", "ARB GCV", "ULE GCV", "GCV Diff", "Qty (T)"].map(h => (
                    <th key={h} style={{ padding: "7px 10px", color: T.white, fontWeight: 600, textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {coalData.map((row, i) => {
                  const diff = row.gcv_ule - row.gcv_arb;
                  const highDiff = diff > 350;
                  return (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#FAFAFA" : T.white }}>
                      <td style={{ padding: "7px 10px", fontWeight: 600, color: T.charcoal }}>{row.mine}</td>
                      <td style={{ padding: "7px 10px", color: T.charcoal }}>{row.gcv_arb.toLocaleString()}</td>
                      <td style={{ padding: "7px 10px", color: T.charcoal }}>{row.gcv_ule.toLocaleString()}</td>
                      <td style={{ padding: "7px 10px" }}>
                        <Badge label={diff} color={highDiff ? "red" : "green"}/>
                      </td>
                      <td style={{ padding: "7px 10px", color: T.charcoal }}>{row.qty.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <SectionTitle title="Stack Loss Prediction" sub="Projected stack loss % over months" />
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={stackLossData}>
              <defs>
                <linearGradient id="slg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.orange} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={T.orange} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F8"/>
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: T.gray }}/>
              <YAxis domain={[4, 9]} tick={{ fontSize: 10, fill: T.gray }}/>
              <Tooltip contentStyle={{ borderRadius: 8, border: "none" }}/>
              <Area type="monotone" dataKey="v" stroke={T.orange} strokeWidth={2.5} fill="url(#slg2)" name="Stack Loss %"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="MOD Optimization Insights" />
          {[
            { issue: "Mine C has highest GCV ARB — prioritize for blending", impact: "-₹0.08/kWh", badge: "green" },
            { issue: "Mine B GCV diff: 270 kCal — check moisture at source", impact: "High GCV Diff", badge: "red" },
            { issue: "Current ECR can be reduced by coal matrix adjustment", impact: "-0.012 kg/kWh", badge: "purple" },
            { issue: "Stack loss above target — APH leakage likely cause", impact: "+0.4% loss", badge: "orange" },
            { issue: "Optimised coal matrix identified for next 24 hours", impact: "Simulation ready", badge: "cyan" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, marginBottom: 5, background: T.bg, border: "1px solid #EBEBF8" }}>
              <span style={{ fontSize: 12, flex: 1, color: T.charcoal }}>{item.issue}</span>
              <Badge label={item.impact} color={item.badge}/>
            </div>
          ))}
        </Card>
      </div>

      <IOTable
        inputs={["Station ECR","Merit Order Rate (Actual)","Coal Quantity Sourcewise (Actual)","Coal LE GCV Sourcewise (Actual)","Coal ARB GCV (Actual)","Coal ARB GCV (Normative)","Coal ULE GCV","Weighted Avg ARB GCV","Bunkered GCV"]}
        outputs={["Stack Loss Prediction","MOD Rate Prediction","MOD Simulation to Decide Coal Matrix","Identification of High GCV Diff Coal Mines"]}
      />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
const dashboardMeta = {
  turbine: { title: "Turbine Asset Health Monitoring", sub: "HPT · IPT · LPT · Generator · BFP · CEP · CWP" },
  boiler: { title: "Boiler Asset Health Monitoring", sub: "Pressure Parts · Coal Mills · Fans · APH · Burners" },
  chp: { title: "Coal Handling Plant — Asset Health", sub: "Conveyors · Crushers · Wagons · Locomotives · SR" },
  ahp: { title: "Ash Handling Plant — Asset Health", sub: "Slurry Pumps · Pipelines · Silos · Compressors" },
  espfgd: { title: "ESP / FGD Asset Health Monitoring", sub: "Electrodes · Rapping · Transformers · FGD Pumps" },
  apc: { title: "Auxiliary Power Consumption Analytics", sub: "BFP · CEP · CWP · ID Fan · PA Fan · FD Fan" },
  mod: { title: "Daily MOD Prediction Dashboard", sub: "Merit Order Dispatch · Coal Matrix · Stack Loss" },
};

const dashComponents = {
  turbine: TurbineDashboard,
  boiler: BoilerDashboard,
  chp: CHPDashboard,
  ahp: AHPDashboard,
  espfgd: ESPFGDDashboard,
  apc: APCDashboard,
  mod: MODDashboard,
};

export default function App() {
  const [active, setActive] = useState("turbine");
  const DashComp = dashComponents[active];
  const meta = dashboardMeta[active];

  return (
    <div style={{ display: "flex", background: T.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Sidebar active={active} setActive={setActive} />
      <div style={{ marginLeft: 220, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header title={meta.title} sub={meta.sub} />
        <div style={{ flex: 1, padding: "24px 28px", overflowY: "auto" }}>
          <DashComp />
        </div>
      </div>
    </div>
  );
}
