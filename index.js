const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// --- THEME & CONTENT ---
const THEME = {
  name: "✨ STARBURST SAAS ✨",
  emoji: "🌠",
  price: 50 // Price in Telegram Stars
};

// 1. Start Command (The Landing Page)
bot.start((ctx) => {
  ctx.replyWithMarkdownV2(
    `*${THEME.emoji} Welcome to ${THEME.name} ${THEME.emoji}*\n\n` +
    `Unlock the cosmic power of our SaaS platform directly from your pocket\\.\n\n` +
    `🚀 *Premium Access:* ${THEME.price} Stars`,
    Markup.inlineKeyboard([
      [Markup.button.callback('✨ Unlock Starburst Premium', 'buy_stars')],
      [Markup.button.url('🌐 Visit Website', 'https://yourlink.com')]
    ])
  );
});

// 2. The Payment Trigger
bot.action('buy_stars', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.sendInvoice({
    title: "Starburst Premium Access",
    description: "Unlock lifetime access to our cosmic SaaS insights!",
    payload: "premium_sub_001",
    currency: "XTR", // XTR is the code for Telegram Stars
    prices: [{ label: "Premium", amount: THEME.price }],
  });
});

// 3. Pre-Checkout (Required by Telegram)
bot.on('pre_checkout_query', (ctx) => ctx.answerPreCheckoutQuery(true));

// 4. Successful Payment Handling
bot.on('successful_payment', (ctx) => {
  ctx.reply(
    "🔥 THE STAR HAS BURST! 🔥\n\n" +
    "Welcome to the inner circle. You now have full access to the SaaS dashboard.\n" +
    "Use /dashboard to begin your journey."
  );
  // Here you would typically update your database to mark the user as 'Premium'
});

bot.launch();
console.log("🚀 Starburst SaaS is live on the edge!");
// --- HEALTH CHECK SERVER ---
// This prevents the "Port not found" error on Cloud Platforms
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is Active\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Starburst SaaS is live on port ${PORT}`);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
