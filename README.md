# CutDay - Zero-Contact Lawn Care Platform

A subscription-first lawn mowing service built for the Kitchener-Waterloo region. Book in 60 seconds, get photo proof every cut.

![CutDay](https://via.placeholder.com/1200x630/1B4332/FFFFFF?text=CutDay+Lawn+Care)

## 🚀 Features

### Customer-Facing (Phase 1 - Website MVP)
- **Instant Booking Flow** - Address validation, lawn size estimation, plan selection
- **Flexible Service Windows** - 2-3 day windows instead of rigid appointments
- **Subscription Plans** - Weekly, bi-weekly, every 10 days with automatic discounts
- **One-Time Services** - Single cuts, overgrown rescue, pre-listing cleanup
- **Add-On Services** - Edging, trimming, leaf cleanup, weed control
- **Card-on-File** - Secure Stripe integration, charged after service
- **Photo Proof** - Before/after photos every visit

### Operations (Phase 2 - Coming Soon)
- **Crew App** - Daily routes, one-tap status updates, photo uploads
- **Route Optimization** - Efficient neighborhood-based routing
- **Weather Logic** - Automatic rain delay rescheduling
- **Skip Tokens** - Customer-initiated service skips

### Customer Portal (Phase 3 - Coming Soon)
- **Subscription Management** - Pause, cancel, modify plans
- **Service History** - View all past services with photos
- **Payment History** - Invoices, receipts, payment methods
- **Property Notes** - Gate codes, pet info, special instructions

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Payments | Stripe |
| Database | Supabase (Phase 2) |
| SMS/Email | Twilio + SendGrid (Phase 2) |
| Maps | Google Maps API (Phase 2) |
| Hosting | Vercel |

## 📁 Project Structure

```
lawncare-kw/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── pricing/           # Pricing page
│   │   ├── how-it-works/      # How it works page
│   │   ├── service-area/      # Service area page
│   │   ├── faq/               # FAQ page
│   │   ├── book/              # Booking flow
│   │   └── contact/           # Contact page
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   └── ui/                # Reusable UI components
│   ├── lib/
│   │   ├── constants.ts       # Config, pricing, service areas
│   │   └── utils.ts           # Helper functions
│   ├── hooks/
│   │   └── useBookingFlow.ts  # Booking state management
│   ├── types/
│   │   └── index.ts           # TypeScript definitions
│   └── styles/
│       └── globals.css        # Tailwind + custom styles
├── public/                     # Static assets
├── tailwind.config.ts         # Tailwind configuration
├── next.config.js             # Next.js configuration
└── package.json               # Dependencies
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lawncare-kw.git
   cd lawncare-kw
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Stripe keys and other configuration.

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🎨 Brand Guidelines

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Primary (Deep Green) | `#1B4332` | Headers, buttons, trust |
| Primary Light | `#2D6A4F` | Hover states |
| Accent (Orange) | `#F97316` | CTAs, pricing |
| Cream | `#FEFDFB` | Background |
| Off-white | `#FAF9F7` | Alt sections |

### Typography
- **Headings**: Source Serif 4 (serif)
- **Body**: Source Sans 3 (sans-serif)
- **Base size**: 18px (accessibility)

### Design Principles
- Large touch targets (48px minimum)
- High contrast for readability
- Minimal steps in booking flow
- Clear progress indicators
- No jargon, plain language

## 📊 Data Model

### Core Entities

```typescript
// User
User {
  id, email, phone, firstName, lastName,
  stripeCustomerId, emailVerified, phoneVerified
}

// Property (multiple per user)
Property {
  id, userId, address, lawnSize, terrain,
  obstacles, gateAccess, petInfo, permanentNotes
}

// Subscription
Subscription {
  id, userId, propertyId, planId, status,
  startDate, pausedUntil, skipTokens, stripeSubscriptionId
}

// Booking
Booking {
  id, subscriptionId, propertyId, serviceType, status,
  scheduledWindow, actualServiceDate, addOns, totalPrice,
  crewId, completionPhotos, weatherDelay
}

// Route (for crew)
Route {
  id, crewId, date, serviceWindow, stops,
  status, totalDistance, estimatedDuration
}
```

## 🔌 API Endpoints (Phase 2)

### Customer APIs
```
POST   /api/booking          # Create new booking
GET    /api/booking/:id      # Get booking details
PATCH  /api/booking/:id/skip # Skip a service
GET    /api/subscription     # Get user subscriptions
PATCH  /api/subscription/:id # Update subscription
POST   /api/property         # Add new property
```

### Crew APIs
```
GET    /api/crew/route       # Get today's route
PATCH  /api/crew/stop/:id    # Update stop status
POST   /api/crew/photo       # Upload completion photo
POST   /api/crew/flag        # Report issue
```

### Webhook Endpoints
```
POST   /api/webhooks/stripe  # Stripe payment events
POST   /api/webhooks/weather # Weather alerts
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npx vercel
   ```

2. **Set environment variables** in Vercel dashboard

3. **Deploy**
   ```bash
   npx vercel --prod
   ```

### Environment Variables for Production
- Set all variables from `.env.example`
- Use production Stripe keys
- Configure custom domain

## 📈 KPIs to Track

### Conversion
- Homepage → Booking start rate
- Booking completion rate
- Time to complete booking

### Retention
- Subscription churn rate
- Skip token usage
- Service satisfaction (photo quality)

### Operations
- Route efficiency (stops/hour)
- Weather delay rate
- Access issue rate

## 🗺️ Roadmap

### Phase 1 (Current) - Website MVP
- [x] Homepage with value props
- [x] Pricing page
- [x] How it works page
- [x] Service area page
- [x] FAQ page
- [x] Multi-step booking flow
- [x] Contact page
- [ ] Stripe integration
- [ ] Email confirmations

### Phase 2 - Operations
- [ ] Supabase database setup
- [ ] Crew mobile app
- [ ] Route optimization
- [ ] SMS notifications
- [ ] Weather API integration
- [ ] Admin dashboard

### Phase 3 - Customer Portal
- [ ] Customer login/signup
- [ ] Subscription management
- [ ] Service history with photos
- [ ] Payment management
- [ ] Property notes editor

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details.

## 📞 Support

- **Email**: hello@cutday.ca
- **Phone**: (519) 555-LAWN
- **Service Area**: Kitchener, Waterloo, Cambridge, Guelph

---

Built with ❤️ for the KW region
