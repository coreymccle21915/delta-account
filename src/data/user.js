const BILLING_DAY = 15

function billingDate(monthOffset) {
  const today = new Date()
  // Most recent billing date (on or before today)
  const base = new Date(today.getFullYear(), today.getMonth(), BILLING_DAY)
  const adjusted = base <= today ? base : new Date(today.getFullYear(), today.getMonth() - 1, BILLING_DAY)
  const d = new Date(adjusted.getFullYear(), adjusted.getMonth() + monthOffset, BILLING_DAY)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export const userData = {
  name: 'Alex Roberts',
  email: 'alexroberts@example.com',
  dob: 'July 14, 1986',
  gender: 'Non-binary',
  avatar: '/images/disney-avatar.png',
  disneyPlan: { name: 'Disney Bundle Trio Premium', price: 24.99 },
  huluPlan: { name: 'Hulu Premium', price: 18.99 },
  addOns: [{ name: 'Max (No Ads)', price: 18.49 }],
  extraMember: null,
  payment: {
    type: 'Discover',
    last4: '1592',
    iconUrl: '/logos/card-discover.svg',
  },
  upcomingCharge: { amount: 41.42, date: billingDate(1) },
  billingHistory: Array.from({ length: 36 }, (_, i) => ({
    date: billingDate(-i),
    desc: 'Hulu Premium & Max (Monthly, incl. tax)',
    total: 41.42,
  })),
}
