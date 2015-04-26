require('./env/cli');

var validateConfData = require('image-divider').utils.validateConfData;
var _ = require('lodash');
var pathModule = require('path');


var SOURCE_IMAGE_PATH = pathModule.join(__dirname, '/materials/images/denzi/Denzi140330-12-1--32x32.png');
var DEST_ROOT = pathModule.join(__dirname, '/public/dist/icons');
var ICON_WIDTH = 32;
var ICON_HEIGHT = 32;
var ICON_SIZE = [ICON_WIDTH, ICON_HEIGHT];
var ICON_POS_MAP = {
  objects: [ICON_HEIGHT * 15, ICON_WIDTH * 0],
  characters: [ICON_HEIGHT * 22, ICON_WIDTH * 0],
  enemies: [ICON_HEIGHT * 28, ICON_WIDTH * 0],
  icons: [ICON_HEIGHT * 1, ICON_WIDTH * 16],
  animations: [ICON_HEIGHT * 7, ICON_WIDTH * 16],
  items: [ICON_HEIGHT * 12, ICON_WIDTH * 16]
};


/**
 * @param {Array} cellIndex [row, col] で最左上を [0, 0] とするアイコン位置
 * @return {object} {image-dividerのimage}
 */
var _iconIds = [];
var mapIcon = function mapImage(category, cellIndex, iconId) {
  if (_iconIds.indexOf(iconId) > -1) {
    throw new Error(iconId + ' is duplicated icon-id');
  }
  _iconIds.push(iconId);
  var basePos = ICON_POS_MAP[category];
  return {
    src: SOURCE_IMAGE_PATH,
    pos: [
      basePos[0] + cellIndex[0] * ICON_HEIGHT,
      basePos[1] + cellIndex[1] * ICON_WIDTH
    ],
    size: ICON_SIZE,
    dest: pathModule.join(DEST_ROOT, '/' + category + '/' + iconId + '.png')
  };
};

var icons = [

  // characters
  ['characters', [0, 3], 'alchemist'],
  ['characters', [0, 4], 'cleric'],
  ['characters', [0, 0], 'fighter'],
  ['characters', [1, 1], 'healer'],
  ['characters', [1, 3], 'knight'],
  ['characters', [0, 1], 'mage'],
  ['characters', [0, 8], 'nerd'],
  ['characters', [0, 2], 'ranger'],
  ['characters', [0, 5], 'thief'],

  // enemies
  ['enemies', [3, 13], 'goblin'],
  ['enemies', [1, 3], 'minotaur'],

  // icons
  ['icons', [1, 1], 'brain'],
  ['icons', [1, 2], 'flash'],
  ['icons', [0, 14], 'happy'],
  ['icons', [0, 0], 'heart'],
  ['icons', [4, 15], 'invalid'],
  ['icons', [3, 0], 'running'],
  ['icons', [0, 13], 'unhappy'],

  // items
  ['items', [0, 6], 'arrow'],
  ['items', [0, 5], 'bow'],
  ['items', [0, 4], 'gold'],
  ['items', [1, 1], 'jewel'],
  ['items', [0, 10], 'jewel_box'],
  ['items', [2, 14], 'katana'],
  ['items', [0, 14], 'key'],
  ['items', [4, 12], 'lantern'],
  ['items', [4, 11], 'torch'],
  ['items', [0, 1], 'sword'],

  // objects
  ['objects', [2, 7], 'chest'],
  ['objects', [0, 12], 'downstairs'],
  ['objects', [0, 1], 'signboard'],
  ['objects', [0, 6], 'treasure_box'],
  ['objects', [0, 11], 'upstairs']//,

].map(function(imageData) {
  return mapIcon.apply(null, imageData);
});

var conf = {
  images: icons
};
validateConfData(conf);


module.exports = conf;
