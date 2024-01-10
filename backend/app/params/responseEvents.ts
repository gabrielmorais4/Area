import { APIEvent } from 'types/events'

export const RESPONSE_EVENTS: APIEvent[] = [
  {
    provider: 'Discord',
    interactions: [
      {
        id: 'sendDiscordWebhookMessage',
        name: 'Send webhook message',
        fields: [
          {
            value: 'Webhook url',
            name: 'webhook',
            type: 'input',
            required: true,
          },
          {
            value: 'Select who to ping',
            name: 'Ping who?',
            type: 'select',
            values: [
              {
                value: '@everyone',
                label: 'Everyone',
              },
              {
                value: '@here',
                label: 'Here',
              },
              {
                value: 'none',
                label: 'None',
              },
            ],
            required: true,
          },
          {
            value: 'Content of the message',
            name: 'message',
            type: 'input',
            required: true,
          },
          {
            value: 'URL of the webhook',
            name: 'webhook',
            type: 'input',
            required: true,
          },
        ],
        variables: {},
      },
    ],
  },
  {
    provider: 'Google',
    interactions: [
      {
        id: 'sendEmail',
        name: 'Send email',
        fields: [
          {
            value: 'Email of the recipient',
            name: 'email',
            type: 'input',
            required: true,
          },
          {
            value: 'Subject of the email',
            name: 'subject',
            type: 'input',
            required: true,
          },
          {
            value: 'Body of the email',
            name: 'body',
            type: 'input',
            required: true,
          },
        ],
        variables: {},
      },
    ],
  },
]
