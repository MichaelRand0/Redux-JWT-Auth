import _auth from './auth'
import { BASELANG, ITranslation } from './typings'

export function selectLocale<T extends string>(
  dictionary: Record<T, ITranslation>,
  lang: keyof ITranslation = BASELANG,
) {
  const res: { [key: string]: string } = {}

  for (let [k, v] of Object.entries<ITranslation>(dictionary)) {
    res[k] = v.hasOwnProperty(lang) ? v[lang]! : v[BASELANG]
  }

  return res as Record<T, string>
}

export const i18n = {
  _auth: selectLocale(_auth)
}
