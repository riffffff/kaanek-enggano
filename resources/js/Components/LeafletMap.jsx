export default function LeafletMap({ mapMarkers = [] }) {
  return (
    <div className="flex min-h-80 items-center justify-center bg-neutral-100 text-center text-sm text-neutral-500">
      <div>
        {mapMarkers.length > 0 ? (
          <>
            <p className="font-semibold text-neutral-700">Peta Interaktif</p>
            <p className="mt-1">{mapMarkers.length} titik lokasi siap ditampilkan.</p>
            <p className="mt-1 text-xs text-neutral-400">(Integrasi Leaflet belum aktif — akan segera hadir)</p>
          </>
        ) : (
          <>
            <p className="font-semibold text-neutral-700">Koordinat tidak tersedia</p>
            <p className="mt-1">Lokasi destinasi ini belum memiliki data koordinat GPS.</p>
          </>
        )}
      </div>
    </div>
  )
}
