import React, { useEffect, useState } from 'react';
import Generator from './components/Generator';
import Settings from './components/Settings';
import { ROUTES } from './utils/routes';
import { loadData } from './utils/localStorage';

function Content() {
  const [page, setPage] = useState('');
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

  switch (page) {
    case ROUTES.SETTINGS:
      return (
        <Settings
          setPage={setPage}
          resume={resume}
          setResume={setResume}
          openAIKey={openAIKey}
          setOpenAIKey={setOpenAIKey}
        />
      );

    default:
      return <Generator setPage={setPage} resume={resume} openAIKey={openAIKey} />;
  }
}

export default Content;
