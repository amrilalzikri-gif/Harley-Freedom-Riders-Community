import discord
from discord.ext import commands
import os

# Konfigurasi Bot
TOKEN = "MASUKKAN_TOKEN_DISCORD_ANDA_DI_SINI"  # Ganti dengan token asli di file .env atau langsung di sini
GUILD_ID = 1490723872431931583
CLIENT_ID = 1505500238352220270

class HarleyBot(commands.Bot):
    def __init__(self):
        # Mengaktifkan semua intents yang diperlukan agar bot tidak crash saat membaca data member/guild
        intents = discord.Intents.default()
        intents.message_content = True
        intents.members = True
        super().__init__(command_prefix="!", intents=intents, application_id=CLIENT_ID)

    async def setup_hook(self):
        # Memuat extension/cog logs
        await self.load_extension("cogs.logs")
        print("Extension 'logs' berhasil dimuat.")
        
        # Sinkronisasi slash commands secara global atau ke guild spesifik agar langsung muncul
        guild = discord.Object(id=GUILD_ID)
        self.tree.copy_global_to(guild=guild)
        await self.tree.sync(guild=guild)
        print(f"Slash commands berhasil disinkronisasi ke Guild ID: {GUILD_ID}")

    async def on_ready(self):
        print(f"Bot berhasil online sebagai: {self.user} (ID: {self.user.id})")
        # Mengatur status bot agar terlihat profesional
        await self.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name="Harley Freedom Riders"))

if __name__ == "__main__":
    bot = HarleyBot()
    try:
        bot.run(TOKEN)
    except discord.errors.LoginFailure:
        print("CRASH PREVENTED: Token Discord tidak valid! Periksa kembali token Anda.")
    except Exception as e:
        print(f"CRASH PREVENTED pada Startup: {e}")
