const $=(q)=>document.querySelector(q);const $$=(q)=>document.querySelectorAll(q);const LS='ecolearn_pro_v2';
const seed={user:{name:'VT Dragon',email:'student@example.com',role:'Student',school:'Mahendra Engineering College',avatar:'🐉'},xp:0,coins:0,level:1,streak:1,completedLessons:[],completedQuizzes:[],badges:['Green Starter'],submissions:[],scanHistory:[],redemptions:[],totalWasteWeight:0};
function get(){let d=localStorage.getItem(LS);if(!d){localStorage.setItem(LS,JSON.stringify(seed));return structuredClone(seed)}let obj=JSON.parse(d);if(!obj.scanHistory)obj.scanHistory=[];if(!obj.redemptions)obj.redemptions=[];if(!obj.totalWasteWeight)obj.totalWasteWeight=0;if(!obj.badges)obj.badges=['Green Starter'];return obj}
function save(d){d.level=Math.max(1,Math.floor(d.xp/500)+1);localStorage.setItem(LS,JSON.stringify(d))}
function toast(t){let el=$('.toast')||document.body.appendChild(Object.assign(document.createElement('div'),{className:'toast'}));el.textContent=t;el.style.display='block';setTimeout(()=>el.style.display='none',2300)}
function logout(){localStorage.removeItem(LS);location.href='index.html'}
function closeModal(){$('.modal')?.classList.remove('show')}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}

