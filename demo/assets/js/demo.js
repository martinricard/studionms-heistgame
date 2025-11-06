/*
 * Studio NMS - Heist Game DEMO VERSION
 * Standalone demo with fake chat simulator
 * For portfolio/demonstration purposes
 * 
 * This is a demo version that doesn't require StreamElements API
 * It uses simulated chat messages and fake user points
 */

// Demo-specific configuration
const DEMO_CONFIG = {
  fakeUsers: [
    { name: "Alice", points: 1000 },
    { name: "Bob", points: 800 },
    { name: "Charlie", points: 1200 },
    { name: "Diana", points: 500 },
    { name: "Eve", points: 2000 }
  ]
};

const fakeUserPoints = new Map();

// Fake chat log functions
function addChatMessage(username, message, type = 'normal') {
  const chatLog = document.getElementById('chat-log');
  if (!chatLog) return;
  
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${type}`;
  msgDiv.innerHTML = `<strong>${username}:</strong> ${message}`;
  chatLog.appendChild(msgDiv);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function initFakeChatLog() {
  const chatLog = document.getElementById('chat-log');
  if (chatLog) {
    chatLog.innerHTML = '<div class="chat-message system"><strong>System:</strong> Demo chat simulator ready</div>';
  }
}

function initFakeUsers() {
  DEMO_CONFIG.fakeUsers.forEach(user => {
    fakeUserPoints.set(user.name, user.points);
  });
}

function getFakePoints(username) {
  return fakeUserPoints.get(username) || 0;
}

function updateFakePoints(username, amount) {
  const current = getFakePoints(username);
  fakeUserPoints.set(username, current + amount);
}

// Simulation control functions
function simulateHeistStart() {
  if (heistState.active) {
    addChatMessage('System', 'A heist is already in progress!', 'error');
    return;
  }
  
  const initiator = DEMO_CONFIG.fakeUsers[0].name;
  addChatMessage(initiator, '!heist 100', 'command');
  setTimeout(() => {
    startHeist(initiator);
  }, 500);
}

function simulateJoin(username, amount, risk) {
  if (!heistState.active) {
    addChatMessage('System', 'No heist is currently active!', 'error');
    return;
  }
  
  const alreadyJoined = heistState.participants.some(p => p.username === username);
  if (alreadyJoined) {
    addChatMessage('System', `${username} has already joined this heist!`, 'error');
    return;
  }
  
  addChatMessage(username, `!joinheist ${amount} ${risk}`, 'command');
  setTimeout(() => {
    joinHeist(username, username.toLowerCase(), amount, risk);
  }, 500);
}

function simulateMultipleJoins() {
  if (!heistState.active) {
    addChatMessage('System', 'Start a heist first!', 'error');
    return;
  }
  
  const users = [
    { name: 'Bob', amount: 200, risk: 'medium' },
    { name: 'Charlie', amount: 150, risk: 'high' },
    { name: 'Diana', amount: 100, risk: 'low' }
  ];
  
  users.forEach((user, index) => {
    setTimeout(() => {
      simulateJoin(user.name, user.amount, user.risk);
    }, index * 1500);
  });
}

function skipToHeistEnd() {
  if (!heistState.active) {
    addChatMessage('System', 'No heist is currently active!', 'error');
    return;
  }
  
  if (heistState.timerInterval) {
    clearInterval(heistState.timerInterval);
  }
  
  addChatMessage('System', 'Skipping to heist execution...', 'system');
  setTimeout(() => {
    executeHeist();
  }, 1000);
}

// Alias for skipToHeistEnd (called from HTML)
function skipToEnd() {
  skipToHeistEnd();
}

function customJoin() {
  const username = document.getElementById('username').value;
  const amount = parseInt(document.getElementById('amount').value);
  const risk = document.getElementById('risk').value;
  
  if (!username || username.trim() === '') {
    addChatMessage('System', 'Please enter a username!', 'error');
    return;
  }
  
  if (isNaN(amount) || amount < 10) {
    addChatMessage('System', 'Amount must be at least 10!', 'error');
    return;
  }
  
  // Add user to fake users if they don't exist
  if (!fakeUserPoints.has(username)) {
    fakeUserPoints.set(username, 5000); // Give custom users 5000 points
  }
  
  simulateJoin(username, amount, risk);
}

function simulateRandomJoin() {
  if (!heistState.active) {
    addChatMessage('System', 'Start a heist first!', 'error');
    return;
  }
  
  const availableUsers = DEMO_CONFIG.fakeUsers.filter(user => 
    !heistState.participants.some(p => p.username === user.name)
  );
  
  if (availableUsers.length === 0) {
    addChatMessage('System', 'All users have already joined!', 'error');
    return;
  }
  
  const user = availableUsers[Math.floor(Math.random() * availableUsers.length)];
  const risks = ['low', 'medium', 'high'];
  const risk = risks[Math.floor(Math.random() * risks.length)];
  const amount = Math.floor(Math.random() * 300) + 50;
  
  simulateJoin(user.name, amount, risk);
}

// ===========================
// GLOBAL STATE & CONFIGURATION
// ===========================
let fieldData = {}; // Widget configuration from fields.json
let currencyName = 'points'; // Loyalty point name (fetched from SE API)
let isInitialized = false; // Prevent double initialization in editor mode
let eventListenerAttached = false; // Prevent duplicate event listeners



// Heist game state management
let heistState = {
  active: false, // Is a heist currently running
  participants: [], // Array of users who joined
  initiator: null, // Username of who started the heist
  startTime: null, // When the heist started (timestamp)
  cooldowns: new Map(), // Username -> timestamp cooldown tracker
  globalCooldown: null, // Global cooldown timestamp (prevents anyone from starting heists)
  timerInterval: null, // Countdown timer interval ID
  reminders: { // Reminder tracking
    sent30s: false,
    sent10s: false
  }
};

// ===========================
// UI UPDATE FUNCTIONS
// ===========================
function showHeistStatus() {
  // Only show visual if enabled in settings
  if (fieldData.showVisual === 'false') {
    return;
  }
  
  const statusEl = document.getElementById('heist-status');
  if (statusEl) {
    statusEl.classList.remove('hidden');
  }
}

function hideHeistStatus() {
  const statusEl = document.getElementById('heist-status');
  if (statusEl) {
    statusEl.classList.add('hidden');
  }
}

function updateTimer() {
  if (!heistState.active || !heistState.startTime) return;
  
  const duration = parseInt(fieldData.heistDuration || 60);
  const elapsed = Math.floor((Date.now() - heistState.startTime) / 1000);
  const remaining = Math.max(0, duration - elapsed);
  
  // Format as MM:SS
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  const timerEl = document.getElementById('heist-timer');
  if (timerEl) {
    timerEl.textContent = formattedTime;
  }
  
  // Send reminders if enabled
  if (fieldData.enableReminders === 'true') {
    // 30 second reminder - use <= to catch it even if we skip exactly 30
    if (fieldData.reminder30s === 'true' && remaining <= 30 && !heistState.reminders.sent30s) {
      console.log('[Heist Widget] ⏰ Triggering 30s reminder at', remaining, 'seconds');
      heistState.reminders.sent30s = true;
      if (fieldData.msgReminder30s) {
        sendChatMessage(fieldData.msgReminder30s);
      }
    }
    
    // 10 second reminder - use <= to catch it even if we skip exactly 10
    if (fieldData.reminder10s === 'true' && remaining <= 10 && !heistState.reminders.sent10s) {
      console.log('[Heist Widget] ⏰ Triggering 10s reminder at', remaining, 'seconds');
      heistState.reminders.sent10s = true;
      if (fieldData.msgReminder10s) {
        sendChatMessage(fieldData.msgReminder10s);
      }
    }
  }
  
  if (remaining === 0 && heistState.timerInterval) {
    clearInterval(heistState.timerInterval);
    heistState.timerInterval = null;
    // Execute the heist when timer reaches 0
    executeHeist();
  }
}

function updateParticipantDisplay() {
  const countEl = document.getElementById('participant-count');
  const listEl = document.getElementById('participant-list');
  
  if (countEl) {
    const count = heistState.participants.length;
    const maxParticipants = parseInt(fieldData.maxParticipants || 50);
    countEl.textContent = `${count} / ${maxParticipants}`;
  }
  
  if (listEl) {
    const displayCurrency = currencyName || 'points';
    listEl.innerHTML = heistState.participants.map(p => `
      <div class="participant-item">
        <span class="participant-name">${p.username}</span>
        <span class="participant-info">
          <span>${p.amount} ${displayCurrency}</span>
          <span class="risk-${p.risk}">${p.risk.toUpperCase()}</span>
        </span>
      </div>
    `).join('');
  }
}

// ===========================
// STREAMELEMENTS API INTEGRATION
// ===========================
const getLoyaltyCurrencyName = async () => {
  if (!fieldData.jwtToken || !fieldData.channelId) {
    console.warn('[Heist Widget] JWT token or Channel ID not configured');
    return null;
  }

  try {
    const response = await fetch(`https://api.streamelements.com/kappa/v2/loyalty/${fieldData.channelId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${fieldData.jwtToken}`
      }
    });

    if (!response.ok) {
      console.error('[Heist Widget] Failed to fetch loyalty settings. Status:', response.status);
      const errorText = await response.text();
      console.error('[Heist Widget] Error response:', errorText);
      return null;
    }

    const data = await response.json();
    console.log('[Heist Widget] Full Loyalty API response:', JSON.stringify(data, null, 2));
    
    // Try multiple possible paths where the currency name might be
    const currencyName = data.loyalty?.name || 
                        data.name || 
                        data.loyalty?.currency?.name ||
                        data.currency?.name ||
                        data.pointsName ||
                        null;
    
    console.log('[Heist Widget] Extracted currency name:', currencyName);
    return currencyName;
  } catch (error) {
    console.error('[Heist Widget] Error fetching loyalty settings:', error);
    return null;
  }
};

