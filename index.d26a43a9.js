function e(e,t,n,o){Object.defineProperty(e,t,{get:n,set:o,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){o[e]=t},t.parcelRequired7c6=a),a.register("kyEFX",(function(t,n){var o,a;e(t.exports,"register",(function(){return o}),(function(e){return o=e})),e(t.exports,"resolve",(function(){return a}),(function(e){return a=e}));var s={};o=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)s[t[n]]=e[t[n]]},a=function(e){var t=s[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),a("kyEFX").register(JSON.parse('{"5ZPII":"index.d26a43a9.js","fa4Yp":"question-mark.34d36c19.jpeg","5UbS1":"index.b28ecfd1.css","ggbzi":"index.91b6990e.js"}'));var s=a("fvCRb"),r=a("kyRuT"),l=a("2nhTy");s=a("fvCRb");const i=document.querySelector(".gallery-list"),c=new(0,s.default);!async function(){const e=(0,r.getSpinner)();try{i.append(e);const t=await c.fetchPopularFilms();(0,l.createPagination)({totalItems:t.total_results>1e4?1e4:t.total_results,page:t.page}).on("afterMove",(e=>{c.page=e.page,c.fetchPopularFilms().then((e=>{u(e.results),window.scrollTo({top:0,behavior:"smooth"})}))})),u(t.results)}catch(e){console.log(e.message)}finally{e.remove()}}();var d;async function u(e){try{const{genres:t}=await c.fetchGeneres(),n=p(t),o=e.map((e=>`<li class='list-item'>\n      <img class='poster' src="${null===e.poster_path?new URL(d):`https://image.tmdb.org/t/p/w500${e.poster_path}`}"\n  alt="${e.title}" name="${e.id}"\n  /><h2 class='title'>${e.title}</h2>\n  <p class='info'>${function(e,t){return e.map((e=>t[e]||"Unknown")).join(", ")}(e.genre_ids,n)||"Unknown"} &#124 ${e.release_date.slice(0,4)||"Unknown"}</p></li>`)).join("");i.innerHTML=o}catch(e){console.log(e.message)}}function p(e){return e.reduce(((e,{name:t,id:n})=>({...e,[n]:t})),{})}d=new URL(a("kyEFX").resolve("fa4Yp"),import.meta.url).toString();l=a("2nhTy"),r=a("kyRuT");const m=new(0,s.default),f=document.querySelector(".search-form"),g=document.querySelector(".empty"),y=document.querySelector(".not-found");f.addEventListener("submit",(async function(e){const t=(0,r.getSpinner)();if(e.preventDefault(),g.style.display="none",y.style.display="none",m.searchQuery=e.currentTarget.input.value.trim().toLowerCase(),""===m.searchQuery)return y.style.display="none",void(g.style.display="block");try{f.append(t);const e=await m.searchMovies();if(0===e.results.length)return g.style.display="none",void(y.style.display="block");(0,l.createPagination)({totalItems:e.total_results,page:e.page,totalPages:e.total_pages}).on("afterMove",(e=>{m.page=e.page,m.searchMovies().then((e=>{y.style.display="none",g.style.display="none",u(e.results),window.scrollTo({top:0,behavior:"smooth"})}))})),u(e.results)}catch(e){console.log(e.message)}finally{t.remove()}})),a("epHO8");s=a("fvCRb"),r=a("kyRuT");var h=a("glfCx");const v=new(0,s.default),_=document.querySelector(".gallery-list"),w=document.querySelector(".backdrop"),b=document.querySelector(".modal__contents"),k=document.querySelector(".modal__btn-close");function E(e){e.target===w&&(w.classList.toggle("is-hidden"),document.removeEventListener("click",E),document.removeEventListener("keydown",L))}function L(e){"Escape"===e.code&&(w.classList.toggle("is-hidden"),document.removeEventListener("keydown",L))}function S(e){w.classList.toggle("is-hidden")}_.addEventListener("click",(async function(e){if("IMG"!==e.target.nodeName)return;const t=(0,r.getSpinner)(),n=e.target.name;try{w.append(t);const e=await v.fetchFilmInfo(n);w.classList.toggle("is-hidden");try{await async function(e){try{const{genres:t}=await v.fetchGeneres(),n=(p(t),`<img src="${null===e.poster_path?new URL(d):`https://image.tmdb.org/t/p/w500${e.poster_path}`}" alt="photo" class="modal__poster" />\n        <div>\n          <h2 class="modal__title">${e.title.toUpperCase()||"Unknown"}</h2>\n          <table class="modal__info">\n            <tr>\n              <th>Vote/Votes</th>\n              <td>\n                <span class="modal__info--accent">${e.vote_average||"Unknown"}</span> /\n                <span class="modal__info--noaccent">${e.vote_count||"Unknown"}</span>\n              </td>\n            </tr>\n            <tr>\n              <th>Popularity</th>\n              <td>${e.popularity||"Unknown"}</td>\n            </tr>\n            <tr>\n              <th>Original Title</th>\n              <td>${e.original_title||"Unknown"}</td>\n            </tr>\n            <tr>\n              <th>Genre</th>\n              <td>${e.genres.map((e=>e.name)).join(", ")||"Unknown"}</td>\n            </tr>\n          </table>\n          <h3 class="modal__about--title">About</h3>\n          <p class="modal__about">\n            ${e.overview||"Unknown"}\n          </p>\n              <div class="modal__btn">\n      <button type="button" class="modal__btn-watched">add to Watched</button>\n      <button type="button" class="modal__btn-queue">add to queue</button>\n    </div>\n\n        </div>`);b.innerHTML=n}catch(e){console.log(e.message)}}(e),(0,h.onModalBtnClick)(e)}catch(e){console.log(e.message)}}catch(e){console.log(e.message)}finally{t.remove()}document.addEventListener("keydown",L),k.addEventListener("click",S),document.addEventListener("click",E)})),k.removeEventListener("click",S),document.removeEventListener("keydown",L),document.removeEventListener("click",E),a("2nhTy"),a("glfCx"),a("kyRuT");
//# sourceMappingURL=index.d26a43a9.js.map
