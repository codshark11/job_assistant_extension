import React, { useContext } from 'react';
import { saveData } from '../utils/localStorage';
import { AppContext, AppProps } from '../App';

const Settings = () => {
  const { resume, openAIKey, setResume, setOpenAIKey } = useContext<AppProps>(AppContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedResume = (formData.get('resume') ?? '').toString();
    const updatedOpenAIKey = (formData.get('openAIKey') ?? '').toString();
    setResume(updatedResume);
    setOpenAIKey(updatedOpenAIKey);
    saveData('resume', updatedResume);
    saveData('openAIKey', updatedOpenAIKey);
  };

  return (
    <div className="flex flex-col p-5">
      {/* form ompoent to submit the resiume adn api key  */}
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="openAIKey" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your Open AI Key
          </label>
          <input
            id="openAIKey"
            name="openAIKey"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Paste in your api key here"
            defaultValue={openAIKey}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="resume" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your Resume
          </label>
          <textarea
            id="resume"
            name="resume"
            rows={20}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Paste in your resume here..."
            defaultValue={resume}
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="rounded-xl border-2 border-b-2 border-r-2 border-black px-4 py-1 text-md font-serif font-bold transition-all hover:translate-y-[2px] bg-[#fb923c77] hover:bg-slate-200 shadow-sm shadow-black"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