// ===========================
// CUSTOM STYLING APPLICATION
// ===========================
function applyCustomStyling() {
  // Load Google Font if specified
  if (fieldData.fontFamily) {
    const fontLink = document.getElementById('google-font-link');
    if (fontLink) {
      // Format font name for Google Fonts URL
      const fontName = fieldData.fontFamily.replace(/\s+/g, '+');
      // Load multiple weights for flexibility
      fontLink.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@100;200;300;400;500;600;700;800;900&display=swap`;
    }
  }
  
  // Apply CSS custom properties from field data
  const root = document.documentElement;
  
  // Font settings
  if (fieldData.fontFamily) {
    root.style.setProperty('--font-family', `'${fieldData.fontFamily}', 'Inter', 'Segoe UI', sans-serif`);
  }
  if (fieldData.fontWeight) {
    root.style.setProperty('--font-weight', fieldData.fontWeight);
  }
  if (fieldData.titleFontSize) {
    root.style.setProperty('--title-font-size', `${fieldData.titleFontSize}px`);
  }
  if (fieldData.timerFontSize) {
    root.style.setProperty('--timer-font-size', `${fieldData.timerFontSize}px`);
  }
  if (fieldData.participantFontSize) {
    root.style.setProperty('--participant-font-size', `${fieldData.participantFontSize}px`);
  }
  
  // Color settings
  if (fieldData.colorBackgroundDark) {
    root.style.setProperty('--bg-dark', fieldData.colorBackgroundDark);
  }
  if (fieldData.colorBackgroundLight) {
    root.style.setProperty('--bg-light', fieldData.colorBackgroundLight);
  }
  if (fieldData.colorTextPrimary) {
    root.style.setProperty('--text-primary', fieldData.colorTextPrimary);
  }
  if (fieldData.colorTextSecondary) {
    root.style.setProperty('--text-secondary', fieldData.colorTextSecondary);
  }
  if (fieldData.colorAccentBlue) {
    root.style.setProperty('--accent-blue', fieldData.colorAccentBlue);
  }
  if (fieldData.colorAccentPurple) {
    root.style.setProperty('--accent-purple', fieldData.colorAccentPurple);
  }
  if (fieldData.colorRiskLow) {
    root.style.setProperty('--accent-green', fieldData.colorRiskLow);
  }
  if (fieldData.colorRiskMedium) {
    root.style.setProperty('--accent-orange', fieldData.colorRiskMedium);
  }
  if (fieldData.colorRiskHigh) {
    root.style.setProperty('--accent-red', fieldData.colorRiskHigh);
  }
  if (fieldData.colorTimerBorder) {
    root.style.setProperty('--timer-border', fieldData.colorTimerBorder);
  }
  
  console.log('[Heist Widget] Custom styling applied');
}

// ===========================
// DEMO INITIALIZATION (No SE API)
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  // Prevent double initialization
  if (isInitialized) {
    console.log('[Demo] Already initialized');
    return;
  }
  isInitialized = true;
  
  // Mock fieldData for demo
  fieldData = {
    minBet: 10,
    joinDuration: 60,
    commandHeist: '!heist',
    commandJoin: '!joinheist',
    currencyName: 'points',
    riskLevels: {
      low: { successRate: 70, multiplier: 1.5 },
      medium: { successRate: 50, multiplier: 2.0 },
      high: { successRate: 30, multiplier: 3.0 }
    }
  };
  
  currencyName = 'points';
  
  console.log('[Demo] Initializing demo version...');
  console.log('[Demo] Min Bet:', fieldData.minBet);
  console.log('[Demo] Currency:', currencyName);
  
  // Initialize demo features
  initFakeUsers();
  initFakeChatLog();
  
  addChatMessage('System', '🎮 Demo loaded! Use the controls on the left to simulate a heist.', 'system');
  addChatMessage('System', `Available users: ${DEMO_CONFIG.fakeUsers.map(u => `${u.name} (${u.points} points)`).join(', ')}`, 'system');
  
  // Apply custom styling from fields
  applyCustomStyling();
  
  // Update widget title if customized
  const titleEl = document.querySelector('.heist-title');
  if (titleEl && fieldData.widgetTitle) {
    titleEl.textContent = fieldData.widgetTitle;
  }
  
  // Hide title if disabled
  if (fieldData.showWidgetTitle === 'false' && titleEl) {
    titleEl.style.display = 'none';
  }
  
  // Update widget icon if customized
  const iconEl = document.querySelector('.heist-icon');
  if (iconEl) {
    if (fieldData.widgetIcon === 'custom' && fieldData.customIconUrl) {
      iconEl.innerHTML = `<img src="${fieldData.customIconUrl}" alt="Heist Icon" />`;
    } else if (fieldData.widgetIcon) {
      iconEl.textContent = fieldData.widgetIcon;
    }
  }
  
  // Hide participant count if disabled
  if (fieldData.showParticipantCount === 'false') {
    const countEl = document.getElementById('participant-count');
    if (countEl) {
      countEl.classList.add('hidden');
    }
  }
  
  // Send welcome message if enabled
  if (fieldData.enableWelcome === 'true' && fieldData.msgWelcome) {
    sendChatMessage(fieldData.msgWelcome);
  }
});

// ===========================
// CHAT EVENT LISTENER
// ===========================
if (!eventListenerAttached) {
  eventListenerAttached = true;
  
  window.addEventListener('onEventReceived', function(obj) {
    if (!obj.detail) return;
    
    const { listener, event } = obj.detail;
    
    // Only process chat messages
    if (listener !== 'message') return;
    
    const username = event.data.displayName || event.data.username;
    const userId = event.data.userId;
    const message = (event.data.text || '').trim();
    const messageLower = message.toLowerCase();
    
    // Ignore messages from the bot itself (StreamElements bot name is usually "LePetit_Biscuit" or similar)
    // Also ignore if the message came from widget/bot
    if (event.data.nick && event.data.nick.toLowerCase() === 'lepetit_biscuit') {
      console.log('[Heist Widget] Ignoring bot message');
      return;
    }
    if (username && username.toLowerCase() === 'lepetit_biscuit') {
      console.log('[Heist Widget] Ignoring bot message');
      return;
    }
    
    console.log('[Heist Widget] Message from', username + ':', message);
    
    // Get command triggers
    const heistCommand = (fieldData.commandHeist || '!heist').toLowerCase();
    const joinCommand = (fieldData.commandJoin || '!join').toLowerCase();
    const cancelCommand = '!cancelheist';
    
    // Check for cancel command (mods/streamer only)
    if (messageLower === cancelCommand) {
      // Check if user is mod or broadcaster
      const isMod = event.data.badges && (event.data.badges.some(b => b.type === 'moderator' || b.type === 'broadcaster'));
      const isBroadcaster = event.data.displayName && event.data.displayName.toLowerCase() === fieldData.channelId?.toLowerCase();
      
      if (isMod || isBroadcaster) {
        cancelHeist(username);
      } else {
        sendChatMessage(`${username}, only moderators and the streamer can cancel a heist.`);
      }
      return;
    }
    
    // Check for heist start command
    if (messageLower === heistCommand) {
      startHeist(username);
      return;
    }
    
    // Check for join command (with or without parameters)
    if (messageLower === joinCommand || messageLower.startsWith(joinCommand + ' ')) {
      const parts = messageLower.split(' ');
      
      // Check if parameters provided
      if (parts.length < 2) {
        sendChatMessage(`${username}, usage: ${joinCommand} [amount] [risk]. Example: ${joinCommand} 100 medium`);
        return;
      }
      
      const amount = parseInt(parts[1]);
      const risk = (parts[2] || 'low').toLowerCase();
      
      // Validate amount is a number
      if (isNaN(amount) || amount <= 0) {
        sendChatMessage(`${username}, please provide a valid amount. Example: ${joinCommand} 100 medium`);
        return;
      }
      
      joinHeist(username, userId, amount, risk, event);
      return;
    }
  });
}

const getStreamElementsPoints = async (username) => {
  if (!fieldData.jwtToken || !fieldData.channelId) {
    console.warn('[Heist Widget] JWT token or Channel ID not configured');
    return null;
  }

  try {
    const response = await fetch(`https://api.streamelements.com/kappa/v2/points/${fieldData.channelId}/${username}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${fieldData.jwtToken}`
      }
    });

    if (!response.ok) {
      console.error('[Heist Widget] Failed to fetch points:', response.status);
      return null;
    }

    const data = await response.json();
    return data.points || 0;
  } catch (error) {
    console.error('[Heist Widget] Error fetching points:', error);
    return null;
  }
};

