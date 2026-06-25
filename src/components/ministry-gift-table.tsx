import { ArrowRight, Compass } from "lucide-react";
import { ministryGiftTable } from "@/data/ministryGiftTable";

const SERVING_FORM = "https://fellowshipdubai.churchcenter.com/people/forms/268058";

export function MinistryGiftTable() {
  return (
    <article className="ministry-table-section">
      <header className="ministry-table-heading">
        <div className="ministry-table-icon"><Compass size={26} aria-hidden="true" /></div>
        <div>
          <p className="eyebrow">How to start serving</p>
          <h2>Explore ministries where your gifts may contribute.</h2>
          <p>This table is a reflective guide, not a prescription. Prayerfully consider where your gifts may align, while giving priority to personal conviction and the Holy Spirit’s leading.</p>
        </div>
      </header>

      <div className="ministry-table-desktop">
        <table>
          <caption className="sr-only">Fellowship Dubai ministry and spiritual gift guide</caption>
          <thead><tr><th scope="col">Ministry</th><th scope="col">Spiritual gifts that strengthen it</th></tr></thead>
          <tbody>
            {ministryGiftTable.map((row) => <tr key={row.ministry}><th scope="row">{row.ministry}</th><td>{row.gifts.join(", ")}</td></tr>)}
          </tbody>
        </table>
      </div>

      <div className="ministry-table-mobile">
        {ministryGiftTable.map((row) => (
          <section key={row.ministry}>
            <h3>{row.ministry}</h3>
            <p>{row.gifts.join(", ")}</p>
          </section>
        ))}
      </div>

      <div className="ministry-table-action">
        <div><strong>Ready to take a next step?</strong><p>View the current opportunities and tell Fellowship Dubai where you would like to serve.</p></div>
        <a href={SERVING_FORM} target="_blank" rel="noopener noreferrer">View Serving Opportunities <ArrowRight size={18} aria-hidden="true" /></a>
      </div>
    </article>
  );
}
