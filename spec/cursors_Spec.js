/* global $, describe, it, xit, after, beforeEach, afterEach, expect, jasmine, spyOn */
/* jshint browser: true*/

describe("Flot cursors", function () {
    'use strict';

    var sampledata = [[0, 1], [1, 1.1], [2, 1.2]];
    var plot;

    beforeEach(function () {
        jasmine.clock().install();
    });

    afterEach(function () {
        if (plot) {
            plot.shutdown();
        }
        $('#placeholder').empty();
        jasmine.clock().uninstall();
    });

    it('should be possible to specify a cursor when creating the plot', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                }
            ]
        });

        var firstCursor = plot.getCursors()[0];
        expect(plot.getCursors().length).toBe(1);
        expect(firstCursor.name).toBe('Blue cursor');
    });

    it('should be possible to specify zero cursors when creating the plot', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: []
        });

        var firstCursor = plot.getCursors()[0];
        expect(plot.getCursors().length).toBe(0);
    });

    it('should be possible to specify multiple cursors when creating the plot', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                },
                {
                    name: 'Red cursor',
                    color: 'red',
                }
            ]
        });

        var firstCursor = plot.getCursors()[0];
        var secondCursor = plot.getCursors()[1];
        expect(plot.getCursors().length).toBe(2);
        expect(firstCursor.name).toBe('Blue cursor');
        expect(secondCursor.name).toBe('Red cursor');
    });

    it('should have xy mode by default', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                }
            ]
        });

        var firstCursor = plot.getCursors()[0];
        expect(firstCursor.mode).toBe('xy');
    });

    it('should have a lineWidth of 1 by default', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                }
            ]
        });

        var firstCursor = plot.getCursors()[0];
        expect(firstCursor.lineWidth).toBe(1);
    });


    it('should be possible to create a cursor at runtime', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: []
        });

        expect(plot.getCursors().length).toBe(0);

        plot.addCursor({
            name: 'Blue cursor',
            mode: 'xy',
            color: 'blue',
            position: {
                relativeX: 7,
                relativeY: 7
            }
        });

        var firstCursor = plot.getCursors()[0];

        expect(plot.getCursors().length).toBe(1);
        expect(firstCursor.name).toBe('Blue cursor');
    });

    it('should be possible to remove a cursor at runtime', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    x: 3,
                    y: 1.5
                }
            ]
        });

        var firstCursor = plot.getCursors()[0];
        expect(plot.getCursors().length).toBe(1);

        plot.removeCursor(firstCursor);

        expect(plot.getCursors().length).toBe(0);
    });

    it('should be possible to change a cursor name at runtime', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue'
                }
            ]
        });

        var firstCursor = plot.getCursors()[0];
        expect(plot.getCursors().length).toBe(1);
        expect(firstCursor.name).toBe('Blue cursor');

        plot.setCursor(firstCursor, {
            name: 'Red Cursor'
        });

        expect(plot.getCursors().length).toBe(1);
        expect(firstCursor.name).toBe('Red Cursor');
    });

    describe('Names', function () {
        it('should give the cursors default names if not specified', function () {
            plot = $.plot("#placeholder", [sampledata], {
                cursors: [
                    {
                        color: 'blue'
                    }
                ]
            });

            var firstCursor = plot.getCursors()[0];

            expect(firstCursor.name).toEqual(jasmine.any(String));
            expect(firstCursor.name.length).toBeGreaterThan(0);
        });

        it('should give the cursors unique names');
        it('should give the cursors created at runtime unique names');
    });

    it('should be possible to change a cursor label visibility at runtime', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue'
                }
            ]
        });

        var firstCursor = plot.getCursors()[0];
        expect(plot.getCursors().length).toBe(1);
        expect(firstCursor.showLabel).toBe(false);

        plot.setCursor(firstCursor, {
            showLabel: true
        });

        expect(plot.getCursors().length).toBe(1);
        expect(firstCursor.showLabel).toBe(true);
    });

    it('should be possible to change a cursor mode at runtime', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue'
                }
            ]
        });

        var firstCursor = plot.getCursors()[0];
        expect(plot.getCursors().length).toBe(1);
        expect(firstCursor.mode).toBe('xy');

        plot.setCursor(firstCursor, {
            mode: 'x'
        });

        expect(plot.getCursors().length).toBe(1);
        expect(firstCursor.mode).toBe('x');
    });

    ['cross', 'triangle', 'square', 'diamond'].forEach(function (symbol, i, arr) {
        it('should be possible to make the cursor shape a ' + symbol, function () {
            plot = $.plot("#placeholder", [sampledata], {
                cursors: [
                    {
                        name: 'Blue cursor',
                        color: 'blue',
                        symbol: symbol
                        }
                    ]
            });

            arr.forEach(function (symbol) {
                spyOn(plot.drawSymbol, symbol);
            });

            jasmine.clock().tick(20);


            arr.forEach(function (s) {
                if (s === symbol) {
                    expect(plot.drawSymbol[s]).toHaveBeenCalled();
                } else {
                    expect(plot.drawSymbol[s]).not.toHaveBeenCalled();
                }

            });
        });
    });

    it('should be possible to change the cursor shape at runtime', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    symbol: 'diamond'
                }
            ]
        });

        ['square', 'diamond'].forEach(function (symbol) {
            spyOn(plot.drawSymbol, symbol);
        });

        jasmine.clock().tick(20);

        var firstCursor = plot.getCursors()[0];

        plot.setCursor(firstCursor, {
            symbol: 'square'
        });

        jasmine.clock().tick(20);

        expect(plot.drawSymbol.square).toHaveBeenCalled();
    });

    it('should be possible to change the cursor color at runtime', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue'
                }
            ]
        });

        var firstCursor = plot.getCursors()[0];
        var initialColor = firstCursor.color;
        plot.setCursor(firstCursor, {
            color: 'red'
        });

        expect(initialColor).toBe('blue');
        expect(firstCursor.color).toBe('red');
    });

    it('should be possible to change the cursor lineWidth at runtime', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    lineWidth: 2
                }
            ]
        });

        var firstCursor = plot.getCursors()[0];
        var initialLineWidth = firstCursor.lineWidth;

        plot.setCursor(firstCursor, {
            lineWidth: 3
        });

        expect(initialLineWidth).toBe(2);
        expect(firstCursor.lineWidth).toBe(3);
    });

    it('should display the cursor label when told so');
});