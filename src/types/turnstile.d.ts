/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@marsidev/react-turnstile' {
  import { ComponentType } from 'react';

  export interface TurnstileProps {
    siteKey: string;
    onSuccess?: (token: string) => void;
    onError?: () => void;
    onExpire?: () => void;
    theme?: 'light' | 'dark' | 'auto';
    size?: 'normal' | 'compact';
    tabIndex?: number;
    responseField?: boolean;
    responseFieldName?: string;
    retry?: 'auto' | 'never';
    retryInterval?: number;
    language?: string;
    appearance?: 'always' | 'execute' | 'interaction-only';
    execution?: 'render' | 'execute';
    refreshExpired?: 'auto' | 'manual' | 'never';
  }

  export interface TurnstileInstance {
    reset: () => void;
    remove: () => void;
    render: () => void;
    getResponse: () => string | undefined;
  }

  export const Turnstile: ComponentType<TurnstileProps>;
}
