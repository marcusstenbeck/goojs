define([
	'goo/statemachine/actions/Action'
],
/** @lends */
function(
	Action
) {
	"use strict";

	function InBoxAction(/*id, settings*/) {
		Action.apply(this, arguments);
	}

	InBoxAction.prototype = Object.create(Action.prototype);
	InBoxAction.prototype.constructor = InBoxAction;

	InBoxAction.external = {
		parameters: [{
			name: 'Point1',
			key: 'point1',
			type: 'vec3',
			description: 'First box point',
			'default': [-1, -1, -1]
		}, {
			name: 'Point2',
			key: 'point2',
			type: 'vec3',
			description: 'Second box point',
			'default': [1, 1, 1]
		}, {
			name: 'On every frame',
			key: 'everyFrame',
			type: 'boolean',
			description: 'Do this action every frame',
			'default': true
		}],
		transitions: [{
			name: 'inside',
			description: 'Event fired if the entity is inside the box'
		}, {
			name: 'outside',
			description: 'Event fired if the entity is ouside the box'
		}]
	};

	InBoxAction.prototype._run = function(fsm) {
		var entity = fsm.getOwnerEntity();
		var translation = entity.transformComponent.worldTransform.translation;
		if (translation.data[0] > this.point1[0] && translation.data[1] > this.point1[1] && translation.data[2] > this.point1[2] &&
			translation.data[0] < this.point2[0] && translation.data[1] < this.point2[1] && translation.data[2] < this.point2[2]) {
			fsm.send(this.inside);
		} else {
			fsm.send(this.outside);
		}
	};

	return InBoxAction;
});