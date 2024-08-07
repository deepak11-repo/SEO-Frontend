import React, { useEffect, useState } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { addTechScore } from '../../../utility/scoreSlice';

const Compilance = () => {
  const compilance = useSelector((state) => state.inputs.compilance);
  const [canonicalTag, setCanonicalTag] = useState(false);
  const [structuredData, setStructuredData] = useState(false);
  const [status, setStatus] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (compilance) {
      setCanonicalTag(compilance.canonicalTag.hasCanonicalTags || false);
      setStructuredData(compilance.structuredData.exists && compilance.structuredData.isValid || false);
    }
  }, [compilance]);

  useEffect(() => {
    updateStatus();
    // Calculate and dispatch the score whenever the compliance state changes
    const trueCount = [canonicalTag, structuredData].filter(Boolean).length;
    const scoreToAdd = trueCount * 5;
    dispatch(addTechScore(scoreToAdd));
  }, [canonicalTag, structuredData, dispatch]);

  const updateStatus = () => {
    const trueCount = [canonicalTag, structuredData].filter(Boolean).length;
    if (trueCount === 2) {
      setStatus('Good');
    } else if (trueCount === 1) {
      setStatus('Average');
    } else {
      setStatus('Poor');
    }
  };

  return (
    <div>
      <table className="min-w-full">
        <thead className="bg-white">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-md font-bold tracking-wider w-1/2">Compliance</th>
            <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">{status}</th>
            <th scope="col" className="px-6 py-3 text-center text-md font-bold tracking-wider w-1/4">Impact</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="px-6 py-4 text-left">Canonical Tag</td>
            <td className="px-6 py-4 text-center">
              <span className="inline-block align-middle">
                {canonicalTag ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
              </span>
            </td>
            <td className="px-6 py-4 text-center">High</td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-left">Structured Data</td>
            <td className="px-6 py-4 text-center">
              <span className="inline-block align-middle">
                {structuredData ? <FaRegCheckCircle className="text-green-600 text-lg" /> : <ImCross className="text-red-600 text-lg" />}
              </span>
            </td>
            <td className="px-6 py-4 text-center">High</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Compilance;