function playChime(type='coin'){
  try{
    const ctx=new (window.AudioContext||window.webkitAudioContext)();
    const osc=ctx.createOscillator();
    const gain=ctx.createGain();
    osc.connect(gain);gain.connect(ctx.destination);
    if(type==='unlock'){
      osc.frequency.setValueAtTime(320,ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(640,ctx.currentTime+0.18);
      gain.gain.setValueAtTime(0.2,ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.2);
      osc.start();osc.stop(ctx.currentTime+0.2);
    } else if(type==='coin'){
      osc.frequency.setValueAtTime(587.33,ctx.currentTime);
      osc.frequency.setValueAtTime(880,ctx.currentTime+0.12);
      gain.gain.setValueAtTime(0.25,ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.35);
      osc.start();osc.stop(ctx.currentTime+0.35);
    } else if(type==='sensor'){
      osc.frequency.setValueAtTime(440,ctx.currentTime);
      gain.gain.setValueAtTime(0.12,ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.12);
      osc.start();osc.stop(ctx.currentTime+0.12);
    }
  }catch(e){}
}

const lessons=[
{id:1,icon:'🌍',t:'Climate Change Basics',d:'Greenhouse effect, global warming, climate vs weather, human impact.',xp:100,points:['Climate is the long-term pattern of temperature and rainfall.','Weather is daily condition like rain, heat or wind.','Greenhouse gases trap heat and keep Earth warm.','Extra carbon dioxide increases global temperature.','Burning coal, petrol and diesel releases greenhouse gases.','Deforestation reduces natural carbon absorption.','Global warming can increase heat waves.','Melting glaciers can raise sea level.','Climate change affects farming and water availability.','Public transport reduces emissions per person.','Tree planting helps but cannot replace emission control.','Energy saving at home reduces carbon footprint.','Local climate action starts with daily habits.','Students can measure electricity and waste at campus.','Climate solutions need people, science and policy together.'],qs:['What is the difference between climate and weather?','Name two greenhouse gases.','Why does burning fossil fuel increase warming?','How can trees help in climate action?','Write two effects of global warming.','Why is sea level rise dangerous?','How can students reduce carbon footprint?','What is deforestation?','Why is public transport eco-friendly?','Write one campus climate action idea.','What is carbon footprint?','Why should we save electricity?','Give one example of renewable energy.','How does climate change affect agriculture?','Write a slogan about climate action.']},
{id:2,icon:'☀️',t:'Renewable Energy',d:'Solar, wind, hydro, biomass, geothermal and clean energy future.',xp:110,points:['Renewable energy is naturally replenished.','Solar panels convert sunlight into electricity.','Wind turbines convert wind energy into electrical energy.','Hydropower uses flowing water to rotate turbines.','Biomass uses organic waste for energy.','Geothermal energy comes from Earth heat.','Renewables reduce air pollution.','Solar street lights save grid power.','Battery storage helps when sunlight or wind is low.','Energy efficiency is as important as energy generation.','LED bulbs use less energy than old bulbs.','Rooftop solar can help schools and colleges.','Clean energy reduces dependence on fossil fuels.','Smart meters help monitor electricity use.','A mixed renewable system is more reliable.'],qs:['Define renewable energy.','Name three renewable sources.','How does a solar panel work?','What does a wind turbine produce?','Why is hydropower renewable?','What is biomass energy?','What is geothermal energy?','Why are LED bulbs useful?','What is battery storage?','Write two advantages of solar energy.','Write one limitation of wind energy.','How can a college use solar power?','What is energy efficiency?','Why should we reduce fossil fuel use?','Suggest one renewable project idea.']},
{id:3,icon:'♻️',t:'Waste Management',d:'Reduce, reuse, recycle, composting, segregation and e-waste safety.',xp:120,points:['Waste management starts with reducing waste.','Reuse means using an item again instead of throwing it.','Recycling converts waste into useful material.','Wet waste can become compost.','Dry waste includes paper, plastic, glass and metal.','Segregation should be done at source.','E-waste contains valuable and harmful materials.','Batteries should not be thrown with normal waste.','Single-use plastic creates long-term pollution.','Composting improves soil quality.','Repair culture reduces waste generation.','Waste audit helps identify the main waste source.','Color-coded bins improve segregation.','Recycling saves energy and raw materials.','Clean campus needs participation from everyone.'],qs:['What are the 3Rs?','What is waste segregation?','Name two wet waste examples.','Name two dry waste examples.','What is composting?','Why is e-waste dangerous?','How can plastic waste be reduced?','Why are color-coded bins useful?','What is a waste audit?','Write two benefits of recycling.','What should we do with old batteries?','How does reuse help environment?','Give one clean campus idea.','What is single-use plastic?','Write one slogan on waste management.']},
{id:4,icon:'💧',t:'Water Conservation',d:'Saving water, rainwater harvesting, groundwater recharge and daily water audit.',xp:120,points:['Freshwater is limited and must be protected.','Water conservation means using water carefully.','Rainwater harvesting stores rain for future use.','Groundwater recharge increases underground water.','Fixing leaks saves large amounts of water.','Bucket bathing uses less water than long showers.','Drip irrigation saves water in farming.','Greywater can be reused for gardening after treatment.','Water meters help track usage.','Trees improve water retention in soil.','Polluted water harms health and ecosystems.','Campus water audit finds wastage points.','Avoiding chemical dumping protects water bodies.','Low-flow taps reduce water use.','Every student can save water daily.'],qs:['Define water conservation.','What is rainwater harvesting?','Why is groundwater recharge important?','Name two ways to save water at home.','What is drip irrigation?','Why should leaks be repaired quickly?','What is greywater?','How can colleges save water?','Why is water pollution harmful?','What is a water audit?','Name one device that saves water.','How do trees help water conservation?','Write two sources of freshwater.','Why should chemicals not be dumped in drains?','Write a water saving pledge.']},
{id:5,icon:'🦋',t:'Biodiversity & Ecosystems',d:'Food chains, habitats, endangered species, conservation and ecosystem balance.',xp:130,points:['Biodiversity means variety of living organisms.','An ecosystem includes living and non-living things.','Food chain shows energy flow.','Plants are producers.','Animals that eat plants or animals are consumers.','Decomposers recycle nutrients.','Habitat loss is a major threat to species.','Pollinators help plants reproduce.','Forests support many species.','Endangered species need protection.','Invasive species can disturb local ecosystems.','Biodiversity supports food, medicine and clean air.','Conservation can be in-situ or ex-situ.','Students can create butterfly gardens.','Protecting nature protects human life.'],qs:['Define biodiversity.','What is an ecosystem?','What is a food chain?','Who are producers?','What are decomposers?','Why are pollinators important?','What is habitat loss?','Name one endangered animal.','What is conservation?','Difference between in-situ and ex-situ conservation?','Why are forests important?','What is an invasive species?','How can students protect biodiversity?','Give one example of ecosystem.','Write one biodiversity awareness slogan.']},
{id:6,icon:'🏙️',t:'Sustainable Cities & Campus',d:'Green buildings, public transport, smart waste, clean air and eco campus planning.',xp:130,points:['A sustainable city uses resources wisely.','Green buildings save energy and water.','Public transport reduces traffic emissions.','Cycling and walking improve health and air quality.','Urban trees reduce heat.','Smart waste systems improve collection.','Rain gardens reduce flooding.','Solar lighting saves electricity.','Carpooling reduces fuel use.','Clean air needs less smoke and dust.','Eco campus includes energy, water and waste plans.','Digital notices reduce paper use.','Green spaces improve mental health.','Local food reduces transport emissions.','Citizen participation makes cities sustainable.'],qs:['What is a sustainable city?','Name two features of green building.','Why is public transport better?','How does cycling help environment?','What is urban heat island?','How do trees help cities?','What is an eco campus?','Why use digital notices?','What is carpooling?','How can solar lights help?','What is a rain garden?','Write two clean air actions.','Why are green spaces important?','How can students improve campus sustainability?','Suggest one smart city eco idea.']},
{id:7,icon:'🍽️',t:'Sustainable Food & Agriculture',d:'Food waste reduction, organic farming, local food, soil health and nutrition.',xp:140,points:['Sustainable food protects health and environment.','Food waste wastes water, energy and labour.','Organic farming reduces chemical use.','Compost improves soil fertility.','Local food reduces transport emissions.','Seasonal food needs fewer artificial inputs.','Millets are climate-resilient crops.','Kitchen gardens teach food responsibility.','Soil organisms keep soil healthy.','Excess fertilizer can pollute water.','Drip irrigation supports sustainable farming.','Food sharing reduces waste.','Balanced diet supports human health.','Packaging-free food reduces plastic waste.','Students can run a zero-food-waste campaign.'],qs:['What is sustainable food?','Why is food waste a problem?','What is organic farming?','How does compost help soil?','Why is local food eco-friendly?','What are seasonal foods?','Why are millets useful?','What is a kitchen garden?','How can fertilizer pollute water?','What is soil health?','How can students reduce food waste?','Name one sustainable irrigation method.','Why avoid excess packaging?','Write two benefits of balanced diet.','Create one food waste awareness message.']},
{id:8,icon:'🧪',t:'Green Innovation & Eco Project',d:'Build project ideas, collect data, verify impact and present solutions.',xp:150,points:['Green innovation solves environmental problems.','A good project starts with a real local problem.','Data collection proves the problem.','Prototype means a basic working model.','User feedback improves the solution.','Impact measurement shows project success.','Before-after comparison is useful.','EcoCoins can motivate students.','Teacher verification improves trust.','Photos and reports can prove challenge work.','Dashboard shows progress clearly.','Leaderboard creates healthy competition.','Certificates motivate completion.','Project documentation is important.','A strong eco project should be useful, simple and scalable.'],qs:['What is green innovation?','How do you select an eco project problem?','Why is data collection important?','What is a prototype?','Why is user feedback needed?','What is impact measurement?','What is teacher verification?','How can gamification improve learning?','Why are badges useful?','What should a project dashboard show?','What is before-after comparison?','Write one eco project idea.','What is project documentation?','How can a project become scalable?','Give one way to present eco project results.']}
];
const quiz={};lessons.forEach(l=>{quiz['lesson'+l.id]=l.qs.map((q,i)=>({q, a:[l.points[i]||'Correct eco action','Ignore the problem','Waste more resources','Use more plastic'], c:0, explain:l.points[i]||'This is the correct eco learning concept.'}))});
const challenges=['Plant a Tree and Record Growth','Plastic-Free Day Campaign','Save Electricity Audit','Clean Campus Drive','Water Leak Detection','Home Compost Setup','Recycling Art Model','E-Waste Collection Awareness','Public Transport Week','Reusable Bottle Challenge','Paperless Class Day','Butterfly Garden Plan','Food Waste Reduction Drive','Rainwater Harvesting Poster','Eco Survey with 15 Responses'];
const icons=['🌳','🚯','💡','🧹','💧','🌿','🎨','🔋','🚌','🥤','📱','🦋','🍱','🌧️','📋'];
const challengeSteps=['Take before and after photo proof.','Write minimum 5 lines about what you did.','Mention date, place and people involved.','Explain environmental benefit.','Submit for teacher verification.'];

/* Smart Dustbin Ecosystem Data */
const smartBins=[
  {id:'ECO-BIN-01',name:'Campus Main Canteen',loc:'Canteen Entrance, Ground Floor',fill:84,status:'Online',weightTotal:18.4,type:'Institutional'},
  {id:'ECO-BIN-02',name:'Central Library West Wing',loc:'Near Digital Resource Center',fill:32,status:'Online',weightTotal:6.2,type:'Institutional'},
  {id:'ECO-BIN-03',name:'Science & Tech Block',loc:'Main Porch & Laboratory Hall',fill:67,status:'Online',weightTotal:12.8,type:'Institutional'},
  {id:'ECO-BIN-04',name:'Metro Station Gate 2',loc:'Public Transit Terminal A',fill:92,status:'Critical',weightTotal:26.5,type:'Public'},
  {id:'ECO-BIN-05',name:'City Green Eco Park',loc:'Main Jogging Pathway & Gazebo',fill:45,status:'Online',weightTotal:9.1,type:'Public'}
];

const wasteCategories=[
  {key:'plastic',name:'Plastic',icon:'🥤',compId:1,color:'plastic',desc:'Bottles, wrappers, disposable cups, food containers',coins:20,xp:40,baseGrams:130},
  {key:'paper',name:'Paper',icon:'📄',compId:2,color:'paper',desc:'Notebook pages, cardboard, printouts, clean cartons',coins:15,xp:30,baseGrams:190},
  {key:'wet',name:'Wet / Organic',icon:'🍏',compId:3,color:'wet',desc:'Fruit peels, leftover food scraps, cafeteria compostables',coins:25,xp:50,baseGrams:270},
  {key:'metal',name:'Metal / Cans',icon:'🥫',compId:4,color:'metal',desc:'Soda cans, aluminum tin foil, metal bottle caps',coins:30,xp:60,baseGrams:160},
  {key:'ewaste',name:'E-Waste',icon:'🔋',compId:5,color:'ewaste',desc:'Dry cell batteries, broken USB cords, dead circuit toys',coins:50,xp:100,baseGrams:95}
];

const collegeRewards=[
  {id:'col-1',title:'Campus Canteen Food Coupon (₹25 Off)',cost:50,category:'College',desc:'Valid at Campus Canteen on lunch, snacks, and fresh smoothies.'},
  {id:'col-2',title:'Stationery Store Eco Starter Kit',cost:40,category:'College',desc:'Includes recycled paper notebook, seed pen, and eco-friendly folder.'},
  {id:'col-3',title:'Library Fine Waiver / Extended Lending',cost:30,category:'College',desc:'Waives overdue fines up to ₹50 or extends book borrowing period by 30 days.'},
  {id:'col-4',title:'Campus Green Cafe - Free Drink',cost:25,category:'College',desc:'Redeem for a complimentary organic green tea or herbal cooler.'}
];

const publicRewards=[
  {id:'pub-1',title:'Railways & Metro Transit Ticket Subsidy (₹50 Off)',cost:100,category:'Public',desc:'Direct QR coupon for municipal metro card recharge or rail ticketing counter.'},
  {id:'pub-2',title:'City Eco-Park & Botanical Garden Pass',cost:60,category:'Public',desc:'Free all-day admission ticket for 2 visitors at Municipal Nature Park.'},
  {id:'pub-3',title:'Swachh Civic Micro-payment / Bill Rebate',cost:150,category:'Public',desc:'Direct credit discount towards municipal green citizen property/utility charges.'},
  {id:'pub-4',title:'City Electric Bus Transit 1-Day Pass',cost:35,category:'Public',desc:'Unlimited day pass for all municipal electric feeder buses.'}
];

function initAuth(){let role='Student';$$('.roleBtn').forEach(b=>b.onclick=()=>{$$('.roleBtn').forEach(x=>x.classList.remove('primary'));b.classList.add('primary');role=b.dataset.role});$('#signupForm')?.addEventListener('submit',e=>{e.preventDefault();let d=get();d.user={name:$('#name').value,email:$('#email').value,role,school:$('#school').value,avatar:role=='Teacher'?'👩‍🏫':'🌱'};save(d);location.href='dashboard.html'});$('#loginForm')?.addEventListener('submit',e=>{e.preventDefault();let d=get();d.user.email=$('#email').value||d.user.email;save(d);location.href='dashboard.html'});} 
function renderShell(active='dashboard'){let d=get();$('#studentName')&&($('#studentName').textContent=d.user.name);$('#coinCount')&&($('#coinCount').textContent=d.coins);$$('.side a').forEach(a=>a.classList.toggle('active',a.dataset.page==active));}
function dashboard(){renderShell('dashboard');let d=get();$('#hello').textContent=`Welcome back, ${d.user.name}!`;$('#xp').textContent=d.xp;$('#coins').textContent=d.coins;$('#level').textContent=d.level;$('#streak').textContent=d.streak+' days';$('#xpbar').style.width=Math.min(100,(d.xp%500)/5)+'%';let wrap=$('#lessonPreview');if(wrap)wrap.innerHTML=lessons.slice(0,4).map(l=>`<div class="card lesson" onclick="openLesson(${l.id})"><h3>${l.icon} ${l.t}</h3><p class="muted">${l.d}</p><p><span class="pill">15 key points</span> <span class="pill">15 questions</span> <span class="pill">+${l.xp} XP</span></p></div>`).join('');}
function lessonsPage(){renderShell('lessons');let d=get();$('#lessonsGrid').innerHTML=lessons.map(l=>`<div class="card lesson" onclick="openLesson(${l.id})"><h3>${l.icon} ${l.t}</h3><p class="muted">${l.d}</p><div class="row"><span class="pill">15 points</span><span class="pill">15 review Qs</span><span class="tag">${d.completedLessons.includes(l.id)?'Completed':'Open'}</span></div></div>`).join('')}
function openLesson(id){let l=lessons.find(x=>x.id==id);$('#modalTitle').textContent=l.icon+' '+l.t;$('#modalBody').innerHTML=`<p>${l.d}</p><h3>15 Learning Points</h3><ol>${l.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ol><h3>15 Practice Questions</h3><ol>${l.qs.map(q=>`<li>${esc(q)}</li>`).join('')}</ol><button class="btn primary" onclick="completeLesson(${id})">Mark Complete & Earn ${l.xp} XP</button>`;$('.modal').classList.add('show')}
function completeLesson(id){let d=get(),l=lessons.find(x=>x.id==id);if(!d.completedLessons.includes(id)){d.completedLessons.push(id);d.xp+=l.xp;d.coins+=Math.round(l.xp/2);if(d.completedLessons.length>=4&&!d.badges.includes('Eco Explorer'))d.badges.push('Eco Explorer');if(d.completedLessons.length==lessons.length&&!d.badges.includes('Course Finisher'))d.badges.push('Course Finisher');save(d);toast('Lesson completed! XP and EcoCoins added.')}closeModal();location.reload()}
function quizPage(){renderShell('quiz');$('#quizCards').innerHTML=lessons.map(l=>`<div class="card"><h3>${l.icon} ${l.t} Quiz</h3><p class="muted">15 questions • instant score • explanation</p><p><span class="pill">Reward up to 300 XP</span></p><button class="btn primary" onclick="startQuiz('lesson${l.id}')">Start 15 Question Quiz</button></div>`).join('')}
let qkey='',qi=0,score=0;function startQuiz(k){qkey=k;qi=0;score=0;showQ();$('.modal').classList.add('show')}function showQ(){let q=quiz[qkey][qi];$('#modalTitle').textContent=`Question ${qi+1}/${quiz[qkey].length}`;$('#modalBody').innerHTML=`<h3>${esc(q.q)}</h3>${q.a.map((x,i)=>`<div class="card quiz-option" onclick="answer(${i})">${String.fromCharCode(65+i)}. ${esc(x)}</div>`).join('')}`}function answer(i){let q=quiz[qkey][qi];if(i==q.c)score++;qi++;if(qi<quiz[qkey].length)showQ();else{let d=get();let reward=score*20;d.xp+=reward;d.coins+=score*10;if(!d.completedQuizzes.includes(qkey))d.completedQuizzes.push(qkey);if(score>=12&&!d.badges.includes('Quiz Master'))d.badges.push('Quiz Master');if(d.completedQuizzes.length>=4&&!d.badges.includes('Knowledge Champion'))d.badges.push('Knowledge Champion');save(d);$('#modalTitle').textContent='Quiz Completed';$('#modalBody').innerHTML=`<h2>Your Score: ${score}/${quiz[qkey].length}</h2><p class="pill">Earned ${reward} XP and ${score*10} EcoCoins</p><p class="muted">Passing target: 12/15. Try all modules for more badges.</p><button class="btn primary" onclick="location.reload()">Continue</button>`}}
function challengesPage(){renderShell('challenges');let d=get();$('#challengeGrid').innerHTML=challenges.map((t,i)=>`<div class="card challenge"><h3>${icons[i]} ${t}</h3><p class="muted">5 proof steps • teacher review • +100 EcoCoins after approval.</p><button class="btn primary" onclick="submitChallenge('${esc(t)}',${i})">Open Challenge</button></div>`).join('');$('#submissions').innerHTML=d.submissions.length?d.submissions.map(s=>`<tr><td>${esc(s.title)}</td><td>${s.date}</td><td><span class="tag">${s.status}</span></td><td>+${s.coins}</td></tr>`).join(''):'<tr><td colspan="4">No submissions yet. Complete any one of the 15 challenges.</td></tr>'}
function submitChallenge(t,i){$('#modalTitle').textContent=icons[i]+' '+t;$('#modalBody').innerHTML=`<h3>Challenge Requirements</h3><ol>${challengeSteps.map(s=>`<li>${s}</li>`).join('')}</ol><label>Proof note</label><textarea id="proof" rows="5" placeholder="Write what you did, where, date, and result..." required></textarea><label>Photo proof file</label><input id="photo" type="file"><button class="btn primary" onclick="saveChallenge('${esc(t)}')">Submit for Teacher Review</button>`;$('.modal').classList.add('show')}
function saveChallenge(t){let note=$('#proof')?.value.trim();if(!note||note.length<20){toast('Write at least 20 characters proof note');return}let d=get();d.submissions.unshift({title:t,status:'Pending Review',date:new Date().toISOString().slice(0,10),coins:100,note});save(d);toast('Challenge sent for review');closeModal();location.reload()}
function teacherPage(){renderShell('teacher');let d=get();$('#reviewTable').innerHTML=d.submissions.length?d.submissions.map((s,i)=>`<tr><td>${esc(s.title)}<br><small>${esc(s.note||'No note')}</small></td><td>${s.date}</td><td>${s.status}</td><td><button class="btn primary" onclick="approve(${i})">Approve</button></td></tr>`).join(''):'<tr><td colspan="4">No student submissions yet.</td></tr>'}function approve(i){let d=get();if(d.submissions[i].status!='Approved'){d.submissions[i].status='Approved';d.coins+=d.submissions[i].coins;d.xp+=100;if(!d.badges.includes('Challenge Hero'))d.badges.push('Challenge Hero');if(d.submissions.filter(s=>s.status=='Approved').length>=5&&!d.badges.includes('Eco Action Leader'))d.badges.push('Eco Action Leader');save(d)}location.reload()}
function leaderboardPage(){renderShell('leaderboard');let d=get();let rows=[['Priya Sharma',3350],['Ramesh Kumar',2880],['Aadhya Green Club',2440],[d.user.name,d.xp],['Meena Patel',1980],['John Lee',1660],['Nila Eco Team',1500]].sort((a,b)=>b[1]-a[1]);$('#leaderRows').innerHTML=rows.map((r,i)=>`<tr><td>#${i+1}</td><td>${esc(r[0])} ${r[0]==d.user.name?'(You)':''}</td><td>${r[1]}</td></tr>`).join('')}
function profilePage(){renderShell('profile');let d=get();let totalKg=(d.totalWasteWeight/1000).toFixed(2);$('#profileBox').innerHTML=`<h2>${d.user.avatar} ${esc(d.user.name)}</h2><p>${esc(d.user.role)} • ${esc(d.user.school)}</p><p class="pill">${esc(d.user.email)}</p><hr><h3>Progress & Rewards</h3><p><span class="pill">XP: ${d.xp}</span> <span class="pill">Level: ${d.level}</span> <span class="pill">💰 EcoCoins: ${d.coins}</span></p><h3>🗑️ Smart Dustbin Impact</h3><p><span class="pill">Scans: ${d.scanHistory.length}</span> <span class="pill">Waste Segregated: ${totalKg} kg</span> <span class="pill">Vouchers Redeemed: ${d.redemptions.length}</span></p><h3>Badges</h3><p>${d.badges.map(b=>`<span class="pill">🏅 ${esc(b)}</span>`).join(' ')}</p><h3>Completion</h3><p>${d.completedLessons.length}/${lessons.length} lessons completed • ${d.completedQuizzes.length}/${lessons.length} quizzes completed • ${d.submissions.filter(s=>s.status=='Approved').length}/15 challenges approved</p>`}
function certPage(){renderShell('certificate');let d=get();$('#certName').textContent=d.user.name;$('#certXp').textContent=d.xp;$('#certDate').textContent=new Date().toLocaleDateString();}

/* ==========================================================================
   SMART DUSTBIN & SCANNER ENGINE
   ========================================================================== */
let currentScanState={
  step:1,
  selectedBin:smartBins[0],
  selectedCategory:null,
  cameraStream:null,
  detectedWeight:0,
  fillLevelDelta:0
};

function scanPage(){
  renderShell('scan');
  renderScanFlowSteps();
  renderBinViewfinder();
  renderCompartments();
  renderRedemptionHub();
  renderAuthoritiesDashboard();
  renderScanHistory();
}

function switchScanTab(tab){
  $$('.tab-link').forEach(b=>b.classList.remove('active'));
  $(`.tab-link[data-tab="${tab}"]`)?.classList.add('active');
  $('#tabContentFlow').style.display=tab==='flow'?'block':'none';
  $('#tabContentRedeem').style.display=tab==='redeem'?'block':'none';
  $('#tabContentAuthorities').style.display=tab==='authorities'?'block':'none';
  $('#tabContentHistory').style.display=tab==='history'?'block':'none';
  if(tab==='flow') renderBinViewfinder();
}

function renderScanFlowSteps(){
  const s=currentScanState.step;
  const steps=[
    {num:1,title:'1. Scan QR/NFC on Bin'},
    {num:2,title:'2. Select Waste Type'},
    {num:3,title:'3. Compartment Unlocks'},
    {num:4,title:'4. Sensor Verification'},
    {num:5,title:'5. Instant Coins Credited'}
  ];
  $('#scanSteps').innerHTML=steps.map(st=>`
    <div class="step-item ${st.num===s?'active':''} ${st.num<s?'completed':''}">
      <div class="step-num">${st.num<s?'✓':st.num}</div>
      <div class="step-title">${st.title}</div>
    </div>
  `).join('');
}

function renderBinViewfinder(){
  const b=currentScanState.selectedBin;
  const isStep1=currentScanState.step===1;
  $('#step1View').style.display=isStep1?'block':'none';
  $('#step2View').style.display=currentScanState.step===2?'block':'none';
  $('#step3View').style.display=currentScanState.step===3?'block':'none';
  $('#step4View').style.display=currentScanState.step===4?'block':'none';
  $('#step5View').style.display=currentScanState.step===5?'block':'none';

  $('#activeBinBadge').innerHTML=`
    <span class="pill" style="background:#052e16;color:#d1fae5;border-color:#16a34a">
      📍 Connected Bin: <b>${b?esc(b.name):'None'}</b> (${b?b.id:''})
    </span>
    <span class="pill" style="background:#ecfdf5;color:#047857">
      📶 Status: <b>Online</b> • Fill Level: <b>${b?b.fill:0}%</b>
    </span>
  `;
}

function renderCompartments(){
  const sel=currentScanState.selectedCategory;
  $('#compartmentsRack').innerHTML=wasteCategories.map(c=>{
    const isUnlocked=sel&&sel.key===c.key&&(currentScanState.step===3||currentScanState.step===4);
    return `
      <div class="bin-compartment ${isUnlocked?'unlocked':''}" onclick="if(currentScanState.step===2)selectWaste('${c.key}')">
        <div class="bin-lid ${c.color}">
          <span>${isUnlocked?'LID OPEN':'LID CLOSED'}</span>
        </div>
        <div class="bin-icon">${c.icon}</div>
        <b style="font-size:15px;display:block">${esc(c.name)}</b>
        <span class="tag" style="background:#f1f5f9;color:#334155">${c.color.toUpperCase()}</span>
        <div class="bin-lock-status ${isUnlocked?'unlocked':'locked'}">
          ${isUnlocked?'🔓 UNLOCKED':'🔒 LOCKED'}
        </div>
      </div>
    `;
  }).join('');
}

/* Step 1: Camera & NFC Scanner */
async function startCameraScanner(){
  const video=$('#scannerVideo');
  const btn=$('#startCamBtn');
  if(!video) return;

  if(currentScanState.cameraStream){
    stopCameraScanner();
    btn.textContent='📷 Start Camera QR Scanner';
    return;
  }

  try{
    btn.textContent='⏳ Connecting Camera...';
    const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});
    currentScanState.cameraStream=stream;
    video.srcObject=stream;
    video.play();
    btn.textContent='⏹️ Stop Camera';
    toast('Camera active! Point at Bin QR code');
    
    // Barcode detection loop if supported
    if('BarcodeDetector' in window){
      const detector=new BarcodeDetector({formats:['qr_code']});
      const checkFrame=async()=>{
        if(!currentScanState.cameraStream) return;
        try{
          const codes=await detector.detect(video);
          if(codes.length>0){
            toast('QR Code detected: '+codes[0].rawValue);
            connectBin('ECO-BIN-01');
            stopCameraScanner();
            return;
          }
        }catch(e){}
        requestAnimationFrame(checkFrame);
      };
      requestAnimationFrame(checkFrame);
    }
  }catch(err){
    console.warn('Camera access fallback:',err);
    toast('Camera unavailable or permission denied. Use 1-Tap Demo Scan!');
    btn.textContent='📷 Start Camera QR Scanner';
  }
}

