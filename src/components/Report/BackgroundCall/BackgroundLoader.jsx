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

      // Execute each function and ensure the sequence continues regardless of errors
      await executeTask(getLinks, setLinkLoader);
      updateProgress();

      await executeTask(getAltKeyword, setImageLoader);
      updateProgress();

      await executeTask(getMetaTags, setTagLoader);
      updateProgress();

      await executeTask(getURLInfo, setUrlLoader);
      updateProgress();

      await executeTask(getTitleInfo, setTitlemetaLoader);
      updateProgress();

      await executeTask(getContentInfo, setContentLoader);
      updateProgress();

      await executeTask(getScore, setScoreLoader);
      updateProgress();

      await executeTask(getSS, setScreenshotLoader);
      updateProgress();
    };

    const executeTask = async (task, loaderAction) => {
      try {
        await task();
      } catch (error) {
        console.error(`Error executing task ${task.name}:`, error);
      } finally {
        dispatch(loaderAction(false));
      }
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
    const output = await checkInternalLinks(url);
    dispatch(setInternalLink(output));
  };

  const getAltKeyword = async () => {
    const output = await checkAltKeyword(url, secondaryKeywords);
    dispatch(setAltKeyword(output));
  };

  const getMetaTags = async () => {
    const output = await checkTags(url);
    dispatch(setMetaTag(output));
  };

  const getURLInfo = async () => {
    const output = await checkURL(url, primaryKeywords);
    dispatch(setURLReport(output));
  };

  const getTitleInfo = async () => {
    const output = await checkTitleMeta(url, primaryKeywords, secondaryKeywords);
    dispatch(setTitleMeta(output));
  };

  const getContentInfo = async () => {
    const output = await checkContent(url, primaryKeywords, secondaryKeywords);
    dispatch(setContent(output));
  };

  return null;
};

export default BackgroundLoader;
