import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FcPaid } from "react-icons/fc";

//화면 상단 헤더 컴포넌트
export const Header = () => {
  const [isTop, setIsTop] = useState(true);

  const onScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop >= 40) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }
  }, [isTop]);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);

    return () => document.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <div
      className={`flex py-2 px-10 w-full fixed ${
        isTop ? "h-24 bg-gray-800" : "h-16 bg-gray-800/[0.8]"
      } z-50 cursor-pointer transition-all duration-150`}
    >
      <nav className="flex items-center space-x-2">
        <Link to="/">
          <div className="flex items-center">
            <FcPaid className="w-14 h-14 mr-2" />
          </div>
        </Link>
      </nav>
    </div>
  );
};