function stopCameraScanner(){
  if(currentScanState.cameraStream){
    currentScanState.cameraStream.getTracks().forEach(t=>t.stop());
    currentScanState.cameraStream=null;
    const video=$('#scannerVideo');
    if(video) video.srcObject=null;
    const btn=$('#startCamBtn');
    if(btn) btn.textContent='📷 Start Camera QR Scanner';
  }
}

function simulateNfcTap(){
  playChime('unlock');
  toast('📲 NFC Tag Read: Smart Bin #ECO-01 Verified!');
  connectBin('ECO-BIN-01');
}

function connectBin(binId){
  const bin=smartBins.find(b=>b.id===binId)||smartBins[0];
  currentScanState.selectedBin=bin;
  currentScanState.step=2;
  stopCameraScanner();
  playChime('unlock');
  toast(`Connected to ${bin.name}! Select waste type.`);
  renderScanFlowSteps();
  renderBinViewfinder();
  renderCompartments();
  renderWasteSelectionCards();
}

function manualBinConnect(){
  const val=$('#manualBinInput')?.value.trim();
  if(!val){
    toast('Please enter a valid Bin ID (e.g. ECO-BIN-01)');
    return;
  }
  connectBin(val.toUpperCase());
}

/* Step 2: Waste Type Selection */
function renderWasteSelectionCards(){
  $('#wasteTypeGrid').innerHTML=wasteCategories.map(c=>`
    <div class="waste-card" onclick="selectWaste('${c.key}')">
      <div style="font-size:36px;margin-bottom:6px">${c.icon}</div>
      <h3 style="margin:4px 0">${esc(c.name)}</h3>
      <p class="muted" style="font-size:12px;margin:4px 0 10px">${esc(c.desc)}</p>
      <div class="row" style="justify-content:center">
        <span class="pill" style="font-size:12px">+${c.coins} Coins</span>
        <span class="pill" style="font-size:12px">+${c.xp} XP</span>
      </div>
    </div>
  `).join('');
}

