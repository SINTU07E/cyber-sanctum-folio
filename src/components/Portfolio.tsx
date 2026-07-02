import { motion, useScroll, useSpring, AnimatePresence, type Variants } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Shield, Lock, Terminal, Cloud, Smartphone, Server, Globe, Code2,
  Github, Linkedin, Mail, Download, ArrowRight, Menu, X, Sun, Moon,
  Award, GraduationCap, Briefcase, Zap, Target, Bug, FileSearch,
  CheckCircle2, ChevronRight, Send, Youtube, Twitter,
  Cpu, Database, Network, Eye, KeyRound, Layers,
} from "lucide-react";

/* -----------------------------------------------------------
   Small helpers
------------------------------------------------------------ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-7xl px-6 py-24 md:px-10 md:py-32 ${className}`}>
      {children}
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyber-blue/30 bg-cyber-blue/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-cyber-blue">
      <span className="h-1.5 w-1.5 rounded-full bg-cyber-green animate-cyber-pulse" />
      {children}
    </div>
  );
}

/* -----------------------------------------------------------
   Typing effect
------------------------------------------------------------ */
function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    const speed = deleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!deleting && text === current) {
        setTimeout(() => setDeleting(true), 1400);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
        return;
      }
      setText(current.slice(0, deleting ? text.length - 1 : text.length + 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return (
    <span className="font-mono text-cyber-green">
      {text}
      <span className="animate-blink text-cyber-blue">▋</span>
    </span>
  );
}

/* -----------------------------------------------------------
   Animated particles / cyber grid background
------------------------------------------------------------ */
function CyberBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 10,
        size: 1 + Math.random() * 2.5,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid" />
      <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyber-blue/20 blur-[120px]" />
      <div className="absolute right-10 top-1/2 h-[380px] w-[380px] rounded-full bg-cyber-purple/20 blur-[120px]" />
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-cyber-blue"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* -----------------------------------------------------------
   Magnetic Button
------------------------------------------------------------ */
function MagneticButton({
  children, href = "#", variant = "primary", download = false,
}: { children: React.ReactNode; href?: string; variant?: "primary" | "ghost" | "outline"; download?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25 });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  const base = "group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-cyber-blue text-primary-foreground hover:glow-blue"
      : variant === "outline"
      ? "border border-border text-foreground hover:border-cyber-blue hover:text-cyber-blue"
      : "text-foreground hover:text-cyber-blue";

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      onMouseMove={onMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`${base} ${styles}`}
    >
      {children}
    </motion.a>
  );
}

/* -----------------------------------------------------------
   Nav
------------------------------------------------------------ */
const NAV = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

