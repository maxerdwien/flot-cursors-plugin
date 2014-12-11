/* global $, describe, it, xit, after, beforeEach, afterEach, expect, jasmine */
/* jshint browser: true*/

describe("Cursors intersections", function () {
    'use strict';

    var sampledata = [[0, 1], [1, 1.1], [2, 1.2]];
    var sampledata2 = [[0, 2], [1, 2.1], [2, 2.2]];

    var plot;

    beforeEach(function () {
        jasmine.clock().install();
    });

    afterEach(function () {
        plot.shutdown();
        $('#placeholder').empty();
        jasmine.clock().uninstall();
    });

    it('should find intersections with a plot', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        x: 1,
                        y: 0
                    }
                    }
                ]
        });

        jasmine.clock().tick(20);

        var cursors = plot.getCursors();
        var intersections = plot.getIntersections(cursors[0]);

        expect(intersections.points.length).toBe(1);
        expect(intersections.points[0].x).toBe(1);
        expect(intersections.points[0].y).toBe(sampledata[1][1]);
    });

    it('should find intersections with multiple plots', function () {
        plot = $.plot("#placeholder", [sampledata, sampledata2], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        x: 1,
                        y: 0
                    }
                    }
                ]
        });

        jasmine.clock().tick(20);

        var cursors = plot.getCursors();
        var intersections = plot.getIntersections(cursors[0]);

        expect(intersections.points.length).toBe(2);
        expect(intersections.points[0].x).toBe(1);
        expect(intersections.points[0].y).toBe(sampledata[1][1]);
        expect(intersections.points[1].x).toBe(1);
        expect(intersections.points[1].y).toBe(sampledata2[1][1]);
    });

    it('should interpolate the intersections properly with linear scales', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        x: 0.5,
                        y: 0
                    }
                    }
                ]
        });

        jasmine.clock().tick(20);

        var cursors = plot.getCursors();
        var intersections = plot.getIntersections(cursors[0]);
        var expectedY = sampledata[0][1] + (sampledata[1][1] - sampledata[0][1]) / 2;

        expect(intersections.points[0].x).toBe(0.5);
        expect(intersections.points[0].y).toBe(expectedY);
    });

    it('should interpolate the intersections properly with log scales');
    it('should interpolate the intersections properly with mixed scales');

    it('should recompute intersections on data update', function () {
        plot = $.plot("#placeholder", [[[0, 1], [1, 5]]], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        x: 0.5,
                        y: 0
                    }
                    }
                ]
        });

        var updateChart = function () {
            plot.setData([[[0, 1], [1, 7]]]);
            plot.setupGrid();
            plot.draw();
        };

        jasmine.clock().tick(20);

        var cursors = plot.getCursors();
        var intersections = plot.getIntersections(cursors[0]);

        expect(intersections.points[0].x).toBe(0.5);
        expect(intersections.points[0].y).toBe(3);
        updateChart();

        jasmine.clock().tick(20);

        intersections = plot.getIntersections(cursors[0]);

        expect(intersections.points[0].x).toBe(0.5);
        expect(intersections.points[0].y).toBe(4);
    });
});