const updateStreamElementsPoints = async (username, amount) => {
  if (!fieldData.jwtToken || !fieldData.channelId) {
    console.warn('[Heist Widget] JWT token or Channel ID not configured');
    return false;
  }

  try {
    const response = await fetch(`https://api.streamelements.com/kappa/v2/points/${fieldData.channelId}/${username}/${amount}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${fieldData.jwtToken}`
      }
    });

    if (!response.ok) {
      console.error('[Heist Widget] Failed to update points:', response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error('[Heist Widget] Error updating points:', error);
    return false;
  }
};

// ===========================
// UTILITY FUNCTIONS
// ===========================
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return minutes > 0 ? `${minutes}m ${secs}s` : `${secs}s`;
}

function checkCooldown(username) {
  const lastHeist = heistState.cooldowns.get(username);
  if (!lastHeist) return { ready: true };
  
  const now = Date.now();
  const timePassed = (now - lastHeist) / 1000;
  const cooldownSeconds = parseInt(fieldData.cooldownMinutes || 5) * 60;
  
  if (timePassed < cooldownSeconds) {
    const remaining = cooldownSeconds - timePassed;
    return { ready: false, remaining: Math.ceil(remaining) };
  }
  
  return { ready: true };
}

function setCooldown(username) {
  heistState.cooldowns.set(username, Date.now());
}

