import React, { ReactElement, useState, useEffect, useRef, useCallback } from 'react';
import { APP_COLLAPSE_WIDTH, APP_EXTEND_WIDTH } from './const';
import Button from './components/Button';

export default function Panel({
  onWidthChange,
  initialEnabled,
}: {
  onWidthChange: (value: number) => void;
  initialEnabled: boolean;
}): ReactElement {
  const [isResizing, setIsResizing] = useState(false);
  const [enabled, setEnabled] = useState(initialEnabled);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarWidth, setSidebarWidth] = useState(initialEnabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH);

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
      onMouseDown={(e) => e.preventDefault()}
      className="absolute top-0 right-0 bottom-0 z-max bg-[#F5F8FA] overflow-hidden"
    >
      <div className="absolute top-0 bottom-0 left-0 w-1 cursor-w-resize z-50" onMouseDown={startResizing} />
      <div className="absolute bottom-0 left-0 w-[50px] z-10 flex justify-center items-center p-1">
        <Button active={enabled} onClick={() => openPanel()}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  enabled
                    ? 'M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25'
                    : 'M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15'
                }
              />
            </svg>
          </span>
        </Button>
      </div>
    </div>
  );
}
