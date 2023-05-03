import React from 'react';
import type { NextPage } from 'next';
import { SeminarEntityType } from '@/types/entities/seminarEntity';
import { SeminarCard } from '@/features/seminar/seminarCard';
import { Modal } from '@/components/Parts/Modal/Modal';
import { useRouter } from 'next/router';
import { UseSeminarDetail } from '@/features/seminar/useSeminarDetail';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { SeminarConfirmModal } from '@/components/Parts/Modal/SeminarConfirmModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, } from 'swiper';
import { type Swiper as SwiperRef } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const getSeminarDateTime = (seminar: SeminarEntityType) => {
  if ( !seminar ) return '';
  console.log( seminar );
  const [year, month, day] = seminar.seminar_date
    .substring(0, 10)
    .split(/-/) as string[];
  const seminarDate = new Date(seminar.seminar_date);
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][
    seminarDate.getDay() as number
  ];
  return (
    `${Number(year)}年${Number(month)}月${Number(day)}日(${dayOfWeek}) ` +
    seminar.seminar_start_time.substring(0, 5) +
    '-' +
    seminar.seminar_end_time.substring(0, 5)
  );
};

const Seminar: NextPage = () =>
{
  const router = useRouter();
  const { id } = router.query;
  console.log( id );
  const { randomSeminars, seminar, ticketCount, useTicket,
    isTicketConfirmDialogShown,
    isTicketNotEnoughDialogShown,
    setIsTicketConfirmDialogShown,
    setIsTicketNotEnoughDialogShown, } = UseSeminarDetail(id as string);
  const [ showModal, setShowModal ] = React.useState( false );
  const [ , setSwiperRef ] = React.useState<SwiperRef | null>( null );
  return (
    <div className="bg-[url('/images/seminar/SP_back.png')] bg-cover bg-no-repeat pb-12 pt-32 lg:pt-10 lg:bg-[url('/images/seminar/PC_back.png')]">
      <div className="mx-auto w-full lg:rounded-2xl pb-20 pt-36 lg:max-w-[960px] lg:bg-white lg:p-10 lg:px-10 lg:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-white relative">
        {seminar?.movie_url ? (
          <div className="px-[27px] lg:px-0 absolute lg:static top-[-79px]">
            <iframe
              src={seminar.movie_url}
              title="YouTube video player"
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <img
            src={seminar && seminar.image_url}
            className="aspect-video w-full"
          />
        )}
        {!seminar?.movie_url && (
          <div>
            <div>
              <p>チケットを一枚消費して動画を閲覧可能です</p>
            </div>
            <div>
              <p>
                現在のチケット所持枚数 {ticketCount && ticketCount.ticket_count}{' '}
                枚
              </p>
            </div>
            <PrimaryButton onClick={() => setIsTicketConfirmDialogShown(true)}>
              動画を閲覧する
            </PrimaryButton>
          </div>
        )}
        <div className="flex flex-col items-center bg-white px-7 lg:px-[60px]">
          <div className="mt-4 flex w-full flex-col items-center">
            <div className="flex w-full items-center justify-center rounded-md bg-[#e2e7ff] py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary lg:h-20 lg:w-20">
                <img
                  src="/images/seminar/video.svg"
                  className="w-[19px] lg:w-auto"
                />
              </div>
              <p className="pl-4 font-bold text-primary lg:text-2xl">
                {seminar && seminar.subject}
              </p>
            </div>
          </div>
          <div className="w-full  text-lg">
            <div className="flex-reverse flex flex-col flex-col-reverse items-center justify-between border-b py-4 lg:flex-row">
              <div className="w-full lg:w-auto">
                <p className="text-base lg:text-lg">
                  <span className="pr-4 text-2xl text-primary lg:text-lg">
                    日時
                  </span>
                  {seminar && getSeminarDateTime(seminar)}
                </p>
              </div>
            </div>
            <div className="border-b py-4">
              <div>
                <p className="text-base lg:text-lg">
                  <span className="pr-4 text-2xl text-primary lg:text-lg lg:font-bold">
                    講師
                  </span>{' '}
                  {seminar?.doctor_name !== undefined
                    ? seminar.doctor_name
                    : ''}
                  先生
                </p>
              </div>
            </div>
            <div className="pt-8">
              <div>
                <p className="pr-4 text-2xl font-bold text-primary lg:text-2xl">
                  セミナー概要
                </p>
                <p className="pt-4 pb-8 text-base">
                  {seminar?.description !== undefined
                    ? seminar.description
                    : ''}
                </p>
              </div>
            </div>
            <div className="rounded-lg border p-4 text-base">
              <p className="pb-2">{seminar && seminar?.doctor_name}先生</p>
              <p className="text-primary">
                {seminar && seminar?.doctor_profile}
              </p>
            </div>
            <a href={`/newChatRoom?target_account_id=${seminar?.account_id}`}>
              <PrimaryButton className="mt-8 text-left">
                この先生にE-コンサルで相談をする
              </PrimaryButton>
            </a>
            {seminar && seminar?.seminar_reviews.length > 0 && (
              <div>
                <h2 className="pb-4 pt-10 text-2xl font-bold text-primary">
                  セミナー参加者からの感想
                </h2>
                {seminar.seminar_reviews.map((review) => (
                  <div className="mb-4 rounded-md bg-slate-100 px-4 py-6">
                    <p>{review.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <h2 className="mt-32 mb-8 text-center text-2xl">
          その他の公開されている
          <br className="md:hidden" />
          セミナー動画アーカイブ
        </h2>
        <Swiper
          onSwiper={(swiper) => setSwiperRef(swiper)}
          slidesPerView={1}
          initialSlide={1}
          centeredSlides={true}
          spaceBetween={100}
          breakpoints={{
            1024: {
              slidesPerView: 4,
              spaceBetween: 280,
            },
          }}
          pagination={{
            type: 'custom',
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {randomSeminars?.map((seminar) => (
            <SwiperSlide>
              <div className="mb-3">
                <SeminarCard seminar={seminar} key={seminar.seminar_id} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {showModal && (
        <Modal setShowModal={setShowModal} className="lg:w-[800px]">
          <div className="align-center relative flex flex-col items-center bg-white px-6 py-4 lg:py-20 lg:px-28">
            <img
              onClick={() => setShowModal(false)}
              src="/icons/close_primary.svg"
              className="absolute right-4 top-4 lg:right-10 lg:top-14"
            />
            <h3 className="text-center text-2xl text-primary">チケットとは?</h3>
            <p className="py-10">
              チケットとはセミナー動画アーカイブを閲覧するために必要なものです。
              <br />
              E-コンサルで相談するとセミナーチケット1枚獲得できます。
            </p>
            <img
              className="hidden lg:block"
              src="/images/seminar/about_ticket_pc.png"
            />
            <img
              className="lg:hidden"
              src="/images/seminar/about_ticket_sp.png"
            />
          </div>
        </Modal>
      )}
      {isTicketConfirmDialogShown && (
        <SeminarConfirmModal
          setShowModal={setIsTicketConfirmDialogShown}
          className="lg:w-[800px]"
          title="チケット使用の確認"
          labelText="使用する"
          onSubmit={() => useTicket()}
        >
          <p>アーカイブ動画閲覧にチケット1枚を使用します。</p>
        </SeminarConfirmModal>
      )}
      {isTicketNotEnoughDialogShown && (
        <SeminarConfirmModal
          setShowModal={setIsTicketConfirmDialogShown}
          className="lg:w-[800px]"
          title="チケットが不足しています"
          labelText="E-コンサルへ"
          onSubmit={() => router.push('/newChatRoom')}
        >
          <p className="font-bold">
            アーカイブ動画閲覧にチケット1枚が必要です。
            <br />
            E-コンサルを依頼するとチケットが 1枚獲得できます。
          </p>
        </SeminarConfirmModal>
      )}
    </div>
  );
};

export default Seminar;
