import React, { useState } from 'react';
import { introduceDoctorMock } from '@/hooks/api/doctor/IntroduceDoctor';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import Link from 'next/link';

export const IntroduceResponseDoctor = () => {
  const [showMore, setShowMore] = useState<boolean[]>(introduceDoctorMock.map(() => false));
  const { postEventLog } = useEventLog();

  return (
    <div className="flex gap-2">
      {introduceDoctorMock.map((introduceDoctor, index) => {
        return (
          <div
            onClick={() => {
              postEventLog({ name: 'click-doctor', parameter: introduceDoctor.account_id });
            }}
            key={index}
          >
            <Link href={`${introduceDoctor.consultUrl}`} target="_blank">
              <div
                className="w-[330px] rounded-lg border border-[#EDEDED] bg-white
                px-4 pt-4 shadow-low lg:w-[508px]"
              >
                <div className="grid-cols-1/7 grid grid-flow-col items-center gap-x-4 lg:flex lg:items-start">
                  <div>
                    <img src={introduceDoctor.image} alt="introduceDoctorImage" className="w-full" />
                  </div>
                  <div className="lg:mt-5">
                    <div className="mb-2 flex items-center">
                      <p className="text-lg font-semibold">{introduceDoctor.name}</p>
                      <p className="ml-2 text-sm font-light">先生</p>
                    </div>
                    <p className="text-sm font-semibold text-text-primary">
                      {introduceDoctor.job}
                      <br />
                      {introduceDoctor.guideline}
                      {introduceDoctor.position}
                    </p>
                  </div>
                </div>
                <div className="mb-2 mt-1">
                  <img src="images/top/triangle.png" alt="triangle" className="z-1 relative top-[1px]" />
                  <div
                    className="gap-2.5 rounded-lg border border-border-divider 
                      bg-bg-secondary p-[10px] text-xs font-light"
                  >
                    {introduceDoctor.description}
                  </div>
                </div>
                <div
                  className="mb-3 flex cursor-pointer text-xs text-medii-blue-700"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowMore(showMore.map((val, i) => (i == index ? !showMore[i] : showMore[i])));
                  }}
                >
                  <p>先生の情報をもっと見る</p>
                  <div className="flex items-center pl-2">
                    {showMore[index] ? (
                      <img src="images/top/doctor-information-more.svg" alt="doctor-information-more" />
                    ) : (
                      <img src="images/top/doctor-information-less.svg" alt="doctor-information-less" />
                    )}
                  </div>
                </div>
                {showMore[index] && (
                  <div>
                    {introduceDoctor.university && (
                      <div className="mb-3">
                        <p className="text-base font-semibold">出身大学（卒年）</p>
                        <p className="text-xs font-light">{introduceDoctor.university}</p>
                      </div>
                    )}
                    {introduceDoctor.field && (
                      <div className="mb-3">
                        <p className="text-base font-semibold">専門分野</p>
                        <p className="text-xs font-light">{introduceDoctor.field}</p>
                      </div>
                    )}
                    {introduceDoctor.qualification && (
                      <div className="mb-3">
                        <p className="text-base font-semibold">学会認定・資格</p>
                        <ul className="relative text-xs font-light">
                          {introduceDoctor.qualification.map((qualifications, key) => {
                            return (
                              <li
                                key={key}
                                className="pl-7 before:absolute before:ml-[-18pt] before:mt-[-2px] before:pt-1 
                                  before:text-[4pt] before:content-['\25CF']"
                              >
                                {qualifications.content}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                    {introduceDoctor.book && (
                      <div className="mb-3">
                        <p className="text-base font-semibold">著書等</p>
                        <ul className="relative text-xs font-light">
                          {introduceDoctor.book.map((books, index) => {
                            return (
                              <li
                                key={index}
                                className="pl-7 before:absolute before:ml-[-18pt] before:mt-[-2px] before:pt-1 
                                  before:text-[4pt] before:content-['\25CF']"
                              >
                                {books.content}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
