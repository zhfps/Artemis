/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface IResponse<T>{
  value: T[]
  '@odata.count': number
  [key]?: any
}

interface AccountInfo {
  homeAccountId: string;
  environment: string;
  tenantId: string;
  username: string;
  localAccountId: string;
  name?: string;
  idToken?: string;
  idTokenClaims?: any & {
      [key: string]:
          | string
          | number
          | string[]
          | object
          | undefined
          | unknown;
  };
  nativeAccountId?: string;
  authorityType?: string;
}

interface AuthenticationResult {
  authority: string;
  uniqueId: string;
  tenantId: string;
  scopes: Array<string>;
  account: AccountInfo | null;
  idToken: string;
  idTokenClaims: object;
  accessToken: string;
  fromCache: boolean;
  expiresOn: Date | null;
  extExpiresOn?: Date;
  refreshOn?: Date;
  tokenType: string;
  correlationId: string;
  requestId?: string;
  state?: string;
  familyId?: string;
  cloudGraphHostName?: string;
  msGraphHost?: string;
  code?: string;
  fromNativeBroker?: boolean;
}


interface IColumn {
  label: string
  name: string
  type: 'String' | 'Number' |  'Picklist' | 'Date' | 'DateTime' | 'Lookup' | 'Code' | 'Money'
  sort: boolean | string
  descending: boolean | null
  filter: boolean
  primary?: boolean
  condition?: {
    operator: string,
    value: string| number
  } | null
  options?: { label: string; value: string | number; color?: string }[] | null
  width?: number
}