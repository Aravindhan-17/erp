/* =========================================================
   ERP FLASH DEAL — app.js
   Mock data + rendering + interactions (no backend).
========================================================= */
(function(){
'use strict';

const NOW = Date.now();
const MIN = 60*1000, HOUR = 60*MIN, DAY = 24*HOUR;

/* ---------------------------------------------------------
   DATA
--------------------------------------------------------- */
const IMG = {
  electronics1:'assets/electronics1.jpg',
  electronics2:'assets/electronics2.jpg',
  electronics3:'assets/electronics3.jpg',
  appliance1:'assets/appliance1.jpg',
  appliance2:'assets/appliance2.jpg',
  fashion1:'assets/fashion1.jpg',
  fashion2:'assets/fashion2.jpg',
  furniture1:'assets/furniture1.jpg',
  furniture2:'assets/furniture2.jpg',
  beauty1:'assets/beauty1.jpg',
  sports1:'assets/sports1.jpg',
  office1:'assets/office1.jpg',
  accessories1:'assets/accessories1.jpg',
  deal_elec:'assets/deal_elec.jpg',
  deal_fashion:'assets/deal_fashion.jpg',
  deal_furniture:'assets/deal_furniture.jpg',
  deal_beauty:'assets/deal_beauty.jpg',
  deal_office:'assets/deal_office.jpg',
  deal_home:'assets/deal_home.jpg',
};

const CATEGORIES = [
  {name:'Electronics', icon:'💻', count:48},
  {name:'Home Appliances', icon:'🧊', count:31},
  {name:'Fashion', icon:'👗', count:64},
  {name:'Furniture', icon:'🛋️', count:22},
  {name:'Beauty', icon:'💄', count:37},
  {name:'Sports', icon:'🏸', count:19},
  {name:'Office Equipment', icon:'🖇️', count:15},
  {name:'Accessories', icon:'⌚', count:28},
];

const PRODUCTS = [
  {id:'P1', name:'UltraSound 65" 4K Smart TV', sku:'ELEC-TV-065', category:'Electronics', img:IMG.electronics1, mrp:89999, price:52999, opening:40, sold:26, reserved:4, maxQty:1, alertAt:8},
  {id:'P2', name:'AirPure Noise-Cancel Headphones', sku:'ELEC-HP-021', category:'Electronics', img:IMG.electronics2, mrp:12999, price:5499, opening:120, sold:88, reserved:12, maxQty:2, alertAt:20},
  {id:'P3', name:'FlexBook 14" Ultraslim Laptop', sku:'ELEC-LP-014', category:'Electronics', img:IMG.electronics3, mrp:64999, price:41999, opening:25, sold:21, reserved:3, maxQty:1, alertAt:5},
  {id:'P4', name:'ChillMax 260L Frost-Free Fridge', sku:'APP-FR-260', category:'Home Appliances', img:IMG.appliance1, mrp:34999, price:22499, opening:18, sold:9, reserved:2, maxQty:1, alertAt:5},
  {id:'P5', name:'SpinPro 8kg Front-Load Washer', sku:'APP-WM-008', category:'Home Appliances', img:IMG.appliance2, mrp:28999, price:18999, opening:16, sold:14, reserved:1, maxQty:1, alertAt:4},
  {id:'P6', name:'Linen Weekend Shirt (Pack of 2)', sku:'FSH-SH-102', category:'Fashion', img:IMG.fashion1, mrp:2499, price:999, opening:200, sold:140, reserved:18, maxQty:3, alertAt:30},
  {id:'P7', name:'StrideFit Running Sneakers', sku:'FSH-SN-045', category:'Fashion', img:IMG.fashion2, mrp:4999, price:2199, opening:90, sold:61, reserved:9, maxQty:2, alertAt:15},
  {id:'P8', name:'Nordic Oak 3-Seater Sofa', sku:'FUR-SF-301', category:'Furniture', img:IMG.furniture1, mrp:54999, price:36999, opening:10, sold:4, reserved:1, maxQty:1, alertAt:3},
  {id:'P9', name:'Study Desk with Storage', sku:'FUR-DS-118', category:'Furniture', img:IMG.furniture2, mrp:11999, price:6999, opening:35, sold:12, reserved:2, maxQty:2, alertAt:8},
  {id:'P10', name:'GlowLab Vitamin C Serum Kit', sku:'BEA-SK-009', category:'Beauty', img:IMG.beauty1, mrp:1999, price:899, opening:150, sold:97, reserved:14, maxQty:3, alertAt:25},
  {id:'P11', name:'ProCourt Badminton Racket Set', sku:'SPT-BD-012', category:'Sports', img:IMG.sports1, mrp:3499, price:1699, opening:60, sold:33, reserved:5, maxQty:2, alertAt:10},
  {id:'P12', name:'ErgoFlex Mesh Office Chair', sku:'OFF-CH-077', category:'Office Equipment', img:IMG.office1, mrp:9999, price:5999, opening:22, sold:8, reserved:2, maxQty:1, alertAt:6},
  {id:'P13', name:'TimeKeeper Chrono Watch', sku:'ACC-WT-033', category:'Accessories', img:IMG.accessories1, mrp:5999, price:2799, opening:70, sold:41, reserved:6, maxQty:2, alertAt:12},
];
const productById = id => PRODUCTS.find(p=>p.id===id);

const DEFAULT_TERMS = 'Minimum order value of \u20B95,000, or 2 products totalling \u20B95,000, is required to checkout. Cart items are reserved for 10 minutes only; unpaid reservations are automatically released back to deal inventory. Registration fee is non-refundable and grants access to this deal only. Maximum quantity per customer applies per product, as shown on each listing.';

const DEALS = [
  {
    id:'D1', title:'Monsoon Electronics Sale', subtitle:'Up to 55% off TVs, laptops &amp; audio', status:'live',
    startsAt: NOW - 2*HOUR, endsAt: NOW + 2*HOUR + 34*MIN + 18*1000,
    banner:IMG.deal_elec, fee:1, minValue:5000, minQty:2, reserveMinutes:10, maxQtyPerCustomer:2, terms:DEFAULT_TERMS,
    productIds:['P1','P2','P3'], registered:1842, orders:611, revenue:2148000
  },
  {
    id:'D2', title:'Fashion Weekend Flash', subtitle:'Buy 2 or more, save up to 60%', status:'soon',
    startsAt: NOW + 15*MIN, endsAt: NOW + 15*MIN + 8*HOUR,
    banner:IMG.deal_fashion, fee:1, minValue:3000, minQty:2, reserveMinutes:10, maxQtyPerCustomer:3, terms:DEFAULT_TERMS,
    productIds:['P6','P7'], registered:963, orders:0, revenue:0
  },
  {
    id:'D3', title:'Nordic Living Furniture Drop', subtitle:'Statement furniture at flash prices', status:'upcoming',
    startsAt: NOW + 26*HOUR, endsAt: NOW + 34*HOUR,
    banner:IMG.deal_furniture, fee:1, minValue:8000, minQty:1, reserveMinutes:10, maxQtyPerCustomer:1, terms:DEFAULT_TERMS,
    productIds:['P8','P9'], registered:402, orders:0, revenue:0
  },
  {
    id:'D4', title:'Beauty Box Blitz', subtitle:'Skincare &amp; wellness, flash-priced', status:'upcoming',
    startsAt: NOW + 3*DAY, endsAt: NOW + 3*DAY + 6*HOUR,
    banner:IMG.deal_beauty, fee:1, minValue:2000, minQty:2, reserveMinutes:10, maxQtyPerCustomer:3, terms:DEFAULT_TERMS,
    productIds:['P10','P13'], registered:118, orders:0, revenue:0
  },
  {
    id:'D5', title:'Office Essentials Clearance', subtitle:'Chairs, desks &amp; workspace gear', status:'ended',
    startsAt: NOW - 30*HOUR, endsAt: NOW - 5*HOUR,
    banner:IMG.deal_office, fee:1, minValue:4000, minQty:1, reserveMinutes:10, maxQtyPerCustomer:2, terms:DEFAULT_TERMS,
    productIds:['P12','P11'], registered:754, orders:288, revenue:1382000
  },
  {
    id:'D6', title:'Sports Gear Rush', subtitle:'Draft — pending final review', status:'draft',
    startsAt: NOW + 6*DAY, endsAt: NOW + 6*DAY + 5*HOUR,
    banner:IMG.deal_office, fee:1, minValue:3000, minQty:1, reserveMinutes:10, maxQtyPerCustomer:2, terms:DEFAULT_TERMS,
    productIds:['P11'], registered:0, orders:0, revenue:0
  },
];
const dealById = id => DEALS.find(d=>d.id===id);

const ORDERS = [
  {id:'FD-88192', customer:'Aarav Ramesh', email:'aarav@example.com', dealId:'D5', products:'ErgoFlex Mesh Office Chair', lineItems:[{productId:'P12',qty:1,price:5999}], value:5999, payment:'Paid', paymentMethod:'UPI', status:'Delivered', date:'02 Aug, 16:20', address:'12, Lake View Apartments, 4th Cross Street, Chennai 600028', timeline:[{label:'Order placed',time:'02 Aug, 16:20',done:true},{label:'Payment confirmed',time:'02 Aug, 16:21',done:true},{label:'Shipped',time:'03 Aug, 09:10',done:true},{label:'Delivered',time:'04 Aug, 11:35',done:true}]},
  {id:'FD-88231', customer:'Meera Iyer', dealId:'D1', products:'UltraSound TV', value:52999, payment:'Paid', status:'Confirmed', date:'20 Jul, 11:42'},
  {id:'FD-88230', customer:'Rohan Das', dealId:'D1', products:'AirPure Headphones ×2', value:10998, payment:'Paid', status:'Shipped', date:'20 Jul, 11:20'},
  {id:'FD-88229', customer:'Priya Nair', dealId:'D5', products:'ErgoFlex Chair', value:5999, payment:'Paid', status:'Delivered', date:'19 Jul, 18:05'},
  {id:'FD-88228', customer:'Kabir Sen', dealId:'D1', products:'FlexBook Laptop', value:41999, payment:'Pending', status:'Payment Pending', date:'20 Jul, 12:01'},
  {id:'FD-88227', customer:'Ananya Rao', dealId:'D5', products:'Badminton Set ×2', value:3398, payment:'Paid', status:'Cancelled', date:'19 Jul, 15:33'},
  {id:'FD-88226', customer:'Vikram Shah', dealId:'D1', products:'AirPure Headphones', value:5499, payment:'Refunded', status:'Refunded', date:'19 Jul, 09:14'},
  {id:'FD-88225', customer:'Divya Menon', dealId:'D5', products:'ErgoFlex Chair, Racket Set', value:7698, payment:'Paid', status:'Processing', date:'19 Jul, 08:52'},
];

const REGISTRATIONS = [
  {id:'REG-24081', customer:'Aarav Ramesh', customerEmail:'aarav@example.com', dealId:'D2', fee:1, payment:'Paid', access:'Unused', registeredAt:'04 Aug, 12:12', transaction:'UPI-704128'},
  {id:'REG-24080', customer:'Meera Iyer', customerEmail:'meera@example.com', dealId:'D1', fee:1, payment:'Paid', access:'Access used', registeredAt:'04 Aug, 11:58', transaction:'UPI-704109'},
  {id:'REG-24079', customer:'Rohan Das', customerEmail:'rohan@example.com', dealId:'D1', fee:1, payment:'Paid', access:'Access used', registeredAt:'04 Aug, 11:44', transaction:'CARD-904512'},
  {id:'REG-24078', customer:'Priya Nair', customerEmail:'priya@example.com', dealId:'D3', fee:1, payment:'Paid', access:'Unused', registeredAt:'04 Aug, 10:32', transaction:'UPI-703981'},
  {id:'REG-24077', customer:'Kabir Sen', customerEmail:'kabir@example.com', dealId:'D1', fee:1, payment:'Refunded', access:'Revoked', registeredAt:'04 Aug, 09:48', transaction:'WALLET-55210'},
  {id:'REG-24076', customer:'Ananya Rao', customerEmail:'ananya@example.com', dealId:'D4', fee:1, payment:'Paid', access:'Unused', registeredAt:'03 Aug, 19:04', transaction:'UPI-703210'},
];

const CUSTOMERS = [
  {id:'CUS-1001',name:'Aarav Ramesh',email:'aarav@example.com',phone:'+91 98765 43210',segment:'Active',status:'Active',joined:'12 Mar 2026',lastActivity:'04 Aug, 12:12'},
  {id:'CUS-1002',name:'Meera Iyer',email:'meera@example.com',phone:'+91 98401 11220',segment:'VIP',status:'Active',joined:'08 Jan 2026',lastActivity:'04 Aug, 11:58'},
  {id:'CUS-1003',name:'Rohan Das',email:'rohan@example.com',phone:'+91 99030 88441',segment:'VIP',status:'Active',joined:'19 Feb 2026',lastActivity:'04 Aug, 11:44'},
  {id:'CUS-1004',name:'Priya Nair',email:'priya@example.com',phone:'+91 98470 33121',segment:'Active',status:'Active',joined:'23 Apr 2026',lastActivity:'04 Aug, 10:32'},
  {id:'CUS-1005',name:'Kabir Sen',email:'kabir@example.com',phone:'+91 98300 11882',segment:'Active',status:'Review',joined:'04 May 2026',lastActivity:'04 Aug, 09:48'},
  {id:'CUS-1006',name:'Ananya Rao',email:'ananya@example.com',phone:'+91 98860 44210',segment:'New',status:'Active',joined:'29 Jul 2026',lastActivity:'03 Aug, 19:04'},
];

const ADDRESSES = [
  {id:'A1',label:'Home',phone:'+91 98765 43210',line:'12, Lake View Apartments, 4th Cross Street',city:'Chennai',pin:'600028',isDefault:true},
  {id:'A2',label:'Work',phone:'+91 98765 43210',line:'4th Floor, Orion Business Park, Guindy',city:'Chennai',pin:'600032',isDefault:false},
];

const ACTIVITY = [
  {t:'2s ago', kind:'order', txt:'Rohan Das placed order FD-88230 · ₹10,998'},
  {t:'18s ago', kind:'reserve', txt:'Cart reserved — AirPure Headphones ×2 (Meera Iyer)'},
  {t:'40s ago', kind:'register', txt:'New registration for Monsoon Electronics Sale'},
  {t:'1m ago', kind:'expire', txt:'Cart expired — 1 UltraSound TV returned to inventory'},
  {t:'2m ago', kind:'stock', txt:'FlexBook Laptop stock updated — 25 units available'},
  {t:'3m ago', kind:'order', txt:'Kabir Sen placed order FD-88228 · ₹41,999'},
  {t:'4m ago', kind:'register', txt:'New registration for Monsoon Electronics Sale'},
  {t:'6m ago', kind:'reserve', txt:'Cart reserved — FlexBook Laptop (guest_2291)'},
];

/* ---------------------------------------------------------
   PERSISTENCE
   Keeps admin/customer changes (new deals, products, orders,
   registrations) across a page refresh. The ONLY thing that
   clears this is the "Reset Platform Data" action in admin.
--------------------------------------------------------- */
const STORAGE_KEY = 'erpFlashDeal_state_v1';
// Which app/page was on screen — restored on refresh so the user lands back
// where they were instead of bouncing to the customer home page.
let restoredUI = {app:'customer', customerPage:'home', adminPage:'dashboard', currentDealId:'D1'};
function saveState(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      DEALS, PRODUCTS, ORDERS, REGISTRATIONS, CUSTOMERS, ADDRESSES, registered:[...state.registered],
      ui:{ app:currentApp, customerPage:currentCustomerPage, adminPage:currentAdminPage, currentDealId: state.currentDealId }
    }));
  }catch(e){ console.warn('Could not save platform state', e); }
}
function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return;
    const saved = JSON.parse(raw);
    if(Array.isArray(saved.PRODUCTS)){ PRODUCTS.length=0; saved.PRODUCTS.forEach(p=>PRODUCTS.push(p)); }
    if(Array.isArray(saved.DEALS)){ DEALS.length=0; saved.DEALS.forEach(d=>DEALS.push(d)); }
    if(Array.isArray(saved.ORDERS)){ ORDERS.length=0; saved.ORDERS.forEach(o=>ORDERS.push(o)); }
    if(Array.isArray(saved.REGISTRATIONS)){ REGISTRATIONS.length=0; saved.REGISTRATIONS.forEach(r=>REGISTRATIONS.push(r)); }
    if(Array.isArray(saved.CUSTOMERS)){ CUSTOMERS.length=0; saved.CUSTOMERS.forEach(c=>CUSTOMERS.push(c)); }
    if(Array.isArray(saved.ADDRESSES)){ ADDRESSES.length=0; saved.ADDRESSES.forEach(a=>ADDRESSES.push(a)); }
    if(Array.isArray(saved.registered)) saved.registered.forEach(id=>state.registered.add(id));
    if(saved.ui){
      restoredUI = Object.assign({}, restoredUI, saved.ui);
      if(saved.ui.currentDealId) state.currentDealId = saved.ui.currentDealId;
    }
  }catch(e){ console.warn('Could not load saved platform state', e); }
}

