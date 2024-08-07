import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegCheckCircle } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { addTechScore } from '../../../utility/scoreSlice'; 

const InternalLinks = () => {
    const dispatch = useDispatch();
    const linkResponse = useSelector((state) => state.scores.internalLinks); // Update this path if necessary

    const [status, setStatus] = useState('');

    const hasLink = linkResponse.hasInternalLink;
    const brokenLink = linkResponse.brokenLinks.length === 0;
    const linkQuality = linkResponse.message === 'No URLs need optimization.';

    useEffect(() => {
        updateStatus();
    }, [hasLink, brokenLink, linkQuality]);

    const updateStatus = () => {
        const trueCount = [hasLink, brokenLink, linkQuality].filter(Boolean).length;
        
        if (trueCount === 3) {
            setStatus('Good');
        } else if (trueCount === 2) {
            setStatus('Average');
        } else {
            setStatus('Poor');
        }

        // Calculate and dispatch the score
        const scoreToAdd = trueCount * 5;
        dispatch(addTechScore(scoreToAdd));
    };

    return (
        <div>
            <table className="min-w-full">
                <thead className="bg-white">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-md font-bold tracking-wider w-1/2">Internal Links</th>
                        <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">{status}</th>
                        <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">Impact</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    <tr>
                        <td className="px-6 py-4 text-left">Has Internal Links</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {hasLink ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">High</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-left">No Broken Links</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {brokenLink ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">High</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-left">Link Quality</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {linkQuality ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">High</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default InternalLinks;
