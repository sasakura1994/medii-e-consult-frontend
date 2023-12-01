import React from 'react';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import Link from 'next/link';
import { incurableDiseaseGroupColumnMock } from '@/hooks/api/doctor/IncurableDiseaseGroupColumn';

export const IncurableDiseaseGroupColumn = () => {
  const { postEventLog } = useEventLog();

  return (
    <div className="flex gap-4">
      {incurableDiseaseGroupColumnMock.map((incurableDisease, index) => {
        return (
          <div
            onClick={() => {
              postEventLog({ name: 'click-group-banner', parameter: incurableDisease.transition_distination });
            }}
            key={index}
          >
            <Link href={`${incurableDisease.consultUrl}`} target="_blank">
              <div className="w-[320px]">
                <img src={incurableDisease.image} alt="disease" />
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
