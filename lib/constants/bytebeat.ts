import type { BytebeatSong } from '@/lib/types/bytebeat';

export const BYTEBEAT_SONGS: BytebeatSong[] = [
  {
    id: '300b-information-theory',
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
    id: 'small-mouse',
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
    id: '347-bytebeat-inc',
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

export const FIVEOUTOFNINE_BYTEBEAT_SONGS: BytebeatSong[] = [
  {
    id: 'rocky',
    name: 'Rocky',
    author: {
      name: 'fiveoutofnine',
      link: 'https://x.com/fiveoutofnine',
    },
    source:
      'f=(t>>10)%776,i=f>>2,v=\'repeat\',e=\'charCodeAt\',o=u=>1-u**2/2+u**4/24-u**6/720,T=O=>o((O%4)-2)*(((O&3)>>2)-1),F=n=>n.split``.map(x=>\'1\'[v]((y=x[e](0))&63)+\'0\'[v](y>>6)).join``,I=n=>n.split``.map(x=>String.fromCharCode((y=x[e](0))&4095)[v](y>>12)).join``,E=(x,y=0)=>.392*(t+12*T(t/1600))*2**(x/12-y)&32,((x=F(I("⁇⁃၇⁃၇⁃ぇ⁃၇⁃၇⁃ቇ၇⁃၇၃၇၃၏⁇ぃ၇ၓ၃။ၯ၃။ၯ၃။ၯ၃။ቿ⁃။⁃ቛ⁃၇၃၇၃၏灇ဠူ")))[f])*E(I("ꀵ‹䀵ꀹ‼쀹쀹ꀹ၅え큊が큅え큊が쁅恅့ဵ〷ဵ့瀹쁁⁁⁆쁅쁅聅")[e](i)-48)+(i>15&&x[f])*E(I("쀠䀠ꀵ‹䀵쀴쀴怴္〼쀹ှ぀쀵္〼쀹ှ぀쀹怹့ဵ〷ဵ့瀹䀵〴〲䀰怵")[e](i)-48)+(i>165)*E(\'579:<>@ACEFGIKLN\'[e]((f>>1)-332)-48)+(i>173)*E(21)+(F(I("ኀ⿀ၯ၏ဿ၀⁇၏⁃假၏⁃假။ぃ假။ぃ၇䁃ၛ၃၇။၇၃၇ၛ၃၇䁃၇⁃䁇ဠူ"))[f])*E(I("퀠퀠耠쁀䀺耹耹‷‵䀷⁁⁂⁃‷‹‷䀹⁃⁄⁅‹‷‵〷ှ၁ှ⁂⁃‷‹‷〹၀၃၀⁄၅၀္ဵ耷耹逺䁆〺‹恅쀹쀹")[e](i)-48,2)+F(I("ᾀ⽀၏ဠၟ큏恏቏⁃၇၃၇၃၏ぇ၃။၇၃ဠဴ"))[f]*E(I("퀠퀠퀠瀠䁆쁅䁅쁆䁆쁈䁈쁆䁆쁈䁈聊聈ꁊ큈큈쁈")[e](i)-48,2)+(i>58&&i<178&&F(`CŃŃŃ${\'ʃÀʃӀʃÀ\'[v](6)}ŃŃŃŃŃŃʃÀ`)[f-236])*((2e11*(t/(1<<14))**2)&255)/5',
    sampleRate: 32000,
    original: 'https://github.com/fiveoutofnine/555',
  },
  {
    id: 'in-the-hall-of-the-mountain-king',
    name: 'In the Hall of the Mountain King',
    author: {
      name: 'fiveoutofnine',
      link: 'https://x.com/fiveoutofnine',
    },
    source:
      // eslint-disable-next-line quotes
      `c='charCodeAt',u=(t>>18)%3,r=(t)=>t&256?t&255:256-(t&255),a=30*t*2**(("%'(*,(,,+'++*&**%'(*,(,1/,(,////"[c](t>>11&31)+[0,12,7,19][t>>16&3])/12-6),x=30*t*2**(("%,%,%,%,%,%,(/(/,3,3(0,3"[c](8*(t>>17&1?2:t>>15&1)+(t>>12&7)))/12-7),y=a*2,z=y*2,r(a)/(5-(u>1))+(u>0)/5*r(y)+(u>1)*(r(z)/5+r(x)/4)`,
    sampleRate: 8000,
    original: 'https://github.com/fiveoutofnine/curta-paradigm-2023',
  },
];
