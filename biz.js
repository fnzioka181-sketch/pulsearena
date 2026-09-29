window.PulseBiz = (function () {
  const KEY = "pulsearchena-biz";
  const defaultPlans = () => ([
    { id: "free", name: "FREE", monthly: 0, yearly: 0, quizzes: 5, questions: 20, participants: 30, analytics: "Basic", reports: "Basic", bank: "No", branding: "No", features: "5 quizzes · 20 questions · 30 players" },
    { id: "starter", name: "STARTER", monthly: 500, yearly: 5000, quizzes: 9999, questions: 9999, participants: 100, analytics: "Basic", reports: "Yes", bank: "Yes", branding: "No", features: "Unlimited quizzes · 100 players · question bank" },
    { id: "professional", name: "PROFESSIONAL", monthly: 1000, yearly: 10000, quizzes: 9999, questions: 9999, participants: 300, analytics: "Advanced", reports: "Advanced", bank: "Unlimited", branding: "Yes", features: "300 players · branding · scheduled quizzes" },
    { id: "institution", name: "INSTITUTION", monthly: 0, yearly: 30000, quizzes: 9999, questions: 9999, participants: 1000, analytics: "Institution", reports: "Centralized", bank: "Yes", branding: "Institution", features: "1,000 players · multi-trainer · custom pricing" }
  ]);
  const seed = () => ({
    plans: defaultPlans(),
    eventPrice: 300,
    trialOn: true,
    trialDays: 14,
    coupons: [{ code: "WELCOME50", pct: 50, months: 3, plans: "starter,professional", exp: "2026-12-31", uses: 42, remain: 158, revenue: 21000 }],
    trainers: [
      { id: "t1", name: "Jane Mwangi", email: "jane@northridge.edu", role: "Trainer", plan: "Professional", status: "Active", quizzes: 38, sessions: 24, last: "Today", participants: 1284, start: "2026-01-12", expiry: "2026-10-12", billing: "Monthly", price: 1000, usage: 142 },
      { id: "t2", name: "Peter Otieno", email: "peter@lakeside.ac.ke", role: "Trainer", plan: "Starter", status: "Active", quizzes: 12, sessions: 8, last: "Yesterday", participants: 410, start: "2026-03-01", expiry: "2026-10-01", billing: "Yearly", price: 5000, usage: 61 },
      { id: "t3", name: "Amara Okonkwo", email: "amara@northridge.edu", role: "Trainer", plan: "Professional", status: "Active", quizzes: 2, sessions: 6, last: "Today", participants: 86, start: "2026-09-01", expiry: "2026-10-12", billing: "Monthly", price: 1000, usage: 24 },
      { id: "t4", name: "Amina Yusuf", email: "amina@ savanna.sch.ke", role: "Trainer", plan: "Free", status: "Trial", quizzes: 3, sessions: 1, last: "3 days ago", participants: 18, start: "2026-09-12", expiry: "2026-09-26", billing: "—", price: 0, usage: 9 }
    ],
    tx: [
      { id: "TX-88421", user: "t1", amount: 1000, currency: "KES", plan: "Professional", method: "M-Pesa (abstracted)", status: "paid", date: "2026-09-12T09:14:00Z", sub: "sub_pro_jane", ref: "prv_9k2" },
      { id: "TX-88402", user: "t2", amount: 5000, currency: "KES", plan: "Starter", method: "Card (tokenized)", status: "paid", date: "2026-09-01T11:02:00Z", sub: "sub_st_peter", ref: "prv_8aa" },
      { id: "TX-88311", user: "t4", amount: 300, currency: "KES", plan: "One-Time Event", method: "M-Pesa (abstracted)", status: "paid", date: "2026-09-20T16:40:00Z", sub: "", ref: "prv_evt" },
      { id: "TX-88290", user: "t3", amount: 1000, currency: "KES", plan: "Professional", method: "Card (tokenized)", status: "failed", date: "2026-09-18T08:01:00Z", sub: "sub_pro_amara", ref: "prv_fail" }
    ],
    invoices: [{ no: "INV-1042", name: "Jane Mwangi", email: "jane@northridge.edu", plan: "Professional", period: "12 Sep – 12 Oct 2026", amount: 1000, currency: "KES", status: "Paid", tx: "TX-88421", date: "2026-09-12" }],
    audit: [{ admin: "Super Admin", action: "Changed Professional plan price", prev: "KES 1,000", next: "KES 1,000", date: "24 September 2026" }],
    notes: [{ t: "Successful payment", d: "Jane Mwangi · Professional" }, { t: "Failed payment", d: "Amara Okonkwo · retry needed" }, { t: "Trial ending", d: "Amina Yusuf · 2 days left" }],
    metrics: {
      users: 1248, trainers: 382, subs: 214, mrev: 187000, yrev: 2244000, live: 24, quizzes: 8492, parts: 56820,
      today: 12400, week: 61000, month: 187000, year: 2244000, life: 4812000, mrr: 187000, arr: 2244000,
      byPlan: { Starter: 62000, Professional: 98000, Institution: 24000, Event: 3000 },
      byMethod: { "Mobile": 121000, "Card": 66000 },
      refunds: 2400, failed: 11, cancelled: 19, trials: 47,
      monthlyRevShare: 132000, yearlyRevShare: 52000, eventRev: 3000
    },
    live: [{ trainer: "Jane Mwangi", quiz: "Computer Networking Assessment", pin: "482915", players: 87, start: "09:10", q: "12 / 25", plan: "Professional", status: "LIVE" }],
    history: []
  });
  function load() {
    try { return Object.assign(seed(), JSON.parse(localStorage.getItem(KEY) || "null") || {}); }
    catch { return seed(); }
  }
  function save(b) { localStorage.setItem(KEY, JSON.stringify(b)); }
  function pay({ userId, amount, plan, method }) {
    const b = load();
    const id = "TX-" + Math.floor(80000 + Math.random() * 9999);
    b.tx.unshift({ id, user: userId || "t3", amount, currency: "KES", plan, method: method || "Gateway (abstracted)", status: "paid", date: new Date().toISOString(), sub: "sub_" + Date.now(), ref: "prv_" + Date.now() });
    b.notes.unshift({ t: "Successful payment", d: plan + " · " + amount + " KES" });
    save(b);
    return id;
  }
  return { load, save, pay, seed };
})();
