
import React, { useMemo, useState } from 'react';
import {
  Activity, AlertTriangle, BarChart3, Bell, Camera, Car, ChevronRight,
  CircleDollarSign, Cloud, Database, Gauge, LayoutDashboard, Menu, Search,
  Server, Settings, ShieldCheck, Smartphone, Users, Wifi, X, Zap
} from 'lucide-react';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';

const NAV = [
  ['Overview', LayoutDashboard],
  ['Live Monitoring', Camera],
  ['Violations', AlertTriangle],
  ['Vehicle Records', Car],
  ['Analytics', BarChart3],
  ['Cost Optimization', CircleDollarSign],
  ['System Health', Activity],
  ['Settings', Settings],
];

const trafficTrend = [
  {time:'07:00', vehicles:54, violations:2},{time:'08:00', vehicles:122, violations:8},
  {time:'09:00', vehicles:148, violations:11},{time:'10:00', vehicles:112, violations:7},
  {time:'11:00', vehicles:97, violations:5},{time:'12:00', vehicles:136, violations:10},
  {time:'13:00', vehicles:127, violations:9},{time:'14:00', vehicles:119, violations:7},
  {time:'15:00', vehicles:151, violations:12},{time:'16:00', vehicles:174, violations:15},
  {time:'17:00', vehicles:144, violations:10}
];

const categories = [
  {name:'Staff', value:28}, {name:'On-Campus Student', value:36},
  {name:'Off-Campus Student', value:25}, {name:'Visitor', value:11}
];

const violations = [
  {id:'VIO-20260812-0042', time:'12 Aug 2026 · 10:42 AM', plate:'MDE 4582', category:'On-Campus Student', speed:52, limit:35, location:'Main Campus Road', status:'High'},
  {id:'VIO-20260812-0041', time:'12 Aug 2026 · 10:35 AM', plate:'JSV 8821', category:'Visitor', speed:67, limit:35, location:'Main Campus Road', status:'Critical'},
  {id:'VIO-20260812-0040', time:'12 Aug 2026 · 10:22 AM', plate:'MCT 3108', category:'Staff', speed:43, limit:35, location:'Faculty Zone', status:'Moderate'},
  {id:'VIO-20260812-0039', time:'12 Aug 2026 · 10:08 AM', plate:'MBX 7714', category:'Off-Campus Student', speed:48, limit:35, location:'Main Campus Road', status:'High'},
  {id:'VIO-20260812-0038', time:'12 Aug 2026 · 09:51 AM', plate:'VBP 1932', category:'On-Campus Student', speed:41, limit:35, location:'Residential College', status:'Moderate'},
];

const vehicleRows = [
  {plate:'MDE 4582', category:'On-Campus Student', detections:12, violations:3, max:52, latest:'12 Aug 2026'},
  {plate:'JSV 8821', category:'Visitor', detections:4, violations:2, max:67, latest:'12 Aug 2026'},
  {plate:'MCT 3108', category:'Staff', detections:18, violations:1, max:43, latest:'12 Aug 2026'},
  {plate:'MBX 7714', category:'Off-Campus Student', detections:7, violations:2, max:48, latest:'12 Aug 2026'},
];

const systemItems = [
  ['Camera / CAM-01','Online',Camera],['Raspberry Pi 4','Online',Smartphone],
  ['Network','Connected',Wifi],['AWS IoT Core','Connected',Cloud],
  ['AWS Lambda','Healthy',Zap],['Amazon RDS','Available',Database],
  ['Amazon S3','Available',Cloud],['EC2 Dashboard','Running',Server],
];

