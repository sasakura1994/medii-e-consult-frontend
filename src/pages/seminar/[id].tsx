import React from 'react';
import type { NextPage } from 'next';
import { SeminarCard } from '@/features/seminar/SeminarCard';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UseSeminarDetail } from '@/features/seminar/useSeminarDetail';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { SeminarConfirmModal } from '@/components/Parts/Modal/SeminarConfirmModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { type Swiper as SwiperRef } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { getSeminarDateTime } from '@/features/seminar/useSeminar';
import { ImcompleteProfileModal } from '@/components/Parts/Modal/ImcompleteProfileModal';

const Seminar: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const {
    randomSeminars,
    seminar,
    ticketCount,
    consumeTicket,
    isTicketConfirmDialogShown,
    isTicketNotEnoughDialogShown,
    setIsTicketConfirmDialogShown,
    setIsTicketNotEnoughDialogShown,
  } = UseSeminarDetail(id as string);
  const [, setSwiperRef] = React.useState<SwiperRef | null>(null);

  return (
    <>
      <div
        className="
        bg-[url('/images/seminar/SP_back.png')] bg-cover bg-no-repeat
        pb-12 lg:bg-[url('/images/seminar/PC_back.png')] lg:pt-10
      "
      >
        <div
          className="
        mx-auto pt-28 lg:max-w-[960px] lg:rounded-2xl lg:bg-white lg:p-10  lg:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]
        "
        >
          <div
            className="
            relative
            mx-auto
            w-full
            bg-white
            pt-32
            lg:mt-0
            lg:max-w-[960px] lg:rounded-2xl lg:bg-transparent lg:pt-0
          "
          >
            {seminar?.movie_url ? (
              <div className="absolute top-[-79px] w-full px-[27px] lg:static lg:px-0">
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
                className="
                absolute left-0 right-0 top-[-79px] z-20 mx-auto aspect-video w-5/6
                shadow-lg lg:static lg:mt-0 lg:w-full lg:max-w-[960px] lg:bg-white lg:pt-0 lg:shadow-none
              "
                alt="サムネイル"
              />
            )}
            {!seminar?.movie_url && (
              <div className="mx-8 mt-4 bg-gray-100 px-2 py-6 lg:mx-0 lg:mt-0">
                <div className="text-center text-sm font-semibold text-gray-500 lg:text-2xl">
                  チケットを一枚消費して動画を閲覧可能です
                </div>

                <div
                  className="
                  mt-2 flex items-end justify-center text-center text-base
                  font-semibold text-primary lg:text-2xl
                "
                >
                  現在のチケット所持枚数
                  <p className="mx-2 text-2xl lg:text-4xl">{ticketCount && ticketCount.ticket_count}</p>
                  <p>枚</p>
                </div>

                <div className="mt-4 text-center">
                  <PrimaryButton
                    className="mx-auto px-4 py-2 lg:px-12 lg:pb-4 lg:pt-3 lg:text-2xl"
                    onClick={() => setIsTicketConfirmDialogShown(true)}
                  >
                    動画を閲覧する
                  </PrimaryButton>
                </div>
              </div>
            )}
            <div className="flex flex-col items-center bg-white px-7 pb-10 lg:px-[60px]">
              <div className="mt-4 flex w-full flex-col items-center">
                <div className="flex w-full items-center justify-center rounded-md bg-[#e2e7ff] px-6 py-4">
                  <div className="m-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary lg:h-20 lg:w-20">
                    <img src="images/seminar/video.svg" className="w-[19px] lg:w-auto" alt="タイトル" />
                  </div>
                  <p className="flex-1 font-bold text-primary lg:pl-4 lg:text-2xl">{seminar && seminar.subject}</p>
                </div>
              </div>
              <div className="w-full  text-lg">
                <div
                  className="
                  flex-reverse flex flex-col-reverse items-center justify-between border-b py-4 lg:flex-row
                "
                >
                  <div className="w-full lg:w-auto">
                    <p className="text-base lg:text-lg">
                      <span className="pr-4 text-2xl text-primary lg:text-lg lg:font-bold">日時</span>
                      {seminar && getSeminarDateTime(seminar)}
                    </p>
                  </div>
                </div>
                <div className="border-b py-4">
                  <div className="flex">
                    <p className="pr-4 text-2xl text-primary lg:text-lg lg:font-bold">講師</p>
                    <p className="whitespace-pre-wrap text-base lg:text-lg">
                      {seminar?.doctor_name !== undefined ? seminar.doctor_name : ''}
                      先生
                    </p>
                  </div>
                </div>
                <div className="pt-8">
                  <div>
                    <p className=" pr-4 text-2xl font-bold text-primary lg:text-2xl">セミナー概要</p>
                    <p className="whitespace-pre-wrap pb-8 pt-4 text-base">
                      {seminar?.description !== undefined ? seminar.description : ''}
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border p-4 text-base">
                  <p className="pb-2">{seminar && seminar?.doctor_name}先生</p>
                  <p className="whitespace-pre-wrap text-primary">{seminar && seminar?.doctor_profile}</p>
                </div>
                {seminar && seminar.account_id && seminar.is_consult_available && (
                  <Link href={`/newChatRoom?target_account_id=${seminar?.account_id}`}>
                    <PrimaryButton className="m-auto mt-8 text-left text-sm lg:text-md">
                      この先生にE-コンサルで相談をする
                    </PrimaryButton>
                  </Link>
                )}
                {seminar && seminar?.seminar_reviews.length > 0 && (
                  <div>
                    <h2 className="pb-4 pt-10 text-2xl font-bold text-primary">セミナー参加者からの感想</h2>
                    {seminar.seminar_reviews.map((review) => (
                      <div className="mb-4 whitespace-pre-wrap rounded-md bg-slate-100 px-4 py-6" key={review.id}>
                        <p>{review.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-8 mt-32 text-center text-2xl">
            その他の公開されている
            <br className="md:hidden" />
            E-カンファアーカイブ動画
          </h2>
          <Swiper
            onSwiper={(swiper) => setSwiperRef(swiper)}
            slidesPerView="auto"
            initialSlide={1}
            centeredSlides={true}
            spaceBetween={20}
            pagination={{
              type: 'custom',
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {randomSeminars?.map((seminar) => (
              <SwiperSlide key={seminar.uid} style={{ width: '400px' }}>
                <div>
                  <SeminarCard seminar={seminar} key={seminar.seminar_id} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {isTicketConfirmDialogShown && (
          <SeminarConfirmModal
            setShowModal={setIsTicketConfirmDialogShown}
            title="チケット使用の確認"
            labelText="使用する"
            onSubmit={() => consumeTicket()}
          >
            <p className="my-8 text-center font-bold">アーカイブ動画閲覧にチケット1枚を使用します。</p>
          </SeminarConfirmModal>
        )}
        {isTicketNotEnoughDialogShown && (
          <SeminarConfirmModal
            setShowModal={setIsTicketNotEnoughDialogShown}
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
      <ImcompleteProfileModal />
    </>
  );
};

export default Seminar;
