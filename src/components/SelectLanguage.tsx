import {useAvailableLanguagesLength, useSelectLanguage} from "@inlaserworld/reservation-widget";

function LanguageButton({index}: {index: number}) {
  const { code, switchToThis, selected } = useSelectLanguage(index);
  return <button //className={`select-language-button ${selected ? 'selected' : ''}`}
                  className={`xl:text-2xl text-md bg-transparent border-none cursor-pointer text-white ${selected ? 'font-bold text-inblue' : ''}`}
                  onClick={switchToThis} >{code}</button>
}

export default function SelectLanguage() {
  const length = useAvailableLanguagesLength();
  return <div className='flex p-2.5 gap-2.5'>
    {Array.from({ length }).map((_o, index) => <LanguageButton key={`locale_button_${index}`} index={index}/>)}
  </div>
}
