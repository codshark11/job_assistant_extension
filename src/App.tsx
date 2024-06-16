import React, { ReactElement, useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { BsRobot } from 'react-icons/bs';
import { IoCloseSharp } from 'react-icons/io5';
import { LuSettings } from 'react-icons/lu';
import { APP_COLLAPSE_WIDTH, APP_EXTEND_WIDTH, ROUTES } from './const';
import Button from './components/Button';
import Content from './Content';
import onMouseMove from './hooks/onMouseMove';
import { loadData } from './utils/localStorage';

export interface AppProps {
  route: string;
  openAIKey: string;
  resume: string;
  setOpenAIKey: (key: string) => void;
  setRoute: (route: string) => void;
  setResume: (resume: string) => void;
}

const defaultAppProps: AppProps = {
  route: ROUTES.GENERATOR,
  setRoute: function (route: string): void {
    throw new Error('Function not implemented.');
  },
  openAIKey: '',
  setOpenAIKey: function (key: string): void {
    throw new Error('Function not implemented.');
  },
  resume: '',
  setResume: function (resume: string): void {
    throw new Error('Function not implemented.');
  },
};

export const AppContext = createContext<AppProps>(defaultAppProps);

export default function App({
  onWidthChange,
  initialEnabled,
}: {
  onWidthChange: (value: number) => void;
  initialEnabled: boolean;
}): ReactElement {
  // Context to manage the route and openAIKey
  const [route, setRoute] = useState(initialEnabled ? ROUTES.GENERATOR : '');
  const [openAIKey, setOpenAIKey] = useState('');
  const [resume, setResume] = useState('');

  // State to manage the sidebar width and control top
  const [sidebarWidth, setSidebarWidth] = useState(initialEnabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH);
  const [controlTop, setControlTop] = useState(80);

  // Refs to manage the resizing and moving of the sidebar
  const sidebarRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);

  // Custom hook to manage the resizing of the sidebar
  const { startResizing } = onMouseMove((mouseMoveEvent) => {
    setSidebarWidth(window.innerWidth - mouseMoveEvent.clientX);
    onWidthChange(window.innerWidth - mouseMoveEvent.clientX);
  });

  // Custom hook to manage the moving of the control
  const { startResizing: startControlMoving } = onMouseMove((mouseMoveEvent) => {
    if (!controlRef.current) return;
    setControlTop(controlRef.current.offsetTop + mouseMoveEvent.movementY);
  });

  useEffect(() => {
    const fetchLocalData = async () => {
      const fetchedResume = await loadData('resume');
      const fetchedAIKey = await loadData('openAIKey');

      setResume(fetchedResume);
      setOpenAIKey(fetchedAIKey); //
    };
    fetchLocalData();
  }, []);

  // Set the initial state of the sidebar
  useEffect(() => {
    handleOnToggle(initialEnabled);
  }, [initialEnabled]);

  // Function to handle the toggle of the sidebar
  function handleOnToggle(enabled: boolean) {
    window['chrome'].storage?.local.set({ enabled });
    const value = enabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH;
    onWidthChange(value);
    setSidebarWidth(enabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH);
    setRoute('');
  }

  // Function to open the route
  function openRoute(r: string) {
    handleOnToggle(true);
    setRoute(r);
  }

  return (
    <AppContext.Provider value={{ route, setRoute, openAIKey, setOpenAIKey, resume, setResume }}>
      <div
        ref={sidebarRef}
        style={{
          boxShadow: '0px 0px 5px #0000009e',
          width: sidebarWidth,
        }}
        className="absolute top-0 right-0 bottom-0 z-max bg-[#F5F8FA] overflow-hidden"
      >
        <div className="absolute top-0 bottom-0 left-0 w-2 cursor-w-resize z-50" onMouseDown={startResizing} />

        <div
          ref={controlRef}
          style={{
            top: controlTop,
            right: sidebarWidth,
          }}
          className="fixed w-[50px] z-10 p-1"
          onMouseDown={startControlMoving}
        >
          <Button
            onClick={() => {
              openRoute(ROUTES.GENERATOR);
            }}
            className="bg-[#fb923c77] rounded-l-lg flex justify-center items-center mb-2"
          >
            <BsRobot size={24} style={{ zIndex: 100 }} />
          </Button>

          <Button
            onClick={() => openRoute(ROUTES.SETTINGS)}
            className="bg-[#fb923c77] rounded-l-lg flex justify-center items-center mb-2"
          >
            <LuSettings size={24} style={{ zIndex: 100 }} />
          </Button>

          {route && (
            <Button
              onClick={() => handleOnToggle(false)}
              className="bg-[#fb923c77] rounded-l-lg flex justify-center items-center mb-2"
            >
              <IoCloseSharp size={24} style={{ zIndex: 100 }} />
            </Button>
          )}
        </div>

        <div>{!!route && <Content />}</div>
      </div>
    </AppContext.Provider>
  );
}
