import Groups from "./components/Groups";
import SelectLanguage from './components/SelectLanguage';
import SelectDate from "./components/SelectDate";
import SelectTime from "./components/SelectTime";
import TextUserField, {TextNote} from './components/TextField';
import { useTranslation } from "react-i18next";
import SelectActivity from "./components/SelectActivity";
import Summary from "./components/Summary";
import { ClipLoader } from "react-spinners";
import { Toaster } from "./components/ui/Toaster";
import SelectEntry from "./components/SelectEntry";
import SaveButton from './components/SaveButton';
import './i18n'
import '../index.css'
import logo from '../inlogo.svg'
import "react-datepicker/dist/react-datepicker.css"
import {AppProps, ReservationStateProvider, useApp} from '@inlaserworld/reservation-widget';
import TermsAndConditions from "./components/TermsAndConditions";
import i18n from "i18next";

function CredentialsForm() {
    const { t } = useTranslation();

    return (
        <div className='flex 2xl:px-32 lg:px-10 px-1 '>
            <div className='flex flex-col lg:p-5 lg:gap-5 p-1 gap-2 flex-[3.5]'>
                <h2 className='text-white'>{t(`yourCredentials`)}</h2>
                <TextUserField name="name" type="text" label={t(`name`)} />
                <TextUserField name="surname" type="text" label={t(`surname`)} />
                <TextUserField name="email" type="email" label={t(`Email`)} />
                <TextUserField name="telNumb" type="text" label={t(`telNumb`)} />
                <TextNote name="note" type="text" label={t(`note`)} />
                <TermsAndConditions/>
                <SaveButton/>
            </div>
            <div className='md:flex-[2]'/>
        </div>

    )
}

function App(props: AppProps) {

    const baseApiLoaded = () => {
        if(props.fallbackLng) {
            i18n.options.fallbackLng = props.fallbackLng
        }
        i18n.reloadResources();
    }

    const { loading, requiredAttributeMissing } = useApp({
        ...props,
        baseApiLoaded,
        i18n
    });

    if(loading) {
        return <div className='main-loading'>
            <ClipLoader size={36} />
        </div>;
    }

    if(requiredAttributeMissing) {
        return <h1>ReservationId or TenantId not provided</h1>
    }

    return (
        <div className='flex flex-col bg-inbackground'>
            <Toaster/>

            <div className='flex flex-col mb-5 gap-y-5 p-5 bg-inheaderbg  text-white '>
                <div className='flex mb-5 2xl:px-32 lg:px-10 px-1 justify-between items-center'>
                    <img className='sm:h-[50px] h-[20px]' src={logo} alt='logo'/>
                    <SelectLanguage/>
                </div>
                <SelectActivity/>
                <SelectEntry/>
            </div>
            <div className="flex flex-col md:flex-row gap-5 2xl:px-32 lg:px-10 px-1 ">
                <div className="flex flex-1 flex-col gap-5 text-white">
                    <Groups/>
                    <SelectDate/>
                </div>
                <div className="flex-[2.5] text-white">
                    <SelectTime/>
                </div>
                <div className="flex-[2]">
                    <Summary/>
                </div>
            </div>
            <CredentialsForm/>
        </div>
    );
}

export default function (){
    return <ReservationStateProvider>
        <App tenantUuid='1494deec-f52e-4bc0-9184-abc8c1426277' reservationId={1} fallbackLng='en' tenantId={8} />
    </ReservationStateProvider>
}