function checkGlobalCooldown() {
  if (!heistState.globalCooldown) return { ready: true, remaining: 0 };

  const timePassed = Math.floor((Date.now() - heistState.globalCooldown) / 1000);
  const cooldownSeconds = parseInt(fieldData.cooldownMinutes || 5) * 60;

  if (timePassed < cooldownSeconds) {
    const remaining = cooldownSeconds - timePassed;
    return { ready: false, remaining };
  }

  return { ready: true, remaining: 0 };
}

function setGlobalCooldown() {
  heistState.globalCooldown = Date.now();
  console.log('[Heist Widget] Global cooldown set for', fieldData.cooldownMinutes || 5, 'minutes');
}

function getRiskLevels() {
  return {
    low: {
      name: fieldData.lowRiskName || 'Bank Vault',
      successRate: parseInt(fieldData.lowSuccessRate || 70) / 100,
      multiplierMin: parseFloat(fieldData.lowMultiplierMin || 1.2),
      multiplierMax: parseFloat(fieldData.lowMultiplierMax || 1.5)
    },
    medium: {
      name: fieldData.mediumRiskName || 'Diamond Heist',
      successRate: parseInt(fieldData.mediumSuccessRate || 50) / 100,
      multiplierMin: parseFloat(fieldData.mediumMultiplierMin || 1.5),
      multiplierMax: parseFloat(fieldData.mediumMultiplierMax || 2.5)
    },
    high: {
      name: fieldData.highRiskName || 'Casino Jackpot',
      successRate: parseInt(fieldData.highSuccessRate || 30) / 100,
      multiplierMin: parseFloat(fieldData.highMultiplierMin || 2.5),
      multiplierMax: parseFloat(fieldData.highMultiplierMax || 4.0)
    }
  };
}

