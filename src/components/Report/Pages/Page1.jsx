import React from 'react'
import company from '../../../assets/company.png'
import companyName from '../../../assets/companyName.png'
import cLogo from '../../../assets/clogo.jpg'
import webIcon from '../../../assets/webIcon.png'
import { useSelector } from 'react-redux'

const Page1 = () => {
    const url = useSelector((state) => state.inputs.url);
    return (
        <>
            <div className='p-6'>
                <img src={company} alt="wisdmlabs" className='w-[75px]' />
            </div>
            <div className='my-[15%] mx-[15%]'>
                <img src={cLogo} alt="wisdmlabs" className='w-[150px] ml-[35%]' />
                <img src={companyName} alt="wisdmlabs" className='w-[550px]' />
            </div>
            <div>
                <div className='p-8'>
                    <div className='text-[45px] font-semibold tracking-wide leading-[50px] text-[#f27160]'>SEO</div>
                    <div className='text-[45px] font-semibold tracking-wide leading-[50px] text-[#38241e]'>AUDIT</div>
                    <div className='text-[75px] font-bold tracking-wider leading-[70px] text-[#931b1c]'>REPORT</div>
                </div>
                <div className='py-[90px] px-8 bg-[#d9d9d9] '>
                    <div className='text-2xl tracking-wide pb-3'>Presented To: {url}</div>
                    <div className='text-2xl tracking-wide pl-8 flex gap-3 items-center'>
                        <img src={webIcon} alt='webIcon' className='w-6 h-6'/>
                        <div>www.wisdmlabs.com</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page1