function selectWaste(categoryKey){
  const cat=wasteCategories.find(c=>c.key===categoryKey);
  if(!cat) return;
  currentScanState.selectedCategory=cat;
  currentScanState.step=3;
  playChime('unlock');
  toast(`Compartment #${cat.compId} (${cat.name}) Unlocking...`);
  renderScanFlowSteps();
  renderBinViewfinder();
  renderCompartments();

  $('#unlockedMessage').innerHTML=`
    <div class="card" style="border:2px solid var(--green);background:#f0fdf4;text-align:center;padding:24px">
      <div style="font-size:42px">${cat.icon}</div>
      <h2 style="color:#15803d;margin:6px 0">Compartment #${cat.compId} (${cat.name}) is UNLOCKED & OPEN!</h2>
      <p class="muted" style="max-width:520px;margin:8px auto">
        Lid has flipped open automatically via IoT servo motor. Please deposit your <b>${esc(cat.name)}</b> waste now.
      </p>
      <button class="btn primary" style="font-size:16px;padding:14px 28px;margin-top:10px" onclick="triggerDeposit()">
        📥 I Have Placed Waste — Run Sensor Verification
      </button>
    </div>
  `;
}

/* Step 3 & 4: Sensor Verification */
function triggerDeposit(){
  const cat=currentScanState.selectedCategory;
  currentScanState.step=4;
  playChime('sensor');
  renderScanFlowSteps();
  renderBinViewfinder();
  renderCompartments();

  // Generate realistic sensor data
  const grams=cat.baseGrams+Math.floor(Math.random()*40-20);
  currentScanState.detectedWeight=grams;
  currentScanState.fillLevelDelta=Math.round((grams/200)*2);

  $('#sensorOutput').innerHTML=`
    <div class="sensor-monitor">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
        <h3 style="margin:0;color:#86efac">⚡ IoT Hardware Sensor Reading in Progress...</h3>
        <span class="pill" style="background:rgba(255,255,255,.1);color:#86efac;border-color:#4ade80">
          Bin ID: ${currentScanState.selectedBin.id}
        </span>
      </div>
      <div class="sensor-grid">
        <div class="sensor-tile">
          <div class="muted" style="color:#94a3b8">⚖️ Load Cell (Weight)</div>
          <div class="sensor-val" id="sensorWeight">0 g</div>
          <small style="color:#cbd5e1">Calibrating load sensor</small>
        </div>
        <div class="sensor-tile">
          <div class="muted" style="color:#94a3b8">📶 Ultrasonic Depth</div>
          <div class="sensor-val" id="sensorFill">${currentScanState.selectedBin.fill}%</div>
          <small style="color:#cbd5e1">Measuring compartment volume</small>
        </div>
        <div class="sensor-tile">
          <div class="muted" style="color:#94a3b8">👁️ Optical Material Check</div>
          <div class="sensor-val" id="sensorMaterial" style="font-size:20px;color:#facc15">Analyzing...</div>
          <small style="color:#cbd5e1">AI-based material validation</small>
        </div>
      </div>
      <div class="progress" style="margin-top:20px;height:10px">
        <div class="bar" id="sensorProgressBar" style="width:10%"></div>
      </div>
    </div>
  `;

  // Animate sensor acquisition
  setTimeout(()=>{
    playChime('sensor');
    $('#sensorWeight').textContent=`${grams} g`;
    $('#sensorProgressBar').style.width='60%';
  },800);

  setTimeout(()=>{
    playChime('sensor');
    const newFill=Math.min(100,currentScanState.selectedBin.fill+currentScanState.fillLevelDelta);
    $('#sensorFill').textContent=`${newFill}%`;
    $('#sensorMaterial').textContent='✓ Verified '+cat.name;
    $('#sensorMaterial').style.color='#4ade80';
    $('#sensorProgressBar').style.width='100%';
  },1700);

  setTimeout(()=>{
    completeSensorAndCredit();
  },2500);
}

