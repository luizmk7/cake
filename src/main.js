import './styles.css';
import './menu.css';

const $=s=>document.querySelector(s);
const money=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const traditional=['Brigadeiro ao leite','Brigadeiro meio amargo','Coco','Ninho','Amendoim'];
const noble=['Nozes','Damasco','Ameixa','Ameixa com coco','Crocante de amendoim','Cream cheese'];
const masses=['Branca / baunilha','Chocolate'];
const nobleMasses=['Red velvet','Café','Nozes'];
const extras=[['Geleia de abacaxi',20],['Geleia de frutas vermelhas',30],['Geleia de morango',20],['Nutella',30],['Glitter meio bolo',15],['Glitter bolo total',30]];
const catalog={
 decorated:{label:'Bolos decorados',kicker:'PARA CELEBRAR',description:'Escolha o tamanho e a cobertura. Os valores da tabela incluem sabores tradicionais.',photos:[238,244,237,236,242],sizes:[['Mini cake · 8 cm','Individual',null,26.9,1],['Baby cake · 10 cm','4 fatias',70,60,1],['15 cm · meia altura','8 a 10 fatias · 1 camada',100,120,1],['15 cm','15 a 18 fatias · 3 camadas',170,180,1],['20 cm','22 a 25 fatias · 3 camadas',190,220,2],['30 cm','35 a 40 fatias · 3 camadas',260,280,2]]},
 baby:{label:'Baby cake',kicker:'PEQUENAS CELEBRAÇÕES',description:'Em pasta americana, com 3 a 4 fatias. A partir de R$ 95,00, conforme a complexidade da decoração.',photos:[551,552],sizes:[['Baby cake','3 a 4 fatias',95]],fillings:['Brigadeiro','Coco','Amendoim','Ninho']},
 bento:{label:'Bentô cake',kicker:'UM CARINHO SÓ SEU',description:'Um bolo com a sua mensagem. Escolha massa, recheio e conte sua ideia.',photos:[663,662,664],sizes:[['Bentô cake','Personalize sua mensagem',40]],fillings:['Brigadeiro','Coco','Amendoim','Ninho']},
 pie:{label:'Tortas',kicker:'PARA DIVIDIR',description:'Escolha seu sabor favorito e o tamanho para compartilhar.',photos:[],sizes:[['P · 15 cm','6 pedaços',90],['M · 20 cm','14 pedaços',170],['G · 26 cm','30 pedaços',260]],flavors:['Red velvet','Casadinha','Chocolatuda','Ferrero rocher','Abacaxi com coco','Ninho com frutas vermelhas','Ninho com geleia de morango','Supreme','Ninho com morangos frescos','Ninho com Nutella','Black Laka Oreo','Ameixa com coco','Pistache com frutas vermelhas','Prestígio','Tapioca com doce de leite']},
 volcano:{label:'Bolos vulcão',kicker:'COBERTURA QUE ABRAÇA',description:'Do cafezinho à mesa cheia: escolha o tamanho e o sabor.',photos:[],sizes:[['P','3 pedaços',22],['M','8 pedaços',45],['G','20 pedaços',69.9]],flavors:['Chocolatudo','Red velvet','Café','Ninho','Ninho com Nutella','Ninho com geleia de morango','Pistache com frutas vermelhas','Prestígio','Tapioca com doce de leite','Oreo','Cenoura com brigadeiro','Limão']}
};
const cutouts={238:'assets/cake-cutout-238.webp',551:'assets/cake-cutout-551.webp',663:'assets/cake-cutout-663.webp'};
function displayPhoto(id){return cutouts[id]||`assets/cake-${id}.jpg`;}
let activePhoto=238;
let state={type:'decorated',size:3,cover:'Chantininho',mass:masses[0],fillings:['Ninho'],flavor:'',extras:[],decor:false};
function quote(){const p=catalog[state.type],size=p.sizes[state.size];const base=state.type==='decorated'?size[state.cover==='Chantininho'?2:3]:size[2];const add=state.extras.reduce((a,i)=>a+extras[i][1],0);const nobleSelected=state.type==='decorated'&&(nobleMasses.includes(state.mass)||state.fillings.some(f=>noble.includes(f)));return {base,add,total:base+add,unknown:nobleSelected||state.decor,from:state.type==='baby',nobleSelected};}
function limit(){return state.type==='decorated'?catalog.decorated.sizes[state.size][4]:1;}
function selectType(type,updateHistory=true){selectedModel=null;previewStarted=false;coverApplied=false;interior=false;gallerySlide='photo';if(!Object.hasOwn(catalog,type))throw Error('Tipo inválido');activePhoto=catalog[type].photos[0];state={type,size:type==='decorated'?3:0,cover:'Chantininho',mass:masses[0],fillings:[type==='decorated'?'Ninho':'Brigadeiro'],flavor:catalog[type].flavors?.[0]||'',extras:[],decor:false};render();showDetail(updateHistory);}
function section(number,title,body){return `<section class="form-section" data-step="${number}"><div class="step-title"><span class="step-number">${number}</span><h3>${title}</h3></div>${body}</section>`;}
function pills(items,key,value){return `<div class="pills">${items.map((x,i)=>`<button type="button" class="pill ${value===x?'selected':''}" aria-pressed="${value===x}" data-${key}="${i}">${x}</button>`).join('')}</div>`;}
function fillingChecks(items){return `<div class="check-grid">${items.map(f=>`<label class="check"><input type="checkbox" data-filling="${f}" ${state.fillings.includes(f)?'checked':''}><span>${f}</span>${noble.includes(f)?'<b>Sob consulta</b>':''}</label>`).join('')}</div>`;}
function render(){const p=catalog[state.type];$('#product-title').textContent=p.label;$('#category-kicker').textContent=p.kicker;$('#product-description').textContent=p.description;
let sizeHTML=`<div class="choices">${p.sizes.map((s,i)=>{const price=state.type==='decorated'?(s[state.cover==='Chantininho'?2:3]??s[3]):s[2];return `<button class="choice ${i===state.size?'selected':''}" data-size="${i}" aria-pressed="${i===state.size}"><strong>${s[0]}</strong><small>${s[1]}</small><span class="price">${state.type==='baby'?'A partir de ':''}${money(price)}</span></button>`;}).join('')}</div>`;
let html=section('01','Tamanho',sizeHTML);
if(p.flavors){html+=section('02','Escolha seu sabor',`<label for="flavor">Sabor da ${state.type==='pie'?'torta':'cobertura'}</label><select id="flavor">${p.flavors.map(f=>`<option ${f===state.flavor?'selected':''}>${f}</option>`).join('')}</select>`)}else{html+=section('02','Massa e recheio',`<fieldset><legend>Massa</legend>${pills(masses,'mass',state.mass)}</fieldset><p class="field-label">Recheio · ${limit()===1?'escolha 1 sabor':'escolha até 2 sabores'}</p>${fillingChecks(p.fillings||traditional)}${state.type==='decorated'?`<details class="noble" ${quote().nobleSelected?'open':''}><summary>Ver massas e recheios nobres · sob consulta</summary><p class="hint">Valores confirmados conforme o tamanho escolhido.</p><p class="field-label">Massas nobres</p>${pills(nobleMasses,'noblemass',state.mass)}<p class="field-label">Recheios nobres</p>${fillingChecks(noble)}</details>`:''}<p class="hint" id="filling-hint" aria-live="polite"></p>`);}
if(state.type==='decorated')html+=section('03','Adicionais',`<div class="check-grid">${extras.map((e,i)=>`<label class="check"><input type="checkbox" data-extra="${i}" ${state.extras.includes(i)?'checked':''}><span>${e[0]}</span><b>+ ${money(e[1])}</b></label>`).join('')}</div><p class="hint">Escolha apenas uma opção de glitter.</p><label class="check" style="margin-top:12px"><input id="decoration" type="checkbox" ${state.decor?'checked':''}><span>Quero topo ou enfeites especiais</span><b>Sob consulta</b></label><p class="hint">Topo, acrílico, bolas decorativas, flores e apliques em pasta americana: valores e disponibilidade a confirmar.</p>`);
if(!p.flavors)html+=section(state.type==='decorated'?'04':'03','Finalize com a cobertura',`<p class="hint cover-intro">Veja as camadas primeiro. A cobertura dá o toque final.</p>${state.type==='decorated'?pills(state.size===0?['Acetato']:['Chantininho','Acetato'],'cover',coverApplied?state.cover:''):`<button class="pill ${coverApplied?'selected':''}" data-finish="true">${state.type==='baby'?'Pasta americana':'Cobertura do bentô'}</button>`}<p class="hint">${state.type==='decorated'&&state.size===0?'O mini cake está disponível em acetato.':'Cores, desenho e enfeites são combinados com a Nanda.'}</p>`);$('#configuration').innerHTML=html;
const hasPhotos=p.photos.length>0;$('.gallery').hidden=!hasPhotos;$('.layout').classList.toggle('no-photos',!hasPhotos);$('.photo-area').hidden=!hasPhotos;$('#thumbnails').hidden=!hasPhotos;$('.photo-note').hidden=!hasPhotos;if(hasPhotos){$('#photo-count').textContent=`${p.photos.indexOf(activePhoto)+1} / ${p.photos.length}`;$('#main-photo').src=`assets/cake-${activePhoto}.jpg`;$('.photo-area').classList.remove('cutout');$('#main-photo').alt=`${p.label} da Nanda Trufas — inspiração do cardápio`;$('#thumbnails').innerHTML=p.photos.map((id,i)=>`<button class="thumb ${id===activePhoto?'selected':''}" data-photo="${id}" aria-label="Ver inspiração ${i+1}" aria-pressed="${id===activePhoto}"><img src="assets/cake-${id}.jpg" alt="" loading="lazy"></button>`).join('');}
updateSummary();syncVisual();}
function updateSummary(){const p=catalog[state.type],q=quote();const rows=[['Bolo',selectedModel?.title||p.label],['Tamanho',p.sizes[state.size][0]]];if(!p.flavors)rows.push(['Cobertura',coverApplied?(state.type==='baby'?'Pasta americana':state.type==='bento'?'Cobertura do bentô':state.cover):'Escolha na última etapa']);if(p.flavors)rows.push(['Sabor',state.flavor]);else rows.push(['Massa',state.mass],['Recheio',state.fillings.join(' + ')||'Escolha o recheio']);state.extras.forEach(i=>rows.push([extras[i][0],`+ ${money(extras[i][1])}`]));if(state.decor)rows.push(['Enfeites','Sob consulta']);$('#summary-lines').replaceChildren(...rows.map(([a,b])=>{let d=document.createElement('div');d.className='summary-line';let s=document.createElement('span');s.textContent=a;let t=document.createElement('strong');t.textContent=b;d.append(s,t);return d}));const price=q.unknown?'Sob consulta':money(q.total);const label=q.from?'A partir de':'Total estimado';$('#total').textContent=price;$('#mobile-total').textContent=price;$('#total-label').textContent=q.unknown?'Valor final':label;$('#mobile-label').textContent=q.unknown?'Valor final':label;$('#price-note').textContent=q.unknown?(q.nobleSelected?'Sabores nobres: valor do bolo sob consulta. Adicionais tabelados: '+money(q.add)+'.':'Base e adicionais tabelados: '+money(q.total)+'. Enfeites cobrados à parte.'):(q.from?'O valor varia conforme a complexidade da decoração.':'Decorações especiais e eventual entrega são confirmadas à parte.');}
document.addEventListener('click',e=>{let t=e.target.closest('button');if(!t)return;const d=t.dataset;if(d.filter){renderCatalog(d.filter);return}if(d.type){selectType(d.type);return}if(d.size!==undefined){startPreview();coverApplied=false;state.size=Number(d.size);if(state.size===0&&state.type==='decorated')state.cover='Acetato';state.fillings=state.fillings.slice(0,limit());render();}if(d.cover!==undefined){startPreview();coverApplied=true;interior=false;state.cover=(state.size===0?['Acetato']:['Chantininho','Acetato'])[Number(d.cover)];render();}if(d.mass!==undefined){startPreview();interior=true;state.mass=masses[Number(d.mass)];render();}if(d.noblemass!==undefined){startPreview();interior=true;state.mass=nobleMasses[Number(d.noblemass)];render();}if(d.photo){gallerySlide='photo';syncVisual();activePhoto=Number(d.photo);$('#photo-count').textContent=`${catalog[state.type].photos.indexOf(Number(d.photo))+1} / ${catalog[state.type].photos.length}`;$('#main-photo').src=`assets/cake-${Number(d.photo)}.jpg`;$('.photo-area').classList.remove('cutout');document.querySelectorAll('.thumb').forEach(x=>{const yes=x===t;x.classList.toggle('selected',yes);x.setAttribute('aria-pressed',String(yes))})}});
document.addEventListener('change',e=>{const t=e.target,d=t.dataset;if(d.filling){startPreview();interior=true;if(t.checked){if(limit()===1){state.fillings=[d.filling];document.querySelectorAll('[data-filling]').forEach(x=>x.checked=x===t)}else if(state.fillings.length>=limit()){t.checked=false;$('#filling-hint').textContent=`Este tamanho permite até ${limit()} sabores. Desmarque um para trocar.`;return}else state.fillings.push(d.filling)}else state.fillings=state.fillings.filter(x=>x!==d.filling);$('#filling-hint').textContent='';updateSummary();syncVisual()}if(d.extra!==undefined){const i=Number(d.extra);if(t.checked){if(i===4||i===5){state.extras=state.extras.filter(x=>x!==4&&x!==5);const other=document.querySelector(`[data-extra="${i===4?5:4}"]`);other.checked=false}state.extras.push(i)}else state.extras=state.extras.filter(x=>x!==i);updateSummary()}if(t.id==='decoration'){state.decor=t.checked;updateSummary()}if(t.id==='flavor'){state.flavor=t.value;updateSummary()}});
function composeMessage(){const p=catalog[state.type],q=quote(),dt=$('#date').value;return ['Olá, Nanda! Gostaria de consultar esta encomenda:',`Nome: ${$('#customer').value.trim()}`,`Data desejada: ${dt.split('-').reverse().join('/')}`,`Bolo: ${selectedModel?.title||p.label}`,`Tamanho: ${p.sizes[state.size][0]} (${p.sizes[state.size][1]})`,!p.flavors?`Cobertura: ${state.type==='baby'?'Pasta americana':state.type==='bento'?'Cobertura do bentô':state.cover}`:'',p.flavors?`Sabor: ${state.flavor}`:`Massa: ${state.mass}\nRecheio: ${state.fillings.join(' + ')}`,state.extras.length?'Adicionais: '+state.extras.map(i=>`${extras[i][0]} (${money(extras[i][1])})`).join(', '):'',state.decor?'Gostaria de topo ou enfeites especiais (sob consulta).':'',$('#notes').value.trim()?`Tema / observações: ${$('#notes').value.trim()}`:'',q.unknown?'Valor final sob consulta. '+(q.nobleSelected?'Sabores nobres sem preço tabelado. Adicionais: '+money(q.add):'Base e adicionais tabelados: '+money(q.total)):`${q.from?'A partir de':'Total estimado'}: ${money(q.total)}`,'Pode confirmar disponibilidade, decoração, valor final e como retirar ou receber?'].filter(Boolean).join('\n');}
$('#order').addEventListener('click',()=>{let err='';let focus;if(!catalog[state.type].flavors&&!state.fillings.length){err='Escolha pelo menos um recheio.';focus=$('[data-filling]')}else if(!$('#customer').value.trim()){err='Preencha seu nome para montar a mensagem.';focus=$('#customer')}else if(!$('#date').value||$('#date').value<$('#date').min){err='Escolha uma data a partir de hoje.';focus=$('#date')}$('#form-error').textContent=err;if(err){focus.focus();return}window.open(`https://wa.me/5577999998999?text=${encodeURIComponent(composeMessage())}`,'_blank','noopener,noreferrer');});
$('#view-order').addEventListener('click',()=>$('#summary').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
$('#expand-photo').addEventListener('click',()=>{$('#expanded-photo').src=`assets/cake-${activePhoto}.jpg`;$('#expanded-photo').alt=$('#main-photo').alt;$('#photo-dialog').showModal()});
$('#close-photo').addEventListener('click',()=>$('#photo-dialog').close());
$('#photo-dialog').addEventListener('click',e=>{if(e.target===$('#photo-dialog'))$('#photo-dialog').close()});

const cardMeta={
 decorated:{title:'Bolos decorados',subtitle:'Chantininho ou acetato',photo:238,price:26.9,note:'Mini cake em acetato',tag:'Do mini à festa'},
 baby:{title:'Baby cake',subtitle:'Em pasta americana',photo:551,price:95,note:'3 a 4 fatias · decoração à parte',tag:'Pequenas celebrações'},
 bento:{title:'Bentô cake',subtitle:'Com a sua mensagem',photo:663,price:40,note:'Escolha a massa e o recheio',tag:'Um presente doce'},
 pie:{title:'Tortas',subtitle:'15 sabores para compartilhar',price:90,note:'P, M e G · 6 a 30 pedaços',tag:'Para a mesa toda'},
 volcano:{title:'Bolos vulcão',subtitle:'12 sabores para escolher',price:22,note:'P, M e G · 3 a 20 pedaços',tag:'Para o café da tarde'}
};
let activeFilter='all';
const models=[
{id:'lacos',type:'decorated',photo:238,title:'Laços & delicadeza',subtitle:'Bolo decorado · inspiração',cover:'Chantininho'},
{id:'lua',type:'baby',photo:551,title:'Baby cake · Lua',subtitle:'Pasta americana · inspiração'},
{id:'mensagem',type:'bento',photo:663,title:'Bentô com mensagem',subtitle:'Uma frase do seu jeito'},
{id:'cerejas',type:'decorated',photo:244,title:'Vintage cerejas',subtitle:'Bolo decorado · inspiração',cover:'Chantininho'},
{id:'flores',type:'decorated',photo:237,title:'Flores & pinceladas',subtitle:'Bolo decorado · inspiração',cover:'Chantininho'},
{id:'mini',type:'decorated',photo:236,title:'Mini em camadas',subtitle:'Mini cake em acetato',cover:'Acetato',size:0},
{id:'chocolate',type:'decorated',photo:242,title:'Chocolate & morangos',subtitle:'Bolo em acetato · inspiração',cover:'Acetato'},
{id:'fazendinha',type:'baby',photo:552,title:'Baby cake · Fazendinha',subtitle:'Pasta americana · inspiração'},
{id:'super',type:'bento',photo:662,title:'Bentô super-herói',subtitle:'Personalize tema e mensagem'},
{id:'aranha',type:'bento',photo:664,title:'Bentô divertido',subtitle:'Uma pequena celebração'}];
for(const type of ['pie','volcano'])catalog[type].flavors.forEach((flavor,i)=>models.push({id:`${type}-${i}`,type,title:flavor,subtitle:type==='pie'?'Torta · escolha o tamanho':'Bolo vulcão · escolha o tamanho',flavor,sprite:i}));
function cardImage(p){if(p.photo)return `<img src="${displayPhoto(p.photo)}" alt="${p.title}, trabalho da Nanda Trufas" width="600" height="600" loading="lazy">`;return `<span class="flavor-sprite ${p.type}" style="--sx:${(p.sprite%4)*100/3}%;--sy:${Math.floor(p.sprite/4)*100/(p.type==='pie'?3:2)}%" role="img" aria-label="Ilustração de ${p.title}"></span>`;}
function renderCatalog(filter='all'){
 activeFilter=filter;
 $('#categories').innerHTML=[['all','Todos os bolos'],...Object.entries(catalog).map(([id,p])=>[id,p.label])].map(([id,label])=>`<button class="category ${id===filter?'active':''}" data-filter="${id}" aria-pressed="${id===filter}">${label}</button>`).join('');
 const entries=models.filter(p=>filter==='all'||p.type===filter);
 $('#product-cards').hidden=!entries.length;
 $('#product-cards').innerHTML=entries.map(p=>{const price=p.size===0?26.9:p.type==='decorated'?26.9:cardMeta[p.type].price;return `<button class="product-card" data-model="${p.id}" aria-label="Personalizar ${p.title}"><span class="card-base" aria-hidden="true"></span><div class="card-photo ${p.photo&&!cutouts[p.photo]?'real-photo':''}">${cardImage(p)}</div><div class="card-copy"><span class="card-tag">${catalog[p.type].label}</span><h3>${p.title}</h3><p>${p.subtitle}</p><div class="card-buy"><div><span>A partir de</span><strong>${money(price)}</strong></div><span class="card-add" aria-hidden="true">+</span></div><small>${p.photo?'Valor da base · decoração a confirmar':'Imagem ilustrativa · consulte acabamento'}</small></div></button>`}).join('');
 const others=Object.entries(cardMeta).filter(([id])=>['pie','volcano'].includes(id)&&(filter==='all'||filter===id));
 $('#more-products').hidden=true;
 $('#more-title').textContent='Mais sabores para a sua mesa';
 $('#secondary-products').innerHTML=others.map(([id,p])=>`<button class="secondary-card" data-type="${id}"><div><span>${p.tag}</span><h3>${p.title}</h3><p>${p.subtitle}</p></div><div class="secondary-price"><span>A partir de</span><strong>${money(p.price)}</strong><span class="secondary-arrow" aria-hidden="true">→</span></div></button>`).join('');
 $('#catalog-count').textContent=entries.length?`${entries.length} bolos e sabores para escolher`:'Escolha a categoria para ver os sabores';
}
function showDetail(updateHistory=true){
 $('#catalog-view').hidden=true;$('#detail-view').hidden=false;$('.mobile-bar').hidden=false;document.body.classList.add('detail-open');$('#form-error').textContent='';
 if(updateHistory){history.pushState({},'',`#bolo/${state.type}`);window.scrollTo({top:0,behavior:'instant'});$('#product-title').focus({preventScroll:true})}
 document.title=`${catalog[state.type].label} | Nanda Trufas`;
}
function showHome(updateHistory=true){
 $('#catalog-view').hidden=false;$('#detail-view').hidden=true;$('.mobile-bar').hidden=true;document.body.classList.remove('detail-open');document.title='Cardápio | Nanda Trufas';
 if(updateHistory){history.pushState({},'','#cardapio');$('#cardapio').scrollIntoView({behavior:'instant'});$('#categories button').focus({preventScroll:true})}
}
function syncRoute(){const type=location.hash.startsWith('#bolo/')?location.hash.slice(6):null;if(type&&Object.hasOwn(catalog,type)){if(state.type===type){render();showDetail(false)}else selectType(type,false)}else showHome(false)}
$('#back-menu').addEventListener('click',()=>showHome());
$('#menu-link').addEventListener('click',e=>{e.preventDefault();showHome()});
$('.brand').addEventListener('click',e=>{e.preventDefault();showHome();window.scrollTo({top:0,behavior:'instant'})});
window.addEventListener('popstate',syncRoute);
window.addEventListener('hashchange',syncRoute);
let selectedModel=null,previewStarted=false,coverApplied=false,interior=false,gallerySlide='photo';
const now=new Date();$('#date').min=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;

if(document.modelContext?.registerTool){const lifecycle=new AbortController();try{Promise.resolve(document.modelContext.registerTool({name:'start_cake_selection',description:'Seleciona a categoria de bolo e inicia sua configuração, sem enviar pedido.',inputSchema:{type:'object',properties:{type:{type:'string',enum:Object.keys(catalog)}},required:['type'],additionalProperties:false},annotations:{readOnlyHint:false},execute:input=>{if(!input||typeof input.type!=='string'||!Object.hasOwn(catalog,input.type))throw Error('Categoria inválida');selectType(input.type);return {type:state.type,quote:quote()}}},{signal:lifecycle.signal})).catch(()=>{});window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true})}catch{}}