function App(){
  const [page,setPage] = useState('Overview');
  const [sidebar,setSidebar] = useState(true);
  const [selected,setSelected] = useState(null);
  const [query,setQuery] = useState('');

  return <div className="app">
    <aside className={sidebar ? 'sidebar' : 'sidebar collapsed'}>
      <div className="brand">
        <div className="brandMark"><Gauge size={24}/></div>
        {sidebar && <div><b>CAMPUSPEED</b><small>Smart Campus Traffic</small></div>}
      </div>
      <nav>
        {NAV.map(([label,Icon]) =>
          <button key={label} className={page===label?'active':''} onClick={()=>setPage(label)}>
            <Icon size={19}/>{sidebar && <span>{label}</span>}
          </button>
        )}
      </nav>
      {sidebar && <div className="sidebarFoot">
        <span className="dot green"></span><div><b>System Online</b><small>CAM-01 connected</small></div>
      </div>}
    </aside>

    <main className="main">
      <header className="topbar">
        <div className="topLeft">
          <button className="iconBtn" onClick={()=>setSidebar(!sidebar)}><Menu size={20}/></button>
          <div><h1>{page}</h1><p>{subtitle(page)}</p></div>
        </div>
        <div className="topRight">
          <div className="livePill"><span className="dot green pulse"></span> Live</div>
          <button className="iconBtn"><Bell size={19}/></button>
          <div className="avatar">CS</div>
          <div className="profile"><b>Administrator</b><span>Campus Security</span></div>
        </div>
      </header>

      <section className="content">
        {page==='Overview' && <Overview setPage={setPage} setSelected={setSelected}/>}
        {page==='Live Monitoring' && <LiveMonitoring/>}
        {page==='Violations' && <Violations query={query} setQuery={setQuery} setSelected={setSelected}/>}
        {page==='Vehicle Records' && <VehicleRecords/>}
        {page==='Analytics' && <Analytics/>}
        {page==='Cost Optimization' && <CostOptimization/>}
        {page==='System Health' && <SystemHealth/>}
        {page==='Settings' && <SettingsPage/>}
      </section>
    </main>

    {selected && <ViolationModal item={selected} onClose={()=>setSelected(null)}/>}
  </div>
}

function subtitle(page){
  const m={
    'Overview':'Real-time campus traffic monitoring and violation analytics',
    'Live Monitoring':'Edge-based vehicle detection, OCR and speed estimation',
    'Violations':'Review speeding incidents and captured evidence',
    'Vehicle Records':'Detected vehicles and category-based history',
    'Analytics':'Traffic behaviour, speed trends and safety insights',
    'Cost Optimization':'Selective event storage and AWS resource efficiency',
    'System Health':'IoT device, network and AWS service status',
    'Settings':'Configure monitoring rules and cloud upload behaviour'
  };
  return m[page];
}

function Overview({setPage,setSelected}){
  return <>
    <div className="hero">
      <div><span className="eyebrow">UTeM CAMPUS ROAD SAFETY</span>
        <h2>Process locally. Store selectively. Analyze centrally.</h2>
        <p>CAMPUSPEED combines Raspberry Pi edge processing, computer vision, IoT and AWS to monitor speed while reducing unnecessary cloud usage.</p>
      </div>
      <SpeedSign value={35}/>
    </div>

    <div className="kpis">
      <Kpi icon={Car} label="Vehicles Detected" value="1,284" foot="+8.2% vs yesterday"/>
      <Kpi icon={AlertTriangle} label="Speeding Violations" value="86" foot="6.7% violation rate" danger/>
      <Kpi icon={Gauge} label="Average Speed" value="31.4" unit="km/h" foot="Within monitored period"/>
      <Kpi icon={Zap} label="Maximum Speed" value="67" unit="km/h" foot="32 km/h above limit" danger/>
      <Kpi icon={Cloud} label="Cloud Events Stored" value="86" foot="Selective storage active"/>
    </div>

    <div className="twoCol">
      <LiveCard/>
      <div className="panel">
        <PanelTitle title="Traffic Activity" action="View analytics" onClick={()=>setPage('Analytics')}/>
        <div className="chartBox">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficTrend}><defs>
              <linearGradient id="areaBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.28}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="time"/><YAxis/>
            <Tooltip/><Area type="monotone" dataKey="vehicles" stroke="#2563eb" fill="url(#areaBlue)" strokeWidth={2.3}/>
          </AreaChart></ResponsiveContainer>
        </div>
      </div>
    </div>

    <div className="panel">
      <PanelTitle title="Recent Speeding Violations" action="View all" onClick={()=>setPage('Violations')}/>
      <ViolationTable rows={violations.slice(0,4)} onView={setSelected}/>
    </div>
  </>
}

