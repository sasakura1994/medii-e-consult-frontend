import React from 'react';
import { ConsultList } from './ConsultList';
import { ConsultDetail } from './ConsultDetail';
export const Chat = () => {
  return (
    <div className="flex">
      <ConsultList />
      <ConsultDetail />
    </div>
  );
};
