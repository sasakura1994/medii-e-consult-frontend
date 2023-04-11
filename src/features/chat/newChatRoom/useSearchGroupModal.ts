import {
  SearchGroupConditions,
  useSearchGroup,
} from '@/hooks/api/group/useSearchGroup';
import { useFetchMedicalSpecialitiesWithContract } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialitiesWithContract';
import React from 'react';

export const useSearchGroupModal = () => {
  const [searchConditions, setSearchConditions] =
    React.useState<SearchGroupConditions>({
      specialityCode: '',
      disease: '',
      area: '',
      groupName: '',
    });
  const [decidedSearchConditions, setDecidedSearchConditions] =
    React.useState<SearchGroupConditions>(searchConditions);

  const { medicalSpecialities } = useFetchMedicalSpecialitiesWithContract();
  const { groups, isLoading: isLoadingGroups } = useSearchGroup(
    decidedSearchConditions
  );

  const search = React.useCallback(() => {
    setDecidedSearchConditions(searchConditions);
  }, [searchConditions]);

  return {
    groups,
    isLoadingGroups,
    medicalSpecialities,
    search,
    searchConditions,
    setSearchConditions,
  };
};
