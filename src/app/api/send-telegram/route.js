export async function POST(request) {
  try {
    const { message, resourceTitle, userName, userEmail } = await request.json();
    
    // Your Telegram Bot Token
    const BOT_TOKEN = "8601191492:AAE4XuyPG8AV74fcwTyz-nKKdBDu0ar2Udg";
    // Your Chat ID
    const CHAT_ID = "6454146605";
    
    // Format the message for Telegram
    const telegramMessage = `
📚 *NEW RESOURCE REQUEST*
━━━━━━━━━━━━━━━━━━━━━

*Resource:* ${resourceTitle}
*Request Details:* ${message}

👤 *User Info:*
• Name: ${userName || 'Not provided'}
• Email: ${userEmail || 'Not provided'}

📅 *Time:* ${new Date().toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━
_Respond to this request via Waloo Academy admin panel_
    `;
    
    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramMessage,
        parse_mode: 'Markdown',
      }),
    });
    
    const data = await response.json();
    
    if (data.ok) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ error: 'Telegram API error', details: data }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}