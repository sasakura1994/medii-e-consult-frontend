import { DefaultButton } from '@/components/Parts/Button/DefaultButton';
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
        className="mx-auto w-80 rounded-md bg-white p-6 shadow-xl"
        style={{ height: '362px' }}
      >
        <div className="mx-auto flex">
          <p className="my-auto mx-auto text-center text-lg font-bold">
            {title}
          </p>
          {label && (
            <p
              className="my-auto mx-auto w-auto rounded-md bg-medii-blue-50
              px-1 py-1 text-center text-xs text-medii-blue"
            >
              {label}
            </p>
          )}
        </div>
        <img className="mx-auto mt-4" src={imageSrc} alt="consult" />
        <p className="mx-auto mt-4 text-left text-sm text-secondary">
          {description}
        </p>
        <div className="mt-6 flex justify-center space-x-2">
          {buttonSolid && linkSolid && (
            <div
              onClick={async () => {
                if (logSolid && linkSolid) {
                  await postEventLog({ name: logSolid });
                }
                router.push(linkSolid);
              }}
            >
              <DefaultButton width="full">{buttonSolid}</DefaultButton>
            </div>
          )}
          {buttonOutline && linkOutline && (
            <div
              onClick={async () => {
                if (logOutline && linkOutline) {
                  await postEventLog({ name: logOutline });
                }
                router.push(linkOutline);
              }}
            >
              <DefaultButton width="full" variant="outline">
                {buttonOutline}
              </DefaultButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