/* ---------------------------------------------------------
   STATE
--------------------------------------------------------- */
const state = {
  registered: new Set(['D2']),
  cart: [],            // {productId, dealId, qty}
  cartDealId: null,
  reservationEndsAt: null,
  currentDealId: 'D1',
  cstep: 1,
  previewMode: 'desktop',
  newDealProducts: ['P1','P2'],
  lastOrder: null,
  editingProductId: null,
  deletingProductId: null,
  editingInventoryId: null,
  editingDealId: null,
};
loadState();

/* ---------------------------------------------------------
   UTILS
--------------------------------------------------------- */
const pad = n => String(n).padStart(2,'0');
const money = n => '₹' + Math.round(n).toLocaleString('en-IN');
function timeParts(ms){
  if(ms<0) ms=0;
  const s=Math.floor(ms/1000)%60, m=Math.floor(ms/60000)%60, h=Math.floor(ms/3600000)%24, d=Math.floor(ms/86400000);
  return {d,h,m,s};
}
function el(html){ const t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstElementChild; }
function toDatetimeLocal(date){
  const p2 = n => String(n).padStart(2,'0');
  return `${date.getFullYear()}-${p2(date.getMonth()+1)}-${p2(date.getDate())}T${p2(date.getHours())}:${p2(date.getMinutes())}`;
}
function $(sel,root){ return (root||document).querySelector(sel); }
function $all(sel,root){ return Array.from((root||document).querySelectorAll(sel)); }

function dealStatusLabel(status){
  return {live:'LIVE NOW', soon:'STARTING SOON', upcoming:'UPCOMING', ended:'ENDED', draft:'DRAFT'}[status] || status;
}
function dealTargetTime(deal){
  return (deal.status==='live') ? deal.endsAt : deal.startsAt;
}

/* ---------------------------------------------------------
   DEAL STATUS — recomputed continuously from the clock.
   A deal's status is never a fixed label; it is always derived
   from startsAt/endsAt vs. the current time (drafts are the only
   manual exception — an admin keeps a deal in draft on purpose).
--------------------------------------------------------- */
const SOON_THRESHOLD = HOUR; // deals starting within 1 hour show as "starting soon"
function computeDealStatus(deal){
  if(deal.status==='draft') return 'draft';
  const now = Date.now();
  if(now >= deal.endsAt) return 'ended';
  if(now >= deal.startsAt) return 'live';
  if(deal.startsAt - now <= SOON_THRESHOLD) return 'soon';
  return 'upcoming';
}
function refreshDealStatuses(){
  let changed = false;
  DEALS.forEach(deal=>{
    const next = computeDealStatus(deal);
    if(deal.status !== next){ deal.status = next; changed = true; }
  });
  if(changed){
    saveState();
    renderDealGrid();
    renderHero();
    renderDealDetail();
    renderAdminDealsTable();
    renderKPIs();
    renderDashActiveDeals();
    renderMonitor();
  }
  return changed;
}

/* ---------------------------------------------------------
   CUSTOMER: HERO
--------------------------------------------------------- */
let heroIndex = 0;
let heroDeals = [];
function computeHeroDeals(){ heroDeals = DEALS.filter(d=>d.status!=='ended' && d.status!=='draft'); }

function renderHero(){
  computeHeroDeals();
  if(heroIndex>=heroDeals.length) heroIndex=0;
  const track = $('#hero-track'); const dots = $('#hero-dots');
  track.innerHTML=''; dots.innerHTML='';
  heroDeals.forEach((deal,i)=>{
    const cta = deal.status==='live' ? 'Shop now' : (deal.status==='soon' ? 'Register for ₹1' : 'Register for ₹1');
    const slide = el(`
      <div class="hero-slide">
        <div class="container" style="display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center;">
          <div class="hero-copy">
            <div class="hero-status ${deal.status==='live'?'live':'soon'}"><span class="pulse"></span>${dealStatusLabel(deal.status)}</div>
            <h1 class="hero-title">${deal.title}</h1>
            <p class="hero-sub">${deal.subtitle}</p>
            <div class="hero-meta">
              <div class="hero-meta-item"><div class="label">Registration</div><div class="val">₹${deal.fee}</div></div>
              <div class="hero-meta-item"><div class="label">Min. order</div><div class="val">${money(deal.minValue)}</div></div>
              <div class="hero-meta-item"><div class="label">Products</div><div class="val">${deal.productIds.length} items</div></div>
            </div>
            <div class="hero-cta">
              <button class="btn btn-amber hero-open-deal" data-deal="${deal.id}">${cta}</button>
              <button class="btn btn-ghost-light hero-open-deal" data-deal="${deal.id}">View deal</button>
            </div>
          </div>
          <div class="hero-visual">
            <div class="hero-card">
              <img src="${deal.banner}" alt="${deal.title}">
              <div class="board" data-countdown="${dealTargetTime(deal)}">
                <div class="flip"><div class="n" data-unit="d">00</div><div class="u">Days</div></div>
                <div class="flip"><div class="n" data-unit="h">00</div><div class="u">Hrs</div></div>
                <div class="flip"><div class="n" data-unit="m">00</div><div class="u">Min</div></div>
                <div class="flip"><div class="n" data-unit="s">00</div><div class="u">Sec</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>`);
    track.appendChild(slide);
    const dot = el(`<button class="${i===0?'active':''}" data-i="${i}"></button>`);
    dot.addEventListener('click', ()=>{ heroIndex=i; updateHeroPosition(); });
    dots.appendChild(dot);
  });
  updateHeroPosition();
}
function updateHeroPosition(){
  $('#hero-track').style.transform = `translateX(-${heroIndex*100}%)`;
  $all('#hero-dots button').forEach((b,i)=>b.classList.toggle('active', i===heroIndex));
}
setInterval(()=>{ if(heroDeals.length){ heroIndex=(heroIndex+1)%heroDeals.length; updateHeroPosition(); } }, 5500);

/* ---------------------------------------------------------
   CUSTOMER: CATEGORIES
--------------------------------------------------------- */
function renderCategories(){
  const grid = $('#cat-grid'); grid.innerHTML='';
  CATEGORIES.forEach(c=>{
    grid.appendChild(el(`
      <div class="cat-card">
        <div class="cat-icon">${c.icon}</div>
        <h4>${c.name}</h4>
        <div class="count">${c.count} products</div>
        <div class="go">Explore category →</div>
      </div>`));
  });
}

/* ---------------------------------------------------------
   CUSTOMER: DEAL GRID
--------------------------------------------------------- */
let dealFilter = 'all';
function renderDealGrid(){
  const grid = $('#deal-grid'); grid.innerHTML='';
  const list = DEALS.filter(d=>d.status!=='draft').filter(d=> dealFilter==='all' ? true : d.status===dealFilter);
  if(!list.length){
    grid.appendChild(el(`<div class="empty-state" style="grid-column:1/-1;"><div class="ic">🗂️</div><p>No deals match this filter right now.</p></div>`));
    return;
  }
  list.forEach(deal=>{
    const badgeClass = deal.status;
    const card = el(`
      <div class="deal-card" data-deal="${deal.id}">
        <div class="deal-banner">
          <img src="${deal.banner}" alt="${deal.title}">
          <span class="deal-status-badge ${badgeClass}">${deal.status==='live'||deal.status==='soon'?'<span class="pulse"></span>':''}${dealStatusLabel(deal.status)}</span>
        </div>
        <div class="deal-body">
          <h4>${deal.title}</h4>
          <div class="sub">${deal.subtitle}</div>
          ${deal.status!=='ended' ? `
          <div class="countdown-row" data-countdown="${dealTargetTime(deal)}">
            <div class="c" data-unit="h">00h</div><div class="c" data-unit="m">00m</div><div class="c" data-unit="s">00s</div>
          </div>` : `<div class="countdown-row"><div class="c" style="background:var(--line-soft);color:var(--ink-faint);">Deal ended</div></div>`}
          <div class="deal-facts">
            <span>${deal.productIds.length} products</span><span>Reg ₹${deal.fee}</span><span>Min ${money(deal.minValue)}</span>
          </div>
          <div class="deal-actions">
            <button class="btn btn-primary btn-sm btn-block open-deal-btn" data-deal="${deal.id}">${deal.status==='ended'?'View results':'View deal'}</button>
          </div>
        </div>
      </div>`);
    grid.appendChild(card);
  });
}
$('#deal-filter-tabs').addEventListener('click', e=>{
  const b=e.target.closest('button'); if(!b) return;
  $all('#deal-filter-tabs button').forEach(x=>x.classList.remove('active')); b.classList.add('active');
  dealFilter = b.dataset.filter; renderDealGrid();
});
document.addEventListener('click', e=>{
  const t = e.target.closest('.open-deal-btn, .deal-card, .hero-open-deal');
  if(t){ const id = t.dataset.deal; if(id){ openDeal(id); } }
});

/* ---------------------------------------------------------
   CUSTOMER: DEAL DETAIL
--------------------------------------------------------- */
function openDeal(dealId){
  state.currentDealId = dealId;
  renderDealDetail();
  navigateCustomer('deal');
  window.scrollTo({top:0,behavior:'smooth'});
}
function renderDealDetail(){
  const deal = dealById(state.currentDealId); if(!deal) return;
  $('#crumb-deal-title').textContent = deal.title;
  $('#deal-hero-img').src = deal.banner;
  $('#deal-hero-title').textContent = deal.title;
  $('#deal-hero-sub').innerHTML = deal.subtitle;
  const badge = $('#deal-hero-badge');
  badge.className = 'deal-status-badge ' + deal.status;
  badge.innerHTML = (deal.status==='live'||deal.status==='soon' ? '<span class="pulse"></span>' : '') + dealStatusLabel(deal.status);

  $('#deal-info-list').innerHTML = `
    <div class="item"><div class="k">Registration fee</div><div class="v">₹${deal.fee}</div></div>
    <div class="item"><div class="k">Minimum order</div><div class="v">${money(deal.minValue)}</div></div>
    <div class="item"><div class="k">Min. products</div><div class="v">${deal.minQty} items</div></div>
    <div class="item"><div class="k">Cart reservation</div><div class="v">${deal.reserveMinutes} minutes</div></div>
    <div class="item"><div class="k">Max qty / customer</div><div class="v">${deal.maxQtyPerCustomer} per product</div></div>
    <div class="item"><div class="k">Deal window</div><div class="v">${new Date(deal.startsAt).toLocaleString('en-IN',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})} – ${new Date(deal.endsAt).toLocaleString('en-IN',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}</div></div>
  `;

  $('#deal-terms').innerHTML = `<p>${(deal.terms || 'No terms have been added for this deal yet.').replace(/\n+/g,'</p><p>')}</p>`;

  const grid = $('#deal-product-grid'); grid.innerHTML='';
  deal.productIds.map(productById).forEach(p=>{
    const available = p.opening - p.sold - p.reserved;
    const low = available <= p.alertAt;
    const canBuy = deal.status==='live' && state.registered.has(deal.id) && available>0;
    grid.appendChild(el(`
      <div class="product-card">
        <div class="product-img"><img src="${p.img}" alt="${p.name}"></div>
        <div class="product-body">
          <div class="cat">${p.category}</div>
          <h5>${p.name}</h5>
          <div class="price-row"><span class="mrp">${money(p.mrp)}</span><span class="now">${money(p.price)}</span><span class="off">${Math.round((1-p.price/p.mrp)*100)}% off</span></div>
          <div class="stock-line ${low?'low':''}">${available>0? available+' left in deal stock' : 'Out of stock'}</div>
          <div class="qty-max">Max ${p.maxQty} per customer</div>
          <button class="btn btn-sm btn-block ${canBuy?'btn-primary':'btn-ghost'} add-cart-btn" data-product="${p.id}" ${canBuy?'':'disabled'}>
            ${deal.status!=='live' ? 'Deal not live yet' : (!state.registered.has(deal.id) ? 'Register to unlock' : (available<=0?'Out of stock':'Add to cart'))}
          </button>
        </div>
      </div>`));
  });

  renderRegPanel();
}
function renderRegPanel(){
  const deal = dealById(state.currentDealId);
  const panel = $('#reg-panel');
  if(state.registered.has(deal.id)){
    panel.classList.add('registered');
    panel.innerHTML = `
      <div class="eyebrow" style="color:rgba(255,255,255,.85);">Registered ✓</div>
      <div class="amt" style="font-size:22px;">You're in!</div>
      <p>You're eligible to shop this deal${deal.status!=='live' ? ' the moment it goes live.' : ' right now.'}</p>
      ${deal.status!=='live' ? `<div class="board" data-countdown="${deal.startsAt}">
        <div class="flip"><div class="n" data-unit="d">0</div><div class="u">Day</div></div>
        <div class="flip"><div class="n" data-unit="h">0</div><div class="u">Hr</div></div>
        <div class="flip"><div class="n" data-unit="m">0</div><div class="u">Min</div></div>
        <div class="flip"><div class="n" data-unit="s">0</div><div class="u">Sec</div></div>
      </div>` : `<button class="btn btn-amber btn-block" onclick="document.getElementById('deal-product-grid').scrollIntoView({behavior:'smooth'})">Shop the deal</button>`}
    `;
  } else {
    panel.classList.remove('registered');
    panel.innerHTML = `
      <div class="eyebrow" style="color:rgba(255,255,255,.8);">Registration</div>
      <div class="amt">₹${deal.fee}</div>
      <p>Register once to unlock this flash deal. You'll be notified the instant it goes live.</p>
      <button class="btn btn-amber btn-block" id="btn-register">Register for ₹${deal.fee}</button>
    `;
  }
}
document.addEventListener('click', e=>{
  if(e.target.id==='btn-register'){
    openRegistrationFlow(state.currentDealId);
  }
  if(e.target.closest('#btn-close-register')){
    closeModal('modal-register'); renderDealDetail(); renderDealGrid();
  }
  const addBtn = e.target.closest('.add-cart-btn');
  if(addBtn && !addBtn.disabled){ addToCart(addBtn.dataset.product); }
});

