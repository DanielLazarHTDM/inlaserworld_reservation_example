import {useToast} from "./ui/use-toast";
import {useTranslation} from "react-i18next";
import {ClipLoader} from "react-spinners";
import {useCheckLocale, useSaveButton} from "@inlaserworld/reservation-widget";

export default function SaveButton() {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const localeExistsInList = useCheckLocale(i18n.language);

  const locale = localeExistsInList ? i18n.language :
      (Array.isArray(i18n.options.fallbackLng) ? i18n.options.fallbackLng[0] : i18n.options.fallbackLng) ;
  const onSaved = () => {
    toast({
      title: t('confirmToastTitle'),
      description: t('confirmToastDescription'),
    })
  }
  const { save, loading, error } = useSaveButton({onSaved, actualLanguage: locale});

  return <>
    <button className='p-5 font-bold bg-gradient-to-br from-[#0061C8] to-inblue hover:from-inblue hover:to-inblue text-white font-semibold py-2 px-4 rounded shadow-md'
            onClick={save}>
      {loading ? <ClipLoader/> : t('submit')}
    </button>
    {error && <div className='text-red-500 mt-[4px] ml-[10px]'>{t(error)}</div>}
  </>
}
