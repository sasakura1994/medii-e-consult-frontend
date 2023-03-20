/*
--------------------------------------------------------------------
Use this component to output different head tags for each page

usage: page component
  ExamplePage.getLayout = (page: React.ReactElement) => {
    return (
      <>
        <CustomHead title="Hello page" description="write a description" />
        <ExampleLayout>{page}</ExampleLayout>
      </>
    );
  };

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
      <meta charSet="utf-8"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <title>{pageTitle}</title>
      {description && <meta name="description" content={description} />}
    </Head>
  );
};
