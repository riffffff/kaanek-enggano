import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useRef } from 'react'

// Pusat Pulau Enggano
const CENTER = [-5.389167, 102.411111]
const ZOOM   = 12
const DEFAULT_BOUNDS = [
  [-5.545, 102.235],
  [-5.255, 102.545],
]
const DEFAULT_VIEW_BOUNDS = DEFAULT_BOUNDS

function escapePopupText(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[character])
}

/**
 * EngganoMap — komponen peta interaktif Pulau Enggano menggunakan Leaflet.js.
 * Menampilkan peta Pulau Enggano tanpa marker.
 *
 * @param {Array}  mapMarkers       - titik tambahan dari prop (opsional)
 * @param {number} height           - tinggi container dalam px (default 480)
 * @param {boolean} useMarkerBounds - jika true, viewport mengikuti koordinat prop
 * @param {Function} onMarkerClick  - callback opsional ketika marker diklik, menerima object marker
 */
export default function LeafletMap({
  mapMarkers = [],
  height = 480,
  zoom = 13,
  useMarkerBounds = false,
  viewBounds = DEFAULT_VIEW_BOUNDS,
  viewMaxZoom = null,
  highlightPoint = null,
  onMarkerClick = null,
}) {
  const containerRef = useRef(null)
  const mapRef       = useRef(null)
  const markerLayerRef = useRef(null)

  function focusViewBounds(map) {
    map.fitBounds(viewBounds, {
      padding: [4, 4],
      ...(viewMaxZoom ? { maxZoom: viewMaxZoom } : {}),
    })
  }

  useEffect(() => {
    // Hindari inisialisasi ganda (strict mode / HMR)
    if (mapRef.current) return
    if (!containerRef.current) return

    // Inisialisasi peta
    const map = L.map(containerRef.current, {
      center: CENTER,
      zoom,
      scrollWheelZoom: false,   // lebih nyaman untuk embed di halaman
      zoomControl: true,
    })

    // Tile layer OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map)

    focusViewBounds(map)
    markerLayerRef.current = L.layerGroup().addTo(map)
    mapRef.current = map

    return () => {
      // Cleanup saat komponen unmount
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current) return
    if (!markerLayerRef.current) return

    markerLayerRef.current.clearLayers()

    if (highlightPoint && Number.isFinite(Number(highlightPoint.lat)) && Number.isFinite(Number(highlightPoint.lng))) {
      const highlight = L.circle([highlightPoint.lat, highlightPoint.lng], {
        radius: highlightPoint.radius || 30000,
        color: '#dc2626',
        weight: 2,
        fillColor: '#ef4444',
        fillOpacity: 0.08,
      })

      highlight.addTo(markerLayerRef.current)
    }

    const validMarkers = mapMarkers.filter(marker =>
      Number.isFinite(Number(marker.lat)) && Number.isFinite(Number(marker.lng))
    )

    validMarkers.forEach(marker => {
      const lat = Number(marker.lat)
      const lng = Number(marker.lng)
      const point = L.circleMarker([lat, lng], {
        radius: 9,
        color: '#ffffff',
        weight: 3,
        fillColor: '#dc2626',
        fillOpacity: 1,
      })

      if (marker.name) {
        point.bindPopup(`
          <div style="min-width: 160px;">
            <strong style="display: block; margin-bottom: 8px;">${escapePopupText(marker.name)}</strong>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}"
              target="_blank"
              rel="noopener noreferrer"
              style="color: #b91c1c; font-weight: 600; text-decoration: none;"
            >
              Buka di Google Maps
            </a>
          </div>
        `, {
          closeButton: true,
          offset: [0, -8],
        })
      }

      point.on('click', function () {
        this.openPopup()
      })

      point.addTo(markerLayerRef.current)
    })

    if (useMarkerBounds && validMarkers.length) {
      mapRef.current.invalidateSize()
      const bounds = []

      validMarkers.forEach(marker => {
        const lat = Number(marker.lat)
        const lng = Number(marker.lng)

        bounds.push([lat, lng])
      })

      if (bounds.length === 1) {
        mapRef.current.setView(bounds[0], zoom)
      } else {
        mapRef.current.fitBounds(bounds, { padding: [32, 32], maxZoom: zoom })
      }
    } else {
      mapRef.current.invalidateSize()
      focusViewBounds(mapRef.current)
    }
  }, [mapMarkers, useMarkerBounds, viewBounds, highlightPoint, onMarkerClick, zoom])

  return (
    <div
      ref={containerRef}
      style={{ height: typeof height === 'number' ? `${height}px` : height, width: '100%', zIndex: 0 }}
      className="rounded-sm overflow-hidden"
    />
  )
}
