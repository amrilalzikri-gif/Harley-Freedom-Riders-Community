import discord
from discord.ext import commands
from discord import app_commands
import datetime

class Logs(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @app_commands.command(name="logs", description="Membuat log aktivitas member Harley Freedom Riders")
    @app_commands.describe(
        name="Nama dari member yang bersangkutan",
        discord_user="User Discord member tersebut",
        status="Pilih status log (join/out/suspend/dll)",
        reason="Alasan dari tindakan log ini",
        note="Catatan tambahan untuk member"
    )
    @app_commands.choices(status=[
        app_commands.Choice(name="Join (Bergabung)", value="join"),
        app_commands.Choice(name="Out (Keluar)", value="out"),
        app_commands.Choice(name="Suspend (Skorsing)", value="suspend"),
        app_commands.Choice(name="Promotion (Naik Jabatan)", value="promotion")
    ])
    async def logs_command(
        self, 
        interaction: discord.Interaction, 
        name: str, 
        discord_user: discord.User, 
        status: str, 
        reason: str, 
        note: str
    ):
        try:
            # Mengirim respon awal agar interaksi tidak timeout (mencegah crash/error)
            await interaction.response.defer()

            # Skema Warna Berdasarkan Status
            color_map = {
                "join": discord.Color.blue(),       # Biru seperti di gambar contoh
                "out": discord.Color.red(),         # Merah untuk keluar
                "suspend": discord.Color.orange(),  # Jingga untuk suspend
                "promotion": discord.Color.gold()   # Emas untuk promosi
            }
            embed_color = color_map.get(status, discord.Color.dark_gray())

            # Membuat susunan isi log sesuai dengan referensi gambar
            embed = discord.Embed(
                title="📋 Logs Member — Harley Freedom Riders",
                description=(
                    f"• **Name:** {name}
"
                    f"• **Discord:** {discord_user.mention}
"
                    f"• **Logs:** {status}
"
                    f"• **Reason:** {reason}
"
                    f"• **Note:** {note}"
                ),
                color=embed_color,
                timestamp=datetime.datetime.utcnow()
            )

            # Banner/Image bawah (menggunakan placeholder bertema motor klasik/Harley)
            # Anda bisa mengganti URL gambar ini dengan banner custom Harley Freedom Riders Anda sendiri
            embed.set_image(url="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=60")

            # Footer sesuai nama bot, ditambahkan pembuat log dan waktu sistem saat ini
            embed.set_footer(
                text=f"Harley Freedom Riders • Logs System",
                icon_url=interaction.user.avatar.url if interaction.user.avatar else None
            )

            # Mengirimkan hasil embed log ke channel tempat command diketik
            await interaction.followup.send(embed=embed)

        except discord.errors.Forbidden:
            print("CRASH PREVENTED: Bot tidak memiliki izin (Permission) untuk mengirim pesan di channel ini!")
        except Exception as e:
            # Mencegah bot crash total jika terjadi error tidak terduga
            print(f"CRASH PREVENTED di Command Logs: {e}")
            if not interaction.response.is_done():
                await interaction.response.send_message("Terjadi kesalahan internal saat memproses log.", ephemeral=True)
            else:
                await interaction.followup.send("Terjadi kesalahan internal saat memproses log.", ephemeral=True)

async def setup(bot):
    await bot.add_cog(Logs(bot))
