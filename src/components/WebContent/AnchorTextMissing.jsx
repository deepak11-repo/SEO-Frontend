import { useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import Pagination from "../Pagination/Pagination";
import toast from "react-hot-toast";
import a3 from '../../assets/a3.png';
import TooltipComponent from "../Tooltip/TooltipComponent";
import errImg from '../../assets/errorImg.png';
import { Alert } from "@mui/material";

const AnchorTextMissing = ({ data }) => {
    console.log(data);
    
    console.log('Inside AnchorTextMissing');
    
    if(data.message === 'error') {
        return (
            <>
                <div className="w-[99%] mb-5 mt-2">
                    <Alert severity="error" sx={{width: '100%'}}>
                        <p className="text-md tracking-wide leading-6 text-neutralDGrey font-medium">Due to certain security settings on the target website, we encountered an issue while retrieving data.</p>
                    </Alert>
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <img src={errImg} alt="No Data Available" className="w-[35%]"/>
                </div>
            </>
        );
    }
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    
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
    const currentItems = data.missingText.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(data.missingText.length / itemsPerPage);

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

    
    
    const originalAnchorMsg = "Anchor tags should have meaningful text content. This helps search engines understand the linked page's context and improves accessibility for users, ensuring they know where the link leads.";

    return (
        <>
            {data.missingText?.length > 0 ? (
                <div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg">
                        <thead className="text-xs uppercase text-white bg-gray-900 tracking-wide">
                            <tr>
                                <th scope="col" className="px-6 py-3" style={{ width: '400px' }}>
                                    URL
                                </th>
                                <th scope="col" className="px-6 py-3" style={{ width: '200px', wordBreak: 'break-all' }}>
                                    Reason <TooltipComponent msg={originalAnchorMsg}/>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((url, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50 text-neutralDGrey">
                                    <td
                                        className="px-6 py-4 cursor-pointer hover:text-blue-600 relative font-medium"
                                        onMouseEnter={() => setIsHovered(index)}
                                        onMouseLeave={() => setIsHovered(null)}
                                        style={{ wordBreak: 'break-all' }}
                                    >
                                        <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                                        {isHovered === index && (
                                            <MdContentCopy className="ml-2 text-black absolute right-2 top-2 cursor-pointer" onClick={() => handleCopyToClipboard(url)}/>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium">
                                        <div className="flex items-center space-x-2">
                                            <IoIosWarning className="text-lg text-red-600 font-medium" />
                                            <span>Missing Anchor Text</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
                    )}
                </div>
            ) : (
                <div className="w-full mx-auto my-auto">
                    <img src={a3} alt="done"/>
                </div>
            )}
        </>
    );
};

export default AnchorTextMissing;
