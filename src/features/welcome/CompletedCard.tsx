import PrimaryButton from '@/components/Parts/Button/Primary';
import TertiaryButton from '@/components/Parts/Button/Tertiary';
import Label from '@/components/Parts/Label/Label';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { useRouter } from 'next/router';
import React from 'react';

type CompleteCardProps = {
  title: string;
  label?: string;
  imageSrc: string;
  description: string;
  buttonSolid?: string;
  buttonOutline?: string;
  linkSolid?: string;
  linkOutline?: string;
  logSolid?: string;
  logOutline?: string;
};

export const CompleteCard = (props: CompleteCardProps) => {
  const { postEventLog } = useEventLog();
  const router = useRouter();

  const {
    title,
    label,
    imageSrc,
    description,
    buttonSolid,
    buttonOutline,
    linkSolid,
    linkOutline,
    logSolid,
    logOutline,
  } = props;
  return (
    <>
      <div
        className="mx-auto w-80 rounded-md bg-white p-6 shadow-high"
        style={{ height: '362px' }}
      >
        <div className="mx-auto flex">
          <p className="my-auto mx-auto text-center text-xl font-bold text-monotone-900">
            {title}
          </p>
          {label && <Label text={label} />}
        </div>
        <img className="mx-auto mt-4" src={imageSrc} alt="consult" />
        <p className="mx-auto mt-4 text-left text-md text-monotone-600">
          {description}
        </p>
        <div className="mt-6 flex justify-center space-x-2">
          {buttonSolid && linkSolid && (
            <div
              className="w-full"
              onClick={async () => {
                if (logSolid && linkSolid) {
                  await postEventLog({ name: logSolid });
                }
                router.push(linkSolid);
              }}
            >
              <PrimaryButton width="w-full" size="large">
                {buttonSolid}
              </PrimaryButton>
            </div>
          )}
          {buttonOutline && linkOutline && (
            <div
              className="w-full"
              onClick={async () => {
                if (logOutline && linkOutline) {
                  await postEventLog({ name: logOutline });
                }
                router.push(linkOutline);
              }}
            >
              <TertiaryButton width="w-full" size="large">
                {buttonOutline}
              </TertiaryButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
