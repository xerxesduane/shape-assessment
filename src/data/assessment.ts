export type Gift = { id: string; name: string; description: string };
export type Choice = { id: string; label: string; description?: string };

export const gifts: Gift[] = [
  { id: "administration", name: "Administration", description: "Organize people, resources and time so a shared mission can flourish." },
  { id: "apostle", name: "Pioneering", description: "Start new ventures and help them grow from an idea into a healthy reality." },
  { id: "discernment", name: "Discernment", description: "Notice what is true, wise and consistent beneath the surface." },
  { id: "encouragement", name: "Encouragement", description: "Help people act on truth, regain courage and develop their potential." },
  { id: "evangelism", name: "Evangelism", description: "Share faith naturally and help others take a meaningful next step." },
  { id: "faith", name: "Faith", description: "Trust God beyond what is visible and move forward despite obstacles." },
  { id: "giving", name: "Giving", description: "Steward and share resources generously to strengthen the work of others." },
  { id: "healing", name: "Healing", description: "Pray with faith and care for people seeking physical, emotional or spiritual healing." },
  { id: "hospitality", name: "Hospitality", description: "Help newcomers and strangers feel warmly welcomed, accepted and at ease." },
  { id: "leadership", name: "Leadership", description: "Clarify direction and inspire people to work together toward a goal." },
  { id: "mercy", name: "Mercy", description: "Offer practical, compassionate care to people who are hurting." },
  { id: "miracles", name: "Miracles", description: "Pray for God’s intervention when a situation appears impossible." },
  { id: "pastoring", name: "Pastoring", description: "Nurture a group’s spiritual growth and take responsibility for their care." },
  { id: "prayer", name: "Prayer", description: "Serve others through Spirit-led prayer and attentive intercession." },
  { id: "preaching", name: "Preaching", description: "Communicate God’s Word in a way that challenges, comforts and persuades." },
  { id: "service", name: "Service", description: "Notice practical needs and help cheerfully without needing recognition." },
  { id: "teaching", name: "Teaching", description: "Explain and apply truth clearly so that people can learn and grow." },
  { id: "wisdom", name: "Wisdom", description: "See life from God’s perspective and make the next step understandable." },
];

export const heartRoles: Choice[] = [
  ["design", "Design / develop"], ["pioneer", "Pioneer"], ["organize", "Organize"],
  ["maintain", "Operate / maintain"], ["help", "Serve / help"], ["acquire", "Acquire resources"],
  ["excel", "Pursue excellence"], ["influence", "Influence"], ["perform", "Perform"],
  ["improve", "Improve"], ["repair", "Repair"], ["lead", "Lead"],
  ["persevere", "Persevere"], ["rules", "Create dependable structure"], ["prevail", "Champion what is right"],
].map(([id, label]) => ({ id, label }));

export const peopleGroups = [
  "Infants and babies", "Preschool children", "Primary-age children", "Teenagers", "Students and young adults",
  "Young married couples", "Women", "Men", "Singles", "Single parents", "Families", "Couples", "Adults 60+", "Newcomers",
];

export const causes = [
  "Parenting", "Families and marriage", "At-risk children", "Abuse and violence", "Disability support",
  "Mental health and recovery", "Health and fitness", "Homelessness and relief", "Education", "Evangelism",
  "World mission", "Fellowship and belonging", "Mobilising people to serve", "Worship", "Justice and ethics",
  "Business and the economy", "Science and technology", "Environment", "Community issues", "Prayer",
];

export const abilities: Choice[] = [
  ["entertaining", "Entertain or speak"], ["recruiting", "Recruit and motivate"], ["interviewing", "Interview and draw people out"],
  ["researching", "Research and gather information"], ["artistic", "Create and design"], ["graphics", "Design visual communication"],
  ["evaluating", "Analyse and evaluate"], ["planning", "Plan programmes and events"], ["managing", "Manage people and details"],
  ["counselling", "Listen, encourage and guide"], ["athletic", "Coach or play sport"], ["teaching", "Teach and demonstrate"],
  ["writing", "Write"], ["languages", "Use other languages"], ["editing", "Edit and refine"], ["promoting", "Promote and advertise"],
  ["repairing", "Fix and restore"], ["making", "Make things by hand"], ["cooking", "Cook and feed groups"],
  ["recall", "Remember names and faces"], ["mechanical", "Operate tools or machinery"], ["technical", "Technology, media or AV"],
  ["resourceful", "Find practical resources"], ["counting", "Work with numbers or money"], ["classifying", "Systematise records and information"],
  ["public-relations", "Handle concerns with maturity"], ["welcoming", "Help people feel comfortable"], ["musical", "Sing or play music"],
  ["landscaping", "Garden or landscape"], ["decorating", "Beautify a space"],
].map(([id, label]) => ({ id, label }));

export const personalityPairs = [
  {
    id: "energy",
    left: { id: "extroverted", label: "People energise me", description: "I enjoy interacting with many people and varied activity." },
    right: { id: "introverted", label: "Quiet energises me", description: "I prefer a few people and gain energy from reflective time." },
  },
  {
    id: "expression",
    left: { id: "expressive", label: "I think out loud", description: "I am open and verbal about my thoughts and opinions." },
    right: { id: "controlled", label: "I think before sharing", description: "I tend to keep thoughts private until I am ready." },
  },
  {
    id: "rhythm",
    left: { id: "routine", label: "I prefer routine", description: "Clear expectations and completing one task at a time help me thrive." },
    right: { id: "variety", label: "I prefer variety", description: "Changing tasks and a few surprises help me thrive." },
  },
  {
    id: "team",
    left: { id: "cooperative", label: "I lean cooperative", description: "I easily see other viewpoints and enjoy shared effort." },
    right: { id: "competitive", label: "I lean competitive", description: "A challenge increases my effort and focus." },
  },
];

export const experienceGroups = [
  { id: "spiritual", title: "Spiritual experiences", prompt: "Which have shaped your faith?", options: ["Baptism", "Community outreach", "Cross-cultural ministry", "Helping someone explore faith", "Small group", "Regular prayer", "Reading Scripture", "Serving in ministry"] },
  { id: "life", title: "Life experiences", prompt: "Which experiences help you understand others?", options: ["Grief or bereavement", "Mental health challenge", "Recovery from addiction", "Serious illness or injury", "Disability", "Job loss or financial hardship", "Relationship breakdown", "Caregiving", "Migration or cultural transition", "A season of healing"] },
  { id: "work", title: "Work and learning", prompt: "Where have you developed useful experience?", options: ["Business and administration", "Creative arts and media", "Technology", "Education and training", "Healthcare and care work", "Hospitality", "Trades and engineering", "Finance and legal", "Public or community service", "Homemaking and family care"] },
  { id: "ministry", title: "Serving experience", prompt: "What have you already tried?", options: ["Children or youth", "Small groups", "Teaching or mentoring", "Worship or music", "Welcome and hospitality", "Prayer or pastoral care", "Events and food", "Operations and facilities", "Communications and media", "Community outreach"] },
];

export const sectionMeta = [
  { key: "gifts", letter: "S", name: "Spiritual gifts", kicker: "How you may be empowered to help" },
  { key: "heart", letter: "H", name: "Heart", kicker: "What makes you come alive" },
  { key: "abilities", letter: "A", name: "Abilities", kicker: "What you naturally do well" },
  { key: "personality", letter: "P", name: "Personality", kicker: "How you work best" },
  { key: "experiences", letter: "E", name: "Experiences", kicker: "What your story has prepared you to understand" },
  { key: "availability", letter: "+", name: "Availability", kicker: "What is realistic in this season" },
];
