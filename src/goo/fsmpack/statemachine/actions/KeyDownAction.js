define([
	'goo/fsmpack/statemachine/actions/Action',
	'goo/fsmpack/statemachine/FsmUtils'
], function (
	Action,
	FsmUtils
) {
	'use strict';

	function KeyDownAction(/*id, settings*/) {
		Action.apply(this, arguments);
	}

	KeyDownAction.prototype = Object.create(Action.prototype);
	KeyDownAction.prototype.constructor = KeyDownAction;

	KeyDownAction.external = {
		name: 'Key Down',
		type: 'controls',
		description: 'Listens for a key press and performs a transition',
		canTransition: true,
		parameters: [{
			name: 'Key',
			key: 'key',
			type: 'string',
			control: 'key',
			description: 'Key to listen for',
			'default': 'A'
		}],
		transitions: [{
			key: 'keydown',
			name: 'Key down',
			description: 'State to transition to when the key is pressed'
		}]
	};

	KeyDownAction.prototype.configure = function (settings) {
		this.key = settings.key ? FsmUtils.getKey(settings.key) : null;
		this.transitions = { keydown: settings.transitions.keydown };
	};

	KeyDownAction.prototype.enter = function (fsm) {
		this.eventListener = function (event) {
			if (this.key) {
				if (event.which === +this.key) {
					fsm.send(this.transitions.keydown);
				}
			}
		}.bind(this);
		document.addEventListener('keydown', this.eventListener);
	};

	KeyDownAction.prototype.exit = function () {
		document.removeEventListener('keydown', this.eventListener);
	};

	return KeyDownAction;
});