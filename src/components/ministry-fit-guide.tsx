import { ExternalLink, HeartHandshake, Sparkles } from "lucide-react";
import { matchMinistries, ministryGiftGuide } from "@/data/ministryGiftGuide";

const SERVE_FORM_URL = "https://fellowshipdubai.churchcenter.com/people/forms/268058";

export function MinistryFitGuide({ likely, possible }: { likely: string[]; possible: string[] }) {
  const suggestions = matchMinistries(likely, possible).filter((entry) => entry.score > 0).slice(0, 6);

  return (
    <article className="ministry-guide">
      <header className="ministry-guide-header">
        <div>
          <p className="eyebrow">Ministry fit guide</p>
          <h2>Explore where your gifts may flourish.</h2>
          <p>These connections can help you begin a thoughtful conversation about serving at Fellowship Dubai.</p>
        </div>
        <HeartHandshake size={42} aria-hidden="true" />
      </header>

      <aside className="discernment-note">
        <Sparkles size={22} aria-hidden="true" />
        <div>
          <strong>Prayer and discernment come first.</strong>
          <p>This guide is descriptive, not prescriptive. Personal conviction and the Holy Spirit’s leading are paramount. Use these suggestions only as a supportive resource, then pray and speak with a ministry leader.</p>
        </div>
      </aside>

      {suggestions.length ? (
        <section className="ministry-suggestions" aria-labelledby="ministry-suggestions-title">
          <div className="ministry-suggestions-heading">
            <p className="eyebrow">Based on your profile</p>
            <h3 id="ministry-suggestions-title">Places you may want to explore</h3>
          </div>
          <div className="ministry-match-grid">
            {suggestions.map((entry) => (
              <article className="ministry-match-card" key={entry.ministry}>
                <div className="ministry-match-score">{entry.likelyMatches.length + entry.possibleMatches.length} connections</div>
                <h4>{entry.ministry}</h4>
                {entry.likelyMatches.length > 0 && <GiftMatches label="Likely gifts" gifts={entry.likelyMatches} />}
                {entry.possibleMatches.length > 0 && <GiftMatches label="Possible gifts" gifts={entry.possibleMatches} possible />}
              </article>
            ))}
          </div>
        </section>
      ) : (
        <p className="ministry-no-matches">Complete the Spiritual Gifts section to see personalized connections, or browse the complete guide below.</p>
      )}

      <details className="ministry-guide-table">
        <summary>View all {ministryGiftGuide.length} ministry gift patterns</summary>
        <div className="ministry-table-scroll">
          <table>
            <caption className="sr-only">Fellowship Dubai ministry and spiritual gift guide</caption>
            <thead><tr><th scope="col">Ministry</th><th scope="col">Gifts that may strengthen it</th></tr></thead>
            <tbody>{ministryGiftGuide.map((entry) => <tr key={entry.ministry}><th scope="row">{entry.ministry}</th><td>{entry.gifts.join(", ")}</td></tr>)}</tbody>
          </table>
        </div>
      </details>

      <a className="ministry-guide-cta" href={SERVE_FORM_URL} target="_blank" rel="noopener noreferrer">
        Explore current serving opportunities <ExternalLink size={17} aria-hidden="true" />
      </a>
    </article>
  );
}

function GiftMatches({ label, gifts, possible }: { label: string; gifts: string[]; possible?: boolean }) {
  return <div className={`ministry-gift-matches ${possible ? "possible" : ""}`}><span>{label}</span><p>{gifts.join(", ")}</p></div>;
}
