import {useEffect, useState} from "react";


export function useScrollListener() {
  const [scroll, setScroll] = useState({
    pageYOffset: 0,
  });

  function handleScroll() {
    setScroll({
      pageYOffset: window.pageYOffset,
    });
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scroll;
}
