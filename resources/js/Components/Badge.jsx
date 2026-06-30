const variants = {
  bahari: 'bg-primary-700/20 text-primary-700',
  history: 'bg-highlight-500/20 text-highlight-700',
  sejarah: 'bg-highlight-500/20 text-highlight-700',
  wildlife: 'bg-surface-500/20 text-surface-700',
  ekonomi: 'bg-accent-500/20 text-accent-700',
  digitalisasi: 'bg-primary-700/20 text-primary-700',
  lingkungan: 'bg-surface-500/20 text-surface-700',
  kesehatan: 'bg-highlight-500/20 text-highlight-700',
  pemetaan: 'bg-primary-700/20 text-primary-700',
  pemberdayaan: 'bg-accent-500/20 text-accent-700',
  ekologi: 'bg-surface-500/20 text-surface-700',
  umkm: 'bg-surface-500/20 text-surface-700',
  mudah: 'bg-surface-500/20 text-surface-700',
  sedang: 'bg-accent-500/20 text-accent-700',
  sulit: 'bg-highlight-500/20 text-highlight-700',
}

export default function Badge({ children, variant = 'default' }) {
  return (
    <span className={`inline-flex px-2 py-0.5 font-body text-xs font-medium ${variants[variant] ?? 'bg-neutral-100 text-neutral-600'}`}>
      {children}
    </span>
  )
}