/* ---------------------------------------------------------
   CUSTOMER: HEADER SEARCH
--------------------------------------------------------- */
function renderSearchResults(q){
  q = q.trim().toLowerCase();
  const box = $('#search-results');
  if(!q){ box.innerHTML = `<p style="font-size:13px;color:var(--ink-faint);padding:14px 0;">Start typing to search deals and products.</p>`; return; }
  const deals = DEALS.filter(d=> d.status!=='draft' && d.title.toLowerCase().includes(q));
  const products = PRODUCTS.filter(p=> p.name.toLowerCase().includes(q));
  if(!deals.length && !products.length){ box.innerHTML = `<p style="font-size:13px;color:var(--ink-faint);padding:14px 0;">No results for "${q}".</p>`; return; }
  const dealRows = deals.map(d=>`
    <div class="search-result-row" data-deal="${d.id}" style="display:flex;align-items:center;gap:10px;padding:8px 4px;cursor:pointer;border-radius:8px;">
      <img src="${d.banner}" style="width:40px;height:40px;border-radius:8px;object-fit:cover;">
      <div><div style="font-size:13px;font-weight:600;">${d.title}</div><div style="font-size:11.5px;color:var(--ink-faint);">${dealStatusLabel(d.status)}</div></div>
    </div>`).join('');
  const productRows = products.map(p=>{
    const deal = DEALS.find(d=> d.status!=='draft' && d.productIds.includes(p.id));
    return `<div class="search-result-row" data-deal="${deal?deal.id:''}" style="display:flex;align-items:center;gap:10px;padding:8px 4px;cursor:${deal?'pointer':'default'};border-radius:8px;">
      <img src="${p.img}" style="width:40px;height:40px;border-radius:8px;object-fit:cover;">
      <div><div style="font-size:13px;font-weight:600;">${p.name}</div><div style="font-size:11.5px;color:var(--ink-faint);">${money(p.price)} · ${p.category}${deal?'':' · not in an active deal'}</div></div>
    </div>`;
  }).join('');
  box.innerHTML =
    (deals.length? `<p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--ink-faint);margin:10px 4px 4px;">Deals</p>${dealRows}` : '') +
    (products.length? `<p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--ink-faint);margin:14px 4px 4px;">Products</p>${productRows}` : '');
}
$('#btn-search-icon').addEventListener('click', ()=>{
  $('#search-input').value=''; renderSearchResults(''); openModal('modal-search');
  setTimeout(()=> $('#search-input').focus(), 50);
});
$('#btn-close-search').addEventListener('click', ()=> closeModal('modal-search'));
$('#search-input').addEventListener('input', e=> renderSearchResults(e.target.value));
document.addEventListener('click', e=>{
  const row = e.target.closest('.search-result-row');
  if(row && row.dataset.deal){ closeModal('modal-search'); openDeal(row.dataset.deal); }
});

/* ---------------------------------------------------------
   CUSTOMER: HEADER NOTIFICATIONS
--------------------------------------------------------- */
const NOTIFICATIONS = [
  {t:'2 min ago', txt:'Fashion Weekend Flash starts in 15 minutes — get registered to unlock it in time.'},
  {t:'1 hour ago', txt:'Your registration for Monsoon Electronics Sale is confirmed. Shop now while it\u2019s live.'},
  {t:'3 hours ago', txt:'Price drop: AirPure Noise-Cancel Headphones now ₹5,499, down from ₹12,999.'},
];
$('#btn-notif-icon').addEventListener('click', ()=>{
  $('#notif-list').innerHTML = NOTIFICATIONS.map(n=>`
    <div style="padding:12px 2px;border-bottom:1px solid var(--line-soft);">
      <div style="font-size:13px;line-height:1.5;">${n.txt}</div>
      <div style="font-size:11.5px;color:var(--ink-faint);margin-top:4px;">${n.t}</div>
    </div>`).join('');
  openModal('modal-notifications');
});
$('#btn-close-notif').addEventListener('click', ()=> closeModal('modal-notifications'));
$('#btn-mark-read').addEventListener('click', ()=>{
  const badge = $('#header-notif-badge'); if(badge) badge.style.display='none';
  closeModal('modal-notifications');
  showToast('All notifications marked as read.');
});

/* ---------------------------------------------------------
   CUSTOMER: CART / RESERVATION
--------------------------------------------------------- */
function addToCart(productId){
  const deal = dealById(state.currentDealId);
  const p = productById(productId);
  if(state.cartDealId && state.cartDealId!==deal.id){
    // switching deals clears previous cart in this simplified prototype
    state.cart = [];
  }
  state.cartDealId = deal.id;
  const line = state.cart.find(l=>l.productId===productId);
  if(line){ if(line.qty < p.maxQty) line.qty++; }
  else { state.cart.push({productId, qty:1}); }
  state.reservationEndsAt = Date.now() + deal.reserveMinutes*60*1000;
  renderCartBar();
  renderDealDetail();
  showToast(`${p.name} reserved for ${deal.reserveMinutes} minutes.`);
}
function cartTotal(){
  return state.cart.reduce((sum,l)=> sum + productById(l.productId).price*l.qty, 0);
}
function cartCount(){ return state.cart.reduce((s,l)=>s+l.qty,0); }

function renderCartBar(){
  $('#cart-count').textContent = cartCount();
  const bar = $('#cart-reserve-bar');
  if(!state.cart.length || !state.reservationEndsAt){ bar.classList.add('hidden'); renderCartDrawer(); return; }
  bar.classList.remove('hidden');
  const deal = dealById(state.cartDealId);
  const total = cartTotal();
  const pct = Math.min(100, Math.round(total/deal.minValue*100));
  $('#crb-fill').style.width = pct+'%';
  $('#crb-cart-total').textContent = money(total);
  const remaining = deal.minValue - total;
  $('#crb-txt').textContent = remaining>0
    ? `Add ${money(remaining)} more to reach the ${money(deal.minValue)} minimum · ${money(total)} / ${money(deal.minValue)}`
    : `Minimum order value reached · ${money(total)} / ${money(deal.minValue)}`;
  renderCartDrawer();
}
function tickReservation(){
  if(!state.reservationEndsAt) return;
  const left = state.reservationEndsAt - Date.now();
  if(left<=0){
    state.cart=[]; state.reservationEndsAt=null; state.cartDealId=null;
    renderCartBar(); renderDealDetail(); closeCartDrawer();
    openModal('modal-cart-expired');
    return;
  }
  const p = timeParts(left);
  $('#crb-time').textContent = `${pad(p.m)}:${pad(p.s)}`;
  const dt=$('#drawer-cart-time'); if(dt) dt.textContent=`${pad(p.m)}:${pad(p.s)}`;
}
setInterval(tickReservation, 1000);
$('#btn-return-to-deal').addEventListener('click', ()=>closeModal('modal-cart-expired'));
$('#cart-icon-btn').addEventListener('click', openCartDrawer);
$('#btn-goto-checkout').addEventListener('click', goToCheckout);

/* ---------------------------------------------------------
   CUSTOMER: CHECKOUT
--------------------------------------------------------- */
function goToCheckout(){
  state.cstep=1; renderCheckout(); navigateCustomer('checkout');
  window.scrollTo({top:0,behavior:'smooth'});
}
function meetsMinimum(){
  const deal = dealById(state.cartDealId); if(!deal) return false;
  const total = cartTotal(); const count = cartCount();
  // A customer can check out once EITHER threshold is met: the cart's total value
  // reaches the deal's minimum order value, OR the number of items reaches the
  // deal's minimum product count. These are alternative paths, not both-required.
  return total>=deal.minValue || count>=deal.minQty;
}
function renderCheckout(){
  const deal = dealById(state.cartDealId);
  const linesHTML = (container, removable)=>{
    const box = $(container); box.innerHTML='';
    if(!state.cart.length){ box.appendChild(el(`<div class="empty-state"><div class="ic">🛒</div><p>Your cart is empty.</p></div>`)); return; }
    state.cart.forEach(l=>{
      const p = productById(l.productId);
      box.appendChild(el(`
        <div class="cart-line">
          <img src="${p.img}" alt="${p.name}">
          <div>
            <div class="name">${p.name}</div>
            <div class="meta">${money(p.price)} × ${l.qty}</div>
          </div>
          <div class="price">${money(p.price*l.qty)}</div>
          ${removable ? `<button class="icon-mini remove-cart-line" data-product="${l.productId}" title="Remove from cart" style="margin-left:8px;">🗑</button>` : ''}
        </div>`));
    });
  };
  linesHTML('#checkout-cart-lines', true);
  linesHTML('#pay-cart-lines', false);

  const total = cartTotal();
  $('#sum-subtotal').textContent = money(total);
  $('#sum-total').textContent = money(total);
  $('#pay-subtotal').textContent = money(total);
  $('#pay-total').textContent = money(total);

  if(deal){
    const pct = Math.min(100, Math.round(total/deal.minValue*100));
    $('#min-progress-fill').style.width = pct+'%';
    const remaining = deal.minValue-total;
    const okValue = total>=deal.minValue, okCount = cartCount()>=deal.minQty;
    $('#min-progress-msg').textContent = (okValue||okCount)
      ? 'Minimum purchase requirement met — you can proceed to checkout.'
      : `Minimum requirement: ${money(deal.minValue)} order value, or ${deal.minQty} products totalling ${money(deal.minValue)}.`;
    $('#min-progress-sub').textContent = remaining>0 ? `Add ${money(remaining)} more, or ${Math.max(0,deal.minQty-cartCount())} more product(s).` : 'Ready for checkout.';
  }
  $('#btn-go-step2').disabled = !meetsMinimum();
  showCheckoutStep(state.cstep);
}
function showCheckoutStep(n){
  state.cstep = n;
  $all('.checkout-steps .cs').forEach(cs=>{
    const num = Number(cs.dataset.step);
    cs.classList.toggle('active', num===n);
    cs.classList.toggle('done', num<n);
  });
  $all('.checkout-panel').forEach(p=> p.style.display = Number(p.dataset.cstep)===n ? '' : 'none');
}
$('#btn-go-step2').addEventListener('click', ()=>{ if(meetsMinimum()) showCheckoutStep(2); });
$('#btn-go-step3').addEventListener('click', ()=> showCheckoutStep(3));
document.addEventListener('click', e=>{
  const rm = e.target.closest('.remove-cart-line');
  if(!rm) return;
  state.cart = state.cart.filter(l=> l.productId!==rm.dataset.product);
  if(!state.cart.length){ state.reservationEndsAt=null; state.cartDealId=null; }
  renderCheckout(); renderCartBar();
});
$all('[data-cstep-back]').forEach(b=> b.addEventListener('click', ()=> showCheckoutStep(Number(b.dataset.cstepBack))));
document.addEventListener('click', e=>{
  const pm = e.target.closest('.pay-method[data-pay]');
  if(!pm) return;
  $all('.pay-method[data-pay]').forEach(x=>x.classList.remove('selected'));
  pm.classList.add('selected');
  renderCheckoutPaymentDetail(pm.dataset.pay);
});
$('#btn-place-order').addEventListener('click', ()=>{
  const deal = dealById(state.cartDealId);
  if(!deal || !state.cart.length){ showToast('Your reserved cart is empty.'); return; }
  const selectedPay = $('.pay-method[data-pay].selected')?.dataset.pay || 'upi';
  const orderId = 'FD-' + Math.floor(80000+Math.random()*9999);
  const total = cartTotal();
  const lineItems = state.cart.map(l=>({productId:l.productId,qty:l.qty,price:productById(l.productId).price}));
  const productsText = lineItems.map(l=>`${productById(l.productId).name}${l.qty>1?' ×'+l.qty:''}`).join(', ');
  const nowLabel = new Date().toLocaleString('en-IN',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
  ORDERS.unshift({id:orderId, customer:'Aarav Ramesh', email:'aarav@example.com', dealId:deal.id, products:productsText, lineItems, value:total, payment:'Paid', paymentMethod:selectedPay.toUpperCase(), status:'Confirmed', date:nowLabel, address:'12, Lake View Apartments, 4th Cross Street, Chennai 600028', timeline:[{label:'Order placed',time:nowLabel,done:true},{label:'Payment confirmed',time:nowLabel,done:true},{label:'Processing',time:'Next update pending',done:false},{label:'Shipped',time:'Pending',done:false},{label:'Delivered',time:'Pending',done:false}]});
  deal.orders += 1; deal.revenue += total;
  state.cart.forEach(l=>{ const p=productById(l.productId); p.sold += l.qty; p.reserved = Math.max(0,p.reserved-l.qty); });
  const reg = REGISTRATIONS.find(r=>r.customerEmail==='aarav@example.com' && r.dealId===deal.id && r.payment==='Paid');
  if(reg) reg.access='Access used';
  const customer = CUSTOMERS.find(c=>c.email==='aarav@example.com'); if(customer) customer.lastActivity=nowLabel;
  state.lastOrder = {id:orderId, total};
  saveState();
  $('#success-order-id').textContent = orderId;
  $('#success-amount').textContent = money(total);
  $('#success-eta').textContent = new Date(Date.now()+4*DAY).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});
  state.cart=[]; state.reservationEndsAt=null; state.cartDealId=null;
  renderCartBar(); renderCustomerAccount(); renderOrdersTable(); renderRecentOrders(); renderReports();
  showCheckoutStep(4);
});
$('#btn-view-order').addEventListener('click', ()=>{ if(state.lastOrder) openOrderViewModal(state.lastOrder.id); });

