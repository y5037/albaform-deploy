'use client';

import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

// 알바폼 바로가기 버튼
const Button = styled(Link)`
  background-color: var(--primary-blue300);
  color: var(--white);
  width: 223px;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  text-align: center;
  padding: 24px 36px;
  margin-top: 10px;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;

  @media (max-width: 1199px) {
    width: 149px;
    font-size: 16px;
    line-height: 26px;
    padding: 16px 24px;
    margin-top: 18px;
  }
`;

const Banner = styled.div`
  max-width: 1322px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 0 179px;
  margin: 0 auto;

  @media (max-width: 1199px) {
    gap: 24px;
  }

  @media (max-width: 768px) {
    max-width: 411px;
    padding: 0;
  }
`;

const Title = styled.h1`
  color: var(--white);
  font-size: 56px;
  font-weight: 400;
  line-height: 80px;

  @media (max-width: 1199px) {
    font-size: 32px;
    line-height: 32px;
  }

  @media (max-width: 810px) {
    font-size: 20px;
    line-height: 32px;
  }
`;

// 배너이미지
const BannerImg = styled.div`
  // position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 1.58 / 1;
  background-image: url('/images/landingImg/landing1.svg');
  background-size: cover;
  background-position: center;

  @media (max-width: 1199px) {
    margin-top: 19px;
  }
`;

export default function Home() {
  return (
    <>
      {/* 배너 */}
      <div className='relative bg-[var(--black400)] w-full h-[633px] md:h-auto md:aspect-[1.29/1]'>
        <Banner>
          <div className='relative w-[124px] h-[24px] md:w-[186px] md:h-[36px] lg:w-[248px] lg:h-[48px]'>
            <Image
              src={'/images/albaform.svg'}
              alt='logo'
              fill
              priority
              style={{ objectFit: 'contain' }}
            />
          </div>
          <Title>한 곳에서 관리하는 알바 구인 플랫폼</Title>
          <Button href={'/'}>알바폼 시작하기</Button>
          <BannerImg />
        </Banner>
      </div>

      {/* 메인 */}
      <div className='flex flex-col items-center gap-40 max-w-[964px] px-[24px] py-[120px] mx-auto sm:px-20 md:py-[200px] lg:px-0'>
        <div className='relative w-full h-auto aspect-[1.78/1]'>
          <Image
            src={'images/landingImg/landing2.svg'}
            alt='landing2'
            fill
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className='relative w-full h-auto aspect-[1.78/1]'>
          <Image
            src={'images/landingImg/landing3.svg'}
            alt='landing3'
            fill
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className='relative w-full h-auto aspect-[1.78/1]'>
          <Image
            src={'images/landingImg/landing4.svg'}
            alt='landing4'
            fill
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className='relative w-full h-auto aspect-[1.78/1]'>
          <Image
            src={'images/landingImg/landing5.svg'}
            alt='landing5'
            fill
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className='flex flex-col items-center gap-20'>
          <p className='text-[var(--black)] text-[48px] text-center font-bold leading-[68px]'>
            한 곳에서 관리하는
            <br />
            알바구인 플랫폼
          </p>
          <Button href={'/'}>알바폼 시작하기</Button>
        </div>
      </div>
    </>
  );
}
