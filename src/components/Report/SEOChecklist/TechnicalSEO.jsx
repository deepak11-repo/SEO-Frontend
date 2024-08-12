import React, { useEffect, useState } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { addTechScore } from '../../../utility/scoreSlice';

const TechnicalSEO = () => {
    const techResponse = useSelector((state) => state.inputs.techResponse);   
    
    const [robotsFile, setRobotsFile] = useState(false);
    const [sitemap, setSitemap] = useState(false); 
    const [httpStatus, setHttpStatus] = useState(false);
    const [mobileTest, setMobileTest] = useState(false);
    const [indexability, setIndexability] = useState(false);
    const [status, setStatus] = useState(''); // Add status state

    const dispatch = useDispatch();

    useEffect(() => {
        if (techResponse.message === "error") {
            // If there's an error, set everything to false
            setRobotsFile(false);
            setSitemap(false);
            setHttpStatus(false);
            setMobileTest(false);
            setIndexability(false);
            setStatus('Poor');
            dispatch(addTechScore(0));
        } else {
            const robotsFileExists = techResponse.technicalSEO.hasRobotsTxt.exists;
            const sitemapExists = techResponse.technicalSEO.hasSitemapXml.exists;
            
            const statusCode = techResponse.technicalSEO.hasHttpStatus.statusCode;
            const httpStatusValid = techResponse.technicalSEO.hasHttpStatus.exists &&
                                    ((statusCode >= 200 && statusCode <= 208) ||
                                     (statusCode >= 300 && statusCode <= 308));
            
            const mobileFriendly = techResponse.mobileFriendly.isMobileFriendly;

            // Determine indexability
            const isIndexable = robotsFileExists && sitemapExists && httpStatusValid && mobileFriendly;

            // Update state variables
            setRobotsFile(robotsFileExists);
            setSitemap(sitemapExists);
            setHttpStatus(httpStatusValid);
            setMobileTest(mobileFriendly);
            setIndexability(isIndexable);

            // Update status
            const trueCount = [robotsFileExists, sitemapExists, httpStatusValid, mobileFriendly, isIndexable].filter(Boolean).length;
            if (trueCount >= 4) {
                setStatus('Good');
            } else if (trueCount === 3) {
                setStatus('Average');
            } else {
                setStatus('Poor');
            }

            // Add score for each true condition
            const scoreToAdd = trueCount * 5;
            dispatch(addTechScore(scoreToAdd));
        }
    }, [techResponse, dispatch]);

    return (
        <div>
            <table className="min-w-full">
                <thead className="bg-white">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-md font-bold tracking-wider w-1/2">Technical SEO</th>
                        <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">{status}</th>
                        <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">Impact</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    <tr>
                        <td className="px-6 py-4 text-left">Robots.txt</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {robotsFile ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">High</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-left">XML Sitemap</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {sitemap ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">High</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-left">HTTP Status</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {httpStatus ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">High</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-left">Mobile Friendliness</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {mobileTest ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">High</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-left">Indexability</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-block align-middle">
                                {indexability ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center">High</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TechnicalSEO;
