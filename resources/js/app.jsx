import '../css/app.css'
import './bootstrap'
import './i18n'

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import AppLayout from './Layouts/AppLayout'

createInertiaApp({
  title: title => {
    const site = 'Jelajah Enggano'
    if (!title) return site
    return title.includes(site) ? title : `${title} | ${site}`
  },
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    const page = pages[`./Pages/${name}.jsx`]

    page.default.layout = page.default.layout ?? (page => <AppLayout>{page}</AppLayout>)

    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
  progress: {
    color: '#eb8314',
  },
})
