import { useTranslation } from 'react-i18next'

export function useTranslate(ns = 'common') {
  const { t, i18n } = useTranslation(ns)

  const tt = (idText, enKey) => {
    if (i18n.language === 'id') {
      return idText
    }
    return enKey ? t(enKey) : idText
  }

  return { tt, i18n, t }
}