function completeSensorAndCredit(){
  const cat=currentScanState.selectedCategory;
  const bin=currentScanState.selectedBin;
  const grams=currentScanState.detectedWeight;

  playChime('coin');
  let d=get();
  d.coins+=cat.coins;
  d.xp+=cat.xp;
  d.totalWasteWeight=(d.totalWasteWeight||0)+grams;

  // Record scan history
  const record={
    id:'DEP-'+Date.now().toString(36).toUpperCase(),
    binId:bin.id,
    binName:bin.name,
    category:cat.name,
    icon:cat.icon,
    weight:grams,
    coins:cat.coins,
    xp:cat.xp,
    date:new Date().toLocaleDateString()+' '+new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
  };
  d.scanHistory.unshift(record);

  // Check badges
  if(!d.badges.includes('Smart Segregator')) d.badges.push('Smart Segregator');
  if(d.scanHistory.length>=5&&!d.badges.includes('Eco-Bin Pioneer')) d.badges.push('Eco-Bin Pioneer');
  if(d.totalWasteWeight>=1000&&!d.badges.includes('Zero Waste Champion')) d.badges.push('Zero Waste Champion');

  save(d);
  renderShell('scan');

  currentScanState.step=5;
  renderScanFlowSteps();
  renderBinViewfinder();
  renderCompartments();

  $('#rewardSuccessBox').innerHTML=`
    <div class="card" style="text-align:center;padding:36px;background:radial-gradient(circle at center,#f0fdf4,#ffffff);border:2px solid var(--green)">
      <div style="font-size:56px;animation:coinPop .6s ease-out">🎉 💰</div>
      <h1 style="color:#052e16;margin:8px 0">Instant Reward Credited!</h1>
      <p style="font-size:18px;color:#15803d;margin:4px 0 16px">
        <b>+${cat.coins} Eco-Coins</b> & <b>+${cat.xp} XP</b> added to your App Wallet!
      </p>
      <div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin:18px 0">
        <span class="pill">⚖️ Deposit Weight: <b>${grams}g</b></span>
        <span class="pill">🗑️ Material: <b>${esc(cat.name)}</b></span>
        <span class="pill">🔒 Compartment: <b>Lid Closed & Locked</b></span>
      </div>
      <p class="muted">
        Your deposit data has been transmitted securely via IoT to campus waste management authorities.
      </p>
      <div style="margin-top:24px;display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
        <button class="btn primary" onclick="switchScanTab('redeem')">
          🎁 Redeem Your Eco-Coins Now
        </button>
        <button class="btn" onclick="resetScanFlow()">
          🔄 Scan Another Waste Item
        </button>
      </div>
    </div>
  `;
}

