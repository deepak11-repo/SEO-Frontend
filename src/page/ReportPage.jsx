import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import PDFComponent from '../components/Report/PDFComponent/PDFComponent';
import { useSelector } from 'react-redux';
import BackgroundLoader from '../components/Report/BackgroundCall/BackgroundLoader';
import ReportLoader from '../components/Report/ReportLoader/ReportLoader';

const ReportPage = () => {
  const scoreLoader = useSelector((state) => state.reportLoader.scoreLoader);
  const urlLoader = useSelector((state) => state.reportLoader.urlLoader);
  const titlemetaLoader = useSelector((state) => state.reportLoader.titlemetaLoader);
  const imageLoader = useSelector((state) => state.reportLoader.imageLoader);
  const contentLoader = useSelector((state) => state.reportLoader.contentLoader);
  const linkLoader = useSelector((state) => state.reportLoader.linkLoader);
  const tagLoader = useSelector((state) => state.reportLoader.tagLoader); 
  const screenshotLoader = useSelector((state) => state.reportLoader.screenshotLoader);

  const allLoaders = [
    scoreLoader,
    screenshotLoader,
    imageLoader,
    linkLoader,
    tagLoader,
    urlLoader,
    titlemetaLoader,
    contentLoader,
  ];

  const allLoadersFalse = allLoaders.every(loader => !loader);

  return (
    <>      
      <BackgroundLoader/> 
      {allLoadersFalse ? (
        <>
          <Navbar />
          <PDFComponent />
        </>
        
      ) : (
        <div className='w-full h-screen flex items-center justify-center' style={{
          background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(52,49,49,1) 0%, rgba(140,135,135,1) 52%, rgba(150,148,148,1) 100%)"
        }}>
          <div className='w-1/2 py-[15%]'>
            <ReportLoader/>
          </div>
        </div>
      )}
    </>
  );
}

export default ReportPage;
