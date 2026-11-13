/* ============================================================
   FinGuard AI — AML Command Center  |  app.js
   100% client-side, vanilla JS, no build step required
   ============================================================ */

'use strict';

// ─────────────────────────────────────────────
// SECTION 1 — DATA & STATE
// ─────────────────────────────────────────────

const NOW = new Date();
function minsAgo(m) {
  return new Date(NOW.getTime() - m * 60000).toISOString();
}

let transactions = [
  /* 1 — CRITICAL AML Smurfing */
  {
    id: 'TXN-20260001',
    sender: 'USR-8841',
    receiver: 'USR-3302',
    amount: 49500,
    mode: 'UPI',
    location: 'Mumbai',
    timestamp: minsAgo(2),
    riskScore: 96,
    status: 'CRITICAL',
    classification: 'AML Smurfing/Splitting',
    features: { velocity: 98, amountDeviation: 95, circularMatch: 72, geoJump: 18 },
    xaiExplanation: 'Structuring/Smurfing detected — 4 split transfers of Rs 49,500 within 9 minutes to evade Rs 50,000 reporting threshold. Velocity: 4 txns/9min (threshold: 3/10min). AI confidence: 98.2%',
    frozen: false,
    sarDownloaded: false
  },
  /* 2 — CRITICAL Circular ML */
  {
    id: 'TXN-20260002',
    sender: 'USR-5571',
    receiver: 'USR-7742',
    amount: 285000,
    mode: 'IMPS',
    location: 'Delhi',
    timestamp: minsAgo(5),
    riskScore: 94,
    status: 'CRITICAL',
    classification: 'Circular Money Laundering',
    features: { velocity: 85, amountDeviation: 90, circularMatch: 97, geoJump: 22 },
    xaiExplanation: 'Circular money laundering ring detected: USR-5571 -> USR-7742 -> USR-9981 -> USR-5571 completing a full cycle within 23 minutes. Total Rs 2,85,000 laundered through 3-hop network.',
    frozen: false,
    sarDownloaded: false
  },
  /* 3 — CRITICAL Card Anomaly */
  {
    id: 'TXN-20260003',
    sender: 'USR-4421',
    receiver: 'USR-1198',
    amount: 87500,
    mode: 'Credit Card',
    location: 'Mumbai',
    timestamp: minsAgo(8),
    riskScore: 71,
    status: 'CRITICAL',
    classification: 'Card/UPI Anomaly',
    features: { velocity: 55, amountDeviation: 70, circularMatch: 15, geoJump: 92 },
    xaiExplanation: 'Foreign geo-location spike: Transaction originated from IP geolocated to Moscow, Russia while account\'s historical pattern is 100% Mumbai-based. Time: 02:47 IST (midnight fraud window). Geo-jump score: 92/100.',
    frozen: false,
    sarDownloaded: false
  },
  /* 4 — SUSPICIOUS */
  {
    id: 'TXN-20260004',
    sender: 'USR-2234',
    receiver: 'USR-6610',
    amount: 48000,
    mode: 'UPI',
    location: 'Bangalore',
    timestamp: minsAgo(10),
    riskScore: 62,
    status: 'SUSPICIOUS',
    classification: 'AML Smurfing/Splitting',
    features: { velocity: 60, amountDeviation: 72, circularMatch: 45, geoJump: 10 },
    xaiExplanation: 'Flagged 62/100: Structuring/Smurfing detected — multiple sub-threshold transfers detected. 3 transactions in 10-minute window totaling Rs 1,44,000. Designed to evade Rs 50,000 reporting threshold. AI confidence: 98.2%',
    frozen: false,
    sarDownloaded: false
  },
  /* 5 — SAFE */
  {
    id: 'TXN-20260005',
    sender: 'USR-1120',
    receiver: 'USR-4480',
    amount: 12500,
    mode: 'UPI',
    location: 'Pune',
    timestamp: minsAgo(11),
    riskScore: 12,
    status: 'SAFE',
    classification: 'Normal Transaction',
    features: { velocity: 10, amountDeviation: 15, circularMatch: 5, geoJump: 8 },
    xaiExplanation: 'Transaction appears normal. Risk score: 12/100. No anomalous patterns detected. Amount within historical deviation. Geographic location consistent with account history.',
    frozen: false,
    sarDownloaded: false
  },
  /* 6 — SAFE */
  {
    id: 'TXN-20260006',
    sender: 'USR-3391',
    receiver: 'USR-8820',
    amount: 5500,
    mode: 'UPI',
    location: 'Hyderabad',
    timestamp: minsAgo(13),
    riskScore: 8,
    status: 'SAFE',
    classification: 'Normal Transaction',
    features: { velocity: 5, amountDeviation: 8, circularMatch: 3, geoJump: 4 },
    xaiExplanation: 'Transaction appears normal. Risk score: 8/100. No anomalous patterns detected. Amount within historical deviation. Geographic location consistent with account history.',
    frozen: false,
    sarDownloaded: false
  },
  /* 7 — SUSPICIOUS velocity */
  {
    id: 'TXN-20260007',
    sender: 'USR-7723',
    receiver: 'USR-5544',
    amount: 95000,
    mode: 'IMPS',
    location: 'Chennai',
    timestamp: minsAgo(14),
    riskScore: 58,
    status: 'SUSPICIOUS',
    classification: 'Card/UPI Anomaly',
    features: { velocity: 72, amountDeviation: 55, circularMatch: 20, geoJump: 40 },
    xaiExplanation: 'Flagged 58/100: Unusual transaction velocity — 10 transactions in 10 minutes (normal: <3). Amount Rs 95,000 via IMPS. Possible account takeover or scripted fraud.',
    frozen: false,
    sarDownloaded: false
  },
  /* 8 — SAFE NEFT */
  {
    id: 'TXN-20260008',
    sender: 'USR-6612',
    receiver: 'USR-2201',
    amount: 350000,
    mode: 'NEFT',
    location: 'Kolkata',
    timestamp: minsAgo(15),
    riskScore: 22,
    status: 'SAFE',
    classification: 'Normal Transaction',
    features: { velocity: 12, amountDeviation: 30, circularMatch: 7, geoJump: 5 },
    xaiExplanation: 'Transaction appears normal. Risk score: 22/100. NEFT transfer within expected business parameters. No anomalous patterns detected.',
    frozen: false,
    sarDownloaded: false
  },
  /* 9 — SAFE small UPI */
  {
    id: 'TXN-20260009',
    sender: 'USR-9900',
    receiver: 'USR-4433',
    amount: 800,
    mode: 'UPI',
    location: 'Ahmedabad',
    timestamp: minsAgo(16),
    riskScore: 9,
    status: 'SAFE',
    classification: 'Normal Transaction',
    features: { velocity: 8, amountDeviation: 5, circularMatch: 2, geoJump: 3 },
    xaiExplanation: 'Transaction appears normal. Risk score: 9/100. Small UPI transfer consistent with daily spending patterns. No anomalous patterns detected.',
    frozen: false,
    sarDownloaded: false
  },
  /* 10 — SUSPICIOUS credit card */
  {
    id: 'TXN-20260010',
    sender: 'USR-3344',
    receiver: 'USR-7788',
    amount: 128000,
    mode: 'Credit Card',
    location: 'Delhi',
    timestamp: minsAgo(17),
    riskScore: 55,
    status: 'SUSPICIOUS',
    classification: 'Card/UPI Anomaly',
    features: { velocity: 48, amountDeviation: 65, circularMatch: 18, geoJump: 55 },
    xaiExplanation: 'Flagged 55/100: Credit card transaction above typical spend limit for this user. Geographic shift from home city Hyderabad to Delhi. Time-band risk: evening. AI confidence: 98.2%',
    frozen: false,
    sarDownloaded: false
  },
  /* 11 — SAFE IMPS */
  {
    id: 'TXN-20260011',
    sender: 'USR-1155',
    receiver: 'USR-9922',
    amount: 75000,
    mode: 'IMPS',
    location: 'Pune',
    timestamp: minsAgo(18),
    riskScore: 18,
    status: 'SAFE',
    classification: 'Normal Transaction',
    features: { velocity: 15, amountDeviation: 20, circularMatch: 6, geoJump: 8 },
    xaiExplanation: 'Transaction appears normal. Risk score: 18/100. IMPS transfer within account historical range. No anomalous patterns detected.',
    frozen: false,
    sarDownloaded: false
  },
  /* 12 — SAFE NEFT large */
  {
    id: 'TXN-20260012',
    sender: 'USR-8870',
    receiver: 'USR-2255',
    amount: 1200000,
    mode: 'NEFT',
    location: 'Mumbai',
    timestamp: minsAgo(19),
    riskScore: 28,
    status: 'SAFE',
    classification: 'Normal Transaction',
    features: { velocity: 10, amountDeviation: 42, circularMatch: 10, geoJump: 5 },
    xaiExplanation: 'Transaction appears normal. Risk score: 28/100. High-value NEFT within expected corporate transfer range. Sender has prior history of similar transfers.',
    frozen: false,
    sarDownloaded: false
  },
  /* 13 — SUSPICIOUS wire */
  {
    id: 'TXN-20260013',
    sender: 'USR-5533',
    receiver: 'USR-1177',
    amount: 950000,
    mode: 'Wire Transfer',
    location: 'Bangalore',
    timestamp: minsAgo(20),
    riskScore: 65,
    status: 'SUSPICIOUS',
    classification: 'AML Smurfing/Splitting',
    features: { velocity: 55, amountDeviation: 80, circularMatch: 60, geoJump: 30 },
    xaiExplanation: 'Flagged 65/100: Wire transfer flagged for high-value structuring pattern. Amount Rs 9,50,000 split into 3 near-equal transfers across 12 minutes. Velocity score elevated. AI confidence: 98.2%',
    frozen: false,
    sarDownloaded: false
  },
  /* 14 — SAFE small */
  {
    id: 'TXN-20260014',
    sender: 'USR-4455',
    receiver: 'USR-6677',
    amount: 2500,
    mode: 'UPI',
    location: 'Chennai',
    timestamp: minsAgo(22),
    riskScore: 11,
    status: 'SAFE',
    classification: 'Normal Transaction',
    features: { velocity: 9, amountDeviation: 10, circularMatch: 3, geoJump: 5 },
    xaiExplanation: 'Transaction appears normal. Risk score: 11/100. Small UPI payment consistent with retail transaction patterns.',
    frozen: false,
    sarDownloaded: false
  },
  /* 15 — SAFE credit card retail */
  {
    id: 'TXN-20260015',
    sender: 'USR-7711',
    receiver: 'USR-3366',
    amount: 18500,
    mode: 'Credit Card',
    location: 'Hyderabad',
    timestamp: minsAgo(24),
    riskScore: 15,
    status: 'SAFE',
    classification: 'Normal Transaction',
    features: { velocity: 12, amountDeviation: 18, circularMatch: 4, geoJump: 7 },
    xaiExplanation: 'Transaction appears normal. Risk score: 15/100. Credit card spend within typical retail band. Location consistent with cardholder home city.',
    frozen: false,
    sarDownloaded: false
  },
  /* 16 — SUSPICIOUS circular partial */
  {
    id: 'TXN-20260016',
    sender: 'USR-9981',
    receiver: 'USR-5571',
    amount: 265000,
    mode: 'IMPS',
    location: 'Delhi',
    timestamp: minsAgo(26),
    riskScore: 68,
    status: 'SUSPICIOUS',
    classification: 'Circular Money Laundering',
    features: { velocity: 65, amountDeviation: 70, circularMatch: 88, geoJump: 20 },
    xaiExplanation: 'Flagged 68/100: Circular money laundering pattern — USR-9981 -> USR-5571 edge detected as part of multi-hop network. High network graph match score (88/100). Recommend investigation.',
    frozen: false,
    sarDownloaded: false
  },
  /* 17 — SAFE NEFT medium */
  {
    id: 'TXN-20260017',
    sender: 'USR-2288',
    receiver: 'USR-8844',
    amount: 450000,
    mode: 'NEFT',
    location: 'Kolkata',
    timestamp: minsAgo(28),
    riskScore: 20,
    status: 'SAFE',
    classification: 'Normal Transaction',
    features: { velocity: 10, amountDeviation: 28, circularMatch: 8, geoJump: 5 },
    xaiExplanation: 'Transaction appears normal. Risk score: 20/100. NEFT payment consistent with business-to-business transfer. No anomalous patterns.',
    frozen: false,
    sarDownloaded: false
  },
  /* 18 — SAFE UPI everyday */
  {
    id: 'TXN-20260018',
    sender: 'USR-6644',
    receiver: 'USR-1133',
    amount: 1200,
    mode: 'UPI',
    location: 'Ahmedabad',
    timestamp: minsAgo(30),
    riskScore: 7,
    status: 'SAFE',
    classification: 'Normal Transaction',
    features: { velocity: 5, amountDeviation: 6, circularMatch: 2, geoJump: 2 },
    xaiExplanation: 'Transaction appears normal. Risk score: 7/100. Everyday micro-payment. No anomalous patterns detected.',
    frozen: false,
    sarDownloaded: false
  }
];