function resetScanFlow(){
  currentScanState.step=1;
  currentScanState.selectedCategory=null;
  currentScanState.detectedWeight=0;
  renderScanFlowSteps();
  renderBinViewfinder();
  renderCompartments();
}

/* ==========================================================================
   REDEMPTION HUB (College & Public Civic Rewards)
   ========================================================================== */
function renderRedemptionHub(){
  let d=get();
  $('#userCoinsDisplay')&&($('#userCoinsDisplay').textContent=d.coins);

  // College cards
  $('#collegeRewardsGrid').innerHTML=collegeRewards.map(r=>`
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <span class="tag" style="background:#e0f2fe;color:#0369a1">Institutional</span>
        <span class="pill" style="font-weight:900;background:#fef3c7;color:#92400e;border-color:#fde68a">
          💰 ${r.cost} Coins
        </span>
      </div>
      <h3 style="margin:10px 0 6px">${esc(r.title)}</h3>
      <p class="muted" style="font-size:13px;line-height:1.5">${esc(r.desc)}</p>
      <button class="btn ${d.coins>=r.cost?'primary':'locked'}" style="width:100%;margin-top:10px" onclick="redeemReward('${r.id}','College')">
        ${d.coins>=r.cost?'Redeem Voucher':'Need '+(r.cost-d.coins)+' More Coins'}
      </button>
    </div>
  `).join('');

  // Public cards
  $('#publicRewardsGrid').innerHTML=publicRewards.map(r=>`
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <span class="tag" style="background:#fef3c7;color:#92400e">Public / Civic</span>
        <span class="pill" style="font-weight:900;background:#fef3c7;color:#92400e;border-color:#fde68a">
          💰 ${r.cost} Coins
        </span>
      </div>
      <h3 style="margin:10px 0 6px">${esc(r.title)}</h3>
      <p class="muted" style="font-size:13px;line-height:1.5">${esc(r.desc)}</p>
      <button class="btn ${d.coins>=r.cost?'primary':'locked'}" style="width:100%;margin-top:10px" onclick="redeemReward('${r.id}','Public')">
        ${d.coins>=r.cost?'Redeem Voucher':'Need '+(r.cost-d.coins)+' More Coins'}
      </button>
    </div>
  `).join('');

  // User redeemed vouchers
  const vList=d.redemptions||[];
  $('#activeVouchersList').innerHTML=vList.length?vList.map(v=>`
    <div class="voucher-ticket">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap">
        <div>
          <span class="tag">${esc(v.category)} Redemption</span>
          <h3 style="margin:6px 0">${esc(v.title)}</h3>
          <p class="muted" style="font-size:12px;margin:2px 0">Issued on: ${v.date} • Cost: ${v.cost} EcoCoins</p>
        </div>
        <div style="text-align:right">
          <div style="background:#fff;border:1px solid #d97706;padding:8px 14px;border-radius:12px;font-family:monospace;font-size:16px;font-weight:900;color:#b45309">
            ${v.code}
          </div>
          <small style="color:#059669;font-weight:800">● Status: Active</small>
        </div>
      </div>
    </div>
  `).join(''):'<p class="muted" style="padding:14px;background:#fff;border-radius:14px;border:1px solid var(--line)">No redeemed vouchers yet. Use your EcoCoins to redeem college cafeteria or civic transit coupons above!</p>';
}

