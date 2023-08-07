import { SearchGroupConditions, SearchedGroupEntity, useSearchGroup } from '@/hooks/api/group/useSearchGroup';
import { useFetchMedicalSpecialitiesWithContract } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialitiesWithContract';
import React, { useCallback } from 'react';

export const useSearchGroupModal = () => {
  const [searchConditions, setSearchConditions] = React.useState<SearchGroupConditions>({
    specialityCode: '',
    disease: '',
    area: '',
    groupName: '',
  });
  const [decidedSearchConditions, setDecidedSearchConditions] = React.useState<SearchGroupConditions>(searchConditions);
  const [group, setGroup] = React.useState<SearchedGroupEntity>();

  const { medicalSpecialities } = useFetchMedicalSpecialitiesWithContract();
  const { groups, isLoading: isLoadingGroups } = useSearchGroup(decidedSearchConditions);

  const search = React.useCallback(() => {
    setDecidedSearchConditions(searchConditions);
  }, [searchConditions]);

  const getMedicalSpecialityNames = useCallback(
    (group: SearchedGroupEntity) => {
      if (!medicalSpecialities) {
        return '';
      }
      return Object.keys(group.speciality_counts)
        .map(
          (specialityCode) =>
            medicalSpecialities.find((medicalSpeciality) => medicalSpeciality.speciality_code === specialityCode)?.name
        )
        .filter((name) => name !== undefined)
        .join('\n');
    },
    [medicalSpecialities]
  );

  return {
    getMedicalSpecialityNames,
    group,
    groups,
    isLoadingGroups,
    medicalSpecialities,
    search,
    searchConditions,
    setGroup,
    setSearchConditions,
  };
};
