// Logic engine to evaluate an individual's specific metrics
export function evaluateIndividualStatus(scores) {
  const productivityScore = (scores.prodQ1 + scores.prodQ2) / 2;
  const burnoutScore = (scores.burnQ1 + scores.burnQ2) / 2;
  const wlbScore = (scores.wlbQ1 + scores.wlbQ2) / 2;

  // Exact RAG grading rules for individual thresholds
  let burnoutStatus = 'GREEN';
  if (burnoutScore >= 4.0) burnoutStatus = 'RED';
  else if (burnoutScore >= 3.0) burnoutStatus = 'AMBER';

  let productivityStatus = 'GREEN';
  if (productivityScore <= 2.5) productivityStatus = 'RED';
  else if (productivityScore <= 3.5) productivityStatus = 'AMBER';

  let wlbStatus = 'GREEN';
  if (wlbScore <= 2.5) wlbStatus = 'RED';
  else if (wlbScore <= 3.5) wlbStatus = 'AMBER';

  return {
    productivityScore: parseFloat(productivityScore.toFixed(2)),
    burnoutScore: parseFloat(burnoutScore.toFixed(2)),
    wlbScore: parseFloat(wlbScore.toFixed(2)),
    burnoutStatus,
    productivityStatus,
    wlbStatus
  };
}

export function generatePersonalRecommendations(evaluatedData, userSelection) {
  const recommendations = [];

  if (evaluatedData.burnoutScore >= 3.5) {
    recommendations.push({
      id: "IND_REC_01",
      priority: "CRITICAL",
      type: "Burnout Strain Interventions",
      title: "Protect High-Focus Cognitive Blocks",
      description: "Your exhaustion metrics display structural indicators of virtual meeting and notification saturation. Turn off real-time system alerts (Slack, Teams, Email huddles) for a minimum of two 90-minute intervals daily to protect your energy."
    });
  }

  if (evaluatedData.wlbScore <= 3.0) {
    recommendations.push({
      id: "IND_REC_02",
      priority: "HIGH",
      type: "Boundary Strength Actions",
      title: "Establish a Strict Digital Sunset",
      description: "Your responses tracking family interference demonstrate boundary blending. Configure your professional communication tools to snooze notifications after standard business hours, and explicitly decline evening meeting invites."
    });
  }

  if (evaluatedData.productivityScore <= 3.5) {
    recommendations.push({
      id: "IND_REC_03",
      priority: "MEDIUM",
      type: "Task Performance Optimization",
      title: "Consolidate Disjointed App Context Switching",
      description: "If communication tools or context switching are impacting your focus, establish asynchronous update protocols with your manager (e.g., written end-of-day logs) rather than relying on back-to-back status check syncs."
    });
  }

  // Inject a personal action card matching what the user indicated they need help with
  if (userSelection) {
    recommendations.push({
      id: "IND_USER_WISH",
      priority: "PERSONAL WORKPLACE FIX",
      type: "Your Stated Improvement Area",
      title: `Action Path: Advocate for ${userSelection}`,
      description: `You indicated that incorporating '${userSelection}' would significantly improve your day-to-day workflow. Share these calculated diagnostic balance numbers with your manager to design healthier boundaries for your role.`
    });
  }

  return recommendations;
}