// ===========================
// HEIST LOGIC
// ===========================
function cancelHeist(canceller) {
  if (!heistState.active) {
    sendChatMessage('No heist is currently active.');
    return;
  }

  // Clear timer
  if (heistState.timerInterval) {
    clearInterval(heistState.timerInterval);
    heistState.timerInterval = null;
  }

  // Refund all participants
  if (heistState.participants.length > 0) {
    sendChatMessage(`🚫 Heist cancelled by ${canceller}. Refunding ${heistState.participants.length} participant(s)...`);
    
    // Refund points to all participants
    heistState.participants.forEach(async (participant) => {
      await updateStreamElementsPoints(participant.username, participant.amount);
      console.log(`[Heist Widget] Refunded ${participant.amount} ${currencyName} to ${participant.username}`);
    });
  } else {
    sendChatMessage(`🚫 Heist cancelled by ${canceller}.`);
  }

  // Reset state
  heistState.active = false;
  heistState.participants = [];
  heistState.reminders.sent30s = false;
  heistState.reminders.sent10s = false;

  // Set global cooldown (prevents anyone from starting new heists, even when cancelled)
  setGlobalCooldown();
  
  heistState.initiator = null;

  // Hide visual
  hideHeistStatus();

  console.log('[Heist Widget] Heist cancelled by', canceller);
}

