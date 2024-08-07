import { useState, useEffect } from "react";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
import a3 from '../../assets/a3.png';
import { useSelector } from "react-redux";
import LoaderImg from '../../assets/Loader1.gif';

function UrlContent({ data }) {
    const { urlLoading } = useSelector((state) => state.loader);
    const [isHovered, setIsHovered] = useState(null);

    if (urlLoading) {
        return (
            <div className="w-full flex flex-col justify-center items-center mt-10">
                <img src={LoaderImg} alt="Data Loading..." className="mt-8"/>
            </div>
        );
    }

    if (!data || data.message === "no") {
        return (
            <div className="w-full flex flex-col justify-center items-center mt-10">
                <img src={a3} alt="done" className="w-[6%] mb-2" />
                <p className="text-lg tracking-wide leading-4 font-sans font-bold text-brandPrimary mt-5">
                    Your website URL is already optimized, so there's no need for any further modifications.
                </p>
                <div className="mt-5 border border-gray-300 shadow-2xl p-5 rounded-lg">
                    <p className="pb-5 tracking-wide leading-4 font-sans text-neutralDGrey"><strong>Optimized for SEO</strong>: The URL structure is already optimized for search engines, ensuring relevance and keyword focus.</p>
                    <p className="pb-5 tracking-wide leading-4 font-sans text-neutralDGrey"><strong>Clear and concise</strong>: The URL effectively communicates the content it links to, enhancing user experience.</p>
                    <p className="pb-5 tracking-wide leading-4 font-sans text-neutralDGrey"><strong>Effective length</strong>: The URL length is appropriate, balancing readability and SEO best practices.</p>
                    <p className="font-medium tracking-wide leading-4 font-sans">No further adjustments are necessary.</p>
                </div>
            </div>
        );
    }

    if (data.message === "yes" && data.optimizedResult) {
        const { old: originalUrl, new: optimizedUrl, reason, impact } = data.optimizedResult;

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
                            <th scope="col" className="px-6 py-3" style={{ width: '25%' }}>Original URL</th>
                            <th scope="col" className="px-6 py-3" style={{ width: '25%' }}>Recommended URL <span className="bg-[#82e87a] p-[3px] ml-1 rounded-sm text-[13px] text-gray-900 normal-case">Optimized</span></th>
                            <th scope="col" className="px-6 py-3" style={{ minWidth: '200px' }}>Reason</th>
                            <th scope="col" className="px-6 py-3" style={{ minWidth: '200px' }}>Impact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b hover:bg-gray-50 text-neutralDGrey">
                            <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium break-words" style={{ maxWidth: '300px' }}>{originalUrl}</td>
                            <td
                                className={`${isHovered ? 'bg-gray-100 rounded-xl ' : ''} relative flex transition-colors duration-300 px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium break-words`}
                                style={{ maxWidth: '300px' }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                {optimizedUrl}
                                {isHovered &&
                                    <MdContentCopy
                                        className="ml-2 text-black absolute right-2 top-2 cursor-pointer"
                                        onClick={() => handleCopyToClipboard(optimizedUrl)}
                                    />
                                }
                            </td>
                            <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium">{reason}</td>
                            <td className="px-6 py-4 align-top text-justify leading-6 tracking-wide font-medium">{impact}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    // Default fallback (if data.message is neither "yes" nor "no")
    return null;
}

export default UrlContent;