/* ---------------------------------------------------------
   COUNTDOWN TICKER (shared: hero board, deal cards, reg panel)
--------------------------------------------------------- */
function tickCountdowns(){
  refreshDealStatuses();
  $all('[data-countdown]').forEach(box=>{
    const target = Number(box.dataset.countdown);
    const left = target - Date.now();
    const tp = timeParts(left);
    box.querySelectorAll('[data-unit]').forEach(node=>{
      const u = node.dataset.unit;
      const val = u==='d'?tp.d:u==='h'?tp.h:u==='m'?tp.m:tp.s;
      node.textContent = node.closest('.countdown-row') ? pad(val)+u : pad(val);
    });
  });
}
setInterval(tickCountdowns, 1000);

/* ---------------------------------------------------------
   CUSTOMER NAVIGATION
--------------------------------------------------------- */
let currentCustomerPage = 'home';
function navigateCustomer(page){
  currentCustomerPage = page;
  $all('#customer-main .page').forEach(p=> p.style.display = p.dataset.page===page ? '' : 'none');
  saveState();
}
document.addEventListener('click', e=>{
  const nav = e.target.closest('[data-nav]');
  if(!nav) return;
  e.preventDefault();
  const target = nav.dataset.nav;
  if(target==='home'){ navigateCustomer('home'); window.scrollTo({top:0,behavior:'smooth'}); }
  else if(target==='home-deals'){ navigateCustomer('home'); document.getElementById('deals').scrollIntoView({behavior:'smooth'}); }
  else if(target==='home-cats'){ navigateCustomer('home'); document.getElementById('categories').scrollIntoView({behavior:'smooth'}); }
  else if(target==='home-how'){ navigateCustomer('home'); document.getElementById('how').scrollIntoView({behavior:'smooth'}); }
  else if(['account','registrations','my-orders','addresses'].includes(target)){
    closeAccountPopover();
    renderCustomerAccount();
    navigateCustomer(target);
    window.scrollTo({top:0,behavior:'smooth'});
  }
});

/* ---------------------------------------------------------
   MODAL HELPERS
--------------------------------------------------------- */
function openModal(id){ $('#'+id).classList.remove('hidden'); }
function closeModal(id){ $('#'+id).classList.add('hidden'); }

/* ===========================================================================
   ADMIN ERP
=========================================================================== */
function renderKPIs(){
  const totalRevenue = DEALS.reduce((s,d)=>s+d.revenue,0);
  const todaySales = 214500;
  const flashRevenue = totalRevenue;
  const activeDeals = DEALS.filter(d=>d.status==='live').length;
  const upcoming = DEALS.filter(d=>d.status==='upcoming'||d.status==='soon').length;
  const pendingOrders = ORDERS.filter(o=>o.status==='Payment Pending').length;
  const registeredUsers = DEALS.reduce((s,d)=>s+d.registered,0);
  const liveVisitors = 1284;
  const totalProducts = PRODUCTS.length;
  const lowStock = PRODUCTS.filter(p=> (p.opening-p.sold-p.reserved) <= p.alertAt).length;

  const cards = [
    ['Total revenue', money(totalRevenue), '+12.4% vs last week', 'up'],
    [`Today's sales`, money(todaySales), '+6.1% vs yesterday', 'up'],
    ['Flash deal revenue', money(flashRevenue), '+12.4% vs last week', 'up'],
    ['Active deals', activeDeals, `${upcoming} upcoming`, 'flat'],
    ['Pending orders', pendingOrders, 'Needs payment confirmation', 'down'],
    ['Registered users', registeredUsers.toLocaleString('en-IN'), '+284 today', 'up'],
    ['Live visitors', liveVisitors.toLocaleString('en-IN'), 'Right now', 'flat'],
    ['Low stock products', lowStock, `of ${totalProducts} total`, 'down'],
  ];
  $('#kpi-grid').innerHTML = cards.map(c=>`
    <div class="kpi-card"><div class="lbl">${c[0]}</div><div class="val">${c[1]}</div><div class="delta ${c[3]}">${c[2]}</div></div>
  `).join('');
}
function renderRevenueChart(){
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const vals = [42,58,49,71,66,88,74];
  const max = Math.max(...vals);
  $('#revenue-chart').innerHTML = vals.map(v=>`<div class="b" style="height:${v/max*100}%"><span class="v">₹${v}k</span></div>`).join('');
  $('#revenue-chart-x').innerHTML = days.map(d=>`<span>${d}</span>`).join('');
}
function renderRecentOrders(){
  const tbody = $('#recent-orders-table tbody');
  tbody.innerHTML = ORDERS.slice(0,5).map(o=>`
    <tr>
      <td class="cell-title mono">${o.id}</td>
      <td>${o.customer}</td>
      <td>${dealById(o.dealId)?.title||'—'}</td>
      <td class="mono">${money(o.value)}</td>
      <td><span class="status-pill ${statusPillClass(o.status)}">${o.status}</span></td>
    </tr>`).join('');
}
function renderDashActiveDeals(){
  const box = $('#dash-active-deals');
  const list = DEALS.filter(d=>d.status==='live'||d.status==='soon');
  box.innerHTML = list.map(d=>`
    <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--line-soft);">
      <img class="row-img" src="${d.banner}" alt="">
      <div style="flex:1;min-width:0;">
        <div class="cell-title" style="font-size:13px;">${d.title}</div>
        <div class="cell-sub">${d.registered.toLocaleString('en-IN')} registered · ${d.orders} orders</div>
      </div>
      <span class="status-pill ${d.status}">${dealStatusLabel(d.status)}</span>
    </div>`).join('') || `<p style="font-size:13px;color:var(--ink-faint);">No active deals right now.</p>`;
}
function renderLowStock(){
  const box = $('#dash-low-stock');
  const list = PRODUCTS.filter(p=>(p.opening-p.sold-p.reserved)<=p.alertAt).sort((a,b)=>(a.opening-a.sold-a.reserved)-(b.opening-b.sold-b.reserved));
  box.innerHTML = list.slice(0,5).map(p=>{
    const avail = p.opening-p.sold-p.reserved;
    return `<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--line-soft);">
      <img class="row-img" src="${p.img}" alt="">
      <div style="flex:1;"><div class="cell-title" style="font-size:13px;">${p.name}</div><div class="cell-sub">${p.sku}</div></div>
      <span class="status-pill ${avail<=0?'out':'low'}">${avail} left</span>
    </div>`;
  }).join('') || `<p style="font-size:13px;color:var(--ink-faint);">All stock levels healthy.</p>`;
}

function statusPillClass(status){
  const map = {'Confirmed':'confirmed','Shipped':'shipped','Delivered':'delivered','Payment Pending':'pending','Processing':'processing','Cancelled':'cancelled','Refunded':'refunded'};
  return map[status] || 'draft';
}

