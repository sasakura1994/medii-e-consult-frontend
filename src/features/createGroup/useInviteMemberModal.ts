import { SearchGroupMember, SearchQuery, useFetchSearchMember } from '@/hooks/api/group/useFetchSearchMember';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { usePrefecture } from '@/hooks/prefecture/usePrefecture';
import { useRef, useState } from 'react';

export const useInviteMemberModal = () => {
  const { prefectures } = usePrefecture();
  const selectedPrefectureRef = useRef('');
  const specialityCodeRef = useRef('');
  const nameRef = useRef('');
  const checkedMemberRef = useRef<SearchGroupMember[]>([]);
  const [searchedMemberState, setSearchedMemberState] = useState<SearchQuery | undefined>(undefined);
  const { members: searchedMember } = useFetchSearchMember(searchedMemberState);
  const { medicalSpecialities } = useFetchMedicalSpecialities();
  return {
    prefectures,
    selectedPrefectureRef,
    specialityCodeRef,
    nameRef,
    checkedMemberRef,
    searchedMemberState,
    setSearchedMemberState,
    searchedMember,
    medicalSpecialities,
  };
};
