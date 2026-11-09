# TASK-002 — WebXR Quest controller integration

Owner: XR Agent or main agent. Do only after TASK-001 passes.

1. Use current supported @react-three/xr API and Meta's WebXR React reference.
2. Add explicit Enter VR action for browser (requires user gesture); gracefully hide or disable when immersive-vr unsupported.
3. Comfortable seated board with controller rays, hover ghost stone, single trigger press = one move; left and right controllers; prevent duplicate presses and avoid changing pieces directly.
4. Offer reset and undo usable inside immersive VR, not just DOM menus.
5. Check desktop still works; automated tests, typecheck and build pass.
6. Document HTTPS staging path (no assumption HTTP over LAN works for WebXR).

Done when: ready for user Quest 2 hardware verification; never self-certify hardware.
