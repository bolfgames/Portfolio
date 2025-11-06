import{r as s,s as p,j as t,u as P,d as w,p as E,m as x}from"./index-B9VB23Ld.js";import{D as S,N,T as K,I as L,G as I}from"./NFTCardStyle-DXzlkvwa.js";import"./Home-DvHsi8Hp.js";import"./Layout-CdInlz2d.js";function V({project:i}){const[o,l]=s.useState(!1),[d,r]=s.useState(()=>p.getProjectCardStyle());s.useEffect(()=>p.subscribe(()=>{r(p.getProjectCardStyle())}),[]);const c={project:i,isVideoPlaying:o,onVideoPlay:()=>{l(!0)},onVideoEnd:()=>{l(!1)},onCardClick:()=>{i.link&&window.open(i.link,"_blank")}};switch(d){case"glow":return t.jsx(I,{...c});case"interaction":return t.jsx(L,{...c});case"3d":return t.jsx(K,{...c});case"nft":return t.jsx(N,{...c});case"default":default:return t.jsx(S,{...c})}}function R(){const[i,o]=s.useState({}),[l,d]=s.useState(!1),r=s.useRef(null),y=s.useRef(null),b=s.useRef(null),f=()=>/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768&&"ontouchstart"in window;s.useEffect(()=>{const e=new Audio("https://cdn.freesound.org/previews/378/378085_6260145-lq.mp3");e.volume=.2,e.preload="auto",e.load(),y.current=e,e.addEventListener("canplaythrough",()=>{},{once:!0})},[]);const c=s.useCallback(()=>{if(!y.current)return;const e=y.current;e.pause(),e.currentTime=0;const a=e.play();a!==void 0&&a.catch(()=>{})},[]),u=s.useCallback(e=>{o(a=>({...a,[e]:!0})),c(),setTimeout(()=>o(a=>({...a,[e]:!1})),150)},[c]),m=s.useCallback(()=>{if(l)return;d(!0);const e=["two","three","four","five"];u("one"),e.forEach((a,n)=>{setTimeout(()=>{u(a)},(n+1)*140)}),setTimeout(()=>d(!1),e.length*140+200)},[l,u]);s.useEffect(()=>{const e=n=>{const h=n.key.toLowerCase();if(n.key==="Shift"||n.key==="ShiftLeft"||n.key==="ShiftRight"){!n.repeat&&!n.ctrlKey&&!n.metaKey&&!n.altKey&&setTimeout(()=>{m()},50);return}const g={b:"two",o:"three",l:"four",f:"five"};if(g[h]&&!n.shiftKey&&!n.ctrlKey&&!n.metaKey&&!n.altKey){n.preventDefault();const C=g[h];u(C),r.current&&(r.current.value+=n.key.toUpperCase())}},a=n=>{n.key==="Shift"&&o(h=>({...h,one:!1}))};return window.addEventListener("keydown",e),window.addEventListener("keyup",a),()=>{window.removeEventListener("keydown",e),window.removeEventListener("keyup",a)}},[m,u]);const v=()=>{f()||r.current&&r.current.focus()},k={one:"⇧",two:"B",three:"O",four:"L",five:"F"},j={one:{left:"13.5%",bottom:"57.2%"},two:{left:"25.8%",bottom:"48.5%"},three:{left:"38%",bottom:"39.2%"},four:{left:"50.4%",bottom:"30.2%"},five:{left:"62.7%",bottom:"21%"}},_=e=>{if(e==="one"){m(),f()&&r.current&&r.current.blur();return}if(l)return;u(e);const a=k[e];r.current&&(r.current.value+=a,f()&&r.current.blur())};return t.jsxs("div",{className:"relative w-full flex justify-center items-center pt-4 pb-4 mb-16 md:mb-20",children:[t.jsx("input",{ref:r,type:"text",className:"sr-only",tabIndex:f()?-1:0,readOnly:f(),autoComplete:"off"}),t.jsxs("div",{ref:b,className:"keypad relative",style:{aspectRatio:"400 / 310",width:"clamp(280px, 45vw, 500px)",cursor:"pointer",WebkitTapHighlightColor:"transparent"},onClick:v,tabIndex:-1,children:[t.jsx("style",{children:`
          :root {
            --travel: 20;
          }
          
          .keypad {
            position: relative;
            display: flex;
            place-items: center;
            transition-property: translate, transform;
            transition-duration: 0.26s;
            transition-timing-function: ease-out;
            transform-style: preserve-3d;
          }
          
          .key {
            transform-style: preserve-3d;
            border: 0;
            background: transparent;
            padding: 0;
            cursor: pointer;
            outline: none;
          }
          
          .key[data-pressed='true'],
          .key:active {
            --travel: 20;
          }
          
          .key[data-pressed='true'] .key__content,
          .key:active .key__content {
            translate: 0 calc(var(--travel) * 1%);
          }
          
          #one {
            left: 13.5%;
            bottom: 57.2%;
          }
          
          #two {
            left: 25.8%;
            bottom: 48.5%;
          }
          
          #three {
            left: 38%;
            bottom: 39.2%;
          }
          
          #four {
            left: 50.4%;
            bottom: 30.2%;
          }
          
          #five {
            left: 62.7%;
            bottom: 21%;
          }
          
          .key__content {
            width: 100%;
            display: inline-block;
            height: 100%;
            transition: translate 0.12s ease-out;
            container-type: inline-size;
          }
          
          .key__text {
            width: 52%;
            height: 62%;
            position: absolute;
            font-size: 18cqi;
            z-index: 21;
            top: 5%;
            left: 0;
            mix-blend-mode: normal;
            color: hsl(0 0% 4%);
            translate: 45% -16%;
            transform: rotateX(36deg) rotateY(45deg) rotateX(-90deg) rotate(0deg);
            display: grid;
            place-items: center;
            font-weight: bold;
          }
          
          .keypad__single {
            position: absolute;
            width: 21%;
            height: 24%;
          }
          
          .key__mask {
            width: 100%;
            height: 100%;
            display: inline-block;
          }
          
          .key__content img {
            filter: hue-rotate(calc(var(--hue, 0) * 1deg))
              saturate(var(--saturate, 1)) 
              brightness(var(--brightness, 1));
            pointer-events: none;
            top: 0;
            opacity: 1;
            width: 96%;
            position: absolute;
            left: 50%;
            translate: -50% 1%;
          }
          
          .keypad__base {
            position: absolute;
            bottom: 0;
            width: 100%;
          }
          
          .keypad__base img {
            width: 100%;
          }
          
          /* Shift tuşu (one) - orijinal renk tonları */
          #one .key__text {
            color: #fff;
            font-size: 22cqi;
          }
          
          #one .key__content img {
            --saturate: 0;
            --brightness: 0.6;
          }
          
          /* Diğer tuşlar (two, three, four, five) - orijinal renk tonları */
          #two .key__content img,
          #three .key__content img,
          #four .key__content img,
          #five .key__content img {
            --brightness: 2;
            --saturate: 0;
          }
          
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
          }
        `}),t.jsx("div",{className:"keypad__base absolute bottom-0 w-full",children:t.jsx("img",{src:"https://assets.codepen.io/605876/ai-base.png?format=auto&quality=86",alt:"",className:"w-full"})}),["one","two","three","four","five"].map(e=>t.jsx("button",{id:e,className:"key keypad__single absolute",style:{width:"21%",height:"24%",...j[e]},onClick:()=>_(e),"data-pressed":i[e]?"true":"false",children:t.jsx("span",{className:"key__mask inline-block w-full h-full",children:t.jsxs("span",{className:"key__content inline-block w-full h-full",children:[t.jsx("span",{className:"key__text absolute grid place-items-center",children:t.jsx("span",{children:k[e]})}),t.jsx("img",{src:"https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86",alt:""})]})})},e))]})]})}function T(){const[i,o]=s.useState(()=>p.isFeatureEnabled("features.keyboardAnimation.enabled"));return s.useEffect(()=>p.subscribe(()=>{o(p.isFeatureEnabled("features.keyboardAnimation.enabled"))}),[]),i?t.jsx(R,{}):null}function q(){const{t:i,language:o}=P();s.useEffect(()=>{w.setLanguage(o),E.setLanguage(o)},[o]);const l=s.useMemo(()=>w.getAllProjects(o),[o]);return t.jsx("section",{id:"projects",className:"pt-8 md:pt-12 pb-20 md:pb-32 bg-bolf-black",children:t.jsxs("div",{className:"container mx-auto px-4",children:[t.jsx(T,{}),t.jsxs(x.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.8},className:"text-center mb-16",children:[t.jsx("h2",{className:"text-4xl md:text-6xl font-bold mb-4",children:t.jsx("span",{className:"text-bolf-white",children:i("projects.title")})}),t.jsx("p",{className:"text-bolf-gray text-lg md:text-xl",children:i("projects.subtitle")})]}),t.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",children:l.map((d,r)=>t.jsx(x.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6,delay:r*.1},children:t.jsx(V,{project:d})},d.id))})]})})}export{q as default};
