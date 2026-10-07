const test=require("node:test");
const assert=require("node:assert/strict");
const {calculateWfmImpact,formatCoverage}=require("../demo/wfm-engine.js");

test("sin déficit mantiene cobertura completa y riesgo bajo",()=>{
 const result=calculateWfmImpact({requiredCapacity:12,baselineCapacity:12,capacityDelta:0});
 assert.equal(result.scenarioCapacity,12);
 assert.equal(result.deficitBefore,0);
 assert.equal(result.deficitAfter,0);
 assert.equal(result.coverageAfter,1);
 assert.equal(result.riskLevel,"LOW");
});

test("una unidad de déficit produce riesgo medio",()=>{
 const result=calculateWfmImpact({requiredCapacity:12,baselineCapacity:12,capacityDelta:-1});
 assert.equal(result.scenarioCapacity,11);
 assert.equal(result.deficitAfter,1);
 assert.equal(result.coverageAfter,11/12);
 assert.equal(result.riskLevel,"MEDIUM");
});

test("dos unidades de déficit producen riesgo alto",()=>{
 const result=calculateWfmImpact({requiredCapacity:12,baselineCapacity:12,capacityDelta:-2});
 assert.equal(result.deficitAfter,2);
 assert.equal(result.riskLevel,"HIGH");
});

test("más de dos unidades de déficit producen riesgo crítico",()=>{
 const result=calculateWfmImpact({requiredCapacity:12,baselineCapacity:12,capacityDelta:-3});
 assert.equal(result.deficitAfter,3);
 assert.equal(result.riskLevel,"CRITICAL");
});

test("valores no numéricos se normalizan de forma determinista",()=>{
 const result=calculateWfmImpact({requiredCapacity:"x",baselineCapacity:null,capacityDelta:"x"});
 assert.equal(result.requiredCapacity,0);
 assert.equal(result.baselineCapacity,0);
 assert.equal(result.deltaCapacity,0);
 assert.equal(result.scenarioCapacity,0);
 assert.equal(result.riskLevel,"LOW");
});

test("la capacidad de escenario nunca es negativa",()=>{
 const result=calculateWfmImpact({requiredCapacity:10,baselineCapacity:2,capacityDelta:-99});
 assert.equal(result.scenarioCapacity,0);
 assert.equal(result.deficitAfter,10);
 assert.equal(result.riskLevel,"CRITICAL");
});

test("la cobertura se formatea como porcentaje entero",()=>{
 assert.equal(formatCoverage(1),"100%");
 assert.equal(formatCoverage(11/12),"92%");
});
