const WFM_ENGINE_VERSION="1.1.0";
function nonNegativeNumber(value){
 const number=Number(value);
 return Number.isFinite(number)?Math.max(0,number):0;
}
function calculateWfmImpact({requiredCapacity,baselineCapacity,capacityDelta}){
 const required=nonNegativeNumber(requiredCapacity);
 const baseline=nonNegativeNumber(baselineCapacity);
 const delta=Number(capacityDelta);
 const safeDelta=Number.isFinite(delta)?delta:0;
 const scenario=Math.max(0,baseline+safeDelta);
 const deficitBefore=Math.max(0,required-baseline);
 const deficitAfter=Math.max(0,required-scenario);
 const coverageBefore=required?baseline/required:1;
 const coverageAfter=required?scenario/required:1;
 const riskLevel=deficitAfter===0?"LOW":deficitAfter<=1?"MEDIUM":deficitAfter<=2?"HIGH":"CRITICAL";
 return {engineVersion:WFM_ENGINE_VERSION,requiredCapacity:required,baselineCapacity:baseline,scenarioCapacity:scenario,deltaCapacity:safeDelta,deficitBefore,deficitAfter,coverageBefore,coverageAfter,riskLevel};
}
function formatCoverage(value){return (Number(value)*100).toFixed(0)+"%";}
if(typeof window!=="undefined"){window.calculateWfmImpact=calculateWfmImpact;window.formatCoverage=formatCoverage;}
if(typeof module!=="undefined"&&module.exports){module.exports={WFM_ENGINE_VERSION,calculateWfmImpact,formatCoverage};}
