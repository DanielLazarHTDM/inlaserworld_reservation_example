import { useContextSelector } from "use-context-selector";
import { useTranslation } from "react-i18next";
import React from "react";
import {groupTranslationName, useGroupCount, useGroupLength, useMainVisitorCount, ReservationContext} from "@inlaserworld/reservation-widget";

function GroupCount({index}: {index: number}){
  const { setGroupCount, max, value } = useGroupCount(index);

  return <select className='group-[.error]:border-red' value={value || ''} onChange={(e) => {
    setGroupCount(Number((e.target as HTMLSelectElement).value))
  }}>
    {Array.from({ length: max + 1 }).map((_o, i) => <option key={i}>{i}</option>)}
  </select>
}

function Group({index}: {index: number}) {
  const { t } = useTranslation();
  const error = useContextSelector(ReservationContext,
    v => v.errors?.visitorCount || '');

  return <div className={`group ${error ? 'error' : ''}`}>
    <div className="name">
      {t(groupTranslationName(index), { ns: "reservations" })}
    </div>
    <GroupCount index={index}/>
  </div>
}

function SelectVisitorNumber(){
  const { visitorCount, setCount, min, max } = useMainVisitorCount();
  return (
    <select value={visitorCount} onChange={(e) =>
      setCount(Number((e.target as HTMLSelectElement).value))}>
      {Array.from({ length: max - min + 1 }).map((_o, i) => <option key={i}>{min + i}</option>)}
    </select>
  )
}

export default function Groups() {
  const { t } = useTranslation();
  const length = useGroupLength();
  // Render when setting change, id is not used really
  const id = useContextSelector(ReservationContext,
    v => v.state.setting.id);

  return <div className='flex flex-col gap-2'>
    <h2>{`2. ${t('translationReservationVisitorCount', { ns: "reservations" })}`}</h2>
    <SelectVisitorNumber/>
    {Array.from({ length }).map((_o, i) => <Group key={i} index={i}/>)}
  </div>
}