let filteredTransactions = [...transactions];
let isLiveStream = true;
let selectedTx = null;
let streamInterval = null;
let activeFilter = 'all';
let kpiData = { volume: 0, scanned: 0, critical: 0, aml: 0 };
let riskHistory = transactions.map(t => t.riskScore);
let categoryData = { normal: 0, anomaly: 0, smurfing: 0, circular: 0 };
let frozenAccounts = new Set();
let amlGraph = { nodes: [], edges: [] };
let riskTrendChart = null;
let categoryDonutChart = null;
let animFrameId = null;
let cycleAnimating = false;

const INDIAN_CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'];
const MODES = ['UPI', 'IMPS', 'NEFT', 'Credit Card', 'Wire Transfer'];
const MAX_TRANSACTIONS = 50;

// ─────────────────────────────────────────────
// SECTION 2 — UTILITY FUNCTIONS
// ─────────────────────────────────────────────

function generateTxId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'TXN-';
  for (let i = 0; i < 8; i++) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function generateUserId() {
  return 'USR-' + String(Math.floor(1000 + Math.random() * 9000));
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatCurrency(n) {
  if (typeof n !== 'number') return 'Rs 0';
  const absN = Math.abs(n);
  let formatted;
  if (absN >= 10000000) {
    formatted = (absN / 10000000).toFixed(2).replace(/\.?0+$/, '') + ' Cr';
  } else if (absN >= 100000) {
    formatted = (absN / 100000).toFixed(2).replace(/\.?0+$/, '') + ' L';
  } else {
    // Indian number system: last 3 digits, then groups of 2
    const str = String(Math.round(absN));
    if (str.length <= 3) {
      formatted = str;
    } else {
      const last3 = str.slice(-3);
      const rest = str.slice(0, -3);
      const restFormatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
      formatted = restFormatted + ',' + last3;
    }
  }
  return 'Rs ' + formatted;
}

function formatTimestamp(iso) {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return diffMins + ' min' + (diffMins > 1 ? 's' : '') + ' ago';
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return h + ':' + m + ':' + s;
}

function getStatusClass(status) {
  if (status === 'CRITICAL') return 'critical';
  if (status === 'SUSPICIOUS') return 'suspicious';
  return 'safe';
}

function getRiskColor(score) {
  if (score <= 50) {
    const r = Math.round(16 + (243 - 16) * (score / 50));
    const g = Math.round(185 - (185 - 158) * (score / 50));
    const b = Math.round(129 - (129 - 11) * (score / 50));
    return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
  } else {
    const t = (score - 50) / 50;
    const r = Math.round(243 + (239 - 243) * t);
    const g = Math.round(158 - (158 - 68) * t);
    const b = Math.round(11 + (68 - 11) * t);
    return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
  }
}

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h) % 6; // 0-5
}

function computeKPIs() {
  // STRICT RULE: KPIs ALWAYS calculate from the master `transactions` array,
  // NEVER from `filteredTransactions`, and values are NEVER allowed to be negative.
  let volume = 0, critical = 0, aml = 0;
  transactions.forEach(t => {
    const amt = typeof t.amount === 'number' && !isNaN(t.amount) ? Math.max(0, t.amount) : 0;
    volume += amt;
    if (t.status === 'CRITICAL') critical++;
    const cls = t.classification || '';
    if (cls === 'AML Smurfing/Splitting' || cls === 'Circular Money Laundering' || cls.includes('AML') || cls.includes('Circular')) {
      aml++;
    }
  });

  kpiData = {
    volume: Math.max(0, volume),
    scanned: Math.max(0, transactions.length),
    critical: Math.max(0, critical),
    aml: Math.max(0, aml)
  };

  categoryData = { normal: 0, anomaly: 0, smurfing: 0, circular: 0 };
  transactions.forEach(t => {
    const cls = t.classification || '';
    if (cls === 'Normal Transaction') categoryData.normal++;
    else if (cls === 'Card/UPI Anomaly') categoryData.anomaly++;
    else if (cls === 'AML Smurfing/Splitting') categoryData.smurfing++;
    else if (cls === 'Circular Money Laundering') categoryData.circular++;
    else categoryData.normal++;
  });
}

