import assert from 'assert';

import Storage from 'client/lib/storage';
import {TorchEquipment} from 'client/lib/equipments';
import {FighterJob} from 'client/lib/jobs';
import CharacterStore from 'client/stores/creatures/character';
import CharactersStore from 'client/stores/characters';


describe('client/stores/characters module', function() {

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
        // 全員 fighter にする
        s.characters.forEach((character) => {
          character.set('jobTypeId', 'fighter');
        });
        // 二人目のみ装備変更
        s.characters[1].addOrIncreaseEquipment('torch');
        s.characters[1].addOrIncreaseEquipment('torch');
        return s.store();
      })
      // 新たに作ったインスタンスでrestoreしたら反映される
      .then(() => {
        let s2 = new CharactersStore();
        s2.restore()
          .then(() => {
            assert(s.characters.length > 0);
            // 全員 FighterJob である
            s2.characters.forEach((character) => {
              assert.strictEqual(character.job, FighterJob);
            });
            // 二人目が TorchEquipment を装備している
            assert.deepEqual(s2.characters[1].aggregatedEquipments, {
              sub_action: [],
              feat: [],
              deck: [{ equipment: TorchEquipment, count: 2 }]
            });
          })
        ;
      })
    ;
  });

  it('setEditingCharacterIndex, rotateEditingCharacterIndex', function() {
    let s = new CharactersStore();
    assert.strictEqual(s.editingCharacterIndex, 0);
    assert(s.characters.length > 0, 'インスタンス生成時に少なくとも一人居て、編集中キャラが未定義にならない');
    assert.strictEqual(s.characters.length, s.defaults().characters.length);
    // not changed
    s.setEditingCharacterIndex(99);
    assert.strictEqual(s.editingCharacterIndex, 0);

    return s.restore().then(() => {
      assert(s.characters.length >= 3, 'テスト用に初期状態で3キャラ以上存在することを期待');
      s.setEditingCharacterIndex(1);
      assert.strictEqual(s.editingCharacterIndex, 1);
      s.rotateEditingCharacterIndex(1);
      assert.strictEqual(s.editingCharacterIndex, 2);
      s.rotateEditingCharacterIndex(-2);
      assert.strictEqual(s.editingCharacterIndex, 0);
    });
  });
});
