# ScamShield AI — Interactive Financial Scam Simulator & Awareness Engine

> **India Cyber Defense & Financial Literacy Platform**  
> An interactive simulator built with realistic branching scenarios, granular decision evaluation, trilingual support (English, हिन्दी, मराठी), deterministic scoring, and personalized defensive drills.

---

## 🛡️ Product Overview

**ScamShield AI** transforms passive financial literacy into active, experiential muscle memory. Instead of reading advisory PDFs about fraud, users step into realistic fictional situations, inspect payment requests and deceptive messages, make decisions, experience the consequences of their choices, and learn how to recover even after a mistake.

### The Central Learning Cycle:
$$\text{Choose Scenario} \longrightarrow \text{Examine Situation} \longrightarrow \text{Make Decision} \longrightarrow \text{Follow Branch} \longrightarrow \text{Granular Feedback} \longrightarrow \text{Awareness Score} \longrightarrow \text{Personalized Drills}$$

---

## 🌟 Key Features

1. **Deterministic Branching Scenario Engine**:
   - Data-driven scenario graph where user decisions determine subsequent events.
   - Mistakes lead to realistic escalation (pressure tactics, urgency, fake receipts).
   - Safe decisions defuse traps and lead to prevention outcomes.
   - Built-in **Recovery Mechanics**: users learn that an initial slip-up does not mean total loss; taking emergency actions (refusing secondary requests, cutting network, blocking VPAs, calling 1930) contains the damage.

2. **Granular Decision Evaluation & 10-Indicator Taxonomy**:
   Every decision is evaluated individually across a 10-point indicator taxonomy:
   - `urgency_or_threats` (Artificial deadlines, account freeze threats)
   - `suspicious_links` (Phishing domains: `.xyz`, `.top`, lookalikes)
   - `requests_for_otp_pin` (Asking for UPI PIN to receive money, OTPs)
   - `unexpected_payment_request` (Collect requests disguised as refunds)
   - `unrealistic_returns` (500% guaranteed profit schemes)
   - `impersonation` (Bank, police, or electricity board impersonation)
   - `remote_access_request` (QuickSupport, AnyDesk, unknown APKs)
   - `unusual_payment_methods` (Personal UPI QR codes for e-commerce)
   - `independent_verification` (Checking official bank app/passbook)
   - `safe_reporting_recovery` (Freezing cards, dialing 1930 within the Golden Hour)

3. **Transparent Awareness Scoring**:
   $$\text{Decision Accuracy} = \frac{\text{Total Points Earned}}{\text{Total Available Points}} \times 100$$
   $$\text{Overall Awareness Score} = \text{Weighted Average of Unique Completed Scenarios}$$
   - Clearly marks provisional scores (1 completed scenario) vs verified mastery (>1 scenario).
   - Clean empty state for first-time users.

4. **Rule-Based Personalization Engine**:
   - Analyzes cumulative decision history to identify recurring blind spots.
   - Delivers targeted safety tips with explanations, why recommended, actionable practice, and direct links to relevant scenarios.
   - Awards mastery recommendations to high performers (>85%).

5. **Trilingual Localization (English, हिन्दी, मराठी)**:
   - Complete localization across all navigation, 5 scenarios, messages, choices, consequences, evaluations, indicator definitions, dashboard, quiz, learning guides, and safety checklists.
   - Seamless language switching during active simulation without losing progress or branch state.
   - Language preferences persisted in `localStorage`.

6. **Interactive Knowledge Quiz & Learning Center**:
   - 10 comprehensive questions reinforcing key concepts (UPI PIN debits, phishing links, AnyDesk risks, Golden Hour).
   - Searchable, categorized learning guides and incident response playbook.
   - Direct emergency reporting integration details (Helpline 1930, `cybercrime.gov.in`, Chakshu portal).

---

## 📱 The 5 Realistic Scenarios