function LiveMonitoring(){
  return <div className="twoCol livePage">
    <LiveCard large/>
    <div>
      <div className="panel">
        <PanelTitle title="Detection Pipeline"/>
        <div className="pipeline">
          {['Camera','Edge Processing','Speed Detection','OCR + Sticker','Violation Decision','AWS Event'].map((x,i)=>
            <React.Fragment key={x}><div className="pipeNode"><span>{i+1}</span>{x}</div>{i<5&&<ChevronRight size={17}/>}</React.Fragment>)}
        </div>
      </div>
      <div className="panel">
        <PanelTitle title="Current Detection"/>
        <InfoGrid items={[
          ['Speed','42 km/h'],['Speed Limit','35 km/h'],['Plate','MDE 4582'],
          ['Category','On-Campus Student'],['OCR Confidence','94%'],['Sticker Confidence','91%']
        ]}/>
        <div className="alertBox"><AlertTriangle size={20}/><div><b>Speeding detected</b><p>Vehicle is travelling 7 km/h above the configured limit.</p></div></div>
      </div>
    </div>
  </div>
}

function LiveCard({large=false}){
  return <div className="panel">
    <PanelTitle title="Live Traffic Monitoring" badge="CAM-01 · ONLINE"/>
    <div className={'cameraFrame '+(large?'large':'')}>
      <div className="road">
        <div className="lane l1"></div><div className="lane l2"></div>
        <div className="carMock"><Car size={48}/></div>
        <div className="box vehicleBox"><span>Vehicle · 96%</span></div>
        <div className="box plateBox"><span>MDE 4582</span></div>
        <div className="cameraOverlay">
          <span className="liveBadge">● LIVE</span>
          <div className="speedOverlay"><b>42</b><span>km/h</span><em>SPEEDING</em></div>
        </div>
      </div>
    </div>
    <div className="statusRow">
      <Status label="Detection" value="ACTIVE"/><Status label="OCR" value="READY"/>
      <Status label="Sticker" value="DETECTED"/><Status label="AWS Upload" value="EVENT SENT"/>
    </div>
  </div>
}

function Violations({query,setQuery,setSelected}){
  const filtered = useMemo(()=>violations.filter(v=>(v.plate+v.category+v.location).toLowerCase().includes(query.toLowerCase())),[query]);
  return <div className="panel">
    <div className="toolbar">
      <div className="search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search plate, category or location"/></div>
      <select><option>All Categories</option><option>Staff</option><option>On-Campus Student</option><option>Off-Campus Student</option><option>Visitor</option></select>
      <select><option>Today</option><option>Last 7 Days</option><option>Last 30 Days</option></select>
      <button className="primaryBtn">Export CSV</button>
    </div>
    <ViolationTable rows={filtered} onView={setSelected}/>
  </div>
}

function ViolationTable({rows,onView}){
  return <div className="tableWrap"><table><thead><tr>
    <th>Evidence</th><th>Date & Time</th><th>Plate</th><th>Vehicle Category</th><th>Speed</th><th>Limit</th><th>Excess</th><th>Location</th><th></th>
  </tr></thead><tbody>{rows.map(v=><tr key={v.id}>
    <td><div className="thumb"><Car size={23}/></div></td><td>{v.time}</td><td><b>{v.plate}</b></td>
    <td><span className="tag">{v.category}</span></td><td><b className="dangerText">{v.speed} km/h</b></td>
    <td>{v.limit} km/h</td><td><span className="badTag">+{v.speed-v.limit}</span></td><td>{v.location}</td>
    <td><button className="textBtn" onClick={()=>onView(v)}>View</button></td>
  </tr>)}</tbody></table></div>
}

