import { useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { useTranslation } from 'react-i18next'
import { Search, Navigation } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Card } from '../../components/cards/Card'
import { places } from '../../data/content'
import { cn } from '../../utils/helpers'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const filters = ['all', 'atm', 'bank', 'csc', 'post']

export default function Nearby() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    return places.filter((p) => {
      const matchType = filter === 'all' || p.type === filter
      const matchQuery =
        !query || p.name.toLowerCase().includes(query.toLowerCase())
      return matchType && matchQuery
    })
  }, [query, filter])

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">
      <PageHeader
        title={t('nearby.title')}
        subtitle={t('nearby.subtitle')}
        backTo="/dashboard"
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <label className="relative flex-1">
          <span className="sr-only">{t('nearby.search')}</span>
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            size={18}
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('nearby.search')}
            className="w-full pl-11 pr-4 py-3 bg-card border border-soft radius-input shadow-soft outline-none focus:ring-2 focus:ring-[var(--saathi-primary)]/30"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter by type">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              'px-4 py-2 radius-btn text-sm font-medium border transition-colors',
              filter === f
                ? 'bg-[var(--saathi-primary)] text-white border-transparent'
                : 'bg-card border-soft text-muted hover:text-ink'
            )}
          >
            {f === 'all' ? 'All' : t(`nearby.${f === 'post' ? 'post' : f}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 h-[320px] md:h-[420px] radius-card overflow-hidden border border-soft shadow-soft">
          <MapContainer
            center={[28.6139, 77.209]}
            zoom={13}
            className="h-full w-full"
            scrollWheelZoom={false}
            aria-label="Map of nearby banking locations"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filtered.map((p) => (
              <Marker key={p.id} position={[p.lat, p.lng]}>
                <Popup>
                  <strong>{p.name}</strong>
                  <br />
                  {p.distance} {t('nearby.distance')}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="lg:col-span-2 space-y-3 max-h-[420px] overflow-y-auto">
          {filtered.map((p) => (
            <Card key={p.id} hover={false} className="!p-4">
              <div className="flex justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">{p.name}</p>
                  <p className="text-sm text-muted mt-0.5 capitalize">
                    {t(`nearby.${p.type === 'post' ? 'post' : p.type}`)} · {p.distance}{' '}
                    {t('nearby.distance')}
                  </p>
                </div>
                <a
                  href={`https://www.openstreetmap.org/directions?to=${p.lat}%2C${p.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 inline-flex items-center gap-1 text-sm text-brand font-medium"
                >
                  <Navigation size={14} aria-hidden />
                  {t('nearby.directions')}
                </a>
              </div>
            </Card>
          ))}
          {filtered.length === 0 && (
            <p className="text-muted text-sm p-4">No places match your search.</p>
          )}
        </div>
      </div>
    </div>
  )
}
