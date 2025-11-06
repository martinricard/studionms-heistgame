/*/*

 * Studio NMS - Heist Game Demo * Studio NMS - Heist Game Demo

 * Standalone demo with simulated chat * Includes full game logic + fake Twitch chat simulator

 */ * Version 0.01 (Demo Build)

 */

// ===========================

// DEMO CONFIGURATION// DEMO CONFIGURATION

// ===========================const DEMO_CONFIG = {

const currencyName = 'Pixels';  minBet: 10, maxBet: 10000, heistDuration: 60, currencyName: 'Pixels', cooldownMinutes: 5,

const demoConfig = {  riskLevels: {

  minBet: 10,    low: { name: 'Bank Vault', successRate: 0.70, multiplierMin: 1.2, multiplierMax: 1.5 },

  maxBet: 10000,    medium: { name: 'Diamond Heist', successRate: 0.50, multiplierMin: 1.5, multiplierMax: 2.5 },

  heistDuration: 60, // seconds    high: { name: 'Casino Jackpot', successRate: 0.30, multiplierMin: 2.5, multiplierMax: 4.0 }

  lowSuccessRate: 0.70,  },

  lowMultiplierMin: 1.2,  fakeUsers: ['StreamerPro', 'GamerGirl23', 'LuckyViewer', 'HeistMaster', 'PixelHunter', 'ChatLurker', 'SubSquad', 'ModBoss', 'RaidLeader', 'EmoteSpammer', 'PointsKing', 'NewViewer42']

  lowMultiplierMax: 1.5,};

  mediumSuccessRate: 0.50,

  mediumMultiplierMin: 1.5,// HEIST GAME STATE

  mediumMultiplierMax: 2.5,let heistState = { active: false, participants: [], initiator: null, startTime: null, cooldowns: new Map(), globalCooldown: null, timerInterval: null, reminders: { sent30s: false, sent10s: false } };

  highSuccessRate: 0.30,let fakeUserPoints = new Map();

  highMultiplierMin: 2.5,

  highMultiplierMax: 4.0// FAKE CHAT SYSTEM

};function addChatMessage(username, message, type = 'user') {

  const chatEl = document.getElementById('fake-chat');

// ===========================  const msgEl = document.createElement('div');

// HEIST STATE  msgEl.className = `chat-message ${type}`;

// ===========================  if (type === 'user') msgEl.innerHTML = `<span class="chat-username">${username}:</span>${message}`;

let heistState = {  else if (type === 'bot') msgEl.innerHTML = `<span class="chat-username">🤖 HeistBot:</span>${message}`;

  active: false,  else msgEl.textContent = message;

  participants: [],  chatEl.appendChild(msgEl);

  startTime: null,  chatEl.scrollTop = chatEl.scrollHeight;

  timerInterval: null  while (chatEl.children.length > 50) chatEl.removeChild(chatEl.firstChild);

};}



// Mock user points (for demo)function updateDemoStatus(message) { document.getElementById('demo-status').textContent = message; }

let userPoints = {function showHeistStatus() { document.getElementById('heist-status')?.classList.remove('hidden'); }

  'Alice': 5000,function hideHeistStatus() { document.getElementById('heist-status')?.classList.add('hidden'); }

  'Bob': 3000,

  'Charlie': 10000,function updateTimer() {

  'TestUser': 2000  if (!heistState.active || !heistState.startTime) return;

};  const elapsed = Math.floor((Date.now() - heistState.startTime) / 1000);

  const remaining = Math.max(0, DEMO_CONFIG.heistDuration - elapsed);

// ===========================  const minutes = Math.floor(remaining / 60);

// UI UPDATE FUNCTIONS  const seconds = remaining % 60;

// ===========================  const timerEl = document.getElementById('heist-timer');

function showHeistStatus() {  if (timerEl) timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const statusEl = document.getElementById('heist-status');  if (remaining <= 30 && !heistState.reminders.sent30s) { heistState.reminders.sent30s = true; addChatMessage('', '⏰ 30 seconds remaining to join the heist!', 'bot'); }

  if (statusEl) {  if (remaining <= 10 && !heistState.reminders.sent10s) { heistState.reminders.sent10s = true; addChatMessage('', '⏰ Only 10 seconds left to join!', 'bot'); }

    statusEl.classList.remove('hidden');  if (remaining === 0 && heistState.timerInterval) { clearInterval(heistState.timerInterval); heistState.timerInterval = null; executeHeistInternal(); }

  }}

  updateDemoStatus();

}function updateParticipantDisplay() {

  const countEl = document.getElementById('participant-count');

function hideHeistStatus() {  const listEl = document.getElementById('participant-list');

  const statusEl = document.getElementById('heist-status');  if (countEl) countEl.textContent = `${heistState.participants.length} / 50`;

  if (statusEl) {  if (listEl) listEl.innerHTML = heistState.participants.map(p => `<div class="participant-item"><span class="participant-name">${p.username}</span><span class="participant-info"><span>${p.amount} ${DEMO_CONFIG.currencyName}</span><span class="risk-${p.risk}">${p.risk.toUpperCase()}</span></span></div>`).join('');

    statusEl.classList.add('hidden');}

  }

  updateDemoStatus();function getFakeUserPoints(username) { if (!fakeUserPoints.has(username)) fakeUserPoints.set(username, Math.floor(Math.random() * 4900) + 100); return fakeUserPoints.get(username); }

}function updateFakeUserPoints(username, amount) { fakeUserPoints.set(username, getFakeUserPoints(username) + amount); return true; }