function startHeist(initiator) {
  if (heistState.active) {
    addChatMessage('System', 'A heist is already in progress!', 'error');
    return;
  }

  heistState.active = true;
  heistState.participants = [];
  heistState.initiator = initiator;
  heistState.startTime = Date.now();
  heistState.reminders = { sent30s: false, sent10s: false };

  // Show visual status
  showHeistStatus();
  updateParticipantDisplay();
  
  // Start timer countdown
  heistState.timerInterval = setInterval(updateTimer, 1000);
  updateTimer();

  const joinDuration = fieldData.joinDuration || 60;
  addChatMessage('System', `${initiator} has started a heist! Type !joinheist <amount> <risk> to join! (${joinDuration}s to join)`, 'success');

  console.log('[Demo] Heist started by', initiator);
}

async function joinHeist(username, userId, amount, risk, event) {
  if (!heistState.active) {
    console.log('[Demo] No active heist for', username);
    addChatMessage('System', 'No heist is currently active!', 'error');
    return;
  }

  // Check if user already joined (only check by userId to avoid duplicates)
  const alreadyJoined = heistState.participants.find(p => p.userId === userId);
  if (alreadyJoined) {
    console.log('[Demo] User already joined, skipping duplicate');
    return;
  }

  // Validate amount
  const minBet = parseInt(fieldData.minBet || 10);
  const maxBet = parseInt(fieldData.maxBet || 10000);
  
  if (amount < minBet || amount > maxBet) {
    addChatMessage('System', `Invalid amount! Min: ${minBet}, Max: ${maxBet}`, 'error');
    return;
  }

  // Validate risk level
  const riskLevels = getRiskLevels();
  if (!riskLevels[risk]) {
    addChatMessage('System', 'Invalid risk level! Use: low, medium, or high', 'error');
    return;
  }

  // Check user points (DEMO: using fake points)
  const userPoints = getFakePoints(username);
  
  console.log(`[Demo] ${username} has ${userPoints} ${currencyName}, betting ${amount}`);
  
  if (userPoints < amount) {
    addChatMessage('System', `${username}, you don't have enough ${currencyName}! You have ${userPoints}`, 'error');
    return;
  }
  
  // Deduct points immediately when joining (DEMO: update fake points)
  updateFakePoints(username, -amount);
  
  console.log('[Heist Widget] All checks passed, adding participant');
  
  // Add to participants
  const participant = {
    username,
    userId,
    amount,
    risk: risk || 'low'
  };
  
  heistState.participants.push(participant);

  // Update visual display
  updateParticipantDisplay();

  const riskName = getRiskLevels()[risk].name;
  addChatMessage('System', `${username} joined the heist with ${amount} ${currencyName} at ${riskName}!`, 'success');
  
  console.log('[Demo] Participant joined:', participant);
}

