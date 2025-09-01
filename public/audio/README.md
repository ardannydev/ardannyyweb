# Background Music Setup

## Cara Menambahkan Musik Latar Belakang

1. **Tambahkan file audio** ke folder ini dengan nama `background-music.mp3`
2. **Format yang didukung**: MP3, WAV, OGG
3. **Durasi yang disarankan**: 2-5 menit untuk loop yang baik
4. **Ukuran file**: Maksimal 10MB untuk performa optimal

## Contoh Struktur File
```
public/audio/
├── background-music.mp3  (file musik utama)
├── background-music.ogg  (alternatif format)
└── README.md            (file ini)
```

## Catatan
- Musik akan diputar otomatis saat website dimuat
- Pengguna dapat mengontrol volume dan mute/unmute
- Jika file tidak ditemukan, kontrol audio akan tersembunyi
- Pastikan file audio memiliki lisensi yang sesuai untuk penggunaan web

## Keamanan / Proteksi Download
- Perlu dicatat: langkah di sisi klien hanya membuatnya lebih sulit untuk pengguna biasa atau downloader sederhana (IDM, ekstensi browser) — tetapi tidak 100% mencegah download.
- Untuk proteksi lebih kuat, pertimbangkan solusi server-side seperti:
	- Signed URLs (URL sementara yang kadaluarsa)
	- Token-authenticated endpoints yang mengalirkan (stream) data setelah memeriksa session/user
	- Mengaburkan respons dengan chunked streaming dan header CORS yang ketat
	- Jika perlu kontrol hak cipta ketat, gunakan layanan DRM pihak ketiga atau platform hosting audio yang mendukung proteksi lisensi.

Implementasi saat ini menggunakan fetch + Blob URL sehingga file asli tidak langsung terekspos di element HTML; itu membantu tetapi bukan solusi final untuk mencegah pengunduhan oleh pihak ketiga.

## Rekomendasi Musik
- Musik instrumental atau ambient
- Volume yang tidak terlalu keras
- Loop yang mulus tanpa jeda yang mencolok