function getRandom(min, max) { return Math.random() * (max - min) + min; }

function updateTimer() {function formatTime(seconds) { const minutes = Math.floor(seconds / 60); const secs = seconds % 60; return minutes > 0 ? `${minutes}m ${secs}s` : `${secs}s`; }

  if (!heistState.active || !heistState.startTime) return;function checkCooldown(username) { const lastHeist = heistState.cooldowns.get(username); if (!lastHeist) return { ready: true }; const timePassed = (Date.now() - lastHeist) / 1000; const cooldownSeconds = DEMO_CONFIG.cooldownMinutes * 60; return timePassed < cooldownSeconds ? { ready: false, remaining: Math.ceil(cooldownSeconds - timePassed) } : { ready: true }; }

  function setCooldown(username) { heistState.cooldowns.set(username, Date.now()); }

  const elapsed = Math.floor((Date.now() - heistState.startTime) / 1000);function checkGlobalCooldown() { if (!heistState.globalCooldown) return { ready: true, remaining: 0 }; const timePassed = Math.floor((Date.now() - heistState.globalCooldown) / 1000); const cooldownSeconds = DEMO_CONFIG.cooldownMinutes * 60; return timePassed < cooldownSeconds ? { ready: false, remaining: cooldownSeconds - timePassed } : { ready: true, remaining: 0 }; }

  const remaining = Math.max(0, demoConfig.heistDuration - elapsed);function setGlobalCooldown() { heistState.globalCooldown = Date.now(); }

  

  // Format as MM:SSfunction startHeist(initiator) {

  const minutes = Math.floor(remaining / 60);  if (heistState.active) { addChatMessage('', 'A heist is already in progress! Type !join [amount] [risk] to join.', 'bot'); return; }

  const seconds = remaining % 60;  const globalCooldown = checkGlobalCooldown();

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;  if (!globalCooldown.ready) { addChatMessage('', `A heist was recently completed! Wait ${formatTime(globalCooldown.remaining)} before starting another.`, 'bot'); return; }

    heistState.active = true; heistState.participants = []; heistState.initiator = initiator; heistState.startTime = Date.now(); heistState.reminders.sent30s = false; heistState.reminders.sent10s = false;

  const timerEl = document.getElementById('heist-timer');  showHeistStatus(); updateParticipantDisplay(); heistState.timerInterval = setInterval(updateTimer, 1000); updateTimer();

  if (timerEl) {  addChatMessage('', `🚨 Heist starting! Type !join [amount] [risk] to join! (${DEMO_CONFIG.heistDuration}s to join)`, 'bot');

    timerEl.textContent = formattedTime;  updateDemoStatus(`Heist started by ${initiator}! Waiting for participants...`);

  }}

  

  // Update demo displayfunction joinHeist(username, amount, risk) {

  document.getElementById('timer-display').textContent = formattedTime;  if (!heistState.active) { addChatMessage('', 'No heist is currently active! Wait for someone to start one with !heist', 'bot'); return; }

    if (heistState.participants.find(p => p.username === username)) return;

  if (remaining === 0 && heistState.timerInterval) {  const cooldown = checkCooldown(username);

    clearInterval(heistState.timerInterval);  if (!cooldown.ready) { addChatMessage('', `${username}, you must wait ${formatTime(cooldown.remaining)} before joining another heist!`, 'bot'); return; }

    heistState.timerInterval = null;  if (amount < DEMO_CONFIG.minBet || amount > DEMO_CONFIG.maxBet) { addChatMessage('', `Invalid amount! Min: ${DEMO_CONFIG.minBet}, Max: ${DEMO_CONFIG.maxBet}`, 'bot'); return; }

    executeHeist();  if (!DEMO_CONFIG.riskLevels[risk]) { addChatMessage('', 'Invalid risk level! Use: low, medium, or high', 'bot'); return; }

  }  const userPoints = getFakeUserPoints(username);

}  if (userPoints < amount) { addChatMessage('', `${username}, you don't have enough ${DEMO_CONFIG.currencyName}! (You have: ${userPoints})`, 'bot'); return; }

  updateFakeUserPoints(username, -amount);

