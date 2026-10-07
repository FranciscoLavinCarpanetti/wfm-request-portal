const WFM_ENGINE_VERSION="1.0.0";
function calculateWfmImpact({requiredCapacity,baselineCapacity,capacityDelta}) {
 const required=Number(requiredCapacity)||0;
 const baseline=Number(baselineCapacity)||0;
 const delta=Number(capacityDelta)||0;
 const scenario=baseline+delta;
 const deficitBefore=Math.max(0,required-baseline);
 const deficitAfter=Math.max(0,required-scenario);
 const coverageBefore=required?baseline/required:1;
 const coverageAfter=required?scenario/required:1;
 const riskLevel=deficitAfter===0?"LOW":deficitAfter<=1?"MEDIUM":deficitAfter<=2?"HIGH":"CRITICAL";
 return {requiredCapacity:required,baselineCapacity:baseline,scenarioCapacity:scenario,deltaCapacity:delta,deficitBefore,deficitAfter,coverageBefore,coverageAfter,riskLevel};
}
function formatCoverage(value){return (value*100).toFixed(0)+"%";}
window.calculateWfmImpact=calculateWfmImpact;window.formatCoverage=formatCoverage;