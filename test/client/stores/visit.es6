//import assert from 'assert';
//
//import VisitStore from 'client/stores/visit';
//
//
//describe('client/stores/visit module', function() {
//
//  it('constructor', function() {
//    let s = new VisitStore();
//    assert(s instanceof VisitStore);
//  });
//
//  it('getVisitors', function() {
//    let s = new VisitStore();
//    let visitors = s.getVisitors();
//    assert.strictEqual(typeof visitors, 'object');
//    assert('dummy' in visitors);
//    assert.strictEqual(visitors['dummy'].level, 0);
//    assert.strictEqual(visitors['dummy'].name, 'Dummy');
//  });
//
//  it('getVisitorsAsList', function() {
//    let s = new VisitStore();
//    let visitorsAsList = s.getVisitorsAsList();
//    assert(Array.isArray(visitorsAsList));
//    assert(visitorsAsList[0].jobTypeId);
//  });
//
//  context('store, restore', function() {
//
//    it('restore', function() {
//      // 少なくともエラーにならないことと、
//      // デフォルトデータのキーが実データに存在することを確認する
//      let s = new VisitStore();
//      s.restore();
//      let visitorsData = s.get('visitors');
//      Object.keys(s._createDefaultVisitorData()).forEach((dataKey) => {
//        assert(dataKey in visitorsData.dummy);
//      });
//    });
//  });
//});
