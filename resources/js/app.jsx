import '../css/app.css'
import './bootstrap'
import './i18n'

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import AppLayout from './Layouts/AppLayout'

createInertiaApp({
  title: title => (title ? `${title} - Web Enggano` : 'Web Enggano'),
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
