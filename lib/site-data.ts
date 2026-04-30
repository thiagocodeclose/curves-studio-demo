export const siteData = {
  gym: {
    name: 'Curves & Co',
    tagline: 'Strong is the New Beautiful',
    location: 'Nashville, TN',
    address: '412 12th Ave S, Nashville, TN 37203',
    phone: '(615) 555-0274',
    email: 'love@curvesandco.com',
  },
  stats: [
    { value: '3,200+', label: 'Members Strong' },
    { value: '40+', label: 'Weekly Classes' },
    { value: '98%', label: 'Love It Rate' },
    { value: '7AM–8PM', label: 'Studio Hours' },
  ],
  classes: [
    { name: 'Curves HIIT', icon: '🔥', duration: '45 min', level: 'All Levels', desc: 'High-energy interval training built around real bodies. Modify up or down — every woman belongs here.' },
    { name: 'Power Curves', icon: '💪', duration: '50 min', level: 'Beginner–Intermediate', desc: 'Resistance-focused strength class targeting the zones women care about most. Build confidence one rep at a time.' },
    { name: 'Curves Flow', icon: '🌊', duration: '60 min', level: 'All Levels', desc: 'Yoga-inspired movement fused with low-impact strength. Mobility, balance, and breath — the perfect Sunday class.' },
    { name: 'Bootcamp', icon: '⚡', duration: '45 min', level: 'Intermediate', desc: 'Our most intense format. Station-based circuit training that pushes limits while celebrating every kind of strong.' },
    { name: 'Dance Tone', icon: '💃', duration: '50 min', level: 'All Levels', desc: 'Sweat through a choreographed dance-fitness experience. Joyful, energetic, and guaranteed to leave you smiling.' },
    { name: 'Stretch & Recover', icon: '🧘', duration: '40 min', level: 'All Levels', desc: 'Active recovery class blending deep stretching, foam rolling, and mindful breathwork. Non-negotiable self-care.' },
  ],
  community: [
    { label: 'Monthly Challenges', icon: '🏆', desc: 'Body-positive fitness challenges that celebrate progress over perfection.' },
    { label: 'Member Stories', icon: '✨', desc: 'Real transformations. Real women. Shared every week in our community feed.' },
    { label: 'Buddy System', icon: '👯', desc: 'Pair with an accountability partner and keep each other showing up.' },
  ],
  pricing: [
    {
      name: 'Drop-In',
      price: '$22',
      period: 'per class',
      features: ['Any class format', 'Walk-in or book online', 'Mat & weights included'],
      highlight: false,
    },
    {
      name: 'Unlimited',
      price: '$99',
      period: 'per month',
      features: ['Unlimited classes', 'Member community access', 'Monthly challenge entry', 'Early booking window', 'Bring a friend (1/mo)'],
      highlight: true,
    },
    {
      name: '10-Pack',
      price: '$185',
      period: '10 classes · no expiry',
      features: ['Any class format', 'Valid forever', 'No monthly commitment', 'Shareable with a friend'],
      highlight: false,
    },
  ],
};
