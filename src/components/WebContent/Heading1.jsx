import React, { useState } from "react";
import { Alert, AlertTitle, Chip } from "@mui/material";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
import TooltipComponent from "../Tooltip/TooltipComponent";
import nodata from '../../assets/nodata.png';
import nullImg from '../../assets/null.png';

function Heading1({ data }) {
    console.log('Inside Heading1');
    console.log(data);

    const [isHovered, setIsHovered] = useState(false);

    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard', {
            duration: 1300,
        });
    };

    const originalH1Msg = "The H1 tag in SEO is crucial as it indicates the main topic of a webpage, helping search engines and users understand its content.";
    const recommendedH1Msg = "Recommended H1 is optimized with primary keywords to clearly define the page's content, improving its relevance and ranking.";

    if (data === null) {
        console.log('Data is Null');
        return (
            <div className="w-full flex flex-col justify-center items-center">
                <img src={nullImg} alt="No Data Available" className="w-1/2"/>
            </div>
        );
    }

    if (data.message === "empty") {
        console.log('Data Message is Empty');
        return (
            <>
                <div className="flex justify-end">
                    <TooltipComponent msg="Currently, the website does not contain any H1 headings or associated data." />
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <img src={nodata} alt="No Data Available" className="w-1/2"/>
                </div>
            </>
        );
    }
    
    if (data.message === "no") {
        console.log('Data Message is No');
        return (
            <>
                <div className="w-[99%] mb-5 mt-2">
                    <Alert severity="info" sx={{width: '100%'}}>
                        <p className="text-md tracking-wide leading-6 text-neutralDGrey font-medium">Current Header (H1) is already optimized with the specified keywords, therefore additional optimization is not required.</p>
                    </Alert>
                </div>
               <div className="flex items-center bg-white p-3 rounded-lg gap-3">
                    <div className="flex-1 text-justify tracking-wide leading-5">{data.h1[0]}</div>
                    <Chip label="Already Optimized" color="success"/>
                </div>
            </>
        );
    }

    if (data.message === "single") {
        console.log('Data Message is Single');
        const safeData = Array.isArray(data.optimizedResults) ? data.optimizedResults : [];

        return (
            <div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg">
                    <thead className="text-xs uppercase text-white bg-gray-900 tracking-wide">
                        <tr>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Original Heading <TooltipComponent msg={originalH1Msg}/></th>
                            <th scope="col" className="px-6 py-3" style={{ width: '230px' }}>Recommended Heading (H1) <span className="bg-[#82e87a] p-[3px] ml-1 rounded-sm text-[13px] text-gray-900 normal-case">Optimized</span> <TooltipComponent msg={recommendedH1Msg}/></th>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Reason for Optimization</th>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Impact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {safeData.map((item, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50 text-neutralDGrey">
                                <td className="px-6 py-4 align-top text-left leading-6 tracking-wide font-medium">{item.h1}</td>
                                <td
                                    className={`${isHovered ? 'bg-gray-100 rounded-xl ' : ''} relative flex transition-colors duration-300 px-6 py-4 align-top text-left leading-6 tracking-wide font-medium`}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    {item.optimized}
                                    {isHovered && 
                                        <MdContentCopy 
                                            className="ml-2 text-black absolute right-2 top-2 cursor-pointer" 
                                            onClick={() => handleCopyToClipboard(item.optimized)}
                                        />
                                    }
                                </td>
                                <td className="px-6 py-4 align-top text-left leading-6 tracking-wide font-medium">{item.reason}</td>
                                <td className="px-6 py-4 align-top text-left leading-6 tracking-wide font-medium">{item.impact}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    if (data.message === "multiple") {
        console.log('Data Message is Multiple');
        const optimizationResult = {
            optimized: data.optimizationResult.optimized,
            reason: data.optimizationResult.reason,
            impact: data.optimizationResult.impact,
        };
        const safeData = Array.isArray(data.old) ? data.old : [];
        
        return (
            <>
                <div className="w-[99%] mb-5 mt-2">
                    <Alert severity="info" sx={{width: '100%'}}>
                        <p className="text-md tracking-wide leading-6 text-neutralDGrey font-medium">Having more than one H1 header on a webpage can make it unclear what the main topic is, both for search engines and users. <br/>By using only one H1 header per page, you ensure that search engines correctly interpret and prioritize your main content topic.</p>
                    </Alert>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg">
                    <thead className="text-xs uppercase text-white bg-gray-900 tracking-wide">
                        <tr>
                            <th scope="col" className="px-6 py-3" style={{ width: '210px' }}>Current H1 Headers</th>
                            <th scope="col" className="px-6 py-3" style={{ width: '255px' }}>Recommended Heading (H1) <span className="bg-[#82e87a] p-[3px] ml-1 rounded-sm text-[13px] text-gray-900 normal-case">Optimized</span> <TooltipComponent msg={recommendedH1Msg}/></th>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Reason for Optimization</th>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Impact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b hover:bg-gray-50 text-neutralDGrey">
                            <td className="px-6 py-4 align-top text-left leading-6 tracking-wide font-medium">
                                <ul className="list-disc list-inside">
                                    {safeData.map((item, index) => (
                                        <li key={index} className="pb-1">{item}</li>
                                    ))}
                                </ul>
                            </td>
                            <td 
                                className={`${isHovered ? 'bg-gray-100 rounded-xl ' : ''} relative flex transition-colors duration-300 px-6 py-4 align-top text-left leading-6 tracking-wide font-medium`}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                {optimizationResult.optimized}
                                {isHovered && 
                                    <MdContentCopy 
                                        className="ml-2 text-black absolute right-2 top-2 cursor-pointer" 
                                        onClick={() => handleCopyToClipboard(optimizationResult.optimized)}
                                    />
                                }
                            </td>
                            <td className="px-6 py-4 align-top text-left leading-6 tracking-wide font-medium">{optimizationResult.reason}</td>
                            <td className="px-6 py-4 align-top text-left leading-6 tracking-wide font-medium">{optimizationResult.impact}</td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }

    if (data.message === "new") {
        console.log('Data message is new');
        const optimizationResult = {
            h1: data.newHeader.h1,
            reason: data.newHeader.reason,
            impact: data.newHeader.impact,
        };
        return (
        <>
            <div className="w-[99%] mb-5 mt-2">
                <Alert severity="info" sx={{width: '100%'}}>
                    <p className="text-md tracking-wide leading-6 text-neutralDGrey font-medium">No H1 Header found on this webpage.</p>
                </Alert>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg">
                    <thead className="text-xs uppercase text-white bg-gray-900 tracking-wide">
                        <tr>
                            <th scope="col" className="px-6 py-3" style={{ width: '255px' }}>Recommended Heading (H1) <span className="bg-[#82e87a] p-[3px] ml-1 rounded-sm text-[13px] text-gray-900 normal-case">New</span> <TooltipComponent msg={recommendedH1Msg}/></th>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Reason</th>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Impact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b hover:bg-gray-50 text-neutralDGrey">
                            <td 
                                className={`${isHovered ? 'bg-gray-100 rounded-xl ' : ''} relative flex transition-colors duration-300 px-6 py-4 align-top text-left leading-6 tracking-wide font-medium`}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                {optimizationResult.h1}
                                {isHovered && 
                                    <MdContentCopy 
                                        className="ml-2 text-black absolute right-2 top-2 cursor-pointer" 
                                        onClick={() => handleCopyToClipboard(optimizationResult.h1)}
                                    />
                                }
                            </td>
                            <td className="px-6 py-4 align-top text-left leading-6 tracking-wide font-medium">{optimizationResult.reason}</td>
                            <td className="px-6 py-4 align-top text-left leading-6 tracking-wide font-medium">{optimizationResult.impact}</td>
                        </tr>
                    </tbody>
            </table>
        </>
        );
    }
          

    return null;
}

export default Heading1;
