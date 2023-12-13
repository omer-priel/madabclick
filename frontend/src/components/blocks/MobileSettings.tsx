'use client';

import { useRef, useState } from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { useOnLeaveElement } from '@/hooks';
import { ContentsSchema } from '@/lib/api/schemas';
import mobileSelectIcon from '@/public/mobile-select.svg';
import mobileSelectedIcon from '@/public/mobile-selected.svg';
import mobileSettingsIcon from '@/public/mobile-settings.svg';
import { useStore } from '@/store';

export type MobileSettingsValue = {
  selectedAgeLevels: string[];
  selectedDurations: string[];
  selectedLanguages: string[];
};

interface Props {
  data: ContentsSchema;
  onSettingsSaved: (settings: MobileSettingsValue) => void;
}

export default function MobileSettings({ data, onSettingsSaved }: Props) {
  const t = useTranslations();

  const deactivatePlayer = useStore((state) => state.deactivatePlayer);

  const lastSettings = useRef<MobileSettingsValue>({
    selectedAgeLevels: [],
    selectedDurations: [],
    selectedLanguages: [data.currentLanguageValue],
  });

  const panelRef = useRef<HTMLDivElement>(null);

  const [opened, setOpened] = useState(false);
  const [selectedAgeLevels, setPrivateSelectedAgeLevels] = useState<string[]>([]);
  const [selectedDurations, setPrivateSelectedDurations] = useState<string[]>([]);
  const [selectedLanguages, setPrivateSelectedLanguages] = useState<string[]>([]);

  const setSelectedAgeLevels = (value: string[]) => setPrivateSelectedAgeLevels(value.length == data.ageLevels.length ? [] : value);
  const setSelectedDurations = (value: string[]) => setPrivateSelectedDurations(value.length == data.durations.length ? [] : value);
  const setSelectedLanguages = (value: string[]) => setPrivateSelectedLanguages(value.length == data.languages.length ? [] : value);

  useOnLeaveElement(panelRef, () => {
    setOpened(false);
  });

  return (
    <div>
      <Image
        className='w-[24px] h-[24px]'
        alt=''
        src={mobileSettingsIcon}
        width='24'
        height='24'
        onClick={() => {
          setSelectedAgeLevels(lastSettings.current.selectedAgeLevels);
          setSelectedDurations(lastSettings.current.selectedDurations);
          setSelectedLanguages(lastSettings.current.selectedLanguages);

          setOpened(true);
          deactivatePlayer();
        }}
      />
      <div className={`right-0 top-0 w-[100vw] h-[100vh] text-white z-[50] ${opened ? 'fixed' : 'hidden'}`}>
        <div
          className={`fixed right-0 bottom-0 w-[100vw] h-fit ${opened ? 'translate-y-0' : 'translate-y-[-100%]'} ease-in-out duration-300`}
        >
          <div ref={panelRef} className='w-[calc(100vw_-_96px)] h-fit bg-[#333333] rounded-t-[30px] px-[48px] py-[35px]'>
            <div className='mb-[21px]'>
              <div className='font-bold	opacity-50 text-[12px]/[18px]'>{t('filter-age-level')}</div>
              <div className='w-full mb-[8px] border-[#ffffff80] border-[1px] border-solid' />
              {data.ageLevels.map((ageLevel) => (
                <div
                  key={ageLevel}
                  className='flex w-full my-[5px]'
                  onClick={() => {
                    let newValues = selectedAgeLevels;
                    if (newValues.includes(ageLevel)) {
                      newValues = newValues.filter((value) => value != ageLevel);
                    } else {
                      newValues = [...newValues, ageLevel];
                    }
                    setSelectedAgeLevels(newValues);
                  }}
                >
                  <Image
                    className='w-[10px] h-[10px] my-auto'
                    alt=''
                    src={selectedAgeLevels.includes(ageLevel) ? mobileSelectedIcon : mobileSelectIcon}
                    width='10'
                    height='10'
                  />
                  <span className='mx-[6px] my-auto opacity-50 text-white font-normal text-[12px]/[18px]'>{ageLevel}</span>
                </div>
              ))}
            </div>
            <div className='mb-[21px]'>
              <div className='font-bold	opacity-50 text-[12px]/[18px]'>{t('filter-age-level')}</div>
              <div className='w-full mb-[8px] border-[#ffffff80] border-[1px] border-solid' />
              {data.durations.map((duration) => (
                <div
                  key={duration}
                  className='flex w-full my-[5px]'
                  onClick={() => {
                    let newValues = selectedDurations;
                    if (newValues.includes(duration)) {
                      newValues = newValues.filter((value) => value != duration);
                    } else {
                      newValues = [...newValues, duration];
                    }
                    setSelectedDurations(newValues);
                  }}
                >
                  <Image
                    className='w-[10px] h-[10px] my-auto'
                    alt=''
                    src={selectedDurations.includes(duration) ? mobileSelectedIcon : mobileSelectIcon}
                    width='10'
                    height='10'
                  />
                  <span className='mx-[6px] my-auto opacity-50 text-white font-normal text-[12px]/[18px]'>{duration}</span>
                </div>
              ))}
            </div>
            <div className='mb-[21px]'>
              <div className='font-bold	opacity-50 text-[12px]/[18px]'>{t('filter-age-level')}</div>
              <div className='w-full mb-[8px] border-[#ffffff80] border-[1px] border-solid' />
              {data.languages.map((language) => (
                <div
                  key={language}
                  className='flex w-full my-[5px]'
                  onClick={() => {
                    let newValues = selectedLanguages;
                    if (newValues.includes(language)) {
                      newValues = newValues.filter((value) => value != language);
                    } else {
                      newValues = [...newValues, language];
                    }
                    setSelectedLanguages(newValues);
                  }}
                >
                  <Image
                    className='w-[10px] h-[10px] my-auto'
                    alt=''
                    src={selectedLanguages.includes(language) ? mobileSelectedIcon : mobileSelectIcon}
                    width='10'
                    height='10'
                  />
                  <span className='mx-[6px] my-auto opacity-50 text-white font-normal text-[12px]/[18px]'>{language}</span>
                </div>
              ))}
            </div>
            <div
              className='w-full h-[50px] mt-[47px] mb-[56px] rounded-[10px] border-solid border-white border-[1px]'
              onClick={() => {
                lastSettings.current = {
                  selectedAgeLevels: selectedAgeLevels.length == 0 ? data.ageLevels : selectedAgeLevels,
                  selectedDurations: selectedDurations.length == 0 ? data.durations : selectedDurations,
                  selectedLanguages: selectedLanguages.length == 0 ? data.languages : selectedLanguages,
                };

                onSettingsSaved(lastSettings.current);
                setOpened(false);
              }}
            >
              <div className='w-fit h-[24px] mx-auto my-[13px] text-white font-black text-[16px]/[24px]'>{t('settings-save')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
