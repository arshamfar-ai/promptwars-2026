# 🛡️ FinGuard AI — Intelligent Financial Fraud Detection & AML Command Center

**PromptWars X AI Challenge Hackathon 2026 | Integral University, Lucknow**  
🌐 **Live Demo:** https://arshamfar-ai.github.io/promptwars-2026/  
💻 **GitHub Repository:** https://github.com/arshamfar-ai/promptwars-2026

---

## 📌 Problem Statement & Solution
**Domain:** FinTech & Financial Security  
**Objective:** Intelligent Financial Fraud Detection and Anti-Money Laundering (AML) System

Modern digital payment ecosystems (UPI, IMPS, NEFT, Cards) face high-velocity fraud and sophisticated money-laundering techniques—such as **structuring/smurfing** (splitting transfers just below the ₹50,000 KYC reporting threshold) and **circular money-laundering rings**. Legacy rule-based engines generate opaque alerts without clear audit reasoning.

**FinGuard AI** is a real-time **SOC Level 3 FinTech Security Operations Command Center** built using prompt-driven engineering in **Google Antigravity**. It processes synthetic financial transactions in real time, visually isolates laundering rings on a network graph, assigns a 0–100 AI risk score, and generates plain-English **Explainable AI (XAI)** breakdowns alongside downloadable Suspicious Activity Reports (SAR).

---

## ✨ Key Features
- **Real-Time Transaction Monitoring Feed:** Live synthetic Indian FinTech stream (UPI, IMPS, NEFT, Credit Card) with live pause/resume toggle, search, and severity filters (`All`, `Critical Alerts`, `AML Patterns`, `Safe`).
- **One-Click Attack Simulators:**
  - **⚡ Inject Fraud Burst:** Simulates a 5-transaction smurfing/structuring attack just under ₹50,000.
  - **🔄 Inject AML Laundering Ring:** Simulates a 4-hop circular money laundering loop across accounts.
- **Interactive AML Money-Flow Network Graph:** HTML5 Canvas node-link visualization that detects and highlights circular money movement in crimson red, with **Run Cycle Detection** and **Reset Graph** controls.
- **Explainable AI (XAI) Investigation Panel:** Displays a 0–100 Risk Score Gauge, weighted feature contributions (*Transaction Velocity*, *Amount Deviation*, *Network Graph Match*, *Geo-Location Jump*), plain-English compliance reasoning, **Freeze Account** action, and one-click **SAR (.txt) Report Export**.
- **Custom Transaction AI Simulator:** Allows analysts and judges to test custom amounts, transfer modes, velocity spikes, and patterns live.

---

## 🧠 Prompt Engineering Workflow (Google Antigravity)
1. **System Architecture & Master Prompt (`Claude Sonnet 4.6`):** Defined a zero-backend, self-contained HTML5/CSS3/Vanilla JS + Chart.js architecture so the entire SOC dashboard runs with zero latency and deploys directly to GitHub Pages.
2. **Responsive SOC Grid & Visual Polish (`Gemini 3.8 Flash High`):** Structured a 5-column real-time KPI header, 2-column command grid, and z-index-safe XAI drawer.
3. **State & Graph Verification (`Gemini 3.8 Flash High`):** Refined baseline graph reset states, master-array KPI aggregation, and dynamic feed counters.

---

## 🛠️ Tech Stack
- **AI Development Environment:** Google Antigravity (`Claude Sonnet 4.6` & `Gemini 3.8 Flash High`)
- **Frontend & Visualization:** HTML5, CSS3, Tailwind CSS, Vanilla JavaScript (ES6+), HTML5 Canvas, Chart.js
- **Hosting & Deployment:** GitHub & GitHub Pages

*Disclaimer: All transaction records, account identifiers, and financial metrics displayed in FinGuard AI are 100% synthetic and anonymized for hackathon demonstration purposes.*
