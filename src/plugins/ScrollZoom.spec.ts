import { ScrollZoom } from "./ScrollZoom";

describe("ScrollZoom", () => {
	const target = document.createElement("div");
	const callback = jest.fn();
	// TODO: Why doesn"t TS complain about the wrong fn signature here?
	const scrollZoom = new ScrollZoom(callback);

	describe("construction", () => {
		it("Returns a ScrollZoom instance", () => {
			expect(scrollZoom).toBeInstanceOf(ScrollZoom);
		});
	});

	describe("before addTarget() is called and mousewheel is scrolled on the target", () => {
		beforeAll(() => {
			scrollMouse(10, target);
		});

		it("does not call callback", () => {
			expect(callback.mock.calls.length).toEqual(0);
		});
	});

	describe("after addTarget() is called and mouse is clicked and moved on the target", () => {
		const EMITTED_DELTA = 10;
		const EXPECTED_VALUE = EMITTED_DELTA * 0.8 / 100;

		beforeAll(() => {
			scrollZoom.addTarget(target);
			scrollMouse(EMITTED_DELTA, target);
		});

		it("calls the callback", () => {
			expect(callback.mock.calls.length).toEqual(1);
		});

		it("passes the expected values to the callback", () => {
			const firstCall = callback.mock.calls[0];
			expect(firstCall[0]).toEqual(EXPECTED_VALUE);
		});
	});

	describe("after addTarget() is called and mouse is clicked and moved on the target with no deltaY", () => {
		const EMITTED_DELTA = 0;

		beforeAll(() => {
			scrollZoom.addTarget(target);
			scrollMouse(EMITTED_DELTA, target);
		});

		it("does not call the callback", () => {
			expect(callback.mock.calls.length).toEqual(1);
		});
	});
});

function scrollMouse(deltaY: number, target: HTMLElement) {
	const evt = new WheelEvent("wheel", {
		bubbles: true,
		cancelable: true,
		deltaY,
	});
	target.dispatchEvent(evt);
}
