/**
 * FinGuard AI - Automated Unit & Integration Test Suite
 * Validates Fraud Detection, AML Smurfing Thresholds, Circular Loop Detection, and SAR Generation.
 */

const assert = (condition, message) => {
  if (!condition) throw new Error(`Assertion Failed: ${message}`);
  console.log(`PASS: ${message}`);
};

function evaluateTransactionRisk({ amount, velocity10m, isCircular, geoJump, mode }) {
  let score = 10;
  const reasons = [];

  if (amount >= 45000 && amount < 50000) {
    score += 35;
    reasons.push("Structuring/Smurfing just below ₹50,000 KYC threshold");
  } else if (amount >= 200000) {
    score += 25;
    reasons.push("High-value capital transfer anomaly");
  }

  if (velocity10m >= 4) {
    score += 30;
    reasons.push(`High velocity burst (${velocity10m} tx in 10 mins)`);
  }

  if (isCircular) {
    score += 35;
    reasons.push("Circular money-laundering topology detected (A -> B -> C -> A)");
  }

  if (geoJump) {
    score += 20;
    reasons.push("Impossible geographic location jump");
  }

  if (mode === "Wire" || mode === "NEFT") {
    score += 5;
  }

  score = Math.min(100, Math.max(0, score));
  const status = score >= 70 ? "CRITICAL" : score >= 40 ? "SUSPICIOUS" : "SAFE";
  return { score, status, reasons };
}

function detectCircularCycle(edges) {
  const adj = {};
  edges.forEach(([u, v]) => {
    if (!adj[u]) adj[u] = [];
    adj[u].push(v);
  });

  const visited = new Set();
  const stack = new Set();

  function dfs(node) {
    visited.add(node);
    stack.add(node);
    for (const neighbor of adj[node] || []) {
      if (!visited.has(neighbor) && dfs(neighbor)) return true;
      if (stack.has(neighbor)) return true;
    }
    stack.delete(node);
    return false;
  }

  return Object.keys(adj).some((node) => !visited.has(node) && dfs(node));
}

function generateSARPayload(tx) {
  if (!tx || !tx.id) throw new Error("Invalid transaction for SAR export");
  return JSON.stringify({
    reportType: "SUSPICIOUS_ACTIVITY_REPORT",
    complianceStandard: "FIU-IND / PMLA",
    transactionId: tx.id,
    riskScore: tx.score,
    classification: tx.status,
    timestamp: new Date().toISOString()
  });
}

// Execute Test Suite
function runAllTests() {
  console.log("=== Running FinGuard AI Verification Suite ===");

  // Test 1: Normal baseline transaction
  const t1 = evaluateTransactionRisk({ amount: 1200, velocity10m: 1, isCircular: false, geoJump: false, mode: "UPI" });
  assert(t1.status === "SAFE" && t1.score < 40, "Normal UPI transfer classified as SAFE");

  // Test 2: Smurfing / Structuring below ₹50k
  const t2 = evaluateTransactionRisk({ amount: 49500, velocity10m: 5, isCircular: false, geoJump: false, mode: "IMPS" });
  assert(t2.status === "CRITICAL" && t2.score >= 70, "₹49.5k high-velocity smurfing flagged as CRITICAL");

  // Test 3: Circular AML Ring Graph Detection
  const cycleFound = detectCircularCycle([
    ["USR-101", "USR-202"],
    ["USR-202", "USR-303"],
    ["USR-303", "USR-101"]
  ]);
  assert(cycleFound === true, "3-hop circular money laundering loop accurately detected");

  // Test 4: Acyclic normal transfers
  const noCycle = detectCircularCycle([
    ["USR-101", "USR-202"],
    ["USR-202", "USR-303"]
  ]);
  assert(noCycle === false, "Linear non-circular transfers do not trigger false AML positive");

  // Test 5: SAR Compliance Report Generation
  const sar = JSON.parse(generateSARPayload({ id: "TXN-9981", score: 94, status: "CRITICAL" }));
  assert(sar.reportType === "SUSPICIOUS_ACTIVITY_REPORT" && sar.transactionId === "TXN-9981", "Valid SAR compliance report generated");

  console.log("=== All 5 FinGuard AI Tests Passed (100%) ===");
}

runAllTests();
