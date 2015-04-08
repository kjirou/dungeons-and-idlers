import assert from 'assert';

import Storage from 'client/lib/storage';
import {FighterJob} from 'client/lib/jobs';
import CharacterStore from 'client/stores/creatures/character';
import CharactersStore from 'client/stores/characters';


describe('client/stores/character module', function() {

  beforeEach(function() {
    return Storage.clear();
  });

  it('constructor', function() {
    let s = new CharactersStore();
    assert(s instanceof CharactersStore);
  });

  it('store and restore', function() {
    let s = new CharactersStore();
    return s.restore()
      // 初期データからレストア出来ている
      .then(() => {
        assert.strictEqual(s.characters.length, s.defaults().characters.length);
        s.characters.forEach((character) => {
          assert(character instanceof CharacterStore);
        });
      })
      // データを強引に変更して保存
      .then(() => {
        s.characters.forEach((character) => {
          character.set('jobTypeId', 'fighter');  // 全員戦士にする
        });
        return s.store();
      })
      // 新たに作ったインスタンスでrestoreしたら反映される
      .then(() => {
        let s2 = new CharactersStore();
        s2.restore()
          .then(() => {
            assert(s.characters.length > 0);
            s2.characters.forEach((character) => {
              assert.strictEqual(character.job, FighterJob);
            });
          })
        ;
      })
    ;
  });
});
