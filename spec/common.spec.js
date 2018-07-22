describe("common.js helpers function", () => {
  it("trimInnerHTML expectations", () => {
    const { trimInnerHTML } = require('./../src/helpers/common');
    expect(trimInnerHTML(`
      <div>test
</div> <span> test 
</span><br/>
    `)).toBe('<div>test</div> <span> test </span><br/>');
  });
  it("camelToHyphenCase expectations", () => {
    const { camelToHyphenCase } = require('./../src/helpers/common');
    expect(camelToHyphenCase('RohitSharma')).toBe('rohit-sharma');
    expect(camelToHyphenCase('RohitSharmaD')).toBe('rohit-sharma-d');
    expect(camelToHyphenCase('Rohitsharma')).toBe('rohitsharma');
    expect(camelToHyphenCase('ohitSharma')).toBe('ohit-sharma');
    expect(camelToHyphenCase('Rohit-Sharma')).toBe('rohit-sharma');
  });
  it("getUniqueId expectations", () => {
    const { getUniqueId } = require('./../src/helpers/common');
    for (let i = 0; i < 1000; i++) expect(getUniqueId('pre')).not.toBe(getUniqueId('pre'));
  });
  it("beautifyTree expectations", () => {
    const { beautifyTree } = require('./../src/helpers/common');
    const parentMap = JSON.parse('{ "root": ["nobj_jjwoy8bu2yqjoys"], "nobj_jjwoy8bu2yqjoys": ["nobj_jjwoy8bu2fyimij", "nobj_jjwoy8bu1s7ff8p", "nobj_jjwoy8bu1fi52bz"], "nobj_jjwoy8bu1fi52bz": ["nobj_jjwoy8bu4b3x17t", "nobj_jjwoy8bu1dsjhin"], "nobj_jjwoy8bu1dsjhin": ["nobj_jjwoy8bu16xs3e2", "nobj_jjwoy8buhhl26x", "nobj_jjwoy8bu22gkn9a"], "nobj_jjwoy8bu22gkn9a": ["nobj_jjwoy8bu10i5514", "nobj_jjwoy8bu47mhgqf"], "nobj_jjwoy8bu47mhgqf": ["nobj_jjwoy8bu14q33ha", "nobj_jjwoy8bu2uly285", "nobj_jjwoy8bu4e9jyif", "nobj_jjwoy8bu9kxtgo", "nobj_jjwoy8bu6bdf01"] }');
    const nodeMap = JSON.parse('{"nobj_jjwoy8bu2yqjoys":{"node":{"children":[{"content":{"values":{"name":"rohit sharma","phone":"+91 7278518017","des":"JS Developer","email":"rohit@xyz.com","website":"rohitsharma.xyz","address":"Kolkata, INDIA","img":"http://localhost:8080/example/img_avatar_her.png"}}},{},{"children":[{},{"children":[{},{},{"children":[{},{"children":[{},{},{},{},{}]}]}]}]}]},"parent":"root","id":1},"nobj_jjwoy8bu2fyimij":{"node":{"content":{"values":{"name":"rohit sharma","phone":"+91 7278518017","des":"JS Developer","email":"rohit@xyz.com","website":"rohitsharma.xyz","address":"Kolkata, INDIA","img":"http://localhost:8080/example/img_avatar_her.png"}}},"parent":"nobj_jjwoy8bu2yqjoys","id":2},"nobj_jjwoy8bu1s7ff8p":{"node":{},"parent":"nobj_jjwoy8bu2yqjoys","id":3},"nobj_jjwoy8bu1fi52bz":{"node":{"children":[{},{"children":[{},{},{"children":[{},{"children":[{},{},{},{},{}]}]}]}]},"parent":"nobj_jjwoy8bu2yqjoys","id":4},"nobj_jjwoy8bu4b3x17t":{"node":{},"parent":"nobj_jjwoy8bu1fi52bz","id":5},"nobj_jjwoy8bu1dsjhin":{"node":{"children":[{},{},{"children":[{},{"children":[{},{},{},{},{}]}]}]},"parent":"nobj_jjwoy8bu1fi52bz","id":6},"nobj_jjwoy8bu16xs3e2":{"node":{},"parent":"nobj_jjwoy8bu1dsjhin","id":7},"nobj_jjwoy8buhhl26x":{"node":{},"parent":"nobj_jjwoy8bu1dsjhin","id":8},"nobj_jjwoy8bu22gkn9a":{"node":{"children":[{},{"children":[{},{},{},{},{}]}]},"parent":"nobj_jjwoy8bu1dsjhin","id":9},"nobj_jjwoy8bu10i5514":{"node":{},"parent":"nobj_jjwoy8bu22gkn9a","id":10},"nobj_jjwoy8bu47mhgqf":{"node":{"children":[{},{},{},{},{}]},"parent":"nobj_jjwoy8bu22gkn9a","id":11},"nobj_jjwoy8bu14q33ha":{"node":{},"parent":"nobj_jjwoy8bu47mhgqf","id":12},"nobj_jjwoy8bu2uly285":{"node":{},"parent":"nobj_jjwoy8bu47mhgqf","id":13},"nobj_jjwoy8bu4e9jyif":{"node":{},"parent":"nobj_jjwoy8bu47mhgqf","id":14},"nobj_jjwoy8bu9kxtgo":{"node":{},"parent":"nobj_jjwoy8bu47mhgqf","id":15},"nobj_jjwoy8bu6bdf01":{"node":{},"parent":"nobj_jjwoy8bu47mhgqf","id":16}}');
    const tree = JSON.parse('{"children":[{"values":{"name":"rohit sharma","phone":"+91 7278518017","des":"JS Developer","email":"rohit@xyz.com","website":"rohitsharma.xyz","address":"Kolkata, INDIA","img":"http://localhost:8080/example/img_avatar_her.png"}},{},{"children":[{},{"children":[{},{},{"children":[{},{"children":[{},{},{},{},{}]}]}]}]}]}');
    expect(JSON.stringify(beautifyTree(nodeMap, parentMap))).toBe(JSON.stringify(tree));
  });
});