function VehicleRecords(){
  return <div className="panel">
    <PanelTitle title="Detected Vehicle Records" badge="No personal identity data"/>
    <div className="tableWrap"><table><thead><tr><th>Vehicle</th><th>Plate</th><th>Category</th><th>Detections</th><th>Violations</th><th>Highest Speed</th><th>Latest</th></tr></thead>
    <tbody>{vehicleRows.map(v=><tr key={v.plate}><td><div className="thumb"><Car size={23}/></div></td><td><b>{v.plate}</b></td><td><span className="tag">{v.category}</span></td><td>{v.detections}</td><td>{v.violations}</td><td>{v.max} km/h</td><td>{v.latest}</td></tr>)}</tbody></table></div>
  </div>
}

function Analytics(){
  const speedRanges=[{r:'0–20',n:84},{r:'21–30',n:395},{r:'31–35',n:454},{r:'36–45',n:246},{r:'46–55',n:81},{r:'56+',n:24}];
  const categoryViol=[{name:'On-Campus Student',v:32},{name:'Off-Campus Student',v:24},{name:'Staff',v:18},{name:'Visitor',v:12}];
  return <>
    <div className="insights">
      <Kpi icon={Activity} label="Peak Violation Time" value="4–5 PM" foot="15 violations recorded"/>
      <Kpi icon={Users} label="Top Violation Category" value="Students" foot="On-campus students"/>
      <Kpi icon={Gauge} label="Avg. Speeding Excess" value="+12.8" unit="km/h" foot="Across 86 events"/>
      <Kpi icon={Zap} label="Highest Recorded" value="67" unit="km/h" foot="Main Campus Road" danger/>
    </div>
    <div className="twoCol">
      <ChartPanel title="Vehicles & Violations Over Time"><ResponsiveContainer width="100%" height="100%"><LineChart data={trafficTrend}>
        <CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="time"/><YAxis/><Tooltip/><Legend/>
        <Line type="monotone" dataKey="vehicles" stroke="#2563eb" strokeWidth={2.4} dot={false}/>
        <Line type="monotone" dataKey="violations" stroke="#ef4444" strokeWidth={2.2} dot={false}/>
      </LineChart></ResponsiveContainer></ChartPanel>
      <ChartPanel title="Vehicle Category Distribution"><ResponsiveContainer width="100%" height="100%"><PieChart>
        <Pie data={categories} dataKey="value" nameKey="name" innerRadius={62} outerRadius={92} paddingAngle={3}>
          {categories.map((_,i)=><Cell key={i} fill={['#2563eb','#10b981','#f59e0b','#64748b'][i]}/>)}
        </Pie><Tooltip/><Legend/>
      </PieChart></ResponsiveContainer></ChartPanel>
    </div>
    <div className="twoCol">
      <ChartPanel title="Speed Distribution"><ResponsiveContainer width="100%" height="100%"><BarChart data={speedRanges}>
        <CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="r"/><YAxis/><Tooltip/>
        <Bar dataKey="n" fill="#2563eb" radius={[5,5,0,0]}/>
      </BarChart></ResponsiveContainer></ChartPanel>
      <ChartPanel title="Violations by Vehicle Category"><ResponsiveContainer width="100%" height="100%"><BarChart data={categoryViol} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" horizontal={false}/><XAxis type="number"/><YAxis dataKey="name" type="category" width={120}/><Tooltip/>
        <Bar dataKey="v" fill="#ef4444" radius={[0,5,5,0]}/>
      </BarChart></ResponsiveContainer></ChartPanel>
    </div>
  </>
}

