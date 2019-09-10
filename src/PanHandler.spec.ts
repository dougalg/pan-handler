import { createCanvas } from "canvas";
import { PanHandler } from "./PanHandler";

const CANVAS_WIDTH = 100;
const CANVAS_HEIGHT = 100;
const DEFAULT_MIN_ZOOM = 0.5;
const DEFAULT_MAX_ZOOM = 4;
const zoomCases = [
	{
		desc: "without options",
		options: undefined,
		states: [
			{
				innerScale: 0.5,
				xleftView: 50,
				ytopView: 50,
			},
			{
				innerScale: 8,
				xleftView: -43.75,
				ytopView: -43.75,
			},
			{
				innerScale: 8,
				xleftView: -250,
				ytopView: -250,
			},
			{
				innerScale: 8,
				xleftView: 250,
				ytopView: 250,
			},
		],
	},
	{
		desc: "with empty options",
		options: {},
		states: [
			{
				innerScale: 0.5,
				xleftView: 50,
				ytopView: 50,
			},
			{
				innerScale: 8,
				xleftView: -43.75,
				ytopView: -43.75,
			},
			{
				innerScale: 8,
				xleftView: -250,
				ytopView: -250,
			},
			{
				innerScale: 8,
				xleftView: 250,
				ytopView: 250,
			},
		],
	},
	{
		desc: "with min_zoom=0.1",
		options: {
			min_zoom: 0.1,
		},
		states: [
			{
				innerScale: 0.1,
				xleftView: 450,
				ytopView: 450,
			},
			{
				innerScale: 40,
				xleftView: -48.75,
				ytopView: -48.75,
			},
			{
				innerScale: 8,
				xleftView: -250,
				ytopView: -250,
			},
			{
				innerScale: 8,
				xleftView: 250,
				ytopView: 250,
			},
		],
	},
	{
		desc: "with max_zoom=1.1",
		options: {
			max_zoom: 1.1,
		},
		states: [
			{
				innerScale: 0.5,
				xleftView: 50,
				ytopView: 50,
			},
			{
				innerScale: 2.2,
				xleftView: -27.272727272727273,
				ytopView: -27.272727272727273,
			},
			{
				innerScale: 8,
				xleftView: -909.090909090909,
				ytopView: -909.090909090909,
			},
			{
				innerScale: 8,
				xleftView: 909.090909090909,
				ytopView: 909.090909090909,
			},
		],
	},
];

describe("PanHandler", () => {
	zoomCases.forEach(({ desc, options, states }) => {
		const expectedMinZoom = options && options.min_zoom || DEFAULT_MIN_ZOOM;
		const expectedMaxZoom = options && options.max_zoom || DEFAULT_MAX_ZOOM;

		const targetMinZoom = expectedMinZoom - expectedMinZoom / 2;
		const targetMaxZoom = expectedMaxZoom + 1;

		describe(desc, () => {
			const ctx = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).getContext("2d") as CanvasRenderingContext2D;
			const transformSpy = jest.spyOn(ctx, "transform");
			const scaleSpy = jest.spyOn(ctx, "scale");
			const panHandler = new PanHandler(ctx, options);

			afterAll(() => {
				transformSpy.mockRestore();
				scaleSpy.mockRestore();
			});

			it("Returns a ScrollZoom instance", () => {
				expect(panHandler).toBeInstanceOf(PanHandler);
			});

			it("has a currentZoom of 1", () => {
				expect(panHandler.currentZoom).toBe(1);
			});

			it ("does not transform the canvas", () => {
				expect(transformSpy.mock.calls.length).toBe(0);
			});

			describe(`after zoom(${targetMinZoom})`, () => {
				beforeAll(() => {
					panHandler.zoom(targetMinZoom - 1);
				});

				it(`has a currentZoom of ${expectedMinZoom}`, () => {
					expect(panHandler.currentZoom).toBe(expectedMinZoom);
				});

				it ("transforms the canvas", () => {
					expect(transformSpy.mock.calls.length).toBe(1);
					expect(transformSpy.mock.calls[0])
						.toEqual([ 1, 0, 0, 1, states[0].xleftView, states[0].ytopView ]);
				});

				it ("scales the canvas", () => {
					expect(scaleSpy.mock.calls.length).toBe(1);
					expect(scaleSpy.mock.calls[0])
						.toEqual([ states[0].innerScale, states[0].innerScale ]);
				});
			});

			describe("after incrementZoom(-1)", () => {
				beforeAll(() => {
					panHandler.incrementZoom(-1);
				});

				it(`has a currentZoom of ${expectedMinZoom}`, () => {
					expect(panHandler.currentZoom).toBe(expectedMinZoom);
				});

				it ("does not transform the canvas", () => {
					expect(transformSpy.mock.calls.length).toBe(1);
				});

				it ("does not scale the canvas", () => {
					expect(scaleSpy.mock.calls.length).toBe(1);
				});
			});

			describe(`after zoom(${targetMaxZoom})`, () => {
				beforeAll(() => {
					panHandler.zoom(targetMaxZoom + 1);
				});

				it(`has a currentZoom of ${expectedMaxZoom}`, () => {
					expect(panHandler.currentZoom).toBe(expectedMaxZoom);
				});

				it ("transforms the canvas", () => {
					expect(transformSpy.mock.calls.length).toBe(2);
					expect(transformSpy.mock.calls[1])
						.toEqual([ 1, 0, 0, 1, states[1].xleftView, states[1].ytopView ]);
				});

				it ("scales the canvas", () => {
					expect(scaleSpy.mock.calls.length).toBe(2);
					expect(scaleSpy.mock.calls[1])
						.toEqual([ states[1].innerScale, states[1].innerScale ]);
				});
			});

			describe("after incrementZoom(1)", () => {
				beforeAll(() => {
					panHandler.incrementZoom(11);
				});

				it(`has a currentZoom of ${expectedMaxZoom}`, () => {
					expect(panHandler.currentZoom).toBe(expectedMaxZoom);
				});

				it ("does not transform the canvas", () => {
					expect(transformSpy.mock.calls.length).toBe(2);
				});

				it ("does not scale the canvas", () => {
					expect(scaleSpy.mock.calls.length).toBe(2);
				});
			});

			describe("panning past top left", () => {
				const targetXPan = -CANVAS_WIDTH * 10;
				const targetYPan = -CANVAS_WIDTH * 10;

				beforeAll(() => {
					panHandler.pan(targetXPan, targetYPan);
				});

				it ("transforms the canvas", () => {
					expect(transformSpy.mock.calls.length).toBe(3);
					expect(transformSpy.mock.calls[2])
						.toEqual([ 1, 0, 0, 1, states[2].xleftView, states[2].ytopView ]);
				});

				it ("does not scale the canvas", () => {
					expect(scaleSpy.mock.calls.length).toBe(2);
				});
			});

			describe("panning past bottom right", () => {
				beforeAll(() => {
					panHandler.pan(CANVAS_WIDTH * 10, CANVAS_HEIGHT * 10);
				});

				it ("transforms the canvas", () => {
					expect(transformSpy.mock.calls.length).toBe(4);
					expect(transformSpy.mock.calls[3])
						.toEqual([ 1, 0, 0, 1, states[3].xleftView, states[3].ytopView ]);
				});

				it ("does not scale the canvas", () => {
					expect(scaleSpy.mock.calls.length).toBe(2);
				});
			});
		});
	});
});