function getModeIcon(mode) {
  const icons = {
    'UPI': '📱',
    'IMPS': '⚡',
    'NEFT': '🏦',
    'Credit Card': '💳',
    'Wire Transfer': '🌐'
  };
  return icons[mode] || '💰';
}

// ─────────────────────────────────────────────
// SECTION 3 — TRANSACTION FEED UI
// ─────────────────────────────────────────────

function renderTransactionCard(tx) {
  const statusClass = getStatusClass(tx.status);
  const riskColor = getRiskColor(tx.riskScore);
  const frozenBadge = tx.frozen
    ? '<span class="frozen-badge">❄️ FROZEN</span>'
    : '';
  const frozenClass = tx.frozen ? ' frozen' : '';

  return `
  <div class="tx-card${frozenClass}" data-txid="${tx.id}" style="border-left-color:${riskColor}">
    ${frozenBadge}
    <div class="tx-card-main">
      <div class="tx-card-left">
        <div class="tx-id">${tx.id}</div>
        <div class="tx-amount">${formatCurrency(tx.amount)}</div>
        <div class="tx-meta">${tx.mode} &bull; ${tx.location} &bull; ${formatTimestamp(tx.timestamp)}</div>
        <div class="tx-classification">${tx.classification}</div>
      </div>
      <div class="tx-card-right">
        <div class="risk-badge" style="background:${riskColor}22;color:${riskColor};border:1px solid ${riskColor}55">${tx.riskScore}</div>
        <div class="status-pill status-${statusClass}">${tx.status}</div>
        <div class="mode-icon">${getModeIcon(tx.mode)}</div>
      </div>
    </div>
    <div class="tx-flow">${tx.sender} → ${tx.receiver}</div>
  </div>`;
}

