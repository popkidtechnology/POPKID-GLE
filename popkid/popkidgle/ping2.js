import config from '../../config.cjs';

const ping = async (message, sock) => {
  const prefix = config.PREFIX;

  // Extract the command if it starts with the prefix
  const command = message.body.startsWith(prefix)
    ? message.body.slice(prefix.length).split(" ")[0].toLowerCase()
    : '';

  if (command === "ping") {
    const startTime = new Date().getTime();
    await message.React('⏳');
    const endTime = new Date().getTime();

    const pingSpeed = (endTime - startTime).toFixed(2);

    // Stylish Popkid Box
    const pingText = `
┏━━━━━━━━━━━━━━━━┓
┃ 🏓 *Pɪɴɢ Sᴘᴇᴇᴅ ᴄʜᴇᴄᴋ* 🏓
┣━━━━━━━━━━━━━━━━┫
┃ ⚡ *Latency:* ${pingSpeed} ms
┃ 📡 *Status:* Online ✅
┣━━━━━━━━━━━━━━━━┫
┃ 🔥 Popkid is always fast!
┗━━━━━━━━━━━━━━━━┛
    `.trim();

    // Buttons for quick access
    const buttons = [
      { buttonId: `${prefix}uptime`, buttonText: { displayText: '⏳ UPTIME' }, type: 1 },
      { buttonId: `${prefix}menu`, buttonText: { displayText: '📜 MENU' }, type: 1 },
      { buttonId: `${prefix}owner`, buttonText: { displayText: '👑 OWNER' }, type: 1 }
    ];

    // Newsletter info for forwarding style
    const newsletterInfo = {
      newsletterJid: '120363420342566562@newsletter',
      newsletterName: "Popkid XMD",
      serverMessageId: -1
    };

    // External link preview
    const externalPreview = {
      title: "⚡ Popkid XMD Bot",
      body: "Server Latency Test",
      thumbnailUrl: "https://i.ibb.co/zhWGyVZL/file-00000000c6b0624388a556a5aa392449.png",
      sourceUrl: 'https://whatsapp.com/channel/0029VbB6d0KKAwEdvcgqrH26',
      mediaType: 1,
      renderLargerThumbnail: false
    };

    // Context info for WhatsApp display
    const contextInfo = {
      isForwarded: true,
      forwardedNewsletterMessageInfo: newsletterInfo,
      forwardingScore: 999,
      externalAdReply: externalPreview
    };

    await message.React('✅');

    // Send styled ping result
    await sock.sendMessage(
      message.from,
      {
        text: pingText,
        footer: "🔥 Powered by Popkid-XMD",
        buttons,
        headerType: 4,
        contextInfo
      },
      { quoted: message }
    );
  }
};

export default ping;
