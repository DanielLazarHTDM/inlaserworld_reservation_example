import {usePrimitive, useTermsUrl, ReservationContext} from "@inlaserworld/reservation-widget";
import { ChangeEvent } from "react";
import {useTranslation} from "react-i18next";
import {useContextSelector} from "use-context-selector";


export default function TermsAndConditions() {
  const url = useTermsUrl();
  const { t } = useTranslation();
  const { value, setReservationPrimitive } = usePrimitive('termsAndConditionAgree');
  const error = useContextSelector(ReservationContext, v => v.errors.termsAndConditionAgree || '') as string;

  const onChange_ = (e: ChangeEvent<HTMLInputElement>) => {
    setReservationPrimitive(e.target.checked);
  };

  return <div>
    <div className='flex gap-5 p-2.5 text-white'>
      <input checked={value} onChange={onChange_} type='checkbox'/>
      <a className='underline' target="_blank" href={url}>{t('termsAndConditionAgree')}</a>
    </div>
    {error && <div className='text-red-500 ml-[10px]'>{t(error)}</div>}
  </div>
}
