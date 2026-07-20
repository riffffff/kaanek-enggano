import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher({ solid = false }) {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage('id')}
        className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
          i18n.language === 'id'
            ? 'bg-primary-700 text-white'
            : solid
              ? 'text-neutral-600 hover:text-primary-700'
              : 'text-white/75 hover:text-white'
        }`}
      >
        ID
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
          i18n.language === 'en'
            ? 'bg-primary-700 text-white'
            : solid
              ? 'text-neutral-600 hover:text-primary-700'
              : 'text-white/75 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  )
}
