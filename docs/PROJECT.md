# Product brief — MVP v0.1
Gomoku Realm is a future commercial seated Chinese-aesthetic VR Gomoku game for Meta Quest, starting with a **minimal** functional prototype. Quest 2 is the available test hardware. Future target includes Quest 3/3S and Meta Horizon Store through immersive WebXR PWA packaging.

## MVP acceptance
1. Desktop browser shows a real 3D 15 x 15 intersection board and stone meshes.
2. Clicking an intersection places one legal stone. Alternate black and white. Clear active-player indicator.
3. Horizontal/vertical/both diagonals identify >=5 contiguous stones; no further moves after win.
4. Occupied cells rejected; undo and restart work; full board draw is handled.
5. A seated VR view allows both Quest controllers to ray hover and trigger placement with a ghost stone, one stone per press, and in-VR restart/undo controls.
6. On Quest 2, use HTTPS and Quest Browser to test immersive-vr; *hardware pass is reported only by user*.
7. Unit tests cover first move, alternating turns, illegal occupied move, 4 win directions, edge wins, undo/reset and post-game rejection.

## Deferred
AI, networking, authentication, store billing, theme packs, audio, localization beyond minimal UI, elaborate shaders, Blender scenery, MR and hand tracking.

## Design constraints
- Coordinate convention fixed centrally (e.g. col increases +X, row increases -Z). Keep render scale separate from board rules.
- Keyboard and mouse desktop fallback should not depend on a headset.
- Use lightweight geometry and lighting for Quest 2.
- Keep interface surfaces and game rules isolated to accommodate theme packs later; **do not implement theme architecture prematurely**.
