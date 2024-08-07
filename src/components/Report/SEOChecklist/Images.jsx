import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegCheckCircle } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { checkAltKeyword } from '../../../api/report';
import { addPageScore } from '../../../utility/scoreSlice';
import { setImageLoader } from '../../../utility/reportLoaderSlice';

const Images = () => {
    const dispatch = useDispatch();
    const imageResponse = useSelector((state) => state.inputs.imageResponse);
    const url = useSelector((state) => state.inputs.url);
    const secondaryKeywords = useSelector((state) => state.inputs.secondaryKeywords);

    const [alt, setAlt] = useState(false);
    const [title, setTitle] = useState(false);
    const [altKeyword, setAltKeyword] = useState(false);
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (imageResponse) {
            setAlt(!(imageResponse.altArray?.length > 0 || imageResponse.commonArray?.length > 0));
            setTitle(!(imageResponse.titleArray?.length > 0 || imageResponse.commonArray?.length > 0));
            getAltKeyword();
        }
    }, [imageResponse]);

    useEffect(() => {
        updateStatus();
    }, [alt, title, altKeyword]);

    const getAltKeyword = async () => {
        try {
            const output = await checkAltKeyword(url, secondaryKeywords);
            setAltKeyword(output.hasAltKeyword);
        } catch (error) {
            console.error('Error fetching alt keyword info:', error);
            setAltKeyword(false);
            setStatus('Poor');
        } finally {
            dispatch(setImageLoader(false)); 
        }
    };

    const updateStatus = () => {
        const trueCount = [alt, title, altKeyword].filter(Boolean).length;

        let newStatus;
        if (trueCount === 3) {
            newStatus = 'Good';
        } else if (trueCount === 2) {
            newStatus = 'Average';
        } else {
            newStatus = 'Poor';
        }
        
        setStatus(newStatus);

        // Calculate and dispatch the score
        const score = calculateScore(alt, title, altKeyword);
        dispatch(addPageScore(score));
    };

    const calculateScore = (alt, title, altKeyword) => {
        let score = 0;
        if (alt) score += 4;
        if (title) score += 2;
        if (altKeyword) score += 4;
        return score;
    };

    return (
        <>
            <table className="min-w-full">
                <thead className="bg-white">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-md font-bold tracking-wider w-1/2">Images</th>
                        <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">{status}</th>
                        <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">Impact</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    <tr>
                        <td className="px-6 py-4 text-left">Contain Alt Text</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {alt ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">High</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-left">Contain Title Text</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {title ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">Low</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-left">Contain Secondary Keyword</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {altKeyword ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">High</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-left">Image Quality</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                <FaRegCheckCircle className="text-green-600 text-lg" /> 
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">Low</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default Images;
