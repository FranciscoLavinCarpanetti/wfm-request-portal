const initial=[
{id:"REQ-0001",type:"SHIFT_CHANGE",requester:"Ana Martin",start:"2026-11-03",end:"2026-11-03",status:"APPROVED"},
{id:"REQ-0002",type:"REMOTE_WORK",requester:"Carlos Ruiz",start:"2026-11-05",end:"2026-11-05",status:"PENDING_APPROVAL"},
{id:"REQ-0003",type:"LEAVE",requester:"Laura Gomez",start:"2026-11-10",end:"2026-11-12",status:"REJECTED"},
{id:"REQ-0004",type:"SHIFT_CHANGE",requester:"Daniel Perez",start:"2026-11-14",end:"2026-11-14",status:"SUBMITTED"},
{id:"REQ-0005",type:"LEAVE",requester:"Marta Lopez",start:"2026-12-01",end:"2026-12-03",status:"DRAFT"}
];
let requests=[...initial];
const $=id=>document.getElementById(id);
const label=s=>s.replaceAll("_"," ").toLowerCase().replace(/\b\w/g,c=>c.toUpperCase());
function render(){
  const q=$("search").value.toLowerCase();
  const visible=requests.filter(r=>JSON.stringify(r).toLowerCase().includes(q));
  $("requests").innerHTML=visible.map(r=>`<tr><td><strong>${r.id}</strong></td><td>${label(r.type)}</td><td>${r.requester}</td><td>${r.start} → ${r.end}</td><td><span class="status ${r.status.toLowerCase()}">${label(r.status)}</span></td><td><button onclick="approve('${r.id}')">Approve</button></td></tr>`).join("");
  const count=s=>requests.filter(r=>r.status===s).length;
  $("metrics").innerHTML=[["Total",requests.length],["Pending",count("PENDING_APPROVAL")],["Approved",count("APPROVED")],["Rejected",count("REJECTED")]].map(x=>`<div class="metric"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join("");
}
window.approve=id=>{const r=requests.find(x=>x.id===id);if(r?.status==="PENDING_APPROVAL"){r.status="APPROVED";render()}};
$("search").addEventListener("input",render);
$("newRequestBtn").onclick=()=>{$("formError").textContent="";$("requestDialog").showModal()};
$("requestForm").addEventListener("submit",e=>{
  e.preventDefault();
  const start=$("start").value,end=$("end").value;
  if(!$("type").value||!start||!end){$("formError").textContent="Complete all required fields.";return}
  if(end<start){$("formError").textContent="End date cannot precede start date.";return}
  const id=`REQ-${String(requests.length+1).padStart(4,"0")}`;
  requests.unshift({id,type:$("type").value,requester:$("requester").value,start,end,status:"PENDING_APPROVAL"});
  $("requestDialog").close();e.target.reset();render();
});
render();
