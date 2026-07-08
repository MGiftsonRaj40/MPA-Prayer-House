const CHURCH_STORAGE_KEY = "mpa-prayer-house-content-v1";

const DEFAULT_CONTENT = {
  brand: {
    mark: "MPA",
    name: "Prayer House",
    tagline: "Faith. Hope. Community."
  },
  hero: {
    eyebrow: "A modern home for worship and prayer",
    title: "Come alive in a church family that prays boldly and loves deeply.",
    text: "Join us for Spirit-filled worship, practical teaching, heartfelt prayer, and a community that makes room for every generation to grow in Christ.",
    primaryButton: { label: "Join This Sunday", href: "#visit" },
    secondaryButton: { label: "Watch Messages", href: "#sermons" },
    stats: [
      { label: "Sunday", value: "9:00 AM & 11:00 AM" },
      { label: "Wednesday", value: "7:00 PM Prayer Night" },
      { label: "Location", value: "Open hearts. Open doors." }
    ]
  },
  featuredPanel: {
    label: "This Week",
    title: "Revival Prayer Gathering",
    text: "Three evenings of worship, intercession, and encouragement for the whole family.",
    metaOne: "March 28-30",
    metaTwo: "6:30 PM"
  },
  sidePanels: [
    { label: "New Here?", text: "We'll help you feel at home from the moment you arrive." },
    { label: "Need Prayer?", text: "Share your request and our team will stand with you in faith." }
  ],
  about: {
    heading: "Rooted in prayer, shaped by grace, sent with purpose.",
    story: "MPA Prayer House exists to help people encounter Jesus, belong in authentic community, and live out their calling with courage. We believe church should feel both sacred and welcoming: a place where worship is vibrant, prayer is central, and lives are transformed.",
    values: [
      { title: "Passionate Worship", text: "We create space for heartfelt praise and a genuine encounter with God." },
      { title: "Persistent Prayer", text: "Prayer is not an extra ministry here. It is the heartbeat of everything we do." },
      { title: "Compassionate Service", text: "We serve our city with generosity, dignity, and the love of Christ." }
    ]
  },
  news: [
    { category: "Celebration", title: "Youth worship night filled the hall", text: "Students and leaders gathered for a powerful evening of praise, testimony, and prayer." },
    { category: "Outreach", title: "Food drive blessed 120 local families", text: "Our volunteers served with compassion and practical support across the neighborhood." },
    { category: "Testimony", title: "Prayer week brought fresh encouragement", text: "Families shared stories of healing, peace, and renewed faith throughout the week." }
  ],
  notices: [
    { title: "Volunteer briefing this Saturday", text: "All ministry volunteers should arrive by 8:30 AM for orientation and prayer." },
    { title: "Children's check-in opens early", text: "Family welcome desks open 30 minutes before the first Sunday service." },
    { title: "Prayer requests stay open all week", text: "Use the contact section to reach the care team for prayer and support." }
  ],
  services: [
    { label: "Sunday Celebration", title: "9:00 AM & 11:00 AM", text: "Live worship, biblical preaching, prayer ministry, and classes for children." },
    { label: "Midweek Prayer", title: "Wednesday at 7:00 PM", text: "A focused time of worship, scripture, and intercession for church and city." },
    { label: "Young Adults", title: "Friday at 7:30 PM", text: "Friendship, discipleship, worship nights, and meaningful conversations." }
  ],
  featuredMinistry: {
    label: "Featured Ministry",
    title: "Prayer & Healing Rooms",
    text: "Dedicated times each week for personal prayer, encouragement, and faith-filled support led by a caring ministry team.",
    href: "#contact",
    linkLabel: "Request Prayer"
  },
  ministries: [
    { title: "Kids Church", text: "Safe, joyful, Bible-centered environments where children can thrive." },
    { title: "Youth Movement", text: "Mentorship, worship, and honest conversations for the next generation." },
    { title: "Women of Grace", text: "Gatherings that strengthen faith, friendship, and spiritual confidence." },
    { title: "Men of Valor", text: "Brotherhood, discipleship, and practical encouragement for everyday life." }
  ],
  media: [
    { label: "Recent Sermon", title: "Faith for the Impossible", text: "Discover how bold prayer changes the atmosphere of ordinary life.", href: "#contact", linkLabel: "Watch Now" },
    { label: "Series", title: "House of Prayer", text: "A message journey on worship, intercession, and intimacy with God.", href: "#contact", linkLabel: "Browse Series" },
    { label: "Podcast", title: "Daily Encouragement", text: "Short devotionals and prayer moments to strengthen your week.", href: "#contact", linkLabel: "Listen In" }
  ],
  events: [
    { day: "28", month: "MAR", title: "Revival Prayer Gathering", text: "Three nights of worship and corporate intercession." },
    { day: "06", month: "APR", title: "Community Outreach Saturday", text: "Food distribution, prayer tents, and neighborhood care." },
    { day: "13", month: "APR", title: "Worship & Communion Night", text: "An intimate evening of worship, thanksgiving, and reflection." }
  ],
  gallery: [
    {
      title: "Worship Celebration",
      text: "An atmosphere of praise, unity, and expectation.",
      alt: "Church worship team on stage during service",
      image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=900&q=80"
    },
    {
      title: "Prayer Together",
      text: "Moments of faith, care, and spiritual support.",
      alt: "People praying together in church",
      image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=900&q=80"
    },
    {
      title: "Serving the Community",
      text: "Love in action across the city.",
      alt: "Volunteers serving community members",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80"
    }
  ],
  visit: {
    eyebrow: "Your first visit",
    title: "We've saved a place for you.",
    text: "Whether you're exploring faith, looking for a church home, or returning after a long time away, you are welcome here. Come as you are and let us help you get connected.",
    primaryButton: { label: "Plan Your Visit", href: "#contact" },
    secondaryButton: { label: "Ask a Question", href: "#contact" }
  },
  footer: {
    eyebrow: "MPA Prayer House",
    title: "A church family building lives through worship, prayer, and the Word.",
    copyright: "© 2026 MPA Prayer House. All rights reserved.",
    contact: {
      email: "hello@mpaprayerhouse.org",
      phone: "+1 (555) 010-2024",
      address: "123 Hope Avenue, Your City"
    },
    office: {
      lineOne: "Mon - Thu: 10:00 AM - 5:00 PM",
      lineTwo: "Fri: By Appointment",
      lineThree: "Prayer requests accepted anytime."
    }
  }
};

function cloneContent(data) {
  return JSON.parse(JSON.stringify(data));
}

function loadContent() {
  try {
    const storedContent = localStorage.getItem(CHURCH_STORAGE_KEY);
    if (!storedContent) {
      return cloneContent(DEFAULT_CONTENT);
    }
    return Object.assign(cloneContent(DEFAULT_CONTENT), JSON.parse(storedContent));
  } catch (error) {
    return cloneContent(DEFAULT_CONTENT);
  }
}

function saveContent(data) {
  localStorage.setItem(CHURCH_STORAGE_KEY, JSON.stringify(data));
}

function resetContent() {
  localStorage.removeItem(CHURCH_STORAGE_KEY);
  return cloneContent(DEFAULT_CONTENT);
}

window.ChurchContent = {
  storageKey: CHURCH_STORAGE_KEY,
  defaultContent: cloneContent(DEFAULT_CONTENT),
  cloneContent,
  loadContent,
  saveContent,
  resetContent
};
