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
    id: 'as-esport',
    name: 'as esport',
    author: {
      name: 'blower5',
      link: 'https://battleofthebits.com/barracks/Profile/blower5',
    },
    source:
      'a=(x,y)=>[x[0]+y[0],x[1]+y[1]],p=(x)=>x.map((z)=>(t/4*1.0595**(z+((t+P)/9/2**19|0)*3)+128)%256/40),r=(x)=>a(p(q(x)),a(p([x-.1,x-.3]),p([x+.1,x+.2]))),u=(x)=>(a(r(x),S>P&S<P*4|S>P*5?r(x+11.8):Z)),s=(x)=>u(x[T=(S>>45)%32]??-9e9),w=(x)=>p(q(x)).map(x=>(x*4&16)*1.8),q=(x)=>[x,x],Z=q(0),P=8<<16,S=t%(P*9),this.v??=0,R=(w,i,s)=>(v++||(x=Array(8<<10).fill(0)),y=w[1]%256+x.shift(),x.push(y*s),[y*i+w[0]*.7,y*i+w[1]*.5]),A=[38,,,38,,,38,41,,,41,,,41,,,36,,,36,,,36,38,,,38,,,38],B=[31,,,31,,,31,34,,,34,,,34,,,29,,,29,,,29,31,,,31,,,31,,29],C=[46,,,46,,,46,46,,,46,,,48,,,45,,,45,,,45,46,,,46,,,46,,53],D=[7,10,5,7],E=[43,38,50,46,,46,45,41],F=[,38,41,38,36,41,38,,],G=[43,,45,46,48,50,43],E=E.concat(F,E,G),H=S<P*5?[8,,3,]:[8,5,4,3],a(a(R(a(a(a(s(A),s(B)),a(s(B.map(x=>x-12)),s(C))),S>P*4?q(w(E[T%32])[0]*(H[(4*t>>45)%4]??0)*.1):Z),.5,-.5),S>P*6|S<P*4?T&1?a(w(D[T>>3]),w(D[T>>3]-11.9)):Z:Z),a(S>P*2&S<P*4|S>P*6?~T&1?q((1e2**(t*2%(8<<12))**.05)&32):Z:Z,q(random()*(256-(t>>4)%256)*[4,2,8,3][(t>>44)%4]/75)))',
    sampleRate: 48000,
    original: 'https://battleofthebits.com/arena/Entry/as+esport/61968',
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
  {
    id: 'sparta-atari-base-cover',
    name: '"Sparta Atari Base" cover',
    author: {
      name: 'ANoUserXD',
    },
    source:
      'T=1.15*t,k=T>>11,R=random,c=([a=4E4*R()/(T&4095),a,0,0,a,a,0,0,a,0,b=4E4*R()/(T&2047),0,b,b,4E4*R()/(T&1023),4E4*R()/(T&511)][k&15]&255)%256/2,d=(4E4*R()/(T&[4095,4095,4095,2047][T>>12&3])&255)%256/2,e=t*(0xAFEDC320>>t/2.65*2**([-3,4,-3,4,-2,5,-2,5,-5,2,-5,2,-2,5,-2,5][k&15]/12)&1)&&64,f=t*(0xAFEDC320>>t/2.65*2**([-15,-14,-17,-14][T>>13&3]/12)&1)&&64,g=4*t*[2.5,-2.5,2.6,-2.6,2.2,-2.2,2.6,-2.6][T>>12&7]&64,h=t*[1.25,,1.25,,1.3,,1.3,,1.1,,1.1,,1.3,,1.3][k&15]&64,i=(t*2**([16,,23,,29,,24,,14,,21,14,29,,24][k&15]/12)&63)+16&64,j=2*t*[1.9,1.9,3.8,,2,2,4,,1.7,1.7,3.4,2.5,2,4,2,4][k&15]&64,k=(4E4*R()/(T&[0,0,0,2047][T>>13&3])&255)%256/2,l=8*t*2**([4,4,12,12,16,16,,,5,5,17,5,5,17,17,17,2,2,14,14,,,,,17,17,5,5,2,2,5,5][T>>10&31]/12)&64,m=(8*t*2**([4,4,,4,4,,4,,5,5,,5,5,,5,,2,2,,2,2,,2,,5,5,,5,5,,5][T>>10&31]/12)&64)*(~T>>2&255)>>8,min(255,[c,d+e+f,d+e+f,g+h,g+h,g+h+d,d+e+f,d+e+f,d+e+f+i,d+e+f+i,j+h+k,j+h+k,d+e+f,d+e+f,d+e+f+l,d+e+f+l,m,m,m+i,m+i,d+e+f,d+e+f,d+e+f+i,d+e+f+i,j+h,j+h,j+h,j+h,j,j,d+e+f+m,d+e+f+m,d+e+f+i,d+e+f+i,d+e+f+l,d+e+f+l][T>>15])',
    sampleRate: 8000,
    original:
      'https://www.reddit.com/r/bytebeat/comments/155a8c0/cover_of_sparta_atari_base_completed',
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
