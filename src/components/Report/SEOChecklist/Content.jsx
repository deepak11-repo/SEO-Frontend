import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegCheckCircle } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { addPageScore } from '../../../utility/scoreSlice';

const Content = () => {
  const dispatch = useDispatch();
  
  // Fetch content data from Redux store
  const contentInfo = useSelector((state) => state.scores.content);

  // Local state for content metrics
  const [contentPrimary, setContentPrimary] = useState(false);
  const [contentSecondary, setContentSecondary] = useState(false);
  const [contentWord, setContentWord] = useState(false);
  const [contentStatus, setContentStatus] = useState('');

  useEffect(() => {
    if (contentInfo) {
      const wordCountStatus = contentInfo.wordCount > 500;
      const primaryKeywordStatus = contentInfo.pCount >= 3;
      const secondaryKeywordStatus = contentInfo.sCount >= 4;

      setContentWord(wordCountStatus);
      setContentPrimary(primaryKeywordStatus);
      setContentSecondary(secondaryKeywordStatus);

      updateContentStatus(wordCountStatus, primaryKeywordStatus, secondaryKeywordStatus);

      // Calculate and dispatch the score
      const score = calculateScore(wordCountStatus, primaryKeywordStatus, secondaryKeywordStatus);
      dispatch(addPageScore(score));
    }
  }, [contentInfo, dispatch]);

  const updateContentStatus = (wordCount, pCount, sCount) => {
    const trueCount = [wordCount, pCount, sCount].filter(Boolean).length;
    if (trueCount === 3) {
      setContentStatus('Good');
    } else if (trueCount === 2) {
      setContentStatus('Average');
    } else {
      setContentStatus('Poor');
    }
  };

  const calculateScore = (wordCountStatus, primaryKeywordStatus, secondaryKeywordStatus) => {
    let score = 0;
    if (primaryKeywordStatus) score += 4;
    if (secondaryKeywordStatus) score += 3;
    if (wordCountStatus) score += 3;
    return score;
  };

  return (
    <>
      <table className="min-w-full">
        <thead className="bg-white">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-md font-bold tracking-wider w-1/2">Content</th>
            <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">{contentStatus}</th>
            <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">Impact</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="px-6 py-4 text-left">Contain Primary Keyword</td>
            <td className="px-6 py-4 text-center">
              <span className="inline-block align-middle">
                {contentPrimary ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
              </span>
            </td>
            <td className="px-6 py-4 text-center">High</td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-left">Contain Secondary Keywords</td>
            <td className="px-6 py-4 text-center">
              <span className="inline-block align-middle">
                {contentSecondary ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
              </span>
            </td>
            <td className="px-6 py-4 text-center">Medium</td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-left">More than 500 words</td>
            <td className="px-6 py-4 text-center">
              <span className="inline-block align-middle">
                {contentWord ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
              </span>
            </td>
            <td className="px-6 py-4 text-center">Medium</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Content;
