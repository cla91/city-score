(()=>{"use strict";const e=document.querySelector("[data-error-container]");function t(t,n){n?(e.textContent=t,e.classList.remove("hidden")):(e.textContent="",e.classList.add("hidden"))}async function n(e){try{const n=await fetch(e);if(n.ok)return await n.json();404==n.status&&t("The page you requested was not found.",!0)}catch{t("A Network error occurred. Try again later.",!0)}}const r=document.querySelector("[data-dataList]"),o=document.querySelector("[data-city-name]"),a=document.querySelector("[data-city-summary]"),c=document.querySelector("[data-circular-progress]"),s=document.querySelector("[data-total-score-value]"),d=document.querySelector("[data-categories-list]"),i=document.querySelector("[data-header]"),u=document.querySelector("[data-main]");function l(e,t){n(`${t}scores/`).then((t=>{const n=t.categories,r=t.summary.replace(/<b>/g,"<em>").replace(/<\/b>/g,"</em>"),l=t.teleport_city_score.toFixed(2);o.textContent=e,a.innerHTML=r,c.style.background=`conic-gradient(hsl(var(--primary-color)) ${3.6*Math.round(l)}deg, #fff 0deg`,s.textContent=`${l}%`,d.textContent="",n.forEach((e=>d.append(function(e){const t=document.querySelector("[data-category-template]").content.cloneNode(!0),n=t.querySelector("[data-category-name]"),r=t.querySelector("[data-category-score]"),o=t.querySelector("[data-progress-bar]");return n.textContent=e.name,r.textContent=e.score_out_of_10.toFixed(2),o.style.background=`linear-gradient(to right, ${e.color} ${Math.round(10*e.score_out_of_10)}%, transparent ${Math.round(10*e.score_out_of_10)}%)`,t}(e)))),i.classList.add("header-minimize"),u.classList.remove("hidden")}))}const m=document.querySelector("[data-multiple-results-container]"),y=document.querySelector("[data-multiple-results-list]"),h=document.querySelector("[data-main]");function f(e,t){return t.filter((t=>t.name.includes(e)&&t.name.length==e.length))}const g=document.querySelector("[data-search-input]"),p=document.querySelector("[data-form]"),L=document.querySelector("[data-multiple-results-list]"),q=document.querySelector("[data-multiple-results-container]"),S=document.querySelector("[data-main]"),v=document.querySelector("[data-button-close]"),C=document.querySelector("[data-categories-list]");n("https://api.teleport.org/api/urban_areas/").then((e=>e._links["ua:item"])).then((e=>{g.addEventListener("input",(()=>{t("",!1),function(e,t){""!=e?(r.innerHTML="",t.filter((t=>t.name.toLowerCase().startsWith(e.toLowerCase()))).forEach((e=>{const t=document.createElement("option");t.setAttribute("value",e.name),r.append(t)}))):r.innerHTML=""}(g.value,e)})),p.addEventListener("submit",(n=>{if(n.preventDefault(),""==g.value)return void t("Empty value",!0);const r=function(e,t){return e=e.toLowerCase(),t.filter((t=>t.name.toLowerCase().includes(e)))}(g.value,e);0==r.length&&t("The page you requested was not found",!0),1==r.length&&l(r[0].name,r[0].href),r.length>1&&(function(e){e.forEach((e=>{const t=document.querySelector("[data-list-template]").content.cloneNode(!0).firstElementChild;t.textContent=e.name,y.append(t)})),m.classList.remove("hidden"),h.classList.add("hidden")}(r),L.addEventListener("click",(t=>{if(t.preventDefault(),!t.target.closest("UL"))return;const n=f(t.target.textContent,e);q.classList.add("hidden"),L.innerHTML="",l(n[0].name,n[0].href),S.classList.remove("hidden"),window.scrollTo(0,0)})),L.addEventListener("keydown",(t=>{if("Enter"!=t.key)return;if(!t.target.closest("UL"))return;const n=f(t.target.textContent,e);q.classList.add("hidden"),L.innerHTML="",l(n.name,n.href),S.classList.remove("hidden"),window.scrollTo(0,0)})),v.addEventListener("click",(e=>{e.target.closest("BUTTON")&&(q.classList.add("hidden"),C.firstElementChild&&S.classList.remove("hidden"),L.innerHTML="")})))}))}))})();