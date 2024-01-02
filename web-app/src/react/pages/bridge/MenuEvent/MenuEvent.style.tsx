import { Button } from '@/components/ui';
import { Card } from '@/components/ui/card';
import styled from 'styled-components';
import { ToggleLeft, ToggleRight } from 'lucide-react';

export const EventPanel = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  flex: 2;
`;

export const EventPanelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 1.5em;
  height: 100%;
`;

export const EventPanelButton = styled(Button)`
  padding: 10px;
  gap: 10px;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  border-bottom: 1px solid #34344b;
`;

export const LogoRight = styled(ToggleRight)`
  width: 16px;
  height: 16px;
  color: #fff;
`;

export const LogoLeft = styled(ToggleLeft)`
  width: 16px;
  height: 16px;
  color: #fff;
`;

export const EventButton = styled(Button)`
  display: flex;
  height: 40px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const ButtonText = styled.text`
  color: #fafafa;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;
