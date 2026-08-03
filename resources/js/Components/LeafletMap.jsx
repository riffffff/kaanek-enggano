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



/**
 * EngganoMap — komponen peta interaktif Pulau Enggano menggunakan Leaflet.js.
 * Menampilkan peta Pulau Enggano tanpa marker.
 *
 * @param {Array}  mapMarkers       - titik tambahan dari prop (opsional)
 * @param {number} height           - tinggi container dalam px (default 480)
 * @param {boolean} useMarkerBounds - jika true, viewport mengikuti koordinat prop
 * @param {Function} onMarkerClick  - callback opsional ketika marker diklik, menerima object marker
 */
export default function LeafletMap({ mapMarkers = [], height = 480, useMarkerBounds = false, onMarkerClick = null }) {
  const containerRef = useRef(null)
  const mapRef       = useRef(null)
  const markerLayerRef = useRef(null)

  function focusDefaultBounds(map) {
    map.fitBounds(DEFAULT_BOUNDS, {
      padding: [4, 4],
    })
  }

  useEffect(() => {
    // Hindari inisialisasi ganda (strict mode / HMR)
    if (mapRef.current) return
    if (!containerRef.current) return

    // Inisialisasi peta
    const map = L.map(containerRef.current, {
      center: CENTER,
      zoom:   ZOOM,
      scrollWheelZoom: false,   // lebih nyaman untuk embed di halaman
      zoomControl: true,
    })

    // Tile layer OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map)

    focusDefaultBounds(map)
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

    const validMarkers = mapMarkers.filter(marker =>
      Number.isFinite(Number(marker.lat)) && Number.isFinite(Number(marker.lng))
    )

    validMarkers.forEach(marker => {
      const lat = Number(marker.lat)
      const lng = Number(marker.lng)
      const point = L.marker([lat, lng])

      if (marker.name) {
        point.bindTooltip(String(marker.name), {
          direction: 'top',
          sticky: true,
          opacity: 0.95,
          className: 'umkm-marker-tooltip',
        })
      }

      // Handle click to navigate
      point.on('click', () => {
        if (onMarkerClick && typeof onMarkerClick === 'function') {
          onMarkerClick(marker)
          return
        }
        if (marker.slug) {
          window.location.href = `/villages/${marker.slug}`
        }
      })

      // Make cursor pointer when hovering
      point.on('mouseover', function() {
        this._icon.style.cursor = 'pointer'
      })

      point.addTo(markerLayerRef.current)
    })

    if (useMarkerBounds && validMarkers.length) {
      const bounds = []

      validMarkers.forEach(marker => {
        const lat = Number(marker.lat)
        const lng = Number(marker.lng)

        bounds.push([lat, lng])
      })

      if (bounds.length === 1) {
        mapRef.current.setView(bounds[0], 13)
      } else {
        mapRef.current.fitBounds(bounds, { padding: [32, 32] })
      }
    } else {
      focusDefaultBounds(mapRef.current)
    }
  }, [mapMarkers, useMarkerBounds, onMarkerClick])

  return (
    <div
      ref={containerRef}
      style={{ height: `${height}px`, width: '100%', zIndex: 0 }}
      className="rounded-sm overflow-hidden"
    />
  )
}
