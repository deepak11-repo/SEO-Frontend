import React, { useEffect, useState } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { useSelector, useDispatch } from 'react-redux';
import { addPageScore } from '../../../utility/scoreSlice';

const Headings = () => {
    const h1Response = useSelector((state) => state.inputs.h1Response);
    const h2Response = useSelector((state) => state.inputs.h2Response);
    const h3Response = useSelector((state) => state.inputs.h3Response);
    
    const [singleH1, setSingleH1] = useState(false);
    const [h1Primary, setH1Primary] = useState(false); 
    const [subHeading, setSubHeading] = useState(false);
    const [subHeadingKeyword, setSubHeadingKeyword] = useState(false);
    const [status, setStatus] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        let singleH1Value = false;
        let h1PrimaryValue = false;
        let subHeadingValue = false;
        let subHeadingKeywordValue = false;

        if (h1Response.message === "single") {
            singleH1Value = true;
        } else if (h1Response.message === "no") {
            singleH1Value = true;
            h1PrimaryValue = true;
        }

        if (h2Response.message === "optimized" && h3Response.message === "optimized") {
            subHeadingValue = true;
            subHeadingKeywordValue = true;
        } else if (h2Response.message === "empty" || h3Response.message === "empty") {
            subHeadingValue = false;
            subHeadingKeywordValue = false;
        } else {
            subHeadingValue = true;
            subHeadingKeywordValue = false;
        }

        setSingleH1(singleH1Value);
        setH1Primary(h1PrimaryValue);
        setSubHeading(subHeadingValue);
        setSubHeadingKeyword(subHeadingKeywordValue);

        const trueCount = [singleH1Value, h1PrimaryValue, subHeadingValue, subHeadingKeywordValue].filter(Boolean).length;
        if (trueCount >= 3) {
            setStatus('Good');
        } else if (trueCount === 2) {
            setStatus('Average');
        } else {
            setStatus('Poor');
        }

        // Calculate and dispatch the score
        const score = calculateScore(singleH1Value, h1PrimaryValue, subHeadingValue, subHeadingKeywordValue);
        dispatch(addPageScore(score));

    }, [h1Response, h2Response, h3Response]);

    const calculateScore = (singleH1, h1Primary, subHeading, subHeadingKeyword) => {
        let score = 0;
        if (singleH1) score += 4;
        if (h1Primary) score += 4;
        if (subHeading) score += 3;
        if (subHeadingKeyword) score += 3;
        return score;
    };

    return (
        <>
            <table className="min-w-full">
                <thead className="bg-white">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-md font-bold tracking-wider w-1/2">Headings</th>
                        <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">{status}</th>
                        <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">Impact</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    <tr>
                        <td className="px-6 py-4 text-left">Single H1 Heading</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {singleH1 ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">High</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-left">Primary Keyword in H1</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {h1Primary ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">High</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-left">Contains H2 & H3</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {subHeading ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">Medium</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-left">Secondary Keywords in H2 & H3</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {subHeadingKeyword ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">Medium</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default Headings;
