// assets/js/chatbot.js
// Intelligent local AI Chatbot simulator linked directly to our mockEvents database.

function initChatbot() {
  const toggleBtn = document.getElementById('chatbotToggle');
  const panel = document.getElementById('chatbotPanel');
  const closeBtn = document.getElementById('chatbotClose');
  const sendBtn = document.getElementById('chatbotSend');
  const input = document.getElementById('chatbotInput');
  const body = document.getElementById('chatbotBody');

  if (!toggleBtn || !panel) return;

  function toggleChat() {
    panel.classList.toggle('open');
  }

  toggleBtn.addEventListener('click', toggleChat);
  if (closeBtn) closeBtn.addEventListener('click', toggleChat);

  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chatbot-msg ${sender}`;
    msgDiv.innerHTML = text;
    body.appendChild(msgDiv);
    body.scrollTop = body.scrollHeight;
    return msgDiv;
  }

  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'chatbot-msg bot typing-indicator-msg';
    indicator.innerHTML = `
      <div class="typing-dots">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    body.appendChild(indicator);
    body.scrollTop = body.scrollHeight;
    return indicator;
  }

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;
    
    // Add user message
    addMessage(text, 'user');
    input.value = '';

    // Show bot typing
    const typingBubble = showTypingIndicator();

    // Generate response based on data
    setTimeout(() => {
      typingBubble.remove(); // Remove typing bubbles
      
      let reply = "I can help you with that! Are you looking for events, or do you want to register as a participant or host?";
      const lowerText = text.toLowerCase();
      const isSubpage = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
      const pathPrefix = isSubpage ? '' : 'pages/';

      if (lowerText.includes('hackathon') || lowerText.includes('coding')) {
        const hacks = typeof mockEvents !== 'undefined' ? mockEvents.filter(e => e.category === 'hackathon') : [];
        if (hacks.length > 0) {
          reply = `We have found <strong>${hacks.length} hackathons</strong>! Recommended for you:<br><br>`;
          hacks.slice(0, 2).forEach(h => {
            reply += `📅 <strong>${h.title}</strong><br>📍 ${h.location}<br>💸 ${h.priceAmount} | <a href="${pathPrefix}event-detail.html?id=${h.id}" style="color:var(--brand-indigo-600); font-weight:bold;">View Details &rarr;</a><br><br>`;
          });
        } else {
          reply = `We have several hackathons listed. Check our <a href='${pathPrefix}browse-events.html?cat=hackathon' style='color:var(--brand-indigo-600); font-weight:bold;'>Hackathon Page</a> for more info!`;
        }
      } else if (lowerText.includes('host') || lowerText.includes('organize') || lowerText.includes('create')) {
        reply = "Hosting is super easy! Simply register an account as an <strong>Organizer</strong>. In your dashboard, click 'Create Event' to launch your registration page, set up tickets, and invite speakers!";
      } else if (lowerText.includes('register') || lowerText.includes('apply')) {
        reply = `To register for an event, head to the <a href='${pathPrefix}browse-events.html' style='color:var(--brand-indigo-600); font-weight:bold;'>Browse Events</a> page, select an event card, and click the 'Register Now' button on the details sidebar.`;
      } else if (lowerText.includes('free')) {
        const freebies = typeof mockEvents !== 'undefined' ? mockEvents.filter(e => e.price === 'free') : [];
        reply = `We have <strong>${freebies.length} free events</strong> available! Top pick:<br><br>`;
        if (freebies.length > 0) {
          const f = freebies[0];
          reply += `🎉 <strong>${f.title}</strong> by ${f.organizer}<br>📅 ${f.date}<br>👉 <a href="${pathPrefix}event-detail.html?id=${f.id}" style="color:var(--brand-indigo-600); font-weight:bold;">Join Free Now</a>`;
        }
      } else if (lowerText.includes('workshop') || lowerText.includes('learn')) {
        const workshops = typeof mockEvents !== 'undefined' ? mockEvents.filter(e => e.category === 'workshop') : [];
        if (workshops.length > 0) {
          reply = `We have <strong>${workshops.length} workshops</strong> available! Featured:<br><br>`;
          workshops.slice(0, 2).forEach(w => {
            reply += `💡 <strong>${w.title}</strong> (${w.priceAmount})<br>👉 <a href="${pathPrefix}event-detail.html?id=${w.id}" style="color:var(--brand-indigo-600); font-weight:bold;">Enroll Now &rarr;</a><br><br>`;
          });
        }
      }

      addMessage(reply, 'bot');
    }, 1200);
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  // Handle suggestion chips
  body.addEventListener('click', (e) => {
    if (e.target.classList.contains('chatbot-suggestion')) {
      input.value = e.target.textContent;
      handleSend();
    }
  });
}

// Global exposure
window.initChatbot = initChatbot;
