import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAltKeyword, setContent, setDesktopScore, setInternalLink, setMetaTag, setMobileScore, setScreenshot, setTitleMeta, setURLReport } from '../../../utility/scoreSlice';
import { checkAltKeyword, checkContent, checkInternalLinks, checkScore, checkTags, checkTitleMeta, checkURL, getScreenshot } from '../../../api/report';
import { setContentLoader, setImageLoader, setLinkLoader, setScoreLoader, setScreenshotLoader, setTagLoader, setTitlemetaLoader, setUrlLoader, setLoadingProgress } from '../../../utility/reportLoaderSlice';

const BackgroundLoader = () => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.inputs.url);
  const primaryKeywords = useSelector((state) => state.inputs.primaryKeywords);
  const secondaryKeywords = useSelector((state) => state.inputs.secondaryKeywords);

  useEffect(() => {
    const runSequence = async () => {
      const totalTasks = 8; // Total number of tasks
      let completedTasks = 0;

      // Set all loaders to true
      dispatch(setScoreLoader(true));
      dispatch(setScreenshotLoader(true));
      dispatch(setLinkLoader(true));
      dispatch(setImageLoader(true));
      dispatch(setTagLoader(true));
      dispatch(setUrlLoader(true));
      dispatch(setTitlemetaLoader(true));
      dispatch(setContentLoader(true));

      const updateProgress = () => {
        completedTasks++;
        // Calculate progress as a percentage
        const progress = Math.min(Math.round((completedTasks / totalTasks) * 100), 100);
        console.log(`Progress updated to ${progress}% after ${completedTasks} tasks completed.`);
        dispatch(setLoadingProgress(progress));
      };      

      await getLinks();
      dispatch(setLinkLoader(false));
      updateProgress();

      await getAltKeyword();
      dispatch(setImageLoader(false));
      updateProgress();

      await getMetaTags();
      dispatch(setTagLoader(false));
      updateProgress();

      await getURLInfo();
      dispatch(setUrlLoader(false));
      updateProgress();

      await getTitleInfo();
      dispatch(setTitlemetaLoader(false));
      updateProgress();

      await getContentInfo();
      dispatch(setContentLoader(false));
      updateProgress();

      await getScore();
      dispatch(setScoreLoader(false));
      updateProgress();

      await getSS();
      dispatch(setScreenshotLoader(false));
      updateProgress();
    };

    runSequence();
  }, [url, primaryKeywords, secondaryKeywords]);

  const getScore = async () => {
    const output = await checkScore(url);
    dispatch(setMobileScore(output.scores.mobile));
    dispatch(setDesktopScore(output.scores.desktop));
  };

  const getSS = async () => {
    const output = await getScreenshot(url);
    dispatch(setScreenshot(output.ssImg));
  };

  const getLinks = async () => {
    try {
      const output = await checkInternalLinks(url);
      dispatch(setInternalLink(output));
    } catch (error) {
      console.error('Error fetching internal links:', error);
    }
  };

  const getAltKeyword = async () => {
    try {
      const output = await checkAltKeyword(url, secondaryKeywords);
      dispatch(setAltKeyword(output));
    } catch (error) {
      console.error('Error fetching alt keywords:', error);
    }
  };

  const getMetaTags = async () => {
    try {
      const output = await checkTags(url);
      dispatch(setMetaTag(output));
    } catch (error) {
      console.error('Error fetching meta tags:', error);
    }
  };

  const getURLInfo = async () => {
    try {
      const output = await checkURL(url, primaryKeywords);
      dispatch(setURLReport(output));
    } catch (error) {
      console.error('Error fetching URL Info:', error);
    }
  };

  const getTitleInfo = async () => {
    try {
      const output = await checkTitleMeta(url, primaryKeywords, secondaryKeywords);
      dispatch(setTitleMeta(output));
    } catch (error) {
      console.error('Error fetching title and meta', error);
    }
  };

  const getContentInfo = async () => {
    try {
      const output = await checkContent(url, primaryKeywords, secondaryKeywords);
      dispatch(setContent(output));
    } catch (error) {
      console.error('Error fetching content', error);
    }
  };

  return null;
};

export default BackgroundLoader;
