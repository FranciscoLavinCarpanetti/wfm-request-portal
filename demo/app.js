const initial=[
{id:"REQ-0001",type:"SHIFT_CHANGE",requester:"Ana Martin",start:"2026-11-03",end:"2026-11-03",status:"APPROVED",comments:"Cambio de turno de mañana",history:[["Enviada","Ana Martin"],["Aprobada","Aprobador WFM"]]},
{id:"REQ-0002",type:"REMOTE_WORK",requester:"Carlos Ruiz",start:"2026-11-05",end:"2026-11-05",status:"PENDING_APPROVAL",comments:"Solicitud de teletrabajo",history:[["Enviada","Carlos Ruiz"],["Pendiente de aprobación","Flujo de trabajo"]]},
{id:"REQ-0003",type:"LEAVE",requester:"Laura Gomez",start:"2026-11-10",end:"2026-11-12",status:"REJECTED",comments:"Cobertura insuficiente",history:[["Enviada","Laura Gomez"],["Rechazada","Aprobador WFM"]]},
{id:"REQ-0004",type:"SHIFT_CHANGE",requester:"Daniel Perez",start:"2026-11-14",end:"2026-11-14",status:"SUBMITTED",comments:"Ajuste de planificación",history:[["Enviada","Daniel Perez"]]},
{id:"REQ-0005",type:"LEAVE",requester:"Marta Lopez",start:"2026-12-01",end:"2026-12-03",status:"DRAFT",comments:"Vacaciones anuales",history:[["Borrador creado","Marta Lopez"]]}
];
let requests=structuredClone(initial);
const $=id=>document.getElementById(id);
const labels={SHIFT_CHANGE:"Cambio de turno",REMOTE_WORK:"Teletrabajo",LEAVE:"Vacaciones",DRAFT:"Borrador",SUBMITTED:"Enviada",PENDING_APPROVAL:"Pendiente de aprobación",APPROVED:"Aprobada",REJECTED:"Rechazada",CANCELLED:"Cancelada",ERROR:"Error"};
const label=s=>labels[s]||String(s??"");
const riskLabels={LOW:"BAJO",MEDIUM:"MEDIO",HIGH:"ALTO",CRITICAL:"CRÍTICO"};
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function render(){
 const q=$( "search").value.toLowerCase(),sf=$( "statusFilter").value,tf=$( "typeFilter").value;
 const visible=requests.filter(r=>(!sf||r.status===sf)&&(!tf||r.type===tf)&&JSON.stringify(r).toLowerCase().includes(q));
 $( "requests").innerHTML=visible.map(r=>{
  let action="";
  if(r.status==="PENDING_APPROVAL"&&$( "role").value==="APPROVER") action='<button class="actionbtn approve" onclick="decide(\\''+r.id+'\\',true)">Aprobar</button> <button class="actionbtn reject" onclick="decide(\\''+r.id+'\\',false)">Rechazar</button>';
  else if(["DRAFT","SUBMITTED"].includes(r.status)&&$( "role").value==="EMPLOYEE") action='<button class="actionbtn dangerbtn" onclick="cancelRequest(\\''+r.id+'\\')">Cancelar</button>';
  return '<tr><td><button class="linkbtn" onclick="detail(\\''+r.id+'\\')">'+r.id+'</button></td><td>'+label(r.type)+'</td><td>'+esc(r.requester)+'</td><td>'+r.start+' → '+r.end+'</td><td><span class="status '+r.status.toLowerCase()+'">'+label(r.status)+'</span></td><td>'+action+'</td></tr>';
 }).join("")||'<tr><td colspan="6" class="empty">No hay solicitudes que coincidan con los filtros actuales.</td></tr>';
 const count=s=>requests.filter(r=>r.status===s).length;
 $( "metrics").innerHTML=[["Total",requests.length],["Pendientes",count("PENDING_APPROVAL")],["Aprobadas",count("APPROVED")],["Rechazadas",count("REJECTED")],["Canceladas",count("CANCELLED")]].map(x=>'<div class="metric"><span>'+x[0]+'</span><strong>'+x[1]+'</strong></div>').join("");
}
window.decide=(id,approved)=>{
 const r=requests.find(x=>x.id===id); if(!r||r.status!=="PENDING_APPROVAL") return;
 if(!approved){const reason=prompt("Motivo de rechazo (obligatorio):");if(!reason?.trim())return;r.comments=reason.trim();r.history.push(["Rechazada","Aprobador WFM — "+reason.trim()]);r.status="REJECTED";}
 else{r.status="APPROVED";r.history.push(["Aprobada","Aprobador WFM"]);}
 render();
};
window.cancelRequest=id=>{const r=requests.find(x=>x.id===id);if(r&&confirm("¿Cancelar esta solicitud?")){r.status="CANCELLED";r.history.push(["Cancelada",r.requester]);render();}};
window.detail=id=>{
 const r=requests.find(x=>x.id===id);if(!r)return;
 $( "detailTitle").textContent=r.id+" — "+label(r.type);
 $( "detailBody").innerHTML='<div class="detail-grid"><div class="detail-item"><small>Solicitante</small><strong>'+esc(r.requester)+'</strong></div><div class="detail-item"><small>Estado</small><span class="status '+r.status.toLowerCase()+'">'+label(r.status)+'</span></div><div class="detail-item"><small>Fechas</small><strong>'+r.start+' → '+r.end+'</strong></div><div class="detail-item"><small>Comentarios</small><strong>'+esc(r.comments||"—")+'</strong></div></div><h3>Historial de auditoría</h3><div class="timeline">'+r.history.map(e=>'<div class="event"><strong>'+esc(e[0])+'</strong><small>'+esc(e[1])+' · evento de auditoría simulado</small></div>').join("")+'</div>';
 $( "detailActions").innerHTML=r.status==="PENDING_APPROVAL"&&$( "role").value==="APPROVER"?'<button class="actionbtn approve" onclick="decide(\\''+r.id+'\\',true);detail(\\''+r.id+'\\')">Aprobar</button><button class="actionbtn reject" onclick="decide(\\''+r.id+'\\',false);detail(\\''+r.id+'\\')">Rechazar</button>':"";
 $( "detailDialog").showModal();
};
$( "search").oninput=render;$( "statusFilter").onchange=render;$( "typeFilter").onchange=render;$( "role").onchange=render;
$( "newRequestBtn").onclick=()=>{$( "formError").textContent="";$( "requestDialog").showModal()};
$( "cancelForm").onclick=()=>$( "requestDialog").close();
$( "closeDetail").onclick=()=>$( "detailDialog").close();
$( "requestForm").onsubmit=e=>{
 e.preventDefault();const start=$( "start").value,end=$( "end").value;
 if(!$( "type").value||!start||!end){$( "formError").textContent="Completa todos los campos obligatorios.";return}
 if(end<start){$( "formError").textContent="La fecha de fin no puede ser anterior a la fecha de inicio.";return}
 const maxId=Math.max(5,...requests.map(r=>Number(r.id.split("-")[1])));
 const id="REQ-"+String(maxId+1).padStart(4,"0");
 requests.unshift({id,type:$( "type").value,requester:$( "requester").value,start,end,status:"PENDING_APPROVAL",comments:$( "comments").value,history:[["Enviada",$( "requester").value],["Pendiente de aprobación","Flujo de trabajo"]]});
 $( "requestDialog").close();e.target.reset();render();
};
function renderSimulation(){
 const result=calculateWfmImpact({requiredCapacity:$( "requiredCapacity").value,baselineCapacity:$( "baselineCapacity").value,capacityDelta:$( "capacityDelta").value});
 const risk=result.riskLevel.toLowerCase();
 $( "simulationResult").innerHTML='<div class="impact-result"><div class="impact-card"><small>Capacidad requerida</small><strong>'+result.requiredCapacity+'</strong></div><div class="impact-card"><small>Capacidad antes</small><strong>'+result.baselineCapacity+' ('+formatCoverage(result.coverageBefore)+')</strong></div><div class="impact-card"><small>Capacidad después</small><strong>'+result.scenarioCapacity+' ('+formatCoverage(result.coverageAfter)+')</strong></div><div class="impact-card"><small>Déficit posterior</small><strong>'+result.deficitAfter+'</strong></div></div><p><strong>Impacto:</strong> <span class="risk '+risk+'">'+riskLabels[result.riskLevel]+'</span> · Variación de capacidad: '+result.deltaCapacity+'</p>';
}
$( "simulateBtn").onclick=renderSimulation;
render();renderSimulation();