| # | Scenario Title | Category | Difficulty | Key Lesson |
|---|---|---|---|---|
| **1** | **The Unexpected UPI Refund** | UPI Fraud | Beginner | UPI PIN is **ONLY** to send money; receiving money never requires a PIN. |
| **2** | **The Urgent Bank KYC Message** | Phishing SMS | Beginner | Banks never send third-party `.xyz` links or 2-hour suspension ultimatums over SMS. |
| **3** | **The 500% Guaranteed Investment Group** | Investment Fraud | Intermediate | Guaranteed returns with zero risk is a Ponzi trap; never pay advance TDS to personal UPI. |
| **4** | **The Fake Customer Support Agent** | Impersonation | Intermediate | Never install AnyDesk or APKs; sever device internet immediately if remote access starts. |
| **5** | **The 90% Off Luxury Flash Sale** | Shopping Scam | Advanced | 90% electronics markdowns are bait; avoid direct P2P UPI transfers to unknown sellers. |

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v3
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Testing**: Vitest 5, JSDOM, React Testing Library
- **Persistence**: Structured Browser LocalStorage (`StorageService`) with zero sensitive data collection
- **Zero API Dependency**: 100% functional offline without paid API keys or third-party AI tokens

---

## 🚀 Quickstart & Commands

### Prerequisites
- Node.js (v18+)
- npm

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Run Automated Tests
```bash
npm test
```
Executes all 18 unit and integration tests across engine integrity, decision evaluation, scoring, personalization, translation coverage, and full user journey.

### 4. Build for Production
```bash
npm run build
```
Generates optimized static assets in `/dist`.

### 5. Preview Production Build
```bash
npm run preview
```

---

## ⏱️ 3-Minute Hackathon Demonstration Script

1. **Step 1 — Landing (`/`)**:
   - Point out the headline *"Would You Spot the Scam Before Clicking?"* and the trilingual language switcher in the header.
2. **Step 2 — Select UPI Scenario (`/scenarios`)**:
   - Choose *"The Unexpected UPI Refund"* and click **Start Scenario**.
3. **Step 3 — Make a Risky Choice**:
   - In Step 1, select *"Open UPI notification and enter UPI PIN to receive ₹3,500"*.
   - Click **Confirm & Submit Decision**.
   - Show the immediate feedback: High Risk badge, missed indicators (`requests_for_otp_pin`, `unexpected_payment_request`), explanation, and safer alternative.
4. **Step 4 — Follow the Escalation Branch**:
   - Click **Proceed to Next Step**.
   - Notice the scenario dynamically escalated: Rohan claims a server jam and demands approving a ₹7,000 auto-reversal collect request.
5. **Step 5 — Execute Recovery**:
   - Select the recovery choice: *"RECOVERY: Recognize the scam! Refuse to enter PIN, lock UPI in bank app, and call cyber helpline 1930"*.
   - Submit and show the **Successfully Recovered** badge and `+90 pts` earned.
6. **Step 6 — Review Outcome & Score**:
   - Advance to the results screen. Observe the calculated Awareness Score (45%), decision audit timeline, and crucial takeaway.
7. **Step 7 — Language Switch**:
   - Switch language to **हिन्दी (Hindi)** or **मराठी (Marathi)** via the top dropdown.
   - Show that the entire interface, decision consequences, and advice update in real-time.
8. **Step 8 — Dashboard & Personalized Tips (`/dashboard`)**:
   - Open the Dashboard. Point out the live ScoreGauge, most frequently missed indicators, and tailored safety tips specifically targeting PIN/credential protection.

---

## 🔒 Security & Privacy Statement

- **Zero Credential Collection**: ScamShield AI never requests, collects, or stores real bank account credentials, passwords, OTPs, PINs, or credit card numbers.
- **Fictionalized Training Data**: All sender IDs (`rohan.verma88@axl`, `AD-SBINB-KYC`), domain names, and phone numbers are safely fictionalized for financial literacy.
- **Educational Platform**: ScamShield AI is an awareness simulator. It does not initiate financial transactions, reverse debits, or file legal complaints. In case of actual fraud, users should immediately dial **1930** or visit **[cybercrime.gov.in](https://cybercrime.gov.in)**.