// Montagem visual e navegação do cardápio
function startPreview(){previewStarted=true;gallerySlide='preview';}
function sprite(kind,style=''){return `<span class="cake-piece piece-${kind}" style="${style}" aria-hidden="true"></span>`;}
function syncVisual(){
 const product=catalog[state.type],hasPhoto=product.photos.length>0;
 if(!hasPhoto){if(selectedModel){$('#product-title').textContent=selectedModel.title;$('.gallery').hidden=false;$('.layout').classList.remove('no-photos');$('.gallery-tabs').hidden=true;$('#expand-photo').hidden=true;$('#thumbnails').hidden=true;$('.gallery-bottom').hidden=true;$('.photo-note').hidden=true;$('#cake-preview').hidden=false;$('#cake-stage').innerHTML=cardImage(selectedModel);$('#preview-status').textContent='Imagem ilustrativa';$('#preview-size').textContent=product.sizes[state.size][0];$('#preview-portions').textContent=product.sizes[state.size][1];$('#preview-legend').textContent=state.flavor;$('#toggle-interior').hidden=true;}return;}$('.gallery-tabs').hidden=false;
 if(selectedModel)$('#product-title').textContent=selectedModel.title;
 $('.gallery').hidden=false;
 $('#cake-preview').hidden=gallerySlide!=='preview';
 $('#expand-photo').hidden=gallerySlide!=='photo';
 $('#thumbnails').hidden=gallerySlide!=='photo';
 $('.gallery-bottom').hidden=gallerySlide!=='photo';
 $('.photo-note').hidden=gallerySlide!=='photo';
 $('#show-photo').setAttribute('aria-pressed',String(gallerySlide==='photo'));
 $('#show-preview').setAttribute('aria-pressed',String(gallerySlide==='preview'));
 const size=product.sizes[state.size];
 const cm=state.type==='decorated'?[8,10,15,15,20,30][state.size]:null;
 const scale=cm?0.53+cm/64:0.67;
 const short=state.type==='bento'||(state.type==='decorated'&&state.size<3);
 const layers=short?2:3;
 const mass=state.mass.includes('Chocolate')||state.mass==='Café'?1:state.mass==='Red velvet'?2:0;
 const fillings=state.fillings.length?state.fillings:[''];
 const fillingId=f=>/Brigadeiro/.test(f)?4:/Amendoim|Nozes|Ameixa|Damasco/.test(f)?5:3;
 const covered=coverApplied&&state.cover!=='Acetato'&&!interior;
 let pieces=sprite(8,'--bottom:7px;--z:0;--ph:66px;');
 if(covered){pieces+=sprite(state.type==='baby'?7:6,`--bottom:30px;--z:8;--ph:${short?170:245}px;`)}
 else{for(let n=0;n<layers;n++){
 pieces+=sprite(mass,`--bottom:${30+n*76}px;--z:${n*2+1};--ph:95px;`);
 if(n<layers-1&&state.fillings.length)pieces+=sprite(fillingId(fillings[n%fillings.length]),`--bottom:${90+n*76}px;--z:${n*2+2};--ph:38px;`);
 }}
 $('#cake-stage').innerHTML=`<div class="cake-assembly" style="--cake-scale:${Math.min(1,scale)}">${pieces}</div>`;
 $('#cake-stage').setAttribute('aria-label',`Simulação: ${size[0]}, massa ${state.mass}, recheio ${state.fillings.join(' e ')||'a escolher'}, ${covered?'com cobertura':'camadas visíveis'}`);
 $('#preview-size').textContent=cm?`${cm} cm de diâmetro`:size[0];
 $('#preview-portions').textContent=size[1];
 $('#preview-status').textContent=covered?'Com cobertura':coverApplied&&state.cover==='Acetato'?'Camadas à vista':'Por dentro';
 $('#preview-legend').replaceChildren(...[['Massa',state.mass],['Recheio',state.fillings.join(' + ')||'Escolha um sabor'],['Cobertura',coverApplied?(state.type==='baby'?'Pasta americana':state.type==='bento'?'Cobertura do bentô':state.cover):'Última etapa']].map(([a,b])=>{const d=document.createElement('div');const label=document.createElement('span');label.textContent=a;const strong=document.createElement('strong');strong.textContent=b;d.append(label,strong);return d}));
 $('#toggle-interior').hidden=!coverApplied||state.cover==='Acetato';
 $('#toggle-interior').textContent=interior?'Ver com cobertura':'Ver camadas por dentro';
}
function openModel(id,historyUpdate=true){
 const model=models.find(m=>m.id===id);if(!model)return;
 selectType(model.type,false);selectedModel=model;activePhoto=model.photo;
 if(model.size!==undefined)state.size=model.size;
 if(model.cover)state.cover=model.cover;if(model.flavor)state.flavor=model.flavor;
 render();showDetail(false);
 if(historyUpdate){history.pushState({},'',`#modelo/${model.id}`);window.scrollTo({top:0,behavior:'instant'});$('#product-title').focus({preventScroll:true});}
 document.title=`${model.title} | Nanda Trufas`;
}
const previousSyncRoute=syncRoute;
syncRoute=function(){if(location.hash.startsWith('#modelo/')){const id=location.hash.slice(8);if(models.some(m=>m.id===id)){openModel(id,false);return}}previousSyncRoute();};
// Original listeners use a function reference; handle model routes after them.
window.addEventListener('popstate',syncRoute);window.addEventListener('hashchange',syncRoute);
document.addEventListener('click',e=>{
 const model=e.target.closest('[data-model]');if(model){openModel(model.dataset.model);return}
 const finish=e.target.closest('[data-finish]');if(finish){startPreview();coverApplied=true;interior=false;render();}
});
$('#show-photo').addEventListener('click',()=>{gallerySlide='photo';syncVisual()});
$('#show-preview').addEventListener('click',()=>{startPreview();syncVisual()});
$('#toggle-interior').addEventListener('click',()=>{interior=!interior;syncVisual()});
let touchX=null;
$('.gallery').addEventListener('touchstart',e=>{touchX=e.touches[0].clientX},{passive:true});
$('.gallery').addEventListener('touchend',e=>{if(touchX===null)return;const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>70&&!e.target.closest('.thumbnails')){gallerySlide=dx<0?'preview':'photo';syncVisual()}touchX=null},{passive:true});
document.addEventListener('change',e=>{if(e.target.id==='flavor'){selectedModel=models.find(m=>m.type===state.type&&m.flavor===state.flavor)||selectedModel;syncVisual();updateSummary();}});
renderCatalog();syncRoute();

$("#order").addEventListener("click",e=>{if(!catalog[state.type].flavors&&!coverApplied){e.stopImmediatePropagation();$("#form-error").textContent="Escolha a cobertura na última etapa para continuar.";const field=$("[data-cover], [data-finish]");field?.scrollIntoView({behavior:"smooth",block:"center"});field?.focus();}},true);