/* ---- Admin: Flash Deals list ---- */
let adminDealFilter='all';
function renderAdminDealsTable(){
  const tbody = $('#admin-deals-table'); tbody.innerHTML='';
  const list = DEALS.filter(d=> adminDealFilter==='all' ? true : d.status===adminDealFilter);
  if(!list.length){ tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;color:var(--ink-faint);padding:30px;">No deals in this filter.</td></tr>`; return; }
  list.forEach(d=>{
    tbody.appendChild(el(`
      <tr>
        <td><div style="display:flex;align-items:center;gap:10px;"><img class="row-img" src="${d.banner}"><div><div class="cell-title">${d.title}</div><div class="cell-sub">${d.subtitle}</div></div></div></td>
        <td><span class="status-pill ${d.status}">${dealStatusLabel(d.status)}</span></td>
        <td class="mono" style="font-size:12px;">${new Date(d.startsAt).toLocaleDateString('en-IN',{day:'2-digit',month:'short'})} → ${new Date(d.endsAt).toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}</td>
        <td>₹${d.fee}</td>
        <td>${d.productIds.length}</td>
        <td>${d.registered.toLocaleString('en-IN')}</td>
        <td>${d.orders}</td>
        <td class="mono">${money(d.revenue)}</td>
        <td><div class="table-actions">
          <button class="icon-mini view-deal-btn" data-id="${d.id}" title="View">👁</button>
          <button class="icon-mini edit-deal-btn" data-id="${d.id}" title="Edit">✎</button>
          <button class="icon-mini duplicate-deal-btn" data-id="${d.id}" title="Duplicate">⧉</button>
          <button class="icon-mini analytics-deal-btn" data-id="${d.id}" title="Analytics">📈</button>
        </div></td>
      </tr>`));
  });
}
$('#admin-deal-tabs').addEventListener('click', e=>{
  const b=e.target.closest('button'); if(!b) return;
  $all('#admin-deal-tabs button').forEach(x=>x.classList.remove('active')); b.classList.add('active');
  adminDealFilter=b.dataset.filter; renderAdminDealsTable();
});

/* ---- Admin: Create deal + live preview ---- */
function renderCatalogPicker(){
  const box = $('#catalog-picker'); box.innerHTML='';
  PRODUCTS.filter(p=>!state.newDealProducts.includes(p.id)).forEach(p=>{
    box.appendChild(el(`
      <div class="catalog-row">
        <img src="${p.img}" alt="">
        <div><div class="n">${p.name}</div><div class="p">${money(p.price)} · ${p.category}</div></div>
        <button class="btn btn-ghost btn-sm add-to-deal" data-id="${p.id}">Add</button>
      </div>`));
  });
  if(!box.children.length) box.innerHTML = `<div style="padding:16px;text-align:center;color:var(--ink-faint);font-size:12.5px;">All catalog products added.</div>`;
}
function renderSelectedProducts(){
  const box = $('#selected-products'); box.innerHTML='';
  state.newDealProducts.map(productById).forEach(p=>{
    box.appendChild(el(`
      <div class="sp-row">
        <img src="${p.img}" alt="">
        <div class="n">${p.name}</div>
        <span class="mono" style="font-size:11px;color:var(--ink-faint);">${money(p.price)}</span>
        <button class="remove-from-deal" data-id="${p.id}">✕</button>
      </div>`));
  });
  if(!box.children.length) box.innerHTML = `<p style="font-size:12.5px;color:var(--ink-faint);">No products selected yet.</p>`;
}
document.addEventListener('click', e=>{
  const add = e.target.closest('.add-to-deal');
  if(add){ state.newDealProducts.push(add.dataset.id); renderSelectedProducts(); renderCatalogPicker(); renderDealPreview(); }
  const rem = e.target.closest('.remove-from-deal');
  if(rem){ state.newDealProducts = state.newDealProducts.filter(id=>id!==rem.dataset.id); renderSelectedProducts(); renderCatalogPicker(); renderDealPreview(); }
});
function renderDealPreview(){
  $('#pv-banner').src = $('#f-banner').value;
  $('#pv-title').textContent = $('#f-title').value || 'Untitled deal';
  $('#pv-subtitle').textContent = $('#f-subtitle').value;
  $('#pv-fee').textContent = '₹'+($('#f-fee').value||0);
  $('#pv-minvalue').textContent = money(Number($('#f-minvalue').value||0));
  $('#pv-reserve').textContent = ($('#f-reserve').value||0)+' min';
  $('#pv-maxqty').textContent = $('#f-maxqty').value||0;
  $('#pv-count').textContent = state.newDealProducts.length;
  $('#pv-products').innerHTML = state.newDealProducts.map(productById).map(p=>`
    <div class="pv-product"><img src="${p.img}"><div class="n">${p.name}</div><div class="p">${money(p.price)}</div></div>
  `).join('');
}
$all('#f-title,#f-subtitle,#f-banner,#f-fee,#f-minvalue,#f-reserve,#f-maxqty').forEach(()=>{});
['f-title','f-subtitle','f-banner','f-fee','f-minvalue','f-reserve','f-maxqty'].forEach(id=>{
  document.getElementById(id).addEventListener('input', renderDealPreview);
});
$all('.preview-toggle button').forEach(b=> b.addEventListener('click', ()=>{
  $all('.preview-toggle button').forEach(x=>x.classList.remove('active')); b.classList.add('active');
  $('#preview-frame').classList.toggle('mobile', b.dataset.preview==='mobile');
}));
function resetDealForm(){
  state.editingDealId = null;
  $('#f-title').value = '';
  $('#f-subtitle').value = '';
  $('#f-banner').value = IMG.deal_home;
  const start = new Date(Date.now()), end = new Date(Date.now()+2*HOUR);
  $('#f-start').value = toDatetimeLocal(start);
  $('#f-end').value = toDatetimeLocal(end);
  $('#f-fee').value = 1;
  $('#f-reserve').value = 10;
  $('#f-minvalue').value = 5000;
  $('#f-minqty').value = 2;
  $('#f-maxqty').value = 3;
  $('#f-terms').value = 'Minimum order value of ₹5,000, or 2 products totalling ₹5,000, is required. Cart items are reserved for 10 minutes. Unpaid reservations return to deal stock automatically. Registration fee is non-refundable.';
  state.newDealProducts = ['P1','P2'];
  renderSelectedProducts(); renderCatalogPicker(); renderDealPreview();
  $('#deal-builder-title').textContent = 'Create new flash deal';
  $('#btn-save-deal').textContent = 'Save deal';
}
function loadDealIntoForm(deal){
  state.editingDealId = deal.id;
  $('#f-title').value = deal.title;
  $('#f-subtitle').value = deal.subtitle;
  $('#f-banner').value = deal.banner;
  $('#f-start').value = toDatetimeLocal(new Date(deal.startsAt));
  $('#f-end').value = toDatetimeLocal(new Date(deal.endsAt));
  $('#f-fee').value = deal.fee;
  $('#f-reserve').value = deal.reserveMinutes;
  $('#f-minvalue').value = deal.minValue;
  $('#f-minqty').value = deal.minQty;
  $('#f-maxqty').value = deal.maxQtyPerCustomer;
  $('#f-terms').value = deal.terms || '';
  state.newDealProducts = [...deal.productIds];
  renderSelectedProducts(); renderCatalogPicker(); renderDealPreview();
  $('#deal-builder-title').textContent = 'Edit flash deal';
  $('#btn-save-deal').textContent = 'Update deal';
}
$('#btn-save-deal').addEventListener('click', ()=>{
  const title = $('#f-title').value.trim();
  if(!title){ showToast('Please enter a deal title before saving.'); return; }
  const payload = {
    title, subtitle: $('#f-subtitle').value,
    startsAt: new Date($('#f-start').value).getTime()||Date.now(), endsAt: new Date($('#f-end').value).getTime()||Date.now()+2*HOUR,
    banner: $('#f-banner').value, fee: Number($('#f-fee').value)||1, minValue: Number($('#f-minvalue').value)||5000,
    minQty: Number($('#f-minqty').value)||2, reserveMinutes: Number($('#f-reserve').value)||10, maxQtyPerCustomer: Number($('#f-maxqty').value)||2,
    terms: $('#f-terms').value.trim(),
    productIds:[...state.newDealProducts],
  };
  if(state.editingDealId){
    const deal = dealById(state.editingDealId);
    Object.assign(deal, payload);
    deal.status = computeDealStatus(deal);
    showToast('Deal updated successfully.');
  } else {
    const id = 'D'+(DEALS.length+1)+'-'+Date.now().toString().slice(-4);
    const deal = Object.assign({id, status:'upcoming', registered:0, orders:0, revenue:0}, payload);
    deal.status = computeDealStatus(deal);
    DEALS.push(deal);
    showToast(`Deal created and added as ${dealStatusLabel(deal.status)}.`);
  }
  state.editingDealId = null;
  saveState();
  goAdminPage('deals'); renderAdminDealsTable(); renderKPIs(); renderDashActiveDeals();
  renderDealGrid(); renderHero(); // reflect the change on the customer storefront immediately
});

/* ---- Admin: Deal table actions (view / edit / duplicate / analytics) ---- */
function openDealViewModal(dealId){
  const deal = dealById(dealId); if(!deal) return;
  $('#dv-title').textContent = deal.title;
  const badge = $('#dv-badge'); badge.className = 'status-pill ' + deal.status; badge.textContent = dealStatusLabel(deal.status);
  $('#dv-body').innerHTML = `
    <div class="info-list">
      <div class="item"><div class="k">Subtitle</div><div class="v">${deal.subtitle}</div></div>
      <div class="item"><div class="k">Window</div><div class="v">${new Date(deal.startsAt).toLocaleString('en-IN',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})} – ${new Date(deal.endsAt).toLocaleString('en-IN',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}</div></div>
      <div class="item"><div class="k">Registration fee</div><div class="v">₹${deal.fee}</div></div>
      <div class="item"><div class="k">Min. order</div><div class="v">${money(deal.minValue)} / ${deal.minQty} items</div></div>
      <div class="item"><div class="k">Max qty / customer</div><div class="v">${deal.maxQtyPerCustomer} per product</div></div>
      <div class="item"><div class="k">Registered</div><div class="v">${deal.registered.toLocaleString('en-IN')}</div></div>
      <div class="item"><div class="k">Orders</div><div class="v">${deal.orders}</div></div>
      <div class="item"><div class="k">Revenue</div><div class="v">${money(deal.revenue)}</div></div>
    </div>
    <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--ink-faint);margin:16px 0 8px;">Products (${deal.productIds.length})</p>
    <div class="pv-products">${deal.productIds.map(productById).map(p=>`<div class="pv-product"><img src="${p.img}"><div class="n">${p.name}</div><div class="p">${money(p.price)}</div></div>`).join('')}</div>
  `;
  openModal('modal-deal-view');
}
$('#btn-close-deal-view').addEventListener('click', ()=> closeModal('modal-deal-view'));
function duplicateDeal(dealId){
  const src = dealById(dealId); if(!src) return;
  const id = 'D'+(DEALS.length+1)+'-'+Date.now().toString().slice(-4);
  DEALS.push({...src, id, title: src.title+' (Copy)', status:'draft', registered:0, orders:0, revenue:0, productIds:[...src.productIds]});
  saveState();
  renderAdminDealsTable(); renderKPIs(); renderDealGrid(); renderHero();
  showToast(`Duplicated as "${src.title} (Copy)" — saved as a draft.`);
}
document.addEventListener('click', e=>{
  const viewBtn = e.target.closest('.view-deal-btn');
  if(viewBtn) openDealViewModal(viewBtn.dataset.id);
  const editBtn = e.target.closest('.edit-deal-btn');
  if(editBtn){ loadDealIntoForm(dealById(editBtn.dataset.id)); goAdminPage('deal-create'); }
  const dupBtn = e.target.closest('.duplicate-deal-btn');
  if(dupBtn) duplicateDeal(dupBtn.dataset.id);
  const anaBtn = e.target.closest('.analytics-deal-btn');
  if(anaBtn){
    const d = dealById(anaBtn.dataset.id);
    goAdminPage(d.status==='live' ? 'monitor' : 'reports');
    showToast(`Showing analytics for "${d.title}".`);
  }
});

/* ---- Admin: Live monitor ---- */
function renderMonitor(){
  const liveDeal = DEALS.find(d=>d.status==='live') || DEALS[0];
  const products = liveDeal.productIds.map(productById);
  const totalSold = products.reduce((s,p)=>s+p.sold,0);
  const totalOrders = liveDeal.orders;
  const conv = liveDeal.registered ? ((totalOrders/liveDeal.registered)*100).toFixed(1) : '0.0';
  const stats = [
    ['Time remaining', (()=>{const tp=timeParts(liveDeal.endsAt-Date.now()); return `${pad(tp.h)}:${pad(tp.m)}:${pad(tp.s)}`;})()],
    ['Registered', liveDeal.registered.toLocaleString('en-IN')],
    ['Live visitors', '1,284'],
    ['Products sold', totalSold],
    ['Orders placed', totalOrders],
    ['Conversion rate', conv+'%'],
  ];
  $('#monitor-strip').innerHTML = stats.map(s=>`<div class="m"><div class="v">${s[1]}</div><div class="l">${s[0]}</div></div>`).join('');

  $('#monitor-product-table').innerHTML = products.map(p=>{
    const available = p.opening-p.sold-p.reserved;
    const statusClass = available<=0?'out':(available<=p.alertAt?'critical':'instock');
    const statusText = available<=0?'Out of stock':(available<=p.alertAt?'Low stock':'In stock');
    return `<tr>
      <td class="cell-title">${p.name}</td>
      <td>${p.opening}</td>
      <td>${p.sold}</td>
      <td>${p.reserved}</td>
      <td>${available}</td>
      <td><span class="status-pill ${statusClass}">${statusText}</span></td>
      <td>${Math.round(p.sold*0.6)}</td>
      <td class="mono">${money(p.sold*p.price)}</td>
    </tr>`;
  }).join('');

  const dotColor = {order:'var(--live)', reserve:'var(--primary)', register:'var(--amber)', expire:'var(--danger)', stock:'var(--ink-faint)'};
  $('#activity-feed').innerHTML = ACTIVITY.map(a=>`
    <div class="activity-row"><div class="dot" style="background:${dotColor[a.kind]}"></div><div><div class="txt">${a.txt}</div><div class="time">${a.t}</div></div></div>
  `).join('');
}
let monitorTimer=null;
function startMonitorTicker(){
  if(monitorTimer) return;
  monitorTimer = setInterval(()=>{ if(currentAdminPage==='monitor') renderMonitor(); }, 1000);
}

/* ---- Admin: Products ---- */
function renderProductsTable(){
  $('#admin-products-table').innerHTML = PRODUCTS.map(p=>{
    const available = p.opening-p.sold-p.reserved;
    return `<tr>
      <td><div style="display:flex;align-items:center;gap:10px;"><img class="row-img" src="${p.img}"><span class="cell-title">${p.name}</span></div></td>
      <td class="mono" style="font-size:12px;">${p.sku}</td>
      <td>${p.category}</td>
      <td class="mono">${money(p.mrp)}</td>
      <td class="mono">${money(p.price)}</td>
      <td>${p.opening}</td>
      <td>${available}</td>
      <td><span class="status-pill ${available<=0?'out':available<=p.alertAt?'low':'instock'}">${available<=0?'Out of stock':available<=p.alertAt?'Low stock':'Active'}</span></td>
      <td><div class="table-actions"><button class="icon-mini edit-product-btn" data-id="${p.id}" title="Edit">✎</button><button class="icon-mini delete-product-btn" data-id="${p.id}" title="Delete">🗑</button></div></td>
    </tr>`;
  }).join('');
}

/* ---- Admin: Add / edit product modal ---- */
function openProductModal(productId){
  state.editingProductId = productId || null;
  if(productId){
    const p = productById(productId);
    $('#product-modal-title').textContent = 'Edit product';
    $('#f-p-name').value = p.name;
    $('#f-p-sku').value = p.sku;
    $('#f-p-category').value = p.category;
    $('#f-p-img').value = p.img;
    $('#f-p-mrp').value = p.mrp;
    $('#f-p-price').value = p.price;
    $('#f-p-opening').value = p.opening;
    $('#f-p-alert').value = p.alertAt;
    $('#f-p-maxqty').value = p.maxQty;
  } else {
    $('#product-modal-title').textContent = 'Add new product';
    $('#f-p-name').value = '';
    $('#f-p-sku').value = '';
    $('#f-p-category').value = 'Electronics';
    $('#f-p-img').value = '';
    $('#f-p-mrp').value = '';
    $('#f-p-price').value = '';
    $('#f-p-opening').value = '';
    $('#f-p-alert').value = '';
    $('#f-p-maxqty').value = 1;
  }
  openModal('modal-product');
}
$('#btn-add-product').addEventListener('click', ()=> openProductModal(null));
document.addEventListener('click', e=>{
  const editBtn = e.target.closest('.edit-product-btn');
  if(editBtn) openProductModal(editBtn.dataset.id);
});
$('#btn-p-cancel').addEventListener('click', ()=> closeModal('modal-product'));
$('#btn-p-save').addEventListener('click', ()=>{
  const name = $('#f-p-name').value.trim();
  const sku = $('#f-p-sku').value.trim();
  const mrp = Number($('#f-p-mrp').value);
  const price = Number($('#f-p-price').value);
  const opening = Number($('#f-p-opening').value);
  if(!name || !sku || !mrp || !price || opening===''||isNaN(opening)){
    showToast('Please fill in name, SKU, MRP, price and opening stock.');
    return;
  }
  const category = $('#f-p-category').value;
  const img = $('#f-p-img').value.trim();
  const alertAt = Number($('#f-p-alert').value)||5;
  const maxQty = Number($('#f-p-maxqty').value)||1;
  if(state.editingProductId){
    const p = productById(state.editingProductId);
    Object.assign(p, {name, sku, category, mrp, price, opening, alertAt, maxQty, img: img||p.img});
    showToast('Product updated.');
  } else {
    const id = 'P'+(PRODUCTS.length+1)+'-'+Date.now().toString().slice(-4);
    PRODUCTS.push({id, name, sku, category, img: img||IMG.electronics1, mrp, price, opening, sold:0, reserved:0, maxQty, alertAt});
    showToast('Product added to catalog.');
  }
  closeModal('modal-product');
  saveState();
  renderProductsTable(); renderInventoryTable(); renderCatalogPicker(); renderKPIs(); renderLowStock();
});

/* ---- Admin: Delete product ---- */
document.addEventListener('click', e=>{
  const delBtn = e.target.closest('.delete-product-btn');
  if(delBtn){
    state.deletingProductId = delBtn.dataset.id;
    $('#delete-product-name').textContent = productById(delBtn.dataset.id)?.name || 'this product';
    openModal('modal-delete-product');
  }
});
$('#btn-cancel-delete-product').addEventListener('click', ()=>{ closeModal('modal-delete-product'); state.deletingProductId=null; });
$('#btn-confirm-delete-product').addEventListener('click', ()=>{
  const id = state.deletingProductId; if(!id) return;
  const idx = PRODUCTS.findIndex(p=>p.id===id);
  if(idx>-1) PRODUCTS.splice(idx,1);
  DEALS.forEach(d=>{ d.productIds = d.productIds.filter(pid=>pid!==id); });
  state.newDealProducts = state.newDealProducts.filter(pid=>pid!==id);
  state.cart = state.cart.filter(l=>l.productId!==id);
  closeModal('modal-delete-product'); state.deletingProductId=null;
  saveState();
  renderProductsTable(); renderInventoryTable(); renderCatalogPicker(); renderSelectedProducts(); renderDealPreview();
  renderAdminDealsTable(); renderKPIs(); renderLowStock(); renderDealGrid(); renderHero();
  showToast('Product deleted.');
});

/* ---- Admin: Inventory ---- */
function renderInventoryTable(){
  $('#admin-inventory-table').innerHTML = PRODUCTS.map(p=>{
    const available = p.opening-p.sold-p.reserved;
    const status = available<=0?'out':available<=p.alertAt?'critical':p.reserved>0?'reserved':'instock';
    const statusText = {out:'Out of stock',critical:'Low stock',reserved:'Partially reserved',instock:'In stock'}[status];
    return `<tr>
      <td class="cell-title">${p.name}</td>
      <td class="mono" style="font-size:12px;">${p.sku}</td>
      <td>${p.opening-p.sold}</td>
      <td>${p.reserved}</td>
      <td>${available}</td>
      <td>${p.alertAt}</td>
      <td><span class="status-pill ${status}">${statusText}</span></td>
      <td class="cell-sub">Just now</td>
      <td><div class="table-actions"><button class="icon-mini edit-inventory-btn" data-id="${p.id}" title="Adjust stock">✎</button></div></td>
    </tr>`;
  }).join('');
}

/* ---- Admin: Inventory adjust modal ---- */
function openInventoryModal(productId){
  const p = productById(productId); if(!p) return;
  state.editingInventoryId = productId;
  $('#inv-modal-product-name').textContent = p.name;
  $('#f-inv-onhand').value = p.opening - p.sold;
  $('#f-inv-alert').value = p.alertAt;
  openModal('modal-inventory-adjust');
}
document.addEventListener('click', e=>{
  const b = e.target.closest('.edit-inventory-btn');
  if(b) openInventoryModal(b.dataset.id);
});
$('#btn-cancel-inventory').addEventListener('click', ()=> closeModal('modal-inventory-adjust'));
$('#btn-save-inventory').addEventListener('click', ()=>{
  const p = productById(state.editingInventoryId); if(!p) return;
  const onHand = Number($('#f-inv-onhand').value);
  const alertAt = Number($('#f-inv-alert').value);
  if(isNaN(onHand) || onHand<0){ showToast('Enter a valid on-hand stock quantity.'); return; }
  p.opening = onHand + p.sold;
  if(!isNaN(alertAt) && alertAt>=0) p.alertAt = alertAt;
  closeModal('modal-inventory-adjust');
  saveState();
  renderInventoryTable(); renderProductsTable(); renderKPIs(); renderLowStock(); renderMonitor();
  showToast('Inventory updated.');
});

/* ---- Admin: Orders ---- */
let adminOrderFilter='all';
function renderOrdersTable(){
  const tbody = $('#admin-orders-table');
  const list = ORDERS.filter(o=> adminOrderFilter==='all' ? true : o.status===adminOrderFilter);
  tbody.innerHTML = list.map(o=>`
    <tr>
      <td class="mono cell-title">${o.id}</td>
      <td>${o.customer}</td>
      <td>${dealById(o.dealId)?.title||'—'}</td>
      <td class="cell-sub">${o.products}</td>
      <td class="mono">${money(o.value)}</td>
      <td>${o.payment}</td>
      <td><span class="status-pill ${statusPillClass(o.status)}">${o.status}</span></td>
      <td class="cell-sub">${o.date}</td>
      <td><div class="table-actions"><button class="icon-mini view-order-btn" data-id="${o.id}" title="View">👁</button></div></td>
    </tr>`).join('') || `<tr><td colspan="9" style="text-align:center;color:var(--ink-faint);padding:30px;">No orders match this filter.</td></tr>`;
}
$('#admin-order-tabs').addEventListener('click', e=>{
  const b=e.target.closest('button'); if(!b) return;
  $all('#admin-order-tabs button').forEach(x=>x.classList.remove('active')); b.classList.add('active');
  adminOrderFilter=b.dataset.filter; renderOrdersTable();
});

/* ---- Order detail modal (shared between admin orders table and customer checkout) ---- */
function openOrderViewModal(orderId){
  const o = ORDERS.find(x=>x.id===orderId); if(!o) return;
  const timeline = o.timeline || buildOrderTimeline(o.status,o.date);
  const lineItems = Array.isArray(o.lineItems) && o.lineItems.length
    ? o.lineItems.map(l=>{ const p=productById(l.productId); return `<div class="account-list-row"><img src="${p?.img||IMG.deal_elec}" alt=""><div class="grow"><strong>${p?.name||o.products}</strong><small>${money(l.price||0)} × ${l.qty||1}</small></div><b class="mono">${money((l.price||0)*(l.qty||1))}</b></div>`; }).join('')
    : `<div style="font-size:13px;color:var(--ink-soft);padding:8px 0;">${o.products}</div>`;
  const adminControls = currentApp==='admin' ? `<div class="admin-order-actions"><select id="order-status-select"><option ${o.status==='Payment Pending'?'selected':''}>Payment Pending</option><option ${o.status==='Confirmed'?'selected':''}>Confirmed</option><option ${o.status==='Processing'?'selected':''}>Processing</option><option ${o.status==='Shipped'?'selected':''}>Shipped</option><option ${o.status==='Delivered'?'selected':''}>Delivered</option><option ${o.status==='Cancelled'?'selected':''}>Cancelled</option><option ${o.status==='Refunded'?'selected':''}>Refunded</option></select><button class="btn btn-primary btn-sm" data-update-order="${o.id}">Update status</button></div>` : ((o.status==='Confirmed'||o.status==='Processing') ? `<button class="btn btn-ghost btn-sm" style="margin-top:14px;" data-cancel-customer-order="${o.id}">Request cancellation</button>` : '');
  $('#ov-body').innerHTML = `
    <div class="info-list">
      <div class="item"><div class="k">Order ID</div><div class="v mono">${o.id}</div></div>
      <div class="item"><div class="k">Customer</div><div class="v">${o.customer}</div></div>
      <div class="item"><div class="k">Deal</div><div class="v">${dealById(o.dealId)?.title||'—'}</div></div>
      <div class="item"><div class="k">Order value</div><div class="v">${money(o.value)}</div></div>
      <div class="item"><div class="k">Payment</div><div class="v">${o.payment}${o.paymentMethod?' · '+o.paymentMethod:''}</div></div>
      <div class="item"><div class="k">Status</div><div class="v"><span class="status-pill ${statusPillClass(o.status)}">${o.status}</span></div></div>
      <div class="item"><div class="k">Delivery address</div><div class="v">${o.address||'Chennai, 600028'}</div></div>
    </div>
    <h4 style="font-size:14px;margin-top:18px;">Items</h4>${lineItems}
    <h4 style="font-size:14px;margin-top:18px;">Fulfillment timeline</h4><div class="order-timeline">${timeline.map(t=>`<div class="event ${t.done?'done':''}"><span class="dot"></span><div><strong>${t.label}</strong><small>${t.time}</small></div></div>`).join('')}</div>
    ${adminControls}`;
  openModal('modal-order-view');
}
document.addEventListener('click', e=>{
  const b = e.target.closest('.view-order-btn');
  if(b) openOrderViewModal(b.dataset.id);
});
$('#btn-close-order-view').addEventListener('click', ()=> closeModal('modal-order-view'));

/* ---- Admin: Reports ---- */
function renderReports(){
  const totalRevenue = DEALS.reduce((s,d)=>s+d.revenue,0);
  const totalOrders = ORDERS.length;
  const regRevenue = DEALS.reduce((s,d)=>s+d.registered*d.fee,0);
  $('#report-kpis').innerHTML = [
    ['Flash deal revenue', money(totalRevenue)],
    ['Registration revenue', money(regRevenue)],
    ['Order volume', totalOrders],
    ['Avg. conversion rate', '32.4%'],
  ].map(c=>`<div class="kpi-card"><div class="lbl">${c[0]}</div><div class="val">${c[1]}</div></div>`).join('');

  $('#report-revenue-by-deal').innerHTML = DEALS.filter(d=>d.revenue>0).sort((a,b)=>b.revenue-a.revenue).map(d=>`
    <div style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--line-soft);font-size:13px;">
      <span>${d.title}</span><span class="mono" style="font-weight:700;">${money(d.revenue)}</span>
    </div>`).join('') || `<p style="font-size:13px;color:var(--ink-faint);">No revenue yet.</p>`;

  $('#report-top-products').innerHTML = [...PRODUCTS].sort((a,b)=>b.sold-a.sold).slice(0,5).map(p=>`
    <div style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--line-soft);font-size:13px;">
      <span>${p.name}</span><span class="mono" style="font-weight:700;">${p.sold} sold</span>
    </div>`).join('');

  $('#report-cart-expiry').innerHTML = `
    <div style="text-align:center;padding:10px 0;">
      <div style="font-size:34px;font-weight:700;font-family:var(--font-display);color:var(--danger-text);">14.2%</div>
      <p style="font-size:12.5px;color:var(--ink-soft);margin-top:6px;">of reserved carts expired unpaid in the last 7 days, releasing stock back to deal inventory.</p>
    </div>`;
}

/* ---- Admin: Settings ---- */
$('#btn-save-settings').addEventListener('click', ()=>{
  const email = $('#f-settings-email').value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if(!emailOk){ showToast('Please enter a valid support email address.'); return; }
  showToast('Settings saved successfully.');
});

/* ---- Admin: Reports export (CSV) ---- */
$('#btn-export-report').addEventListener('click', ()=>{
  const rows = [['Revenue by deal']];
  DEALS.filter(d=>d.revenue>0).sort((a,b)=>b.revenue-a.revenue).forEach(d=> rows.push([d.title, d.revenue]));
  rows.push([]); rows.push(['Top-selling products']);
  [...PRODUCTS].sort((a,b)=>b.sold-a.sold).forEach(p=> rows.push([p.name, p.sold]));
  const csv = rows.map(r=> r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'flash-deal-report.csv';
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  showToast('Report exported as CSV.');
});

/* ---- Admin navigation ---- */
let currentAdminPage='dashboard';
function goAdminPage(page){
  currentAdminPage = page;
  $all('.apage').forEach(p=> p.style.display = p.dataset.apage===page ? '' : 'none');
  $all('#admin-nav a[data-apage]').forEach(a=> a.classList.toggle('active', a.dataset.apage===page));
  const labels = {dashboard:'Dashboard',deals:'Flash Deals','deal-create':'Create Deal',monitor:'Live Deal Monitor',products:'Products',inventory:'Inventory Management',orders:'Orders','registrations-admin':'Registrations',customers:'Customers',reports:'Reports',settings:'Settings'};
  $('#admin-crumb-current').textContent = labels[page]||page;
  if(page==='monitor') startMonitorTicker();
  document.getElementById('admin-content').scrollTo({top:0});
  saveState();
}
document.addEventListener('click', e=>{
  const nav = e.target.closest('#admin-nav a[data-apage]');
  if(nav){ e.preventDefault(); goAdminPage(nav.dataset.apage); $('#admin-sidebar').classList.remove('open'); }
  const goBtn = e.target.closest('[data-apage-go]');
  if(goBtn){
    e.preventDefault();
    if(goBtn.dataset.apageGo==='deal-create') resetDealForm();
    goAdminPage(goBtn.dataset.apageGo);
  }
});
$('#sidebar-toggle').addEventListener('click', ()=> $('#admin-sidebar').classList.toggle('open'));

/* ---- Admin: Reset & Logout ---- */
$('#nav-reset').addEventListener('click', e=>{ e.preventDefault(); openModal('modal-reset'); });
$('#btn-cancel-reset').addEventListener('click', ()=>{ closeModal('modal-reset'); $('#reset-confirm-input').value=''; $('#btn-confirm-reset').disabled=true; });
$('#reset-confirm-input').addEventListener('input', e=>{ $('#btn-confirm-reset').disabled = e.target.value.trim()!=='RESET'; });
$('#btn-confirm-reset').addEventListener('click', ()=>{
  try{ localStorage.removeItem(STORAGE_KEY); }catch(e){}
  closeModal('modal-reset'); $('#reset-confirm-input').value=''; $('#btn-confirm-reset').disabled=true;
  showToast('Platform data has been reset. Reloading…');
  setTimeout(()=> location.reload(), 500);
});
$('#nav-logout').addEventListener('click', e=>{ e.preventDefault(); openModal('modal-logout'); });
$('#btn-cancel-logout').addEventListener('click', ()=> closeModal('modal-logout'));
$('#btn-confirm-logout').addEventListener('click', ()=>{
  closeModal('modal-logout'); switchApp('customer'); showToast('Logged out of Flash ERP.');
});

/* ---------------------------------------------------------
   TOAST (lightweight)
--------------------------------------------------------- */
function showToast(msg){
  let t = document.getElementById('toast');
  if(!t){ t = el(`<div id="toast" style="position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--admin-ink);color:#fff;padding:12px 20px;border-radius:999px;font-size:13.5px;z-index:1100;box-shadow:var(--shadow-lg);opacity:0;transition:opacity .25s ease;"></div>`); document.body.appendChild(t); }
  t.textContent = msg; t.style.opacity='1';
  clearTimeout(t._timer); t._timer = setTimeout(()=>{ t.style.opacity='0'; }, 2600);
}

/* ---------------------------------------------------------
   APP SWITCHER (prototype convenience)
--------------------------------------------------------- */
let currentApp = 'customer';
function switchApp(which){
  currentApp = which;
  document.getElementById('app-customer').classList.toggle('hidden', which!=='customer');
  document.getElementById('app-admin').classList.toggle('hidden', which!=='admin');
  $all('.app-switch-btn').forEach(b=> b.classList.toggle('active', b.dataset.app===which));
  saveState();
}
document.addEventListener('click', e=>{
  const b = e.target.closest('.app-switch-btn');
  if(b) switchApp(b.dataset.app);
});


/* ---------------------------------------------------------
   CUSTOMER: REGISTRATION PAYMENT FLOW
--------------------------------------------------------- */
let registrationStep = 1;
let registrationDealId = null;
let registrationPaymentMethod = 'upi';
function showRegistrationStep(step){
  registrationStep=step;
  $all('[data-regstep]').forEach(p=>p.style.display=Number(p.dataset.regstep)===step?'':'none');
  $all('[data-regstep-indicator]').forEach(i=>{
    const n=Number(i.dataset.regstepIndicator); i.classList.toggle('active',n===step); i.classList.toggle('done',n<step);
  });
}
function openRegistrationFlow(dealId){
  const deal=dealById(dealId); if(!deal) return;
  registrationDealId=dealId; registrationPaymentMethod='upi';
  $('#registration-summary').innerHTML=`<img src="${deal.banner}" alt=""><div><span class="status-pill ${deal.status}">${dealStatusLabel(deal.status)}</span><h4>${deal.title}</h4><p>${deal.subtitle}</p><div class="facts"><span>Fee ₹${deal.fee}</span><span>${deal.productIds.length} products</span><span>Min ${money(deal.minValue)}</span><span>${deal.reserveMinutes} min reserve</span></div></div>`;
  $('#registration-fee-payable').textContent=money(deal.fee);
  $('#btn-reg-pay').textContent=`Pay ${money(deal.fee)} & register`;
  $('#reg-terms-check').checked=false; $('#btn-reg-next').disabled=true;
  $all('[data-regpay]').forEach(x=>x.classList.toggle('selected',x.dataset.regpay==='upi'));
  renderRegistrationPaymentDetail('upi'); showRegistrationStep(1); openModal('modal-registration-flow');
}
function renderRegistrationPaymentDetail(method){
  registrationPaymentMethod=method;
  const box=$('#registration-payment-detail');
  if(method==='card') box.innerHTML=`<div class="form-field"><label>Card number</label><input value="4242 4242 4242 4242"></div><div class="form-grid"><div class="form-field"><label>Expiry</label><input value="12/29"></div><div class="form-field"><label>CVV</label><input value="123"></div></div><p class="secure-note">🔒 Demo payment only. No real charge is made.</p>`;
  else if(method==='wallet') box.innerHTML=`<div class="form-field"><label>Wallet</label><select><option>ERP Wallet · ₹240 available</option><option>Paytm demo wallet</option></select></div><p class="secure-note">🔒 Demo payment only. No real charge is made.</p>`;
  else box.innerHTML=`<div class="form-field"><label>UPI ID</label><input id="registration-upi" value="aarav@okaxis"></div><p class="secure-note">🔒 Demo payment only. No real charge is made.</p>`;
}
$('#reg-terms-check').addEventListener('change',e=>$('#btn-reg-next').disabled=!e.target.checked);
$('#btn-reg-next').addEventListener('click',()=>showRegistrationStep(2));
$('#btn-reg-back').addEventListener('click',()=>showRegistrationStep(1));
$('#btn-reg-cancel').addEventListener('click',()=>closeModal('modal-registration-flow'));
$('#btn-close-registration-flow').addEventListener('click',()=>closeModal('modal-registration-flow'));
$all('[data-regpay]').forEach(pm=>pm.addEventListener('click',()=>{$all('[data-regpay]').forEach(x=>x.classList.remove('selected'));pm.classList.add('selected');renderRegistrationPaymentDetail(pm.dataset.regpay);}));
$('#btn-reg-pay').addEventListener('click',()=>{
  const deal=dealById(registrationDealId); if(!deal) return;
  if(!state.registered.has(deal.id)){ state.registered.add(deal.id); deal.registered+=1; }
  let rec=REGISTRATIONS.find(r=>r.customerEmail==='aarav@example.com'&&r.dealId===deal.id);
  const regId='REG-'+Math.floor(24000+Math.random()*9000); const txn=registrationPaymentMethod.toUpperCase()+'-'+Math.floor(700000+Math.random()*99999);
  if(!rec){ rec={id:regId,customer:'Aarav Ramesh',customerEmail:'aarav@example.com',dealId:deal.id,fee:deal.fee,payment:'Paid',access:'Unused',registeredAt:'Just now',transaction:txn}; REGISTRATIONS.unshift(rec); }
  else { rec.payment='Paid'; rec.access=rec.access==='Revoked'?'Unused':rec.access; rec.transaction=txn; }
  $('#registration-success-copy').innerHTML=deal.status==='live'?`You can shop <b>${deal.title}</b> immediately.`:`We will notify you when <b>${deal.title}</b> goes live.`;
  $('#registration-ticket').innerHTML=`<div class="item"><span>Registration ID</span><strong class="mono">${rec.id}</strong></div><div class="item"><span>Payment</span><strong>${money(deal.fee)} · ${registrationPaymentMethod.toUpperCase()}</strong></div><div class="item"><span>Access status</span><strong>Granted</strong></div><div class="item"><span>Transaction</span><strong class="mono">${rec.transaction}</strong></div>`;
  saveState(); renderDealDetail(); renderDealGrid(); renderCustomerAccount(); renderAdminRegistrations(); renderRegistrationKPIs(); showRegistrationStep(3);
});
$('#btn-reg-done').addEventListener('click',()=>{closeModal('modal-registration-flow');renderDealDetail();if(dealById(registrationDealId)?.status==='live')document.getElementById('deal-product-grid').scrollIntoView({behavior:'smooth'});});

/* ---------------------------------------------------------
   CUSTOMER: CART DRAWER & PAYMENT DETAIL
--------------------------------------------------------- */
function openCartDrawer(){ renderCartDrawer(); $('#cart-drawer-backdrop').classList.remove('hidden'); $('#cart-drawer').classList.add('open'); $('#cart-drawer').setAttribute('aria-hidden','false'); }
function closeCartDrawer(){ $('#cart-drawer-backdrop').classList.add('hidden'); $('#cart-drawer').classList.remove('open'); $('#cart-drawer').setAttribute('aria-hidden','true'); }
function renderCartDrawer(){
  const box=$('#drawer-cart-lines'); box.innerHTML=''; const deal=dealById(state.cartDealId);
  if(!state.cart.length){box.innerHTML='<div class="drawer-empty"><div class="ic">🛒</div><p>Your reserved cart is empty.</p></div>';$('#drawer-cart-total').textContent=money(0);$('#drawer-minimum-copy').textContent='Add products from a live registered deal.';$('#drawer-checkout').disabled=true;return;}
  state.cart.forEach(l=>{const p=productById(l.productId);box.appendChild(el(`<div class="cart-line"><img src="${p.img}" alt=""><div><div class="name">${p.name}</div><div class="meta">${money(p.price)} each</div><div class="qty-stepper" style="margin-top:7px;"><button class="drawer-qty-btn" data-delta="-1" data-product="${p.id}">−</button><span>${l.qty}</span><button class="drawer-qty-btn" data-delta="1" data-product="${p.id}">+</button></div></div><div class="price">${money(p.price*l.qty)}</div><button class="icon-mini remove-cart-line" data-product="${p.id}">🗑</button></div>`));});
  $('#drawer-cart-total').textContent=money(cartTotal());
  const remaining=deal?Math.max(0,deal.minValue-cartTotal()):0; $('#drawer-minimum-copy').textContent=meetsMinimum()?'Minimum purchase requirement met.':`Add ${money(remaining)} more, or reach ${deal?.minQty||0} items.`; $('#drawer-checkout').disabled=!meetsMinimum();
}
$('#btn-close-cart').addEventListener('click',closeCartDrawer); $('#cart-drawer-backdrop').addEventListener('click',closeCartDrawer); $('#drawer-continue').addEventListener('click',closeCartDrawer); $('#drawer-checkout').addEventListener('click',()=>{closeCartDrawer();goToCheckout();});
document.addEventListener('click',e=>{const b=e.target.closest('.drawer-qty-btn');if(!b)return;const line=state.cart.find(l=>l.productId===b.dataset.product),p=productById(b.dataset.product);if(!line||!p)return;line.qty=Math.max(0,Math.min(p.maxQty,line.qty+Number(b.dataset.delta)));if(line.qty===0)state.cart=state.cart.filter(l=>l!==line);if(!state.cart.length){state.reservationEndsAt=null;state.cartDealId=null;}renderCartBar();renderCartDrawer();renderDealDetail();});
function renderCheckoutPaymentDetail(method){
  const box=$('#checkout-payment-detail'); if(!box)return;
  if(method==='card') box.innerHTML=`<div class="form-field"><label>Card number</label><input value="4242 4242 4242 4242"></div><div class="form-grid"><div class="form-field"><label>Expiry</label><input value="12/29"></div><div class="form-field"><label>CVV</label><input value="123"></div></div><p class="secure-note">🔒 Payment is simulated. No real charge is made.</p>`;
  else if(method==='netbanking') box.innerHTML=`<div class="form-field"><label>Select bank</label><select><option>HDFC Bank</option><option>ICICI Bank</option><option>State Bank of India</option><option>Axis Bank</option></select></div><p class="secure-note">🔒 Demo bank redirect will be simulated.</p>`;
  else if(method==='wallet') box.innerHTML=`<div class="form-field"><label>Wallet</label><select><option>ERP Wallet · ₹62,000 demo balance</option><option>Paytm demo wallet</option></select></div><p class="secure-note">🔒 Payment is simulated. No real charge is made.</p>`;
  else box.innerHTML=`<div class="form-field"><label>UPI ID</label><div class="input-action"><input id="checkout-upi" value="aarav@okaxis"><button class="btn btn-ghost btn-sm" type="button">Verify</button></div></div><p class="secure-note">🔒 Payment is simulated. No real charge is made.</p>`;
}

/* ---------------------------------------------------------
   CUSTOMER: ACCOUNT, ORDERS, REGISTRATIONS & ADDRESSES
--------------------------------------------------------- */
let customerRegFilter='all', customerOrderFilter='all', editingAddressId=null;
function customerOrders(){return ORDERS.filter(o=>o.customer==='Aarav Ramesh');}
function customerRegistrations(){return REGISTRATIONS.filter(r=>r.customerEmail==='aarav@example.com');}
function renderCustomerAccount(){
  const regs=customerRegistrations(),orders=customerOrders(),spend=orders.filter(o=>o.payment==='Paid').reduce((a,o)=>a+o.value,0);
  $all('#account-reg-count').forEach(x=>x.textContent=regs.length);$all('#account-order-count').forEach(x=>x.textContent=orders.length);
  const k=$('#account-kpis');if(k)k.innerHTML=[['Registered deals',regs.length,'Access passes purchased'],['Orders',orders.length,'Across all flash deals'],['Total spend',money(spend),'Paid orders only']].map(x=>`<div class="account-kpi"><div class="k">${x[0]}</div><div class="v">${x[1]}</div><div class="s">${x[2]}</div></div>`).join('');
  const rp=$('#account-reg-preview');if(rp)rp.innerHTML=regs.slice(0,3).map(r=>{const d=dealById(r.dealId);return `<div class="account-list-row"><img src="${d?.banner||IMG.deal_elec}"><div class="grow"><strong>${d?.title||'Deal'}</strong><small>${dealStatusLabel(d?.status||'ended')} · ${r.payment}</small></div><button class="icon-mini" data-open-registration-deal="${r.dealId}">→</button></div>`;}).join('')||'<p class="cell-sub">No registrations yet.</p>';
  const op=$('#account-order-preview');if(op)op.innerHTML=orders.slice(0,3).map(o=>`<div class="account-list-row"><span class="account-avatar sm">${o.id.slice(-2)}</span><div class="grow"><strong>${o.id} · ${money(o.value)}</strong><small>${o.status} · ${o.date}</small></div><button class="icon-mini view-order-btn" data-id="${o.id}">→</button></div>`).join('')||'<p class="cell-sub">No orders yet.</p>';
  renderCustomerRegistrationList();renderCustomerOrders();renderAddresses();
}
function renderCustomerRegistrationList(){const box=$('#customer-registration-list');if(!box)return;const list=customerRegistrations().filter(r=>{const st=dealById(r.dealId)?.status;return customerRegFilter==='all'||(customerRegFilter==='upcoming'&&(st==='upcoming'||st==='soon'))||st===customerRegFilter;});box.innerHTML=list.map(r=>{const d=dealById(r.dealId);return `<div class="registration-card"><img src="${d?.banner||IMG.deal_elec}"><div><span class="status-pill ${d?.status||'ended'}">${dealStatusLabel(d?.status||'ended')}</span><h4>${d?.title||'Deal'}</h4><p>${r.payment==='Paid'?'Access confirmed':'Registration unavailable'} · ${r.access}</p><div class="meta"><span>${r.id}</span><span>${r.registeredAt}</span><span>${r.transaction}</span></div></div><div class="actions"><button class="btn btn-primary btn-sm" data-open-registration-deal="${r.dealId}">${d?.status==='live'?'Shop now':'View deal'}</button><button class="btn btn-ghost btn-sm" data-download-pass="${r.id}">Download pass</button></div></div>`;}).join('')||'<div class="empty-state"><div class="ic">🎟️</div><p>No registrations match this filter.</p></div>';}
function renderCustomerOrders(){const box=$('#customer-orders-list');if(!box)return;const active=['Payment Pending','Confirmed','Processing','Shipped'];const list=customerOrders().filter(o=>customerOrderFilter==='all'||(customerOrderFilter==='active'&&active.includes(o.status))||(customerOrderFilter==='delivered'&&o.status==='Delivered')||(customerOrderFilter==='cancelled'&&['Cancelled','Refunded'].includes(o.status)));box.innerHTML=list.map(o=>{const d=dealById(o.dealId);return `<div class="customer-order-card"><img src="${d?.banner||IMG.deal_office}"><div><span class="status-pill ${statusPillClass(o.status)}">${o.status}</span><h4>${o.id} · ${money(o.value)}</h4><p>${o.products}</p><div class="meta"><span>${o.date}</span><span>${o.payment}</span><span>${d?.title||'Deal'}</span></div></div><div class="actions"><button class="btn btn-primary btn-sm view-order-btn" data-id="${o.id}">View details</button>${o.status==='Delivered'?`<button class="btn btn-ghost btn-sm" data-invoice="${o.id}">Invoice</button>`:''}</div></div>`;}).join('')||'<div class="empty-state"><div class="ic">📦</div><p>No orders match this filter.</p></div>';}
function renderAddresses(){const box=$('#address-grid');if(!box)return;box.innerHTML=ADDRESSES.map(a=>`<div class="address-card ${a.isDefault?'default':''}"><div class="label"><strong>${a.label}</strong>${a.isDefault?'<span class="status-pill confirmed">Default</span>':''}</div><p>${a.line}<br>${a.city} — ${a.pin}<br>${a.phone}</p><div class="actions"><button class="btn btn-ghost btn-sm" data-edit-address="${a.id}">Edit</button>${!a.isDefault?`<button class="btn btn-ghost btn-sm" data-default-address="${a.id}">Make default</button>`:''}</div></div>`).join('');}
$('#btn-account-menu').addEventListener('click',e=>{e.stopPropagation();$('#customer-account-popover').classList.toggle('hidden');});
function closeAccountPopover(){const p=$('#customer-account-popover');if(p)p.classList.add('hidden');}
document.addEventListener('click',e=>{if(!e.target.closest('#customer-account-popover')&&!e.target.closest('#btn-account-menu'))closeAccountPopover();const od=e.target.closest('[data-open-registration-deal]');if(od){openDeal(od.dataset.openRegistrationDeal);}const dl=e.target.closest('[data-download-pass]');if(dl){downloadText(`${dl.dataset.downloadPass}.txt`,`ERP Flash Deal Registration Pass\nRegistration: ${dl.dataset.downloadPass}\nCustomer: Aarav Ramesh\nAccess: Confirmed`);showToast('Registration pass downloaded.');}const inv=e.target.closest('[data-invoice]');if(inv){downloadText(`${inv.dataset.invoice}-invoice.txt`,`ERP Flash Deal Invoice\nOrder: ${inv.dataset.invoice}\nCustomer: Aarav Ramesh`);showToast('Invoice downloaded.');}const edit=e.target.closest('[data-edit-address]');if(edit)openAddressModal(edit.dataset.editAddress);const def=e.target.closest('[data-default-address]');if(def){ADDRESSES.forEach(a=>a.isDefault=a.id===def.dataset.defaultAddress);saveState();renderAddresses();showToast('Default address updated.');}if(e.target.closest('[data-account-action="logout"]')){closeAccountPopover();navigateCustomer('home');showToast('Signed out in demo mode.');}});
$all('[data-reg-filter]').forEach(b=>b.addEventListener('click',()=>{$all('[data-reg-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');customerRegFilter=b.dataset.regFilter;renderCustomerRegistrationList();}));
$all('[data-myorder-filter]').forEach(b=>b.addEventListener('click',()=>{$all('[data-myorder-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');customerOrderFilter=b.dataset.myorderFilter;renderCustomerOrders();}));
$('#btn-edit-profile').addEventListener('click',()=>openModal('modal-profile-edit'));$('#btn-profile-cancel').addEventListener('click',()=>closeModal('modal-profile-edit'));$('#btn-profile-save').addEventListener('click',()=>{const c=CUSTOMERS.find(x=>x.email==='aarav@example.com');if(c){c.name=$('#profile-name').value.trim()||c.name;c.phone=$('#profile-phone').value.trim()||c.phone;}saveState();closeModal('modal-profile-edit');showToast('Profile updated.');});
$('#btn-add-address').addEventListener('click',()=>openAddressModal());function openAddressModal(id){editingAddressId=id||null;const a=id?ADDRESSES.find(x=>x.id===id):null;$('#address-modal-title').textContent=a?'Edit delivery address':'Add delivery address';$('#address-label').value=a?.label||'';$('#address-phone').value=a?.phone||'+91 98765 43210';$('#address-line').value=a?.line||'';$('#address-city').value=a?.city||'Chennai';$('#address-pin').value=a?.pin||'600028';openModal('modal-address-edit');}
$('#btn-address-cancel').addEventListener('click',()=>closeModal('modal-address-edit'));$('#btn-address-save').addEventListener('click',()=>{const label=$('#address-label').value.trim(),line=$('#address-line').value.trim();if(!label||!line){showToast('Add a label and address line.');return;}const obj={id:editingAddressId||'A'+Date.now(),label,phone:$('#address-phone').value.trim(),line,city:$('#address-city').value.trim(),pin:$('#address-pin').value.trim(),isDefault:ADDRESSES.length===0};if(editingAddressId){const i=ADDRESSES.findIndex(a=>a.id===editingAddressId);ADDRESSES[i]={...ADDRESSES[i],...obj};}else ADDRESSES.push(obj);saveState();closeModal('modal-address-edit');renderAddresses();showToast('Address saved.');});
function downloadText(filename,text){const blob=new Blob([text],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);}

/* ---------------------------------------------------------
   ADMIN: REGISTRATIONS & CUSTOMERS
--------------------------------------------------------- */
let adminRegistrationFilter='all',adminRegistrationQuery='',adminCustomerQuery='',adminCustomerSegment='all';
function registrationMetrics(){return{total:REGISTRATIONS.length,paid:REGISTRATIONS.filter(r=>r.payment==='Paid').length,revenue:REGISTRATIONS.filter(r=>r.payment==='Paid').reduce((a,r)=>a+r.fee,0),used:REGISTRATIONS.filter(r=>r.access==='Access used').length};}
function renderRegistrationKPIs(){const box=$('#registration-kpis');if(!box)return;const m=registrationMetrics();box.innerHTML=[['Total registrations',m.total],['Paid access passes',m.paid],['Registration revenue',money(m.revenue)],['Access converted',m.used]].map(c=>`<div class="kpi-card"><div class="lbl">${c[0]}</div><div class="val">${c[1]}</div></div>`).join('');}
function renderAdminRegistrations(){const body=$('#admin-registrations-table');if(!body)return;const q=adminRegistrationQuery.toLowerCase();const list=REGISTRATIONS.filter(r=>adminRegistrationFilter==='all'||r.payment===adminRegistrationFilter||r.access===adminRegistrationFilter).filter(r=>!q||r.customer.toLowerCase().includes(q)||(dealById(r.dealId)?.title||'').toLowerCase().includes(q)||r.id.toLowerCase().includes(q));body.innerHTML=list.map(r=>`<tr><td class="mono cell-title">${r.id}</td><td><div class="cell-title">${r.customer}</div><div class="cell-sub">${r.customerEmail}</div></td><td>${dealById(r.dealId)?.title||'—'}</td><td class="mono">${money(r.fee)}</td><td><span class="status-pill ${r.payment==='Paid'?'delivered':'refunded'}">${r.payment}</span></td><td><span class="status-pill ${r.access==='Access used'?'confirmed':r.access==='Revoked'?'cancelled':'upcoming'}">${r.access}</span></td><td class="cell-sub">${r.registeredAt}</td><td><button class="icon-mini" data-view-registration="${r.id}" title="View">👁</button></td></tr>`).join('')||'<tr><td colspan="8" class="empty-state">No registrations found.</td></tr>';}
$('#admin-registration-tabs').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$all('#admin-registration-tabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');adminRegistrationFilter=b.dataset.filter;renderAdminRegistrations();});$('#registration-search').addEventListener('input',e=>{adminRegistrationQuery=e.target.value;renderAdminRegistrations();});
function customerStats(c){const regs=REGISTRATIONS.filter(r=>r.customerEmail===c.email),orders=ORDERS.filter(o=>o.customer===c.name),spend=orders.filter(o=>o.payment==='Paid').reduce((a,o)=>a+o.value,0);return{regs,orders,spend};}
function renderAdminCustomers(){const body=$('#admin-customers-table');if(!body)return;const q=adminCustomerQuery.toLowerCase();const list=CUSTOMERS.filter(c=>adminCustomerSegment==='all'||c.segment===adminCustomerSegment).filter(c=>!q||[c.name,c.email,c.phone].some(v=>v.toLowerCase().includes(q)));body.innerHTML=list.map(c=>{const st=customerStats(c);return `<tr><td><div class="cell-title">${c.name}</div><div class="cell-sub">${c.email}<br>${c.phone}</div></td><td><span class="status-pill ${c.segment==='VIP'?'soon':'confirmed'}">${c.segment}</span></td><td class="mono">${st.regs.length}</td><td class="mono">${st.orders.length}</td><td class="mono">${money(st.spend)}</td><td class="cell-sub">${c.lastActivity}</td><td><span class="status-pill ${c.status==='Active'?'delivered':'pending'}">${c.status}</span></td><td><button class="icon-mini" data-view-customer="${c.id}">👁</button></td></tr>`;}).join('')||'<tr><td colspan="8" class="empty-state">No customers found.</td></tr>';}
$('#customer-search-admin').addEventListener('input',e=>{adminCustomerQuery=e.target.value;renderAdminCustomers();});$('#customer-segment-filter').addEventListener('change',e=>{adminCustomerSegment=e.target.value;renderAdminCustomers();});
document.addEventListener('click',e=>{const vr=e.target.closest('[data-view-registration]');if(vr){const r=REGISTRATIONS.find(x=>x.id===vr.dataset.viewRegistration),d=dealById(r?.dealId);if(r){$('#dv-title').textContent=r.id;$('#dv-badge').className='status-pill '+(r.payment==='Paid'?'delivered':'refunded');$('#dv-badge').textContent=r.payment;$('#dv-body').innerHTML=`<div class="info-list"><div class="item"><div class="k">Customer</div><div class="v">${r.customer}</div></div><div class="item"><div class="k">Deal</div><div class="v">${d?.title||'—'}</div></div><div class="item"><div class="k">Access</div><div class="v">${r.access}</div></div><div class="item"><div class="k">Transaction</div><div class="v mono">${r.transaction}</div></div></div>`;openModal('modal-deal-view');}}const vc=e.target.closest('[data-view-customer]');if(vc)openCustomerView(vc.dataset.viewCustomer);});
function openCustomerView(id){const c=CUSTOMERS.find(x=>x.id===id);if(!c)return;const st=customerStats(c);$('#customer-view-body').innerHTML=`<div class="customer-profile-head"><span class="account-avatar">${c.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</span><div><h4>${c.name}</h4><p>${c.email} · ${c.phone}<br>Joined ${c.joined}</p></div></div><div class="account-kpis"><div class="account-kpi"><div class="k">Registrations</div><div class="v">${st.regs.length}</div></div><div class="account-kpi"><div class="k">Orders</div><div class="v">${st.orders.length}</div></div><div class="account-kpi"><div class="k">Spend</div><div class="v">${money(st.spend)}</div></div></div><h4 style="font-size:14px;margin:12px 0 6px;">Recent participation</h4>${st.regs.slice(0,3).map(r=>`<div class="account-list-row"><div class="grow"><strong>${dealById(r.dealId)?.title||'Deal'}</strong><small>${r.id} · ${r.payment} · ${r.access}</small></div></div>`).join('')||'<p class="cell-sub">No registrations.</p>'}`;openModal('modal-customer-view');}
$('#btn-close-customer-view').addEventListener('click',()=>closeModal('modal-customer-view'));
function exportRows(filename,rows){const csv=rows.map(r=>r.map(c=>`"${String(c??'').replace(/"/g,'""')}"`).join(',')).join('\n'),blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);showToast('CSV exported.');}
$('#btn-export-registrations').addEventListener('click',()=>exportRows('registrations.csv',[['Registration','Customer','Email','Deal','Fee','Payment','Access','Registered at'],...REGISTRATIONS.map(r=>[r.id,r.customer,r.customerEmail,dealById(r.dealId)?.title,r.fee,r.payment,r.access,r.registeredAt])]));
$('#btn-export-customers').addEventListener('click',()=>exportRows('customers.csv',[['Customer','Email','Phone','Segment','Status','Last activity'],...CUSTOMERS.map(c=>[c.name,c.email,c.phone,c.segment,c.status,c.lastActivity])]));

