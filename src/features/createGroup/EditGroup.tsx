import { Radio } from '@/components/Parts/Form/Radio';
import TextArea from '@/components/TextArea/TextArea';
import TextField from '@/components/TextField/TextField';
import React, { useState } from 'react';
export const EditGroup = () => {
  const [groupDescription, setGroupDescription] = useState('');
  const [assignable, setAssignable] = useState<boolean>(true);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [notificationFrequency, setNotificationFrequency] = useState<
    'notification-frequency-all' | 'notification-frequency-hourly' | 'notification-frequency-daily'
  >('notification-frequency-all');
  return (
    <div>
      <div className="mb-2 mt-6 flex text-left">
        <div className="mr-1 rounded-md border border-red-500 px-1 py-0.5 text-xs font-bold text-red-500">必須</div>
        <label htmlFor="specialty" className="text-left font-bold">
          エリア・施設名
        </label>
      </div>
      <TextField
        required
        name="specialty"
        className="h-12 w-full"
        id="specialty"
        placeholder="例) 〇〇県、△△大学 などを入力"
      />
      <div className="mb-2 mt-4 flex text-left">
        <div className="mr-1 rounded-md border border-red-500 px-1 py-0.5 text-xs font-bold text-red-500">必須</div>
        <div className="text-left font-bold">グループの専門分野</div>
      </div>
      <p>※対処疾患または診療科目どちらかの入力は必須となります</p>
      <div className="text-left font-bold">診療科目</div>
      <div
        className="mt-2 rounded-md border border-text-field-frame px-4 py-3"
        style={{
          backgroundImage: "url('/icons/pull.svg')",
          backgroundPosition: 'right 1rem center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <p>複数専門領域合同(MDD)</p>
      </div>
      <label htmlFor="targetDisease" className="text-left font-bold">
        対象疾患
      </label>
      <TextField
        required
        name="targetDisease"
        className="h-12 w-full"
        id="targetDisease"
        placeholder="例) 間質性肺炎"
      />
      <div className="mb-2 mt-4 flex text-left">
        <div className="mr-1 rounded-md border border-red-500 px-1 py-0.5 text-xs font-bold text-red-500">必須</div>
        <label htmlFor="groupName" className="text-left font-bold">
          グループ名
        </label>
      </div>
      <TextField required name="groupName" className="h-12 w-full" id="groupName" placeholder="グループ名を入力" />
      <div className="mt-4 flex text-left">
        <div className="mr-1 rounded-md border border-primary px-1 py-0.5 text-xs font-bold text-primary">任意</div>
        <label htmlFor="groupDescription" className="text-left font-bold">
          グループ説明
        </label>
      </div>
      <TextArea
        name="groupDescription"
        className="min-h-[100px] w-full resize-none"
        id="groupDescription"
        placeholder="グループの説明や特料などを入力"
        value={groupDescription}
        onChange={(e) => setGroupDescription(e.target.value)}
      />
      <div className="mt-2">
        <label className="text-left font-bold">コンサル受付</label>
        <label>
          <Radio
            name="assignable"
            value="true"
            checked={assignable === true}
            label="あり"
            onChange={(e) => {
              setAssignable(e.target.value === 'true');
            }}
          />
          <div className="text-[13px]">※ 他の医師からコンサルが来る場合があります。</div>
        </label>
        <label>
          <Radio
            name="assignable"
            value="false"
            checked={assignable === false}
            label="なし"
            onChange={(e) => {
              setAssignable(e.target.value === 'false');
            }}
          />
          <div className="text-[13px]">※ グループチャットのみ利用できます。検索結果にも表示されません。</div>
        </label>
      </div>
      {assignable && (
        <div className="mt-2">
          <label className="text-left font-bold">検索</label>
          <label>
            <Radio
              name="isPublic"
              value="true"
              checked={isPublic === true}
              label="公開"
              onChange={(e) => {
                setIsPublic(e.target.value === 'true');
              }}
            />
            <div className="text-[13px]">※ 検索結果に表示されます。</div>
          </label>
          <label>
            <Radio
              name="isPublic"
              value="false"
              checked={isPublic === false}
              label="非公開"
              onChange={(e) => {
                setIsPublic(e.target.value === 'false');
              }}
            />
            <div className="text-[13px]">
              ※ 検索結果には表示されませんが、特定のURLからコンサルを受け付けることができます。
            </div>
          </label>
        </div>
      )}
      <div className="mt-2">
        <label className="text-left font-bold">グループメンバー</label>
        <div className="text-[13px]">
          メンバーを追加したい場合は
          <a
            target="_blank"
            className=" text-text-link underline"
            href="https://tayori.com/form/62897c986d36f5b573fec1a04508f24b70b11fe6/?_gl=1*1ub7pnq*_ga*MTMwODkzMzc5Ni4xNjg0ODE5NDIy*_ga_C9VCVTY692*MTY5OTkxMzI1MS4zNjMuMS4xNjk5OTE2MDg4LjYwLjAuMA.."
            rel="noreferrer"
          >
            Mediiコンシェルジュ
          </a>
          までお問い合わせください
        </div>
      </div>

      <div className="mt-2 space-y-1">
        <label className="text-left font-bold">メッセージの通知頻度の設定</label>
        <div className="text-[13px]">
          ※このグループカンファレンス内の通知頻度の設定することで、通知回数を抑えることができます。
        </div>

        <Radio
          id="notification-frequency-all"
          name="notification-frequency"
          value="notification-frequency-all"
          checked={notificationFrequency === 'notification-frequency-all'}
          label="毎回通知"
          onChange={() => {
            setNotificationFrequency('notification-frequency-all');
          }}
        />
        <Radio
          id="notification-frequency-hourly"
          name="notification-frequency"
          value="notification-frequency"
          checked={notificationFrequency === 'notification-frequency-hourly'}
          label="1時間に1回通知"
          onChange={() => {
            setNotificationFrequency('notification-frequency-hourly');
          }}
        />
        <Radio
          id="notification-frequency-daily"
          name="notification-frequency"
          value="notification-frequency"
          checked={notificationFrequency === 'notification-frequency-daily'}
          label="24時間に1回通知"
          onChange={() => {
            setNotificationFrequency('notification-frequency-daily');
          }}
        />
      </div>
    </div>
  );
};
