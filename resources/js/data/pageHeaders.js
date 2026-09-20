const defaultBackground =
  'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80'

export const pageHeaders = {
  home: {
    eyebrow: 'Pulau Enggano',
    title: 'Bahari, Hutan, dan Warisan Leluhur',
    subtitle: 'Jelajahi lanskap, budaya, dan kehidupan masyarakat Pulau Enggano.',
    background: defaultBackground,
  },
  villages: {
    eyebrow: 'Desa & Budaya',
    title: 'Lebih Kenal dengan Enggano',
    subtitle: 'Jelajahi keragaman budaya dan pesona alam dari yang menjadi denyut nadi kehidupan di garis terdepan Samudera Hindia.',
    background: '',
  },
  history: {
    eyebrow: 'Warisan Leluhur',
    title: 'Tentang Enggano',
    subtitle: 'Gambaran umum, sejarah panjang, dan kehidupan sosial budaya Pulau Enggano.',
    background: '',
  },
  destinations: {
    eyebrow: 'Destinasi',
    title: 'Jelajahi Keindahan Enggano',
    subtitle: 'Temukan destinasi terbaik yang menawarkan keindahan alam, budaya, dan pengalaman tak terlupakan di Pulau Enggano.',
    background: defaultBackground,
  },
  accommodations: {
    eyebrow: 'Penginapan',
    title: 'Beristirahat di Enggano',
    subtitle: 'Temukan tempat menginap yang nyaman untuk melanjutkan perjalanan di Pulau Enggano.',
    background: defaultBackground,
  },
  activities: {
    eyebrow: 'Aktivitas',
    title: 'Aktivitas di Enggano',
    subtitle: 'Rasakan pengalaman bahari, budaya, dan alam yang khas di Pulau Enggano.',
    background: defaultBackground,
  },
  localGuide: {
    eyebrow: 'Panduan Lokal',
    title: 'Temukan Enggano Bersama Warga Lokal',
    subtitle: 'Dapatkan panduan perjalanan dari orang-orang yang mengenal pulau ini lebih dekat.',
    background: defaultBackground,
  },
  kknLog: {
    eyebrow: 'Aktivitas',
    title: 'Catatan KKN di Enggano',
    subtitle: 'Dokumentasi kegiatan, pembelajaran, dan kontribusi mahasiswa di Pulau Enggano.',
    background: defaultBackground,
  },
  credits: {
    eyebrow: 'Tentang Kami',
    title: 'Tentang Kami',
    subtitle: 'Informasi inisiator, pengembang website, serta dokumentasi kegiatan program kolaborasi di Pulau Enggano.',
    background: defaultBackground,
  },
}

export function getPageHeader(pageKey, overrides = {}) {
  return { ...(pageHeaders[pageKey] || {}), ...overrides }
}
