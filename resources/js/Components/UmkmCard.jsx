import Badge from './Badge'

export default function UmkmCard({ umkm }) {
  const hasPhoto = umkm.product_photos && umkm.product_photos.trim() !== ''

  return (
    <article className="bg-white p-4 shadow-sm">
      {hasPhoto ? (
        <img
          src={umkm.product_photos}
          alt={umkm.business_name}
          className="mb-3 aspect-square w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="mb-3 aspect-square w-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <p className="mt-2 text-xs text-slate-400 uppercase tracking-wide">Foto belum tersedia</p>
          </div>
        </div>
      )}
      <Badge variant="umkm">{umkm.business_type}</Badge>
      <h4 className="mt-2 font-display text-xl font-semibold text-neutral-800">{umkm.business_name}</h4>
      <p className="text-sm text-neutral-500">{umkm.owner_name}</p>
      {umkm.village && <p className="mt-1 text-xs text-neutral-400">Desa {umkm.village}</p>}
      {umkm.notes && <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-500">{umkm.notes}</p>}
    </article>
  )
}