function updateParticipantDisplay() {  heistState.participants.push({ username, amount, risk });

  const countEl = document.getElementById('participant-count-display');  updateParticipantDisplay();

  const listEl = document.getElementById('participant-list');  addChatMessage('', `✅ ${username} joined with ${amount} ${DEMO_CONFIG.currencyName} at ${risk} risk!`, 'bot');

    updateDemoStatus(`${heistState.participants.length} participants joined. Heist executes when timer reaches 0.`);

  if (countEl) {}

    countEl.textContent = `${heistState.participants.length} / 50`;

  }function executeHeistInternal() {

    if (!heistState.active) return;

  if (listEl) {  if (heistState.timerInterval) { clearInterval(heistState.timerInterval); heistState.timerInterval = null; }

    listEl.innerHTML = heistState.participants.map(p => `  if (heistState.participants.length === 0) { addChatMessage('', 'No one joined the heist!', 'bot'); heistState.active = false; heistState.initiator = null; hideHeistStatus(); updateDemoStatus('Heist ended - no participants.'); return; }

      <div class="participant-item">  let successCount = 0; const results = [];

        <span class="participant-name">${p.username}</span>  heistState.participants.forEach(participant => {

        <span class="participant-info">    const riskConfig = DEMO_CONFIG.riskLevels[participant.risk];

          <span>${p.amount} ${currencyName}</span>    const success = Math.random() < riskConfig.successRate;

          <span class="risk-${p.risk}">${p.risk.toUpperCase()}</span>    if (success) { const multiplier = getRandom(riskConfig.multiplierMin, riskConfig.multiplierMax); const winnings = Math.floor(participant.amount * multiplier); results.push({ username: participant.username, success: true, amount: winnings }); successCount++; }

        </span>    else results.push({ username: participant.username, success: false, amount: participant.amount });

      </div>  });

    `).join('');  results.forEach(result => { if (result.success) updateFakeUserPoints(result.username, result.amount); });

  }  addChatMessage('', `🎯 Heist complete! ${successCount}/${heistState.participants.length} succeeded!`, 'bot');

    setTimeout(() => { results.forEach((result, index) => { setTimeout(() => { if (result.success) addChatMessage('', `✅ ${result.username} succeeded and won ${result.amount} ${DEMO_CONFIG.currencyName}!`, 'bot'); else addChatMessage('', `❌ ${result.username} failed and lost ${result.amount} ${DEMO_CONFIG.currencyName}!`, 'bot'); }, index * 500); }); setTimeout(() => { hideHeistStatus(); updateDemoStatus(`Heist completed! ${successCount}/${results.length} succeeded. Ready for next heist.`); }, results.length * 500 + 1000); }, 1000);

  updateDemoStatus();  heistState.active = false; setGlobalCooldown(); heistState.participants.forEach(participant => setCooldown(participant.username)); heistState.participants = []; heistState.initiator = null;

}}



