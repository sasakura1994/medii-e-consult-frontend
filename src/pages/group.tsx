import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layouts/Layout';
import { CustomHead } from '@/components/Layouts/Header/CustomHead';
import { NextPageWithLayout } from './_app';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { isGroupSelectedState } from '@/globalStates/group';
import { Group } from '@/features/group/Group';

type Query = {
  group_room_id?: string;
};

const GroupPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { group_room_id } = router.query as Query;
  const [isGroupSelected, setIsGroupSelected] = useAtom(isGroupSelectedState);
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (group_room_id) {
      setIsGroupSelected(true);
    }
  }, [group_room_id, setIsGroupSelected]);

  return (
    <div className="h-[100dvh] overflow-hidden">
      <CustomHead />
      {(windowWidth && windowWidth >= 1024) || (!isGroupSelected && windowWidth && windowWidth < 1024) ? (
        <Layout>
          <Group />
        </Layout>
      ) : (
        <Group />
      )}
    </div>
  );
};

export default GroupPage;

GroupPage.getLayout = (page) => {
  return <>{page}</>;
};
