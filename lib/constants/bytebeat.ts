import type { BytebeatSong } from '@/lib/types/bytebeat';

export const BYTEBEAT_SONGS: BytebeatSong[] = [
  {
    id: '304b-information-theory',
    name: '304b Information Theory',
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
    id: '1k-dance',
    name: '1k dance',
    author: {
      name: 'raphaelgoulart',
      link: 'https://raphaelgoul.art',
    },
    source:
      'z=40.7,b=t/2250,r=b|0,y=r%16,a=[1,2,1,2,1.2,2.4,1.2,2.4,1.33,2.67,1.33,2.67,1.5,3,1.5,3][y],o=(c=1<r%64&&33>r%64)?1.19:1.5,n=[0,0,2.38,2.67,2.38,0,2,2.24,0,2.38,0,2.24,0,1.78,0,2,2,2,1,1.19,1.5,0,1.19,1.33,0,1.19,0,c?1.12:1.33,0,o,o,o],x=(r/4|0)%4,d=[12,12,10.67,12][x],g=[9.52,9.52,8,8.96][x],h=[8,7.12,6.72,7.52][x],v=2*b%4*1.25,w=(y/12|0),u=(r/16|0)%4,j=[[19.04,17.92],[14.24,9.52],[10.64,12],[8,0]],sin(1/z*t+7*sin(1.125*t/z)*(0<1-2*b%4?1-2*b%4:0))*(40-15*b%30)+40+(16>b?0:random()*(2==r%4?32-32*b%32:0))+(32>b?0:random()*(16-(16>28*b%28?28*b%28:16)))+(64>b?0:32*sin(a/z*t+4*sin(t*a/z)*(1-b%1))+32)+(96>b?0:sin(t*d/z+sin(t*d/z)*(1.5*b%3))*v+5)+(96>b?0:sin(t*g/z+sin(t*g/z)*(1.5*b%3))*v+5)+(96>b?0:sin(t*h/z+sin(t*h/z)*(1.5*b%3))*v+5)+(128>b?0:t*n[r%32]*8%256>121+abs(108-56*b%224)?20:0)+(129>b?0:t*n[(r-1)%32]*7.98%256>121+abs(108-56*b%224)?7:0)+(192>b?0:sin(j[u][w]/z*t+4*sin(2*t*j[u][w]/z)*(2>y||12<=y&14>y?1-b/2%1:0))*(5.3-y/3%4)+5.3)',
    sampleRate: 11025,
    original: 'https://battleofthebits.com/arena/Entry/1k+dance/31132',
  },
  {
    id: 'small-mouse',
    name: 'Small Mouse',
    author: {
      name: 'SthephanShi',
      link: 'https://github.com/SthephanShinkufag',
    },
    source:
      'T=t/1.2,a=[0,3,5,7,0,3,-4,-2],b=[3,7,9,11,3,7,0,2],c=[7,10,12,14,7,10,3,5],B=a=>(.88*t*2**(a[i=7&T>>15]/12)&-T>>6)%256/5,S=(s,p)=>.7*(.88*p*t*2**([a,b,c,b][3&T>>s][i]/12)&64),B(a)+B(b)+B(c)+[S(14,1)+S(15,2),2*(S(9,1)+S(14,2))*(1-T%8192/9E3)][1&T>>13]',
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
      '128+24*sin(t/24*(t>>10&42)+sin(t/64*(t/1>>15)&21))+sin(t/12+4*sin(t/24))*(t>>11&1)*16+sin(t/24+4*sin(t/48))*(t>>10&1)*16+56*(3E3/(y=4*t&16383)&1)+56*(300/(y=32*t&28600)&1)+12*sin(t/16*(t>>10&42)+sin(t/64*(t/1>>7)&8))',
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
