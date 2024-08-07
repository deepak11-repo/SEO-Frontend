import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import Pagination from "../Pagination/Pagination";
import { Alert, Chip } from "@mui/material";
import toast from "react-hot-toast";
import TooltipComponent from "../Tooltip/TooltipComponent";
import nodata from '../../assets/nodata.png';
import nullImg from '../../assets/null.png';

function Heading3({ data }) {
    console.log('Inside Heading3');
    console.log(data);

    const safeData = Array.isArray(data) ? data : [];

    if (data === null) {
        return (
            <div className="w-full flex flex-col justify-center items-center">
                <img src={nullImg} alt="No Data Available" className="w-1/2"/>
            </div>
        );
    }

    if (data.message === "empty") {
        return (
            <>
                <div className="w-[99%] mb-5 mt-2">
                    <Alert severity="info" sx={{width: '100%'}}>
                        <p className="text-md tracking-wide leading-6 text-neutralDGrey font-medium">Currently, the website does not contain any H3 headings or associated data.</p>
                    </Alert>
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <img src={nodata} alt="No Data Available" className="w-1/2"/>
                </div>
            </>
        );
    }

    if (data.message === "optimized") {
        return (
            <>
                <div className="w-[99%] mb-5 mt-2">
                    <Alert severity="info" sx={{width: '100%'}}>
                        <p className="text-md tracking-wide leading-6 text-neutralDGrey font-medium">Current Header (H3) is already optimized with the specified keywords, therefore additional optimization is not required.</p>
                    </Alert>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg gap-3">
                    <div className="flex-1 text-justify tracking-wide leading-5">The H3 header is already fully optimized and meets all the required SEO criteria.</div>
                    <Chip label="Already Optimized" color="success"/>
                </div>
            </>
        );        
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = safeData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(safeData.length / itemsPerPage);
    const [isHovered, setIsHovered] = useState(null);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copy to clipboard', {
            duration: 1300,
        });
    };

    const originalSubheadingsMsg = "Subheadings (H2 - H6) in SEO help organize content into sections, making it easier for users and search engines to navigate and understand.";
    const recommendedSubheadingsMsg = "Recommended subheadings are optimized with relevant keywords to enhance readability and SEO performance by structuring content effectively.";

    return (
        (safeData.length > 0 && (
            <div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg">
                    <thead className="text-xs uppercase text-white bg-gray-900 tracking-wide">
                        <tr>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Heading (H3) <TooltipComponent msg={originalSubheadingsMsg}/></th>
                            <th scope="col" className="px-6 py-3" style={{ width: '230px' }}>Recommended Heading (H3) <span className="bg-[#82e87a] p-[3px] ml-1 rounded-sm text-[13px] text-gray-900 normal-case">Optimized</span> <TooltipComponent msg={recommendedSubheadingsMsg}/></th>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Reason</th>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Impact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50 text-neutralDGrey">
                                <td className="px-6 py-4 align-top text-left leading-6 tracking-wide font-medium">{item.h3}</td>
                                <td 
                                    className={`${isHovered === index ? 'bg-gray-100 rounded-xl ' : ''} relative flex transition-colors duration-300 px-6 py-4 align-top text-left leading-6 tracking-wide font-medium`}
                                    onMouseEnter={() => setIsHovered(index)}
                                    onMouseLeave={() => setIsHovered(null)}
                                >
                                    {item.optimized} 
                                    {isHovered === index && 
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
                {safeData.length > itemsPerPage && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                )}            
            </div>
        ))
    );
}

export default Heading3;
