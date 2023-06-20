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
  new URL('../../../public/static/fonts/Inter-Regular.ttf', import.meta.url),
).then((res) => res.arrayBuffer());

const interMediumFontP = fetch(
  new URL('../../../public/static/fonts/Inter-Medium.ttf', import.meta.url),
).then((res) => res.arrayBuffer());

const interSemiBoldFontP = fetch(
  new URL('../../../public/static/fonts/Inter-SemiBold.ttf', import.meta.url),
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
                    color: ORANGE_11,
                    fontWeight: 600,
                    marginLeft: 16,
                    letterSpacing: '-0.025em',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
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
      height: 627,
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