async function executeHeist() {
  // Prevent double execution
  if (!heistState.active) {
    console.log('[Heist Widget] Heist already completed, skipping duplicate execution');
    return;
  }
  
  // Clear timer interval
  if (heistState.timerInterval) {
    clearInterval(heistState.timerInterval);
    heistState.timerInterval = null;
  }

  if (heistState.participants.length === 0) {
    addChatMessage('System', 'The heist was cancelled - no participants joined!', 'error');
    heistState.active = false;
    heistState.initiator = null;
    hideHeistStatus();
    return;
  }

  console.log('[Heist Widget] Executing heist with', heistState.participants.length, 'participants');

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
        userId: participant.userId,
        success: true,
        amount: winnings
      });
      
      successCount++;
    } else {
      results.push({
        username: participant.username,
        userId: participant.userId,
        success: false,
        amount: participant.amount
      });
    }
  });

  // Award points to winners (DEMO: update fake points)
  for (const result of results) {
    if (result.success) {
      updateFakePoints(result.username, result.amount);
      console.log(`[Demo] Awarded ${result.amount} ${currencyName} to ${result.username}`);
    }
  }

  // Send results summary
  addChatMessage('System', '━━━━━━━━━━ HEIST RESULTS ━━━━━━━━━━', 'system');
  addChatMessage('System', `Heist complete! ${successCount}/${heistState.participants.length} succeeded!`, 'system');

  // Send individual results with delay
  setTimeout(() => {
    results.forEach((result, index) => {
      setTimeout(() => {
        const currentPoints = getFakePoints(result.username);
        if (result.success) {
          addChatMessage('System', `✅ ${result.username} succeeded and won ${result.amount} ${currencyName}! (Total: ${currentPoints})`, 'success');
        } else {
          addChatMessage('System', `❌ ${result.username} failed and lost ${result.amount} ${currencyName}! (Total: ${currentPoints})`, 'error');
        }
      }, index * 500); // Stagger messages by 500ms
    });
    
    // Add closing line
    setTimeout(() => {
      addChatMessage('System', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'system');
    }, results.length * 500);
    
    // Hide status after all results shown
    setTimeout(() => {
      hideHeistStatus();
    }, results.length * 500 + 1000);
  }, 1000);

  // Reset state
  heistState.active = false;
  
  // Set global cooldown (prevents anyone from starting new heists)
  setGlobalCooldown();
  
  // Set individual cooldowns for participants who just completed the heist
  heistState.participants.forEach(participant => {
    setCooldown(participant.username);
  });
  
  heistState.participants = [];
  heistState.initiator = null;
  
  console.log('[Heist Widget] Heist completed - Success:', successCount, '/', results.length);
}

// ===========================
// CHAT INTEGRATION
// ===========================
function sendChatMessage(message) {
  if (!fieldData.jwtToken || !fieldData.channelId) {
    console.warn('[Heist Widget] Cannot send message - missing credentials');
    return;
  }

  console.log('[Heist Widget] Sending message to chat:', message);

  fetch(`https://api.streamelements.com/kappa/v2/bot/${fieldData.channelId}/say`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${fieldData.jwtToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  })
  .then(response => {
    if (response.ok) {
      console.log('[Heist Widget] ✅ Message sent successfully');
    } else {
      console.error('[Heist Widget] ❌ Failed to send message. Status:', response.status);
    }
  })
  .catch(error => {
    console.error('[Heist Widget] ❌ Error sending message:', error);
  });
}
