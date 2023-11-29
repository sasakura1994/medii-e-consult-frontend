import { chatState } from '@/globalStates/chat';
import { useFetchUnreadCounts } from '@/hooks/api/chat/useFetchUnreadCounts';
import { useAtom } from 'jotai';
import { useRef, useEffect } from 'react';

export const useOpenConsultList = () => {
  const unreadCountsResponseData = useFetchUnreadCounts();
  const [chatGlobalState, setChatGlobalState] = useAtom(chatState);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollPosition = scrollContainerRef.current?.scrollTop;
        setChatGlobalState((prev) => ({
          ...prev,
          openChatScrollPosition: scrollPosition || 0,
        }));
      }, 200);
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [setChatGlobalState]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = chatGlobalState.openChatScrollPosition;
    }
  }, [chatGlobalState.openChatScrollPosition]);

  return {
    scrollContainerRef,
    setChatGlobalState,
    unreadCountsResponseData,
    chatGlobalState,
  };
};
