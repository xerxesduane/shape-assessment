"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, Check, ChevronDown, Clipboard, Compass, Heart,
  LockKeyhole, Printer, RotateCcw, Sparkles,
} from "lucide-react";
import {
  abilities, causes, experienceGroups, gifts, heartRoles, peopleGroups,
  personalityPairs, sectionMeta,
} from "@/data/assessment";
import { Answers, buildResults, emptyAnswers } from "@/lib/results";

const STORAGE_KEY = "shape-discovery-v1";
const totalAssessmentSteps = sectionMeta.length;

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function ChoicePill({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-pressed={selected} onClick={onClick} className={`choice-pill ${selected ? "selected" : ""}`}>
      <span className="choice-check" aria-hidden="true">{selected && <Check size={15} strokeWidth={3} />}</span>
      <span>{children}</span>
    </button>
  );
}

export function ShapeAssessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [restored, setRestored] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const restoreProgress = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) setAnswers({ ...emptyAnswers, ...JSON.parse(saved) });
      } catch { /* A private browser session may block local storage. */ }
      setRestored(true);
    }, 0);
    return () => window.clearTimeout(restoreProgress);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers)); } catch { /* Progress saving is optional. */ }
  }, [answers, restored]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [step]);

  const results = useMemo(() => buildResults(answers), [answers]);
  const sectionIndex = Math.max(0, step - 1);
  const progress = step === 0 ? 0 : step >= 7 ? 100 : Math.round((step / totalAssessmentSteps) * 100);
  const canContinue = step !== 4 || Object.keys(answers.personality).length === personalityPairs.length;

  const update = <K extends keyof Answers>(key: K, value: Answers[K]) => setAnswers((current) => ({ ...current, [key]: value }));
  const restart = () => {
    setAnswers(emptyAnswers);
    try { window.localStorage.removeItem(STORAGE_KEY); } catch {}
    setStep(0);
  };

  const copySummary = async () => {
    const name = answers.name.trim() || "My";
    const text = `${name} SHAPE summary\nService patterns: ${results.patterns.map((p) => p.title).join(" + ")}\nLikely gifts: ${results.topGifts.map((g) => g.name).join(", ") || "Still emerging"}\nHeart: ${results.roles.join(", ") || "Still exploring"}\nAbilities: ${results.strengths.join(", ") || "Still exploring"}\nAvailability: ${answers.hours || "Not specified"}${answers.timing.length ? ` · ${answers.timing.join(", ")}` : ""}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      {step > 0 && step < 7 && (
        <header className="progress-header no-print">
          <div className="progress-inner">
            <button className="brand-mark" onClick={() => setStep(0)} aria-label="Return to introduction">S</button>
            <div className="progress-copy">
              <div className="progress-label"><span>{sectionMeta[sectionIndex]?.name}</span><span>{progress}%</span></div>
              <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
            </div>
            <span className="step-count">{step} / {totalAssessmentSteps}</span>
          </div>
        </header>
      )}

      <div className={`content-wrap ${step === 7 ? "results-wrap" : ""}`}>
        {step === 0 && (
          <section className="intro-card animate-in">
            <div className="intro-art" aria-hidden="true">
              <div className="orbit orbit-one"><span>S</span><span>H</span><span>A</span><span>P</span><span>E</span></div>
              <div className="center-seal"><Compass size={38} /><span>DISCOVER</span></div>
            </div>
            <div className="intro-copy">
              <p className="eyebrow"><Sparkles size={15} /> A guided reflection</p>
              <h1>Discover how you are <em>SHAPED</em> to serve.</h1>
              <p className="lede">Explore your spiritual gifts, heart, abilities, personality and experiences — then receive a personal summary you can act on right away.</p>
              <div className="intro-facts">
                <span><Check size={17} /> About 12 minutes</span>
                <span><LockKeyhole size={17} /> Private by design</span>
                <span><Heart size={17} /> No wrong answers</span>
              </div>
              <label className="name-field">
                <span>What should we call you? <small>Optional</small></span>
                <input value={answers.name} onChange={(event) => update("name", event.target.value)} placeholder="Your first name" autoComplete="given-name" />
              </label>
              <button className="primary-button" onClick={() => setStep(1)}>Begin discovery <ArrowRight size={19} /></button>
              <p className="privacy-note">Your responses stay on this device. No account, email or upload.</p>
            </div>
          </section>
        )}

        {step > 0 && step < 7 && (
          <section className="question-card animate-in" key={step}>
            <div className="section-heading">
              <span className="section-letter">{sectionMeta[sectionIndex].letter}</span>
              <div><p className="eyebrow">{sectionMeta[sectionIndex].kicker}</p><h2>{sectionMeta[sectionIndex].name}</h2></div>
            </div>

            {step === 1 && (
              <div>
                <p className="prompt">For each gift, choose the response that feels most honest today.</p>
                <div className="gift-list">
                  {gifts.map((gift) => (
                    <fieldset className="gift-row" key={gift.id}>
                      <legend><strong>{gift.name}</strong><span>{gift.description}</span></legend>
                      <div className="rating-group">
                        {[{ score: 0, label: "Not me" }, { score: 1, label: "Maybe" }, { score: 2, label: "Very likely" }].map((option) => (
                          <button type="button" key={option.score} aria-pressed={answers.gifts[gift.id] === option.score} className={answers.gifts[gift.id] === option.score ? "active" : ""} onClick={() => update("gifts", { ...answers.gifts, [gift.id]: option.score })}>{option.label}</button>
                        ))}
                      </div>
                    </fieldset>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="stack-lg">
                <div><p className="prompt">Choose the roles that make you feel most alive.</p><div className="pill-grid">{heartRoles.map((item) => <ChoicePill key={item.id} selected={answers.roles.includes(item.id)} onClick={() => update("roles", toggle(answers.roles, item.id))}>{item.label}</ChoicePill>)}</div></div>
                <div><p className="prompt">Who do you especially care about serving?</p><div className="pill-grid">{peopleGroups.map((item) => <ChoicePill key={item} selected={answers.people.includes(item)} onClick={() => update("people", toggle(answers.people, item))}>{item}</ChoicePill>)}</div></div>
                <div><p className="prompt">Which causes consistently capture your attention?</p><div className="pill-grid">{causes.map((item) => <ChoicePill key={item} selected={answers.causes.includes(item)} onClick={() => update("causes", toggle(answers.causes, item))}>{item}</ChoicePill>)}</div></div>
              </div>
            )}

            {step === 3 && (
              <div><p className="prompt">Choose the abilities you enjoy using — not only the ones others expect from you.</p><p className="selection-hint">Selected {answers.abilities.length}. A focused 5–8 is ideal.</p><div className="pill-grid abilities-grid">{abilities.map((item) => <ChoicePill key={item.id} selected={answers.abilities.includes(item.id)} onClick={() => update("abilities", toggle(answers.abilities, item.id))}>{item.label}</ChoicePill>)}</div></div>
            )}

            {step === 4 && (
              <div><p className="prompt">There is no better side. Choose the tendency that sounds more like your natural setting.</p><div className="personality-list">{personalityPairs.map((pair) => <fieldset className="personality-pair" key={pair.id}><legend>{pair.id === "energy" ? "Where do you gain energy?" : pair.id === "expression" ? "How do you process ideas?" : pair.id === "rhythm" ? "What working rhythm fits?" : "What draws out your best effort?"}</legend>{[pair.left, pair.right].map((choice) => <button type="button" key={choice.id} aria-pressed={answers.personality[pair.id] === choice.id} className={answers.personality[pair.id] === choice.id ? "selected" : ""} onClick={() => update("personality", { ...answers.personality, [pair.id]: choice.id })}><span className="radio-dot" /><strong>{choice.label}</strong><small>{choice.description}</small></button>)}</fieldset>)}</div></div>
            )}

            {step === 5 && (
              <div><div className="sensitive-note"><LockKeyhole size={18} /><p><strong>Your story belongs to you.</strong> Every choice here is optional and remains in this browser. Select only what feels helpful.</p></div><div className="experience-list">{experienceGroups.map((group) => { const selected = answers.experiences[group.id] || []; return <details key={group.id} className="experience-group" open={group.id === "spiritual"}><summary><div><strong>{group.title}</strong><span>{group.prompt}</span></div><span className="summary-count">{selected.length || "–"}</span><ChevronDown size={18} /></summary><div className="pill-grid">{group.options.map((item) => <ChoicePill key={item} selected={selected.includes(item)} onClick={() => update("experiences", { ...answers.experiences, [group.id]: toggle(selected, item) })}>{item}</ChoicePill>)}</div></details>; })}</div></div>
            )}

            {step === 6 && (
              <div className="availability"><p className="prompt">A sustainable “yes” is more useful than an impressive one. What is realistic in this season?</p><fieldset><legend>Time you could usually offer</legend><div className="large-choice-grid">{["1–2 hours a week", "3–5 hours a week", "6+ hours a week", "Occasional projects"].map((item) => <button type="button" className={answers.hours === item ? "selected" : ""} aria-pressed={answers.hours === item} key={item} onClick={() => update("hours", item)}><span className="radio-dot" />{item}</button>)}</div></fieldset><fieldset><legend>Times that could work</legend><div className="pill-grid">{["Weekdays", "Weeknights", "Weekends", "Remote / from home"].map((item) => <ChoicePill key={item} selected={answers.timing.includes(item)} onClick={() => update("timing", toggle(answers.timing, item))}>{item}</ChoicePill>)}</div></fieldset></div>
            )}

            <footer className="question-actions no-print">
              <button className="back-button" onClick={() => setStep(step - 1)}><ArrowLeft size={18} /> Back</button>
              <button className="primary-button" disabled={!canContinue} onClick={() => setStep(step + 1)}>{step === 6 ? "See my SHAPE" : "Continue"}<ArrowRight size={18} /></button>
            </footer>
            {!canContinue && <p className="validation-message">Choose one option from each personality pair to continue.</p>}
          </section>
        )}

        {step === 7 && (
          <section className="results-page animate-in">
            <div className="results-hero">
              <p className="eyebrow"><Sparkles size={15} /> Your SHAPE snapshot</p>
              <h1>{answers.name.trim() ? `${answers.name.trim()}, here’s` : "Here’s"} how your story comes together.</h1>
              <p>This is a conversation starter, not a label. The strongest clues appear where your gifts, heart and abilities overlap.</p>
              <div className="results-actions no-print"><button onClick={copySummary}><Clipboard size={17} />{copied ? "Copied" : "Copy summary"}</button><button onClick={() => window.print()}><Printer size={17} /> Print / save PDF</button></div>
            </div>
            <div className="pattern-grid">{results.patterns.map((pattern, index) => <article className="pattern-card" key={pattern.id}><span>{index === 0 ? "Primary pattern" : "Supporting pattern"}</span><h2>{pattern.title}</h2><p>{pattern.description}</p></article>)}</div>
            <div className="result-grid">
              <article className="result-card gifts-card"><span className="result-letter">S</span><p className="eyebrow">Spiritual gifts</p><h3>Your likely gifts</h3>{results.topGifts.length ? <div className="gift-results">{results.topGifts.map((gift, index) => <div key={gift.id}><span>0{index + 1}</span><div><strong>{gift.name}</strong><p>{gift.description}</p></div></div>)}</div> : <p className="empty-result">Your gifts are still emerging. Try serving in two different settings and ask trusted people what they notice.</p>}</article>
              <article className="result-card"><span className="result-letter">H</span><p className="eyebrow">Heart</p><h3>You come alive when you…</h3><div className="tag-list">{results.roles.map((item) => <span key={item}>{item}</span>)}</div><h4>People and causes on your heart</h4><p>{[...answers.people.slice(0, 3), ...answers.causes.slice(0, 3)].join(" · ") || "Keep noticing the people and needs you naturally move toward."}</p></article>
              <article className="result-card"><span className="result-letter">A</span><p className="eyebrow">Abilities</p><h3>Strengths you can bring</h3><div className="tag-list">{results.strengths.map((item) => <span key={item}>{item}</span>)}</div><p>{results.strengths.length ? "These are practical tools that can give your passions a useful form." : "Try asking: what do people naturally ask me to help with?"}</p></article>
              <article className="result-card"><span className="result-letter">P</span><p className="eyebrow">Personality</p><h3>Your best-fit environment</h3><p>{personalitySummary(answers.personality)}</p></article>
              <article className="result-card"><span className="result-letter">E</span><p className="eyebrow">Experiences</p><h3>Your story creates empathy</h3><p>{results.experienceCount ? `You identified ${results.experienceCount} experiences that may help you understand and serve others with credibility and care.` : "Your experiences still matter, even if you chose not to name them here. Nothing in your story is wasted."}</p></article>
              <article className="result-card availability-card"><span className="result-letter">+</span><p className="eyebrow">Availability</p><h3>A sustainable starting point</h3><p><strong>{answers.hours || "Begin with one small experiment"}</strong>{answers.timing.length ? `, especially ${answers.timing.join(" or ").toLowerCase()}.` : "."}</p></article>
            </div>
            <article className="next-step-card"><div><p className="eyebrow">Your next faithful experiment</p><h2>Test your SHAPE in real life.</h2><p>Choose one small serving opportunity that combines your primary pattern with one group or cause you care about. Try it, reflect on what gave energy, and ask someone you trust what they observed.</p></div><ol><li><span>1</span>Share this summary with a leader or friend.</li><li><span>2</span>Choose a low-risk opportunity to try.</li><li><span>3</span>Reflect, request feedback and adjust.</li></ol></article>
            <div className="results-footer no-print"><button className="back-button" onClick={() => setStep(6)}><ArrowLeft size={18} /> Edit answers</button><button className="back-button" onClick={restart}><RotateCcw size={17} /> Start again</button></div>
            <p className="source-note">Adapted as an interactive reflection from the S.H.A.P.E. discovery framework: Spiritual Gifts, Heart, Abilities, Personality and Experiences.</p>
          </section>
        )}
      </div>
    </main>
  );
}

function personalitySummary(personality: Record<string, string>) {
  if (!Object.keys(personality).length) return "Your best-fit working environment will become clearer as you notice what gives or drains energy.";
  const energy = personality.energy === "extroverted" ? "people-rich settings" : "smaller groups and reflective space";
  const rhythm = personality.rhythm === "routine" ? "clear expectations and dependable rhythms" : "variety and room to adapt";
  const teamwork = personality.team === "cooperative" ? "a collaborative team" : "a meaningful challenge";
  return `You are likely to do your best work with ${energy}, ${rhythm}, and ${teamwork}. This shapes how your gifts are expressed — not their value.`;
}
