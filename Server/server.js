const { Telegraf } = require("telegraf");
const fs = require("fs");
require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);


const User = new Map();

bot.start((ctx) => {
  ctx.reply("Welcome MR Monox!\n\nChoose an option:\n- Enter\n- Read\n- Todo");
});

bot.on("text", async (ctx) => {
  const message = ctx.message.text;
  const ID = ctx.from.id;

  
  if (User.get(ID) === "Waiting for message") {
    const log = `[${new Date().toLocaleString()}]\n${ctx.from.username || ctx.from.first_name}\n${message}\n`;

    fs.appendFile("messages.txt", log, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        ctx.reply("Failed to save your message");
      } else {
        console.log("Saved:", log.trim());
        ctx.reply("Your message has been saved.");
      }
    });

    User.delete(ID); 
    return;
  }


  if (message === "Enter") {
    ctx.reply("Enter a message:");
    User.set(ID, "Waiting for message");

  } else if (message === "Read") {
    fs.readFile("messages.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        ctx.reply("Could not read data");
      } else {
        ctx.reply(data || "No data saved yet.");
      }
    });

  } else if (message === "Todo") {
    ctx.reply("Todo feature coming soon!");

  } else {
    ctx.reply("Invalid option. Please type: Enter, Read, or Todo.");
  }
});

bot.launch();
console.log("Telegram bot running...");
