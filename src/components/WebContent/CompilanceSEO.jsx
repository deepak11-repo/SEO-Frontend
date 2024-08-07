import React from 'react'
import { AiFillDatabase } from 'react-icons/ai'
import { FaCheckCircle, FaExternalLinkSquareAlt } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'


const CompilanceSEO = ({ data }) => {
    return (
        <div className='flex flex-col gap-5 pt-5 justify-start items-center'>
            <div className='flex flex-row justify-between p-5 w-[85%] rounded-2xl bg-white shadow-xl'>
                <div className='flex flex-row gap-2 items-center'>
                    <FaExternalLinkSquareAlt className='text-gray-700' />
                    <div className='font-bold tracking-wide text-gray-700'>Canonical Tags</div>
                </div>
                <div className='flex flex-col gap-2 justify-end items-end'>
                    {data.canonicalTag.hasCanonicalTags ? (
                        <>
                            <FaCheckCircle className='text-green-500 text-2xl' />
                        </>
                    ) : (
                        <ImCross className='text-red-500 text-2xl' />
                    )}
                </div>
            </div>
            <div className='flex flex-row justify-between p-5 w-[85%] rounded-2xl bg-white shadow-xl'>
                <div className='flex flex-row gap-2 items-center'>
                    <AiFillDatabase className='text-gray-700' />
                    <div className='font-bold tracking-wide text-gray-700'>Structured Data</div>
                </div>
                <div className='flex flex-col gap-2 justify-end items-end'>
                    {data.structuredData.exists && data.structuredData.isValid ? (
                        <>
                            <FaCheckCircle className='text-green-500 text-2xl' />
                        </>
                    ) : (
                        <ImCross className='text-red-500 text-2xl' />
                    )}
                </div>
            </div>
        </div>
    )
}

export default CompilanceSEO