export interface PakeCliOptions {
  /** 应用名称 */
  name?: string;

  /** 不填会取 url 的 title，取不到默认 webapp */
  title?: string;

  /** 应用icon */
  icon: string;

  /** 应用窗口宽度，默认 1280px */
  width: number;

  /** 应用窗口高度，默认 800px */
  height: number;

  /** 是否可以拖动，默认true */
  resizable: boolean;

  /** 是否可以全屏，默认 false */
  fullscreen: boolean;

  /** 是否开启沉浸式头部，默认为 false 不开启 ƒ*/
  transparent: boolean;
}

export interface PakeAppOptions extends PakeCliOptions {
  identifier: string;
}
