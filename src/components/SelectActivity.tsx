import {useTranslation} from "react-i18next";
import {useActivitiesLength, useSelectActivity} from "@inlaserworld/reservation-widget";


function Activity({index}: {index: number}) {
  const { t } = useTranslation();
  const { iconUrl, switchToThis, selected, translationNameTag } = useSelectActivity(index);

  return <div className={`flex md:min-w-[200px] w-[45%] md:w-[100%] md:max-w-[200px] flex-col gap-2.5 items-center cursor-pointer`}
              onClick={switchToThis}>
    {iconUrl && <img
        className={`md:w-[60px] w-[40px] rounded-full border-black border-solid border-2 p-1 
        hover:bg-ininvertedblue invert
        ${selected ? 'bg-ininvertedblue': ''}`} src={iconUrl}/>}
    <div className={`md:text-lg text-sm ${selected ? 'text-inblue' : ''}`}>{t(translationNameTag, { ns: "reservations" })}</div>
  </div>
}

export default function SelectActivity() {
  const length = useActivitiesLength();
  return <div className='flex justify-around flex-wrap gap-3'>
    {Array.from({ length }).map((_o, index) => <Activity key={`locale_button_${index}`} index={index}/>)}
  </div>
}
