/*
--------------------------------------------------------------------
Use this component to output different head tags for each page

usage:
  <CustomHead title="Hello page" description="write a description" />
--------------------------------------------------------------------
*/
import React from 'react';
import Head from 'next/head';

type PropsType = {
  title?: string;
  description?: string;
};

export const CustomHead: React.FC<PropsType> = (props) => {
  const defaultTitle = 'Medii E-コンサル';
  const { title, description } = props;
  const pageTitle = !title ? defaultTitle : `${title} - ${defaultTitle}`;

  return (
    <Head>
      <title>{pageTitle}</title>
      {description && <meta name="description" content={description} />}
    </Head>
  );
};
