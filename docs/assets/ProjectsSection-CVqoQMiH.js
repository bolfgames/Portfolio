import{r as n,s as x,j as e,A,m as w,g as C,u as M,d as L,p as z}from"./index-D58jkyzc.js";import{D as K,N as R,T as G,I as $,G as O}from"./NFTCardStyle-CpLhcBEP.js";import{X as U}from"./Layout-_LYwEB_R.js";import{C as F,a as B}from"./chevron-right-DnJNT05m.js";function D({project:t,onCardClick:i}){const[m,r]=n.useState(!1),[o,j]=n.useState(()=>x.getProjectCardStyle());n.useEffect(()=>x.subscribe(()=>{j(x.getProjectCardStyle())}),[]);const l={project:t,isVideoPlaying:m,onVideoPlay:()=>{r(!0)},onVideoEnd:()=>{r(!1)},onCardClick:()=>{i&&i(t)}};switch(o){case"glow":return e.jsx(O,{...l});case"interaction":return e.jsx($,{...l});case"3d":return e.jsx(G,{...l});case"nft":return e.jsx(R,{...l});case"default":default:return e.jsx(K,{...l})}}const T=t=>({Durih:["assets/resumes/Emir/project_images/durih_1.jpg","assets/resumes/Emir/project_images/durih_2.png","assets/resumes/Emir/project_images/durih_3.png","assets/resumes/Emir/project_images/durih_4.png","assets/resumes/Emir/project_images/durih_5.png"],Lunscale:["assets/resumes/AhmetEmir/project_images/Lunscale/lundscale_1.jpg","assets/resumes/AhmetEmir/project_images/Lunscale/lundscale_2.jpg","assets/resumes/AhmetEmir/project_images/Lunscale/lundscale_3.jpg","assets/resumes/AhmetEmir/project_images/Lunscale/lundscale_4.jpg","assets/resumes/AhmetEmir/project_images/Lunscale/1001.jpg","assets/resumes/AhmetEmir/project_images/Lunscale/1002.jpg","assets/resumes/AhmetEmir/project_images/Lunscale/1003.jpg","assets/resumes/AhmetEmir/project_images/Lunscale/1004.jpg","assets/resumes/AhmetEmir/project_images/Lunscale/1005.jpg"],Gloveffect:["assets/resumes/Emir/project_images/Gloveffect_1.jpg","assets/resumes/Emir/project_images/Gloveffect_2.jpg","assets/resumes/Emir/project_images/Gloveffect_3.jpg","assets/resumes/Emir/project_images/Gloveffect_4.jpg","assets/resumes/Emir/project_images/Gloveffect_5.jpg","assets/resumes/Emir/project_images/Gloveffect_6.jpg"],"the Birdie":["assets/resumes/AhmetEmir/project_images/TheBirdie/birdie_1.png","assets/resumes/AhmetEmir/project_images/TheBirdie/birdie_2.png","assets/resumes/AhmetEmir/project_images/TheBirdie/birdie_3.png","assets/resumes/AhmetEmir/project_images/TheBirdie/birdie_4.png","assets/resumes/AhmetEmir/project_images/TheBirdie/birdie_5.png"],"BOLF Medya":["assets/icons/fulllogobznpng_Çalışma Yüzeyi 1.png"]})[t]||[],q=t=>({Gloveffect:"https://youtu.be/j-8xLWhAXwU","the Birdie":"https://drive.google.com/file/d/1A8jXOrAwFPL6pSMrhwAQCO7jP50T83Ee/view?usp=sharing"})[t]||null,V=t=>t.includes("drive.google.com"),X=t=>{if(!V(t))return null;const i=t.match(/\/d\/([a-zA-Z0-9_-]+)/);return i?`https://drive.google.com/file/d/${i[1]}/preview`:null},W=(t,i=!1)=>{const m=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,r=t.match(m),o=r&&r[2].length===11?r[2]:null;return o?i?`https://www.youtube.com/embed/${o}?autoplay=1&rel=0`:`https://www.youtube.com/embed/${o}?rel=0`:null},Y=t=>{const i=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,m=t.match(i),r=m&&m[2].length===11?m[2]:null;return r?`https://img.youtube.com/vi/${r}/maxresdefault.jpg`:null};function H({project:t,isOpen:i,onClose:m}){var S;const[r,o]=n.useState(0),[j,h]=n.useState(!1),[y,f]=n.useState(null),l=n.useRef(null),b=n.useRef(null),u=(()=>{if(!t)return[];const a=T(t.name),p=a.length>0?a:[t.image],P=q(t.name)||t.video||null;return!!P&&P?[{type:"video",url:P},...p.map(I=>({type:"image",src:I}))]:p.map(I=>({type:"image",src:I}))})();if(n.useEffect(()=>{t&&(o(0),h(!1),f(null))},[t]),n.useEffect(()=>{const a=p=>{p.key==="Escape"&&m()};return i&&(document.addEventListener("keydown",a),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",a),document.body.style.overflow="unset"}},[i,m]),n.useEffect(()=>{if(u.length===0)return;const a=u[r];a&&a.type==="video"?y!==r&&h(!1):(f(null),h(!1))},[r,u,y]),!t)return null;const k=T(t.name),_=k.length>0?k:[t.image],g=u[r];let s=null,c=null;g&&g.type==="video"&&g.url&&(V(g.url)?(s=X(g.url),c=_.length>0?_[0]:null):(s=W(g.url,j),c=Y(g.url)));const d=()=>{if(u.length===0)return;const a=r===0?u.length-1:r-1;o(a),f(null),h(!1)},v=()=>{if(u.length===0)return;const a=(r+1)%u.length;o(a),f(null),h(!1)},E=a=>{if(u.length===0)return;u[a].type==="video"?(o(a),f(a),h(!0)):(o(a),f(null),h(!1))},N=a=>{if(!l.current)return;const p=200;l.current.scrollBy({left:a==="left"?-p:p,behavior:"smooth"})};return e.jsx(A,{children:i&&e.jsxs(e.Fragment,{children:[e.jsx(w.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.3},className:"project-modal-backdrop",onClick:m}),e.jsx(w.div,{ref:b,initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},transition:{duration:.3},className:"project-modal-container",onClick:a=>a.stopPropagation(),children:e.jsxs("div",{className:"project-modal-content",children:[e.jsxs("div",{className:"project-modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"project-modal-title",children:t.name}),e.jsx("p",{className:"project-modal-description",children:t.description})]}),e.jsx("button",{onClick:m,className:"project-modal-close","aria-label":"Close",children:e.jsx(U,{size:20})})]}),e.jsxs("div",{className:"project-modal-main-display",children:[e.jsx(A,{mode:"wait",children:e.jsx(w.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.3},className:"project-modal-main-content",children:g.type==="video"&&s?e.jsx("div",{className:"project-modal-video-container",children:!j&&c?e.jsxs("div",{className:"project-modal-video-thumbnail",onClick:()=>{f(r),h(!0)},children:[e.jsx("img",{src:C(c),alt:`${t.name} video thumbnail`,className:"project-modal-video-thumbnail-img"}),e.jsx("div",{className:"project-modal-video-play-button",children:e.jsx("svg",{width:"40",height:"40",fill:"#00BFFF",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M8 5v14l11-7z"})})})]}):e.jsx("iframe",{src:s,title:t.name,allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,className:"project-modal-video-iframe"},`video-${r}`)}):e.jsx("img",{src:C(g.type==="image"?g.src:""),alt:`${t.name} - ${r+1}`,className:"project-modal-main-image",loading:"eager"})},r)}),u.length>1&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"project-modal-nav-btn project-modal-nav-prev",onClick:d,"aria-label":"Previous",children:e.jsx(F,{size:20,color:"#00BFFF"})}),e.jsx("button",{className:"project-modal-nav-btn project-modal-nav-next",onClick:v,"aria-label":"Next",children:e.jsx(B,{size:20,color:"#00BFFF"})})]})]}),u.length>1&&e.jsxs("div",{className:"project-modal-thumbnail-container",children:[e.jsx("button",{className:"project-modal-scroll-btn project-modal-scroll-left",onClick:()=>N("left"),"aria-label":"Scroll left",children:e.jsx(F,{size:16,color:"#00BFFF"})}),e.jsx("div",{className:"project-modal-thumbnail-strip",ref:l,children:u.map((a,p)=>e.jsx("button",{className:`project-modal-thumbnail ${r===p?"active":""}`,onClick:()=>E(p),"aria-label":`View ${a.type==="video"?"video":`image ${p+1}`}`,children:a.type==="video"?e.jsxs("div",{className:"project-modal-thumbnail-video",children:[c?e.jsx("img",{src:C(c),alt:"Video thumbnail",className:"project-modal-thumbnail-image",style:{opacity:.7}}):null,e.jsx("svg",{width:"20",height:"20",fill:"currentColor",viewBox:"0 0 24 24",style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",zIndex:1},children:e.jsx("path",{d:"M8 5v14l11-7z"})})]}):e.jsx("img",{src:C(a.type==="image"?a.src:""),alt:`${t.name} thumbnail ${p+1}`,className:"project-modal-thumbnail-image",loading:"lazy"})},p))}),e.jsx("button",{className:"project-modal-scroll-btn project-modal-scroll-right",onClick:()=>N("right"),"aria-label":"Scroll right",children:e.jsx(B,{size:16,color:"#00BFFF"})})]}),e.jsxs("div",{className:"project-modal-info",children:[e.jsxs("div",{className:"project-modal-tags",children:[t.platforms.map(a=>e.jsx("span",{className:"project-modal-tag project-modal-tag-platform",children:a},a)),(S=t.tags)==null?void 0:S.map(a=>e.jsx("span",{className:"project-modal-tag project-modal-tag-feature",children:a},a))]}),t.link&&t.link!=="#"&&e.jsx("a",{href:t.link,target:"_blank",rel:"noopener noreferrer",className:"project-modal-link",children:t.type==="media"?"İçeriği Görüntüle":"Oyunu İncele"})]})]})})]})})}function Q(){const[t,i]=n.useState({}),[m,r]=n.useState(!1),o=n.useRef(null),j=n.useRef(null),h=n.useRef(null),y=()=>/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768&&"ontouchstart"in window;n.useEffect(()=>{const s=new Audio("https://cdn.freesound.org/previews/378/378085_6260145-lq.mp3");s.volume=.2,s.preload="auto",s.load(),j.current=s,s.addEventListener("canplaythrough",()=>{},{once:!0})},[]);const f=n.useCallback(()=>{if(!j.current)return;const s=j.current;s.pause(),s.currentTime=0;const c=s.play();c!==void 0&&c.catch(()=>{})},[]),l=n.useCallback(s=>{i(c=>({...c,[s]:!0})),f(),setTimeout(()=>i(c=>({...c,[s]:!1})),150)},[f]),b=n.useCallback(()=>{if(m)return;r(!0);const s=["two","three","four","five"];l("one"),s.forEach((c,d)=>{setTimeout(()=>{l(c)},(d+1)*140)}),setTimeout(()=>r(!1),s.length*140+200)},[m,l]);n.useEffect(()=>{const s=d=>{const v=d.key.toLowerCase();if(d.key==="Shift"||d.key==="ShiftLeft"||d.key==="ShiftRight"){!d.repeat&&!d.ctrlKey&&!d.metaKey&&!d.altKey&&setTimeout(()=>{b()},50);return}const E={b:"two",o:"three",l:"four",f:"five"};if(E[v]&&!d.shiftKey&&!d.ctrlKey&&!d.metaKey&&!d.altKey){d.preventDefault();const N=E[v];l(N),o.current&&(o.current.value+=d.key.toUpperCase())}},c=d=>{d.key==="Shift"&&i(v=>({...v,one:!1}))};return window.addEventListener("keydown",s),window.addEventListener("keyup",c),()=>{window.removeEventListener("keydown",s),window.removeEventListener("keyup",c)}},[b,l]);const u=()=>{y()||o.current&&o.current.focus()},k={one:"⇧",two:"B",three:"O",four:"L",five:"F"},_={one:{left:"13.5%",bottom:"57.2%"},two:{left:"25.8%",bottom:"48.5%"},three:{left:"38%",bottom:"39.2%"},four:{left:"50.4%",bottom:"30.2%"},five:{left:"62.7%",bottom:"21%"}},g=s=>{if(s==="one"){b(),y()&&o.current&&o.current.blur();return}if(m)return;l(s);const c=k[s];o.current&&(o.current.value+=c,y()&&o.current.blur())};return e.jsxs("div",{className:"relative w-full flex justify-center items-center pt-4 pb-4 mb-16 md:mb-20",children:[e.jsx("input",{ref:o,type:"text",className:"sr-only",tabIndex:y()?-1:0,readOnly:y(),autoComplete:"off"}),e.jsxs("div",{ref:h,className:"keypad relative",style:{aspectRatio:"400 / 310",width:"clamp(280px, 45vw, 500px)",cursor:"pointer",WebkitTapHighlightColor:"transparent"},onClick:u,tabIndex:-1,children:[e.jsx("style",{children:`
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
        `}),e.jsx("div",{className:"keypad__base absolute bottom-0 w-full",children:e.jsx("img",{src:"https://assets.codepen.io/605876/ai-base.png?format=auto&quality=86",alt:"",className:"w-full"})}),["one","two","three","four","five"].map(s=>e.jsx("button",{id:s,className:"key keypad__single absolute",style:{width:"21%",height:"24%",..._[s]},onClick:()=>g(s),"data-pressed":t[s]?"true":"false",children:e.jsx("span",{className:"key__mask inline-block w-full h-full",children:e.jsxs("span",{className:"key__content inline-block w-full h-full",children:[e.jsx("span",{className:"key__text absolute grid place-items-center",children:e.jsx("span",{children:k[s]})}),e.jsx("img",{src:"https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86",alt:""})]})})},s))]})]})}function Z(){const[t,i]=n.useState(()=>x.isFeatureEnabled("features.keyboardAnimation.enabled"));return n.useEffect(()=>x.subscribe(()=>{i(x.isFeatureEnabled("features.keyboardAnimation.enabled"))}),[]),t?e.jsx(Q,{}):null}function re(){const{t,language:i}=M(),[m,r]=n.useState(null),[o,j]=n.useState(!1);n.useEffect(()=>{L.setLanguage(i),z.setLanguage(i)},[i]);const h=n.useMemo(()=>L.getAllProjects(i),[i]),y=l=>{r(l),j(!0)},f=()=>{j(!1),setTimeout(()=>r(null),300)};return e.jsxs("section",{id:"projects",className:"pt-8 md:pt-12 pb-20 md:pb-32 bg-bolf-black",children:[e.jsxs("div",{className:"container mx-auto px-4",children:[e.jsx(Z,{}),e.jsxs(w.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.8},className:"text-center mb-16",children:[e.jsx("h2",{className:"text-4xl md:text-6xl font-bold mb-4",children:e.jsx("span",{className:"text-bolf-white",children:t("projects.title")})}),e.jsx("p",{className:"text-bolf-gray text-lg md:text-xl",children:t("projects.subtitle")})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto",children:h.map((l,b)=>e.jsx(w.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6,delay:b*.1},children:e.jsx(D,{project:l,onCardClick:y})},l.id))})]}),e.jsx(H,{project:m,isOpen:o,onClose:f})]})}export{re as default};
