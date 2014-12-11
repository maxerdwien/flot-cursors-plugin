/* global $, describe, it, xit, after, beforeEach, afterEach, expect, jasmine */
/* jshint browser: true*/

describe('Cursors Position', function () {
    'use strict';

    var sampledata = [[0, 1], [1, 1.1], [2, 1.2]];
    var sampledata2 = [[0, 2], [1, 2.1], [2, 2.2]];
    var sampledata3 = [[0, 20], [10, 19], [15, 18]];

    var plot;

    beforeEach(function () {
        jasmine.clock().install();
    });

    afterEach(function () {
        plot.shutdown();
        $('#placeholder').empty();
        jasmine.clock().uninstall();
    });

    it('should be possible to position the cursor relative to the canvas', function () {
        plot = $.plot("#placeholder", [sampledata2], {
            cursors: [
                {
                    name: 'Blue cursor',
                    mode: 'xy',
                    color: 'blue',
                    position: {
                        relativeX: 3,
                        relativeY: 1.5
                    }
                    }
                ]
        });

        jasmine.clock().tick(20);

        var cursors = plot.getCursors();
        expect(cursors.length).toBe(1);
        expect(cursors[0].x).toBe(3);
        expect(cursors[0].y).toBe(1.5);
    });

    it('Cursors positioned relative to the canvas should be constrained by the canvas size', function () {
        plot = $.plot("#placeholder", [sampledata2], {
            cursors: [
                {
                    name: 'Blue cursor',
                    mode: 'xy',
                    color: 'blue',
                    position: {
                        relativeX: -30,
                        relativeY: -40
                    }
                    }
                ]
        });

        jasmine.clock().tick(20);
        var cursors = plot.getCursors();
        expect(cursors.length).toBe(1);
        expect(cursors[0].x).toBe(0);
        expect(cursors[0].y).toBe(0);
    });

    it('should be possible to position the cursor relative to the axes', function () {
        plot = $.plot("#placeholder", [sampledata2], {
            cursors: [
                {
                    name: 'Blue cursor',
                    mode: 'xy',
                    color: 'blue',
                    position: {
                        x: 1,
                        y: 2
                    }
                    }
                ]
        });

        jasmine.clock().tick(20);

        var pos = plot.p2c({
            x: 1,
            y: 2
        });
        var expectedX = pos.left;
        var expectedY = pos.top;
        var cursors = plot.getCursors();
        expect(cursors.length).toBe(1);
        expect(cursors[0].x).toBe(expectedX);
        expect(cursors[0].y).toBe(expectedY);
    });

    it('should be possible to position the cursor relative to any of the axes when having multiple ones', function () {
        plot = $.plot("#placeholder", [{
            data: sampledata,
            xaxis: 1,
            yaxis: 1
            }, {
            data: sampledata3,
            xaxis: 2,
            yaxis: 2
            }], {
            cursors: [
                {
                    name: 'Blue cursor',
                    mode: 'xy',
                    color: 'blue',
                    position: {
                        x: 1,
                        y: 1.1
                    }
                    },
                {
                    name: 'Red cursor',
                    mode: 'xy',
                    color: 'red',
                    position: {
                        x2: 11,
                        y2: 20
                    }
                    }
                ],
            xaxes: [
                {
                    position: 'bottom'
                    },
                {
                    position: 'top'
                    }
                ],
            yaxes: [
                {
                    position: 'left'
                    },
                {
                    position: 'right'
                    }
                ]
        });

        jasmine.clock().tick(20);

        var pos1 = plot.p2c({
            x: 1,
            y: 1.1
        });

        var pos2 = plot.p2c({
            x2: 11,
            y2: 20
        });

        var expectedX1 = pos1.left;
        var expectedY1 = pos1.top;
        var expectedX2 = pos2.left;
        var expectedY2 = pos2.top;
        var cursors = plot.getCursors();
        expect(cursors.length).toBe(2);
        expect(cursors[0].x).toBe(expectedX1);
        expect(cursors[0].y).toBe(expectedY1);
        expect(cursors[1].x).toBe(expectedX2);
        expect(cursors[1].y).toBe(expectedY2);
    });

    describe('Reading', function () {
        xit('should be possible to determine the position of the cursor relative to an axis', function () {
            plot = $.plot("#placeholder", [sampledata2], {
                cursors: [
                    {
                        name: 'Blue cursor',
                        color: 'blue',
                        position: {
                            relativeX: 3,
                            relativeY: 1.5
                        }
                    }
                ]
            });

            var pos1 = plot.c2p({
                x: 3,
                y: 1.5
            });

            expect(true).toBe(false);
        });

        xit('should be possible to determine the position of the cursor relative to multiple axes', function () {

        });
    });
});