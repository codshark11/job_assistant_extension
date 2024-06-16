import React, { useContext, useEffect, useState } from 'react';
import Generator from './components/Generator';
import Settings from './components/Settings';
import { ROUTES } from './utils/routes';
import { loadData } from './utils/localStorage';
import { AppContext, AppProps } from './App';

function Content() {
  const { route } = useContext<AppProps>(AppContext);
  const [resume, setResume] = useState('');
  const [openAIKey, setOpenAIKey] = useState('');

  useEffect(() => {
    const fetchLocalData = async () => {
      const fetchedResume = await loadData('resume');
      const fetchedAIKey = await loadData('openAIKey');

      setResume(fetchedResume);
      setOpenAIKey(fetchedAIKey); //
    };
    fetchLocalData();
  }, []);

  switch (route) {
    case ROUTES.SETTINGS:
      return <Settings resume={resume} setResume={setResume} openAIKey={openAIKey} setOpenAIKey={setOpenAIKey} />;

    default:
      return <Generator resume={resume} openAIKey={openAIKey} />;
  }
}

export default Content;
