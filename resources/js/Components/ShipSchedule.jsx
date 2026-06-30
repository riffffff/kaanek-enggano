import { Plane, Ship } from 'lucide-react'

export default function ShipSchedule({ schedules = [] }) {
  return (
    <section id="transportation" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="mb-8 max-w-2xl">
          <p className="font-body text-sm font-semibold uppercase text-accent-600">Transportasi</p>
          <h2 className="mt-2 font-display text-4xl font-semibold text-neutral-800 md:text-5xl">Ship Schedule</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {schedules.map(schedule => {
            const Icon = schedule.type === 'susi_air' ? Plane : Ship

            return (
              <article key={schedule.id ?? schedule.route} className="bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Icon className="text-primary-700" size={24} />
                    <h3 className="mt-4 font-display text-2xl font-semibold">{schedule.route}</h3>
                    <p className="mt-1 text-sm text-neutral-500">{Array.isArray(schedule.days) ? schedule.days.join(', ') : schedule.days}</p>
                  </div>
                  <span className="bg-surface-100 px-2 py-1 text-xs text-surface-700">{schedule.type}</span>
                </div>
                <p className="mt-4 text-sm text-neutral-600">{schedule.departure_time} · {schedule.estimated_price}</p>
                {schedule.ticket_link ? (
                  <a href={schedule.ticket_link} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600">
                    Beli Tiket
                  </a>
                ) : schedule.agent_whatsapp_number ? (
                  <a href={`https://wa.me/${schedule.agent_whatsapp_number}?text=${encodeURIComponent(`Info schedule ${schedule.route}`)}`} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex border border-accent-500 px-4 py-2 text-sm font-semibold text-accent-600">
                    Hubungi Agen
                  </a>
                ) : null}
              </article>
            )
          })}
        </div>

        <p className="mt-4 text-xs text-neutral-500">
          Jadwal bersifat estimasi dan dapat berubah sewaktu-waktu. Konfirmasi ke pelabuhan atau agen sebelum berangkat.
        </p>
      </div>
    </section>
  )
}
