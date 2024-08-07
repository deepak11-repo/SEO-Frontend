import React, { useState } from "react";
import { Alert, Chip } from "@mui/material";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
import TooltipComponent from "../Tooltip/TooltipComponent";
import { useSelector } from "react-redux";

function TitleContent({ data }) {
    const [ isHovered, setIsHovered ] = useState(false);
    const { titleLoading } = useSelector((state) => state.loader);
    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(data.outputJson.optimized);
        toast.success('Copy to clipboard', {
            duration: 1300,
        });
    }

    if(titleLoading) {
        return (
            <>
                <h1>Data Loading</h1>
            </>
        );
    }

    if (data.message === "yes") {
        return (
            <div className="title-content">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg">
                    <thead className="text-xs uppercase text-white bg-gray-900 tracking-wide">
                        <tr>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Original Title <TooltipComponent msg="The title in SEO helps search engines and users understand what a webpage is about, making it easier to find and rank higher in search results."/></th>
                            <th scope="col" className="px-6 py-3" style={{ width: '240px' }}>Recommended Title <span className="bg-[#82e87a] p-[3px] ml-1 rounded-sm text-[13px] text-gray-900 normal-case">Optimized</span> <TooltipComponent msg="Recommended title is optimized according to the provided keywords, making it effective for attracting the right audience & improving SEO ranking."/></th>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Reason for Optimization</th>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Impact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b  hover:bg-gray-50 text-neutralDGrey">
                            <td className="px-6 py-4 align-top text-left leading-6 tracking-wide font-medium">{data.outputJson.title}</td>
                            <td className={`${isHovered ? 'bg-gray-100 rounded-xl ' : ''} relative flex transition-colors duration-300 px-6 py-4 align-top text-left leading-6 tracking-wide font-medium`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>{data.outputJson.optimized} {isHovered && <MdContentCopy className="ml-2 text-black absolute right-2 top-2 cursor-pointer" onClick={handleCopyToClipboard}/>}</td>
                            <td className="px-6 py-4 align-top text-left leading-6 tracking-wide font-medium">{data.outputJson.reason}</td>
                            <td className="px-6 py-4 align-top text-left leading-6 tracking-wide font-medium">{data.outputJson.impact}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <>
                <div className="w-[99%] mb-5 mt-2">
                    <Alert severity="info" sx={{width: '100%'}}>
                        <p className="text-md tracking-wide leading-6 text-neutralDGrey font-medium">Current Title is already optimized with the specified keywords, therefore additional optimization is not required.</p>
                    </Alert>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg gap-3">
                    <div className="flex-1 text-left tracking-wide leading-5">{data.title}</div>
                    <Chip label="Already Optimized" color="success"/>
                </div>
            </>
        );
    }
}

export default TitleContent;
