import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { ChatDraftImageEntity } from '@/types/entities/chat/ChatDraftImageEntity';

const endpoint = '/api/chat_draft_image/chat_draft_images';

export type GetChatDraftImagesResponseData = {
  chat_draft_images: ChatDraftImageEntity[];
};

type Args = {
  isNeed: boolean;
};

export const useGetChatDraftImages = (args: Args) => {
  const { isLoading, error, data, mutate } =
    useAuthenticatedSWR<GetChatDraftImagesResponseData>(
      args.isNeed ? endpoint : null
    );

  return {
    isLoading,
    error,
    mutate,
    chatDraftImages: data?.chat_draft_images,
  };
};
