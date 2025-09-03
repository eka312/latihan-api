import type $ from "jquery";

declare global {
  interface Window {
    jQuery: typeof $;
    $: typeof $;
  }
}

export {};