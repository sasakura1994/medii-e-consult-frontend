import React, { useState } from 'react';
import { introduceDoctorMock } from '@/hooks/api/doctor/IntroduceDoctor';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import Link from 'next/link';

export const IntroduceResponseDoctor = () => {
  const [showMore, setShowMore] = useState<boolean[]>(introduceDoctorMock.map(() => false));
  const { postEventLog } = useEventLog();

  return (
    <>
      <div 
        className="flex" 
        onClick={() => {
          postEventLog({ name: 'click-doctor' })
        }}
      >
        {introduceDoctorMock.map((introduceDoctor, index) => {
          return (
            <Link
              href={`${introduceDoctor.consultUrl}`}
              target="_blank"
              className="mr-2 min-w-[504px] rounded-lg border border-[#EDEDED] bg-white shadow-low lg:w-1/3"
              key={index}
            >
              <div className="p-4">
                <div className="flex">
                  <div className="mr-4 w-[70px]">
                    <img src={introduceDoctor.image} alt="introduceDoctorImage" />
                  </div>
                  <div>
                    <div className="flex mb-2 items-center">
                      <p className="text-lg font-semibold">{introduceDoctor.name}</p>
                      <p className="ml-2 text-sm font-light">先生</p>
                    </div>
                    <p className="text-sm font-semibold">
                      {introduceDoctor.job}
                      <br />
                      {introduceDoctor.guideline}
                      {introduceDoctor.position}
                    </p>
                  </div>
                </div>
                <div className="mt-1 mb-2">
                  <img 
                    src="images/top/triangle.png" 
                    alt="triangle" 
                    className="relative z-1 top-[1px]" 
                  />
                  <div 
                    className="bg-bg-secondary border border-border-divider rounded-lg 
                      p-[10px] font-light text-xs gap-2.5"
                  >
                    {introduceDoctor.description}
                  </div>
                </div>
                <div 
                  className="flex text-medii-blue-700 mb-3 cursor-pointer text-xs" 
                  onClick={
                    (e) => { 
                      e.preventDefault();
                      setShowMore(showMore.map((val, i) => i == index ? !showMore[i] : showMore[i]));
                    }
                  }
                >
                  <p>先生の情報をもっと見る</p>
                  <div className="flex items-center pl-2">
                    {showMore[index] ?
                      <img src="images/top/doctor-information-more.svg" alt="doctor-information-more" /> :
                      <img src="images/top/doctor-information-less.svg" alt="doctor-information-less" />}
                  </div>
                </div>
                {showMore[index] &&
                  <div>
                    {introduceDoctor.university &&
                      <div className="mb-3">
                        <p className="text-base font-semibold">出身大学（卒年）</p>
                        <p className="text-xs font-light">{introduceDoctor.university}</p>
                      </div>
                    }
                    {introduceDoctor.field &&
                      <div className="mb-3">
                        <p className="text-base font-semibold">専門分野</p>
                        <p className="text-xs font-light">{introduceDoctor.field}</p>
                      </div>
                    }
                    {introduceDoctor.qualification &&
                      <div className="mb-3">
                        <p className="text-base font-semibold">学会認定・資格</p>
                        <ul className="text-xs font-light">
                          {introduceDoctor.qualification.map((qualifications, key) => {
                            return (
                              <li 
                                key={key} 
                                className="pl-7 before:mt-[-2px] before:absolute before:text-[4pt] before:pt-1 
                                  before:ml-[-18pt] before:content-['\25CF']"
                              >
                                {qualifications.content}
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    }
                    {introduceDoctor.book &&
                      <div className="mb-3">
                        <p className="text-base font-semibold">著書等</p>
                        <ul className="text-xs font-light">
                          {introduceDoctor.book.map((books, index) => {
                            return (
                              <li 
                                key={index} 
                                className="pl-7 before:mt-[6px] before:absolute before:text-[4pt] before:pt-1 
                                  before:ml-[-18pt] before:content-['\25CF']"
                              >
                                {books.content}
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    }
                  </div>
                }
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
