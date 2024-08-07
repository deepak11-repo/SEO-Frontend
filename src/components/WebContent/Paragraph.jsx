import React, { useState } from "react";
import Pagination from "../Pagination/Pagination";
import { Chip } from "@mui/material";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
import TooltipComponent from "../Tooltip/TooltipComponent";

function Paragraph({ data }) {
    console.log('Inside Paragraph');
    
    const safeData = Array.isArray(data) ? data : [];

    if (safeData.length === 0 || data.message === "empty") {
        return (
            <p>No data available</p>
        );
    }

    if (data.message === "optimized") {
        return (
            <div className="flex items-center bg-white p-3 rounded-lg gap-3">
                <div className="flex-1 text-justify tracking-wide leading-5">Data already optimized</div>
                <Chip label="Already Optimized" color="success"/>
            </div>
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

    const originalParagraphMsg = "Paragraphs in SEO should be clear, concise, and provide valuable information to readers, making it easy for them to understand and engage with.";
    const recommendedParagraphMsg = "Recommended paragraphs are optimized with relevant keywords and structured to enhance readability, user engagement, and search engine rankings.";

    return (
        <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg">
                <thead className="text-xs uppercase text-white bg-gray-900 tracking-wide">
                    <tr>
                        <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Paragraph (p) <TooltipComponent msg={originalParagraphMsg}/></th>
                        <th scope="col" className="px-6 py-3" style={{ width: '250px' }}>Recommended Paragraph (p) <span className="bg-[#82e87a] p-[3px] ml-1 rounded-sm text-[13px] text-gray-900 normal-case">Optimized</span> <TooltipComponent msg={recommendedParagraphMsg}/></th>
                        <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Reason</th>
                        <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Impact</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50 text-neutralDGrey">
                            <td className="px-6 py-4 align-top text-left leading-6 tracking-wide font-medium">{item.p}</td>
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
    );
}

export default Paragraph;
