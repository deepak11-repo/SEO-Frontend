import React from 'react';
import ProgressCircle from '../ProgressCircle/ProgressCircle';
import pcImg from '../../../assets/pcImg.png';
import { useSelector } from 'react-redux';

const Page2 = () => {
    const url = useSelector((state) => state.inputs.url);

    // Retrieve scores and screenshot from Redux store
    const techScore = useSelector((state) => state.scores.techScore);
    const pageScore = useSelector((state) => state.scores.pageScore);
    const mobileScore = useSelector((state) => state.scores.mobileScore);
    const desktopScore = useSelector((state) => state.scores.desktopScore);
    const screenshot = useSelector((state) => state.scores.screenshot);

    const calculateScores = () => {
        const calculatedTechScore = 99.6 * techScore / 60;
        const calculatedPageScore = 100 * pageScore / 80;
        const averageScore = (desktopScore + mobileScore + calculatedTechScore + calculatedPageScore) / 4;
        return { calculatedTechScore, calculatedPageScore, averageScore };
    };

    const { calculatedTechScore, calculatedPageScore, averageScore } = calculateScores();

    return (
        <>
            <div className="p-4 bg-[#e06665] text-lg text-white font-semibold">Audit Results for: {url}</div>
            <div className="flex w-full mt-8 justify-between p-4">
                <div className="flex flex-col items-center gap-5 w-[20%]">
                    <div className="text-xl rounded-lg font-bold text-center pb-1">
                      SEO Score
                    </div>
                    {averageScore !== undefined && (
                      <div className="flex items-center justify-center w-full">
                        <ProgressCircle score={averageScore} />
                      </div>
                    )}
                </div>
                <div className="w-[80%] flex justify-end pr-4 relative">
                    <img src={pcImg} alt='pcImg' className="w-[300px]" />
                    {screenshot && <img src={screenshot} alt="Screenshot of website" className="w-[275px] h-[153px] absolute top-4 right-7" />}
                </div>
            </div>
            <div className="flex p-4 w-full justify-between mt-5">
                <div className="flex flex-col items-center gap-5">
                    <div className="text-md rounded-lg font-bold text-center pb-1">
                      Desktop Score
                    </div>
                    {desktopScore && (
                      <div className="flex items-center justify-center w-full">
                        <ProgressCircle score={desktopScore} pathColor="Turquoise" />
                      </div>
                    )}
                </div>
                <div className="flex flex-col gap-5 items-center">
                    <div className="text-md rounded-lg font-bold text-center pb-1">
                      Mobile Score
                    </div>
                    {mobileScore && (
                      <div className="flex items-center justify-center w-full">
                        <ProgressCircle score={mobileScore} pathColor="Turquoise" />
                      </div>
                    )}
                </div>
                <div className="flex flex-col gap-5 items-center">
                  <div className="text-md rounded-lg font-bold text-center py-1 px-2">
                    Technical SEO
                  </div>
                  {techScore && (
                    <div className="flex items-center justify-center w-full">
                      <ProgressCircle score={calculatedTechScore} pathColor="Gold" />
                    </div>
                  )}
                </div>              
                <div className="flex flex-col gap-5 items-center">
                  <div className="text-md rounded-lg font-bold text-center py-1 px-2">
                    On Page SEO
                  </div>
                  {pageScore && (
                    <div className="flex items-center justify-center w-full">
                      <ProgressCircle score={calculatedPageScore} pathColor="Violet" />
                    </div>
                  )}
                </div>
            </div>
        </>
    );
};

export default Page2;
