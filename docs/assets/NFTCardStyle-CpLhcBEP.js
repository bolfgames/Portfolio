import{j as e,m as z,r as b,u as N,p as y}from"./index-D58jkyzc.js";function L({project:t,isVideoPlaying:d,onVideoPlay:a,onVideoEnd:x,onCardClick:h,className:u=""}){const[s,i]=b.useState(d||!1),{t:c,language:r}=N();b.useEffect(()=>{y.setLanguage(r)},[r]);const f=()=>{i(!0),a==null||a()},o=()=>{i(!1),x==null||x()};return e.jsxs(z.div,{whileHover:{y:-5},onClick:h,className:`bg-bolf-black border border-bolf-gray/20 rounded-lg overflow-hidden hover:border-bolf-neon-blue/30 transition-all duration-300 group cursor-pointer ${u}`,children:[e.jsxs("div",{className:"relative h-48 bg-gradient-to-br from-bolf-neon-blue/10 to-bolf-orange/10 overflow-hidden",children:[t.video&&!s?e.jsxs("div",{className:"relative w-full h-full",children:[e.jsx("img",{src:t.image,alt:t.name,className:"w-full h-full object-cover"}),e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-bolf-black/40 group-hover:bg-bolf-black/20 transition-colors",children:e.jsx("button",{onClick:f,className:"w-16 h-16 rounded-full bg-bolf-neon-blue/80 hover:bg-bolf-neon-blue flex items-center justify-center transition-transform hover:scale-110","aria-label":"Play video",children:e.jsx("svg",{className:"w-8 h-8 text-bolf-white ml-1",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M8 5v14l11-7z"})})})})]}):t.video&&s?e.jsx("video",{src:t.video,className:"w-full h-full object-cover",controls:!0,autoPlay:!0,onEnded:o}):e.jsx("img",{src:t.image,alt:t.name,className:"w-full h-full object-cover group-hover:scale-110 transition-transform duration-300",loading:"lazy",decoding:"async",onError:l=>{l.target.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23000" width="400" height="300"/%3E%3Ctext fill="%23fff" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="24"%3EProject Image%3C/text%3E%3C/svg%3E'}}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-bolf-black/60 to-transparent"}),t.type==="media"&&e.jsx("div",{className:"absolute top-2 right-2 px-2 py-1 bg-bolf-orange/80 text-bolf-white text-xs rounded",children:c("projects.mediaBadge")})]}),e.jsxs("div",{className:"p-3",children:[e.jsx("h3",{className:"text-lg font-bold text-bolf-white mb-1 group-hover:text-bolf-neon-blue transition-colors",children:t.name}),e.jsx("p",{className:"text-bolf-gray mb-3 text-xs line-clamp-2",children:t.description}),e.jsx("div",{className:"flex flex-wrap gap-2",children:t.platforms.map(l=>e.jsxs("span",{className:"inline-flex items-center space-x-1 px-3 py-1 bg-bolf-gray/10 rounded-full text-sm text-bolf-gray",children:[e.jsx("span",{children:y.getPlatformIcon(l)}),e.jsx("span",{children:y.getPlatformDisplayName(l)})]},l))})]})]})}function R({member:t,onClick:d,roleColor:a,className:x=""}){return e.jsxs(z.div,{whileHover:{y:-5,scale:1.02},onClick:d,className:`relative bg-bolf-black border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 group ${x}`,style:{borderColor:`${a}40`,boxShadow:`0 0 20px ${a}20`},children:[e.jsx("div",{className:"absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",style:{boxShadow:`inset 0 0 30px ${a}30`}}),e.jsxs("div",{className:"relative h-32 bg-gradient-to-br from-bolf-neon-blue/10 to-bolf-orange/10 overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 border-b-4 transition-all duration-300",style:{borderColor:a}}),e.jsx("img",{src:t.avatar,alt:t.name,className:"w-full h-full object-cover group-hover:scale-110 transition-transform duration-300",loading:"lazy",decoding:"async",onError:h=>{h.target.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23000" width="300" height="300"/%3E%3Ccircle cx="150" cy="120" r="40" fill="%2300BFFF"/%3E%3Cpath fill="%23000" d="M150 180 L110 240 L190 240 Z"/%3E%3C/svg%3E'}}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-bolf-black/80 via-transparent to-transparent"})]}),e.jsxs("div",{className:"p-3 relative z-10",children:[e.jsx("h3",{className:"text-lg font-bold mb-1 group-hover:scale-105 transition-transform duration-300",style:{color:a},children:t.name}),e.jsx("p",{className:"mb-1.5 font-semibold text-xs",style:{color:a},children:t.role}),t.bio&&e.jsx("p",{className:"text-bolf-gray text-xs line-clamp-2",children:t.bio})]})]})}function M({project:t,isVideoPlaying:d=!1,onVideoPlay:a,onVideoEnd:x,onCardClick:h,className:u=""}){const s=b.useRef(null),{t:i,language:c}=N();return b.useEffect(()=>{y.setLanguage(c)},[c]),b.useEffect(()=>{const r=s.current;if(!r)return;const f=n=>{const m=r.getBoundingClientRect(),g=n.clientX-m.left,p=n.clientY-m.top;r.style.setProperty("--x",`${g}`),r.style.setProperty("--y",`${p}`),r.style.setProperty("--base","210"),r.style.setProperty("--saturation","100"),r.style.setProperty("--lightness","70"),r.style.setProperty("--bg-spot-opacity","0.1"),r.style.setProperty("--border-spot-opacity","1"),r.style.setProperty("--border-light-opacity","1")},o=()=>{if(!r)return;const n=r.getBoundingClientRect();r.style.setProperty("--x",`${n.width/2}`),r.style.setProperty("--y",`${n.height/2}`)};r.addEventListener("mousemove",f),r.addEventListener("mouseleave",o);const l=r.getBoundingClientRect();return r.style.setProperty("--x",`${l.width/2}`),r.style.setProperty("--y",`${l.height/2}`),()=>{r.removeEventListener("mousemove",f),r.removeEventListener("mouseleave",o)}},[]),e.jsxs("div",{ref:s,className:`card-glow-project bg-bolf-black/80 backdrop-blur-md border-2 rounded-xl overflow-hidden transition-all duration-300 ${u}`,"data-glow":!0,style:{borderColor:"rgba(0, 191, 255, 0.3)","--backdrop":"rgba(0, 191, 255, 0.15)","--backup-border":"rgba(0, 191, 255, 0.2)"},onClick:h,children:[e.jsx("style",{children:`
        .card-glow-project[data-glow] {
          position: relative;
          --spotlight-size: 150px;
          --x: 50%;
          --y: 50%;
          --base: 210;
          --saturation: 100;
          --lightness: 70;
          --bg-spot-opacity: 0.1;
          --border-spot-opacity: 1;
          --border-light-opacity: 1;
          background-image: radial-gradient(
            var(--spotlight-size) var(--spotlight-size) at
            calc(var(--x) * 1px) calc(var(--y) * 1px),
            hsl(var(--base) var(--saturation)% var(--lightness)% / var(--bg-spot-opacity)),
            transparent
          );
          background-color: var(--backdrop, transparent);
          background-size: 100% 100%;
          background-position: 50% 50%;
        }

        .card-glow-project[data-glow]::before,
        .card-glow-project[data-glow]::after {
          pointer-events: none;
          content: "";
          position: absolute;
          inset: -2px;
          border: 2px solid transparent;
          border-radius: 12px;
          background-size: calc(100% + 4px) calc(100% + 4px);
          background-repeat: no-repeat;
          background-position: 50% 50%;
          mask:
            linear-gradient(transparent, transparent),
            linear-gradient(white, white);
          mask-clip: padding-box, border-box;
          mask-composite: intersect;
          z-index: 1;
        }

        .card-glow-project[data-glow]::before {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
            calc(var(--x) * 1px) calc(var(--y) * 1px),
            hsl(var(--base) var(--saturation)% calc(var(--lightness) - 20)% / var(--border-spot-opacity)),
            transparent 100%
          );
          filter: brightness(2);
        }

        .card-glow-project[data-glow]::after {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
            calc(var(--x) * 1px) calc(var(--y) * 1px),
            hsl(0 100% 100% / var(--border-light-opacity)),
            transparent 100%
          );
        }
      `}),e.jsxs("div",{className:"relative h-48 bg-gradient-to-br from-bolf-neon-blue/10 to-bolf-orange/10 overflow-hidden",children:[t.video&&!d?e.jsxs("div",{className:"relative w-full h-full",children:[e.jsx("img",{src:t.image,alt:t.name,className:"w-full h-full object-cover",loading:"lazy",decoding:"async"}),e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-bolf-black/40 hover:bg-bolf-black/20 transition-colors",children:e.jsx("button",{onClick:r=>{r.stopPropagation(),a==null||a()},className:"w-16 h-16 rounded-full bg-bolf-neon-blue/80 hover:bg-bolf-neon-blue flex items-center justify-center transition-transform hover:scale-110","aria-label":"Play video",children:e.jsx("svg",{className:"w-8 h-8 text-bolf-white ml-1",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M8 5v14l11-7z"})})})})]}):t.video&&d?e.jsx("video",{src:t.video,className:"w-full h-full object-cover",controls:!0,autoPlay:!0,onEnded:x}):e.jsx("img",{src:t.image,alt:t.name,className:"w-full h-full object-cover hover:scale-110 transition-transform duration-300",loading:"lazy",decoding:"async",onError:r=>{r.target.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23000" width="400" height="300"/%3E%3Ctext fill="%23fff" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="24"%3EProject Image%3C/text%3E%3C/svg%3E'}}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-bolf-black/60 to-transparent"}),t.type==="media"&&e.jsx("div",{className:"absolute top-2 right-2 px-2 py-1 bg-bolf-orange/80 text-bolf-white text-xs rounded z-10",children:i("projects.mediaBadge")})]}),e.jsxs("div",{className:"p-3 relative z-10",children:[e.jsx("h3",{className:"text-lg font-bold text-bolf-white mb-1 hover:text-bolf-neon-blue transition-colors",children:t.name}),e.jsx("p",{className:"text-bolf-gray mb-3 text-xs line-clamp-2",children:t.description}),e.jsx("div",{className:"flex flex-wrap gap-2",children:t.platforms.map(r=>e.jsxs("span",{className:"inline-flex items-center space-x-1 px-3 py-1 bg-bolf-gray/10 rounded-full text-sm text-bolf-gray",children:[e.jsx("span",{children:y.getPlatformIcon(r)}),e.jsx("span",{children:y.getPlatformDisplayName(r)})]},r))})]})]})}function Z({member:t,onClick:d,roleColor:a,className:x=""}){const h=b.useRef(null),u=s=>{const i=parseInt(s.slice(1,3),16)/255,c=parseInt(s.slice(3,5),16)/255,r=parseInt(s.slice(5,7),16)/255,f=Math.max(i,c,r),o=Math.min(i,c,r);let l=0;return f===i?l=(c-r)/(f-o)*60:f===c?l=(r-i)/(f-o)*60+120:l=(i-c)/(f-o)*60+240,l<0?l+360:l};return b.useEffect(()=>{const s=h.current;if(!s)return;const i=u(a),c=o=>{const l=s.getBoundingClientRect(),n=o.clientX-l.left,m=o.clientY-l.top;s.style.setProperty("--x",`${n}`),s.style.setProperty("--y",`${m}`),s.style.setProperty("--base",`${i}`),s.style.setProperty("--saturation","100"),s.style.setProperty("--lightness","70"),s.style.setProperty("--bg-spot-opacity","0.1"),s.style.setProperty("--border-spot-opacity","1"),s.style.setProperty("--border-light-opacity","1")},r=()=>{if(!s)return;const o=s.getBoundingClientRect();s.style.setProperty("--x",`${o.width/2}`),s.style.setProperty("--y",`${o.height/2}`)};s.addEventListener("mousemove",c),s.addEventListener("mouseleave",r);const f=s.getBoundingClientRect();return s.style.setProperty("--x",`${f.width/2}`),s.style.setProperty("--y",`${f.height/2}`),s.style.setProperty("--base",`${i}`),()=>{s.removeEventListener("mousemove",c),s.removeEventListener("mouseleave",r)}},[a]),e.jsxs("div",{ref:h,className:`card-glow-team bg-bolf-black/80 backdrop-blur-md border-2 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${x}`,"data-glow":!0,onClick:d,style:{borderColor:`${a}40`,"--backdrop":`${a}20`,"--backup-border":`${a}40`},children:[e.jsx("style",{children:`
        .card-glow-team[data-glow] {
          position: relative;
          --spotlight-size: 150px;
          --x: 50%;
          --y: 50%;
          --base: 210;
          --saturation: 100;
          --lightness: 70;
          --bg-spot-opacity: 0.1;
          --border-spot-opacity: 1;
          --border-light-opacity: 1;
          background-image: radial-gradient(
            var(--spotlight-size) var(--spotlight-size) at
            calc(var(--x) * 1px) calc(var(--y) * 1px),
            hsl(var(--base) var(--saturation)% var(--lightness)% / var(--bg-spot-opacity)),
            transparent
          );
          background-color: var(--backdrop, transparent);
          background-size: 100% 100%;
          background-position: 50% 50%;
        }

        .card-glow-team[data-glow]::before,
        .card-glow-team[data-glow]::after {
          pointer-events: none;
          content: "";
          position: absolute;
          inset: -2px;
          border: 2px solid transparent;
          border-radius: 12px;
          background-size: calc(100% + 4px) calc(100% + 4px);
          background-repeat: no-repeat;
          background-position: 50% 50%;
          mask:
            linear-gradient(transparent, transparent),
            linear-gradient(white, white);
          mask-clip: padding-box, border-box;
          mask-composite: intersect;
          z-index: 1;
        }

        .card-glow-team[data-glow]::before {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
            calc(var(--x) * 1px) calc(var(--y) * 1px),
            hsl(var(--base) var(--saturation)% calc(var(--lightness) - 20)% / var(--border-spot-opacity)),
            transparent 100%
          );
          filter: brightness(2);
        }

        .card-glow-team[data-glow]::after {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
            calc(var(--x) * 1px) calc(var(--y) * 1px),
            hsl(0 100% 100% / var(--border-light-opacity)),
            transparent 100%
          );
        }
      `}),e.jsxs("div",{className:"relative h-32 bg-gradient-to-br from-bolf-neon-blue/10 to-bolf-orange/10 overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 border-b-4 transition-all duration-300",style:{borderColor:a}}),e.jsx("img",{src:t.avatar,alt:t.name,className:"w-full h-full object-cover hover:scale-110 transition-transform duration-300",loading:"lazy",decoding:"async",onError:s=>{s.target.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23000" width="300" height="300"/%3E%3Ccircle cx="150" cy="120" r="40" fill="%2300BFFF"/%3E%3Cpath fill="%23000" d="M150 180 L110 240 L190 240 Z"/%3E%3C/svg%3E'}}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-bolf-black/80 via-transparent to-transparent"})]}),e.jsxs("div",{className:"p-3 relative z-10",children:[e.jsx("h3",{className:"text-lg font-bold mb-1 hover:scale-105 transition-transform duration-300",style:{color:a},children:t.name}),e.jsx("p",{className:"mb-1.5 font-semibold text-xs",style:{color:a},children:t.role}),t.bio&&e.jsx("p",{className:"text-bolf-gray text-xs line-clamp-2",children:t.bio})]})]})}function I({project:t,isVideoPlaying:d=!1,onVideoPlay:a,onVideoEnd:x,onCardClick:h,className:u=""}){const s=b.useRef(null),i=b.useRef(null),{t:c,language:r}=N(),f=2;return b.useEffect(()=>{y.setLanguage(r)},[r]),b.useEffect(()=>{const o=s.current,l=i.current;if(!o||!l||"ontouchstart"in window||navigator.maxTouchPoints>0)return;const m=p=>{const v=o.getBoundingClientRect(),w=p.clientX-v.left,j=p.clientY-v.top,k=v.width/2,E=v.height/2,C=f*(w-k)/k,P=-f*(j-E)/E;l.style.transform=`rotateX(${P}deg) rotateY(${C}deg)`,o.style.setProperty("--x",`${w/v.width*100}%`),o.style.setProperty("--y",`${j/v.height*100}%`)},g=()=>{l&&(l.style.transform="rotateX(0) rotateY(0)",l.style.transition="transform 0.5s ease",setTimeout(()=>{l&&(l.style.transition="")},500))};return o.addEventListener("mousemove",m),o.addEventListener("mouseleave",g),()=>{o.removeEventListener("mousemove",m),o.removeEventListener("mouseleave",g)}},[]),e.jsxs("div",{ref:s,className:`card-interaction bg-bolf-black/50 backdrop-blur-md border border-bolf-white/10 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl ${u}`,"data-rotation-factor":f,onClick:h,style:{"--x":"50%","--y":"50%"},children:[e.jsx("style",{children:`
        .card-interaction {
          position: relative;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .card-interaction::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--x, 50%) var(--y, 50%),
            rgba(255, 255, 255, 0.1) 0%,
            transparent 50%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
          pointer-events: none;
        }

        .card-interaction:hover::before {
          opacity: 1;
        }

        .card-interaction-content {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          transform-style: preserve-3d;
        }
      `}),e.jsxs("div",{ref:i,className:"card-interaction-content",children:[e.jsxs("div",{className:"relative h-48 bg-gradient-to-br from-bolf-neon-blue/10 to-bolf-orange/10 overflow-hidden",children:[t.video&&!d?e.jsxs("div",{className:"relative w-full h-full",children:[e.jsx("img",{src:t.image,alt:t.name,className:"w-full h-full object-cover",style:{transform:"translateZ(20px)"},loading:"lazy",decoding:"async"}),e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-bolf-black/40 hover:bg-bolf-black/20 transition-colors",children:e.jsx("button",{onClick:o=>{o.stopPropagation(),a==null||a()},className:"w-16 h-16 rounded-full bg-bolf-neon-blue/80 hover:bg-bolf-neon-blue flex items-center justify-center transition-transform hover:scale-110","aria-label":"Play video",style:{transform:"translateZ(25px)"},children:e.jsx("svg",{className:"w-8 h-8 text-bolf-white ml-1",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M8 5v14l11-7z"})})})})]}):t.video&&d?e.jsx("video",{src:t.video,className:"w-full h-full object-cover",controls:!0,autoPlay:!0,onEnded:x,style:{transform:"translateZ(20px)"}}):e.jsx("img",{src:t.image,alt:t.name,className:"w-full h-full object-cover hover:scale-110 transition-transform duration-300",style:{transform:"translateZ(20px)"},loading:"lazy",decoding:"async",onError:o=>{o.target.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23000" width="400" height="300"/%3E%3Ctext fill="%23fff" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="24"%3EProject Image%3C/text%3E%3C/svg%3E'}}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-bolf-black/60 to-transparent"}),t.type==="media"&&e.jsx("div",{className:"absolute top-2 right-2 px-2 py-1 bg-bolf-orange/80 text-bolf-white text-xs rounded z-10",style:{transform:"translateZ(25px)"},children:c("projects.mediaBadge")})]}),e.jsxs("div",{className:"p-3 relative z-10",style:{transform:"translateZ(15px)"},children:[e.jsx("h3",{className:"text-lg font-bold text-bolf-white mb-1 hover:text-bolf-neon-blue transition-colors",style:{transform:"translateZ(20px)"},children:t.name}),e.jsx("p",{className:"text-bolf-gray mb-3 text-xs line-clamp-2",style:{transform:"translateZ(15px)"},children:t.description}),e.jsx("div",{className:"flex flex-wrap gap-2 mb-4",style:{transform:"translateZ(15px)"},children:t.platforms.map(o=>e.jsxs("span",{className:"inline-flex items-center space-x-1 px-3 py-1 bg-bolf-gray/10 rounded-full text-sm text-bolf-gray",children:[e.jsx("span",{children:y.getPlatformIcon(o)}),e.jsx("span",{children:y.getPlatformDisplayName(o)})]},o))})]})]})]})}function B({member:t,onClick:d,roleColor:a,className:x=""}){const h=b.useRef(null),u=b.useRef(null),s=2;return b.useEffect(()=>{const i=h.current,c=u.current;if(!i||!c||"ontouchstart"in window||navigator.maxTouchPoints>0)return;const f=l=>{const n=i.getBoundingClientRect(),m=l.clientX-n.left,g=l.clientY-n.top,p=n.width/2,v=n.height/2,w=s*(m-p)/p,j=-s*(g-v)/v;c.style.transform=`rotateX(${j}deg) rotateY(${w}deg)`,i.style.setProperty("--x",`${m/n.width*100}%`),i.style.setProperty("--y",`${g/n.height*100}%`)},o=()=>{c&&(c.style.transform="rotateX(0) rotateY(0)",c.style.transition="transform 0.5s ease",setTimeout(()=>{c&&(c.style.transition="")},500))};return i.addEventListener("mousemove",f),i.addEventListener("mouseleave",o),()=>{i.removeEventListener("mousemove",f),i.removeEventListener("mouseleave",o)}},[]),e.jsxs("div",{ref:h,className:`card-interaction bg-bolf-black/50 backdrop-blur-md border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl ${x}`,"data-rotation-factor":s,onClick:d,style:{"--x":"50%","--y":"50%",borderColor:`${a}40`},children:[e.jsx("style",{children:`
        .card-interaction {
          position: relative;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .card-interaction::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--x, 50%) var(--y, 50%),
            ${a}20 0%,
            transparent 50%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
          pointer-events: none;
        }

        .card-interaction:hover::before {
          opacity: 1;
        }

        .card-interaction-content {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          transform-style: preserve-3d;
        }
      `}),e.jsxs("div",{ref:u,className:"card-interaction-content",children:[e.jsxs("div",{className:"relative h-32 bg-gradient-to-br from-bolf-neon-blue/10 to-bolf-orange/10 overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 border-b-4 transition-all duration-300",style:{borderColor:a,transform:"translateZ(15px)"}}),e.jsx("img",{src:t.avatar,alt:t.name,className:"w-full h-full object-cover hover:scale-110 transition-transform duration-300",style:{transform:"translateZ(20px)"},loading:"lazy",decoding:"async",onError:i=>{i.target.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23000" width="300" height="300"/%3E%3Ccircle cx="150" cy="120" r="40" fill="%2300BFFF"/%3E%3Cpath fill="%23000" d="M150 180 L110 240 L190 240 Z"/%3E%3C/svg%3E'}}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-bolf-black/80 via-transparent to-transparent"})]}),e.jsxs("div",{className:"p-3 relative z-10",style:{transform:"translateZ(15px)"},children:[e.jsx("h3",{className:"text-lg font-bold mb-1 hover:scale-105 transition-transform duration-300",style:{color:a,transform:"translateZ(25px)"},children:t.name}),e.jsx("p",{className:"mb-1.5 font-semibold text-xs",style:{transform:"translateZ(20px)",color:a},children:t.role}),t.bio&&e.jsx("p",{className:"text-bolf-gray text-xs line-clamp-2",style:{transform:"translateZ(20px)"},children:t.bio})]})]})]})}const $=async()=>typeof window<"u"&&window.VanillaTilt?window.VanillaTilt:document.querySelector('script[src*="vanilla-tilt"]')?new Promise(d=>{const a=setInterval(()=>{window.VanillaTilt&&(clearInterval(a),d(window.VanillaTilt))},50);setTimeout(()=>{clearInterval(a),d(window.VanillaTilt||null)},2e3)}):new Promise((d,a)=>{const x=document.createElement("script");x.src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.0/vanilla-tilt.min.js",x.async=!0,x.onload=()=>{setTimeout(()=>{window.VanillaTilt?d(window.VanillaTilt):a(new Error("VanillaTilt not found after script load"))},100)},x.onerror=()=>{a(new Error("Failed to load Vanilla Tilt"))},document.head.appendChild(x)});function F({project:t,isVideoPlaying:d=!1,onVideoPlay:a,onVideoEnd:x,onCardClick:h,className:u=""}){const s=b.useRef(null),i=b.useRef(null),{t:c,language:r}=N(),l=((n,m)=>{if(n.startsWith("#")){const g=parseInt(n.slice(1,3),16),p=parseInt(n.slice(3,5),16),v=parseInt(n.slice(5,7),16);return`rgba(${g}, ${p}, ${v}, ${m})`}return`rgba(0, 191, 255, ${m})`})("#00BFFF",.12);return b.useEffect(()=>{y.setLanguage(r)},[r]),b.useEffect(()=>{const n=s.current;if(!n)return;const m=p=>{const v=n.getBoundingClientRect(),w=p.clientX-v.left,j=p.clientY-v.top;n.style.setProperty("--x",`${w}`),n.style.setProperty("--y",`${j}`)},g=()=>{if(!n)return;const p=n.getBoundingClientRect();n.style.setProperty("--x",`${p.width/2}`),n.style.setProperty("--y",`${p.height/2}`)};return n.addEventListener("mousemove",m),n.addEventListener("mouseleave",g),()=>{n.removeEventListener("mousemove",m),n.removeEventListener("mouseleave",g)}},[]),b.useEffect(()=>{const n=s.current;if(!n)return;const m=setTimeout(()=>{$().then(g=>{if(!(!g||!n))if(typeof g.init=="function")try{i.current=g.init(n,{max:10,speed:500,perspective:1800,glare:!0,"max-glare":.1,scale:1.03,reset:!0})}catch(p){console.error("VanillaTilt.init error:",p)}else if(typeof g=="function")try{i.current=new g(n,{max:10,speed:500,perspective:1800,glare:!0,"max-glare":.1,scale:1.03,reset:!0})}catch(p){console.error("VanillaTilt constructor error:",p)}else console.error("VanillaTilt is not a valid function or object")}).catch(g=>{console.error("Failed to load or initialize Vanilla Tilt:",g)})},100);return()=>{if(clearTimeout(m),i.current)try{typeof i.current.destroy=="function"?i.current.destroy():i.current.vanillaTilt&&typeof i.current.vanillaTilt.destroy=="function"&&i.current.vanillaTilt.destroy()}catch(g){console.error("Error destroying VanillaTilt:",g)}}},[]),e.jsxs("div",{ref:s,className:`card-3d bg-bolf-black/90 backdrop-blur-md rounded-3xl overflow-hidden transition-all duration-300 cursor-grab active:cursor-grabbing ${u}`,style:{backgroundImage:`url(${t.image})`,backgroundSize:"cover",backgroundPosition:"center",boxShadow:"0 0 0 2px rgba(0, 191, 255, 0.4), 0 0 25px 8px rgba(0, 191, 255, 0.15)",transformStyle:"preserve-3d",height:"auto","--x":"50%","--y":"50%","--card-shadow-color":l},onClick:h,children:[e.jsx("style",{children:`
        .card-3d {
          position: relative;
          min-height: 200px;
          height: auto;
          will-change: transform, box-shadow, background-size;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1),
                      box-shadow 0.4s ease-out,
                      background-size 1.5s ease-out;
        }

        @media (min-width: 640px) {
          .card-3d {
            min-height: 300px;
          }
        }

        .card-3d::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--x, 50%) var(--y, 50%),
            rgba(0, 191, 255, 0.4) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 25;
          pointer-events: none;
          border-radius: 1.5rem;
        }

        .card-3d:hover::before {
          opacity: 1;
        }

        .card-3d::after {
          content: "";
          position: fixed;
          box-shadow: 0 0 100px 40px var(--card-shadow-color, rgba(0, 191, 255, 0.12));
          top: -10%;
          left: -100%;
          transform: rotate(-45deg);
          height: 60rem;
          width: 100%;
          transition: 0.7s all;
          pointer-events: none;
          z-index: 0;
        }

        .card-3d:hover::after {
          filter: brightness(0.5);
          top: -100%;
          left: 200%;
        }

        .card-3d:hover {
          box-shadow: 0 0 0 3px rgba(0, 191, 255, 0.6),
                      0 0 35px 12px rgba(0, 191, 255, 0.25);
        }

        .card-3d-inner {
          position: absolute;
          inset: 14px;
          border-radius: 1.375rem;
          pointer-events: none;
          z-index: 10;
          box-shadow: inset 0.5px 0.5px 1.5px rgba(255, 235, 180, 0.6),
                      inset -1px -1px 1px rgba(160, 110, 0, 0.5),
                      inset 3px 3px 6px rgba(0, 0, 0, 0.25);
          transform: translateZ(30px);
          will-change: transform;
          border: 1px solid rgba(0, 191, 255, 0.1);
        }

        .card-3d-content {
          position: absolute;
          inset: 14px;
          border-radius: 1.375rem;
          overflow: visible;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          z-index: 20;
          transform: translateZ(60px);
          will-change: transform;
        }

        .card-3d-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 75%;
          background: linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.75) 50%, transparent 100%);
          pointer-events: none;
          z-index: 10;
          transform: translateZ(5px);
          will-change: transform;
        }
      `}),e.jsx("div",{className:"card-3d-inner"}),e.jsx("div",{className:"card-3d-gradient"}),e.jsxs("div",{className:"card-3d-content p-4 sm:p-5 lg:p-7",children:[t.video&&!d&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-bolf-black/40 hover:bg-bolf-black/20 transition-colors",children:e.jsx("button",{onClick:n=>{n.stopPropagation(),a==null||a()},className:"w-16 h-16 rounded-full bg-bolf-neon-blue/80 hover:bg-bolf-neon-blue flex items-center justify-center transition-transform hover:scale-110 z-20 relative",style:{transform:"translateZ(70px)"},"aria-label":"Play video",children:e.jsx("svg",{className:"w-8 h-8 text-bolf-white ml-1",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M8 5v14l11-7z"})})})}),t.video&&d&&e.jsx("video",{src:t.video,className:"absolute inset-0 w-full h-full object-cover",controls:!0,autoPlay:!0,onEnded:x,style:{transform:"translateZ(20px)",zIndex:5}}),t.type==="media"&&e.jsx("div",{className:"absolute top-4 right-4 px-3 py-1.5 bg-bolf-orange/85 text-bolf-white text-xs rounded-full font-semibold z-20",style:{transform:"translateZ(70px)"},children:c("projects.mediaBadge")}),e.jsxs("div",{className:"relative z-30 bg-gradient-to-t from-bolf-black/95 via-bolf-black/80 to-transparent",style:{transform:"translateZ(25px)",position:"relative"},children:[e.jsx("h3",{className:"text-lg font-bold text-bolf-white mb-1 hover:text-bolf-neon-blue transition-colors",children:t.name}),e.jsx("p",{className:"text-bolf-gray/80 mb-3 text-xs line-clamp-2",children:t.description}),e.jsx("div",{className:"flex flex-wrap gap-2 mb-4",children:t.platforms.map(n=>e.jsxs("span",{className:"inline-flex items-center space-x-1 px-3 py-1 bg-bolf-white/10 backdrop-blur-sm rounded-full text-sm text-bolf-white",style:{transform:"translateZ(20px)"},children:[e.jsx("span",{children:y.getPlatformIcon(n)}),e.jsx("span",{children:y.getPlatformDisplayName(n)})]},n))})]})]})]})}function S({member:t,onClick:d,roleColor:a,className:x=""}){const h=b.useRef(null),u=b.useRef(null);b.useEffect(()=>{const r=h.current;if(!r)return;const f=l=>{const n=r.getBoundingClientRect(),m=l.clientX-n.left,g=l.clientY-n.top;r.style.setProperty("--x",`${m}`),r.style.setProperty("--y",`${g}`)},o=()=>{if(!r)return;const l=r.getBoundingClientRect();r.style.setProperty("--x",`${l.width/2}`),r.style.setProperty("--y",`${l.height/2}`)};return r.addEventListener("mousemove",f),r.addEventListener("mouseleave",o),()=>{r.removeEventListener("mousemove",f),r.removeEventListener("mouseleave",o)}},[]),b.useEffect(()=>{const r=h.current;if(!r)return;const f=setTimeout(()=>{$().then(o=>{if(!(!o||!r))if(typeof o.init=="function")try{u.current=o.init(r,{max:10,speed:500,perspective:1800,glare:!0,"max-glare":.1,scale:1.03,reset:!0})}catch(l){console.error("VanillaTilt.init error:",l)}else if(typeof o=="function")try{u.current=new o(r,{max:10,speed:500,perspective:1800,glare:!0,"max-glare":.1,scale:1.03,reset:!0})}catch(l){console.error("VanillaTilt constructor error:",l)}else console.error("VanillaTilt is not a valid function or object")}).catch(o=>{console.error("Failed to load or initialize Vanilla Tilt:",o)})},100);return()=>{if(clearTimeout(f),u.current)try{typeof u.current.destroy=="function"?u.current.destroy():u.current.vanillaTilt&&typeof u.current.vanillaTilt.destroy=="function"&&u.current.vanillaTilt.destroy()}catch(o){console.error("Error destroying VanillaTilt:",o)}}},[]);const s=(r,f)=>{if(r.startsWith("#")){const o=parseInt(r.slice(1,3),16),l=parseInt(r.slice(3,5),16),n=parseInt(r.slice(5,7),16);return`rgba(${o}, ${l}, ${n}, ${f})`}return r},i=s(a,.4),c=s(a,.12);return e.jsxs("div",{ref:h,className:`card-3d bg-bolf-black/90 backdrop-blur-md rounded-3xl overflow-hidden transition-all duration-300 cursor-grab active:cursor-grabbing ${x}`,style:{backgroundImage:`url(${t.avatar})`,backgroundSize:"cover",backgroundPosition:"center",boxShadow:`0 0 0 2px ${a}40, 0 0 25px 8px ${a}15`,transformStyle:"preserve-3d",height:"auto","--x":"50%","--y":"50%","--role-color":i,"--role-shadow-color":c},onClick:d,children:[e.jsx("style",{children:`
        .card-3d {
          position: relative;
          min-height: 200px;
          height: auto;
          will-change: transform, box-shadow, background-size;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1),
                      box-shadow 0.4s ease-out,
                      background-size 1.5s ease-out;
        }

        @media (min-width: 640px) {
          .card-3d {
            min-height: 300px;
          }
        }

        .card-3d::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--x, 50%) var(--y, 50%),
            var(--role-color, rgba(0, 191, 255, 0.4)) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 25;
          pointer-events: none;
          border-radius: 1.5rem;
        }

        .card-3d:hover::before {
          opacity: 1;
        }

        .card-3d::after {
          content: "";
          position: fixed;
          box-shadow: 0 0 100px 40px var(--role-shadow-color, rgba(0, 191, 255, 0.12));
          top: -10%;
          left: -100%;
          transform: rotate(-45deg);
          height: 60rem;
          width: 100%;
          transition: 0.7s all;
          pointer-events: none;
          z-index: 0;
        }

        .card-3d:hover::after {
          filter: brightness(0.5);
          top: -100%;
          left: 200%;
        }

        .card-3d:hover {
          box-shadow: 0 0 0 3px ${a}60, 0 0 35px 12px ${a}25;
        }

        .card-3d-inner {
          position: absolute;
          inset: 14px;
          border-radius: 1.375rem;
          pointer-events: none;
          z-index: 10;
          box-shadow: inset 0.5px 0.5px 1.5px rgba(255, 235, 180, 0.6),
                      inset -1px -1px 1px rgba(160, 110, 0, 0.5),
                      inset 3px 3px 6px rgba(0, 0, 0, 0.25);
          transform: translateZ(30px);
          will-change: transform;
          border: 1px solid ${a}20;
        }

        .card-3d-content {
          position: absolute;
          inset: 14px;
          border-radius: 1.375rem;
          overflow: visible;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          z-index: 20;
          transform: translateZ(60px);
          will-change: transform;
        }

        .card-3d-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 75%;
          background: linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.75) 50%, transparent 100%);
          pointer-events: none;
          z-index: 10;
          transform: translateZ(5px);
          will-change: transform;
        }
      `}),e.jsx("div",{className:"card-3d-inner"}),e.jsx("div",{className:"card-3d-gradient"}),e.jsx("div",{className:"card-3d-content p-3",children:e.jsxs("div",{className:"relative z-30 bg-gradient-to-t from-bolf-black/95 via-bolf-black/80 to-transparent p-3",style:{transform:"translateZ(25px)",position:"relative"},children:[e.jsx("h3",{className:"text-lg font-bold mb-1 transition-colors",style:{color:a,transform:"translateZ(30px)"},children:t.name}),e.jsx("p",{className:"mb-1.5 font-semibold text-xs",style:{transform:"translateZ(20px)",color:a},children:t.role}),t.bio&&e.jsx("p",{className:"text-bolf-gray/80 text-xs line-clamp-2 mb-2",style:{transform:"translateZ(20px)"},children:t.bio})]})})]})}function D({project:t,isVideoPlaying:d=!1,onVideoPlay:a,onVideoEnd:x,onCardClick:h,className:u=""}){const{t:s,language:i}=N();return b.useEffect(()=>{y.setLanguage(i)},[i]),e.jsxs("div",{className:`nft-card bg-gradient-to-b from-[#1c1038] to-[#0d0519] border border-white/10 rounded-xl overflow-hidden transition-all duration-500 cursor-pointer hover:border-white/40 hover:scale-[1.015] hover:brightness-[1.3] ${u}`,onClick:h,style:{boxShadow:"0 7px 20px 5px rgba(0, 0, 0, 0.5)",backdropFilter:"blur(7px)",WebkitBackdropFilter:"blur(7px)"},children:[e.jsx("style",{children:`
        .nft-card {
          position: relative;
          user-select: none;
        }

        .nft-card::before {
          content: "";
          position: fixed;
          box-shadow: 0 0 100px 40px rgba(255, 255, 255, 0.08);
          top: -10%;
          left: -100%;
          transform: rotate(-45deg);
          height: 60rem;
          transition: 0.7s all;
        }

        .nft-card:hover::before {
          filter: brightness(0.5);
          top: -100%;
          left: 200%;
        }
      `}),e.jsx("div",{className:"relative w-full h-48 overflow-hidden",children:t.video&&!d?e.jsxs("div",{className:"relative w-full h-full",children:[e.jsx("img",{src:t.image,alt:t.name,className:"w-full h-full object-cover",loading:"lazy",decoding:"async"}),e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-bolf-black/40 hover:bg-bolf-black/20 transition-colors",children:e.jsx("button",{onClick:c=>{c.stopPropagation(),a==null||a()},className:"w-16 h-16 rounded-full bg-bolf-neon-blue/80 hover:bg-bolf-neon-blue flex items-center justify-center transition-transform hover:scale-110","aria-label":"Play video",children:e.jsx("svg",{className:"w-8 h-8 text-bolf-white ml-1",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M8 5v14l11-7z"})})})})]}):t.video&&d?e.jsx("video",{src:t.video,className:"w-full h-full object-cover",controls:!0,autoPlay:!0,onEnded:x}):e.jsx("img",{src:t.image,alt:t.name,className:"w-full h-full object-cover",style:{borderRadius:"0.5rem 0.5rem 0 0"},loading:"lazy",decoding:"async",onError:c=>{c.target.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23000" width="400" height="300"/%3E%3Ctext fill="%23fff" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="24"%3EProject Image%3C/text%3E%3C/svg%3E'}})}),e.jsxs("div",{className:"p-3 flex flex-col",style:{width:"90%",margin:"0 auto"},children:[e.jsx("h3",{className:"text-lg font-bold text-white mb-1",children:t.name}),e.jsx("p",{className:"text-[#a89ec9] mb-3 line-clamp-2 text-xs",children:t.description}),e.jsx("div",{className:"flex justify-between items-center mb-3",children:e.jsxs("div",{className:"flex items-center text-[#ee83e5] font-bold text-sm",children:[e.jsx("span",{className:"mr-2",children:"◘"}),e.jsx("div",{className:"flex gap-1",children:t.platforms.slice(0,2).map(c=>e.jsx("span",{className:"text-xs",children:y.getPlatformIcon(c)},c))})]})}),e.jsx("hr",{style:{width:"100%",border:"none",borderBottom:"1px solid rgba(136, 136, 136, 0.3)",marginTop:0}}),e.jsxs("div",{className:"flex items-center mt-2",children:[e.jsx("div",{className:"flex items-center border border-white/10 p-1 mr-2 rounded-full",style:{boxShadow:"inset 0 0 0 4px rgba(0, 0, 0, 0.7)"},children:t.type==="media"?e.jsx("span",{className:"text-xs",children:"📺"}):e.jsx("span",{className:"text-xs",children:"🎮"})}),e.jsx("p",{className:"text-[#a89ec9] text-xs",children:e.jsx("span",{style:{textDecoration:"none"},children:t.type==="media"?s("projects.mediaBadge"):"Game"})})]})]})]})}function X({member:t,onClick:d,roleColor:a,className:x=""}){return e.jsxs("div",{className:`nft-card bg-gradient-to-b from-[#1c1038] to-[#0d0519] border border-white/10 rounded-xl overflow-hidden transition-all duration-500 cursor-pointer hover:border-white/40 hover:scale-[1.015] hover:brightness-[1.3] ${x}`,onClick:d,style:{boxShadow:`0 7px 20px 5px ${a}30`,backdropFilter:"blur(7px)",WebkitBackdropFilter:"blur(7px)",borderColor:`${a}30`},children:[e.jsx("style",{children:`
        .nft-card {
          position: relative;
          user-select: none;
        }

        .nft-card::before {
          content: "";
          position: fixed;
          box-shadow: 0 0 100px 40px rgba(255, 255, 255, 0.08);
          top: -10%;
          left: -100%;
          transform: rotate(-45deg);
          height: 60rem;
          transition: 0.7s all;
        }

        .nft-card:hover::before {
          filter: brightness(0.5);
          top: -100%;
          left: 200%;
        }
      `}),e.jsx("div",{className:"relative w-full h-32 overflow-hidden",children:e.jsx("img",{src:t.avatar,alt:t.name,className:"w-full h-full object-cover",style:{borderRadius:"0.5rem 0.5rem 0 0"},loading:"lazy",decoding:"async",onError:h=>{h.target.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23000" width="300" height="300"/%3E%3Ccircle cx="150" cy="120" r="40" fill="%2300BFFF"/%3E%3Cpath fill="%23000" d="M150 180 L110 240 L190 240 Z"/%3E%3C/svg%3E'}})}),e.jsxs("div",{className:"p-3 flex flex-col",style:{width:"90%",margin:"0 auto"},children:[e.jsx("h3",{className:"text-lg font-bold mb-1",style:{color:a},children:t.name}),e.jsx("p",{className:"mb-1.5 text-xs font-semibold",style:{color:a},children:t.role}),t.bio&&e.jsx("p",{className:"text-bolf-gray mb-2 line-clamp-2 text-xs",children:t.bio})]})]})}export{L as D,M as G,I,D as N,F as T,R as a,X as b,S as c,B as d,Z as e};