/* ---------------------------------------------------------
   ORDER STATUS ACTIONS
--------------------------------------------------------- */
function buildOrderTimeline(status,date){const stages=['Order placed','Payment confirmed','Processing','Shipped','Delivered'];const idx={'Payment Pending':0,'Confirmed':1,'Processing':2,'Shipped':3,'Delivered':4}[status]??0;return stages.map((label,i)=>({label,time:i<=idx?(i===0?date:'Completed'):'Pending',done:i<=idx}));}
document.addEventListener('click',e=>{const u=e.target.closest('[data-update-order]');if(u){const o=ORDERS.find(x=>x.id===u.dataset.updateOrder),next=$('#order-status-select')?.value;if(o&&next){o.status=next;o.payment=next==='Refunded'?'Refunded':next==='Payment Pending'?'Pending':'Paid';o.timeline=buildOrderTimeline(next,o.date);saveState();renderOrdersTable();renderRecentOrders();renderCustomerAccount();openOrderViewModal(o.id);showToast(`Order updated to ${next}.`);}}const c=e.target.closest('[data-cancel-customer-order]');if(c){const o=ORDERS.find(x=>x.id===c.dataset.cancelCustomerOrder);if(o){o.status='Cancelled';o.timeline=buildOrderTimeline('Confirmed',o.date);o.timeline.push({label:'Cancellation requested',time:'Just now',done:true});saveState();renderCustomerAccount();closeModal('modal-order-view');showToast('Cancellation request submitted.');}}});