function updateDemoStatus() {function simulateStartHeist() { const randomUser = DEMO_CONFIG.fakeUsers[Math.floor(Math.random() * DEMO_CONFIG.fakeUsers.length)]; addChatMessage(randomUser, '!heist', 'user'); setTimeout(() => startHeist(randomUser), 100); }

  document.getElementById('status-text').textContent = heistState.active ? 'Heist Active' : 'Ready';function simulateJoinMultiple() {

  document.getElementById('participant-count').textContent = heistState.participants.length;  if (!heistState.active) { updateDemoStatus('⚠️ Start a heist first before adding participants!'); return; }

}  const usersToJoin = DEMO_CONFIG.fakeUsers.sort(() => Math.random() - 0.5).slice(0, 5);

  usersToJoin.forEach((user, index) => { setTimeout(() => { const amount = Math.floor(Math.random() * 900) + 100; const risks = ['low', 'medium', 'high']; const risk = risks[Math.floor(Math.random() * risks.length)]; addChatMessage(user, `!join ${amount} ${risk}`, 'user'); setTimeout(() => joinHeist(user, amount, risk), 100); }, index * 800); });

// ===========================}

// CHAT SIMULATION

// ===========================function executeHeist() { if (!heistState.active) { updateDemoStatus('⚠️ No active heist to execute!'); return; } if (heistState.participants.length === 0) { updateDemoStatus('⚠️ No participants have joined yet!'); return; } addChatMessage('', '⚡ Admin executed heist early!', 'system'); executeHeistInternal(); }

function logChatMessage(message, type = 'system') {

  const chatLog = document.getElementById('chat-log');function resetDemo() {

  const msgEl = document.createElement('div');  if (heistState.timerInterval) clearInterval(heistState.timerInterval);

  msgEl.className = `chat-message ${type}`;  heistState.active = false; heistState.participants = []; heistState.initiator = null; heistState.cooldowns.clear(); heistState.globalCooldown = null; heistState.reminders.sent30s = false; heistState.reminders.sent10s = false;

  msgEl.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;  fakeUserPoints.clear(); hideHeistStatus();

  chatLog.appendChild(msgEl);  document.getElementById('fake-chat').innerHTML = '<div class="chat-message system">Demo reset! Everything cleared.</div>';

  chatLog.scrollTop = chatLog.scrollHeight;  updateDemoStatus('Demo reset complete. Ready to start fresh!');

}}



// ===========================function runFullDemo() {

// UTILITY FUNCTIONS  resetDemo(); updateDemoStatus('🎬 Running full demo... Watch the magic happen!');

// ===========================  setTimeout(() => { addChatMessage('', '▶️ DEMO: Starting heist...', 'system'); simulateStartHeist(); }, 1000);

function getRandom(min, max) {  setTimeout(() => { addChatMessage('', '▶️ DEMO: Adding participants...', 'system'); simulateJoinMultiple(); }, 3000);

  return Math.random() * (max - min) + min;  setTimeout(() => { addChatMessage('', '▶️ DEMO: Executing heist...', 'system'); executeHeist(); }, 10000);

}}



function getRiskLevels() {function sendFakeMessage() {

  return {  const username = document.getElementById('fake-username').value.trim() || 'DemoUser';

    low: {  const message = document.getElementById('fake-message').value.trim();

      name: 'Bank Vault',  if (!message) return;

      successRate: demoConfig.lowSuccessRate,  addChatMessage(username, message, 'user');

      multiplierMin: demoConfig.lowMultiplierMin,  const messageLower = message.toLowerCase();

      multiplierMax: demoConfig.lowMultiplierMax  if (messageLower === '!heist') setTimeout(() => startHeist(username), 100);

    },  else if (messageLower.startsWith('!join ')) { const parts = messageLower.split(' '); const amount = parseInt(parts[1]); const risk = (parts[2] || 'low').toLowerCase(); if (isNaN(amount)) addChatMessage('', 'Invalid amount! Example: !join 100 medium', 'bot'); else setTimeout(() => joinHeist(username, amount, risk), 100); }

    medium: {  document.getElementById('fake-message').value = '';

      name: 'Diamond Heist',}

      successRate: demoConfig.mediumSuccessRate,

      multiplierMin: demoConfig.mediumMultiplierMin,document.addEventListener('DOMContentLoaded', () => {

      multiplierMax: demoConfig.mediumMultiplierMax  const messageInput = document.getElementById('fake-message');

    },  if (messageInput) messageInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendFakeMessage(); });

    high: {  addChatMessage('', '🎮 Demo system ready! Try the buttons above or type commands manually.', 'system');

      name: 'Casino Jackpot',  updateDemoStatus('Ready! Click "Full Demo" to see a complete heist workflow, or use individual controls.');

      successRate: demoConfig.highSuccessRate,});

      multiplierMin: demoConfig.highMultiplierMin,
      multiplierMax: demoConfig.highMultiplierMax
    }
  };
}

// ===========================
// HEIST LOGIC
// ===========================
function startHeist() {
  if (heistState.active) {
    logChatMessage('❌ A heist is already in progress!', 'system');
    return;
  }

  heistState.active = true;
  heistState.participants = [];
  heistState.startTime = Date.now();

  showHeistStatus();
  updateParticipantDisplay();
  
  heistState.timerInterval = setInterval(updateTimer, 1000);
  updateTimer();

  logChatMessage('🚨 Heist starting! Join with your bet and risk level!', 'system');
}