function Nav({ theme, toggleTheme }: { theme: "dark" | "light"; toggleTheme: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10 ${scrolled ? "glass rounded-full" : ""} transition-all`}>
        <a href="#top" className="flex items-center gap-2 py-2 font-display text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyber-blue to-cyber-purple">
            <Shield className="h-4 w-4 text-white" />
          </span>
          <span>Sintu<span className="text-cyber-blue">.</span></span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-cyber-blue hover:text-cyber-blue"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#contact"
            className="hidden rounded-full bg-cyber-blue px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:glow-blue md:inline-flex"
          >
            Hire Me
          </a>
          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-border md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-6 mt-2 rounded-2xl glass p-4 md:hidden"
          >
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* -----------------------------------------------------------
   Hero
------------------------------------------------------------ */
function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-32">
      <CyberBackground />
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-4xl">
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyber-green/30 bg-cyber-green/5 px-3 py-1 font-mono text-xs text-cyber-green">
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-green animate-cyber-pulse" />
            Available for security engagements
          </motion.div>

          <motion.h1 variants={fadeUp} className="font-display text-5xl font-bold leading-[1.05] md:text-7xl lg:text-8xl">
            Hi, I'm <span className="text-gradient">Sintu Sharma</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 font-display text-xl text-muted-foreground md:text-2xl">
            Cybersecurity Consultant — I break things, so attackers can't.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-4 font-mono text-base md:text-lg">
            <span className="text-muted-foreground">$ specializing_in </span>
            <Typewriter
              words={[
                "Web Application Security",
                "API Security",
                "Mobile Security",
                "Infrastructure Security",
                "Cloud Security",
                "Product Security",
              ]}
            />
          </motion.div>

          <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
            I help organizations identify and eliminate security risks through comprehensive
            Vulnerability Assessments and Penetration Testing across Web Applications, APIs,
            Mobile Applications, Networks, and Cloud Infrastructure.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <MagneticButton href="#projects" variant="primary">
              View Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton href="/resume.pdf" variant="outline" download>
              <Download className="h-4 w-4" /> Download Resume
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Contact Me <ChevronRight className="h-4 w-4" />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
   About
------------------------------------------------------------ */
function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const dur = 1400; const start = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.floor(end * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el); return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function About() {
  const stats = [
    { value: 4, suffix: "+", label: "Years Experience" },
    { value: 50, suffix: "+", label: "Enterprise Projects" },
    { value: 15, suffix: "+", label: "Hall of Fame" },
    { value: 100, suffix: "%", label: "RBI Compliance" },
  ];
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-5">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="lg:col-span-3">
          <motion.div variants={fadeUp}><SectionLabel>About Me</SectionLabel></motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold md:text-5xl">
            Security-first mindset,<br /><span className="text-gradient">engineer's toolkit.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-lg leading-relaxed text-muted-foreground">
            With 4+ years across offensive security and enterprise consulting, I partner with
            engineering teams to ship secure software — not just find bugs. From regulated
            banking environments to global consulting engagements, I focus on measurable risk
            reduction and remediation that sticks.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 text-lg leading-relaxed text-muted-foreground">
            I'm a continuous learner and problem solver who treats every assessment as
            collaboration between attacker mindset and product thinking.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2">
            {["Offensive Security", "Enterprise Clients", "Developer Collaboration", "Secure Delivery"].map((t) => (
              <span key={t} className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm text-muted-foreground">{t}</span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}
          className="grid grid-cols-2 gap-4 lg:col-span-2"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label} variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-cyber-blue hover:glow-blue"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyber-blue/10 blur-2xl transition-all group-hover:bg-cyber-blue/20" />
              <div className="relative">
                <div className="font-display text-4xl font-bold text-cyber-blue md:text-5xl">
                  <CountUp end={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* -----------------------------------------------------------
   Experience Timeline
------------------------------------------------------------ */
const EXPERIENCES = [
  {
    company: "Deloitte India", role: "Consultant", period: "Dec 2025 – Present",
    points: [
      "End-to-end VAPT engagements across web, API, mobile, and network",
      "Reconnaissance, threat modeling, manual exploitation and risk analysis",
      "Technical reporting, remediation validation, retesting",
      "Close collaboration with client engineering teams to improve security posture",
    ],
  },
  {
    company: "Shivalik Small Finance Bank", role: "Deputy Manager (Associate Infosec)", period: "Aug 2025 – Nov 2025",
    points: [
      "Internal VAPT and threat modeling for banking applications",
      "External VAPT coordination and closure validation",
      "RBI cybersecurity compliance, risk assessment and gap analysis",
    ],
  },
  {
    company: "DMI Finance", role: "Security Analyst", period: "Sep 2023 – Aug 2025",
    points: [
      "Internal VAPT and threat modeling across product portfolio",
      "External VAPT closure and Secure SDLC integration",
      "Deep collaboration with dev teams on risk mitigation",
    ],
  },
  {
    company: "Essential Infosec Pvt Ltd", role: "Security Analyst", period: "Apr 2022 – Sep 2023",
    points: [
      "VAPT for government and private clients across network, web, API, mobile",
      "Reconnaissance, enumeration, vulnerability identification and exploitation",
      "Reporting, risk rating and remediation support",
    ],
  },
];

function Experience() {
  return (
    <Section id="experience">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-16 max-w-2xl">
        <motion.div variants={fadeUp}><SectionLabel>Experience</SectionLabel></motion.div>
        <motion.h2 variants={fadeUp} className="text-4xl font-bold md:text-5xl">
          Four years of <span className="text-gradient">breaking & building.</span>
        </motion.h2>
      </motion.div>

      <div className="relative">
        <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-cyber-blue via-cyber-purple to-transparent md:left-1/2" />
        <div className="space-y-14">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`relative grid gap-4 md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:col-start-2" : ""}`}
            >
              <div className="absolute left-4 top-2 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full bg-cyber-blue glow-blue md:left-1/2">
                <span className="h-1.5 w-1.5 rounded-full bg-background" />
              </div>
              <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <div className="font-mono text-xs uppercase tracking-widest text-cyber-blue">{exp.period}</div>
                <h3 className="mt-2 text-2xl font-bold">{exp.company}</h3>
                <p className="mt-1 text-muted-foreground">{exp.role}</p>
              </div>
              <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                <ul className="space-y-2">
                  {exp.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyber-green" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -----------------------------------------------------------
   Skills
------------------------------------------------------------ */
const SKILLS = [
  { icon: Target, title: "Offensive Security", items: ["Web App Security", "API Security", "Mobile Security", "Network Security", "Infrastructure Security", "Cloud Security"] },
  { icon: Layers, title: "Methodologies", items: ["OWASP Top 10", "OWASP API Top 10", "OWASP MASVS", "PTES", "CVSS", "Threat Modeling"] },
  { icon: Terminal, title: "Security Tools", items: ["Burp Suite Pro", "Nmap", "Nessus", "OpenVAS", "Metasploit", "SQLMap", "FFUF", "Nuclei", "Wireshark", "Postman", "Kali Linux", "Gobuster", "Nikto", "Dirsearch"] },
  { icon: Code2, title: "Languages", items: ["Python", "Bash", "SQL", "JavaScript"] },
  { icon: Cloud, title: "Cloud Platforms", items: ["AWS", "Azure"] },
  { icon: Shield, title: "Focus Areas", items: ["Secure SDLC", "Threat Modeling", "Risk Analysis", "Remediation Validation", "Compliance"] },
];

function Skills() {
  return (
    <Section id="skills">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-16 max-w-2xl">
        <motion.div variants={fadeUp}><SectionLabel>Technical Skills</SectionLabel></motion.div>
        <motion.h2 variants={fadeUp} className="text-4xl font-bold md:text-5xl">
          The <span className="text-gradient">stack</span> I attack with.
        </motion.h2>
      </motion.div>

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((s) => (
          <motion.div
            key={s.title} variants={fadeUp}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-cyber-blue"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 via-transparent to-cyber-purple/5" />
            </div>
            <div className="relative">
              <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 text-cyber-blue transition-transform group-hover:scale-110">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <span key={it} className="rounded-md border border-border bg-secondary/40 px-2.5 py-1 font-mono text-xs text-muted-foreground">
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* -----------------------------------------------------------
   Projects
------------------------------------------------------------ */
const PROJECTS = [
  {
    icon: Globe, title: "Enterprise Web Application VAPT", tag: "Web Security",
    desc: "Comprehensive assessment of a multi-tenant enterprise platform.",
    bullets: ["Authenticated & unauthenticated scope", "Business logic testing", "OWASP Top 10 methodology", "Detailed reporting & remediation validation"],
  },
  {
    icon: Network, title: "API Security Assessment", tag: "API Security",
    desc: "Deep-dive on JWT / OAuth flows and authorization boundaries.",
    bullets: ["JWT & OAuth flow analysis", "IDOR / BOLA discovery", "Broken authentication", "Authorization matrix testing"],
  },
  {
    icon: Smartphone, title: "Mobile Application Security", tag: "Mobile Security",
    desc: "End-to-end Android app assessment with runtime attacks.",
    bullets: ["Static & dynamic analysis", "Certificate pinning bypass", "Root detection bypass", "API interception & tampering"],
  },
  {
    icon: Server, title: "Infrastructure Assessment", tag: "Infra Security",
    desc: "Internal & external network posture review for a financial client.",
    bullets: ["Network enumeration", "Vulnerability assessment", "Hardening review", "Risk-rated reporting"],
  },
  {
    icon: Eye, title: "Threat Modeling Engagement", tag: "Product Security",
    desc: "STRIDE-based threat model for a new product line.",
    bullets: ["Data flow diagrams", "Trust boundaries", "Attack surface analysis", "Prioritized mitigations"],
  },
];

function Projects() {
  return (
    <Section id="projects">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-16 max-w-2xl">
        <motion.div variants={fadeUp}><SectionLabel>Featured Projects</SectionLabel></motion.div>
        <motion.h2 variants={fadeUp} className="text-4xl font-bold md:text-5xl">
          Selected <span className="text-gradient">case studies.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-muted-foreground">
          A snapshot of engagements. Client details redacted under NDA.
        </motion.p>
      </motion.div>

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.title} variants={fadeUp}
            whileHover={{ y: -6 }}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-cyber-purple ${i === 0 ? "lg:col-span-2" : ""}`}
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyber-purple/10 blur-3xl transition-all group-hover:bg-cyber-purple/25" />
            <div className="relative flex-1">
              <div className="flex items-center justify-between">
                <div className="inline-grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyber-purple/20 to-cyber-blue/20 text-cyber-purple">
                  <p.icon className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-cyber-purple/30 bg-cyber-purple/5 px-3 py-1 font-mono text-xs text-cyber-purple">{p.tag}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-4 space-y-1.5">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyber-blue" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}

/* -----------------------------------------------------------
   Hall of Fame
------------------------------------------------------------ */
const ACHIEVEMENTS = [
  { icon: Award, title: "Nokia Hall of Fame", desc: "Recognized for responsibly disclosing security vulnerabilities." },
  { icon: Briefcase, title: "Enterprise Security Engagements", desc: "Delivered VAPT across multiple large enterprise clients." },
  { icon: Shield, title: "Government Sector Assessments", desc: "Security testing for government infrastructure & applications." },
  { icon: KeyRound, title: "RBI Compliance Experience", desc: "Hands-on execution of RBI cybersecurity requirements." },
];

function HallOfFame() {
  return (
    <Section id="achievements">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-16 max-w-2xl">
        <motion.div variants={fadeUp}><SectionLabel>Hall of Fame</SectionLabel></motion.div>
        <motion.h2 variants={fadeUp} className="text-4xl font-bold md:text-5xl">
          Achievements & <span className="text-gradient">recognitions.</span>
        </motion.h2>
      </motion.div>

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ACHIEVEMENTS.map((a) => (
          <motion.div
            key={a.title} variants={fadeUp} whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-cyber-green"
          >
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyber-green to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-cyber-green/10 text-cyber-green">
              <a.icon className="h-5 w-5" />
            </div>
            <h3 className="font-bold">{a.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* -----------------------------------------------------------
   Certifications + Education
------------------------------------------------------------ */
function CertsAndEducation() {
  const certs = [
    { name: "CAP (Sec Ops)", org: "Security Operations", status: "Certified" },
    { name: "NSE", org: "Fortinet", status: "Certified" },
    { name: "Future Certification", org: "Reserved slot", status: "In progress" },
  ];
  const education = [
    { title: "MBA (IT)", org: "GLA University", period: "2023 – 2025" },
    { title: "Bachelor of Science", org: "LNMU University", period: "2020 – 2023" },
  ];

  return (
    <Section id="credentials">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <SectionLabel>Certifications</SectionLabel>
          <h2 className="text-4xl font-bold">Verified <span className="text-gradient">credentials.</span></h2>
          <div className="mt-8 space-y-3">
            {certs.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-cyber-blue hover:bg-card/70"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-cyber-blue/10 text-cyber-blue">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.org}</div>
                  </div>
                </div>
                <span className="rounded-full border border-cyber-green/30 bg-cyber-green/10 px-3 py-1 font-mono text-xs text-cyber-green">
                  {c.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <SectionLabel>Education</SectionLabel>
          <h2 className="text-4xl font-bold">Academic <span className="text-gradient">foundation.</span></h2>
          <div className="mt-8 space-y-3">
            {education.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-border bg-card p-5 transition-all hover:border-cyber-purple"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-cyber-purple/10 text-cyber-purple">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-cyber-purple">{e.period}</div>
                    <div className="mt-1 font-medium">{e.title}</div>
                    <div className="text-sm text-muted-foreground">{e.org}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* -----------------------------------------------------------
   Security Process
------------------------------------------------------------ */
const PROCESS = [
  { icon: FileSearch, name: "Reconnaissance" },
  { icon: Database, name: "Enumeration" },
  { icon: Bug, name: "Vulnerability Discovery" },
  { icon: Zap, name: "Exploitation" },
  { icon: Target, name: "Risk Validation" },
  { icon: Cpu, name: "Reporting" },
  { icon: Shield, name: "Remediation Support" },
  { icon: CheckCircle2, name: "Retesting" },
];

function Process() {
  return (
    <Section id="process">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-16 max-w-2xl">
        <motion.div variants={fadeUp}><SectionLabel>Security Process</SectionLabel></motion.div>
        <motion.h2 variants={fadeUp} className="text-4xl font-bold md:text-5xl">
          How I run an <span className="text-gradient">engagement.</span>
        </motion.h2>
      </motion.div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.05 }}
            className="group relative flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-cyber-blue hover:glow-blue"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 text-cyber-blue">
              <p.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="font-mono text-xs text-muted-foreground">Step {String(i + 1).padStart(2, "0")}</div>
              <div className="truncate font-medium">{p.name}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* -----------------------------------------------------------
   Blog placeholder
------------------------------------------------------------ */
const BLOG_TOPICS = [
  { title: "OWASP Top 10 in the real world", tag: "OWASP", excerpt: "How the top 10 map to modern application stacks." },
  { title: "API Security beyond authentication", tag: "API Security", excerpt: "IDORs, BOLAs and the details attackers love." },
  { title: "Bug Bounty: from zero to first CVE", tag: "Bug Bounty", excerpt: "A pragmatic roadmap for aspiring hunters." },
  { title: "Product Security for engineering teams", tag: "Product Security", excerpt: "Baking security into your SDLC." },
  { title: "Secure coding fundamentals", tag: "Secure Coding", excerpt: "Patterns that quietly kill entire vuln classes." },
  { title: "Cloud misconfigurations checklist", tag: "Cloud Security", excerpt: "The mistakes that keep costing companies." },
];

function Blog() {
  return (
    <Section id="blog">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-16 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <motion.div variants={fadeUp}><SectionLabel>Writing</SectionLabel></motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold md:text-5xl">
            Notes on <span className="text-gradient">offensive security.</span>
          </motion.h2>
        </div>
        <motion.span variants={fadeUp} className="font-mono text-xs text-muted-foreground">Coming soon →</motion.span>
      </motion.div>

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {BLOG_TOPICS.map((b) => (
          <motion.a
            key={b.title} href="#" variants={fadeUp} whileHover={{ y: -6 }}
            className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:border-cyber-blue"
          >
            <div>
              <span className="inline-block rounded-full border border-border bg-secondary/50 px-3 py-1 font-mono text-xs text-muted-foreground">{b.tag}</span>
              <h3 className="mt-4 text-lg font-bold leading-snug group-hover:text-cyber-blue">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.excerpt}</p>
            </div>
            <div className="mt-6 inline-flex items-center gap-1 font-mono text-xs text-cyber-blue">
              Read post <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}

/* -----------------------------------------------------------
   Content Creator
------------------------------------------------------------ */
function CreatorSection() {
  const socials = [
    { icon: Youtube, label: "YouTube", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Twitter, label: "Twitter / X", href: "#" },
    { icon: Github, label: "GitHub", href: "#" },
  ];
  return (
    <Section id="creator">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-16">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyber-blue/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyber-purple/20 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionLabel>Content Creator</SectionLabel>
            <h2 className="text-4xl font-bold md:text-5xl">
              Teaching what I <span className="text-gradient">learn.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              I create educational cybersecurity content — career guidance, VAPT walkthroughs,
              product security, learning roadmaps, practical concepts and industry insights.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label} href={s.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-cyber-blue hover:text-cyber-blue"
                >
                  <s.icon className="h-4 w-4" /> {s.label}
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-background/60 p-6 font-mono text-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-cyber-blue/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-cyber-green/70" />
              <span className="ml-2 text-xs text-muted-foreground">~ /sintu/content</span>
            </div>
            <div className="space-y-1.5 text-xs md:text-sm">
              <div><span className="text-cyber-green">➜</span> <span className="text-cyber-blue">whoami</span></div>
              <div className="text-muted-foreground">cybersecurity-consultant + educator</div>
              <div><span className="text-cyber-green">➜</span> <span className="text-cyber-blue">ls</span> content/</div>
              <div className="text-muted-foreground">career/  vapt/  product-security/  roadmaps/  concepts/</div>
              <div><span className="text-cyber-green">➜</span> <span className="text-cyber-blue">cat</span> mission.txt</div>
              <div className="text-foreground">"Make offensive security accessible to the next generation."<span className="animate-blink">▋</span></div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* -----------------------------------------------------------
   Contact
------------------------------------------------------------ */
function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 3500);
  };

  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="text-4xl font-bold md:text-5xl">
            Let's <span className="text-gradient">secure</span> your product.
          </h2>
          <p className="mt-6 text-muted-foreground">
            Available for VAPT engagements, security consulting and advisory work.
            Response within 24 hours.
          </p>
          <div className="mt-8 space-y-3">
            {[
              { icon: Mail, label: "sintu@example.com", href: "mailto:sintu@example.com" },
              { icon: Linkedin, label: "LinkedIn", href: "#" },
              { icon: Github, label: "GitHub", href: "#" },
              { icon: Download, label: "Download Resume", href: "/resume.pdf" },
            ].map((c) => (
              <a
                key={c.label} href={c.href}
                className="group flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 transition-all hover:border-cyber-blue hover:glow-blue"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-cyber-blue/10 text-cyber-blue">
                    <c.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{c.label}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-cyber-blue" />
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="lg:col-span-3 space-y-4 rounded-3xl border border-border bg-card p-6 md:p-10">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name" name="name" required />
            <Field label="Company" name="company" />
          </div>
          <Field label="Email" name="email" type="email" required />
          <Field label="Project Type" name="projectType" placeholder="Web VAPT, API Security, Mobile, Cloud, Threat Modeling…" />
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Message</label>
            <textarea
              name="message" required rows={5}
              className="w-full resize-none rounded-xl border border-border bg-background/50 p-4 text-sm outline-none transition-all focus:border-cyber-blue focus:glow-blue"
              placeholder="Tell me about your project scope, timelines and goals…"
            />
          </div>
          <button
            type="submit"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyber-blue px-6 py-3.5 font-medium text-primary-foreground transition-all hover:glow-blue"
          >
            {status === "sent" ? (
              <><CheckCircle2 className="h-4 w-4" /> Message queued — I'll be in touch</>
            ) : (
              <>Send message <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>
            )}
          </button>
        </form>
      </div>
    </Section>
  );
}

function Field({ label, name, type = "text", required, placeholder }: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        type={type} name={name} required={required} placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background/50 p-4 text-sm outline-none transition-all focus:border-cyber-blue focus:glow-blue"
      />
    </div>
  );
}

/* -----------------------------------------------------------
   Footer
------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyber-blue to-cyber-purple">
                <Shield className="h-4 w-4 text-white" />
              </span>
              Sintu Sharma
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Securing applications, infrastructure and digital products through proactive
              security testing.
            </p>
          </div>
          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-widest text-cyber-blue">Navigate</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {NAV.map((n) => <li key={n.href}><a href={n.href} className="hover:text-foreground">{n.label}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-widest text-cyber-blue">Connect</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:sintu@example.com" className="hover:text-foreground">Email</a></li>
              <li><a href="#" className="hover:text-foreground">LinkedIn</a></li>
              <li><a href="#" className="hover:text-foreground">GitHub</a></li>
              <li><a href="#" className="hover:text-foreground">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Sintu Sharma — All rights reserved.</span>
          <span className="font-mono">Built with security in mind.</span>
        </div>
      </div>
    </footer>
  );
}

/* -----------------------------------------------------------
   Progress bar (scroll)
------------------------------------------------------------ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green" />;
}

/* -----------------------------------------------------------
   Root
------------------------------------------------------------ */
export default function Portfolio() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
  }, [theme]);
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Nav theme={theme} toggleTheme={toggle} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <HallOfFame />
        <CertsAndEducation />
        <Process />
        <Blog />
        <CreatorSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