function redeemReward(id,category){
  const catalog=category==='College'?collegeRewards:publicRewards;
  const item=catalog.find(x=>x.id===id);
  if(!item) return;

  let d=get();
  if(d.coins<item.cost){
    toast(`Insufficient EcoCoins! You need ${item.cost-d.coins} more coins.`);
    return;
  }

  d.coins-=item.cost;
  const voucherCode='ECO-'+Math.floor(100000+Math.random()*900000);
  const voucher={
    id:'VOUCH-'+Date.now().toString(36).toUpperCase(),
    title:item.title,
    cost:item.cost,
    category:item.category,
    code:voucherCode,
    date:new Date().toLocaleDateString(),
    status:'Active'
  };
  d.redemptions.unshift(voucher);
  save(d);
  playChime('coin');

  renderShell('scan');
  renderRedemptionHub();

  $('#modalTitle').textContent='🎁 Voucher Redeemed Successfully!';
  $('#modalBody').innerHTML=`
    <div style="text-align:center;padding:14px">
      <h2>${esc(item.title)}</h2>
      <p class="muted">${esc(item.desc)}</p>
      <div style="background:#fef3c7;border:2px dashed #d97706;border-radius:16px;padding:18px;margin:16px 0">
        <p style="margin:0;font-size:12px;color:#92400e;font-weight:800">SHOW THIS COUPON CODE AT COUNTER</p>
        <div style="font-size:32px;font-weight:900;letter-spacing:4px;color:#b45309;margin:8px 0;font-family:monospace">
          ${voucherCode}
        </div>
        <small style="color:#78350f">Deducted ${item.cost} EcoCoins • Valid for 30 Days</small>
      </div>
      <button class="btn primary" onclick="closeModal()">Done</button>
    </div>
  `;
  $('.modal').classList.add('show');
}

