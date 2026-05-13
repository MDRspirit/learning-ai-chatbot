# Dokumen Kebutuhan Produk (PRD): MDRCamp

## 1. Ringkasan Proyek
**MDRCamp** adalah platform pendidikan teknologi premium yang menggabungkan *Landing Page* konversi tinggi dengan sistem manajemen pembelajaran (*Dashboard*). Fokus utama platform ini adalah menyediakan pelatihan intensif di bidang **Fullstack Web Development**, **Data Engineering**, dan **UI/UX Design**. Platform ini dilengkapi dengan Konsultan AI berbasis Gemini yang siap membantu calon siswa secara instan 24/7.

## 2. Tujuan Proyek
- Memberikan pengalaman visual yang mewah dan modern (Premium Feel) kepada calon siswa.
- Mengotomatiskan konsultasi awal menggunakan AI untuk meningkatkan efisiensi operasional.
- Menyediakan dashboard terpusat bagi siswa (untuk belajar) dan admin (untuk manajemen bisnis).
- Mendukung aksesibilitas global melalui sistem multibahasa dan tema adaptif.

## 3. Fitur Utama

### 3.1. Landing Page Premium
- **Desain Glassmorphism**: Estetika modern menggunakan panel semi-transparan, efek blur, dan gradien dinamis.
- **Sistem Multibahasa**: Pengguna dapat beralih antara Bahasa Indonesia (ID) dan Inggris (EN) secara instan.
- **Manajemen Tema**: Mendukung Mode Terang (Light) dan Gelap (Dark) yang mendeteksi preferensi sistem perangkat pengguna secara otomatis.
- **Katalog Program Interaktif**: Informasi kurikulum yang mendalam yang dapat diakses melalui modal tanpa memuat ulang halaman.

### 3.2. Konsultan AI (Integrasi Gemini)
- **Personalisasi Konsultan**: AI telah dilatih untuk hanya menjawab pertanyaan seputar MDRCamp dan menolak pertanyaan luar konteks secara sopan.
- **Auto-Fallback Engine**: Sistem cerdas yang secara otomatis beralih antar model (Gemini 2.5, 2.0, Flash-Latest) untuk mengatasi error 503 saat trafik server Google tinggi.
- **Render Markdown**: Respon AI ditampilkan dengan format cantik (list, bold, code block) agar mudah dipahami.

### 3.3. Dashboard Siswa (Student Portal)
- **Analitik Belajar**: Grafik garis (*Line Chart*) untuk memantau jam belajar mingguan.
- **Pelacakan Progres**: *Progress bar* visual untuk setiap kursus yang sedang diikuti.
- **Manajemen Sesi**: Kartu "Next Lesson" untuk akses langsung ke sesi Live Mentor (Zoom/GMeet).
- **Gamifikasi**: Sistem lencana (*Badges*) untuk meningkatkan motivasi belajar siswa.

### 3.4. Admin CMS & Analytics
- **Business Intelligence**: Grafik batang (*Bar Chart*) untuk pendapatan dan grafik lingkaran (*Pie Chart*) untuk distribusi siswa per program.
- **Manajemen Data**: Tabel manajemen siswa yang dilengkapi dengan fitur pencarian, filter status pembayaran, dan aksi administratif.
- **Dashboard Overview**: Ringkasan performa bisnis (Total Revenue, Active Students, Conversion Rate).

## 4. Arsitektur Teknis
- **Frontend**: Vite + React.js (Cepat, Ringan, Modern).
- **Styling**: Vanilla CSS dengan sistem variabel (Token) untuk kemudahan kustomisasi tema.
- **Visualisasi Data**: Recharts (Grafik interaktif dan responsif).
- **Navigasi**: React Router DOM v6 untuk manajemen rute aplikasi (SPA).
- **AI Backend**: Google Generative AI SDK (Direct integration with Gemini API).
- **State Management**: React Context API untuk mengelola status Bahasa dan Tema secara global.

## 5. Arsitektur Halaman (Routing)
- `/` : Landing Page (Informasi umum, Testimoni, FAQ).
- `/dashboard` : Area khusus siswa (Personalized experience).
- `/admin` : Area khusus pengelola (Manajemen konten dan data bisnis).

## 6. Rencana Pengembangan (Roadmap)
- **Integrasi Payment Gateway**: Penanganan pendaftaran otomatis via Midtrans atau Stripe.
- **LMS Video Player**: Pemutar video terintegrasi dengan pelacakan durasi tonton.
- **Forum Komunitas**: Ruang diskusi real-time antara siswa dan mentor.
- **AI Code Reviewer**: Fitur AI yang dapat memeriksa tugas pemrograman siswa secara otomatis.
