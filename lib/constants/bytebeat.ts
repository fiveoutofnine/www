import type { BytebeatSong } from '@/lib/types/bytebeat';

export const BYTEBEAT_SONGS: BytebeatSong[] = [
  {
    name: '300b Information Theory',
    author: {
      name: 'mu6k',
      link: 'https://www.pouet.net/topic.php?which=8357&page=13#c389287',
    },
    source:
      'w=t>>9,k=32,m=2048,a=1-t/m%1,d=(14*t*t^t)%m*a,y=[3,3,4.7,2][p=w/k&3]*t/4,h="IQNNNN!!]]!Q!IW]WQNN??!!W]WQNNN?".charCodeAt(w/2&15|p/3<<4)/33*t-t,s=y*.98%80+y%80+(w>>7&&a*((5*t%m*a&128)*(0x53232323>>w/4&1)+(d&127)*(0xa444c444>>w/4&1)*1.5+(d*w&1)+(h%k+h*1.99%k+h*.49%k+h*.97%k-64)*(4-a-a))),s*s>>14?255:s+127',
    sampleRate: 8000,
    original: 'https://www.pouet.net/topic.php?which=8357&page=17#c389541',
  },
  {
    name: 'Small Mouse',
    author: {
      name: 'SthephanShi',
      link: 'https://github.com/SthephanShinkufag',
    },
    source:
      'T=t/1.2,a=[0,3,5,7,0,3,-4,-2],a1=[3,7,9,11,3,7,0,2],a2=[7,10,12,14,7,10,3,5],B=a=>(.88*t*2**(a[i=7&T>>15]/12)&-T>>6)%256/5,S=(s,p)=>.7*(.88*p*t*2**([a,a1,a2,a1][3&T>>s][i]/12)&64),B(a)+B(a1)+B(a2)+[S(14,1)+S(15,2),2*(S(9,1)+S(14,2))*(1-T%8192/9E3)][1&T>>13]',
    sampleRate: 32000,
    original: 'https://dollchan.net/btb/res/204.html#424',
  },
  {
    name: '347 BYTEBEAT INC.',
    author: {
      name: 'mega9man',
      link: 'https://battleofthebits.com/barracks/Profile/mega9man',
    },
    source:
      '128+24*sin(t/24*(t>>10&42)+1*sin(t/64*(t/1>>15)&21))+sin(1*t/3/4+4*sin(1*t/6/4))*(t>>11&1)*16+sin(1*t/6/4+4*sin(1*t/12/4))*(t>>10&1)*16+56*(3E3/(y=4*t&16383)&1)+56*(300/(y=32*t&28600)&1)+12*sin(t/16*(t>>10&42)+1*sin(t/64*(t/1>>7)&8))',
    sampleRate: 11025,
    original: 'https://battleofthebits.com/arena/Entry/347+BEATSTEP+INC./20403',
  },
];
