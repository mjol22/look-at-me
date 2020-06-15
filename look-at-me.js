/* global Hooks, game, USER_ROLES, canvas */

Hooks.on('ready', () => {
	if (game.user.role !== USER_ROLES.GAMEMASTER) {
		game.socket.on('userActivity', (from, msg) => {
			if (game.users.get('PnZGH8PYSgKwAUhX').role === USER_ROLES.GAMEMASTER && msg.targets && msg.targets.length) {
				let s = game.scenes.filter(s => s.active)[0];
				let coordsTotal = s.getEmbeddedCollection('Token').reduce((out, t) => {
					out.x += t.x;
					out.y += t.y;
					return out;
				}, {x: 0, y: 0});
				let center = {
					x: coordsTotal.x / msg.targets.length,
					y: coordsTotal.y / msg.targets.length
				};
				canvas.pan(center);
			}
		});
	}
});
