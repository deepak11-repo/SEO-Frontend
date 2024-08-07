import React from 'react'
import { BiSitemap } from 'react-icons/bi'
import { FaCheckCircle, FaMobileAlt } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { LiaRobotSolid } from 'react-icons/lia'
import { MdOutlineHttps } from 'react-icons/md'

const TechnicalSEO = ({ data }) => {
    console.log(data);
    return (
        <div className='flex flex-col gap-5 pt-5 justify-start items-center'>

            <div className='flex flex-row justify-between p-5 w-[85%] rounded-2xl bg-white shadow-xl'>
                <div className='flex flex-row gap-2 items-center'>
                    <LiaRobotSolid className='text-gray-700' />
                    <div className='font-bold tracking-wide text-gray-700'>Robots.txt</div>
                </div>
                <div className='flex flex-col gap-2 justify-end items-end'>
                    {data.technicalSEO.hasRobotsTxt.exists ? (
                        <>
                            <FaCheckCircle className='text-green-500 text-2xl' />
                            <a href={data.technicalSEO.hasRobotsTxt.finalUrl} target="_blank" rel="noopener noreferrer" className='text-gray-700 text-sm font-semibold tracking-wide cursor-pointer hover:text-blue-600'>
                                {data.technicalSEO.hasRobotsTxt.finalUrl}
                            </a>
                        </>
                    ) : (
                        <ImCross className='text-red-500 text-2xl' />
                    )}
                </div>
            </div>

            <div className='flex flex-row justify-between p-5 w-[85%] rounded-2xl bg-white shadow-xl'>
                <div className='flex flex-row gap-2 items-center'>
                    <BiSitemap className='text-gray-700' />
                    <div className='font-bold tracking-wide text-gray-700'>XML Sitemaps</div>
                </div>
                <div className='flex flex-col gap-2 justify-end items-end'>
                    {data.technicalSEO.hasSitemapXml.exists ? (
                        <>
                            <FaCheckCircle className='text-green-500 text-2xl' />
                            <a href={data.technicalSEO.hasSitemapXml.finalUrl} target="_blank" rel="noopener noreferrer" className='text-gray-700 text-sm font-semibold tracking-wide cursor-pointer hover:text-blue-600'>
                                {data.technicalSEO.hasSitemapXml.finalUrl}
                            </a>
                        </>
                    ) : (
                        <ImCross className='text-red-500 text-2xl' />
                    )}
                </div>
            </div>

            <div className='flex flex-row justify-between p-5 w-[85%] rounded-2xl bg-white shadow-xl'>
                {data.technicalSEO.hasHttpStatus.exists ? (
                    <>
                        <div className='flex flex-row gap-2 items-center'>
                            <MdOutlineHttps className='text-gray-700' />
                            <div className='font-bold text-gray-700'>HTTP Status:</div>
                            <div className='text-gray-700 font-bold'>
                                {data.technicalSEO.hasHttpStatus.statusCode} ({data.technicalSEO.hasHttpStatus.statusText})
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 justify-end items-end'>
                            <FaCheckCircle className='text-green-500 text-2xl' />
                            <a
                                href={data.technicalSEO.hasHttpStatus.finalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='text-gray-700 text-sm font-semibold tracking-wide cursor-pointer hover:text-blue-600'
                            >
                                {data.technicalSEO.hasHttpStatus.finalUrl}
                            </a>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='flex flex-row gap-2 items-center'>
                            <MdOutlineHttps className='text-gray-700' />
                            <div className='font-bold text-gray-700'>HTTP Status</div>
                        </div>
                        <div className='flex flex-col gap-2 justify-end items-end'>
                            <ImCross className='text-red-500 text-2xl' />
                        </div>
                    </>
                )}
            </div>

            <div className='flex flex-row justify-between p-5 w-[85%] rounded-2xl bg-white shadow-xl'>
                <div className='flex flex-row gap-2 items-center'>
                    <FaMobileAlt className='text-gray-700' />
                    <div className='font-bold tracking-wide text-gray-700'>Mobile Friendly</div>
                </div>
                <div className='flex flex-col gap-2 justify-end items-end'>
                    {data.mobileFriendly.isMobileFriendly ? (
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

export default TechnicalSEO