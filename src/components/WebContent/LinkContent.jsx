import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import { MdContentCopy, MdExpandMore } from "react-icons/md";
import toast from "react-hot-toast";
import a3 from '../../assets/a3.png';

function LinkContent({ data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [isHovered, setIsHovered] = useState(null);

    useEffect(() => {
        console.log(data); 
    }, [data]);

    // Ensure data is an array
    const safeData = Array.isArray(data) ? data : [];

    if (safeData.length === 0) {
        return (
            <div className="w-full flex flex-col justify-center items-center mt-10">
                <img src={a3} alt="done" className="w-[6%] mb-2" />
                <p className="text-lg tracking-wide leading-4 font-sans font-bold text-brandPrimary mt-5">
                    Your website's internal links are already optimized, so there's no need for any further modifications.
                </p>
                <div className="mt-5 border border-gray-300 shadow-2xl p-5 rounded-lg">
                    <p className="pb-5 tracking-wide leading-4 font-sans text-neutralDGrey"><strong>Optimized for SEO</strong>: The internal link structure is already optimized for search engines, ensuring relevance and keyword focus.</p>
                    <p className="pb-5 tracking-wide leading-4 font-sans text-neutralDGrey"><strong>Clear and concise</strong>: The internal links effectively communicate the content they lead to, enhancing user experience.</p>
                    <p className="pb-5 tracking-wide leading-4 font-sans text-neutralDGrey"><strong>Effective placement</strong>: The internal links are placed strategically, balancing readability and SEO best practices.</p>
                    <p className="font-medium tracking-wide leading-4 font-sans">No further adjustments are necessary.</p>
                </div>
            </div>
        );
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = safeData.slice(indexOfFirstItem, indexOfLastItem);
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

    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard', {
            duration: 1300,
        });
    };    

    return (
        <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg">
                <thead className="text-xs uppercase text-white bg-gray-900 tracking-wide">
                    <tr>
                        <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Original URL </th>
                        <th scope="col" className="px-6 py-3" style={{ width: '280px' }}>Recommended URL <span className="bg-[#82e87a] p-[3px] ml-1 rounded-sm text-[13px] text-gray-900 normal-case">Optimized</span></th>
                        <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Reason</th>
                        <th scope="col" className="px-6 py-3" style={{ width: '200px' }}>Impact</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50 text-neutralDGrey">
                            <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium break-words" style={{ maxWidth: '300px', wordWrap: 'break-word' }}>{item.url}</td>
                            <td
                                className={`${isHovered === index ? 'bg-gray-100 rounded-xl ' : ''} relative flex transition-colors duration-300 px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium break-words`}
                                style={{ wordWrap: 'break-word', wordBreak: 'break-all', whiteSpace: 'pre-wrap'  }}
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
                            <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium break-words" style={{ wordWrap: 'break-word' }}>{item.reason}</td>
                            <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium break-words" style={{ wordWrap: 'break-word' }}>{item.impact}</td>
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

export default LinkContent;
