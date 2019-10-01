
import { ClickPan } from "./ClickPan";

describe("ClickPan", () => {
	const target = document.createElement("div");
	const callback = jest.fn();
	// TODO: Why doesn"t TS complain about the wrong fn signature here?
	const clickPan = new ClickPan(callback);

	describe("construction", () => {
		it("Returns a ClickPan instance", () => {
			expect(clickPan).toBeInstanceOf(ClickPan);
		});
	});

	describe("before addTarget() is called and mouse is clicked and moved on the target", () => {
		beforeAll(() => {
			performValidMouseMove(10, 10, target);
		});

		it("does not call callback", () => {
			expect(callback.mock.calls.length).toEqual(0);
		});
	});

	describe("after addTarget() is called and mouse is clicked and moved on the target", () => {
		const expectedXDelta = 10;
		const expectedYDelta = 10;

		beforeAll(() => {
			clickPan.addTarget(target);
			performValidMouseMove(expectedXDelta, expectedYDelta, target);
		});

		it("calls the callback", () => {
			expect(callback.mock.calls.length).toEqual(1);
		});

		it("passes the expected values to the callback", () => {
			const firstCall = callback.mock.calls[0];
			expect(firstCall[0]).toEqual(expectedXDelta);
			expect(firstCall[1]).toEqual(expectedYDelta);
		});
	});

	describe("and then mouse is moved without being pressed", () => {
		beforeAll(() => {
			moveMouse(100, 100, target);
			releaseMouse(document.body);
		});

		it("does not call the callback", () => {
			expect(callback.mock.calls.length).toEqual(1);
		});
	});

	describe("and then pressing and releasing the mouse before moving it", () => {
		beforeAll(() => {
			pressMouse(target);
			releaseMouse(document.body);
			moveMouse(1000, 1000, target);
		});

		it("does not call the callback", () => {
			expect(callback.mock.calls.length).toEqual(1);
		});
	});
});

function performValidMouseMove(deltaX: number, deltaY: number, target: HTMLElement) {
	pressMouse(target);
	moveMouse(deltaX, deltaY, target);
	releaseMouse(document.body);
}

function moveMouse(deltaX: number, deltaY: number, target: HTMLElement) {
	const evt = new MouseEvent("mousemove", {
		bubbles: true,
		cancelable: true,
		clientX: deltaX,
		clientY: deltaY,
	});
	target.dispatchEvent(evt);
}

function pressMouse(target: HTMLElement) {
	const evt = new MouseEvent("mousedown", {
		bubbles: true,
		cancelable: true,
	});
	target.dispatchEvent(evt);
}

function releaseMouse(target: HTMLElement) {
	const evt = new MouseEvent("mouseup", {
		bubbles: true,
		cancelable: true,
	});
	target.dispatchEvent(evt);
}
