const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageTypes } = require("whatsapp-web.js")
const client = new Client({
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
  //ffmpegPath: "/usr/bin/ffmpeg",
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) WhatsApp/29.0.2 Chrome/108.0.5359.215 Electron/22.2.1 Safari/537.36",
  authStrategy: new LocalAuth()
})
console.log("App Started!")
client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

const arrayPerintah = ["sticker", "stiker", "setiker"]

async function createSticker(msg) {
  if (!(msg.type === MessageTypes.IMAGE || msg.type === MessageTypes.VIDEO)) return
  if (!arrayPerintah.find(perintah => msg.body.toLowerCase() === `#${perintah}`)) return
  console.log(`${msg.from}: ${msg.body} (${msg.type})`)
  if (!msg.hasMedia) return
  //console.log(`${msg.from}: ${msg.body}`)
  const gambar = await msg.downloadMedia()
  // client.sendMessage(msg.from, gambar, { sendMediaAsSticker: true, stickerAuthor: "pianndi", stickerName: "Random" })
  msg.reply(gambar, false, { sendSeen: false, sendMediaAsSticker: true, stickerAuthor: "pianndi", stickerName: "Random" })
}

client.on("message_create", createSticker)

client.initialize();
