import {e2edCreateSafeHtmlWithoutSanitize} from '../client';

import type {SafeHtml} from '../../../types/internal';

/**
 * Render SVG logo for report page.
 * @internal
 */
export const renderLogo = (): SafeHtml => e2edCreateSafeHtmlWithoutSanitize`
<a href="https://www.npmjs.com/package/e2ed" aria-label="e2ed package" rel="noopener noreferrer" target="_blank" title="e2ed package"><svg role="img" width="80" viewBox="0 0 730 268" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M392.38 174.746c0-15.773 2.366-29.519 7.098-41.236 4.957-11.943 11.379-21.857 19.266-29.744 7.887-7.887 16.9-13.858 27.04-17.914 10.365-4.056 20.956-6.084 31.772-6.084 25.237 0 45.179 7.774 59.826 23.322 14.647 15.323 21.97 37.969 21.97 67.938 0 2.929-.113 6.197-.338 9.802-.225 3.38-.451 6.422-.676 9.126H444.094c1.127 10.365 5.971 18.59 14.534 24.674s20.055 9.126 34.476 9.126c9.239 0 18.252-.789 27.04-2.366 9.013-1.803 16.337-3.943 21.97-6.422l6.76 40.898c-2.704 1.352-6.309 2.704-10.816 4.056-4.507 1.352-9.577 2.479-15.21 3.38-5.408 1.127-11.267 2.028-17.576 2.704a177.549 177.549 0 0 1-18.928 1.014c-15.999 0-29.969-2.366-41.912-7.098-11.717-4.732-21.519-11.154-29.406-19.266-7.661-8.337-13.407-18.139-17.238-29.406-3.605-11.267-5.408-23.435-5.408-36.504Zm118.3-19.266a47.205 47.205 0 0 0-2.366-12.506c-1.127-4.056-3.042-7.661-5.746-10.816-2.479-3.155-5.746-5.746-9.802-7.774-3.831-2.028-8.675-3.042-14.534-3.042-5.633 0-10.478 1.014-14.534 3.042-4.056 1.803-7.436 4.281-10.14 7.436-2.704 3.155-4.845 6.873-6.422 11.154a77.901 77.901 0 0 0-3.042 12.506h66.586Z" fill="#084EE8"/><path d="M390.818 93.57c0 8.563-1.69 16.787-5.07 24.674-3.38 7.887-7.774 15.548-13.182 22.984-5.408 7.211-11.492 14.196-18.252 20.956a776.839 776.839 0 0 1-19.942 19.266c-3.38 3.155-7.098 6.76-11.154 10.816a276.482 276.482 0 0 0-11.154 11.83 342.628 342.628 0 0 0-9.802 11.492c-2.704 3.38-4.394 6.197-5.07 8.45h100.724v42.25H241.76c-.451-2.479-.676-5.633-.676-9.464v-8.112c0-10.816 1.69-20.731 5.07-29.744 3.605-9.013 8.225-17.351 13.858-25.012a159.61 159.61 0 0 1 18.928-21.97 1849.31 1849.31 0 0 0 21.294-20.28 6783.763 6783.763 0 0 1 15.21-14.534c4.732-4.732 8.901-9.239 12.506-13.52 3.605-4.507 6.422-8.901 8.45-13.182 2.028-4.507 3.042-9.013 3.042-13.52 0-9.915-2.817-16.9-8.45-20.956-5.633-4.056-12.619-6.084-20.956-6.084-6.084 0-11.83 1.014-17.238 3.042-5.183 1.803-10.027 4.056-14.534 6.76-4.281 2.479-7.999 5.07-11.154 7.774-3.155 2.479-5.521 4.507-7.098 6.084L235 58.418c9.915-9.239 21.407-16.787 34.476-22.646 13.295-6.084 27.491-9.126 42.588-9.126 13.745 0 25.575 1.577 35.49 4.732 9.915 3.155 18.027 7.661 24.336 13.52 6.535 5.633 11.267 12.619 14.196 20.956 3.155 8.112 4.732 17.35 4.732 27.716ZM615.756 172.042c0 15.548 3.493 28.054 10.478 37.518 6.985 9.464 17.351 14.196 31.096 14.196 4.507 0 8.675-.113 12.506-.338 3.831-.451 6.985-.901 9.464-1.352v-91.598c-3.155-2.028-7.323-3.718-12.506-5.07a57.545 57.545 0 0 0-15.21-2.028c-23.885 0-35.828 16.224-35.828 48.672Zm113.906 84.5c-4.507 1.352-9.689 2.704-15.548 4.056a355.89 355.89 0 0 1-18.59 3.042 262.12 262.12 0 0 1-19.604 2.028c-6.535.676-12.844 1.014-18.928 1.014-14.647 0-27.716-2.141-39.208-6.422-11.492-4.281-21.181-10.365-29.068-18.252-7.887-8.112-13.971-17.801-18.252-29.068-4.056-11.492-6.084-24.336-6.084-38.532 0-14.421 1.803-27.378 5.408-38.87 3.605-11.717 8.788-21.632 15.548-29.744 6.76-8.112 14.985-14.309 24.674-18.59 9.915-4.281 21.181-6.422 33.8-6.422 6.985 0 13.182.676 18.59 2.028 5.633 1.352 11.267 3.267 16.9 5.746V8.112L729.662 0v256.542Z" fill="#084EE8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M218.57 80.677A119.502 119.502 0 0 0 64.498 41.41a119.499 119.499 0 1 0 153.974 173.057L87.167 169.309 218.57 80.677Zm-87.215 9.522a40.003 40.003 0 0 0-41.423-16.11 39.998 39.998 0 0 0-24.109 61.996l32.766-22.943 32.766-22.943Zm90.251 74.407c9.389 0 17-7.611 17-17 0-9.388-7.611-17-17-17s-17 7.612-17 17c0 9.389 7.611 17 17 17Z" fill="#084EE8"/><ellipse cx="207.189" cy="145.79" rx="3.73" ry="3.632" fill="#010817"/><ellipse cx="223.351" cy="156.684" rx="3.73" ry="3.632" fill="#010817"/><ellipse cx="217.565" cy="150.08" rx="21.635" ry="20.579" transform="rotate(1 217.565 150.08)" fill="#084EE8"/><path transform="matrix(-.58779 .80902 -.8239 -.56675 227.611 133.824)" stroke="#000" d="M0-.5h40.111"/><path d="M238.5 153.598c2.905-3.895 4.101-8.755 3.325-13.512-.776-4.757-3.46-9.021-7.463-11.853-4.003-2.833-8.995-4.002-13.88-3.251-4.885.751-9.261 3.361-12.166 7.256l15.092 10.68 15.092 10.68Z" fill="#160101"/><ellipse cx="207.185" cy="146.267" rx="3.73" ry="3.632" transform="rotate(1 207.185 146.267)" fill="#010817"/><ellipse cx="223.154" cy="157.442" rx="3.73" ry="3.632" transform="rotate(1 223.154 157.442)" fill="#010817"/><path d="M221.155 95.575c9.762 4.462 8.763 21.708 7.044 29.773M267.422 127.056c-7.794-7.379-23.41.007-30.243 4.623" stroke="#000"/></svg></a>`;