/* ---------------------------------------------------------
   DEMO GUIDE & DEEP LINKS
--------------------------------------------------------- */
const DEMO_FLOWS=[
  ['Customer home','Browse categories, live/upcoming deals and education.','customer-home'],['Registration payment','Review terms, choose payment and receive access pass.','registration'],['Live deal shopping','Registered product access, stock rules and reserved cart.','live-deal'],['Checkout','Cart minimum, address, payment and confirmation.','checkout'],['Customer account','Registrations, orders, addresses and profile.','account'],['Admin dashboard','KPIs, revenue, active deals and low-stock alerts.','admin-dashboard'],['Deal lifecycle','List, create, preview, edit and duplicate deals.','deal-builder'],['Live operations','Real-time deal monitor, inventory and activity.','monitor'],['Catalog & inventory','Create products and adjust available stock.','products'],['Order fulfillment','Inspect orders and move them through statuses.','orders'],['Participation CRM','Registration records and customer profiles.','registrations-admin'],['Reports & settings','Performance reporting, exports and defaults.','reports']
];
function renderDemoGuide(){const box=$('#demo-guide-grid');box.innerHTML=DEMO_FLOWS.map((f,i)=>`<div class="demo-flow-card"><div class="num">${pad(i+1)}</div><h4>${f[0]}</h4><p>${f[1]}</p><button class="btn btn-ghost btn-sm" data-demo-target="${f[2]}">Open flow →</button></div>`).join('');}
$('#btn-demo-guide').addEventListener('click',()=>{renderDemoGuide();openModal('modal-demo-guide');});$('#btn-close-demo-guide').addEventListener('click',()=>closeModal('modal-demo-guide'));
function seedCheckoutScenario(){const d=dealById('D1');state.registered.add('D1');if(!REGISTRATIONS.some(r=>r.customerEmail==='aarav@example.com'&&r.dealId==='D1'))REGISTRATIONS.unshift({id:'REG-DEMO',customer:'Aarav Ramesh',customerEmail:'aarav@example.com',dealId:'D1',fee:1,payment:'Paid',access:'Unused',registeredAt:'Demo',transaction:'DEMO-UPI'});state.currentDealId='D1';state.cartDealId='D1';state.cart=[{productId:'P2',qty:1}];state.reservationEndsAt=Date.now()+d.reserveMinutes*MIN;renderCartBar();renderDealDetail();}
function goDemoTarget(target){closeModal('modal-demo-guide');if(target.startsWith('admin')||['deal-builder','monitor','products','orders','registrations-admin','reports'].includes(target)){switchApp('admin');const map={'admin-dashboard':'dashboard','deal-builder':'deal-create',monitor:'monitor',products:'products',orders:'orders','registrations-admin':'registrations-admin',reports:'reports'};if(target==='deal-builder')resetDealForm();goAdminPage(map[target]||'dashboard');return;}switchApp('customer');if(target==='customer-home'){navigateCustomer('home');window.scrollTo({top:0});}else if(target==='registration'){openDeal('D1');setTimeout(()=>openRegistrationFlow('D1'),30);}else if(target==='live-deal'){state.registered.add('D1');openDeal('D1');}else if(target==='checkout'){seedCheckoutScenario();goToCheckout();}else if(target==='account'){renderCustomerAccount();navigateCustomer('account');window.scrollTo({top:0});}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-demo-target]');if(b)goDemoTarget(b.dataset.demoTarget);});
function applyHashRoute(){const hash=location.hash.replace('#','');if(hash)goDemoTarget(hash);}

/* ---------------------------------------------------------
   INIT
--------------------------------------------------------- */
function init(){
  DEALS.forEach(deal=>{ deal.status = computeDealStatus(deal); });
  renderHero();
  renderCategories();
  renderDealGrid();
  renderDealDetail();
  renderCartBar();

  renderKPIs(); renderRevenueChart(); renderRecentOrders(); renderDashActiveDeals(); renderLowStock();
  renderAdminDealsTable();
  renderSelectedProducts(); renderCatalogPicker(); renderDealPreview();
  renderMonitor();
  renderProductsTable();
  renderInventoryTable();
  renderOrdersTable();
  renderReports();
  renderCustomerAccount(); renderRegistrationKPIs(); renderAdminRegistrations(); renderAdminCustomers(); renderCheckoutPaymentDetail('upi');

  tickCountdowns();
  navigateCustomer(restoredUI.customerPage || 'home');
  goAdminPage(restoredUI.adminPage || 'dashboard');
  switchApp(restoredUI.app || 'customer');
  applyHashRoute();
}
init();

})();
