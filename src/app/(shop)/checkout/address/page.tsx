import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';
import { countries } from '../../../../seed/seed-countries';
import { getCountries, getUserAddress } from '@/actions';
import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function AddressPage() {

    const countries = await getCountries();
    const session = await auth();
    if (!session?.user) {
        redirect('/auth/login?redirectTo=/checkout/address');
    }
    const { address } = await getUserAddress(session?.user.id)

    return (
        <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">



            <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

                <Title title="Dirección" subtitle="Dirección de entrega" />

                <AddressForm countries={countries} userStoredAddress={address} />

            </div>




        </div>
    );
}