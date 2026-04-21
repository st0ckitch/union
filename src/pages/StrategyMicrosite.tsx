import { useEffect, useRef, useState } from "react";
import "./StrategyMicrosite.css";

type Theme = "light" | "dark";
type Density = "comfortable" | "compact";

const SECTIONS = [
  { id: "audit", num: "01", label: "Situation Audit" },
  { id: "bist", num: "02", label: "BIST Strategy" },
  { id: "bga", num: "03", label: "BGA Strategy" },
  { id: "arch", num: "—", label: "Brand Architecture" },
  { id: "digital", num: "04", label: "Digital & Lead Gen" },
  { id: "retention", num: "05", label: "Retention" },
  { id: "ninety", num: "06", label: "First 90 Days" },
  { id: "team", num: "07", label: "Team Structure" },
];

const ACCENTS = ["#4F46E5", "#0A0A0A", "#B91C1C", "#0E7A4D", "#D97706"];

export default function StrategyMicrosite() {
  const [theme, setTheme] = useState<Theme>("light");
  const [density, setDensity] = useState<Density>("comfortable");
  const [accent, setAccent] = useState<string>("#4F46E5");
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("audit");

  const rootRef = useRef<HTMLDivElement | null>(null);

  // Load Google Fonts once.
  useEffect(() => {
    const id = "sm-fonts";
    if (document.getElementById(id)) return;
    const preconnect1 = document.createElement("link");
    preconnect1.rel = "preconnect";
    preconnect1.href = "https://fonts.googleapis.com";
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement("link");
    preconnect2.rel = "preconnect";
    preconnect2.href = "https://fonts.gstatic.com";
    preconnect2.crossOrigin = "";
    document.head.appendChild(preconnect2);

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap";
    document.head.appendChild(link);
  }, []);

  // Apply accent CSS variables on the scoped root.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty("--accent", accent);
    el.style.setProperty(
      "--accent-soft",
      `color-mix(in oklab, ${accent} 12%, transparent)`
    );
    el.style.setProperty(
      "--accent-ink",
      `color-mix(in oklab, ${accent} 85%, black)`
    );
  }, [accent]);

  // Reveal on scroll.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const nodes = el.querySelectorAll<HTMLElement>(
      "section > .container > *, .hero-stats, .section-head"
    );
    nodes.forEach((n) => n.classList.add("reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // Scroll spy.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) current = s.id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keyboard shortcuts: T = tweaks, D = dark toggle.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (e.key === "t" || e.key === "T") setTweaksOpen((v) => !v);
      if (e.key === "d" || e.key === "D") setTheme((t) => (t === "dark" ? "light" : "dark"));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={rootRef}
      className="sm-root"
      data-theme={theme}
      data-density={density}
    >
      <div className="shell">
        {/* ===== SIDE NAV ===== */}
        <aside className="sidenav" aria-label="Section navigation">
          <div className="brand">
            <div className="brand-mark">
              <span className="brand-dot"></span> Growth Strategy
            </div>
            <div>BIST × BGA · 2026</div>
          </div>
          <ol>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  data-section={s.id}
                  className={activeSection === s.id ? "active" : ""}
                >
                  <span className="num">{s.num}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
          <div className="sidenav-foot">
            <div>Prepared by Artyom Ananov</div>
            <div style={{ marginTop: 4 }}>April 2026 · Assessment</div>
            <div style={{ marginTop: 12 }}>
              <span className="kbd">T</span> tweaks · <span className="kbd">D</span> dark
            </div>
          </div>
        </aside>

        <main className="main">
          {/* ===== HERO ===== */}
          <section className="hero" id="top">
            <div className="hero-top">
              <div className="chip">
                <span className="dot"></span>
                <span>12-Month Strategic Growth Plan</span>
              </div>
              <div>V1.0 · Confidential Draft</div>
            </div>

            <h1>
              From 1,020
              <br />
              students today to
              <br />
              <em>1,250+</em> by 2027.
            </h1>

            <div className="hero-sub">
              <p className="lede">
                A data-driven, full-funnel marketing engine for BIST and BGA — built to preserve each school's distinct identity while compounding shared campus leverage. Audience by audience, channel by channel, quarter by quarter.
              </p>
              <div className="hero-meta">
                <div><span>Document</span><span>Strategy Brief</span></div>
                <div><span>Horizon</span><span>12 months · Q2 '26 → Q1 '27</span></div>
                <div><span>Scope</span><span>BIST + BGA · Full Marketing P&amp;L</span></div>
                <div><span>Author</span><span>Artyom Ananov · Marketing Lead</span></div>
              </div>
            </div>

            <div className="hero-stats">
              <div className="hero-stat"><div className="v">+30<sup>%</sup></div><div className="k">Qualified inquiries BIST</div></div>
              <div className="hero-stat"><div className="v">+25<sup>%</sup></div><div className="k">Qualified inquiries BGA</div></div>
              <div className="hero-stat"><div className="v">3×</div><div className="k">Marketing ROI target</div></div>
              <div className="hero-stat"><div className="v">&lt;$35</div><div className="k">Blended cost per lead</div></div>
            </div>
          </section>

          {/* ===== 01 AUDIT ===== */}
          <section id="audit">
            <div className="section-head">
              <div className="eyebrow">§ 01 / Situation</div>
              <div className="sh-title">
                <h2>Understand where we are<br />before deciding where to go.</h2>
                <p>Sixteen international schools compete for a finite pool of Tbilisi families. Both BIST and BGA sit in strong positions — but carry distinct blind spots that compound when left unaddressed.</p>
              </div>
            </div>

            <div className="container">
              <div className="sh-kicker" style={{ marginBottom: 14 }}>Competitive Landscape · Tbilisi, Apr 2026</div>
              <div style={{ overflowX: "auto", border: "1px solid var(--line)", borderRadius: "var(--radius)", background: "var(--panel)" }}>
                <table className="comp-table">
                  <thead>
                    <tr>
                      <th style={{ width: 180 }}>School</th>
                      <th>Curriculum</th>
                      <th className="bar-cell">Students</th>
                      <th>Key Strength</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="focus">
                      <td className="school-name">BIST</td>
                      <td>Cambridge · IGCSE + A-Level</td>
                      <td>
                        <span className="mono" style={{ display: "block", marginBottom: 6 }}>520+</span>
                        <span className="bar"><i style={{ width: "35%" }}></i></span>
                      </td>
                      <td>Only COBIS-accredited British school in Georgia</td>
                    </tr>
                    <tr className="focus">
                      <td className="school-name">BGA</td>
                      <td>Cambridge + IB + Georgian National</td>
                      <td>
                        <span className="mono" style={{ display: "block", marginBottom: 6 }}>500+</span>
                        <span className="bar"><i style={{ width: "33%" }}></i></span>
                      </td>
                      <td>Leading bilingual Georgian-national school</td>
                    </tr>
                    <tr>
                      <td className="school-name">QSI Tbilisi</td>
                      <td>American · AP / SAT</td>
                      <td>
                        <span className="mono" style={{ display: "block", marginBottom: 6 }}>~250</span>
                        <span className="bar"><i style={{ width: "16%" }}></i></span>
                      </td>
                      <td>US Embassy community, 30+ years in market</td>
                    </tr>
                    <tr>
                      <td className="school-name">European School</td>
                      <td>IB (all three programmes)</td>
                      <td>
                        <span className="mono" style={{ display: "block", marginBottom: 6 }}>~900</span>
                        <span className="bar"><i style={{ width: "60%" }}></i></span>
                      </td>
                      <td>Only CIS member in Georgia</td>
                    </tr>
                    <tr>
                      <td className="school-name">Newton Free</td>
                      <td>IB</td>
                      <td>
                        <span className="mono" style={{ display: "block", marginBottom: 6 }}>~1,500</span>
                        <span className="bar"><i style={{ width: "100%" }}></i></span>
                      </td>
                      <td>Largest and fastest-growing IB school</td>
                    </tr>
                    <tr>
                      <td className="school-name">Maarif Schools</td>
                      <td>Turkish / International</td>
                      <td>
                        <span className="mono" style={{ display: "block", marginBottom: 6 }}>—</span>
                        <span className="bar"><i style={{ width: 0 }}></i></span>
                      </td>
                      <td>Modern campus near Lisi Lake</td>
                    </tr>
                    <tr>
                      <td className="school-name">GZAAT</td>
                      <td>American · AP</td>
                      <td>
                        <span className="mono" style={{ display: "block", marginBottom: 6 }}>~250</span>
                        <span className="bar"><i style={{ width: "16%" }}></i></span>
                      </td>
                      <td>Selective, trilingual</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="note" style={{ marginTop: 10 }}>Focus rows highlighted · Sample of 16+ international schools active in Tbilisi.</div>

              <div className="sm-hr"></div>

              <div className="sh-kicker" style={{ marginBottom: 14 }}>Pain Points &amp; Growth Blockers</div>
              <div className="grid-2">
                <div className="pain-col">
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span className="tag bist">BIST</span>
                    <span className="note">4 blockers</span>
                  </div>
                  <div className="pain-item"><div className="idx">01</div><div className="bd"><strong>Low social engagement</strong>12.5K Facebook followers vs BGA's 37K. Only ~125 "talking about this". Low digital loyalty.</div><span className="pill bad">Critical</span></div>
                  <div className="pain-item"><div className="idx">02</div><div className="bd"><strong>Sixth Form retention</strong>Only 54 of 520 students continue post-16. Significant drop-off after IGCSE.</div><span className="pill warn">High</span></div>
                  <div className="pain-item"><div className="idx">03</div><div className="bd"><strong>Fee opacity</strong>No public fees anywhere on site. May be intentional — worth A/B testing with a transparent range.</div><span className="pill warn">Test</span></div>
                  <div className="pain-item"><div className="idx">04</div><div className="bd"><strong>WordPress stack</strong>No CRM, no chat, no conversion tracking. The funnel is leaking at the front door.</div><span className="pill bad">Critical</span></div>
                </div>
                <div className="pain-col">
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span className="tag bga">BGA</span>
                    <span className="note">3 blockers</span>
                  </div>
                  <div className="pain-item"><div className="idx">01</div><div className="bd"><strong>IB track still new</strong>Authorized in 2022. No graduating results yet vs European School's established cohorts.</div><span className="pill warn">High</span></div>
                  <div className="pain-item"><div className="idx">02</div><div className="bd"><strong>Brand confusion</strong>Similar names and a shared campus creates spillover with BIST — hurts both when messaging isn't differentiated.</div><span className="pill warn">High</span></div>
                  <div className="pain-item"><div className="idx">03</div><div className="bd"><strong>Georgian-market ceiling</strong>Limited international enrollment caps growth. Need bilingual pull to attract mixed families.</div><span className="pill warn">Medium</span></div>
                </div>
              </div>

              <div className="sm-hr"></div>

              <div className="sh-kicker" style={{ marginBottom: 14 }}>Pain Points Shared by Both Schools</div>
              <div className="common-grid">
                <div className="common-card">
                  <span className="bang">⚠ Funnel</span>
                  <h4>Funnel setup is not data-driven</h4>
                  <p>No attribution. No conversion tracking. Inquiries land in inboxes and age there.</p>
                </div>
                <div className="common-card">
                  <span className="bang">⚠ Digital</span>
                  <h4>No active digital advertising</h4>
                  <p>At the time of research, neither brand ran paid search or paid social. Zero demand capture.</p>
                </div>
                <div className="common-card">
                  <span className="bang">⚠ Virtual tour</span>
                  <h4>Virtual tour is underbuilt</h4>
                  <p>Weak across both sites. A high-production tour is the single highest-converting asset for this category.</p>
                </div>
                <div className="common-card">
                  <span className="bang">⚠ Voice</span>
                  <h4>Messaging / ICP mismatch</h4>
                  <p>Content and communication don't match target audience or ICP. Needs a more luxurious, well-branded voice.</p>
                </div>
              </div>

              <div className="sm-hr"></div>

              <div className="sh-kicker" style={{ marginBottom: 14 }}>Growth Opportunities</div>
              <div className="opp-grid">
                <div className="opp"><span className="n">/ 01</span><h4>University destination marketing</h4><p>BIST alumni land at top universities — and we are barely marketing it. The most credible proof we have.</p></div>
                <div className="opp"><span className="n">/ 02</span><h4>Early Years entry funnel</h4><p>Ages 2–5 carry the highest lifetime value. Capture the family before they've locked into a school.</p></div>
                <div className="opp"><span className="n">/ 03</span><h4>Expat relocation pipeline</h4><p>No school currently targets relocation agents. Owning this channel creates a defensible moat.</p></div>
                <div className="opp"><span className="n">/ 04</span><h4>SEO + GEO (AI search)</h4><p>Optimize for Google AND the new answer engines — ChatGPT, Perplexity, Google AI Overviews.</p></div>
                <div className="opp"><span className="n">/ 05</span><h4>Referral program at scale</h4><p>Word-of-mouth is the #1 driver in this category. Formalize what's happening informally.</p></div>
                <div className="opp"><span className="n">/ 06</span><h4>Trend shift: US → UK</h4><p>A long-run strategic bet: ride the shift from American to British education in the region.</p></div>
              </div>
            </div>
          </section>

          {/* ===== 02 BIST ===== */}
          <section id="bist">
            <div className="section-head">
              <div className="eyebrow">§ 02 / Brand</div>
              <div className="sh-title">
                <h2>BIST.<br /><span className="serif">World-class British</span> — for global families.</h2>
                <p>An audience-first, channel-specific growth plan for BIST over the next twelve months — ICP, funnel math, quarterly cadence, channel mix, and expected outcomes.</p>
              </div>
            </div>

            <div className="container">
              <div className="sh-kicker" style={{ marginBottom: 14 }}>Ideal Customer Profile</div>
              <div className="icp">
                <div className="icp-head">
                  <div className="icp-avatar placeholder">
                    <svg viewBox="0 0 280 160" preserveAspectRatio="xMidYMid slice">
                      <defs>
                        <pattern id="bist-p" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
                          <line x1="0" y1="0" x2="0" y2="8" stroke="var(--line)" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="280" height="160" fill="var(--bg-2)" />
                      <rect width="280" height="160" fill="url(#bist-p)" />
                      <circle cx="110" cy="80" r="46" fill="var(--accent)" opacity="0.18" />
                      <circle cx="170" cy="80" r="46" fill="var(--ink)" opacity="0.08" />
                    </svg>
                    <span className="placeholder-label">persona · family portrait</span>
                  </div>
                  <div>
                    <div className="icp-name">Sarah &amp; James<small>Expat family · Tbilisi</small></div>
                    <dl className="dl" style={{ marginTop: 14, gridTemplateColumns: "110px 1fr", gap: "6px 14px" }}>
                      <dt>Age</dt><dd>35 – 45</dd>
                      <dt>Origin</dt><dd>UK / US</dd>
                      <dt>Sector</dt><dd>NGO · Embassy · Corporate</dd>
                      <dt>Children</dt><dd>2 kids · ages 4 &amp; 8</dd>
                      <dt>Income</dt><dd>$150–200K+ / year</dd>
                    </dl>
                  </div>
                </div>
                <div className="icp-body">
                  <div className="icp-block">
                    <h5>Goals</h5>
                    <ul className="icp-list"><li>British curriculum</li><li>Global university pipeline</li><li>Safe, multicultural community</li><li>Strong pastoral care</li></ul>
                  </div>
                  <div className="icp-block">
                    <h5>Pain Points</h5>
                    <ul className="icp-list"><li>Limited time (relocating)</li><li>Unclear fees</li><li>Mid-year entry needed</li><li>Cultural exposure for kids</li></ul>
                  </div>
                  <div className="icp-block">
                    <h5>Decision Triggers</h5>
                    <ul className="icp-list"><li>"international school Tbilisi" search</li><li>Relocation agent recommendation</li><li>Embassy family list</li><li>Expat FB group / word of mouth</li></ul>
                  </div>
                  <div className="icp-block">
                    <h5>Top Channels</h5>
                    <ul className="icp-list"><li>Google Search · 70%</li><li>Facebook expat groups</li><li>Relocation agents</li><li>bist.ge + virtual tour</li></ul>
                  </div>
                </div>
              </div>
              <div className="note" style={{ marginTop: 10 }}>Working hypothesis — to be validated in Days 1–30 via custdev interviews with current parents.</div>

              <div className="sm-hr"></div>

              <div className="sh-kicker" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                <span>Full-Funnel Math · BIST</span>
                <span>Target LTV : CAC · 5–5.5 : 1</span>
              </div>
              <div>
                <div className="funnel"><div className="stage"><span className="label">Awareness</span><span className="count">10,000 reached</span></div><div className="bar"><i style={{ width: "100%" }}></i><span className="rate">20–25%</span></div><div className="channels">Meta · Google Display · YouTube · SEO+GEO · PR</div></div>
                <div className="funnel"><div className="stage"><span className="label">Interest</span><span className="count">2,000</span></div><div className="bar"><i style={{ width: "62%" }}></i><span className="rate">3–5%</span></div><div className="channels">Search Ads · Retargeting · Blog · Email · Tour</div></div>
                <div className="funnel"><div className="stage"><span className="label">Enquiry</span><span className="count">60</span></div><div className="bar"><i style={{ width: "38%" }}></i><span className="rate">55–65%</span></div><div className="channels">CRM auto-response · WhatsApp · Phone · Scoring</div></div>
                <div className="funnel"><div className="stage"><span className="label">Visit</span><span className="count">33</span></div><div className="bar"><i style={{ width: "26%" }}></i><span className="rate">70–76%</span></div><div className="channels">Open Days · Private tours · Tasters · Ambassadors</div></div>
                <div className="funnel"><div className="stage"><span className="label">Application</span><span className="count">23</span></div><div className="bar"><i style={{ width: "18%" }}></i><span className="rate">70–75%</span></div><div className="channels">Online app · Assessment · $325K Scholarship</div></div>
                <div className="funnel"><div className="stage"><span className="label">Enrolled</span><span className="count">16 students</span></div><div className="bar"><i style={{ width: "12%" }}></i><span className="rate">—</span></div><div className="channels">Welcome pack · Onboarding · Buddy · Portal</div></div>
              </div>

              <div className="sm-hr"></div>

              <div className="sh-kicker" style={{ marginBottom: 14 }}>12-Month Timeline · BIST</div>
              <div className="tl">
                <div className="tl-col">
                  <div className="phase"><span className="m">M1–3</span><span className="t">Foundation</span></div>
                  <ul>
                    <li>Marketing audit, analytics, custdev</li>
                    <li>CRM setup + lead scoring</li>
                    <li>Website conversion optimization</li>
                    <li>SEO+GEO · target keywords</li>
                    <li>Google Search campaigns</li>
                    <li>Content + first campaigns</li>
                  </ul>
                </div>
                <div className="tl-col">
                  <div className="phase"><span className="m">M4–6</span><span className="t">Growth</span></div>
                  <ul>
                    <li>Open Day campaign · peak</li>
                    <li>Meta lookalike / custom audiences</li>
                    <li>Relocation agent partnerships</li>
                    <li>Little Learners tasters</li>
                    <li>Video · campus + testimonials</li>
                    <li>Email nurture sequences</li>
                  </ul>
                </div>
                <div className="tl-col">
                  <div className="phase"><span className="m">M7–9</span><span className="t">Optimize</span></div>
                  <ul>
                    <li>A/B test pages + creative</li>
                    <li>Retargeting visited-not-applied</li>
                    <li>YouTube pre-roll stories</li>
                    <li>Parent ambassador launch</li>
                    <li>Embassy partnerships</li>
                    <li>Quarterly NPS survey</li>
                  </ul>
                </div>
                <div className="tl-col">
                  <div className="phase"><span className="m">M10–12</span><span className="t">Scale</span></div>
                  <ul>
                    <li>International directory listings</li>
                    <li>PR · university destinations</li>
                    <li>Budget reallocation</li>
                    <li>Pre-enrollment campaign</li>
                    <li>Alumni video series</li>
                    <li>Next-year strategy</li>
                  </ul>
                </div>
              </div>

              <div className="sm-hr"></div>

              <div className="sh-kicker" style={{ marginBottom: 14 }}>Channel Strategy &amp; Budget Mix · BIST</div>
              <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius)", background: "var(--panel)", overflowX: "auto" }}>
                <table className="channels-tbl">
                  <thead><tr><th style={{ width: 200 }}>Channel</th><th style={{ width: 180 }}>Budget Mix</th><th>Focus</th><th style={{ width: 160 }}>Target</th></tr></thead>
                  <tbody>
                    <tr><td className="ch-name">Google Ads · Search</td><td><div className="pct"><span className="bar"><i style={{ width: "100%" }}></i></span><span className="n">30%</span></div></td><td>High-intent queries: "international school Tbilisi". Expat vs Georgian campaigns.</td><td><span className="pill accent">CPL &lt; $35</span></td></tr>
                    <tr><td className="ch-name">Meta Ads · FB / IG</td><td><div className="pct"><span className="bar"><i style={{ width: "83%" }}></i></span><span className="n">25%</span></div></td><td>Lookalikes. Interest targeting: expat, education, relocation.</td><td><span className="pill accent">CPL &lt; $25</span></td></tr>
                    <tr><td className="ch-name">SEO + GEO · Content</td><td><div className="pct"><span className="bar"><i style={{ width: "50%" }}></i></span><span className="n">15%</span></div></td><td>20+ articles Y1 · AI-optimized for ChatGPT / Perplexity / Google AI.</td><td><span className="pill ok">Traffic +200%</span></td></tr>
                    <tr><td className="ch-name">Events &amp; Open Days</td><td><div className="pct"><span className="bar"><i style={{ width: "50%" }}></i></span><span className="n">15%</span></div></td><td>4 Open Days · Little Learners tasters · Embassy sessions.</td><td><span className="pill accent">50+ families</span></td></tr>
                    <tr><td className="ch-name">Partnerships &amp; PR</td><td><div className="pct"><span className="bar"><i style={{ width: "33%" }}></i></span><span className="n">10%</span></div></td><td>Relocation agents · Embassy network · Georgia Today · LinkedIn.</td><td><span className="pill accent">5+ mentions / qtr</span></td></tr>
                    <tr><td className="ch-name">Referral Program</td><td><div className="pct"><span className="bar"><i style={{ width: "17%" }}></i></span><span className="n">5%</span></div></td><td>Fee credit · 15–20 ambassadors · CRM-tracked.</td><td><span className="pill ok">15% referrals</span></td></tr>
                  </tbody>
                </table>
              </div>

              <div className="sm-hr"></div>

              <div className="sh-kicker" style={{ marginBottom: 14 }}>Expected Outcomes · Year 1 · BIST</div>
              <div className="outcomes">
                <div className="outc"><div className="v accent">+30%</div><div className="l">Qualified inquiries</div><div className="sub">Year 1</div></div>
                <div className="outc"><div className="v accent">+20%</div><div className="l">Net enrollment</div><div className="sub">vs prior year</div></div>
                <div className="outc"><div className="v accent">3×</div><div className="l">Marketing ROI</div><div className="sub">Revenue per $</div></div>
                <div className="outc"><div className="v">&lt;$35</div><div className="l">Cost per lead</div><div className="sub">Blended</div></div>
                <div className="outc"><div className="v">650+</div><div className="l">Total students</div><div className="sub">From 520</div></div>
                <div className="outc"><div className="v">80+</div><div className="l">Post-16 students</div><div className="sub">From 54</div></div>
              </div>
            </div>
          </section>

          {/* ===== 03 BGA ===== */}
          <section id="bga">
            <div className="section-head">
              <div className="eyebrow">§ 03 / Brand</div>
              <div className="sh-title">
                <h2>BGA.<br /><span className="serif">Georgian roots,</span> global reach.</h2>
                <p>Georgia's leading bilingual school — growing the IB track, expanding from the 37K organic base, and deepening mixed-family appeal.</p>
              </div>
            </div>

            <div className="container">
              <div className="sh-kicker" style={{ marginBottom: 14 }}>Ideal Customer Profile</div>
              <div className="icp">
                <div className="icp-head">
                  <div className="icp-avatar placeholder">
                    <svg viewBox="0 0 280 160" preserveAspectRatio="xMidYMid slice">
                      <rect width="280" height="160" fill="var(--bg-2)" />
                      <g>
                        <rect x="40" y="40" width="80" height="80" fill="var(--accent)" opacity="0.15" />
                        <rect x="80" y="60" width="80" height="80" fill="var(--ink)" opacity="0.08" />
                        <rect x="120" y="40" width="80" height="80" fill="var(--accent)" opacity="0.12" />
                      </g>
                    </svg>
                    <span className="placeholder-label">persona · family portrait</span>
                  </div>
                  <div>
                    <div className="icp-name">Giorgi &amp; Nino<small>Georgian family · Vake</small></div>
                    <dl className="dl" style={{ marginTop: 14, gridTemplateColumns: "110px 1fr", gap: "6px 14px" }}>
                      <dt>Age</dt><dd>32 – 42</dd>
                      <dt>Origin</dt><dd>Georgian</dd>
                      <dt>Sector</dt><dd>Business · Professional</dd>
                      <dt>Children</dt><dd>2 kids · ages 3 &amp; 10</dd>
                      <dt>Income</dt><dd>30K+ GEL / month</dd>
                    </dl>
                  </div>
                </div>
                <div className="icp-body">
                  <div className="icp-block"><h5>Goals</h5>
                    <ul className="icp-list"><li>Bilingual education</li><li>Georgian identity + global access</li><li>IB for EU / US universities</li><li>Strong local community</li></ul>
                  </div>
                  <div className="icp-block"><h5>Pain Points</h5>
                    <ul className="icp-list"><li>Losing Georgian culture</li><li>IB still new at BGA</li><li>Price sensitivity</li><li>Want proven results</li></ul>
                  </div>
                  <div className="icp-block"><h5>Decision Triggers</h5>
                    <ul className="icp-list"><li>Friend's recommendation</li><li>FB post / ad</li><li>Open Day</li><li>IB availability</li></ul>
                  </div>
                  <div className="icp-block"><h5>Top Channels</h5>
                    <ul className="icp-list"><li>Facebook · 60%</li><li>Word of mouth</li><li>Georgian media</li><li>Instagram · bga.ge</li></ul>
                  </div>
                </div>
              </div>

              <div className="sm-hr"></div>

              <div className="sh-kicker" style={{ marginBottom: 14 }}>12-Month Timeline · BGA</div>
              <div className="tl">
                <div className="tl-col"><div className="phase"><span className="m">M1–3</span><span className="t">Foundation</span></div><ul>
                  <li>Audit social · 37K Facebook base</li>
                  <li>CRM + lead scoring</li>
                  <li>Website · IB + outcomes</li>
                  <li>Georgian content strategy</li>
                  <li>Meta engagement plan</li>
                  <li>Parent NPS survey</li>
                </ul></div>
                <div className="tl-col"><div className="phase"><span className="m">M4–6</span><span className="t">Growth</span></div><ul>
                  <li>Open Day · IB showcase</li>
                  <li>Georgian media PR</li>
                  <li>Video · alumni success</li>
                  <li>Meta Live · tours &amp; Q&amp;A</li>
                  <li>Corporate partnerships</li>
                  <li>IB results press</li>
                </ul></div>
                <div className="tl-col"><div className="phase"><span className="m">M7–9</span><span className="t">Optimize</span></div><ul>
                  <li>A/B Georgian vs English creative</li>
                  <li>IG student takeovers</li>
                  <li>University showcase event</li>
                  <li>Cross-campus summer camp</li>
                  <li>Ambassador recruitment</li>
                  <li>Quarterly NPS review</li>
                </ul></div>
                <div className="tl-col"><div className="phase"><span className="m">M10–12</span><span className="t">Scale</span></div><ul>
                  <li>Re-enrollment · January</li>
                  <li>Annual gala + awards</li>
                  <li>IB destinations campaign</li>
                  <li>2027 strategy + budget</li>
                  <li>Alumni network build-out</li>
                  <li>Brand visual refresh</li>
                </ul></div>
              </div>

              <div className="sm-hr"></div>

              <div className="sh-kicker" style={{ marginBottom: 14 }}>Channel Strategy &amp; Budget Mix · BGA</div>
              <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius)", background: "var(--panel)", overflowX: "auto" }}>
                <table className="channels-tbl">
                  <thead><tr><th style={{ width: 200 }}>Channel</th><th style={{ width: 180 }}>Budget Mix</th><th>Focus</th><th style={{ width: 160 }}>Target</th></tr></thead>
                  <tbody>
                    <tr><td className="ch-name">Meta · Organic + Paid</td><td><div className="pct"><span className="bar"><i style={{ width: "100%" }}></i></span><span className="n">35%</span></div></td><td>37K base leveraged. Daily Georgian. Lookalike. FB Groups. Lives.</td><td><span className="pill ok">Engagement 5%+</span></td></tr>
                    <tr><td className="ch-name">Instagram &amp; TikTok</td><td><div className="pct"><span className="bar"><i style={{ width: "57%" }}></i></span><span className="n">20%</span></div></td><td>Student reels, day-in-life, teacher spotlights, GEO-subtitled.</td><td><span className="pill ok">+30% followers</span></td></tr>
                    <tr><td className="ch-name">Google Ads</td><td><div className="pct"><span className="bar"><i style={{ width: "43%" }}></i></span><span className="n">15%</span></div></td><td>Georgian + English. "IB school Tbilisi". Comparison pages.</td><td><span className="pill accent">CPL &lt; $30</span></td></tr>
                    <tr><td className="ch-name">Georgian Media &amp; PR</td><td><div className="pct"><span className="bar"><i style={{ width: "43%" }}></i></span><span className="n">15%</span></div></td><td>TV segments · local mags · IB results · thought leadership.</td><td><span className="pill accent">10+ mentions</span></td></tr>
                    <tr><td className="ch-name">Events &amp; Community</td><td><div className="pct"><span className="bar"><i style={{ width: "29%" }}></i></span><span className="n">10%</span></div></td><td>Open Days · BGA Gala · TEDx Lisi Lake · sports tournaments.</td><td><span className="pill accent">60+ families</span></td></tr>
                    <tr><td className="ch-name">Referral &amp; Corporate</td><td><div className="pct"><span className="bar"><i style={{ width: "14%" }}></i></span><span className="n">5%</span></div></td><td>Fee credit · corporate program · BIST cross-referral · alumni.</td><td><span className="pill ok">20% referrals</span></td></tr>
                  </tbody>
                </table>
              </div>

              <div className="sm-hr"></div>

              <div className="sh-kicker" style={{ marginBottom: 14 }}>Expected Outcomes · Year 1 · BGA</div>
              <div className="outcomes">
                <div className="outc"><div className="v accent">+25%</div><div className="l">Qualified inquiries</div><div className="sub">From all channels</div></div>
                <div className="outc"><div className="v accent">+15%</div><div className="l">Net enrollment</div><div className="sub">New students vs prior year</div></div>
                <div className="outc"><div className="v accent">3×</div><div className="l">Marketing ROI</div><div className="sub">Revenue per $ spent</div></div>
                <div className="outc"><div className="v">&lt;$20</div><div className="l">Cost per lead</div><div className="sub">Blended · FB-heavy</div></div>
                <div className="outc"><div className="v">600+</div><div className="l">Total students</div><div className="sub">From ~500 baseline</div></div>
                <div className="outc"><div className="v">NPS 50+</div><div className="l">Parent satisfaction</div><div className="sub">Quarterly measurement</div></div>
              </div>
            </div>
          </section>

          {/* ===== BRAND ARCHITECTURE ===== */}
          <section id="arch">
            <div className="section-head">
              <div className="eyebrow">— / Positioning</div>
              <div className="sh-title">
                <h2>Brand architecture.<br />Differentiation prevents <span className="serif">cannibalization.</span></h2>
                <p>Two brands, one campus. Sharp lines between them protect both — while the shared infrastructure quietly compounds.</p>
              </div>
            </div>

            <div className="container">
              <div className="arch">
                <div className="arch-col">
                  <span className="label">BIST — "World-Class British Education"</span>
                  <h4>Where fifty nationalities thrive.</h4>
                  <dl className="dl" style={{ gridTemplateColumns: "120px 1fr" }}>
                    <dt>Audience</dt><dd>International / expat families</dd>
                    <dt>Language</dt><dd>100% English</dd>
                    <dt>Curriculum</dt><dd>Cambridge · IGCSE + A-Level</dd>
                    <dt>Identity</dt><dd>Global citizen</dd>
                    <dt>Hook</dt><dd>"Where 50 nationalities thrive"</dd>
                  </dl>
                </div>
                <div className="arch-col">
                  <span className="label">BGA — "Georgian Roots, Global Reach"</span>
                  <h4>No barriers to your future.</h4>
                  <dl className="dl" style={{ gridTemplateColumns: "120px 1fr" }}>
                    <dt>Audience</dt><dd>Georgian + mixed families</dd>
                    <dt>Language</dt><dd>Bilingual · EN + GE</dd>
                    <dt>Curriculum</dt><dd>Cambridge + IB + Georgian</dd>
                    <dt>Identity</dt><dd>Georgian + global access</dd>
                    <dt>Hook</dt><dd>"No barriers to your future"</dd>
                  </dl>
                </div>
                <div className="arch-shared">
                  <strong>Shared · Lisi Lake Campus</strong>
                  <span>World-class facilities</span>
                  <span>·</span>
                  <span>British values</span>
                  <span>·</span>
                  <span>Joint summer camp</span>
                  <span>·</span>
                  <span>Cross-referral pipeline</span>
                </div>
              </div>

              <div className="sm-hr"></div>

              <div className="sh-kicker" style={{ marginBottom: 14 }}>Key Value Propositions · Why parents choose us over every alternative</div>
              <div className="vprops">
                <div className="vprop">
                  <h4>BIST · Why us over QSI or others?</h4>
                  <div className="sub">Seven reasons we carry more weight for global families.</div>
                  <ol>
                    <li>Only COBIS-accredited British school in Georgia — internationally verified quality</li>
                    <li>Cambridge IGCSE + A-Levels: the gold standard for UK and global university entry</li>
                    <li>All British or UK-trained teachers — not adapted, authentically British</li>
                    <li>50+ nationalities: multicultural immersion, not a claim</li>
                    <li>17,000 sqm purpose-built Lisi Lake campus · Innovation Centre, arts, sports, clubs</li>
                    <li>$325K Founder's Scholarship for exceptional candidates</li>
                    <li>Dedicated university counsellor · personalised pathway to top global institutions</li>
                  </ol>
                </div>
                <div className="vprop">
                  <h4>BGA · Why us over European School?</h4>
                  <div className="sub">Seven reasons families staying in Georgia still get the world.</div>
                  <ol>
                    <li>Triple pathway: IB Diploma + Cambridge + Georgian Diploma — maximum flexibility</li>
                    <li>True bilingual model: Georgian identity preserved while gaining global access</li>
                    <li>Founded by Georgians, for Georgians — understands local values and aspirations</li>
                    <li>Shared campus with BIST: access to world-class British facilities and community</li>
                    <li>IB Diploma opens doors to US, UK, EU universities with globally recognized credential</li>
                    <li>Growing IB track record — early graduates are already proving the pathway</li>
                    <li>TEDx Lisi Lake, Research Conference — signature events building intellectual brand</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* ===== 04 DIGITAL ===== */}
          <section id="digital">
            <div className="section-head">
              <div className="eyebrow">§ 04 / Engine</div>
              <div className="sh-title">
                <h2>Digital ecosystem<br />&amp; lead generation.</h2>
                <p>CRM, SEO+GEO, website, social, content, and analytics — connected as one system so nothing leaks and every dollar is traceable.</p>
              </div>
            </div>

            <div className="container">
              <div className="eco-grid">
                <div className="eco-seo">
                  <div className="eco-head"><h4>SEO — Search Engine</h4><span className="tag">Classic</span></div>
                  <div className="kv">
                    <div>Keywords: "international school Tbilisi", "British school Georgia"</div>
                    <div>20+ blog articles Y1 · parent guides, comparisons</div>
                    <div>Technical: speed, mobile-first, schema markup</div>
                    <div>Local: Google Business Profile + reviews</div>
                    <div>Backlinks: ISC, expat blogs, Georgian media</div>
                    <div><strong className="hl">Target · 3,000 organic visits / mo</strong></div>
                  </div>
                </div>

                <div className="eco-geo">
                  <div className="eco-head"><h4>GEO — Generative Engine</h4><span className="tag" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>New</span></div>
                  <div className="kv">
                    <div>Optimize for ChatGPT, Perplexity, Google AI Overviews</div>
                    <div>Structured FAQ pages with citation-worthy answers</div>
                    <div>Entity optimization · knowledge graphs + AI data</div>
                    <div>Authoritative content · interviews, data-rich comparisons</div>
                    <div>Mention strategy · high-authority education sites</div>
                    <div><strong className="hl">Monitor AI mentions, correct inaccuracies</strong></div>
                  </div>
                </div>

                <div className="eco-web">
                  <div className="eco-head"><h4>Website &amp; Conversion</h4><span className="tag">Foundation</span></div>
                  <div className="grid-2" style={{ gap: 20 }}>
                    <div>
                      <strong style={{ fontSize: 13 }}>Separate BIST &amp; BGA landing pages</strong>
                      <p style={{ fontSize: 13, color: "var(--muted)", margin: "6px 0 0" }}>Audience-specific journeys. BIST: English-first, expat-focused. BGA: Georgian-first, bilingual. Each with tailored CTAs, testimonials, virtual tour.</p>
                    </div>
                    <div>
                      <strong style={{ fontSize: 13 }}>Conversion-focused design</strong>
                      <p style={{ fontSize: 13, color: "var(--muted)", margin: "6px 0 0" }}>Clear CTAs above the fold, inquiry + WhatsApp widget, virtual tour, fee range at minimum, AI chat-bot.</p>
                    </div>
                    <div>
                      <strong style={{ fontSize: 13 }}>Mobile-first optimization</strong>
                      <p style={{ fontSize: 13, color: "var(--muted)", margin: "6px 0 0" }}>Parents research on phones — commutes, work, bed. Current WordPress site needs speed, UX, and mobile conversion audit.</p>
                    </div>
                    <div>
                      <strong style={{ fontSize: 13 }}>A/B testing programme</strong>
                      <p style={{ fontSize: 13, color: "var(--muted)", margin: "6px 0 0" }}>Test headlines, CTAs, form length, images, social proof. Monthly iteration cycle. Track conversion by audience.</p>
                    </div>
                  </div>
                </div>

                <div className="eco-an">
                  <div className="eco-head"><h4>Analytics</h4><span className="tag">Weekly</span></div>
                  <div className="kv" style={{ gap: 10 }}>
                    <div><strong>GA4 + Looker Studio</strong> — traffic + conversion</div>
                    <div><strong>Hotjar</strong> — UX heatmaps on key pages</div>
                    <div><strong>CRM custom reports</strong> — funnel + pipeline</div>
                    <div><strong>Semrush + AI tracking</strong> — SEO + GEO</div>
                    <div><strong>Native + scheduler</strong> — social growth</div>
                    <div><strong>Survey tools</strong> — NPS · sentiment</div>
                  </div>
                </div>

                <div className="eco-social">
                  <div className="eco-head"><h4>Social Strategy · Platform-specific</h4><span className="tag">BIST + BGA</span></div>
                  <div className="grid-2" style={{ gap: 20 }}>
                    <div>
                      <span className="tag bist" style={{ marginBottom: 10, display: "inline-flex" }}>BIST</span>
                      <ul style={{ margin: "8px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "var(--ink-2)" }}>
                        <li><strong>IG primary</strong> · campus, spotlights, teacher Q&amp;As · 4–5 / wk</li>
                        <li><strong>FB</strong> · expat groups, testimonials, Open Days</li>
                        <li><strong>YouTube</strong> · virtual tour, "where are they now"</li>
                        <li><strong>LinkedIn</strong> · principal thought leadership</li>
                        <li><em style={{ color: "var(--muted)" }}>Tone · warm, international, aspirational · English only</em></li>
                      </ul>
                    </div>
                    <div>
                      <span className="tag bga" style={{ marginBottom: 10, display: "inline-flex" }}>BGA</span>
                      <ul style={{ margin: "8px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "var(--ink-2)" }}>
                        <li><strong>FB primary</strong> · 37K base · daily Georgian · Lives for tours</li>
                        <li><strong>IG</strong> · student takeovers · GE w/ EN subs</li>
                        <li><strong>TikTok</strong> · younger pipeline · BTS · trending audio</li>
                        <li><strong>YouTube</strong> · IB explainer · parent testimonials</li>
                        <li><em style={{ color: "var(--muted)" }}>Tone · proud, Georgian, modern, ambitious · bilingual</em></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="eco-content">
                  <div className="eco-head"><h4>Content Strategy</h4><span className="tag">Cadence</span></div>
                  <div className="kv" style={{ gap: 10, fontSize: 13 }}>
                    <div><strong>Blog / SEO+GEO</strong> · 2–3 / mo · parent guides, comparisons, curriculum explainers · bilingual</div>
                    <div><strong>Video</strong> · 4–6 / mo · virtual tour hero, day-in-life, teachers, testimonials, alumni · 60s + 3–5min</div>
                    <div><strong>Email nurture</strong> · 6-email sequence on inquiry · welcome → tour → testimonial → Open Day → apply</div>
                    <div><strong>Social</strong> · 4–5 / week / brand · themed weeks · monthly calendar</div>
                    <div><strong>Print + events</strong> · quarterly · Open Day brochures · welcome packs · campus maps · scholarship guides</div>
                  </div>
                </div>

                <div className="eco-crm">
                  <div className="eco-head"><h4>CRM Lead Lifecycle</h4><span className="tag">End-to-end</span></div>
                  <div className="crm">
                    <div className="crm-step"><span className="n">/ 01</span><span className="t">Lead Capture</span><span className="d">Auto-create with source attribution.</span></div>
                    <div className="crm-step"><span className="n">/ 02</span><span className="t">Auto-Response · 5m</span><span className="d">AI or human. Email + prospectus. Score 0–100.</span></div>
                    <div className="crm-step"><span className="n">/ 03</span><span className="t">Officer Assign</span><span className="d">By year group. 24h follow-up.</span></div>
                    <div className="crm-step"><span className="n">/ 04</span><span className="t">Qualify &amp; Nurture</span><span className="d">AI / human. Fast-track or monthly nurture.</span></div>
                    <div className="crm-step"><span className="n">/ 05</span><span className="t">Visit Scheduling</span><span className="d">Personalized tour. Feedback in 2h.</span></div>
                    <div className="crm-step"><span className="n">/ 06</span><span className="t">Post-Visit Convert</span><span className="d">48h follow-up. Hot-lead flags.</span></div>
                    <div className="crm-step"><span className="n">/ 07</span><span className="t">App → Enrolled</span><span className="d">Acceptance triggers welcome.</span></div>
                    <div className="crm-step"><span className="n">/ 08</span><span className="t">Report &amp; Optimize</span><span className="d">Weekly pipeline · quarterly CPE.</span></div>
                  </div>
                </div>
              </div>

              <div className="sm-hr"></div>

              <div className="sh-kicker" style={{ marginBottom: 14 }}>Data &amp; Analytics Framework</div>
              <div style={{ overflowX: "auto", border: "1px solid var(--line)", borderRadius: "var(--radius)", background: "var(--panel)" }}>
                <table className="channels-tbl">
                  <thead><tr><th>Metric</th><th>Tool</th><th>Frequency</th><th>Owner</th></tr></thead>
                  <tbody>
                    <tr><td>Website traffic + conversion rate</td><td>GA4 + Looker Studio + Hotjar</td><td>Weekly</td><td>Advertiser</td></tr>
                    <tr><td>Lead quality + pipeline stage</td><td>CRM</td><td>Weekly</td><td>Sr. Account Manager</td></tr>
                    <tr><td>Ad performance · CPC, CPL, ROAS</td><td>Google + Meta dashboards</td><td>Weekly</td><td>Advertiser</td></tr>
                    <tr><td>Social engagement + growth</td><td>Native analytics + scheduler</td><td>Bi-weekly</td><td>Copywriter</td></tr>
                    <tr><td>Enrollment funnel</td><td>CRM custom reports</td><td>Monthly</td><td>Sr. Account Manager</td></tr>
                    <tr><td>Brand sentiment + NPS</td><td>Survey tools + Google Reviews</td><td>Quarterly</td><td>Sr. Account Manager</td></tr>
                    <tr><td>SEO + GEO performance</td><td>Semrush + AI mention tracking</td><td>Monthly</td><td>Copywriter</td></tr>
                    <tr><td>Cost per enrolled student</td><td>CRM + finance data</td><td>Quarterly</td><td>Sr. Account Manager</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ===== 05 RETENTION ===== */}
          <section id="retention">
            <div className="section-head">
              <div className="eyebrow">§ 05 / Retention</div>
              <div className="sh-title">
                <h2>Retention is the<br />highest-margin <span className="serif">growth lever.</span></h2>
                <p>Acquisition gets attention. Retention compounds. Four interlocking programs keep parents, students, and alumni connected — and turn them into our strongest channel.</p>
              </div>
            </div>

            <div className="container">
              <div className="ret-grid">
                <div className="ret-card">
                  <div className="icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12c2-4 6-7 9-7s7 3 9 7c-2 4-6 7-9 7s-7-3-9-7z" /><circle cx="12" cy="12" r="3" /></svg>
                  </div>
                  <h4>Parent NPS &amp; Satisfaction</h4>
                  <p>Quarterly NPS survey, trended in CRM. Detractors flagged within 48 hours for personal follow-up. Promoters are funneled directly into the ambassador program.</p>
                </div>
                <div className="ret-card">
                  <div className="icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="8" r="3" /><path d="M3 20c0-3 3-5 6-5s6 2 6 5" /><path d="M21 20c0-2-2-4-4-4" /></svg>
                  </div>
                  <h4>Ambassador &amp; Referral</h4>
                  <p>15–20 ambassadors per school. Open Day presence, social content, fee-credit incentive. CRM-tracked so the loop is measurable, not vibes.</p>
                </div>
                <div className="ret-card">
                  <div className="icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18" /><path d="M8 2v4" /><path d="M16 2v4" /></svg>
                  </div>
                  <h4>Re-enrollment &amp; At-Risk CRM</h4>
                  <p>Risk flags for missed meetings, fee delays, or engagement drops. January early-bird reactivation. Exit interviews to harvest pattern learnings.</p>
                </div>
                <div className="ret-card">
                  <div className="icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l2.5 6 6.5.5-5 4.5 1.5 6.5L12 16l-5.5 3.5L8 13 3 8.5 9.5 8z" /></svg>
                  </div>
                  <h4>Alumni &amp; Reputation</h4>
                  <p>"Where Are They Now" video series. Google Reviews answered within 24 hours. University-destination PR — our most credible proof, surfaced at every decision moment.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== 06 90 DAYS ===== */}
          <section id="ninety">
            <div className="section-head">
              <div className="eyebrow">§ 06 / Sprint</div>
              <div className="sh-title">
                <h2>First 90 days.<br />Clarity, data, <span className="serif">quick wins.</span></h2>
                <p>Three sprints of 30 days. Listen first. Build second. Optimize and present the next twelve months to the boards.</p>
              </div>
            </div>

            <div className="container">
              <div className="day-grid">
                <div className="day-col">
                  <span className="days">Days 01 – 30</span>
                  <h4>Listen &amp; Audit</h4>
                  <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, fontSize: 14, color: "var(--ink-2)" }}>
                    <li>— Marketing audit (both schools)</li>
                    <li>— Interview all stakeholders</li>
                    <li>— Map the funnels end-to-end</li>
                    <li>— GA4 + CRM baseline</li>
                    <li>— Competitive audit</li>
                    <li>— Launch 3 quick-win campaigns</li>
                  </ul>
                </div>
                <div className="day-col">
                  <span className="days">Days 31 – 60</span>
                  <h4>Build &amp; Launch</h4>
                  <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, fontSize: 14, color: "var(--ink-2)" }}>
                    <li>— Google Ads + Meta Ads live</li>
                    <li>— CRM lead tracking active</li>
                    <li>— Content calendar in motion</li>
                    <li>— First Open Day run</li>
                    <li>— Website conversion optimization</li>
                    <li>— Parent survey fielded</li>
                  </ul>
                </div>
                <div className="day-col">
                  <span className="days">Days 61 – 90</span>
                  <h4>Optimize &amp; Present</h4>
                  <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, fontSize: 14, color: "var(--ink-2)" }}>
                    <li>— Review data, reallocate spend</li>
                    <li>— 12-month strategy to directors</li>
                    <li>— Referral + ambassador programs</li>
                    <li>— Monthly reporting cadence</li>
                    <li>— Relocation agent partnerships</li>
                    <li>— Year 1 KPIs with leadership</li>
                  </ul>
                </div>
              </div>

              <div className="sm-hr"></div>

              <div className="sh-kicker" style={{ marginBottom: 14 }}>3 Quick-Win Campaigns · launched in Days 1–30 · each feeds the next</div>
              <div className="qw">
                <div className="qw-card">
                  <span className="step">Campaign 01 · Awareness</span>
                  <h4>Video ads + engagement</h4>
                  <ul>
                    <li>Meta video ads · 60-sec campus highlight reel</li>
                    <li>Targeting: parents in Tbilisi · age 28–50</li>
                    <li>Objective: Video Views + Engagement</li>
                    <li>Budget: $500–800 · first 2 weeks</li>
                    <li>Content: drone campus, student smiles, facilities, Lisi Lake</li>
                    <li>Target: 50K+ impressions · 15K+ video views</li>
                  </ul>
                  <div className="out">↓ Output · custom audience of engaged viewers</div>
                </div>
                <div className="qw-arrow">→</div>
                <div className="qw-card">
                  <span className="step">Campaign 02 · Warm-up</span>
                  <h4>Lead-gen carousels</h4>
                  <ul>
                    <li>Carousel / lead-gen to Campaign 1 viewers only</li>
                    <li>Content: parent testimonials · "Why we chose" · differentiators · tour preview</li>
                    <li>CTA: download prospectus / book Open Day / virtual tour</li>
                    <li>Builds email list + identifies high-intent leads via CRM tagging</li>
                    <li>Target: 500+ prospectus · 200+ Open Day sign-ups · lookalike built</li>
                  </ul>
                  <div className="out">↓ Output · email list + lookalike + high-intent segment</div>
                </div>
                <div className="qw-arrow">→</div>
                <div className="qw-card">
                  <span className="step">Campaign 03 · Convert</span>
                  <h4>Retargeting + search</h4>
                  <ul>
                    <li>Retargeting: downloaders who didn't inquire, site visitors, Open Day no-shows</li>
                    <li>Content: urgency · scholarship deadline · student success story</li>
                    <li>Google Search parallel · capture "international school Tbilisi"</li>
                    <li>CTA: submit inquiry · schedule tour · call admissions</li>
                    <li>Target: 30+ qualified inquiries · 15+ visits · first paid enrollments</li>
                  </ul>
                  <div className="out">↓ Output · qualified inquiries + school visits + enrollments</div>
                </div>
              </div>
              <div className="note" style={{ marginTop: 14 }}>Awareness (video views) → Warm audience (prospectus + email) → Retarget (inquiries + visits) → Enrolled students.</div>

              <div className="sm-hr"></div>

              <div className="sh-kicker" style={{ marginBottom: 14 }}>Stakeholder Engagement Plan</div>
              <div className="grid-4">
                <div className="card"><h3>Directors · BIST + BGA</h3><p>Weekly alignment. Strategy by Day 60. Shared KPIs. Monthly board meetings.</p></div>
                <div className="card"><h3>Admissions Team</h3><p>Funnel mapping. CRM dashboards. Lead-quality feedback loop.</p></div>
                <div className="card"><h3>Parents &amp; Students</h3><p>Focus groups + NPS. Ambassador program. Newsletter + WhatsApp.</p></div>
                <div className="card"><h3>Teaching Staff</h3><p>Spotlights. Classroom stories. Marketing should reflect real experience.</p></div>
              </div>
            </div>
          </section>

          {/* ===== 07 TEAM ===== */}
          <section id="team">
            <div className="section-head">
              <div className="eyebrow">§ 07 / Team</div>
              <div className="sh-title">
                <h2>The marketing engine.<br />Lean, <span className="serif">high-output,</span> scalable.</h2>
                <p>Four in-house roles with unambiguous ownership. Three outsourced lanes for capacity. Enough to run Georgia today — enough to seed regional expansion tomorrow.</p>
              </div>
            </div>

            <div className="container">
              <div className="sh-kicker" style={{ marginBottom: 14 }}>In-house · Core Team</div>
              <div className="team">
                <div className="tmb">
                  <span className="role">Role · 01</span>
                  <h4>Sr. Account Manager</h4>
                  <ul>
                    <li>Campaign management</li>
                    <li>School communication</li>
                    <li>Budget + reporting</li>
                    <li>Timeline + QA</li>
                    <li>NPS + CRM control</li>
                    <li>Parent QA</li>
                  </ul>
                  <span className="owns">Owns · strategy execution · stakeholder alignment</span>
                </div>
                <div className="tmb">
                  <span className="role">Role · 02</span>
                  <h4>Advertiser</h4>
                  <ul>
                    <li>Google + Meta Ads</li>
                    <li>Retargeting + lookalike</li>
                    <li>Budget optimization</li>
                    <li>A/B testing + analytics</li>
                  </ul>
                  <span className="owns">Owns · paid performance · CPL &amp; ROAS targets</span>
                </div>
                <div className="tmb">
                  <span className="role">Role · 03</span>
                  <h4>Designer</h4>
                  <ul>
                    <li>Ad creatives + visuals</li>
                    <li>Social graphics</li>
                    <li>Brand identity</li>
                    <li>Video editing</li>
                  </ul>
                  <span className="owns">Owns · visual brand · creative quality</span>
                </div>
                <div className="tmb">
                  <span className="role">Role · 04</span>
                  <h4>Copywriter</h4>
                  <ul>
                    <li>SEO+GEO blog content</li>
                    <li>Ad copy + landing pages</li>
                    <li>Email sequences</li>
                    <li>Bilingual content · EN + GE</li>
                  </ul>
                  <span className="owns">Owns · content calendar · brand voice</span>
                </div>
              </div>

              <div className="sm-hr"></div>

              <div className="sh-kicker" style={{ marginBottom: 14 }}>Outsourced · Scaling Capacity</div>
              <div className="grid-3">
                <div className="card" style={{ padding: 24 }}>
                  <span className="note" style={{ color: "var(--accent)" }}>Outsourced · 01</span>
                  <h3 style={{ marginTop: 8 }}>Jun / Mid Account Manager</h3>
                  <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", fontSize: 13, color: "var(--ink-2)", display: "flex", flexDirection: "column", gap: 4 }}>
                    <li>— Social media communication</li>
                    <li>— DMs + comments</li>
                    <li>— Partnerships · B2B, relocation agents</li>
                    <li>— Support for Sr. Account Manager</li>
                  </ul>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--accent)", marginTop: 14, paddingTop: 10, borderTop: "1px dashed var(--line)" }}>Owns · communication · partnerships</p>
                </div>
                <div className="card" style={{ padding: 24 }}>
                  <span className="note" style={{ color: "var(--accent)" }}>Outsourced · 02</span>
                  <h3 style={{ marginTop: 8 }}>Developer</h3>
                  <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", fontSize: 13, color: "var(--ink-2)", display: "flex", flexDirection: "column", gap: 4 }}>
                    <li>— Website dev + optimization</li>
                    <li>— CRM integrations + automation</li>
                    <li>— Landing page builds</li>
                    <li>— Technical SEO implementation</li>
                  </ul>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--accent)", marginTop: 14, paddingTop: 10, borderTop: "1px dashed var(--line)" }}>Owns · development · automation</p>
                </div>
                <div className="card" style={{ padding: 24 }}>
                  <span className="note" style={{ color: "var(--accent)" }}>Outsourced · 03</span>
                  <h3 style={{ marginTop: 8 }}>Production Team</h3>
                  <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", fontSize: 13, color: "var(--ink-2)", display: "flex", flexDirection: "column", gap: 4 }}>
                    <li>— Video production</li>
                    <li>— Photography</li>
                    <li>— Reels / short-form content</li>
                  </ul>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--accent)", marginTop: 14, paddingTop: 10, borderTop: "1px dashed var(--line)" }}>Owns · production · media</p>
                </div>
              </div>

              <div style={{ marginTop: 40, padding: 32, border: "1px solid var(--line)", background: "var(--panel)", borderRadius: "var(--radius)", display: "grid", gridTemplateColumns: "180px 1fr", gap: 24, alignItems: "center" }}>
                <div className="eyebrow">Scaling</div>
                <div style={{ fontSize: 20, color: "var(--ink-2)", letterSpacing: "-0.015em", lineHeight: 1.4, maxWidth: "60ch" }}>
                  This team is enough not only to successfully operate the local market — but to <em className="serif hl">initiate regional expansion</em> from the same payroll.
                </div>
              </div>
            </div>
          </section>

          {/* ===== FOOTER / CTA ===== */}
          <footer id="contact">
            <div className="ft-top">
              <div>
                <h3>Ready when<br />you are. <em>Let's build it.</em></h3>
                <div className="ft-row">
                  <a className="btn accent" href="mailto:artyom@example.com">→  Contact Artyom</a>
                  <a className="btn ghost" href="#" target="_blank" rel="noopener">LinkedIn</a>
                </div>
              </div>
              <div className="meta">
                <div>Author · Artyom Ananov</div>
                <div>Role · Marketing Lead (applying)</div>
                <div>Location · Tbilisi</div>
                <div>Languages · GE · EN · RU</div>
                <div>Experience · 8+ years · $750K+ ad spend managed</div>
              </div>
              <div className="meta">
                <div>Document · Strategy Brief V1.0</div>
                <div>Date · April 2026</div>
                <div>Status · Confidential draft</div>
                <div style={{ marginTop: 14 }}>↗ <a href="#top">Back to top</a></div>
              </div>
            </div>
            <div className="credit">
              <div>© 2026 · Prepared by Artyom Ananov for BIST + BGA leadership review</div>
              <div>Press <span className="kbd" style={{ background: "transparent", borderColor: "currentColor", color: "currentColor" }}>T</span> to open tweaks · <span className="kbd" style={{ background: "transparent", borderColor: "currentColor", color: "currentColor" }}>D</span> for dark mode</div>
            </div>
          </footer>
        </main>
      </div>

      {/* Tweaks panel */}
      <div className={`tweaks-panel${tweaksOpen ? " open" : ""}`}>
        <h5>Tweaks</h5>
        <div className="tweak-row">
          <label>Theme</label>
          <div className="opts">
            <button className={theme === "light" ? "active" : ""} onClick={() => setTheme("light")}>Light</button>
            <button className={theme === "dark" ? "active" : ""} onClick={() => setTheme("dark")}>Dark</button>
          </div>
        </div>
        <div className="tweak-row">
          <label>Density</label>
          <div className="opts">
            <button className={density === "comfortable" ? "active" : ""} onClick={() => setDensity("comfortable")}>Comfy</button>
            <button className={density === "compact" ? "active" : ""} onClick={() => setDensity("compact")}>Compact</button>
          </div>
        </div>
        <div className="tweak-row">
          <label>Accent</label>
          <div className="opts" style={{ gap: 6 }}>
            {ACCENTS.map((c) => (
              <button
                key={c}
                className={`color-swatch${accent === c ? " active" : ""}`}
                style={{ background: c }}
                onClick={() => setAccent(c)}
                aria-label={`Set accent ${c}`}
              />
            ))}
          </div>
        </div>
        <div style={{ paddingTop: 10, borderTop: "1px dashed var(--line)", fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: "var(--muted)" }}>
          Toggle anytime · <span className="kbd">T</span>
        </div>
      </div>
    </div>
  );
}
