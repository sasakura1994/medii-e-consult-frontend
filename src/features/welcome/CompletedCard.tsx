import PrimaryButton from '@/components/Button/PrimaryButton';
import TertiaryButton from '@/components/Button/TertiaryButton';
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
      <div className="mx-auto w-80 rounded-md bg-white p-6 shadow-high" style={{ height: '362px' }}>
        <div className="mx-auto flex">
          <p className="mx-auto my-auto text-center text-xl font-bold text-text-primary">{title}</p>
          {label && <Label text={label} />}
        </div>
        <img className="mx-auto mt-4 h-32 w-52" src={imageSrc} alt={title} />
        <p className="mx-auto mt-4 text-left text-md text-text-secondary">{description}</p>
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
              <PrimaryButton className="w-full" size="large">
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
              <TertiaryButton className="w-full" size="large">
                {buttonOutline}
              </TertiaryButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
