import React, { ReactElement, useState, useEffect, useRef, useCallback, createContext } from 'react';
import { BsRobot } from 'react-icons/bs';
import { LuSettings } from 'react-icons/lu';
import { APP_COLLAPSE_WIDTH, APP_EXTEND_WIDTH } from './const';
import Button from './components/Button';
import Content from './Content';
import { ROUTES } from './utils/routes';

interface AppProps {
  route: string;
}

const defaultAppProps: AppProps = {
  route: ROUTES.GENERATOR,
};

const AppContext = createContext<AppProps | null>(null);

export default function App({
  onWidthChange,
  initialEnabled,
}: {
  onWidthChange: (value: number) => void;
  initialEnabled: boolean;
}): ReactElement {
  const [isResizing, setIsResizing] = useState(false);
  const [enabled, setEnabled] = useState(initialEnabled);
  const [sidebarWidth, setSidebarWidth] = useState(initialEnabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        setSidebarWidth(window.innerWidth - mouseMoveEvent.clientX);
        onWidthChange(window.innerWidth - mouseMoveEvent.clientX);
      }
    },
    [isResizing]
  );

  useEffect(() => {
    handleOnToggle(initialEnabled);
  }, [initialEnabled]);

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  function handleOnToggle(enabled: boolean) {
    window['chrome'].storage?.local.set({ enabled });
    const value = enabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH;
    onWidthChange(value);
    setSidebarWidth(enabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH);
  }

  function openPanel(force?: boolean) {
    const newValue = force || !enabled;
    setEnabled(newValue);
    handleOnToggle(newValue);
  }

  return (
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
        style={{
          bottom: 20,
          right: sidebarWidth,
        }}
        className="fixed w-[50px] z-10 p-1"
      >
        <Button
          onClick={() => openPanel()}
          className="bg-[#fb923c77] rounded-l-lg flex justify-center items-center mb-2"
        >
          <BsRobot size={24} style={{ zIndex: 100 }} />
        </Button>

        <Button
          onClick={() => openPanel()}
          className="bg-[#fb923c77] rounded-l-lg flex justify-center items-center mb-2"
        >
          <LuSettings size={24} style={{ zIndex: 100 }} />
        </Button>
      </div>

      <AppContext.Provider value={defaultAppProps}>
        <div>{enabled && <Content />}</div>
      </AppContext.Provider>
    </div>
  );
}
