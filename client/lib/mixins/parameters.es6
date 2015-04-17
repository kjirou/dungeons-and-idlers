import _ from 'lodash';
import rpgparameter from 'rpgparameter';


var ParametersMixin = {};

rpgparameter.defineIntegerParameter(ParametersMixin, 'maxHp');
rpgparameter.defineIntegerParameter(ParametersMixin, 'maxHandCardCount');
rpgparameter.defineIntegerParameter(ParametersMixin, 'physicalAttackPower');
rpgparameter.defineIntegerParameter(ParametersMixin, 'magicalAttackPower');


export default ParametersMixin;
