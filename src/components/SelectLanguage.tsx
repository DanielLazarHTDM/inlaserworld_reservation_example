import {useAvailableLanguagesLength, useSelectLanguage} from "@inlaserworld/reservation-widget";
import {useTranslation} from "react-i18next";

function LanguageButton({index}: {index: number}) {
  const { i18n } = useTranslation();
  const { code, selected } = useSelectLanguage(index, i18n.language);
  return <button //className={`select-language-button ${selected ? 'selected' : ''}`}
                  className={`xl:text-2xl text-md bg-transparent border-none cursor-pointer text-white ${selected ? 'font-bold text-inblue' : ''}`}
                  onClick={() => i18n.changeLanguage(code)} >{code}</button>
}

export default function SelectLanguage() {
  const length = useAvailableLanguagesLength();
  return <div className='flex p-2.5 gap-2.5'>
    {Array.from({ length }).map((_o, index) => <LanguageButton key={`locale_button_${index}`} index={index}/>)}
  </div>
}