/* ==========================================================================
   AUTHORITIES IoT DASHBOARD (Real-Time Monitoring & Route Optimization)
   ========================================================================== */
function renderAuthoritiesDashboard(){
  $('#authoritiesBinTable').innerHTML=smartBins.map(b=>{
    const isCritical=b.fill>=85;
    const isWarning=b.fill>=70&&b.fill<85;
    const fillBadge=isCritical?`<span class="tag" style="background:#fee2e2;color:#991b1b">🔴 ${b.fill}% Critical</span>`:
                    isWarning?`<span class="tag" style="background:#fef3c7;color:#92400e">🟡 ${b.fill}% High</span>`:
                    `<span class="tag" style="background:#dcfce7;color:#15803d">🟢 ${b.fill}% Normal</span>`;
    return `
      <tr>
        <td><b>${b.id}</b><br><small class="muted">${esc(b.name)}</small></td>
        <td>${esc(b.loc)}</td>
        <td>${fillBadge}</td>
        <td>${b.weightTotal} kg</td>
        <td><span class="pill" style="padding:4px 8px;font-size:11px">${b.type}</span></td>
      </tr>
    `;
  }).join('');
}

function computeOptimizedRoute(){
  playChime('unlock');
  const criticalBins=smartBins.filter(b=>b.fill>=65).sort((a,b)=>b.fill-a.fill);
  $('#routeOptimizerResult').innerHTML=`
    <div class="card" style="background:#0f172a;color:#f8fafc;border:2px solid #38bdf8;margin-top:14px;padding:22px">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap">
        <h3 style="margin:0;color:#38bdf8">🚛 AI Smart Collection Route Dispatched</h3>
        <span class="tag" style="background:#0369a1;color:#fff">Optimized via IoT Telemetry</span>
      </div>
      <p style="margin:8px 0;color:#cbd5e1;font-size:14px">
        Prioritizing bins above 65% capacity threshold to prevent overflow and eliminate unnecessary fuel burn:
      </p>
      <ol style="margin:10px 0;padding-left:22px;line-height:1.8">
        <li><b>Starting Point:</b> Campus Central Maintenance Depot</li>
        ${criticalBins.map(b=>`<li><b>Stop:</b> ${esc(b.name)} (${b.id}) — <span style="color:#f87171">${b.fill}% Full</span> (${b.weightTotal} kg)</li>`).join('')}
        <li><b>Destination:</b> District Municipal Segregation & Recycling Center</li>
      </ol>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:14px">
        <span class="pill" style="background:rgba(255,255,255,.1);color:#86efac;border-color:#4ade80">
          🌱 Fuel Saved: ~3.4 Litres
        </span>
        <span class="pill" style="background:rgba(255,255,255,.1);color:#86efac;border-color:#4ade80">
          ⏱️ Route Time Saved: 32 mins
        </span>
        <span class="pill" style="background:rgba(255,255,255,.1);color:#86efac;border-color:#4ade80">
          🌍 CO2 Reduction: ~8.9 kg
        </span>
      </div>
    </div>
  `;
}

/* ==========================================================================
   USER SCAN HISTORY
   ========================================================================== */
function renderScanHistory(){
  let d=get();
  const list=d.scanHistory||[];
  $('#scanHistoryTable').innerHTML=list.length?list.map(s=>`
    <tr>
      <td>${s.date}</td>
      <td><b>${esc(s.binName||s.binId)}</b></td>
      <td>${s.icon||'🗑️'} ${esc(s.category)}</td>
      <td>${s.weight} g</td>
      <td><span class="pill" style="padding:4px 8px;font-size:11px">+${s.coins} Coins</span></td>
    </tr>
  `).join(''):'<tr><td colspan="5" class="muted">No smart bin deposits yet. Scan any bin above to record your first deposit!</td></tr>';
}

document.addEventListener('DOMContentLoaded',()=>{initAuth();});
