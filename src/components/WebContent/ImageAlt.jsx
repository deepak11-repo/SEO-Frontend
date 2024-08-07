import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import { IoIosWarning } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
import TooltipComponent from "../Tooltip/TooltipComponent";
import nodata from '../../assets/nodata.png';
import noimage from '../../assets/noimage.jpg';
import { Alert } from "@mui/material";
import a3 from '../../assets/a3.png';

function ImageAlt({ data }) {
    console.log('Inside ImageAlt');
    console.log(data);

    if (!data || data.altArray.length === 0) {
        return (
            <>
                <div className="w-[99%] mb-5 mt-2">
                    <Alert severity="info" sx={{ width: '100%' }}>
                        <p className="text-md tracking-wide leading-6 text-neutralDGrey font-medium">
                            All images have alt attributes, ensuring accessibility and SEO benefits.
                        </p>
                    </Alert>
                </div>
                <div className="w-full flex flex-col justify-center items-center mt-10">
                    <img src={a3} alt="done" className="w-[6%] mb-2" />
                    <p className="text-lg tracking-wide leading-4 font-sans font-bold text-brandPrimary mt-5 mb-3">
                        All images on the website have descriptive alt attributes.
                    </p>
                    <p className="text-lg tracking-wide leading-4 font-sans font-bold text-brandPrimary">
                        This enhances accessibility for visually impaired users and aids search engines in understanding image content.
                    </p>
                </div>
            </>
        );
    }   

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate the indices for slicing the data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.altArray.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.altArray.length / itemsPerPage);
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

    const originalImageMsg = "Images without alt text can harm SEO because search engines rely on alt text to understand the content of the image, making it inaccessible to visually impaired.";

    return (
        (data.altArray.length > 0 && (
            <div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg">
                    <thead className="text-xs uppercase text-white bg-gray-900 tracking-wide">
                        <tr>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Image</th>
                            <th scope="col" className="px-6 py-3" style={{ maxWidth: '400px', wordBreak: 'break-all' }}>Image SRC</th>
                            <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Reason <TooltipComponent msg={originalImageMsg}/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => {
                            // Conditionally render the image source
                            const src = item && item.startsWith('data:image/') ? noimage : item || noimage;

                            return (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50 text-neutralDGrey">
                                    <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide" style={{ wordBreak: 'break-all' }}>
                                        <img 
                                            src={src} 
                                            className="w-[150px] h-[75px]" 
                                            alt={item ? "Item image" : "No image available"} 
                                        />
                                    </td>
                                    <td 
                                        className={`${isHovered === index ? 'bg-gray-100 rounded-xl ' : ''} relative flex transition-colors duration-300 px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium`}
                                        onMouseEnter={() => setIsHovered(index)}
                                        onMouseLeave={() => setIsHovered(null)} 
                                        style={{ wordBreak: 'break-all' }}
                                    >
                                        {item}
                                        {isHovered === index && 
                                            <MdContentCopy 
                                                className="ml-2 text-black absolute right-2 top-2 cursor-pointer" 
                                                onClick={() => handleCopyToClipboard(item)}
                                            />
                                        }
                                    </td>
                                    <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium">
                                        <div className="flex items-center space-x-2">
                                            <IoIosWarning className="text-lg text-red-600 font-medium" />
                                            <span>Missing Alt Text</span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                )}
            </div>
        ))
    );
}

export default ImageAlt;
