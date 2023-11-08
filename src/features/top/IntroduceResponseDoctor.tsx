import React, { useState } from 'react';
import { introduceDoctorMock } from '@/hooks/api/doctor/IntroduceDoctor';

export const IntroduceResponseDoctor = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  return (
    <>
      <div className='flex'>
        {introduceDoctorMock.map((introduceDoctor, index) => {
          return (
            <div
              className="mr-2 min-w-[504px] rounded-lg border border-[#EDEDED] bg-white shadow-low lg:w-1/3"
              key={index}
            >
              <div className="p-4">
                <div className='flex'>
                  <div className='mr-4'>
                    <img src={introduceDoctor.image} alt="1" />
                  </div>
                  <div>
                    <div className='flex mb-2 items-center'>
                      <p className='line-clamp-2 text-xxl font-bold'>{introduceDoctor.name}</p>
                      <p className='line-clamp-1 ml-2'>先生</p>
                    </div>
                    <p className='font-bold'>
                      {introduceDoctor.job}
                      <br />
                      {introduceDoctor.guideline}
                      {introduceDoctor.position}
                    </p>
                  </div>
                </div>
                <div className='mt-1 mb-2'>
                  <img src="images/top/triangle.png" alt="triangle" />
                  <div className='bg-bg-secondary border border-[1px] border-border-divider rounded-lg p-[10px] font-[10px] gap-2.5'>
                    {introduceDoctor.description}
                  </div>
                </div>
                <div className='flex text-medii-blue-700 mb-3 cursor-pointer' onClick={() => { setShowMore(!showMore) }}>
                  <p>先生の情報をもっと見る</p>
                  <div className='flex items-center pl-2'>
                    {showMore ?
                      <img src="images/top/doctor-information-more.svg" alt="doctor-information-more" /> :
                      <img src="images/top/doctor-information-less.svg" alt="doctor-information-less" />}
                  </div>
                </div>
                {showMore &&
                  <div>
                    {introduceDoctor.university &&
                      <div className='mb-3'>
                        <p className='font-bold'>出身大学（卒年）</p>
                        <p>{introduceDoctor.university}</p>
                      </div>
                    }
                    {introduceDoctor.field &&
                      <div className='mb-3'>
                        <p className='font-bold'>専門分野</p>
                        <p>{introduceDoctor.field}</p>
                      </div>
                    }
                    {introduceDoctor.qualification &&
                      <div className='mb-3'>
                        <p className='font-bold'>学会認定・資格</p>
                        <ul>
                          {introduceDoctor.qualification.map((qualifications, key) => {
                            return (
                              <li key={key} className="pl-7 before:mt-[6px] before:absolute before:text-[4pt] before:pt-1 before:ml-[-18pt] before:content-['\25CF']">{qualifications.content}</li>
                            )
                          })}
                        </ul>
                      </div>
                    }
                    {introduceDoctor.book &&
                      <div className='mb-3'>
                        <p className='font-bold'>著書等</p>
                        <ul>
                          {introduceDoctor.book.map((books, index) => {
                            return (
                              <li key={index} className="pl-7 before:mt-[6px] before:absolute before:text-[4pt] before:pt-1 before:ml-[-18pt] before:content-['\25CF']">{books.content}</li>
                            )
                          })}
                        </ul>
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