function CostOptimization(){
  return <>
    <div className="costHero">
      <div className="costIcon"><CircleDollarSign size={28}/></div>
      <div><span className="eyebrow">AWS WELL-ARCHITECTED · COST OPTIMIZATION</span><h2>Event-Based Storage is Active</h2>
      <p>Only significant traffic events and essential violation data are uploaded to AWS.</p></div>
      <span className="successBadge">93.3% uploads avoided</span>
    </div>
    <div className="kpis costKpis">
      <Kpi icon={Activity} label="Events Detected" value="1,284" foot="Processed at edge"/>
      <Kpi icon={Cloud} label="Violations Uploaded" value="86" foot="6.7% cloud upload ratio"/>
      <Kpi icon={Database} label="Data Uploaded" value="124" unit="MB" foot="Selective event storage"/>
      <Kpi icon={ShieldCheck} label="Storage Avoided" value="1.67" unit="GB" foot="Estimated vs continuous"/>
      <Kpi icon={CircleDollarSign} label="Storage Reduction" value="93.1" unit="%" foot="Prototype estimate"/>
    </div>
    <div className="compareGrid">
      <FlowCard title="Traditional Continuous Storage" bad steps={['Capture all traffic','Continuous cloud upload','Store all video/data','Higher storage & compute cost']}/>
      <div className="vs">VS</div>
      <FlowCard title="CAMPUSPEED Event-Based Storage" steps={['Capture traffic','Process on Raspberry Pi','Violation decision at edge','Upload only significant event']}/>
    </div>
    <div className="twoCol">
      <div className="panel"><PanelTitle title="Cloud Storage Comparison"/>
        <div className="storageCompare">
          <CompareBar label="Continuous approach" value="1.80 GB" pct={100}/>
          <CompareBar label="CAMPUSPEED" value="124 MB" pct={7}/>
        </div>
      </div>
      <div className="panel"><PanelTitle title="Evaluation Metrics"/>
        <div className="metricList">
          <MetricRow title="Cloud Storage Utilization" desc="Store only significant traffic events."/>
          <MetricRow title="Operational Cloud Cost" desc="Reduce processing and storage overhead."/>
          <MetricRow title="Event-Based Storage Efficiency" desc="Non-violation traffic remains at the edge."/>
        </div>
      </div>
    </div>
    <div className="panel">
      <PanelTitle title="AWS Event Architecture"/>
      <div className="awsFlow">
        {[
          ['Raspberry Pi','Edge'],['AWS IoT Core','Connected'],['Lambda','Healthy'],
          ['RDS','Available'],['S3','Available'],['EC2 Dashboard','Running'],['CloudWatch','Monitoring']
        ].map(([a,b],i)=><React.Fragment key={a}><div className="awsNode"><Cloud size={21}/><b>{a}</b><small>{b}</small></div>{i<6&&<ChevronRight size={18}/>}</React.Fragment>)}
      </div>
    </div>
  </>
}

function SystemHealth(){
  return <>
    <div className="systemBanner"><ShieldCheck size={26}/><div><b>Overall System Status: HEALTHY</b><span>All core monitoring services are operational.</span></div><span className="successBadge">Last heartbeat · 10:43:02 AM</span></div>
    <div className="healthGrid">{systemItems.map(([n,s,I])=><div className="healthCard" key={n}><I size={22}/><div><b>{n}</b><span>{s}</span></div><span className="dot green"></span></div>)}</div>
    <div className="kpis">
      <Kpi icon={Activity} label="Device Uptime" value="6h 42m" foot="Raspberry Pi"/>
      <Kpi icon={Server} label="CPU Usage" value="38" unit="%" foot="Normal"/>
      <Kpi icon={Database} label="Memory Usage" value="54" unit="%" foot="Normal"/>
      <Kpi icon={Zap} label="Temperature" value="48" unit="°C" foot="Normal range"/>
      <Kpi icon={Wifi} label="Network Latency" value="42" unit="ms" foot="AWS endpoint"/>
    </div>
  </>
}

