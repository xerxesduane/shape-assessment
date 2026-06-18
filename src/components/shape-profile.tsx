"use client";

import { useMemo, useState } from "react";
import { Clipboard, ExternalLink, Mail, Printer, RotateCcw } from "lucide-react";
import { buildProfile, profileToText, type ShapeAnswers } from "@/lib/shapeProfile";

export function ShapeProfile({ answers, onRestart }: { answers: ShapeAnswers; onRestart: () => void }) {
  const profile = useMemo(() => buildProfile(answers), [answers]);
  const text = useMemo(() => profileToText(answers, profile), [answers, profile]);
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(text); setCopied(true); window.setTimeout(() => setCopied(false), 1600); };
  const mailto = `mailto:?subject=${encodeURIComponent(`${answers.profile.name || "My"} S.H.A.P.E. Profile`)}&body=${encodeURIComponent(text)}`;

  return (
    <section className="profile-page">
      <header className="profile-hero">
        <p className="eyebrow">Fellowship Dubai · Complete profile</p>
        <h1>{answers.profile.name ? `${answers.profile.name}’s` : "My"} S.H.A.P.E. Profile</h1>
        <p>A clear starting point for prayer, reflection, and a conversation with a ministry leader or Serve Team member.</p>
        <div className="profile-contact"><span>{answers.profile.email || "Email not provided"}</span><span>{answers.profile.phone || "Phone not provided"}</span></div>
        <div className="profile-actions no-print"><button onClick={copy}><Clipboard size={17} />{copied ? "Copied" : "Copy My Profile"}</button><button onClick={() => window.print()}><Printer size={17} />Download / Print PDF</button><a href={mailto}><Mail size={17} />Email / Share My Profile</a><a href="https://fellowshipdubai.com/" target="_blank" rel="noreferrer">Explore Serving <ExternalLink size={16} /></a></div>
      </header>

      <ProfileSection letter="S" title="Spiritual Gifts">
        <GiftGroup label="Likely gifts" values={profile.spiritualGifts.likely} /><GiftGroup label="Possible gifts" values={profile.spiritualGifts.possible} /><GiftGroup label="Unlikely gifts" values={profile.spiritualGifts.unlikely} muted />
      </ProfileSection>
      <ProfileSection letter="H" title="Heart / Passion">
        <ProfileList label="Roles I enjoy" values={profile.heart.roles} /><ProfileList label="People I care about" values={profile.heart.people} /><ProfileList label="Causes I feel led to champion" values={profile.heart.causes} />
      </ProfileSection>
      <ProfileSection letter="A" title="Abilities"><ProfileList label="Abilities I can use" values={profile.abilities} /></ProfileSection>
      <ProfileSection letter="P" title="Personality"><ProfileList label="My personality pattern" values={profile.personality} /></ProfileSection>
      <ProfileSection letter="E" title="Experiences">
        <div className="profile-experience-grid">{Object.entries(profile.experiences).map(([label, values]) => <ProfileList key={label} label={label} values={values} />)}</div>
      </ProfileSection>
      <ProfileSection letter="+" title="Availability">
        <dl className="availability-summary"><div><dt>Are you making service a priority?</dt><dd>{profile.availability.priority}</dd></div><div><dt>Current season and time</dt><dd>{profile.availability.season}</dd></div><div><dt>Time per week</dt><dd>{profile.availability.hours}</dd></div><div><dt>Best times</dt><dd>{profile.availability.timing.join(", ") || "Not specified"}</dd></div></dl>
      </ProfileSection>
      <article className="recommended-step"><p className="eyebrow">Recommended next step</p><h2>Continue the conversation.</h2><p>{profile.recommendedNextStep}</p><p className="purpose-line">Know Jesus · Grow to be like Jesus · Go tell the nations about Jesus</p></article>
      <div className="profile-footer no-print"><button className="back-button" onClick={onRestart}><RotateCcw size={17} />Start a new profile</button></div>
    </section>
  );
}

function ProfileSection({ letter, title, children }: { letter: string; title: string; children: React.ReactNode }) {
  return <article className="profile-section"><header><span>{letter}</span><h2>{title}</h2></header><div className="profile-section-body">{children}</div></article>;
}
function ProfileList({ label, values }: { label: string; values: string[] }) {
  return <div className="profile-list"><h3>{label}</h3>{values.length ? <ul>{values.map((value) => <li key={value}>{value}</li>)}</ul> : <p>None selected</p>}</div>;
}
function GiftGroup({ label, values, muted }: { label: string; values: string[]; muted?: boolean }) {
  return <div className={`gift-group ${muted ? "muted" : ""}`}><h3>{label}</h3><div>{values.length ? values.map((value) => <span key={value}>{value}</span>) : <p>None selected</p>}</div></div>;
}
