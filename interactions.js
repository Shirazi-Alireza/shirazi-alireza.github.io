document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('.comparison').forEach(el=>{const slider=el.querySelector('.comparison-range');const update=()=>{const v=Number(slider.value);el.style.setProperty('--split',v+'%');slider.setAttribute('aria-valuetext',v+' percent before, '+(100-v)+' percent after')};slider.addEventListener('input',update);el.classList.add('enhanced');update()});const tabs=[...document.querySelectorAll('.research-tabs a')];if('IntersectionObserver' in window&&tabs.length){const map=new Map(tabs.map(a=>[a.getAttribute('href').slice(1),a]));const sync=id=>tabs.forEach(a=>{const active=a===map.get(id);a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});const observer=new IntersectionObserver(entries=>{entries.filter(e=>e.isIntersecting).forEach(e=>sync(e.target.id))},{rootMargin:'-20% 0px -65% 0px'});map.forEach((a,id)=>{const e=document.getElementById(id);if(e)observer.observe(e)});tabs.forEach(a=>a.addEventListener('click',()=>sync(a.hash.slice(1))))}if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const o=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');o.unobserve(e.target)}}),{threshold:.06});document.querySelectorAll('main .section').forEach(e=>o.observe(e))}});
/* Full-size research images, with native dialog focus and Escape behavior. */
document.addEventListener('DOMContentLoaded',()=>{
 const links=[...document.querySelectorAll('a.image-zoom')];
 if(links.length && typeof HTMLDialogElement!=='undefined'){
  const dialog=document.createElement('dialog');dialog.className='lightbox';dialog.setAttribute('aria-label','Research image viewer');
  dialog.innerHTML='<button type="button" class="lightbox-close" autofocus>Close ×</button><img alt=""><p class="lightbox-caption"></p>';
  document.body.append(dialog);let origin;
  links.forEach(link=>link.addEventListener('click',e=>{e.preventDefault();origin=link;const img=link.querySelector('img');dialog.querySelector('img').src=link.href;dialog.querySelector('img').alt=img.alt;const caption=link.closest('figure')?.querySelector('figcaption');dialog.querySelector('p').textContent=caption?caption.textContent:img.alt;dialog.showModal();document.documentElement.classList.add('lightbox-open')}));
  dialog.querySelector('button').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
  dialog.addEventListener('close',()=>{document.documentElement.classList.remove('lightbox-open');origin?.focus()});
 }
 if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target)}}),{threshold:.04});
  document.querySelectorAll('main .section').forEach(el=>{if(el.getBoundingClientRect().top>innerHeight){el.classList.add('reveal-ready');observer.observe(el)}});
 }
});
