import {useTranslation} from "react-i18next";
import moment from "moment";
import { Icon } from '@iconify/react';
import {
  useCurrency,
  useItemsLength,
  useSummary,
  useSummaryActivity,
  useSummaryActivityEntry,
  useSummaryItem,
  useSummaryItemDelete,
  useSummaryItemPrice,
  useSummaryVisitorCount,
  useSummaryVisitorGroup,
  useVisitorCount,
} from "@inlaserworld/reservation-widget";

function SummaryItemDelete({index}: {index: number}) {
  const { deleteThis } = useSummaryItemDelete(index);
  return <button className='bg-transparent border-none' onClick={deleteThis}>
    <Icon fontSize={14} icon="akar-icons:cross" />
  </button>
}

function SummaryItemGroup({groupIndex, itemIndex, first}: {groupIndex: number, itemIndex: number, first: boolean}) {
  const { t } = useTranslation();
  const { visitorCount, count, error, setGroupVisitorCount, groupTranslationName } = useSummaryVisitorGroup(itemIndex, groupIndex);
  return <div className={`flex min-w-[40px] xl:relative ${error ? 'error' : ''}`}>
    {first && <label className='xl:absolute xl:-top-6 text-sm'>{t(groupTranslationName, { ns: "reservations" })}</label>}
    <select className='border-none p-[0px]' value={count || 0} onChange={(e) => {
      setGroupVisitorCount(Number((e.target as HTMLSelectElement).value))
    }}>
      {Array.from({ length: visitorCount + 1 }).map((_o, i) => <option key={i}>{i}</option>)}
    </select>
  </div>
}

function SummaryItemVisitorCounts({index}: {index: number}) {
  const visitorCount = useVisitorCount(index);
  const {setVisitorCount, min, max} = useSummaryVisitorCount(index);
  return (
    <select className='border-none max-w-[40px] p-[0px]' value={visitorCount || 0} onChange={(e) =>
      setVisitorCount(Number((e.target as HTMLSelectElement).value))}>
      {Array.from({ length: max - min + 1 }).map((_o, i) => <option key={i}>{min + i}</option>)}
    </select>
  )
}

function SummaryItemPrice({index}: {index: number}) {
  const price = useSummaryItemPrice(index);
  return <div>
    {price}
  </div>
}

function SummaryItem({index, activityId, entryIdSetting, activityIndex, first}: {
  index: number, activityId: number, entryIdSetting?: number, activityIndex: number, first: boolean}) {
  const {
    disableRender,
    error,
    time,
    interval,
    visitorGroupsLength,
    date,
    occupiedCount
  } = useSummaryItem(index, activityId, activityIndex, entryIdSetting);
  const currency = useCurrency();
  if(disableRender) {
    return null;
  }

  return <div className='flex lg:gap-8 gap-1 items-center odd:bg-inblue even:bg-gray-100 p-1 rounded'>
    <div className='flex-1'>
      <div className={`flex xl:flex-row flex-col gap-0.5 ${occupiedCount ? 'error' : ''}`}>
        <div className='flex gap-1 items-center'>
          <Icon icon="material-symbols:calendar-month" />
          <div>{moment(date).format("DD.MM.YYYY")}</div>
        </div>
        <div className='flex gap-1 items-center'>
          <Icon icon="ic:round-access-time"/>
          <div>{`${time} - ${moment(date + " " + time + ":00").add(interval, "minutes" ).format("HH:mm")}`}</div>
        </div>
        <div className='flex gap-1 items-center'>
          <Icon icon="mdi:human-male" />
          <SummaryItemVisitorCounts index={index}/>
        </div>

        {visitorGroupsLength > 0 &&
            <div className={`flex gap-10 flex-1 items-center ${error ? 'text-red-500' : ''}`}>
              {Array.from({ length: visitorGroupsLength }).map((_o, i) => {
                return <SummaryItemGroup first={first} key={`summary_item_group_${i}`} groupIndex={i} itemIndex={index}/>
              })}
            </div>}
        <div className='flex gap-1.5 items-center flex-1 xl:justify-end'>
          <Icon icon="healthicons:money-bag" />
          <SummaryItemPrice index={index}/>
          <div>{currency}</div>
        </div>
      </div>
    </div>
    <SummaryItemDelete index={index}/>
  </div>
}

function EntrySetting({entryIndex, activityIndex}: {entryIndex: number, activityIndex: number}) {
  const { t } = useTranslation();
  const { entryId, activityId, activityItemLength, finalPrice, activityEntryTranslationTag, firstIndex }
    = useSummaryActivityEntry(activityIndex, entryIndex);
  const currency = useCurrency();
  const itemsLength = useItemsLength();
  if(activityItemLength === 0) {
    return null;
  }

  return <div className=''>
    <div className='text-md text-white'>{`${t(`setting_name_${activityIndex}`, { ns: "reservations" })} - ${
      t(activityEntryTranslationTag, { ns: "reservations" })}`}</div>
    <div className='flex flex-col lg:gap-1 gap-3'>
      {Array.from({ length: itemsLength }).map((_o, i) =>
        <SummaryItem first={firstIndex === i} entryIdSetting={entryId} activityId={activityId} activityIndex={activityIndex} key={`summary_item_entry_${i}`} index={i} />)}
    </div>
    <div className='flex gap-1.5 items-center justify-end xl:mr-[45px] mt-[8px] text-white'>
      <Icon icon="healthicons:money-bag" />
      <div>{finalPrice}</div>
      <div>{currency}</div>
    </div>
  </div>
}

function Activity({index}: {index: number}) {
  const { t } = useTranslation();
  const {
    activityId,
    activityItemLength,
    entriesLength, translationNameTag, finalPrice, firstIndex } = useSummaryActivity(index);
  const currency = useCurrency();
  const itemsLength = useItemsLength();
  if(activityItemLength === 0) {
    return null;
  }

  if(entriesLength > 0) {
    return <>
      {Array.from({ length: entriesLength }).map((_o, iEntry) =>
        <EntrySetting key={`summary_entry_setting_${index}`} activityIndex={index} entryIndex={iEntry}/>)}
    </>
  }

  return <div className=''>
    <div className='text-md text-white'>{t(translationNameTag, { ns: "reservations" })}</div>
    <div className='flex flex-col lg:gap-1 gap-3'>
      {Array.from({ length: itemsLength }).map((_o, i) =>
        <SummaryItem first={firstIndex === i} activityIndex={index} activityId={activityId} key={`summary_item_${index}`} index={i} />)}
    </div>
    <div className='flex gap-1.5 items-center justify-end xl:mr-[45px] mt-[8px] text-white'>
      <Icon icon="healthicons:money-bag" />
      <div>{finalPrice}</div>
      <div>{currency}</div>
    </div>
  </div>
}

export default function Summary() {
  const { t } = useTranslation();
  const { activitiesLength, finalPrice, error } = useSummary();
  const currency = useCurrency();

  return <div className='lg:fixed lg:max-h-[500px] lg:overflow-auto'>
    <h2 className='text-white'>{`5. ${t('summary')}`}</h2>
    <div className='flex flex-col gap-5'>
      {Array.from({ length: activitiesLength }).map((_o, index) =>
        <Activity key={`summary_group_${index}`} index={index} />)}
    </div>
    <div className='text-red-500 mt-[4px] ml-[10px]'>{t(error)}</div>
    <div className='flex justify-end xl:mr-[45px] mt-[10px] text-white'>
      {finalPrice ? <div>{`${t('total')}: ${finalPrice ? finalPrice : ''} ${currency}`}</div> : null}
    </div>
  </div>
}
