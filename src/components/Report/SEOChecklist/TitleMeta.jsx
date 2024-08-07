import React, { useEffect, useState } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { addPageScore } from '../../../utility/scoreSlice';

const TitleMeta = () => {
    const titleMetaInfo = useSelector((state) => state.scores.titleMeta);

    const [titlePrimary, setTitlePrimary] = useState(false);
    const [titleLength, setTitleLength] = useState(false);
    const [titleStatus, setTitleStatus] = useState('');

    const [metaPrimary, setMetaPrimary] = useState(false);
    const [metaSecondary, setMetaSecondary] = useState(false);
    const [metaLength, setMetaLength] = useState(false);
    const [metaStatus, setMetaStatus] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (titleMetaInfo) {
            // Update state based on the titleMetaInfo from the store
            setTitlePrimary(titleMetaInfo.titlePrimary);
            setTitleLength(titleMetaInfo.titleLength);

            setMetaPrimary(titleMetaInfo.mPrimary);
            setMetaSecondary(titleMetaInfo.mSecondary);
            setMetaLength(titleMetaInfo.mLength);

            updateTitleStatus(titleMetaInfo.titlePrimary, titleMetaInfo.titleLength);
            updateMetaStatus(titleMetaInfo.mPrimary, titleMetaInfo.mSecondary, titleMetaInfo.mLength);

            const score = calculateScore(titleMetaInfo.titlePrimary, titleMetaInfo.titleLength, titleMetaInfo.mPrimary, titleMetaInfo.mSecondary, titleMetaInfo.mLength);
            dispatch(addPageScore(score));
        }
    }, [titleMetaInfo, dispatch]);

    const updateTitleStatus = (titlePrimary, titleLength) => {
        const trueCount = [titlePrimary, titleLength].filter(Boolean).length;
        if (trueCount === 2) {
            setTitleStatus('Good');
        } else if (trueCount === 1) {
            setTitleStatus('Average');
        } else {
            setTitleStatus('Poor');
        }
    };

    const updateMetaStatus = (metaPrimary, metaSecondary, metaLength) => {
        const trueCount = [metaPrimary, metaSecondary, metaLength].filter(Boolean).length;
        if (trueCount === 3) {
            setMetaStatus('Good');
        } else if (trueCount === 2) {
            setMetaStatus('Average');
        } else {
            setMetaStatus('Poor');
        }
    };

    const calculateScore = (titlePrimary, titleLength, metaPrimary, metaSecondary, metaLength) => {
        let score = 0;
        if (titlePrimary) score += 4;
        if (titleLength) score += 3;
        if (metaPrimary) score += 4;
        if (metaSecondary) score += 3;
        if (metaLength) score += 3;
        return score;
    };

    return (
        <>
            <table className="min-w-full">
                <thead className="bg-white">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-md font-bold tracking-wider w-1/2">Page Title</th>
                        <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">{titleStatus}</th>
                        <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">Impact</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    <tr>
                        <td className="px-6 py-4 text-left">Primary Keyword in Title</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {titlePrimary ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">High</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-left">Less than 70 characters</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {titleLength ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">Medium</td>
                    </tr>
                </tbody>
            </table>
            <table className="min-w-full">
                <thead className="bg-white">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-md font-bold tracking-wider w-1/2">Meta Description</th>
                        <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">{metaStatus}</th>
                        <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">Impact</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    <tr>
                        <td className="px-6 py-4 text-left">Includes Primary Keyword</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {metaPrimary ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">High</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-left">Includes Secondary Keyword</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {metaSecondary ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">Medium</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-left">Less than 160 characters</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {metaLength ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">Medium</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default TitleMeta;
