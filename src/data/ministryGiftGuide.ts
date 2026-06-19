export type MinistryGiftGuideEntry = {
  ministry: string;
  gifts: string[];
};

export const ministryGiftGuide: MinistryGiftGuideEntry[] = [
  { ministry: "Production", gifts: ["Assisting", "Crafting", "Creativity", "Organization", "Service"] },
  { ministry: "Livestream Team", gifts: ["Assisting", "Creativity", "Evangelism", "Knowledge", "Organization", "Vision"] },
  { ministry: "GROW – Small Group", gifts: ["Teaching", "Encouragement", "Mentoring", "Hospitality", "Wisdom", "Discernment"] },
  { ministry: "GROW – Compass", gifts: ["Teaching", "Knowledge", "Wisdom", "Discernment", "Encouragement", "Leadership"] },
  { ministry: "GROW – Men Connect", gifts: ["Leadership", "Mentoring", "Encouragement", "Wisdom", "Justice"] },
  { ministry: "GROW – Women Connect", gifts: ["Encouragement", "Mentoring", "Hospitality", "Mercy", "Teaching", "Wisdom"] },
  { ministry: "GROW – Young Adults", gifts: ["Evangelism", "Leadership", "Mentoring", "Encouragement", "Vision", "Mission"] },
  { ministry: "Fellowship Kids", gifts: ["Teaching", "Creativity", "Mercy", "Assisting", "Encouragement", "Hospitality"] },
  { ministry: "Youth Ministry", gifts: ["Leadership", "Evangelism", "Mentoring", "Teaching", "Encouragement", "Vision"] },
  { ministry: "Events", gifts: ["Organization", "Creativity", "Hospitality", "Assisting", "Service", "Leadership"] },
  { ministry: "Worship", gifts: ["Creativity", "Vision", "Encouragement", "Discernment", "Faith", "Leadership"] },
  { ministry: "Prayer", gifts: ["Prayer", "Faith", "Discernment", "Healing", "Mercy", "Wisdom"] },
  { ministry: "Serve", gifts: ["Service", "Assisting", "Mercy", "Giving", "Hospitality", "Teaching", "Knowledge"] },
  { ministry: "Welcome", gifts: ["Hospitality", "Encouragement", "Assisting", "Mercy", "Evangelism"] },
  { ministry: "Newcomers Pathway", gifts: ["Hospitality", "Encouragement", "Teaching", "Mentoring", "Organization", "Leadership"] },
  { ministry: "Administration", gifts: ["Organization", "Leadership", "Knowledge", "Wisdom", "Assisting", "Vision"] },
];

const relatedGuideTerms: Record<string, string[]> = {
  Administration: ["Organization"],
  Apostle: ["Mission"],
  Leadership: ["Vision"],
  Pastoring: ["Mentoring"],
  "Praying With My Spirit": ["Prayer"],
  Service: ["Assisting"],
};

function guideTermsFor(gift: string) {
  return [gift, ...(relatedGuideTerms[gift] || [])];
}

export type MinistryGiftMatch = MinistryGiftGuideEntry & {
  likelyMatches: string[];
  possibleMatches: string[];
  score: number;
};

export function matchMinistries(likely: string[], possible: string[]): MinistryGiftMatch[] {
  return ministryGiftGuide
    .map((entry) => {
      const likelyMatches = likely.filter((gift) => guideTermsFor(gift).some((term) => entry.gifts.includes(term)));
      const possibleMatches = possible.filter((gift) => guideTermsFor(gift).some((term) => entry.gifts.includes(term)));
      return { ...entry, likelyMatches, possibleMatches, score: likelyMatches.length * 2 + possibleMatches.length };
    })
    .sort((a, b) => b.score - a.score || a.ministry.localeCompare(b.ministry));
}
