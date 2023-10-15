import {useTranslation} from "react-i18next";
import {useSelectTime, useSelectTimeItem } from "@inlaserworld/reservation-widget";

interface TimeItemProps {
  startTime: string;
  index: number;
  maxPlayers: number;
}

function TimeItem({startTime, index, maxPlayers}: TimeItemProps) {
  const { time, occupiedState, toggleThis, selected, occupiedCount } = useSelectTimeItem(index, startTime);

  let state = 'bg-[#549315] cursor-pointer'
  if(occupiedState === 'full') {
    state = 'bg-[#797979] cursor-not-allowed'
  } else if (occupiedState === 'error') {
    state = 'bg-red cursor-not-allowed'
  }
  // 797979
  return <div onClick={toggleThis} className={`
   lg:w-[24%] w-[30%] flex flex-col p-1.5 gap-1.5 text-white rounded-md
   ${state}`}>
    <div className="flex gap-2.5 font-bold lg:text-lg text-sm">
      <input readOnly checked={selected} type="checkbox"/>
      {time}
    </div>
    <div>{`${occupiedCount}/${maxPlayers}`}</div>
  </div>
}

export default function SelectTime() {
  const { t } = useTranslation();

  const {
    interval,
    maxPlayers,
    useHappyHours,
    closedHappy,
    closed,
    startTime,
    minutesDiffHappy,
    startTimeHappy,
    minutesDiff
  } = useSelectTime();

  if(closed) {
    return <div className="absolute top-[40%] left-[40%] text-gray-400 rotate-45 text-6xl">
      {`${t('closed')}`}
    </div>
  }


  return <div className='flex flex-col gap-2.5'>
    <h2>{`4. ${t('time')}`}</h2>
    {(!closedHappy && useHappyHours && startTimeHappy < startTime) && <div style={{ marginBottom: 20 }}
                                                                           className="justify-center flex flex-wrap lg:gap-1.5 gap-0.5">
      {interval > 0 && Array.from({ length: minutesDiffHappy / interval }).map((_o, i) =>
        <TimeItem
          index={i}
          maxPlayers={maxPlayers}
          startTime={startTimeHappy}
          key={i}/>)}
    </div>}
    <div className="justify-center flex flex-wrap lg:gap-1.5 gap-0.5 items-center">
      {interval > 0 && Array.from({ length: minutesDiff / interval }).map((_o, i) =>
        <TimeItem
          index={i}
          maxPlayers={maxPlayers}
          startTime={startTime}
          key={i}/>)}
    </div>
    {(!closedHappy && useHappyHours && startTimeHappy > startTime) && <div style={{ marginTop: 20 }}
                                                                           className="justify-center flex flex-wrap lg:gap-1.5 gap-0.5">
      {interval > 0 && Array.from({ length: minutesDiffHappy / interval }).map((_o, i) =>
        <TimeItem
          index={i}
          maxPlayers={maxPlayers}
          startTime={startTimeHappy}
          key={i}/>)}
    </div>}
  </div>
}