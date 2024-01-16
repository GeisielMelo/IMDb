import React, { useState } from 'react'
import { useLanguages, Languages } from '../../hooks/useLanguages'

export const Language: React.FC = () => {
  const { locale, setLanguage } = useLanguages()
  const [selectedLanguage, setSelectedLanguage] = useState<string>(locale)

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value as Languages)
    setLanguage(event.target.value as Languages)
  }

  return (
    <select
      className='hidden md:block border-none bg-[rgba(18,18,18,255)] text-white'
      value={selectedLanguage}
      onChange={handleLanguageChange}
    >
      <option value='en-US'>EN</option>
      <option value='pt-BR'>PT</option>
      <option value='es-ES'>ES</option>
      <option value='de-DE'>DE</option>
      <option value='fr-FR'>FR</option>
    </select>
  )
}
