import { useState, useEffect, useCallback } from 'react';

const onMouseMove = (resize: (mouseMoveEvent) => void) => {
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const handleResize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        resize(mouseMoveEvent);
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleResize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  return { startResizing };
};

export default onMouseMove;
