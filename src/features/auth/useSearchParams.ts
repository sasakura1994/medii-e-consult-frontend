import { useSearchParams } from "next/navigation";

export const SearchParam = () => {
    const searchParams = useSearchParams();
    return searchParams.get('token');
};
