define([
	'goo/fsmpack/statemachine/actions/Action'
], function (
	Action
) {
	'use strict';

	function MousePressedAction(/*id, settings*/) {
		Action.apply(this, arguments);
	}

	MousePressedAction.prototype = Object.create(Action.prototype);
	MousePressedAction.prototype.constructor = MousePressedAction;

	MousePressedAction.external = {
		name: 'Mouse Button Pressed',
		type: 'controls',
		description: 'Listens for a mouse button press event and performs a transition. Works over transition boundaries.',
		canTransition: true,
		parameters: [{
			name: 'Button',
			key: 'button',
			type: 'string',
			control: 'dropdown',
			description: 'Mouse Button to listen for',
			'default': 'Left',
			options: ['Left', 'Middle', 'Right']
		}],
		transitions: [{
			key: 'mousedown',
			name: 'Button Pressed',
			description: 'State to transition to when the mouse button is pressed'
		}]
	};

	MousePressedAction.prototype.enter = function (fsm) {
		if (fsm.getInputState(this.button)) {
			fsm.send(this.transitions.mousedown);
		}
	};

	MousePressedAction.prototype.update = function (fsm) {
		if (fsm.getInputState(this.button)) {
			fsm.send(this.transitions.mousedown);
		}
	};

	return MousePressedAction;
});