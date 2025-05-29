import { media } from '@/styles/media';
import styled from 'styled-components';

export const ResponsiveContainer = styled.div`
  position: relative;
  padding: 112px 120px 24px;
  border: 1px solid var(--line100);

  @media ${media.desktop} {
    padding: 112px 0 24px;
    max-width: 1480px;
    margin: 0 auto;
  }

  @media ${media.tablet} {
    padding: 84px 24px 24px;
    margin: 0;
  }

  @media ${media.mobile} {
    padding: 78px 24px 24px;
    border: 0;
  }
`;
