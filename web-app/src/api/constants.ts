export const API_URL = (process.env.NEXT_PUBLIC_API_URL as string) + '/api';
export const API_URL_OAUTH =
  (process.env.NEXT_PUBLIC_API_URL as string) + '/oauth';

export type Token = {
  token: string;
};

export type Service = {
  provider: string;
};

export type Services = Service[];

export type User = {
  user: UserData;
};

export type UserData = {
  uuid: string;
  email: string;
  username: string;
  remember_me_token: string;
  onboarding: string;
  created_at: string;
  updated_at: string;
};

export type ApiInteraction = {
  id: string;
  name: string;
  fields: Fields[];
  variables: Record<string, string>;
};

export type ApiEvent = {
  provider: string;
  interactions: ApiInteraction[];
};

export type AdditionalInteraction = {
  action_provider: string;
  id: string;
  name: string;
  fields: Fields[];
};

export type Fields = {
  value: string;
  name: string;
  required: boolean;
  type?: 'input' | 'select' | 'textarea';
  values?: SelectValues[];
};

export type SelectValues = {
  value: string;
  label: string;
};

export type Interaction = {
  id: string;
  fields: Fields[];
};

export type EventCreate = {
  name: string;
  description?: string;
  trigger_provider: string;
  response_provider: string;
  triggerInteraction: Interaction;
  responseInteraction: Interaction;
};

export type EventInteraction = {
  provider: string;
  id: string;
  name: string;
  fields: Fields[];
};

export type Event = {
  uuid: string;
  name: string;
  description: string;
  active: boolean;
  triggerInteraction: EventInteraction;
  responseInteraction: EventInteraction;
  additionalActions: AdditionalInteraction[];
  timestamp: string;
  created_at: string;
  updated_at: string;
};

export type EventType = {
  uuid: string;
  active: boolean;
  name: string;
};

export type Trigger = {
  trigger_provider: string;
  triggerInteraction: Interaction;
};

type ActionsReactions = {
  id: string;
  name: string;
  fields: Fields[];
  variables: Record<string, string>;
};

export type About = {
  client: {
    host: string;
  };
  server: {
    current_time: number;
    services: {
      name: string;
      actions: ActionsReactions[];
      reactions: ActionsReactions[];
    }[];
  };
};

export type UsesTimestamps = {
  ['january']: number;
  ['february']: number;
  ['march']: number;
  ['april']: number;
  ['may']: number;
  ['june']: number;
  ['july']: number;
  ['august']: number;
  ['september']: number;
  ['october']: number;
  ['november']: number;
  ['december']: number;
};

export type Log = {
  uuid: string;
  user_uuid: string;
  event_uuid: string;
  message: string;
  status: 'error' | 'success' | 'failed';
  log_id: number;
  error_message?: string;
  error_id?: string;
  created_at: string;
  updated_at: string;
};

export type EventStats = {
  triggerApi: string;
  responseApi: string;
  total: number;
  success: number;
  errors: number;
  today: number;
  lastLogs: Log[];
  logsByMonth: UsesTimestamps;
};