function joinHeist(username, amount, risk) {
  if (!heistState.active) {
    logChatMessage('❌ No heist is currently active!', 'system');
    return;
  }

  // Check if user already joined
  const alreadyJoined = heistState.participants.find(p => p.username === username);
  if (alreadyJoined) {
    logChatMessage(`❌ ${username} already joined this heist!`, 'system');
    return;
  }

  // Validate amount
  if (amount < demoConfig.minBet || amount > demoConfig.maxBet) {
    logChatMessage(`❌ Invalid amount! Min: ${demoConfig.minBet}, Max: ${demoConfig.maxBet}`, 'system');
    return;
  }

  // Validate risk level
  const riskLevels = getRiskLevels();
  if (!riskLevels[risk]) {
    logChatMessage('❌ Invalid risk level! Use: low, medium, or high', 'system');
    return;
  }

  // Check user points (mock)
  if (!userPoints[username]) {
    userPoints[username] = 5000; // Default for new users
  }

  if (userPoints[username] < amount) {
    logChatMessage(`❌ ${username}, you don't have enough ${currencyName}! (Have: ${userPoints[username]})`, 'system');
    return;
  }

  // Deduct points
  userPoints[username] -= amount;

  // Add to participants
  const participant = {
    username,
    amount,
    risk: risk || 'low'
  };
  
  heistState.participants.push(participant);
  updateParticipantDisplay();

  logChatMessage(`✅ ${username} joined with ${amount} ${currencyName} at ${risk} risk!`, 'user');
}

async function executeHeist() {
  if (!heistState.active) return;
  
  if (heistState.timerInterval) {
    clearInterval(heistState.timerInterval);
    heistState.timerInterval = null;
  }

  if (heistState.participants.length === 0) {
    logChatMessage('😔 No one joined the heist!', 'system');
    heistState.active = false;
    hideHeistStatus();
    return;
  }

  logChatMessage(`⚡ Executing heist with ${heistState.participants.length} participants...`, 'system');

  let successCount = 0;
  const results = [];
  const riskLevels = getRiskLevels();

  heistState.participants.forEach(participant => {
    const riskConfig = riskLevels[participant.risk];
    const success = Math.random() < riskConfig.successRate;

    if (success) {
      const multiplier = getRandom(riskConfig.multiplierMin, riskConfig.multiplierMax);
      const winnings = Math.floor(participant.amount * multiplier);
      
      results.push({
        username: participant.username,
        success: true,
        amount: winnings
      });
      
      // Add winnings to user balance
      if (!userPoints[participant.username]) userPoints[participant.username] = 0;
      userPoints[participant.username] += winnings;
      
      successCount++;
    } else {
      results.push({
        username: participant.username,
        success: false,
        amount: participant.amount
      });
    }
  });

  // Send results summary
  logChatMessage(`📊 Heist complete! ${successCount}/${heistState.participants.length} succeeded!`, 'system');

  // Send individual results with delay
  setTimeout(() => {
    results.forEach((result, index) => {
      setTimeout(() => {
        if (result.success) {
          logChatMessage(`✅ ${result.username} succeeded and won ${result.amount} ${currencyName}! (Balance: ${userPoints[result.username]})`, 'user');
        } else {
          logChatMessage(`❌ ${result.username} failed and lost ${result.amount} ${currencyName}! (Balance: ${userPoints[result.username]})`, 'user');
        }
      }, index * 500);
    });
    
    setTimeout(() => {
      hideHeistStatus();
      heistState.active = false;
      heistState.participants = [];
    }, results.length * 500 + 1000);
  }, 1000);
}

// ===========================
// DEMO CONTROL FUNCTIONS
// ===========================
function simulateHeistStart() {
  startHeist();
}

function simulateJoin(username, amount, risk) {
  // Ensure user has enough points for demo
  if (!userPoints[username] || userPoints[username] < amount) {
    userPoints[username] = amount * 3; // Give them enough for demo
  }
  joinHeist(username, amount, risk);
}

function customJoin() {
  const username = document.getElementById('username').value || 'TestUser';
  const amount = parseInt(document.getElementById('amount').value) || 150;
  const risk = document.getElementById('risk').value || 'medium';
  
  // Ensure user has enough points for demo
  if (!userPoints[username] || userPoints[username] < amount) {
    userPoints[username] = amount * 3;
  }
  
  joinHeist(username, amount, risk);
}

function skipToEnd() {
  if (!heistState.active) {
    logChatMessage('❌ No active heist to skip!', 'system');
    return;
  }
  
  if (heistState.timerInterval) {
    clearInterval(heistState.timerInterval);
    heistState.timerInterval = null;
  }
  
  logChatMessage('⏩ Skipping to heist execution...', 'system');
  executeHeist();
}

// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  logChatMessage('🎮 Heist Widget Demo initialized!', 'system');
  logChatMessage('Click "Start Heist" to begin, then add participants.', 'system');
  updateDemoStatus();
});
