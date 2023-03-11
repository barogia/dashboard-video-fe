import { ReactElement, useEffect, useState } from "react";
import type React from "react";
interface IBrowser {
  children: JSX.Element | null;
}
const BrowserOnly: React.FC<IBrowser> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);

  if (!mounted) return null;
  return children;
};

export default BrowserOnly;
