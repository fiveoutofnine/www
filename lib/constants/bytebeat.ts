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
];

export const FIVEOUTOFNINE_BYTEBEAT_SONGS: BytebeatSong[] = [
  {
    id: 'banana',
    name: '🥽🍌',
    author: {
      name: 'fiveoutofnine',
      link: 'https://x.com/fiveoutofnine',
    },
    source: `k=t>>10&127,a=k>>4,m=[693,144][a-5],j=a!=6,A=(r,g=29365,b=0)=>((t>>8&3)<3|g>>(k&15)&1)*.784*(t+b*sin(t/400))*2**((r&a>6?14:r)/12)&55,j*A(14,m)+(!!a+!j)*A(18+(a==4)-~~'444222299900202024744'[k-93],m)+2*A(+'466422269664222246642222!!11'[k-44>>1]+12,'倀嗵埵ߵ7'.charCodeAt(a-2),9)`,
    sampleRate: 8000,
  },
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
    source: `c='charCodeAt',u=(t>>18)%3,r=(t)=>t&256?t&255:256-(t&255),a=30*t*2**(("%'(*,(,,+'++*&**%'(*,(,1/,(,////"[c](t>>11&31)+[0,12,7,19][t>>16&3])/12-6),x=30*t*2**(("%,%,%,%,%,%,(/(/,3,3(0,3"[c](8*(t>>17&1?2:t>>15&1)+(t>>12&7)))/12-7),y=a*2,z=y*2,r(a)/(5-(u>1))+(u>0)/5*r(y)+(u>1)*(r(z)/5+r(x)/4)`,
    sampleRate: 8000,
    original: 'https://github.com/fiveoutofnine/curta-paradigm-2023',
  },
  {
    id: 'rachmaninoff-piano-concerto-2-movement-1',
    name: 'Concerto No. 2, Mvt. I',
    author: {
      name: 'GPT 5.6 Sol',
      link: 'https://developers.openai.com/api/docs/models/gpt-5.6-sol',
    },
    source: `l=2352,Z=Math,Q=Z.sin,m=6.283185,h=(s,i)=>s.charCodeAt(i),j=n=>2**(n/12),I="AGIUY_a AGJVY_b @GJLX_bdLQUX]ad NQUZ]af QVZ]bfi SVZ_bfk D       U       S       =       NZ      I       IMSUY_a JMSVY_b NRXZ^df ORX[^dg AGISY_  @FJLX^bd@FJNZ^bfLRUXdjmpLRUZfjmrBFJNZ^bfNRUZfjmr;MY     EIQUX]  GJSV]_  ILUX]a  GMSY_   KQUW]ac PU\\ah   NQVZ]bfiJNVZ]b  LOX[bd  NQZ]bf  LRX^d   PVZ\\bfh UZafm   UYaekm  @GJV_b  >GJV_b  G               ;GS_    =IUa    >JVb    BGJNZ_bfCHLO[\`dgCO[g    BNZf    @LXd    GJM     Z^bf    RVY     Z]af    QUY     D       N       U       S       BGINZ_af@FILX^adGJNS_bfk>BG     ;>A     BGJ     >BF     GJN     BGI     JNS     NSV     JNR     SVZ     NTZ     HKM     NSZ     BGN     =@      6       *       @GLX_d  L       P\\      Z       NZ      HLQT\`dilCGKO[_cgBGKNZ_cfCGJO[_bg;>COSV[ 6;=     NSU     VZ_     VY      CGIO[_agAMYe    BFINZ^afEQ]i    FIOR^agj=IU     B       P       H       GKOS_cgkGKNS_cfkGJOS_bgk>CGSV[_ >BGSVZ_ Zb      EJQ]bi  CGO[_g  BEGNZ]_fJOSVbgknGNQS_fikCGLO[_dgBFLNZ^df>BGJVZ_b=AGIUY_a8       IU      HKT     DO      BN      4       ;       GS      X       ?       Q]      T       >       V       G",J=",) K-* +,. K:. K    ; < =         / 0     > / 0 %   % % % & ? % &   & & & @ % & A   B C D         1 2     E 1 2 '   ' ' ' ( F ' (   ( ( ( G ' ( H  ! !  !  3 !     # #  #  ! #     $ $  I  $ $  4  5 5  6  7 7     ! !  !  3 !     # #  #  ! #     $ $  J  $ $  4  8 8  6  9 9     & &  L  & &  _  M M  \`  N N     & &  L  & &  a  O O  b  P P  c       6Q 6Q6 787 878 9:9 :9: ;<; <;< *=* =*= >?> ?>? RSR STd T+, +,+ ,+, +,+ ,-. -.- .-. -.- .@A @A@ AB* B*B *CD CDC DEF EFE F    % % 3 ' 4 ( 5   % % 3 ' 4 ( 5   ! ! G   # # U   # $ ) V W     $ ) ( ' X Y   e   $ $ $ ) # $ f   ! ! g   ! ! G   # $ ! # $ ) %   % % 3 ' 4 ( 5   % % 3 ' 4 ( 5   ! ! G   # # U   # $ ) V W     $ ) ( ' X Y   h   ' ' i   ( ( j   ) ) k   # # l   ! ! m   Z Z n[ /o] 0H/ [pq rst /u] H/| HIv 2w^ 0xJ 1y0 ^IJ 1z| 0IJ 120 |K{ 2",L="S G G / S G G   U I I   a I 8 , b J 7 + f N B 6 Q E E   Z N @ 4 _ G 9 - b J 6 * d L 6 * k S 4;(/RZBL6B*6QZBK6B*6S G G 1   M = 1   N = 1 U I D 8 V J D 8 Q E B 6 Z N = 1 [ O = 1 V J ; / _ G 8 , a I 7 + d L B 6 g O @ 4 g O 4 ( k S 5 ) _ G 5 ) B > 7 + G >B7 + J >B8 , N BJ8 , S BJ7 + N BK6B*6N BJ6B*6BNGI6B*6BNFI6B*6S G G 6 O C C 4 N B B 6 N B B   V J J   S G G * [ O O     H 8 ,   I 8 ,   G 4 (   P ? 3   Q ? 3   N > 2   P > 2   L E 9 L L E 9 Q E E 9 S G E 9 L I B 6 U I B 6 N B > 2 Q E > 2 V J > 2 X L > 2 Q E ; / Z B ; / i Q @ 4 f N @ 4 i Q 4 ( f N 4 ( S J 6 *     6 * S BJ8 , S BJ9 - V BN9 - V BN: . V J J 7 V J J 6 V J J 4 S G G 2 Q E E 3 Q E E 4 O C C   N B B 7 L @ @   [ O O 3 [ O O 2 Z N N 3 Z N N   X L L 4 U I I 6   L @ 4   N @ 4",M="0110VWXY2332Z44[((((]^_\`5665a77b))))8$$$9%%%*+*+:&&&8$$$9%%%*+*+:&&&;cd;,,,,<ef<==>>gh??@@AABBCCijkl----....DDEEFFGG !H# !H# !/'I'JK #m#nLo#p!q'rstu !M# !M# !/'I'JK !vNwNxyzL{# !/#OPPOQQ|}RSSRTUUT",N="   AG @GJ7>G@FJ<CH<EH>CG@G 6>G8>GBFLBEK@FI;CG9BJ6?H6=G;BG6=F;>B8BJ6@B>G :BJ=@B@CGBF 7G :  CFJBEJ@CF?BE;@ =@C;?B?FI>GJ?EG@EGBDF;@B=@A<H",O=" !!!!!!!!!!!!!!!!))))))))))))))) ################%%%%%%%%....... !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ################%%%%%%%%....... &&&&''''''''&&&&////////3333333 &&&&''''''''&&&&((((((((((((((( *******8$$$$$$$$$$$$$$$8+++++++++++++++8$$$$$$$=666600000000999>,,,,,,,,,,,,,,, --------------- 11111111********222222224444444 ",U="57575:;<5?@A(BCD57575:;<EFGHIJKL",T=";6;6;;;6;767;;;;;6;6;;;6;77;;6;;",C=c=>c-32-(c>34)-(c>92),z=t*9/2500,q=z%l|0,f=z%1,b=q/48|0,a=q%48,g=q<1344?.65+q/3840:q<2112?1:q<2160?1-3*(q-2112)/320:.55+(q-2160)/1920,S=C(h(M,q/12|0)),y=q>>1,i=q/3|0,B=y-431&&y-479?y-599?i<464?C(h(O,i-143)):i%8?0:C(h(U,i/8-58)):0:44,K=x=>(x+=x<0&&l,k=x%48,e=k&1?-1:h("0/123/4/567/8/9:;/</=>?/",k/2)-48,e<0?0:C(h(J,(x/48|0)*16+e))+(x>=816)*43),F=i=>(n=h(I,A*8+i-8)-11,n>21?(p=m*D*137.5/9*j(n-69),(Q(p)+.14*Q(2*p))/(1+D*.14)+.3*Q(7*p)/(1+D*1.8)):0),P=(x,d)=>(D=d,A=K(x),E=Z.min(1,d/.08)*2**(-d/4.2)*(1+.12*!(k%12)+.08*!k),E*(F(0)+F(1)+F(2)+F(3)+F(4)+F(5)+F(6)+F(7))),H=n=>(p=m*t*.055*j(n-69),(.82+.1*Q(z/7+n)+Q(z/19-n)/25)*(Q(p+Q(t/250+n)/40)+.18*Q(2*p)+.07*Q(3*p))+.1*Q(p*1.002+n)),V=(i,j=L,k=S*8)=>(n=h(j,k+i)-11,n>21?H(n):0),x=q,d=f,u=P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++)+P(x--,d++),o=V(0)+V(1)+V(2)+V(3)+V(4)+V(5)+V(6)+V(7)+V(0,N,B*3)+V(1,N,B*3)+V(2,N,B*3),r=h("         00110011242411111111",b)-48,n=r>=0?(r&1||r>2?a%3:!a||a%8)?0:r<3&&r?42+r:48:a%24?0:h(T,(b-29)*2+a/24)-11,e=1-f,d=n>21?(p=m*f*275/72*j(n-45),Q(p*(1-.06*f))*e**2+Q(t*12.9898)*43758.5453%1*.28*e**3):0,128+124*Z.tanh(g*(u*5.25+o*2.727*(.86+.1*Q(z/5)+.06*Q(z/17))+d*11)/34)|0`,
    sampleRate: 8000,
  },
  {
    id: 'chopin-etude-10-4',
    name: 'Étude Op. 10 No. 4',
    author: {
      name: 'GPT 5.6 Sol',
      link: 'https://developers.openai.com/api/docs/models/gpt-5.6-sol',
    },
    source: `t%=897273,x=t*11/7500,t||(I=[1563,156,0],B=[...N=[0,0,0]],J=[j=r=0,0],R=[60,60],A=[3,5,2,4,6,7,12],O=[],Z=Math,Q=Z.sin,G=n=>(N[h]<n&&(c="l|ewV~BVwd^AisZpxJERHOD^KUJD]TvobEn@mn{XndMy}M~jwUbvaEzQv@^xb]jOoqUOnhnm}Dw|EWjWjNEr?ZfHjt@SEHG[DtatZnUYImz^ojl\`s|MUZY}kUJM|>csYUy}Fxob]WxjyncvcnZU~kME}I|zo{nZXYb^pNVirENViAOTcpsgJSib]lLY\`vZnC]ML}U\`vo{nC]\`N|r]lZXYaywbmFza@whmFUAxNNJB?@>>F>F?>>N_>@?B>NF>DM_B_NNV]c???OV>DCEgAgV]eMQ@p{FcPL\`\`yV|JIEoaOKp^WFh^?FxYFh]fX_n_gK{C?ajJ[?agKCXQEP_pTiKysxmE[q{Sw{zx]E^Aq{SxcxmEIq{Sy]p@A?NlGOZOvCCpGZUjUBDwu_>N>>?@>>F>F?>>NNBL>?>>>BF>>_>_B>??>N>>F?>>N_>@>@>N>BF>>_O>B@>?__NJB@?>oNFEK||WajJ[?nTjNXiRDit?_vD|F>B>_>FN>?>?>F>@B>>NFFHMN>__gk>A@ao>JHMLmK||WbgJS?nTjNXiRDit?_vD|F>@>>>FN>?>?>F>@B>>>>F>>>\`>>B>@>>>FN>AjJ[\`blKLwuSeLopuefZYKWisejVXlhivkXlzej^?ivqXlpm?_?yVAK{FJ>MP>xn_?_?yNEK{FJ>MP>>N_>D>@>NNBN??>O>BB?@>>V>F??>O>BB?@>>Rv>>N>R>?>?N>B>C>>N>R>?>?N>B>C>>N>?K~FZFED?o_ZVE@?p_ZFED?o_ZVE@?p_ZFEBQZ>?>?N>B>C>>N>R>?>?N>B>C>>N>R>?>>Bvz?o_ZVE@?p_ZFED?o_ZVE@?p_ZFED?o_Z>M^En_>F>@?>?o_ZVE@?o>|{]}>>_>FBXE@?p_ZFE>Avpzw>@>>_OgZFED?oNc^ZE@?p_ZFEEv?o_ZVE@?pz~]gOeq]Y|{>K?bs_FsBMP>ANV|F@K???>J][Z]ozX\`\`z@liDEtH?>_VHY}HACTVyACNXHseLd?alRYthrZLzdwjpxvq{L}EdwjsHEmYtjbQZUUB[pEZNUCKp@w^H@?__FN>?>?>F>@B>>NF_@?>>p{>c@@AAs_FFHI>>og|>[AAspyVTM\`BaOsJMQEhAxV}BPGmIzGCIwGEIWCIszRC{C?n_gJSWbgJS?gjPVyRDHtOnTfKozmUanEf^Iozw]UanJfKox]UanQuFNVHChHIaLwgmGIa|Xw_vDs>@>>>FN>?>?>F>@@>\`o>F>>>\`>>B>B>_>FF@>>>_>>@B>>N>N@>>__FZ>@>>>FN>?>?>FB>@>>>FN>?>?>F>@B>AN>F>>>\`>>B>B>_>FN>?>a>FB>A?>_VFB@?__NJB@?>oNFD@?>_VIZV[phe}ywhclp]dIja|LQUCJenchct{CJelHWK]pQGjaePvCyRmmIsxKZRqX}PeQUoRqXshdSjuK~NJ>MMEr>o>|>^HA>@ogJ>MPE>o>|JJA>@O{FJ>EEo>o>{g^TA>Aqp|NJ>MJEs_o>{s^NA>Ar\`_J>MMEr>o>|>^HA>@pJxmE[q|ZcxmE[q|[wB{pdjuMH}DH|]oz[AxNNJBw@B>>N>N@>>\`>>B@F>_N>J^>G>__o|F@@@ao>J^HMMAOoc]cM\`\`OF{{[@aOVXCEh\`Ia_VMLDAr\`_|>VMFDAr|PsGVisgJKPrCTcosIJSXQANkoseHhhajP_vt}Yhr^?NYqnKsxn_gHFsOEo>wsOEo>gsOEo>wsB?@>>F>F?>>N_>@?B>NF>DM_B_NNV]c???OV>DMdEf\`gwPMPEoogc]_M\`bxOyN|J^?Eqbs\`yo|{ZBDbvpoN]kF@At\`>NNMT>|NrJuV{vhySeEiDWerEebPYwLgWeYJ]Ys|X]p|xe}ATXHseUZWo>N@>>\`>>B>B>_>FN>?>__g|>@@@ao>JHMN>_\`_{mp?bhNVjBDHlGbkNVHseDhhnhvDZ>@>>>FN>?>?>F>@B>>NFFHMN>__gk>A@bs>FFVMIkNVyRDHp?ajPVjBDLd?igTXideEQAwNN>Oh_oN>MTuNVB>>L>\`>B]l\`__>Oh\`{FF>MTuNVF?>L>>_>|YQAwNN>Oh\`{FF>Fso}BB>BXV^@@>@KJM\`?>?DeEo__>bQAwNN>Oh\`{FJBA>>_>bQ?__>Sh_oN>MMsoVF>CXVJB>Ar|JD@>?TqA>_>{~QAwNN>Rf>?>FGL?B>NPZ@B>>sw>F??GoF_@@Q_O>BBr>\`>>KL>@>Nd@DDvnvN]VUmEm]Vv]yAIxAvMGCPsbkVYwNFFHMM>__g{{>A@broFFHMM>__g{{@@@bro>JHIkNWL~[?x\`]w]xxb[zgJncMZ{cSIPLp\`n\`>__g{{@@@bro>JHMM>__g{{@@@broFFHMM>>og{wV>?__NJB@>_\`{g{{@@@ap_>D@?>oN>>A@broFFHID>>VFBA?>>FFHMM>__g|V>A@bro>JHMT>__g{{@@@aOgsXKDbOgs]c>En__w>XAEh>OgF]c>D_pyNBX@@@>V|Xt@aV>>>>o>>>@>>>>Z@H>>_>>>@>>>>F>>>?oFg>@>>>>F>>>>_>>>@>>>>F>>>>_>>>@>>?NJ>>>\`>>B>B>_>FN>?>a>FB>AEo@NFFJMP>__gk>AEqbrosZGEhAwVRPMMENgcTD\`OyVPwgDAr\`_{wVMNDAq?_{~Rl@THlHAARkpShJK@rCTcosIJKGaiXVisgK|^eyZvoRD{jr[LYwH@a?@O{>HM^BO{>HKBO{>LK?>N_>@>@>N>BF>>_O>B@>?bw?FBBDEh>NNRT>?bxOxwXLBbs\`{JHGEgAwV}R]cMQEoO{g|F]kM^E??g|{ZBEj@>_|VNBBAt_MRJrKeMKy]dW\`y\`eWkpxgse}AiDWerEe|MPko|NrJuV{vgYRHKTd@r]~kRVK@rSgVVlYuKz}\`hislK{Dh\`iz\`Wxal@sevTd?n^sgTYwK@sebTh\`nDuHTVHChK|o>DLEh>>N}RT???OV>DCC_NNRT>?bxOV>DCEg>NNo]k>?b\`yN>DCC_NNRT>?\`OVBBCC_>V}RT>?\`Oy>BBJEj>>Vw]c>?\`OVBBCC_>VRT???OV>DCC_>VRT>?\`OV>DCC_>VRT>?\`OV>DCC_>VRT>?\`OVBBCEgUmUhb__gJL@@_owFHAAw?g|JPHDbspFgXMQBa\`g|JPHMK~fNlGxUov@n]MV>".charCodeAt(I[h]++)-62,B[h]=B[h]<<6|c-(c>30),N[h]+=6),N[h]-=n,B[h]>>N[h]&2**n-1),U=_=>G(1)?G(1)?G(1)?0:4:2:1,W=d=>O[r++%52]=[75*Z.PI*2**((p-69)/12),J[h],J[h]+d,V],H=_=>{if(x>=J[h]){for(q=G(4),p=R[h]+=q<15?'AB>?=IG:<9@6LCH'.charCodeAt(q)-64:G(6)-27,d=U()||[5/3,4/3,12,8,6,16][G(3)],W(d),l=4;l--&&G(1);q=G(3),p+=A[q]||G(4)+2,W(G(1)?1<<G(2):d));J[h]+=U()||(G(1)?64*G(1)+G(6):1)/3}}),h=2,x>=j&&(V=G(4),q=G(3),j+=A[q]%11||64*G(2)+G(6)),h=0,H(),H(++h),128+110*Z.tanh(O.reduce((v,[f,s,e,z])=>(a=x-s,d=(e>=1254?1316:e)-x,v+(d>-2&&z/15*(a>.03||a/.03)*(d>0||1+d/2)*((Q(i=f*a)+.14*Q(2*i))/(1+a*.14)+.3*Q(7*i)/(1+a*1.8)))),0)*.22)|0`,
    sampleRate: 8000,
  },
  {
    id: 'chopin-etude-25-9',
    name: 'Étude Op. 25 No. 9',
    author: {
      name: 'GPT 5.6 Sol',
      link: 'https://developers.openai.com/api/docs/models/gpt-5.6-sol',
    },
    source: `t%=437143,x=t*.028,t||(I=[48,801,0],B=[...N=[0,0,0]],J=[j=0,0],R=[60,60],O=[],Z=Math,Q=Z.sin,U=_=>G(1)?G(1)?G(1)?G(1)?G(1)?G(6)*4+G(2)+47:150:120:90:60:30,L=38.1818182,Y=L*.015,C=.0942857143,G=n=>(N[h]<n&&(c="n~D?Xs]D?XkhT?ws\`u?XkAr[Bm[eBLsXULB{>E>>Y~@asPE>}eIW>c?ND>W\`BANHKV_c?ND>WbBDNHIW>c?ND>WaB?N]>W\`BANiKV_c?N?da>H>gA>Joa?gLppyo[>R?_DVp?c?WV_@_H>oAJN_HAp|I>NtW_sA_DV\`>REbTFG>sHbyT>p>REaTgp>R?bwuoTLY\`F?eMTNS>wdiJNC?w[oMYNK>wtaFauNhda>H>gA>JoaAg>sp_[>RHbwuoTLY\`u]@?gH_ZPtDF@\`{Z^HsBFD\`J^Du@F@\`RXpDFKsAoCeMTNW>V}SgCNW>w?mMTNW>wtaJNW@g?eFNW?glc@NC>VdiH>Jp|jEEjAcC]>D]@?gKs>u_qLNYgQkoRD_vNAVbtgx?dak?WaBDTHpKiJNMjAV}Tt?FEgKazFB_MNE>TVO>s@bTFG>R?_DVp?c@auNG>R?_DV\`>REbyT>\`>sHbTFG>RDauNG>R?_DVO>|>{YV_c?y>w@rDFJkSazFB_L_L>kp@>|V^>TI>N_H>p{jCa@NEgAazFB_qpT>kp@AICV@rBFJkSbjZ]u_XpUyJfl^wRrsDTHoCeFNW@gxmMYNW@gxmMYB~\`[VI|EDZfpKiCNEgMaYRH_[]BpKiCNMgCbYBF_MN^BugS>]_}GlNi?twQBugS>|>yJx^dlNcL_MNAX\`F[>twjX\`F[>}_}pEjO{X>|>KiB\`s?y>YRGAgDnCYRGAgD_V}kHu?logkHu?logkHu?logkHu?logkHu?logkHu?logkHu?logkHu?lolk[a{ZTCY>uwTuKt>qUpuIJcdtetGG[WJqPUpuYRkcCeRPyrXcsndkDhGIyY?cPP}LuGG[WlPPUTQJcd{[etIG?WdBmkuhKJ>^I{EV?vw>pQyKosHYFrcc_kuOOHzSaUhq}mpXcR_kuO]dIYOaRPupWdys_kTAFbcCeOP@rIthYXdyknjkT\`]bIyzKiUhRUwuATUfPupWdxRnqkT\`]bI{jKcOPvux]ld|KmUiq@vFhUYdxZnllq|DUuux]bIzzVnYcCmOPuvIth^QzZnSqAuxCd^Ydx]Ux}p|hxOcEW^XBTN[at}OW?zCgUgyIz~V}rIrlC|tetIriIzjGeUfRUvuYRnKgnnkTW][O^[WlP|Ha~DoXdxtC}SasIsXIzzCeUfRUvT^undy]a}zuUkq{~O^[zMuh]hgnn|bzJnLsUv]r|iUhXI{YZrdwMg\`sUy[l{nIsUx|j{nJsUx]r|bx]Ognt~nyJ^Iq~sZUx]rWejn>gn}kT\`izpW^dx^El@|QcDrWBUFKcsFmNYKcOZ_uQNax?kuOCqAWK@IcCeqFmNYGgOZ_uYFax?ke\`CqAWkaIcDqXBUFKeqFmNYGgOP@vIrG^dHYRnblayvHYRnbla|mtGIZagcgagcgagcghgcghgcghgcghg_ghgvR".charCodeAt(I[h]++)-62,B[h]=B[h]<<6|c-(c>30),N[h]+=6),N[h]-=n,B[h]>>N[h]&2**n-1),W=d=>O[p]=[55*Z.PI/14*2**((p-69)/12),s=J[h],s+d,V],H=_=>{if(x>=J[h]){for(q=G(4),p=R[h]+=q<15?"2,$)&(*-#0+3%4.".charCodeAt(q)-43:G(6)-31,d=U(),W(d);G(1);p+=G(1)?G(4)+2:12,W(G(1)?U():d));J[h]+=G(1)?G(1)?G(6)*8+G(3)+6:60:30}}),h=2,x>=j&&(V=G(4),j+=G(6)*32+G(5)+60),h=0,H(),H(++h),128+110*Z.tanh(O.reduce((v,[f,s,e,z])=>(a=x-s,d=e-x,v+(d>-L&&z/15*(a>Y||a/Y)*(d>0||1+d/L)*((Q(i=f*a)+.14*Q(2*i))/(1+a*C*7/90)+.3*Q(7*i)/(1+a*C)))),0)*.22)|0`,
    sampleRate: 8000,
  },
];
