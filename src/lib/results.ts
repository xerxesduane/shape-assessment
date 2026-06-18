import { abilities, gifts, heartRoles } from "@/data/assessment";

export type Answers = {
  name: string;
  gifts: Record<string, number>;
  roles: string[];
  people: string[];
  causes: string[];
  abilities: string[];
  personality: Record<string, string>;
  experiences: Record<string, string[]>;
  hours: string;
  timing: string[];
};

export const emptyAnswers: Answers = {
  name: "", gifts: {}, roles: [], people: [], causes: [], abilities: [], personality: {}, experiences: {}, hours: "", timing: [],
};

const patterns = [
  { id: "care", title: "Compassionate Care", description: "You are likely to thrive where people need presence, encouragement and patient support.", signals: ["mercy", "healing", "pastoring", "encouragement", "counselling", "welcoming", "help", "cooperative"] },
  { id: "guide", title: "Wise Guide", description: "You may be at your best helping people understand truth and take a clear next step.", signals: ["teaching", "wisdom", "discernment", "preaching", "writing", "editing", "researching"] },
  { id: "builder", title: "Practical Builder", description: "You bring ideas into reality through dependable systems, skill and follow-through.", signals: ["administration", "service", "organize", "maintain", "persevere", "planning", "managing", "technical", "classifying", "resourceful"] },
  { id: "catalyst", title: "Visionary Catalyst", description: "You naturally generate momentum, invite participation and move people toward a shared vision.", signals: ["apostle", "leadership", "faith", "evangelism", "pioneer", "lead", "influence", "recruiting", "promoting", "extroverted"] },
  { id: "creator", title: "Creative Communicator", description: "You can make ideas memorable through beauty, story, performance and thoughtful communication.", signals: ["perform", "design", "improve", "artistic", "graphics", "entertaining", "musical", "decorating", "expressive"] },
  { id: "connector", title: "Welcoming Connector", description: "You notice who needs a place to belong and help turn a gathering into a community.", signals: ["hospitality", "giving", "service", "help", "welcoming", "recall", "cooking", "cooperative"] },
];

export function buildResults(answers: Answers) {
  const giftIds = Object.entries(answers.gifts).filter(([, score]) => score > 0).sort((a, b) => b[1] - a[1]).map(([id]) => id);
  const signals = new Set([...giftIds, ...answers.roles, ...answers.abilities, ...Object.values(answers.personality)]);
  const rankedPatterns = patterns.map((pattern) => ({ ...pattern, score: pattern.signals.filter((signal) => signals.has(signal)).length })).sort((a, b) => b.score - a.score);
  return {
    topGifts: giftIds.slice(0, 3).map((id) => gifts.find((gift) => gift.id === id)!).filter(Boolean),
    roles: answers.roles.slice(0, 4).map((id) => heartRoles.find((role) => role.id === id)?.label).filter(Boolean),
    strengths: answers.abilities.slice(0, 6).map((id) => abilities.find((ability) => ability.id === id)?.label).filter(Boolean),
    patterns: rankedPatterns.slice(0, 2),
    experienceCount: Object.values(answers.experiences).flat().length,
  };
}
