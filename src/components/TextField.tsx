import {useTranslation} from "react-i18next";
import {usePrimitive, useUserInfoField, IReservation, IUserInfo} from "@inlaserworld/reservation-widget";

export function TextNote({label, name, ...props}:
                                        { label: string, name: keyof IReservation, type: string }) {
  const { value, setReservationPrimitive } = usePrimitive('note');
  const { t } = useTranslation();
  return (
    <div className='flex gap-2.5 items-center group'>
      <div className='flex-1 pl-2.5 text-white'>
        {label}
      </div>
      <div className='flex-[1.5] w-[100%]'>
        <textarea onChange={(e) => setReservationPrimitive((e.target as HTMLTextAreaElement).value)}
                  placeholder={t(name as string)}
                  className='placeholder-gray-400 p-2.5 min-h-[100px]
                 group-[.error]:border-red-500
                 border-2 rounded-md w-[100%] border-gray-500'
                  value={value as string} {...props} />
      </div>
    </div>
  );
}
export default function TextUserField({label, name, ...props}:
{ label: string, name: keyof IUserInfo, type: string }) {


  const { value, setUserInfoValue, error } = useUserInfoField(name);

  const { t } = useTranslation();
  return (
    <div>
      <div className={`flex gap-2.5 items-center group ${error ? 'error' : ''}`}>
        <div className='flex-1 pl-2.5 text-white'>
          {label}
        </div>
        <div className='flex-[1.5] w-[100%]'>
          <input onChange={(e) => setUserInfoValue((e.target as HTMLInputElement).value)}
                 placeholder={t(name as string)}
                 className='placeholder-gray-400 p-2.5
                 group-[.error]:border-red-500
                 border-2 rounded-md w-[100%] border-gray-500'
                 value={value as string} {...props} />
          {error && <div className='text-red-500 mt-[4px] ml-[10px]'>{t(error)}</div>}
        </div>
      </div>
    </div>

  );
};
