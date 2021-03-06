define([
	'goo/fsmpack/statemachine/actions/Action'
], function (
	Action
) {
	'use strict';

	var keys = {
		38: 'up',
		37: 'left',
		40: 'down',
		39: 'right'
	};

	function ArrowsAction(/*id, settings*/) {
		Action.apply(this, arguments);
	}

	ArrowsAction.prototype = Object.create(Action.prototype);
	ArrowsAction.prototype.constructor = ArrowsAction;

	ArrowsAction.prototype.configure = function (settings) {
		this.targets = settings.transitions;
	};

	ArrowsAction.external = {
		key: 'Arrow Keys Listener',
		name: 'Arrow Keys',
		type: 'controls',
		description: 'Transitions to other states when arrow keys are pressed (keydown)',
		canTransition: true,
		parameters: [],
		transitions: [{
			name: 'Key UP',
			key: 'up',
			description: "Key up pressed"
		}, {
			name: 'Key LEFT',
			key: 'left',
			description: "Key left pressed"
		}, {
			name: 'Key DOWN',
			key: 'down',
			description: "Key down pressed"
		}, {
			name: 'Key RIGHT',
			key: 'right',
			description: "Key right pressed"
		}]
	};

	ArrowsAction.prototype.enter = function (fsm) {
		this.eventListener = function (event) {
			var keyname = keys[event.which];
			var target = this.targets[keyname];
			if (target) {
				fsm.send(target);
			}
		}.bind(this);
		document.addEventListener('keydown', this.eventListener);
	};

	ArrowsAction.prototype.exit = function () {
		document.removeEventListener('keydown', this.eventListener);
	};

	return ArrowsAction;
});