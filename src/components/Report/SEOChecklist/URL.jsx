import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegCheckCircle } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { addPageScore } from '../../../utility/scoreSlice';
import { setUrlLoader } from '../../../utility/reportLoaderSlice';

const URL = () => {
    const dispatch = useDispatch();
    const urlInfo = useSelector((state) => state.scores.urlReport);
    
    const [isPrimaryKey, setIsPrimaryKey] = useState(false);
    const [isShort, setIsShort] = useState(false);
    const [isDate, setIsDate] = useState(false);
    const [status, setStatus] = useState('');

    useEffect(() => {
        getURLInfo();
    }, [urlInfo]);

    const getURLInfo = async () => {
        try {
            const output = urlInfo; // Use data from the Redux store
            
            if (!output.path) {
                setIsPrimaryKey(true);
                setIsShort(true);
                setIsDate(false); // Assuming 'true' for future proof when no path
                setStatus('Good');
                dispatch(addPageScore(10));
                return;
            }

            setIsPrimaryKey(output.primaryKeyword);
            setIsShort(output.lengthValid);
            setIsDate(output.hasDate);

            const score = calculateScore(output.primaryKeyword, output.lengthValid, output.hasDate);
            dispatch(addPageScore(score));

            updateStatus(output.primaryKeyword, output.lengthValid, output.hasDate);
        } catch (error) {
            console.error('Error fetching URL info:', error);
            setIsPrimaryKey(false);
            setIsShort(false);
            setIsDate(true);
            setStatus('Poor');
        } finally {
            dispatch(setUrlLoader(false)); 
        }
    };

    const updateStatus = (isPrimaryKey, isShort, isDate) => {
        const trueCount = [isPrimaryKey, isShort, !isDate].filter(Boolean).length;
        if (trueCount === 3) {
            setStatus('Good');
        } else if (trueCount === 2) {
            setStatus('Average');
        } else if (trueCount === 1) {
            setStatus('Poor');
        } else {
            setStatus('Poor');
        }
    };

    const calculateScore = (isPrimaryKey, isShort, isDate) => {
        let score = 0;
        if (isShort) score += 4;
        if (isPrimaryKey) score += 3;
        if (!isDate) score += 3;
        return score;
    };

    return (
        <>
            <table className="min-w-full">
                <thead className="bg-white">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-md font-bold tracking-wider w-1/2">
                            URL
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">
                            {status} {/* Render dynamic status */}
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">
                            Impact
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    <tr>
                        <td className="px-6 py-4 text-left">Short URL</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {isShort ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">High</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-left">Primary Keyword in URL</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {isPrimaryKey ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">Medium</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-left">Future Proof</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {!isDate ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">Medium</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
    
};

export default URL;
