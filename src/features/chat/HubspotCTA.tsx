import axios from 'axios';
import React, { useRef } from 'react';
export const HubspotCTA = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const portalId = '43899841';
  const formGuid = '08c21a97-0a22-4b63-a56b-8f1863b78f29';
  const config = {
    headers: {
      'Message-Type': 'application/json',
    },
  };
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await axios.post(
            `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
            {
              portalId,
              formGuid,
              fields: [
                {
                  name: 'firstname',
                  value: firstNameRef.current?.value,
                },
              ],
            },
            config
          );
        }}
      >
        <label>
          名前
          <input
            className="rounded-sm border border-gray-300"
            type="text"
            ref={firstNameRef}
            onChange={(e) => {
              if (firstNameRef.current) {
                firstNameRef.current.value = e.target.value;
              }
            }}
          />
        </label>
        <button type="submit" value="Submit">
          送信
        </button>
      </form>
    </>
  );
};
