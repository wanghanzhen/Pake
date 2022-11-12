import { PakeAppOptions } from '@/types.js';

export interface IBuilder {
  prepare(): Promise<void>;
  build(url: string, options: PakeAppOptions): Promise<void>;
  // getIcon(icon?: string): Promise<string>;
}
