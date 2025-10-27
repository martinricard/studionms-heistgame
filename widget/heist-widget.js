/*
 * Studio NMS - Heist Game SE
 * Text-based heist game for StreamElements loyalty points
 * Version 0.01 (Alpha)
 * 
 * For support and bug reports:
 * contact@noticemesenpai.studio
 * 
 * API Documentation: https://dev.streamelements.com/
 */

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
  startTime: null, // When the heist started (timestamp)
  cooldowns: new Map(), // Username -> timestamp cooldown tracker
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
// WIDGET INITIALIZATION
// ===========================
window.addEventListener('onWidgetLoad', async function(obj) {
  // Prevent double initialization (editor loads widget multiple times)
  if (isInitialized) {
    console.log('[Heist Widget] Already initialized, skipping duplicate load');
    return;
  }
  isInitialized = true;
  
  fieldData = obj.detail.fieldData;
  
  // Validate required credentials
  if (!fieldData.jwtToken || !fieldData.channelId) {
    console.error('[Heist Widget] ⚠️ Missing required credentials!');
    console.error('[Heist Widget] Please configure JWT Token and Channel ID in widget settings');
    return;
  }
  
  console.log('[Heist Widget] ✅ Credentials configured');
  
  // Get currency name from field settings first (fallback)
  currencyName = fieldData.currencyName || 'points';
  
  // Fetch actual currency name from StreamElements loyalty settings
  if (fieldData.jwtToken && fieldData.channelId) {
    const fetchedCurrencyName = await getLoyaltyCurrencyName();
    if (fetchedCurrencyName) {
      currencyName = fetchedCurrencyName;
      console.log('[Heist Widget] Currency name fetched from SE:', currencyName);
    } else {
      console.log('[Heist Widget] Using configured currency name:', currencyName);
    }
  }
  
  console.log('[Heist Widget] Initializing...');
  console.log('[Heist Widget] Min Bet:', fieldData.minBet);
  console.log('[Heist Widget] Currency:', currencyName);
  console.log('[Heist Widget] Commands:', {
    heist: fieldData.commandHeist,
    join: fieldData.commandJoin
  });
  
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

  // Hide visual
  hideHeistStatus();

  console.log('[Heist Widget] Heist cancelled by', canceller);
}

function startHeist(initiator) {
  if (heistState.active) {
    const msg = fieldData.msgHeistInProgress || 'A heist is already in progress!';
    sendChatMessage(msg);
    return;
  }

  heistState.active = true;
  heistState.participants = [];
  heistState.startTime = Date.now();
  heistState.reminders.sent30s = false;
  heistState.reminders.sent10s = false;

  // Show visual status
  showHeistStatus();
  updateParticipantDisplay();
  
  // Start timer countdown
  heistState.timerInterval = setInterval(updateTimer, 1000);
  updateTimer();

  const msg = fieldData.msgHeistStart || 'Heist starting! Type !join [amount] [risk] to join!';
  sendChatMessage(msg);

  console.log('[Heist Widget] Heist started by', initiator);
}

async function joinHeist(username, userId, amount, risk, event) {
  if (!heistState.active) {
    console.log('[Heist Widget] No active heist for', username);
    const msg = fieldData.msgNoActiveHeist || 'No heist is currently active! Wait for someone to start one with !heist';
    sendChatMessage(msg);
    return;
  }

  // Check if user already joined (only check by userId to avoid editor/live duplicates)
  const alreadyJoined = heistState.participants.find(p => p.userId === userId);
  if (alreadyJoined) {
    console.log('[Heist Widget] User already joined, skipping duplicate');
    return;
  }

  // Check cooldown
  const cooldown = checkCooldown(username);
  if (!cooldown.ready) {
    const msg = (fieldData.msgCooldown || '{user}, you must wait {time} before joining another heist!')
      .replace('{user}', username)
      .replace('{time}', formatTime(cooldown.remaining));
    sendChatMessage(msg);
    return;
  }

  // Validate amount
  const minBet = parseInt(fieldData.minBet || 10);
  const maxBet = parseInt(fieldData.maxBet || 10000);
  
  if (amount < minBet || amount > maxBet) {
    const msg = (fieldData.msgInvalidAmount || 'Invalid amount! Min: {min}, Max: {max}')
      .replace('{min}', minBet)
      .replace('{max}', maxBet);
    sendChatMessage(msg);
    return;
  }

  // Validate risk level
  const riskLevels = getRiskLevels();
  if (!riskLevels[risk]) {
    sendChatMessage('Invalid risk level! Use: low, medium, or high');
    return;
  }

  // Check user points with StreamElements API
  const userPoints = await getStreamElementsPoints(username);
  
  if (userPoints === null) {
    sendChatMessage(`Unable to verify ${currencyName}. Please check widget configuration.`);
    return;
  }
  
  console.log(`[Heist Widget] ${username} has ${userPoints} ${currencyName}, betting ${amount}`);
  
  if (userPoints < amount) {
    let msg = fieldData.msgNotEnoughPoints || '{user}, you don\'t have enough {currency}!';
    msg = msg.replace('{user}', username)
      .replace('{currency}', currencyName);
    sendChatMessage(msg);
    return;
  }
  
  // Deduct points immediately when joining
  const deducted = await updateStreamElementsPoints(username, -amount);
  if (!deducted) {
    sendChatMessage(`Failed to deduct ${currencyName}. Please try again.`);
    return;
  }
  
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

  let msg = fieldData.msgJoined || '{user} joined with {amount} {currency} at {risk} risk!';
  msg = msg.replace('{user}', username)
    .replace('{amount}', amount)
    .replace('{currency}', currencyName)
    .replace('{risk}', risk);
  sendChatMessage(msg);
  
  console.log('[Heist Widget] Participant joined:', participant);
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
    const msg = fieldData.msgNoParticipants || 'No one joined the heist!';
    sendChatMessage(msg);
    heistState.active = false;
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

    // Set cooldown
    setCooldown(participant.username);
  });

  // Award points to winners using StreamElements API
  for (const result of results) {
    if (result.success) {
      await updateStreamElementsPoints(result.username, result.amount);
      console.log(`[Heist Widget] Awarded ${result.amount} ${currencyName} to ${result.username}`);
    }
  }

  // Send results summary
  const summary = (fieldData.msgHeistResults || 'Heist complete! {successCount}/{totalCount} succeeded!')
    .replace('{successCount}', successCount)
    .replace('{totalCount}', heistState.participants.length);
  sendChatMessage(summary);

  // Send individual results with delay
  setTimeout(() => {
    results.forEach((result, index) => {
      setTimeout(() => {
        if (result.success) {
          let msg = fieldData.msgSuccess || '{user} succeeded and won {amount} {currency}!';
          msg = msg.replace('{user}', result.username)
            .replace('{amount}', result.amount)
            .replace('{currency}', currencyName);
          sendChatMessage(msg);
        } else {
          let msg = fieldData.msgFailure || '{user} failed and lost {amount} {currency}!';
          msg = msg.replace('{user}', result.username)
            .replace('{amount}', result.amount)
            .replace('{currency}', currencyName);
          sendChatMessage(msg);
        }
      }, index * 500); // Stagger messages by 500ms
    });
    
    // Hide status after all results shown
    setTimeout(() => {
      hideHeistStatus();
    }, results.length * 500 + 1000);
  }, 1000);

  // Reset state
  heistState.active = false;
  heistState.participants = [];
  
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