function SettingsPage(){
  const [saved,setSaved]=useState(false);
  return <div className="settingsGrid">
    <div className="panel">
      <PanelTitle title="Monitoring Configuration"/>
      <label>Speed Limit<div className="inputWithUnit"><input defaultValue="35"/><span>km/h</span></div></label>
      <label>Camera ID<input defaultValue="CAM-01"/></label>
      <label>Monitoring Location<input defaultValue="UTeM Main Campus Road"/></label>
      <label>Violation Threshold<select defaultValue="above"><option value="above">Above configured speed limit</option></select></label>
      <button className="primaryBtn" onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),1800)}}>{saved?'Saved ✓':'Save Configuration'}</button>
    </div>
    <div className="panel">
      <PanelTitle title="Processing & Cloud"/>
      <Toggle label="Violation Events Only" desc="Upload only significant speeding events" checked/>
      <Toggle label="Store Non-Violation Images" desc="Recommended OFF for Cost Optimization"/>
      <Toggle label="EasyOCR" desc="License plate recognition" checked/>
      <Toggle label="UTeM Sticker Classification" desc="Staff / student / visitor categories" checked/>
      <Toggle label="LED Warning Display" desc="Show warning when limit is exceeded" checked/>
      <div className="connection"><span className="dot green"></span><b>AWS Connection</b><span>Connected</span></div>
    </div>
  </div>
}

function ViolationModal({item,onClose}){
  return <div className="modalBack" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <div className="modal">
      <div className="modalHead"><div><span className="eyebrow">VIOLATION DETAIL</span><h2>{item.id}</h2></div><button className="iconBtn" onClick={onClose}><X/></button></div>
      <div className="modalGrid">
        <div><div className="evidence"><Car size={70}/><div className="box vehicleBox modalVehicle"><span>Vehicle · 96%</span></div><div className="box plateBox modalPlate"><span>{item.plate}</span></div></div>
        <div className="miniPipeline">Camera → Edge Processing → OCR / Sticker → Violation → AWS</div></div>
        <div><InfoGrid items={[
          ['Detected Speed',item.speed+' km/h'],['Speed Limit',item.limit+' km/h'],['Excess','+'+(item.speed-item.limit)+' km/h'],
          ['License Plate',item.plate],['Vehicle Category',item.category],['OCR Confidence','94%'],
          ['Timestamp',item.time],['Monitoring Point','CAM-01'],['Cloud Storage','Stored']
        ]}/></div>
      </div>
    </div>
  </div>
}

function SpeedSign({value}){return <div className="speedSign"><span>{value}</span><small>km/h</small></div>}
function Kpi({icon:Icon,label,value,unit,foot,danger}){return <div className="kpi"><div className={'kpiIcon '+(danger?'red':'')}><Icon size={20}/></div><div className="kpiLabel">{label}</div><div className="kpiValue">{value}<small>{unit}</small></div><div className="kpiFoot">{foot}</div></div>}
function PanelTitle({title,action,onClick,badge}){return <div className="panelTitle"><h3>{title}</h3>{badge&&<span className="tag">{badge}</span>}{action&&<button className="textBtn" onClick={onClick}>{action}<ChevronRight size={15}/></button>}</div>}
function Status({label,value}){return <div><span>{label}</span><b>{value}</b></div>}
function ChartPanel({title,children}){return <div className="panel"><PanelTitle title={title}/><div className="chartBox big">{children}</div></div>}
function InfoGrid({items}){return <div className="infoGrid">{items.map(([a,b])=><div key={a}><span>{a}</span><b>{b}</b></div>)}</div>}
function FlowCard({title,steps,bad}){return <div className={'flowCard '+(bad?'bad':'good')}><h3>{title}</h3>{steps.map((s,i)=><React.Fragment key={s}><div className="flowStep"><span>{i+1}</span>{s}</div>{i<steps.length-1&&<div className="down">↓</div>}</React.Fragment>)}</div>}
function CompareBar({label,value,pct}){return <div className="compareBar"><div><span>{label}</span><b>{value}</b></div><div className="track"><i style={{width:pct+'%'}}></i></div></div>}
function MetricRow({title,desc}){return <div className="metricRow"><ShieldCheck size={20}/><div><b>{title}</b><span>{desc}</span></div></div>}
function Toggle({label,desc,checked=false}){const [on,setOn]=useState(checked);return <div className="toggleRow"><div><b>{label}</b><span>{desc}</span></div><button className={'switch '+(on?'on':'')} onClick={()=>setOn(!on)}><i/></button></div>}

export default App;
