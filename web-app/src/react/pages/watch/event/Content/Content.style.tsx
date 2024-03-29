import styled from 'styled-components';
import {
  Button,
  Card as _Card,
  CardHeader as _CardHeader,
} from '@/components/ui';
import {
  Tabs as _Tabs,
  TabsContent as _TabsContent,
} from '@/components/ui/tabs';

export const Card = styled(_Card)`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export const CardHeader = styled(_CardHeader)`
  border-bottom: 1px solid #27272a;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 24px;
  gap: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderPart = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const EventPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const EventPartContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

export const BreakLine = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  width: 80%;
`;

export const AddButton = styled(Button)`
  width: fit-content;
  align-self: center;
`;

export const AdditionnalActionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TabsContent = styled(_TabsContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 100%;
  height: 100%;
`;

export const Tabs = styled(_Tabs)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  gap: 32px;
`;
