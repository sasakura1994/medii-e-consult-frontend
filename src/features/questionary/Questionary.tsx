import { useRouter } from 'next/router';
import React from 'react';
import HubspotForm from 'react-hubspot-form';

type Query = {
  id: string;
};

export const Questionary = () => {
  const router = useRouter();
  const { id: formId } = router.query as Query;
  if (!process.env.HUBSPOT_PORTAL_ID || !formId) {
    return <></>;
  }
  return (
    <div className="m-4">
      <HubspotForm portalId={process.env.HUBSPOT_PORTAL_ID} formId={formId} />
    </div>
  );
};
