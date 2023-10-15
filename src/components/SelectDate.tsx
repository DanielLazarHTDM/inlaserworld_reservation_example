import moment from "moment";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import { useSelectDate } from "@inlaserworld/reservation-widget";

export default function SelectDate() {
  const { t } = useTranslation();
  const { date, setNewDate } = useSelectDate();

  return <div>
    <h2>{`3. ${t('date')}`}</h2>
    <div className='flex justify-center'>
      <DatePicker
        open
        selected={date.length ? moment(date).toDate() : new Date()}
        inline
        dateFormat='dd.MM.yyyy'
        minDate={new Date()}
        onChange={setNewDate}/>
    </div>
  </div>
}