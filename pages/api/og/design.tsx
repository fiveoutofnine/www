import type { NextRequest } from 'next/server';

import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

const ORANGE_2 = 'hsl(28, 100%, 8.4%)';
const ORANGE_6 = 'hsl(24, 88.6%, 19.8%)';
const ORANGE_9 = 'hsl(24, 94.0%, 50.0%)';
const ORANGE_11 = 'hsl(24, 100%, 62.2%)';
const ORANGE_12 = 'hsl(24, 97.0%, 93.2%)';

const interRegularFontP = fetch(
  new URL('../../../public/static/fonts/Inter-Regular-Subset.otf', import.meta.url),
).then((res) => res.arrayBuffer());
const interMediumFontP = fetch(
  new URL('../../../public/static/fonts/Inter-Medium-Subset.otf', import.meta.url),
).then((res) => res.arrayBuffer());
const interSemiBoldFontP = fetch(
  new URL('../../../public/static/fonts/Inter-SemiBold-Subset.otf', import.meta.url),
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const hasTitle = searchParams.has('title');
  const hasSubtitle = searchParams.has('subtitle');
  const hasDescription = searchParams.get('description');

  const title = hasTitle ? searchParams.get('title') : 'Title';
  const subtitle = hasSubtitle ? searchParams.get('subtitle') : null;
  const description = hasDescription ? searchParams.get('description') : null;

  const [interRegularFont, interMediumFont, interSemiBoldFont] = await Promise.all([
    interRegularFontP,
    interMediumFontP,
    interSemiBoldFontP,
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          padding: 32,
          background: ORANGE_9,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            padding: 64,
            background: ORANGE_2,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '2px solid',
            borderColor: ORANGE_6,
            borderRadius: 32,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <div
                style={{
                  fontSize: 64,
                  lineHeight: 1.2,
                  color: ORANGE_11,
                  fontWeight: 500,
                }}
              >
                {title}
              </div>
              {subtitle ? (
                <div
                  style={{
                    display: 'flex',
                    width: 40,
                    height: 40,
                    marginLeft: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={ORANGE_11}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              ) : null}
              {subtitle ? (
                <div
                  style={{
                    fontSize: 64,
                    lineHeight: 1.2,
                    color: ORANGE_12,
                    fontWeight: 600,
                    marginLeft: 16,
                    letterSpacing: '-0.025em',
                  }}
                >
                  {subtitle}
                </div>
              ) : null}
            </div>
            {description ? (
              <div
                style={{
                  fontSize: 40,
                  lineHeight: 1.5,
                  width: '100%',
                  color: ORANGE_11,
                  marginTop: 32,
                  fontWeight: 400,
                }}
              >
                {description}
              </div>
            ) : null}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: 64,
                  height: 64,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 128 128"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="1" y="1" width="126" height="126" rx="15" fill="#161616" />
                  <path
                    d="M44.222 77.358c-2.012 0-3.797-.354-5.357-1.061-1.551-.716-2.774-1.7-3.669-2.953-.886-1.253-1.338-2.693-1.355-4.321h6.903c.026.903.375 1.623 1.049 2.16.681.537 1.491.806 2.429.806.724 0 1.363-.154 1.917-.46a3.374 3.374 0 0 0 1.304-1.33c.316-.571.469-1.236.46-1.995.009-.766-.145-1.431-.46-1.994a3.287 3.287 0 0 0-1.304-1.316c-.554-.316-1.193-.474-1.917-.474-.75 0-1.445.184-2.084.55a3.284 3.284 0 0 0-1.394 1.496l-6.238-1.227 1.022-14.42H53.12v5.675H41.358l-.511 5.779H41c.41-.793 1.117-1.45 2.122-1.969 1.006-.528 2.173-.793 3.503-.793 1.56 0 2.949.363 4.168 1.087a7.806 7.806 0 0 1 2.902 3.004c.715 1.27 1.07 2.736 1.06 4.398.01 1.824-.425 3.443-1.303 4.858-.87 1.406-2.093 2.51-3.67 3.311-1.576.793-3.43 1.189-5.56 1.189Zm26.485-27.767L62.27 80.937h-5.983l8.437-31.346h5.983Zm12.177.87c1.525 0 2.97.242 4.334.728a9.65 9.65 0 0 1 3.618 2.263c1.056 1.031 1.883 2.378 2.48 4.04.605 1.653.912 3.656.92 6.008.009 2.148-.26 4.078-.805 5.791-.537 1.705-1.308 3.158-2.314 4.36a10.015 10.015 0 0 1-3.605 2.76c-1.398.632-2.958.947-4.68.947-1.934 0-3.634-.37-5.1-1.112-1.466-.742-2.634-1.739-3.503-2.992a8.637 8.637 0 0 1-1.521-4.18h7.005c.17.793.546 1.368 1.125 1.726.58.35 1.245.524 1.995.524 1.5 0 2.595-.648 3.285-1.943.7-1.304 1.053-3.043 1.061-5.216h-.153a5.358 5.358 0 0 1-1.509 2.058 7.212 7.212 0 0 1-2.352 1.317 8.69 8.69 0 0 1-2.838.46c-1.577 0-2.957-.354-4.142-1.061a7.515 7.515 0 0 1-2.774-2.928c-.665-1.244-1.002-2.659-1.01-4.244-.009-1.858.43-3.486 1.317-4.884.886-1.397 2.118-2.484 3.694-3.26 1.577-.775 3.4-1.163 5.472-1.163Zm.051 5.369c-.707 0-1.338.162-1.892.485a3.544 3.544 0 0 0-1.291 1.317c-.307.554-.456 1.18-.448 1.88.009.698.166 1.325.473 1.879.316.554.742.992 1.279 1.316.545.324 1.172.486 1.879.486.52 0 1.001-.09 1.445-.268a3.48 3.48 0 0 0 1.15-.78c.333-.341.588-.733.767-1.176a3.61 3.61 0 0 0 .269-1.458c-.009-.699-.17-1.325-.486-1.879a3.544 3.544 0 0 0-1.291-1.317c-.546-.323-1.164-.485-1.854-.485Z"
                    fill="#FC0"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="126"
                    height="126"
                    rx="15"
                    stroke="#343434"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div
                style={{
                  fontSize: 40,
                  lineHeight: 1.2,
                  color: ORANGE_12,
                  fontWeight: 600,
                  marginLeft: 16,
                  letterSpacing: '-0.025em',
                }}
              >
                fiveoutofnine
              </div>
            </div>
            <div
              style={{
                fontSize: 40,
                lineHeight: 1.2,
                color: ORANGE_11,
                fontWeight: 500,
              }}
            >
              /design
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interRegularFont,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: interMediumFont,
          style: 'normal',
          weight: 500,
        },
        {
          name: 'Inter',
          data: interSemiBoldFont,
          style: 'normal',
          weight: 600,
        },
      ],
    },
  );
}
