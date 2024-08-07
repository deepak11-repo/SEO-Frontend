import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import { MdContentCopy, MdExpandMore } from "react-icons/md";
import toast from "react-hot-toast";
import a3 from '../../assets/a3.png';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import TooltipComponent from "../Tooltip/TooltipComponent";

const AnchorText = ({ data }) => {
    console.log('Inside AnchorText');

    const safeData = data && data.optimizedText && Array.isArray(data.optimizedText) ? data.optimizedText : [];

    if (data === null || safeData.length === 0) {
        return (
            <div className="w-full flex flex-col justify-center items-center mt-10">
                    <img src={a3} alt="done" className="w-[6%] mb-2"/>
                    <p className="text-lg tracking-wide leading-4 font-sans font-bold text-brandPrimary mt-5">The anchor text is already fully optimized for SEO</p>                        
                    <div className="mt-5 border border-gray-300 shadow-2xl p-5 rounded-lg">
                        <p className="pb-5 tracking-wide leading-4 font-sans text-neutralDGrey"><strong>It uses relevant keywords</strong>: The words used are important and related to the content, helping search engines understand what the linked page is about.</p>
                        <p className="pb-5 tracking-wide leading-4 font-sans text-neutralDGrey"><strong>It's clear and descriptive</strong>: The text clearly indicates what you can expect if you click on the link, improving user experience.</p>
                        <p className="pb-5 tracking-wide leading-4 font-sans text-neutralDGrey"><strong>It's the right length</strong>: The text is neither too short nor too long, making it effective for both users and search engines.</p>                        
                        <p className="font-medium tracking-wide leading-4 font-sans">So, you don't need to make any more changes.</p>
                    </div>
                </div>
        );
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [isHovered, setIsHovered] = useState(null);
    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copy to clipboard', {
            duration: 1300,
        });
    };

    // Calculate the indices for slicing the data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = safeData.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(safeData.length / itemsPerPage);

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

    const recommendedAnchorMsg = "Recommended anchor text with relevant keywords that describe the linked content. This enhances SEO by providing context to search engines and improves user navigation.";
    return (
        <>
            {safeData.length > 0 ? (
                <div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg">
                        <thead className="text-xs uppercase text-white bg-gray-900 tracking-wide">
                            <tr>
                                <th scope="col" className="px-6 py-3" style={{ width: '240px', wordBreak: 'break-all' }}>URL</th>
                                <th scope="col" className="px-6 py-3" style={{ width: '150px' }}>Original Anchor</th>
                                <th scope="col" className="px-6 py-3" style={{ width: '260px' }}>Recommended Anchor <span className="bg-[#82e87a] p-[3px] ml-1 rounded-sm text-[13px] text-gray-900 normal-case">Optimized</span> <TooltipComponent msg={recommendedAnchorMsg}/></th>
                                <th scope="col" className="px-6 py-3" style={{ width: '190px' }}>Reason for Optimization</th>
                                <th scope="col" className="px-6 py-3" style={{ width: '190px' }}>Impact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50 text-neutralDGrey">
                                    <td className="px-6 py-4 cursor-pointer hover:text-blue-600 relative font-medium align-top text-left leading-6 tracking-wide" style={{ wordBreak: 'break-all' }}>
                                        <a href={item.href} target="_blank" rel="noopener noreferrer">{item.href}</a>
                                    </td>
                                    <td className="px-6 py-4 align-top text-left leading-6 tracking-wide font-medium">
                                        {item.old}
                                    </td>
                                    <td
                                        className="px-6 py-4 cursor-pointer hover:text-blue-600 relative font-medium align-top text-left leading-6 tracking-wide"
                                        onMouseEnter={() => setIsHovered(index)}
                                        onMouseLeave={() => setIsHovered(null)}
                                        style={{ wordBreak: 'break-all' }}
                                    >
                                        {item.newText}
                                        {isHovered === index && (
                                            <MdContentCopy className="ml-2 text-black absolute right-2 top-2 cursor-pointer" onClick={() => handleCopyToClipboard(item.newText)}/>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 align-top text-left leading-6 tracking-wide font-medium">
                                        {item.reason}
                                    </td>
                                    <td className="px-6 py-4 align-top text-left leading-6 tracking-wide font-medium">
                                        {item.impact}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination Controls */}
                    {safeData.length > itemsPerPage && (
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    )}
                </div>
            ) : (
                <div className="w-full flex flex-col justify-center items-center mt-10">
                    <img src={a3} alt="done" className="w-[6%] mb-2"/>
                            <p className="text-lg tracking-wide leading-4 font-sans font-bold text-brandPrimary mt-5">The anchor text is already fully optimized for SEO</p>
                        
                        <div className="mt-5 border border-gray-300 shadow-2xl p-5 rounded-lg">
                            <p className="pb-5 tracking-wide leading-4 font-sans text-neutralDGrey"><strong>It uses relevant keywords</strong>: The words used are important and related to the content, helping search engines understand what the linked page is about.</p>
                            <p className="pb-5 tracking-wide leading-4 font-sans text-neutralDGrey"><strong>It's clear and descriptive</strong>: The text clearly indicates what you can expect if you click on the link, improving user experience.</p>
                            <p className="pb-5 tracking-wide leading-4 font-sans text-neutralDGrey"><strong>It's the right length</strong>: The text is neither too short nor too long, making it effective for both users and search engines.</p>                        
                            <p className="font-medium tracking-wide leading-4 font-sans">So, you don't need to make any more changes.</p>
                        </div>
                </div>
            )}
        </>
    );
};

export default AnchorText;
