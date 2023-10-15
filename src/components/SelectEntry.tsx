import { useTranslation } from "react-i18next";
import {useActivityEntriesLength, useSelectActivityEntry} from "@inlaserworld/reservation-widget";


function Entry({index}: {index: number}) {
  const { t } = useTranslation();
  const { translationNameTag, switchToThis, selected } = useSelectActivityEntry(index);
  return <button className={`border-none ${selected  ? 'font-bold text-inblue' : ''}`}
              onClick={switchToThis}>
    <div>{t(translationNameTag, { ns: "reservations" })}</div>
  </button>
}

export default function SelectEntry() {
  const length = useActivityEntriesLength();
  if(length === 0) {
    return null;
  }
  return <div className='flex justify-center gap-5'>
    {Array.from({ length }).map((_o, index) => <Entry key={`select_entry_button_${index}`} index={index}/>)}
  </div>
}