function renderFeed() {
  const container = document.getElementById('transactionFeed');
  const countBadge = document.getElementById('txFeedCount');
  if (countBadge) {
    countBadge.textContent = filteredTransactions.length;
  }
  if (!container) return;
  if (filteredTransactions.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div style="font-size:2rem;margin-bottom:0.5rem;">🔍</div>
        <div>No transactions match your filter</div>
      </div>`;
    return;
  }
  const sorted = [...filteredTransactions].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  container.innerHTML = sorted.map(renderTransactionCard).join('');
  attachTxClickHandlers();
  if (selectedTx) highlightSelectedCard(selectedTx.id);
}

function attachTxClickHandlers() {
  document.querySelectorAll('.tx-card').forEach(card => {
    card.addEventListener('click', () => {
      selectTransaction(card.dataset.txid);
    });
  });
}

function highlightSelectedCard(txId) {
  document.querySelectorAll('.tx-card').forEach(c => c.classList.remove('selected'));
  const card = document.querySelector(`.tx-card[data-txid="${txId}"]`);
  if (card) card.classList.add('selected');
}

function selectTransaction(txId) {
  selectedTx = transactions.find(t => t.id === txId) || null;
  if (!selectedTx) return;
  highlightSelectedCard(txId);
  renderXAIPanel(selectedTx);
}

// ─────────────────────────────────────────────
// SECTION 4 — XAI PANEL
// ─────────────────────────────────────────────

function buildGaugeSVG(score) {
  const radius = 65;
  const cx = 80;
  const cy = 80;
  const circumference = 2 * Math.PI * radius; // ≈ 408.4
  const totalArc = circumference * 0.75;       // 306.3
  const gap = circumference - totalArc;        // 102.1
  const scoreArc = totalArc * (score / 100);
  const riskColor = getRiskColor(score);

  return `
  <svg viewBox="0 0 160 160" width="160" height="160" style="display:block;margin:auto">
    <!-- Background arc -->
    <circle
      cx="${cx}" cy="${cy}" r="${radius}"
      fill="none"
      stroke="rgba(255,255,255,0.08)"
      stroke-width="12"
      stroke-dasharray="${totalArc} ${gap}"
      stroke-linecap="round"
      transform="rotate(135, ${cx}, ${cy})"
    />
    <!-- Score arc -->
    <circle
      cx="${cx}" cy="${cy}" r="${radius}"
      fill="none"
      stroke="${riskColor}"
      stroke-width="12"
      stroke-dasharray="${scoreArc} ${circumference}"
      stroke-linecap="round"
      transform="rotate(135, ${cx}, ${cy})"
      style="filter:drop-shadow(0 0 6px ${riskColor}88);transition:stroke-dasharray 0.6s ease"
    />
    <!-- Score text -->
    <text x="${cx}" y="${cy - 6}" text-anchor="middle" fill="white" font-size="28" font-weight="700" font-family="Inter,sans-serif">${score}</text>
    <text x="${cx}" y="${cy + 14}" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="Inter,sans-serif">RISK SCORE</text>
  </svg>`;
}

function buildFeatureBar(label, value) {
  const color = getRiskColor(value);
  return `
  <div class="feature-bar-row">
    <div class="feature-bar-label">${label}</div>
    <div class="feature-bar-track">
      <div class="feature-bar-fill" style="width:${value}%;background:${color};box-shadow:0 0 8px ${color}66"></div>
    </div>
    <div class="feature-bar-pct" style="color:${color}">${value}%</div>
  </div>`;
}

function renderXAIPanel(tx) {
  const gauge = document.getElementById('riskGauge');
  const scoreDisplay = document.getElementById('riskScoreDisplay');
  const classification = document.getElementById('riskClassification');
  const features = document.getElementById('featureContributions');
  const explanation = document.getElementById('xaiExplanation');
  const details = document.getElementById('selectedTxDetails');
  const freezeBtn = document.getElementById('freezeBtn');
  const downloadSAR = document.getElementById('downloadSAR');

  if (!gauge) return;

  if (!tx) {
    gauge.innerHTML = buildGaugeSVG(0);
    if (scoreDisplay) scoreDisplay.textContent = '--';
    if (classification) { classification.textContent = 'No transaction selected'; classification.className = 'risk-classification'; }
    if (features) features.innerHTML = '<div class="xai-empty">Select a transaction to view feature analysis</div>';
    if (explanation) explanation.innerHTML = '<div class="xai-empty">AI explanation will appear here after selecting a transaction.</div>';
    if (details) details.innerHTML = '<div class="xai-empty">Transaction details will appear here.</div>';
    if (freezeBtn) { freezeBtn.textContent = 'Freeze Account'; freezeBtn.disabled = true; }
    if (downloadSAR) downloadSAR.disabled = true;
    return;
  }

  if (gauge) gauge.innerHTML = buildGaugeSVG(tx.riskScore);
  if (scoreDisplay) {
    scoreDisplay.textContent = tx.riskScore;
    scoreDisplay.style.color = getRiskColor(tx.riskScore);
  }
  if (classification) {
    classification.textContent = tx.classification;
    classification.className = 'risk-classification status-' + getStatusClass(tx.status);
  }

  if (features) {
    features.innerHTML = [
      buildFeatureBar('Transaction Velocity', tx.features.velocity),
      buildFeatureBar('Amount Deviation', tx.features.amountDeviation),
      buildFeatureBar('Network Graph Match', tx.features.circularMatch),
      buildFeatureBar('Geo-Location Jump', tx.features.geoJump)
    ].join('');
  }

  if (explanation) {
    explanation.innerHTML = `<p>${tx.xaiExplanation}</p>`;
  }

  if (details) {
    details.innerHTML = `
    <div class="tx-detail-grid">
      <div class="tx-detail-row"><span class="tx-detail-label">Transaction ID</span><span class="tx-detail-val">${tx.id}</span></div>
      <div class="tx-detail-row"><span class="tx-detail-label">Status</span><span class="tx-detail-val status-pill status-${getStatusClass(tx.status)}">${tx.status}</span></div>
      <div class="tx-detail-row"><span class="tx-detail-label">Sender</span><span class="tx-detail-val">${tx.sender}</span></div>
      <div class="tx-detail-row"><span class="tx-detail-label">Receiver</span><span class="tx-detail-val">${tx.receiver}</span></div>
      <div class="tx-detail-row"><span class="tx-detail-label">Amount</span><span class="tx-detail-val">${formatCurrency(tx.amount)}</span></div>
      <div class="tx-detail-row"><span class="tx-detail-label">Mode</span><span class="tx-detail-val">${tx.mode}</span></div>
      <div class="tx-detail-row"><span class="tx-detail-label">Location</span><span class="tx-detail-val">${tx.location}</span></div>
      <div class="tx-detail-row"><span class="tx-detail-label">Timestamp</span><span class="tx-detail-val">${new Date(tx.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span></div>
    </div>`;
  }

  if (freezeBtn) {
    freezeBtn.disabled = false;
    if (tx.frozen) {
      freezeBtn.textContent = '❄️ Account Frozen';
      freezeBtn.classList.add('btn-frozen');
    } else {
      freezeBtn.textContent = 'Freeze Account';
      freezeBtn.classList.remove('btn-frozen');
    }
    freezeBtn.onclick = handleFreezeAccount;
  }

  if (downloadSAR) {
    downloadSAR.disabled = false;
    downloadSAR.onclick = handleDownloadSAR;
  }
}

function handleFreezeAccount() {
  if (!selectedTx) return;
  frozenAccounts.add(selectedTx.sender);
  selectedTx.frozen = true;
  const btn = document.getElementById('freezeBtn');
  if (btn) { btn.textContent = '❄️ Account Frozen'; btn.classList.add('btn-frozen'); }
  renderFeed();
  highlightSelectedCard(selectedTx.id);
  showToast(`Account ${selectedTx.sender} has been frozen and flagged for review.`, 'warning');
}

function handleDownloadSAR() {
  if (!selectedTx) return;
  const tx = selectedTx;
  const now = new Date();
  const dateStr = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const ref = 'SAR-' + tx.id + '-' + String(Math.floor(1000 + Math.random() * 9000));

  const content = `SUSPICIOUS ACTIVITY REPORT (SAR)
Generated: ${dateStr}
System: FinGuard AI v2.0 — AML Command Center
Report Reference: ${ref}
Classification: CONFIDENTIAL

TRANSACTION DETAILS:
Transaction ID: ${tx.id}
Transaction Date: ${new Date(tx.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
Amount: ${formatCurrency(tx.amount)}
Payment Mode: ${tx.mode}
Originating Account: ${tx.sender}
Destination Account: ${tx.receiver}
Origination Location: ${tx.location}

AI RISK ASSESSMENT:
Risk Score: ${tx.riskScore}/100
Risk Classification: ${tx.classification}
AI Confidence: 98.2%

FEATURE ANALYSIS:
- Transaction Velocity Score: ${tx.features.velocity}/100
- Amount Deviation Score: ${tx.features.amountDeviation}/100
- Network Graph Match Score: ${tx.features.circularMatch}/100
- Geo-Location Jump Score: ${tx.features.geoJump}/100

AI EXPLANATION:
${tx.xaiExplanation}

RECOMMENDED ACTIONS:
1. Freeze originating account pending review
2. Notify compliance officer within 24 hours
3. File STR with Financial Intelligence Unit India (FIU-IND)
4. Preserve transaction logs for 5 years per PMLA 2002

DISCLAIMER:
This is a demonstration system. All data is 100% synthetic.
No real financial data or personal information is used.
`;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateTag = now.toISOString().slice(0, 10).replace(/-/g, '');
  a.href = url;
  a.download = `SAR_${tx.id}_${dateTag}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  tx.sarDownloaded = true;
  showToast(`SAR report downloaded: ${a.download}`, 'success');
}

// ─────────────────────────────────────────────
// SECTION 5 — AI RISK ENGINE
// ─────────────────────────────────────────────

function calculateRisk(params) {
  const { senderId = 'USR-0000', receiverId = 'USR-0000', amount = 0, mode = 'UPI', txCount = 1, pattern = 'Normal' } = params;

  let score = 0;
  let patternVelocityBonus = 0;

  // Pattern contribution (40 pts max)
  switch (pattern) {
    case 'Normal':               score += 0;  patternVelocityBonus = 0; break;
    case 'Split Below Rs50k':    score += 38; patternVelocityBonus = 20; break;
    case 'Circular Transfer':    score += 40; patternVelocityBonus = 15; break;
    case 'Foreign Midnight Spike': score += 35; patternVelocityBonus = 10; break;
    case 'High Velocity Burst':  score += 30; patternVelocityBonus = 25; break;
    default:                     score += 0;  patternVelocityBonus = 0;
  }

  // Transaction count contribution (25 pts max)
  if (txCount >= 15) score += 25;
  else if (txCount >= 10) score += 18;
  else if (txCount >= 5) score += 10;
  else if (txCount >= 3) score += 5;

  // Amount contribution (20 pts max)
  let amountScore = 0;
  if (amount >= 5000000) amountScore = 20;
  else if (amount >= 1000000) amountScore = 15;
  else if (amount >= 500000) amountScore = 10;
  else if (amount >= 100000 && mode === 'UPI') amountScore = 18;
  else if (amount >= 45000 && amount <= 49999) amountScore = 20;
  else amountScore = amount > 50000 ? 8 : 2;
  score += amountScore;

  // Mode contribution (15 pts max)
  if (mode === 'Wire Transfer' && amount >= 500000) score += 12;
  else if (mode === 'Credit Card' && txCount >= 5) score += 10;
  else if (mode === 'UPI' && txCount >= 10) score += 15;
  else score += 3;

  // Deterministic noise 0-5
  const hash = simpleHash(senderId + receiverId + String(amount));
  score += hash;

  score = Math.min(100, Math.round(score));

  // Classification
  let status, classification;
  if (score <= 39) {
    status = 'SAFE';
    classification = 'Normal Transaction';
  } else if (score <= 69) {
    status = 'SUSPICIOUS';
    if (pattern === 'Split Below Rs50k') classification = 'AML Smurfing/Splitting';
    else if (pattern === 'Circular Transfer') classification = 'Circular Money Laundering';
    else if (pattern === 'Foreign Midnight Spike') classification = 'Card/UPI Anomaly';
    else classification = 'Card/UPI Anomaly';
  } else {
    status = 'CRITICAL';
    if (pattern === 'Split Below Rs50k') classification = 'AML Smurfing/Splitting';
    else if (pattern === 'Circular Transfer') classification = 'Circular Money Laundering';
    else if (pattern === 'Foreign Midnight Spike') classification = 'Card/UPI Anomaly';
    else classification = 'Card/UPI Anomaly';
  }

  // Feature scores
  const velocityScore = Math.min(100, txCount * 6 + patternVelocityBonus);
  const amountDevScore = Math.min(100, amountScore * 5);
  const circularMatchScore = pattern === 'Circular Transfer'
    ? Math.min(100, 85 + hash)
    : pattern === 'Split Below Rs50k'
      ? Math.min(100, 70 + hash)
      : Math.round(hash * 0.5 * 10);
  const geoJumpScore = pattern === 'Foreign Midnight Spike'
    ? Math.min(100, 90 + hash)
    : pattern === 'High Velocity Burst'
      ? 40
      : hash * 3;

  // XAI explanation
  let xaiExplanation;
  switch (pattern) {
    case 'Split Below Rs50k':
      xaiExplanation = `Flagged ${score}/100: Structuring/Smurfing detected — multiple sub-threshold transfers detected. ${txCount} transactions in 10-minute window totaling ${formatCurrency(amount * txCount)}. Designed to evade Rs 50,000 reporting threshold. AI confidence: 98.2%`;
      break;
    case 'Circular Transfer':
      xaiExplanation = `Flagged ${score}/100: Circular money laundering pattern — ${senderId} -> intermediary -> ${receiverId} -> ${senderId} cycle detected. High network graph match score (${circularMatchScore}/100). Recommend immediate freeze and STR filing.`;
      break;
    case 'Foreign Midnight Spike':
      xaiExplanation = `Flagged ${score}/100: Geographic anomaly detected — transaction originated outside account's normal geographic profile. Midnight fraud window (high-risk time band). Geo-jump score: ${geoJumpScore}/100.`;
      break;
    case 'High Velocity Burst':
      xaiExplanation = `Flagged ${score}/100: Unusual transaction velocity — ${txCount} transactions in 10 minutes (normal: <3). Amount ${formatCurrency(amount)} via ${mode}. Possible account takeover or scripted fraud.`;
      break;
    default:
      xaiExplanation = `Transaction appears normal. Risk score: ${score}/100. No anomalous patterns detected. Amount within historical deviation. Geographic location consistent with account history.`;
  }

  return {
    riskScore: score,
    status,
    classification,
    features: {
      velocity: velocityScore,
      amountDeviation: amountDevScore,
      circularMatch: circularMatchScore,
      geoJump: geoJumpScore
    },
    xaiExplanation
  };
}

// ─────────────────────────────────────────────
// SECTION 6 — LIVE STREAM
// ─────────────────────────────────────────────

function startLiveStream() {
  if (streamInterval) clearInterval(streamInterval);
  streamInterval = setInterval(injectRandomTransaction, 3500);
}

function stopLiveStream() {
  clearInterval(streamInterval);
  streamInterval = null;
}

function injectRandomTransaction() {
  const roll = Math.random();
  let riskTier;
  if (roll < 0.70) riskTier = 'safe';
  else if (roll < 0.90) riskTier = 'suspicious';
  else riskTier = 'critical';

  const mode = getRandomElement(MODES);
  const city = getRandomElement(INDIAN_CITIES);
  const sender = generateUserId();
  const receiver = generateUserId();

  let amount, pattern, txCount;
  if (riskTier === 'safe') {
    amount = mode === 'UPI' ? Math.floor(500 + Math.random() * 24500)
      : mode === 'IMPS' ? Math.floor(1000 + Math.random() * 199000)
        : mode === 'NEFT' ? Math.floor(10000 + Math.random() * 490000)
          : mode === 'Credit Card' ? Math.floor(2000 + Math.random() * 148000)
            : Math.floor(50000 + Math.random() * 450000);
    pattern = 'Normal';
    txCount = Math.floor(1 + Math.random() * 2);
  } else if (riskTier === 'suspicious') {
    amount = mode === 'UPI' ? Math.floor(45000 + Math.random() * 4999)
      : Math.floor(80000 + Math.random() * 420000);
    pattern = getRandomElement(['Split Below Rs50k', 'High Velocity Burst', 'Foreign Midnight Spike']);
    txCount = Math.floor(5 + Math.random() * 7);
  } else {
    amount = Math.floor(100000 + Math.random() * 400000);
    pattern = getRandomElement(['Circular Transfer', 'Split Below Rs50k', 'High Velocity Burst']);
    txCount = Math.floor(10 + Math.random() * 10);
  }

  const result = calculateRisk({ senderId: sender, receiverId: receiver, amount, mode, txCount, pattern });

  const newTx = {
    id: generateTxId(),
    sender,
    receiver,
    amount,
    mode,
    location: city,
    timestamp: new Date().toISOString(),
    riskScore: result.riskScore,
    status: result.status,
    classification: result.classification,
    features: result.features,
    xaiExplanation: result.xaiExplanation,
    frozen: false,
    sarDownloaded: false
  };

  transactions.unshift(newTx);
  if (transactions.length > MAX_TRANSACTIONS) transactions.pop();

  riskHistory.push(newTx.riskScore);
  if (riskHistory.length > 30) riskHistory.shift();

  computeKPIs();
  applyFilters();
  updateKPIDisplay();
  updateCharts();

  if (newTx.riskScore >= 70) {
    showToast(`🚨 CRITICAL: ${newTx.id} — ${newTx.classification} detected! Risk: ${newTx.riskScore}/100`, 'error');
  }
}

function handleToggleStream() {
  isLiveStream = !isLiveStream;
  const btn = document.getElementById('toggleStream');
  if (isLiveStream) {
    startLiveStream();
    if (btn) btn.textContent = '⏸ Pause Stream';
    showToast('Live transaction stream resumed.', 'info');
  } else {
    stopLiveStream();
    if (btn) btn.textContent = '▶ Resume Stream';
    showToast('Live transaction stream paused.', 'info');
  }
}

// ─────────────────────────────────────────────
// SECTION 7 — INJECT BURST BUTTONS
// ─────────────────────────────────────────────

function injectFraudBurst() {
  const baseTime = Date.now();
  const smurfSender = 'USR-' + String(Math.floor(1000 + Math.random() * 9000));

  const fraudTxns = [
    {
      id: generateTxId(), sender: smurfSender, receiver: generateUserId(), amount: 49500,
      mode: 'UPI', location: 'Mumbai', timestamp: new Date(baseTime).toISOString(),
      riskScore: 93, status: 'CRITICAL', classification: 'AML Smurfing/Splitting',
      features: { velocity: 96, amountDeviation: 95, circularMatch: 72, geoJump: 15 },
      xaiExplanation: `Structuring/Smurfing detected — split transfer #1 of Rs 49,500 designed to evade Rs 50,000 reporting threshold. Part of burst injection. AI confidence: 98.2%`,
      frozen: false, sarDownloaded: false
    },
    {
      id: generateTxId(), sender: smurfSender, receiver: generateUserId(), amount: 49500,
      mode: 'UPI', location: 'Delhi', timestamp: new Date(baseTime + 180000).toISOString(),
      riskScore: 95, status: 'CRITICAL', classification: 'AML Smurfing/Splitting',
      features: { velocity: 98, amountDeviation: 95, circularMatch: 75, geoJump: 20 },
      xaiExplanation: `Structuring/Smurfing detected — split transfer #2 of Rs 49,500. Same sender ${smurfSender} escalating pattern. Velocity 4 txns/9min. AI confidence: 98.2%`,
      frozen: false, sarDownloaded: false
    },
    {
      id: generateTxId(), sender: smurfSender, receiver: generateUserId(), amount: 49500,
      mode: 'UPI', location: 'Bangalore', timestamp: new Date(baseTime + 360000).toISOString(),
      riskScore: 97, status: 'CRITICAL', classification: 'AML Smurfing/Splitting',
      features: { velocity: 100, amountDeviation: 96, circularMatch: 78, geoJump: 25 },
      xaiExplanation: `Structuring/Smurfing detected — split transfer #3 of Rs 49,500. Total Rs 1,48,500 moved in 3 hops. Threshold evasion confirmed. AI confidence: 98.2%`,
      frozen: false, sarDownloaded: false
    },
    {
      id: generateTxId(), sender: generateUserId(), receiver: generateUserId(), amount: 125000,
      mode: 'Credit Card', location: 'Hyderabad', timestamp: new Date(baseTime + 20000).toISOString(),
      riskScore: 88, status: 'CRITICAL', classification: 'Card/UPI Anomaly',
      features: { velocity: 72, amountDeviation: 88, circularMatch: 20, geoJump: 95 },
      xaiExplanation: `Critical card skimming detected: Rs 1,25,000 credit card charge from Hyderabad while account is Mumbai-based. Time 03:12 IST (deep midnight fraud window). Geo-jump score: 95/100. AI confidence: 98.2%`,
      frozen: false, sarDownloaded: false
    },
    {
      id: generateTxId(), sender: generateUserId(), receiver: generateUserId(), amount: 85000,
      mode: 'UPI', location: 'Chennai', timestamp: new Date(baseTime + 40000).toISOString(),
      riskScore: 61, status: 'SUSPICIOUS', classification: 'Card/UPI Anomaly',
      features: { velocity: 80, amountDeviation: 60, circularMatch: 25, geoJump: 40 },
      xaiExplanation: `Suspicious velocity spike: 12 UPI transactions in 10-minute window. Amount Rs 85,000 above typical UPI single-transfer limits. Possible scripted API fraud. AI confidence: 98.2%`,
      frozen: false, sarDownloaded: false
    }
  ];

  fraudTxns.forEach((tx, i) => {
    setTimeout(() => {
      transactions.unshift(tx);
      if (transactions.length > MAX_TRANSACTIONS) transactions.pop();
      riskHistory.push(tx.riskScore);
      if (riskHistory.length > 30) riskHistory.shift();
      computeKPIs();
      applyFilters();
      updateKPIDisplay();
      updateCharts();
    }, i * 500);
  });

  setTimeout(() => {
    showToast('💥 FRAUD BURST INJECTED — 5 high-risk transactions detected by AI', 'error');
  }, 2600);
}

function injectAMLRing() {
  const usrA = 'USR-5571';
  const usrB = 'USR-7742';
  const usrC = 'USR-9981';
  const usrD = 'USR-3302';
  const baseTime = Date.now();

  const ring = [
    { from: usrA, to: usrB, amount: 200000, mode: 'IMPS',          risk: 91, loc: 'Mumbai',    delay: 0 },
    { from: usrB, to: usrC, amount: 185000, mode: 'NEFT',          risk: 93, loc: 'Delhi',     delay: 400 },
    { from: usrC, to: usrD, amount: 170000, mode: 'Wire Transfer', risk: 94, loc: 'Bangalore', delay: 800 },
    { from: usrD, to: usrA, amount: 155000, mode: 'IMPS',          risk: 96, loc: 'Hyderabad', delay: 1200 }
  ];

  ring.forEach((hop, idx) => {
    setTimeout(() => {
      const tx = {
        id: generateTxId(),
        sender: hop.from,
        receiver: hop.to,
        amount: hop.amount,
        mode: hop.mode,
        location: hop.loc,
        timestamp: new Date(baseTime + hop.delay * 60).toISOString(),
        riskScore: hop.risk,
        status: 'CRITICAL',
        classification: 'Circular Money Laundering',
        features: {
          velocity: 80 + idx * 4,
          amountDeviation: 85 + idx * 2,
          circularMatch: 88 + idx * 3,
          geoJump: 20 + idx * 5
        },
        xaiExplanation: `Circular money laundering ring — Hop ${idx + 1}/4: ${hop.from} -> ${hop.to} (${formatCurrency(hop.amount)} via ${hop.mode}). ${usrA} -> ${usrB} -> ${usrC} -> ${usrD} -> ${usrA} 4-hop ring detected. Total Rs 7,10,000 laundered. AI confidence: 98.2%`,
        frozen: false,
        sarDownloaded: false
      };
      transactions.unshift(tx);
      if (transactions.length > MAX_TRANSACTIONS) transactions.pop();
      riskHistory.push(tx.riskScore);
      if (riskHistory.length > 30) riskHistory.shift();
      computeKPIs();
      applyFilters();
      updateKPIDisplay();
      updateCharts();

      // Ensure nodes and edges are flagged in amlGraph
      let nodeFrom = amlGraph.nodes.find(n => n.id === hop.from);
      if (nodeFrom) nodeFrom.flagged = true;
      else amlGraph.nodes.push({ id: hop.from, flagged: true });

      let nodeTo = amlGraph.nodes.find(n => n.id === hop.to);
      if (nodeTo) nodeTo.flagged = true;
      else amlGraph.nodes.push({ id: hop.to, flagged: true });

      let existingEdge = amlGraph.edges.find(e => e.from === hop.from && e.to === hop.to);
      if (existingEdge) {
        existingEdge.flagged = true;
      } else {
        amlGraph.edges.push({ from: hop.from, to: hop.to, flagged: true });
      }

      if (idx === 3) {
        setTimeout(() => {
          showToast('🔴 AML RING DETECTED — 4-hop circular laundering loop closed. Total Rs 7,10,000', 'error');
          runCycleDetection();
        }, 300);
      }
    }, hop.delay);
  });
}

// ─────────────────────────────────────────────
// SECTION 8 — AML NETWORK GRAPH (Canvas)
// ─────────────────────────────────────────────

function initAMLGraph() {
  amlGraph = {
    nodes: [
      { id: 'USR-5571', flagged: true },
      { id: 'USR-7742', flagged: true },
      { id: 'USR-9981', flagged: true },
      { id: 'USR-8841', flagged: true },
      { id: 'USR-3302', flagged: false },
      { id: 'USR-R2',   flagged: false },
      { id: 'USR-R3',   flagged: false },
      { id: 'USR-R4',   flagged: false },
      { id: 'USR-4421', flagged: false },
      { id: 'USR-1198', flagged: false }
    ],
    edges: [
      { from: 'USR-5571', to: 'USR-7742', flagged: true },
      { from: 'USR-7742', to: 'USR-9981', flagged: true },
      { from: 'USR-9981', to: 'USR-5571', flagged: true },
      { from: 'USR-8841', to: 'USR-3302', flagged: true },
      { from: 'USR-8841', to: 'USR-R2',   flagged: true },
      { from: 'USR-8841', to: 'USR-R3',   flagged: true },
      { from: 'USR-8841', to: 'USR-R4',   flagged: true },
      { from: 'USR-4421', to: 'USR-1198', flagged: false }
    ]
  };
}

function getNodePositions(canvas) {
  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;
  const cy = H / 2;

  return {
    'USR-5571': { x: cx - 80,  y: cy - 80 },
    'USR-7742': { x: cx + 100, y: cy - 45 },
    'USR-9981': { x: cx,       y: cy + 85 },
    'USR-8841': { x: 75,       y: cy - 15 },
    'USR-3302': { x: 75,       y: cy - 95 },
    'USR-R2':   { x: 75,       y: cy + 45 },
    'USR-R3':   { x: 160,      y: cy - 50 },
    'USR-R4':   { x: 160,      y: cy + 55 },
    'USR-4421': { x: W - 75,   y: cy - 45 },
    'USR-1198': { x: W - 75,   y: cy + 45 }
  };
}

let glowPhase = 0;
let cycleDetectTimeout = null;

function renderAMLGraph() {
  const canvas = document.getElementById('amlCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#0B1120';
  ctx.fillRect(0, 0, W, H);

  const positions = getNodePositions(canvas);
  glowPhase = (glowPhase + 0.04) % (Math.PI * 2);
  const glowPulse = 0.5 + 0.5 * Math.sin(glowPhase);

  // Draw edges
  amlGraph.edges.forEach(edge => {
    const from = positions[edge.from] || { x: W / 2 - 50, y: H / 2 };
    const to = positions[edge.to] || { x: W / 2 + 50, y: H / 2 };

    const midX = (from.x + to.x) / 2 + (to.y - from.y) * 0.2;
    const midY = (from.y + to.y) / 2 - (to.x - from.x) * 0.2;

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.quadraticCurveTo(midX, midY, to.x, to.y);

    if (edge.flagged) {
      const alpha = cycleAnimating ? (0.7 + 0.3 * glowPulse) : (0.5 + 0.3 * glowPulse);
      ctx.strokeStyle = `rgba(239,68,68,${alpha})`;
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = cycleAnimating ? 20 + 10 * glowPulse : 8 + 4 * glowPulse;
      ctx.shadowColor = '#EF4444';
    } else {
      ctx.strokeStyle = 'rgba(71, 85, 105, 0.75)';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 0;
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Arrowhead
    const t = 0.85;
    const ax = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * midX + t * t * to.x;
    const ay = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * midY + t * t * to.y;
    const dx = to.x - ax;
    const dy = to.y - ay;
    const angle = Math.atan2(dy, dx);
    const arrowLen = 10;
    ctx.beginPath();
    ctx.moveTo(to.x, to.y);
    ctx.lineTo(to.x - arrowLen * Math.cos(angle - 0.4), to.y - arrowLen * Math.sin(angle - 0.4));
    ctx.lineTo(to.x - arrowLen * Math.cos(angle + 0.4), to.y - arrowLen * Math.sin(angle + 0.4));
    ctx.closePath();
    ctx.fillStyle = edge.flagged ? '#EF4444' : '#64748B';
    ctx.fill();
  });

  // Draw nodes
  amlGraph.nodes.forEach(node => {
    const pos = positions[node.id] || { x: W / 2, y: H / 2 };

    const r = 22;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
    ctx.fillStyle = '#1E293B';
    ctx.fill();

    if (node.flagged) {
      const glow = cycleAnimating ? (0.7 + 0.3 * glowPulse) : (0.5 + 0.2 * glowPulse);
      ctx.strokeStyle = `rgba(239,68,68,${glow})`;
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = cycleAnimating ? 18 + 8 * glowPulse : 10 + 4 * glowPulse;
      ctx.shadowColor = '#EF4444';
    } else {
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(16, 185, 129, 0.4)';
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Label
    ctx.fillStyle = node.flagged ? '#FCA5A5' : '#6EE7B7';
    ctx.font = '8px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(node.id, pos.x, pos.y + r + 12);

    // Icon inside node
    ctx.fillStyle = node.flagged ? '#EF4444' : '#10B981';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(node.flagged ? '⚠' : '✓', pos.x, pos.y + 5);
  });

  // Cycle detect label banner
  if (cycleAnimating) {
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.fillStyle = `rgba(239,68,68,${0.8 + 0.2 * glowPulse})`;
    ctx.textAlign = 'center';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#EF4444';
    ctx.fillText('🔴 CIRCULAR LOOP DETECTED', W / 2, 22);
    ctx.shadowBlur = 0;
  }

  if (animFrameId) cancelAnimationFrame(animFrameId);
  animFrameId = requestAnimationFrame(renderAMLGraph);
}

function runCycleDetection() {
  cycleAnimating = true;

  // Re-flag circular laundering loop nodes
  const loopNodes = new Set(['USR-5571', 'USR-7742', 'USR-9981']);
  amlGraph.nodes.forEach(n => {
    if (loopNodes.has(n.id)) {
      n.flagged = true;
    }
  });

  // Re-flag circular loop edges
  amlGraph.edges.forEach(e => {
    if (
      (e.from === 'USR-5571' && e.to === 'USR-7742') ||
      (e.from === 'USR-7742' && e.to === 'USR-9981') ||
      (e.from === 'USR-9981' && e.to === 'USR-5571') ||
      (loopNodes.has(e.from) && loopNodes.has(e.to))
    ) {
      e.flagged = true;
    }
  });

  const container = document.getElementById('amlCanvas');
  if (container) {
    container.style.border = '2px solid #EF4444';
    container.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.45)';
  }

  showToast('🚨 Cycle Detection: Circular laundering ring detected between USR-5571 ➔ USR-7742 ➔ USR-9981', 'error');

  if (cycleDetectTimeout) clearTimeout(cycleDetectTimeout);
  cycleDetectTimeout = setTimeout(() => {
    cycleAnimating = false;
    if (container) {
      container.style.border = '';
      container.style.boxShadow = '';
    }
  }, 4000);
}

function resetGraph() {
  cycleAnimating = false;
  if (cycleDetectTimeout) {
    clearTimeout(cycleDetectTimeout);
    cycleDetectTimeout = null;
  }
  const canvas = document.getElementById('amlCanvas');
  if (canvas) {
    canvas.style.border = '';
    canvas.style.boxShadow = '';
  }

  // Clear all red circular laundering loops and restore all nodes and edges to calm, clean baseline state (all safe)
  amlGraph.nodes = [
    { id: 'USR-5571', flagged: false },
    { id: 'USR-7742', flagged: false },
    { id: 'USR-9981', flagged: false },
    { id: 'USR-8841', flagged: false },
    { id: 'USR-3302', flagged: false },
    { id: 'USR-R2',   flagged: false },
    { id: 'USR-R3',   flagged: false },
    { id: 'USR-R4',   flagged: false },
    { id: 'USR-4421', flagged: false },
    { id: 'USR-1198', flagged: false }
  ];

  amlGraph.edges = [
    { from: 'USR-5571', to: 'USR-7742', flagged: false },
    { from: 'USR-7742', to: 'USR-9981', flagged: false },
    { from: 'USR-9981', to: 'USR-5571', flagged: false },
    { from: 'USR-8841', to: 'USR-3302', flagged: false },
    { from: 'USR-8841', to: 'USR-R2',   flagged: false },
    { from: 'USR-8841', to: 'USR-R3',   flagged: false },
    { from: 'USR-8841', to: 'USR-R4',   flagged: false },
    { from: 'USR-4421', to: 'USR-1198', flagged: false }
  ];

  showToast('AML network reset: all nodes restored to safe baseline.', 'info');
}

// ─────────────────────────────────────────────
// SECTION 9 — CHART.JS CHARTS
// ─────────────────────────────────────────────

function initCharts() {
  initRiskTrendChart();
  initCategoryDonut();
}

function initRiskTrendChart() {
  const canvas = document.getElementById('riskTrendChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const labels = riskHistory.map((_, i) => 'T' + (i + 1));

  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, 'rgba(239,68,68,0.3)');
  gradient.addColorStop(0.5, 'rgba(245,158,11,0.15)');
  gradient.addColorStop(1, 'rgba(16,185,129,0.05)');

  riskTrendChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Risk Score',
        data: [...riskHistory],
        borderColor: '#6366F1',
        backgroundColor: gradient,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: riskHistory.map(s => getRiskColor(s)),
        pointBorderColor: 'transparent',
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 400 },
      scales: {
        x: {
          ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 10 } },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          min: 0,
          max: 100,
          ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 10 } },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15,23,42,0.95)',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          titleColor: '#fff',
          bodyColor: 'rgba(255,255,255,0.7)'
        }
      }
    }
  });
}

