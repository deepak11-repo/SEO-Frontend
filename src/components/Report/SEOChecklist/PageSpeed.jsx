import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegCheckCircle } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { addPageScore } from '../../../utility/scoreSlice';

const PageSpeed = () => {
  const [mobile, setMobile] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [status, setStatus] = useState('');

  const mobileScore = useSelector((state) => state.scores.mobileScore);
  const desktopScore = useSelector((state) => state.scores.desktopScore);

  const dispatch = useDispatch();

  useEffect(() => {
    // Update mobile and desktop states based on scores
    const mobileStatus = mobileScore > 75;
    const desktopStatus = desktopScore > 75;

    setMobile(mobileStatus);
    setDesktop(desktopStatus);

    // Update status based on mobile and desktop states
    updateStatus(mobileStatus, desktopStatus);

    // Calculate and dispatch the score
    const score = calculateScore(mobileStatus, desktopStatus);
    dispatch(addPageScore(score));

  }, [mobileScore, desktopScore]);

  const updateStatus = (mobileStatus, desktopStatus) => {
    const trueCount = [mobileStatus, desktopStatus].filter(Boolean).length;
    if (trueCount === 2) {
      setStatus('Good');
    } else if (trueCount === 1) {
      setStatus('Average');
    } else {
      setStatus('Poor');
    }
  };

  const calculateScore = (mobileStatus, desktopStatus) => {
    let score = 0;
    if (mobileStatus) score += 4;
    if (desktopStatus) score += 4;
    return score;
  };

  return (
    <>
      <table className="min-w-full">
        <thead className="bg-white">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-md font-bold tracking-wider w-1/2">Page Speed</th>
            <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">{status}</th>
            <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">Impact</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="px-6 py-4 text-left">Mobile Score</td>
            <td className="px-6 py-4 text-center">
              <span className="inline-block align-middle">
                {mobile ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
              </span>
            </td>
            <td className="px-6 py-4 text-center">High</td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-left">Desktop Score</td>
            <td className="px-6 py-4 text-center">
              <span className="inline-block align-middle">
                {desktop ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
              </span>
            </td>
            <td className="px-6 py-4 text-center">High</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PageSpeed;
