# TripMate — AI-Powered Trip Planner Web Application

> **"Your Journey, Your Way. Plan smarter, travel better with AI."**

TripMate is a full-stack, AI-powered travel planning web platform built with **React**, **Tailwind CSS**, and **Lucide React Icons**. Designed specifically for modern travelers, it transforms trip preferences and budgets into structured day-by-day itineraries, verified INR budget breakdowns, and curated dining suggestions in seconds.

---

## Key Features & Highlights

### 1. Modern Travel-Tech UI/UX
- **Aesthetic:** Clean white and warm beige canvas (`#FAF8F5`) with vibrant orange (`#FF6B35`) and royal blue (`#0284C7`) accents.
- **Card-Driven Layout:** Rounded cards (`rounded-3xl`), subtle shadows, smooth transitions, and high-resolution destination photography.
- **Responsive Navigation Bar:** Smooth tab switching between **Home**, **Explore Destinations**, **Plan a Trip**, and **My Trips** with live saved trips badge.

### 2. Intelligent Trip Planner (Core Engine)
- **Comprehensive Input Controls:**
  - Starting location (Origin)
  - Destination (with quick-select pill suggestions)
  - Departure and return dates (with automatic duration calculation)
  - Number of travelers (+/- counter)
  - Total budget in **INR (₹)** with quick presets
  - Travel Type selection: **Solo**, **Friends**, **Family**, or **Couple**
  - Travel Preferences: **Adventure**, **Nature**, **Shopping**, **Food**, **Beaches**, and **Historical Places**
- **Validation & AI Loader:** Input validation with friendly alerts and an animated AI synthesis state upon clicking **"Generate My Trip"**.

### 3. AI Trip Generation (Local Zero-Downtime Engine)
- Generates realistic, day-wise itineraries without requiring external paid API keys.
- **Day Slots:** Each day is structured into **Morning**, **Afternoon**, and **Evening** activities with timings, location pins, and estimated costs.
- **Curated Dining:** Recommends regional restaurants, famous local dishes, and estimated meal costs for two.
- **Attractions & Navigation:** Highlights must-visit landmarks with one-click **Google Maps** integration.

### 4. Interactive Budget Planner & Over-Budget Alerts
- **6 Expense Categories:**
  1. Transportation
  2. Accommodation
  3. Food & Dining
  4. Sightseeing & Entry Tickets
  5. Shopping
  6. Miscellaneous Buffer
- **Live Metrics:** Displays Total Target Budget, Estimated Total Expenses, and Remaining Savings.
- **Visual Chart:** Multi-color percentage distribution bar across all categories.
- **Overspending Warning:** Flags an immediate alert if the calculated expenses exceed the user's allocated budget.

### 5. Explore Destinations Showcase
- 8 Featured Indian Gateways:
  1. **Manali** (Snowy Peaks & River Adventure)
  2. **Shimla** (Queen of the Hills & Colonial Charm)
  3. **Goa** (Sun-Kissed Beaches & Portuguese Heritage)
  4. **Jaipur** (The Royal Pink City & Grand Forts)
  5. **Kashmir** (Paradise on Earth & Dal Lake)
  6. **Rishikesh** (Yoga Capital & River Rafting)
  7. **Delhi** (Centuries of Empires & Street Food)
  8. **Amritsar** (Sacred Golden Temple & Heritage)
- Each card shows high-resolution imagery, must-visit spots, starting budget per person, and a 1-click **"Plan Trip to [City]"** button that pre-fills the planner.

### 6. My Trips (LocalStorage Persistence)
- **Save Trips:** Save generated plans with a single click.
- **Persistence:** Retains trips in the browser's `localStorage` across page reloads.
- **View & Delete:** Open full trip details anytime or delete completed trips.
- **Print & Share:** Instant printable **PDF Travel Pass** layout and one-click **WhatsApp group sharing**.

---

## How to Run the Application

### 1. Open Terminal in the Project Directory
```bash
cd "c:\Users\Lenovo\OneDrive\Desktop\project trip"
```

### 2. Start the Development Server
```bash
npm run dev
```

### 3. Open in Browser
Visit **[http://localhost:3000](http://localhost:3000)** in your browser to view and interact with **TripMate**!

---

## Evaluation Demonstration Checklist

1. **Homepage:** Browse the Hero section, Trending Destinations cards, How It Works, and Why Choose Us sections.
2. **Explore Tab:** Click **Explore Destinations** to view all 8 destinations. Click **"Plan Trip to Manali"** to see it pre-fill the form.
3. **Trip Generation:** Adjust dates, travelers, and budget in the planner, select preferences, and click **"Generate My Trip"**.
4. **Results & Budget:** Inspect the generated Day 1, Day 2, and Day 3 activities, restaurant recommendations, and the 6-category budget breakdown chart.
5. **My Trips & LocalStorage:** Click **"Save Trip to My Trips"**, navigate to the **My Trips** tab, refresh the page to prove persistence, open the trip details, or delete it.
6. **Export:** Click **"Print / PDF"** to test the clean printable Travel Pass.
