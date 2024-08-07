import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegCheckCircle } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { addTechScore } from '../../../utility/scoreSlice';

const MetaTags = () => {
    const metaTag = useSelector((state) => state.scores.metaTag); // Updated to use inputs.metaTag

    const [indexTag, setIndexTag] = useState(false);
    const [followTag, setFollowTag] = useState(false);
    const [metaTagsStatus, setMetaTagsStatus] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (metaTag) {
            setIndexTag(metaTag.hasMetaTag.indexTag);
            setFollowTag(metaTag.hasMetaTag.followTag);
            updateMetaTagsStatus(metaTag.hasMetaTag.indexTag, metaTag.hasMetaTag.followTag);

            // Calculate and dispatch the score
            const trueCount = [metaTag.hasMetaTag.indexTag, metaTag.hasMetaTag.followTag].filter(Boolean).length;
            const scoreToAdd = trueCount * 5;
            dispatch(addTechScore(scoreToAdd));
        }
    }, [metaTag, dispatch]);

    const updateMetaTagsStatus = (indexTag, followTag) => {
        const trueCount = [indexTag, followTag].filter(Boolean).length;
        if (trueCount === 2) {
            setMetaTagsStatus('Good');
        } else if (trueCount === 1) {
            setMetaTagsStatus('Average');
        } else {
            setMetaTagsStatus('Poor');
        }
    };

    return (
        <>
            <table className="min-w-full">
                <thead className="bg-white">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-md font-bold tracking-wider w-1/2">Meta Tags</th>
                        <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">{metaTagsStatus}</th>
                        <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">Impact</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    <tr>
                        <td className="px-6 py-4 text-left">Index Tag</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {indexTag ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">High</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-left">Follow Tag</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {followTag ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">High</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default MetaTags;