function initCategoryDonut() {
  const canvas = document.getElementById('categoryDonut');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const totalAlerts = categoryData.anomaly + categoryData.smurfing + categoryData.circular;

  // Center text plugin
  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw(chart) {
      const { width, height, ctx: c } = chart;
      c.save();
      const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0) - chart.data.datasets[0].data[0];
      c.font = 'bold 22px Inter, sans-serif';
      c.fillStyle = '#fff';
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText(String(total), width / 2, height / 2 - 10);
      c.font = '10px Inter, sans-serif';
      c.fillStyle = 'rgba(255,255,255,0.5)';
      c.fillText('ALERTS', width / 2, height / 2 + 10);
      c.restore();
    }
  };

  categoryDonutChart = new Chart(ctx, {
    type: 'doughnut',
    plugins: [centerTextPlugin],
    data: {
      labels: ['Normal', 'Card/UPI Anomaly', 'AML Smurfing', 'Circular ML'],
      datasets: [{
        data: [categoryData.normal, categoryData.anomaly, categoryData.smurfing, categoryData.circular],
        backgroundColor: ['#10B981', '#F59E0B', '#F97316', '#EF4444'],
        borderColor: ['#0B1120'],
        borderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      animation: { duration: 600 },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: 'rgba(255,255,255,0.6)',
            font: { size: 10 },
            padding: 10,
            boxWidth: 10
          }
        },
        tooltip: {
          backgroundColor: 'rgba(15,23,42,0.95)',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          titleColor: '#fff',
          bodyColor: 'rgba(255,255,255,0.7)'
        }
      }
    }
  });
}

