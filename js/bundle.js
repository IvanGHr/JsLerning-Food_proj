/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";function e(e,t){document.querySelector(e).style.display="block",document.body.style.overflow="hidden",console.log(t),t&&clearInterval(t)}function t(e){document.querySelector(e).style.display="none",document.body.style.overflow=""}window.addEventListener("DOMContentLoaded",(()=>{const n=setTimeout((()=>e(".modal",n)),5e4);(function(e,t,n,o){let a=document.querySelectorAll(e),r=document.querySelectorAll(t),s=document.querySelector(n);function c(){r.forEach((e=>{e.classList.add("hide"),e.classList.remove("show","fade")})),a.forEach((e=>{e.classList.remove(o)}))}function i(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;r[e].classList.add("show","fade"),r[e].classList.remove("hide"),a[e].classList.add(o)}c(),i(),s.addEventListener("click",(function(t){const n=t.target;n&&n.classList.contains(e.slice(1))&&a.forEach(((e,t)=>{n==e&&(c(),i(t))}))}))})(".tabheader__item",".tabcontent",".tabheader__items","tabheader__item_active"),function(n,o,a){const r=document.querySelector(o);document.querySelectorAll(n).forEach((t=>{t.addEventListener("click",(()=>e(o,a)))})),r.addEventListener("click",(e=>{e.target!==r&&""!=e.target.getAttribute("data-close")||t(o)})),document.addEventListener("keydown",(e=>{"Escape"===e.code&&"block"===r.style.display&&t(o)})),window.addEventListener("scroll",(function t(){window.pageYOffset+document.documentElement.clientHeight>=document.documentElement.scrollHeight-1&&(e(o,a),window.removeEventListener("scroll",t))}))}("[data-modal]",".modal",n),function(e,t){function n(e){return e>=0&&e<10?`0${e}`:e}!function(e,t){const o=document.querySelector(e),a=o.querySelector("#days"),r=o.querySelector("#hours"),s=o.querySelector("#minutes"),c=o.querySelector("#seconds"),i=setInterval(l,1e3);function l(){const e=function(e){let t,n,o,a;const r=Date.parse(e)-Date.parse(new Date);return r<=0?(t=0,n=0,o=0,a=0):(t=Math.floor(r/864e5),n=Math.floor(r/36e5%24),o=Math.floor(r/1e3/60%60),a=Math.floor(r/1e3%60)),{total:r,days:t,hours:n,minutes:o,seconds:a}}(t);a.innerHTML=n(e.days),r.innerHTML=n(e.hours),s.innerHTML=n(e.minutes),c.innerHTML=n(e.seconds),e.total<=0&&clearInterval(i)}l()}(e,t)}(".timer","2024-01-01"),function(n,o){function a(n){const a=document.querySelector(".modal__dialog");a.classList.add("hide"),e(".modal",o);const r=document.createElement("div");r.classList.add("modal__dialog"),r.innerHTML=`\n        <div class="modal__content">\n            <div data-close class="modal__close">&times;</div>\n            <div class="modal__title">${n}</div>\n        </div>\n        `,document.querySelector(".modal").append(r),setTimeout((()=>{r.remove(),a.classList.add("show"),a.classList.remove("hide"),t(".modal")}),4e3)}document.querySelectorAll(n).forEach((e=>{var t;(t=e).addEventListener("submit",(e=>{e.preventDefault();const n=document.createElement("img");n.src="img/form/spinner.svg",n.style.cssText="\n                display: block;\n                margin: 0 auto;\n            ",t.insertAdjacentElement("afterend",n);const o=new FormData(t);(async(e,t)=>{const n=await fetch("http://localhost:3000/requests",{method:"POST",headers:{"Content-type":"application/json"},body:t});return await n.json()})(0,JSON.stringify(Object.fromEntries(o.entries()))).then((e=>{console.log(e),a("Спасибо, скоро мы с вами свяжемся"),n.remove()})).catch((()=>{a("Что-то пошло не так")})).finally((()=>{t.reset()}))}))}))}("form",n),function(){class e{constructor(e,t,n,o,a,r){this.src=e,this.alt=t,this.title=n,this.descr=o,this.price=a;for(var s=arguments.length,c=new Array(s>6?s-6:0),i=6;i<s;i++)c[i-6]=arguments[i];this.classes=c,this.parent=document.querySelector(r),this.transfer=27,this.changeToUAH()}changeToUAH(){this.price*=this.transfer}render(){const e=document.createElement("div");0===this.classes.length?(this.element="menu__item",e.classList.add(this.element)):this.classes.forEach((t=>e.classList.add(t))),e.innerHTML=`\n                <img src=${this.src} alt=${this.alt}>\n                <h3 class="menu__item-subtitle">${this.title}</h3>\n                <div class="menu__item-descr">${this.descr}</div>\n                <div class="menu__item-divider"></div>\n                <div class="menu__item-price">\n                    <div class="menu__item-cost">Цена:</div>\n                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>\n                </div>\n            `,this.parent.append(e)}}(async function(e){let t=await fetch(e);if(!t.ok)throw new Error(`Could not fetch ${e}, status: ${t.status}`);return await t.json()})("http://localhost:3000/menu").then((t=>{t.forEach((t=>{let{img:n,altimg:o,title:a,descr:r,price:s}=t;new e(n,o,a,r,s,".menu .container").render()}))}))}(),function(){const e=document.querySelector(".calculating__result span");let t,n,o,a,r;function s(e,t){document.querySelectorAll(e).forEach((e=>{e.classList.remove(t),e.getAttribute("id")===localStorage.getItem("sex")&&e.classList.add(t),e.getAttribute("data-ratio")===localStorage.getItem("ratio")&&e.classList.add(t)}))}function c(){e.textContent=t&&n&&o&&a&&r?"famale"===t?Math.round((447.6+9.2*o+3.1*n-4.3*a)*r):Math.round((88.36+13.4*o+4.8*n-5.7*a)*r):"____"}function i(e,n){const o=document.querySelectorAll(e);o.forEach((e=>{e.addEventListener("click",(e=>{e.target.getAttribute("data-ratio")?(r=+e.target.getAttribute("data-ratio"),localStorage.setItem("ratio",+e.target.getAttribute("data-ratio"))):(t=e.target.getAttribute("id"),localStorage.setItem("sex",e.target.getAttribute("id"))),o.forEach((e=>{e.classList.remove(n)})),e.target.classList.add(n),c()}))}))}function l(e){const t=document.querySelector(e);t.addEventListener("input",(()=>{switch(t.value.match(/\D/g)?t.style.border="1px solid red":t.style.border="none",t.getAttribute("id")){case"height":n=+t.value;break;case"weight":o=+t.value;break;case"age":a=+t.value}c()}))}localStorage.getItem("sex")?t=localStorage.getItem("sex"):(t="famale",localStorage.setItem("sex","famale")),localStorage.getItem("ratio")?r=localStorage.getItem("ratio"):(r=1.375,localStorage.setItem("ratio",1.375)),s("#gender div","calculating__choose-item_active"),s(".calculating__choose_big div","calculating__choose-item_active"),c(),i("#gender div","calculating__choose-item_active"),i(".calculating__choose_big div","calculating__choose-item_active"),l("#height"),l("#weight"),l("#age")}(),function(e){let{container:t,slide:n,next:o,prev:a,totalCounter:r,currentCunter:s,wrapper:c,field:i}=e,l=1,d=0;const u=document.querySelector(a),m=document.querySelector(t),h=document.querySelector(o),g=document.querySelectorAll(n),f=document.querySelector(r),y=document.querySelector(s),p=document.querySelector(c),v=document.querySelector(i),_=window.getComputedStyle(p).width;g.length<10?(f.textContent=`0${g.length}`,y.textContent=`0${l}`):(f.textContent=g.length,y.textContent=l),v.style.width=100*g.length+"%",v.style.display="flex",v.style.transition="0.5s all",p.style.overflow="hidden",g.forEach((e=>{e.style.width=_})),m.style.position="relative";const S=document.createElement("ol"),b=[];S.classList.add("carousel-indicators"),S.style.cssText="\n        position: absolute;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        z-index: 15;\n        display: flex;\n        justify-content: center;\n        margin-right: 15%;\n        margin-left: 15%;\n        list-style: none;\n    ",m.append(S);for(let e=0;e<g.length;e++){const t=document.createElement("li");t.setAttribute("data-slide-to",e+1),t.style.cssText="\n            box-sizing: content-box;\n            flex: 0 1 auto;\n            width: 30px;\n            height: 6px;\n            margin-right: 3px;\n            margin-left: 3px;\n            cursor: pointer;\n            background-color: #fff;\n            background-clip: padding-box;\n            border-top: 10px solid transparent;\n            border-bottom: 10px solid transparent;\n            opacity: .5;\n            transition: opacity .6s ease;\n        ",0==e&&(t.style.opacity=1),S.append(t),b.push(t)}function x(e){return+e.replace(/\D/g,"")}h.addEventListener("click",(()=>{d===x(_)*(g.length-1)?d=0:d+=x(_),v.style.transform=`translateX(-${d}px)`,l==g.length?l=1:l++,g.length<10?y.textContent=`0${l}`:y.textContent=l,b.forEach((e=>e.style.opacity=".5")),b[l-1].style.opacity=1})),u.addEventListener("click",(()=>{0==d?d=x(_)*(g.length-1):d-=x(_),v.style.transform=`translateX(-${d}px)`,1==l?l=g.length:l--,g.length<10?y.textContent=`0${l}`:y.textContent=l,b.forEach((e=>e.style.opacity=".5")),b[l-1].style.opacity=1})),b.forEach((e=>{e.addEventListener("click",(e=>{const t=e.target.getAttribute("data-slide-to");l=t,d=x(_)*(t-1),v.style.transform=`translateX(-${d}px)`,g.length<10?y.textContent=`0${l}`:y.textContent=l,b.forEach((e=>e.style.opacity=".5")),b[l-1].style.opacity=1}))}))}({container:".offer__slider",slide:".offer__slide",next:".offer__slider-next",prev:".offer__slider-prev",totalCounter:"#total",currentCunter:"#current",wrapper:".offer__slider-wrapper",field:".offer__slide-inner"})}))})();
//# sourceMappingURL=bundle.js.map