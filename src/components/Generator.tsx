import React, { useContext, useEffect, useState } from 'react';
import { loadData } from '../utils/localStorage';
import { postChatGPTMessage } from '../utils/chatGPTUtil';
import { AppProps, AppContext } from '../App';

const Generator = () => {
  const { resume, openAIKey } = useContext<AppProps>(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  useEffect(() => {
    const fetchedJobDescription = async () => {
      const fetchedJd = await loadData('jobDescription');
      setJobDescription(fetchedJd);
    };
    fetchedJobDescription();
  }, []);

  const generateCoverLetter = async () => {
    setIsLoading(true);
    try {
      // Create message to send to chatGPT API
      const message = `Generate a cover letter based on the following resume and job description:\n\nRESUME:\n${resume}\n\nJob Description:\n${jobDescription}`;
      // Send message to chatGPT API and wait for response
      const chatGPTResponse = await postChatGPTMessage(message, openAIKey);
      // Update state with generated cover letter
      setCoverLetter(chatGPTResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //Genertor compoent where we get the generarted COver letter
  return (
    <div className="flex flex-col p-5">
      <div className="flex-col mb-4">
        <label htmlFor="openAIKey" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Job Description
        </label>
        <textarea
          rows={4}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Paste job description here..."
          value={coverLetter}
        />
      </div>

      <div className="mb-4 text-center">
        <button
          onClick={() => generateCoverLetter()}
          className="rounded-xl border-2 border-b-2 border-r-2 border-black px-4 py-1 text-md font-serif font-bold transition-all hover:translate-y-[2px] bg-[#fb923c77] hover:bg-slate-200 shadow-sm shadow-black"
        >
          {isLoading ? 'Generating..' : 'Generate'}
        </button>
      </div>
      {/* Second row where we get the generated cover letter */}
      <div className="mb-6">
        <label htmlFor="resume" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Generated Resume
        </label>
        <textarea
          id="resume"
          name="resume"
          rows={8}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Generated Resume"
          defaultValue={resume}
        ></textarea>
      </div>
      <div className="flex-col mb-6">
        <label htmlFor="openAIKey" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Generated Cover Letter
        </label>
        <textarea
          rows={6}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Generated Cover Letter"
          value={coverLetter}
        />
      </div>
    </div>
  );
};

export default Generator;
