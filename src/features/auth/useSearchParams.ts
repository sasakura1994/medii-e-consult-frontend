import { useSearchParams } from "next/navigation";

export const searchParam = () => {
    const searchParams = useSearchParams();
    return searchParams.get('token');
};