function updateCharts() {
  if (riskTrendChart) {
    const labels = riskHistory.map((_, i) => 'T' + (i + 1));
    riskTrendChart.data.labels = labels;
    riskTrendChart.data.datasets[0].data = [...riskHistory];
    riskTrendChart.data.datasets[0].pointBackgroundColor = riskHistory.map(s => getRiskColor(s));
    riskTrendChart.update('none');
  }
  if (categoryDonutChart) {
    categoryDonutChart.data.datasets[0].data = [
      categoryData.normal,
      categoryData.anomaly,
      categoryData.smurfing,
      categoryData.circular
    ];
    categoryDonutChart.update('none');
  }
}

// ─────────────────────────────────────────────
// SECTION 10 — FILTERS & SEARCH
// ─────────────────────────────────────────────

function setActiveFilter(filter) {
  activeFilter = filter;
  ['filterAll', 'filterCritical', 'filterAML', 'filterSafe'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.classList.remove('active');
  });
  const activeId = { all: 'filterAll', critical: 'filterCritical', aml: 'filterAML', safe: 'filterSafe' }[filter];
  const activeBtn = document.getElementById(activeId);
  if (activeBtn) activeBtn.classList.add('active');
}

function applyFilters() {
  const query = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();

  let base = [...transactions];

  if (activeFilter === 'critical') {
    base = base.filter(t => t.status === 'CRITICAL');
  } else if (activeFilter === 'aml') {
    base = base.filter(t => t.classification.includes('AML') || t.classification.includes('Circular'));
  } else if (activeFilter === 'safe') {
    base = base.filter(t => t.status === 'SAFE');
  }

  if (query) {
    base = base.filter(t =>
      t.id.toLowerCase().includes(query) ||
      t.sender.toLowerCase().includes(query) ||
      t.receiver.toLowerCase().includes(query) ||
      t.location.toLowerCase().includes(query)
    );
  }

  filteredTransactions = base;
  renderFeed();
  updateKPIDisplay();
}

