import React from 'react';
import { incurableDiseaseGroupColumnMock } from '@/hooks/api/doctor/IncurableDiseaseGroupColumn';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import Link from 'next/link';

export const IncurableDiseaseGroupColumn = () => {
  const { postEventLog } = useEventLog();

  return (
    <div className="flex gap-2">
      {incurableDiseaseGroupColumnMock.map((incurableDisease, index) => {
        return (
          <div
            onClick={() => {
              postEventLog({ name: 'click-group-banner', parameter: incurableDisease.transition_distination });
            }}
            key={index}
          >
            <Link href={`${incurableDisease.consultUrl}`} target="_blank">
              <div>
                <img src={incurableDisease.image} alt="disease" />
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
