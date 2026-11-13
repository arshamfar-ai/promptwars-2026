# FinGuard AI — Intelligent Financial Fraud Detection & AML Command Center

**PromptWars X AI Challenge Hackathon 2026 | Integral University, Lucknow**  
- **Live Deployed App:** https://arshamfar-ai.github.io/promptwars-2026/
- **GitHub Repository:** https://github.com/arshamfar-ai/promptwars-2026

---

## 1. Chosen Vertical
**FinTech & Financial Security — Intelligent Financial Fraud Detection and Anti-Money Laundering (AML) System**  
Designed as a **SOC Level 3 (Senior Threat Hunter)** real-time command center for monitoring digital banking and UPI/NEFT/IMPS payment streams.

---

## 2. Approach and Logic
Modern digital payment ecosystems face two high-impact financial crime vectors:
1. **Structuring / Smurfing:** Fraudsters split large sums into rapid transactions just below the **₹50,000 KYC reporting threshold** (e.g., multiple ₹49,500 transfers within 10 minutes).
2. **Circular Money Laundering Rings:** Illicit funds are routed across closed loops of mule accounts ($A \rightarrow B \rightarrow C \rightarrow D \rightarrow A$) to obscure origin.

**Decision & Scoring Logic:**
- Every incoming transaction is evaluated across four weighted risk vectors: **Transaction Velocity** (bursts within 10 minutes), **Amount Deviation** (threshold proximity & high-value anomalies), **Circular Network Graph Topology** (depth-first cycle detection across directed account transfers), and **Geo-Location Jumps**.
- Scores are normalized from `0–100` and classified into `SAFE` (`0–39`), `SUSPICIOUS` (`40–69`), and `CRITICAL` (`70–100`).
- **Explainable AI (XAI):** Instead of opaque black-box alerts, the engine generates exact percentage feature weights and plain-English compliance summaries for every flagged transaction.

---

## 3. How the Solution Works
1. **Real-Time Transaction Monitoring Engine (`app.js`):** Streams synthetic Indian financial transactions (UPI, IMPS, NEFT, Credit Card) with live pause/resume controls, instant search, and severity filters (`All`, `Critical Alerts`, `AML Patterns`, `Safe`).
2. **One-Click Threat Simulation Controls:**
   - **Inject Fraud Burst:** Simulates a 5-transaction smurfing burst just below ₹50,000.
   - **Inject AML Ring:** Simulates a 4-hop circular laundering loop across accounts.
3. **Interactive AML Money-Flow Network Graph:** Renders account nodes and directional payment edges on an HTML5 Canvas, highlighting circular laundering rings in crimson red with **Run Cycle Detection** and **Reset Graph** controls.
4. **AI Investigation Panel & Compliance Actions:** Clicking any transaction opens its 0–100 Risk Gauge, weighted risk bars, plain-English audit explanation, one-click **Freeze Account** toggle, and automated **Suspicious Activity Report (SAR .txt)** export.
5. **Custom Transaction AI Simulator:** Allows analysts and judges to input custom sender/receiver IDs, amounts, payment modes, velocity counts, and attack patterns for instant AI risk scoring.

---

## 4. Assumptions Made
- **100% Synthetic & Anonymized Data:** All account IDs (`USR-XXXX`), transaction IDs (`TXN-XXXX`), amounts, and geo-locations are synthetically generated for hackathon demonstration; zero real PII or live banking credentials are used.
- **Regulatory Threshold Baseline:** The ₹50,000 structuring/smurfing threshold models standard Indian banking/FIU-IND KYC reporting rules.
- **Zero-Backend Edge Execution:** All scoring, cycle detection, and visualization run deterministically in client-side JavaScript (`ES6+`) so the system operates with sub-millisecond latency and zero external API failure risk.

---

## 5. Verification & Automated Testing (`tests.js`)
Run `node tests.js` (or open `test.html` in any browser) to execute the 5-part automated verification suite validating:
1. Safe baseline UPI classification (`score < 40`)
2. ₹49,500 high-velocity smurfing detection (`CRITICAL`, `score >= 70`)
3. Directed cyclic graph detection for 3-hop and 4-hop AML rings
4. Acyclic transfer non-false-positive verification
5. FIU-IND / PMLA Suspicious Activity Report (SAR) payload generation
