export type APIEventField<T> = {
  value: T
  name: string
  required: boolean
  type?: 'input' | 'select' | 'textarea'
  values?: SelectValues[]
}

export type SelectValues = {
  value: string
  label: string
}

export type APIEvent = {
  provider: string
  id: string
  name: string
  fields: APIEventField<any>[]
  variables: {}
}

export type AdditionalInteraction = {
  action_provider: string
  id: string
  name?: string
  fields: any[]
}
