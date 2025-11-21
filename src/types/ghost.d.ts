/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@tryghost/content-api' {
  export interface GhostContentAPIOptions {
    url: string;
    key: string;
    version: string;
  }

  export default class GhostContentAPI {
    constructor(options: GhostContentAPIOptions);
    posts: {
      browse(options?: any): Promise<any[]>;
      read(options: any): Promise<any>;
    };
    pages: {
      browse(options?: any): Promise<any[]>;
      read(options: any): Promise<any>;
    };
    authors: {
      browse(options?: any): Promise<any[]>;
      read(options: any): Promise<any>;
    };
    tags: {
      browse(options?: any): Promise<any[]>;
      read(options: any): Promise<any>;
    };
    settings: {
      browse(): Promise<any>;
    };
  }
}
