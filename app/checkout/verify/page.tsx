import React from 'react';
import { verifyPayment } from "@/actions/checkout";
import VerifyResult from "@/components/checkout/VerifyResult";


type SearchParams = Promise<{ reference?: string }>;


export default async function VerifyPage({ searchParams }: { searchParams: SearchParams}) {

    const { reference } = await searchParams;

    if(!reference) {
        return (
            <VerifyResult 
                success={false}
                message="No payment reference was provided"
            />
        )
    }

    const result = await verifyPayment(reference);

    return <VerifyResult { ...result } />
}