// ─────────────────────────────────────────────
// SECTION 11 — KPI DISPLAY
// ─────────────────────────────────────────────

function formatVolume(rupees) {
  const safe = Math.max(0, typeof rupees === 'number' && !isNaN(rupees) ? rupees : 0);
  if (safe >= 1e7) return '₹' + (safe / 1e7).toFixed(2) + ' Cr';
  if (safe >= 1e5) return '₹' + (safe / 1e5).toFixed(2) + ' L';
  return formatCurrency(safe);
}

function updateKPIDisplay() {
  // Always compute metrics strictly from master transactions array
  computeKPIs();

  const volEl = document.getElementById('kpiVolume');
  const scanEl = document.getElementById('kpiScanned');
  const critEl = document.getElementById('kpiCritical');
  const amlEl = document.getElementById('kpiAML');
  const precEl = document.getElementById('kpiPrecision');

  if (volEl) volEl.textContent = formatVolume(kpiData.volume);
  if (scanEl) scanEl.textContent = String(Math.max(0, kpiData.scanned));
  if (critEl) critEl.textContent = String(Math.max(0, kpiData.critical));
  if (amlEl) amlEl.textContent = String(Math.max(0, kpiData.aml));
  if (precEl) precEl.textContent = '98.4%';
}

// ─────────────────────────────────────────────
// SECTION 12 — TOAST NOTIFICATIONS
// ─────────────────────────────────────────────

function ensureToastContainer() {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    document.body.appendChild(container);
  }
  return container;
}

function showToast(message, type = 'info') {
  const container = ensureToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${{ success: '✅', warning: '⚠️', error: '🚨', info: 'ℹ️' }[type] || 'ℹ️'}</span>
    <span class="toast-msg">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">×</button>
  `;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('toast-show'));
  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// ─────────────────────────────────────────────
// SECTION 13 — CLOCK
// ─────────────────────────────────────────────

function updateClock() {
  const el = document.getElementById('currentTime');
  if (!el) return;
  const now = new Date();
  const options = {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  const parts = new Intl.DateTimeFormat('en-IN', options).formatToParts(now);
  const get = type => parts.find(p => p.type === type)?.value || '';
  el.textContent = `${get('day')} ${get('month')} ${get('year')}, ${get('hour')}:${get('minute')}:${get('second')} IST`;
}

// ─────────────────────────────────────────────
// SECTION 5b — SIMULATOR SUBMIT HANDLER
// ─────────────────────────────────────────────

function handleSimulatorSubmit(e) {
  e.preventDefault();
  const form = e.target;

  const senderId = (form.querySelector('[name="simSenderId"]') || form.querySelector('[name="senderId"]') || form.querySelector('#simSender'))?.value.trim() || generateUserId();
  const receiverId = (form.querySelector('[name="simReceiverId"]') || form.querySelector('[name="receiverId"]') || form.querySelector('#simReceiver'))?.value.trim() || generateUserId();
  const amount = parseFloat((form.querySelector('[name="simAmount"]') || form.querySelector('[name="amount"]') || form.querySelector('#simAmount'))?.value) || 10000;
  const mode = (form.querySelector('[name="simPaymentMode"]') || form.querySelector('[name="mode"]') || form.querySelector('#simMode'))?.value || 'UPI';
  const txCount = parseInt((form.querySelector('[name="simVelocity"]') || form.querySelector('[name="txCount"]') || form.querySelector('#simTxCount'))?.value) || 1;
  const pattern = (form.querySelector('[name="simPattern"]') || form.querySelector('[name="pattern"]') || form.querySelector('#simPattern'))?.value || 'Normal';

  const result = calculateRisk({ senderId, receiverId, amount, mode, txCount, pattern });

  const newTx = {
    id: generateTxId(),
    sender: senderId,
    receiver: receiverId,
    amount,
    mode,
    location: getRandomElement(INDIAN_CITIES),
    timestamp: new Date().toISOString(),
    riskScore: result.riskScore,
    status: result.status,
    classification: result.classification,
    features: result.features,
    xaiExplanation: result.xaiExplanation,
    frozen: false,
    sarDownloaded: false
  };

  transactions.unshift(newTx);
  if (transactions.length > MAX_TRANSACTIONS) transactions.pop();

  riskHistory.push(newTx.riskScore);
  if (riskHistory.length > 30) riskHistory.shift();

  computeKPIs();
  applyFilters();
  updateKPIDisplay();
  updateCharts();

  // Show results
  const resultsEl = document.getElementById('simulatorResults');
  if (resultsEl) {
    const riskColor = getRiskColor(result.riskScore);
    resultsEl.style.display = 'block';
    resultsEl.innerHTML = `
    <div class="sim-result-card" style="border-left:4px solid ${riskColor}">
      <div class="sim-result-header">
        <div class="sim-result-score" style="color:${riskColor}">${result.riskScore}<span>/100</span></div>
        <div>
          <div class="status-pill status-${getStatusClass(result.status)}">${result.status}</div>
          <div style="color:rgba(255,255,255,0.6);font-size:0.8rem;margin-top:4px">${result.classification}</div>
        </div>
      </div>
      <div class="sim-result-gauge">${buildGaugeSVG(result.riskScore)}</div>
      <div class="sim-result-explanation">${result.xaiExplanation}</div>
      <div class="sim-result-features">
        ${buildFeatureBar('Transaction Velocity', result.features.velocity)}
        ${buildFeatureBar('Amount Deviation', result.features.amountDeviation)}
        ${buildFeatureBar('Network Graph Match', result.features.circularMatch)}
        ${buildFeatureBar('Geo-Location Jump', result.features.geoJump)}
      </div>
    </div>`;
    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Auto-select in XAI panel
  setTimeout(() => {
    selectTransaction(newTx.id);
    const feed = document.getElementById('transactionFeed');
    if (feed) feed.scrollTop = 0;
  }, 100);

  showToast(`AI analyzed ${newTx.id}: Risk ${result.riskScore}/100 — ${result.status}`, result.status === 'CRITICAL' ? 'error' : result.status === 'SUSPICIOUS' ? 'warning' : 'success');
}

// ─────────────────────────────────────────────
// SECTION 14 — INIT
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  computeKPIs();
  renderFeed();
  renderXAIPanel(null);
  initCharts();
  initAMLGraph();
  renderAMLGraph();
  startLiveStream();
  updateKPIDisplay();
  updateClock();
  setInterval(updateClock, 1000);
  setActiveFilter('all');

  // Event listeners
  const toggleStream = document.getElementById('toggleStream');
  if (toggleStream) toggleStream.addEventListener('click', handleToggleStream);

  const injectFraudBtn = document.getElementById('injectFraud');
  if (injectFraudBtn) injectFraudBtn.addEventListener('click', injectFraudBurst);

  const injectAMLBtn = document.getElementById('injectAML');
  if (injectAMLBtn) injectAMLBtn.addEventListener('click', injectAMLRing);

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.addEventListener('input', applyFilters);

  const filterAll = document.getElementById('filterAll');
  if (filterAll) filterAll.addEventListener('click', () => { setActiveFilter('all'); applyFilters(); });

  const filterCritical = document.getElementById('filterCritical');
  if (filterCritical) filterCritical.addEventListener('click', () => { setActiveFilter('critical'); applyFilters(); });

  const filterAML = document.getElementById('filterAML');
  if (filterAML) filterAML.addEventListener('click', () => { setActiveFilter('aml'); applyFilters(); });

  const filterSafe = document.getElementById('filterSafe');
  if (filterSafe) filterSafe.addEventListener('click', () => { setActiveFilter('safe'); applyFilters(); });

  const simForm = document.getElementById('simulatorForm');
  if (simForm) simForm.addEventListener('submit', handleSimulatorSubmit);

  const runCycle = document.getElementById('runCycleDetect');
  if (runCycle) runCycle.addEventListener('click', runCycleDetection);

  const resetGraphBtn = document.getElementById('resetGraph');
  if (resetGraphBtn) resetGraphBtn.addEventListener('click', resetGraph);

  const freezeBtn = document.getElementById('freezeBtn');
  if (freezeBtn) freezeBtn.addEventListener('click', handleFreezeAccount);

  const downloadSAR = document.getElementById('downloadSAR');
  if (downloadSAR) downloadSAR.addEventListener('click', handleDownloadSAR);

  showToast('FinGuard AI initialized — monitoring active across all payment channels.', 'success');
});
