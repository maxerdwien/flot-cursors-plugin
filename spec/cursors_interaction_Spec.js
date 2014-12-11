/* global $, describe, it, xit, after, beforeEach, afterEach, expect, jasmine */
/* jshint browser: true*/

describe("Cursors interaction", function () {
    'use strict';

    var sampledata = [[0, 1], [1, 1.1], [2, 1.2]];

    var plot;

    beforeEach(function () {
        jasmine.addMatchers({
            toBeAnyOf: function (util, customEqualityTesters) {
                return {
                    compare: function (actual, expected) {
                        var res = false;
                        for (var i = 0, l = expected.length; i < l; i++) {
                            if (actual === expected[i]) {
                                res = true;
                                break;
                            }
                        }
                        return {
                            pass: res
                        };
                    }
                };
            }
        });

        jasmine.clock().install();
    });

    afterEach(function () {
        plot.shutdown();
        $('#placeholder').empty();
        jasmine.clock().uninstall();
    });

    it('should become selected on mouse down on cursor manipulator and not selected on mouseup', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 50,
                        relativeY: 60
                    }
                    }
                ]
        });

        var cursorX = plot.offset().left + 50;
        var cursorY = plot.offset().top + 60;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.selected).toBe(true);

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        expect(cursor.selected).toBe(false);
    });

    it('should become selected on mouse down on cursor vertical line and not selected on mouseup', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 50,
                        relativeY: 60
                    }
                    }
                ]
        });

        var cursorX = plot.offset().left + 50;
        var cursorY = plot.offset().top + 20;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.selected).toBe(true);

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        expect(cursor.selected).toBe(false);
    });

    it('should become selected on mouse down on cursor horizontal line and not selected on mouseup', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 50,
                        relativeY: 60
                    }
                    }
                ]
        });

        var cursorX = plot.offset().left + 30;
        var cursorY = plot.offset().top + 60;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.selected).toBe(true);

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        expect(cursor.selected).toBe(false);
    });

    it('should be possible to drag cursors with the mouse from the cursor manipulator', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 50,
                        relativeY: 60
                    }
                    }
                ]
        });

        var cursorX = plot.offset().left + 50;
        var cursorY = plot.offset().top + 60;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        cursorX += 13;
        cursorY += 5;

        eventHolder.trigger(new $.Event('mousemove', {
            pageX: cursorX,
            pageY: cursorY
        }));

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.x).toBe(50 + 13);
        expect(cursor.y).toBe(60 + 5);
    });

    it('should be constrained on the right side by the chart margin when dragging', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 50,
                        relativeY: 60
                    }
                }
            ],
            yaxes: [
                {
                    position: 'right'
                }]
        });

        var cursorX = plot.offset().left + 50;
        var cursorY = plot.offset().top + 60;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        cursorX = plot.offset().left + plot.width() + 5;

        eventHolder.trigger(new $.Event('mousemove', {
            pageX: cursorX,
            pageY: cursorY
        }));

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        jasmine.clock().tick(20);

        var cursor = plot.getCursors()[0];
        expect(cursor.x).toBe(plot.width());
        expect(cursor.y).toBe(60);
    });

    it('should be constrained on the top side by the chart margin when dragging', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 50,
                        relativeY: 60
                    }
                }
            ],
            xaxes: [
                {
                    position: 'top'
                }]
        });

        var cursorX = plot.offset().left + 50;
        var cursorY = plot.offset().top + 60;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        cursorY = plot.offset().top - 5;

        eventHolder.trigger(new $.Event('mousemove', {
            pageX: cursorX,
            pageY: cursorY
        }));

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        jasmine.clock().tick(20);

        var cursor = plot.getCursors()[0];
        expect(cursor.x).toBe(50);
        expect(cursor.y).toBe(0);
    });

    it('should be constrained on the bottom side by the chart margin when dragging', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 50,
                        relativeY: 60
                    }
                }
            ]
        });

        var cursorX = plot.offset().left + 50;
        var cursorY = plot.offset().top + 60;

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        cursorY = plot.offset().top + plot.height() + 5;

        eventHolder.trigger(new $.Event('mousemove', {
            pageX: cursorX,
            pageY: cursorY
        }));

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        jasmine.clock().tick(20);

        var cursor = plot.getCursors()[0];
        expect(cursor.x).toBe(50);
        expect(cursor.y).toBe(plot.height());
    });

    it('should be possible to drag cursors with the mouse from the cursor manipulator while the chart updates', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 50,
                        relativeY: 60
                    }
                    }
                ]
        });

        var cursorX = plot.offset().left + 50;
        var cursorY = plot.offset().top + 60;

        var updateChart = function () {
            plot.setData([[[0, 1.2], [1, 1.1], [2, 1]]]);
            plot.setupGrid();
            plot.draw();
        };

        jasmine.clock().tick(20);

        var eventHolder = $('#placeholder').find('.flot-overlay');
        eventHolder.trigger(new $.Event('mousedown', {
            pageX: cursorX,
            pageY: cursorY
        }));

        cursorX += 13;
        cursorY += 5;

        updateChart();
        jasmine.clock().tick(20);

        eventHolder.trigger(new $.Event('mousemove', {
            pageX: cursorX,
            pageY: cursorY
        }));

        eventHolder.trigger(new $.Event('mouseup', {
            pageX: cursorX,
            pageY: cursorY
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.x).toBe(50 + 13);
        expect(cursor.y).toBe(60 + 5);
    });

    it('should be highlighted on mouse over the cursor manipulator', function () {
        plot = $.plot("#placeholder", [sampledata], {
            cursors: [
                {
                    name: 'Blue cursor',
                    color: 'blue',
                    position: {
                        relativeX: 50,
                        relativeY: 60
                    }
                    }
                ]
        });

        var cursorX = plot.offset().left + 50;
        var cursorY = plot.offset().top + 60;

        jasmine.clock().tick(20);

        $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousemove', {
            pageX: cursorX,
            pageY: cursorY
        }));

        var cursor = plot.getCursors()[0];
        expect(cursor.highlighted).toBe(true);
    });

    describe('Mouse pointer', function () {
        it('should change the mouse pointer on mouse over the cursor manipulator', function () {
            plot = $.plot("#placeholder", [sampledata], {
                cursors: [
                    {
                        name: 'Blue cursor',
                        color: 'blue',
                        position: {
                            relativeX: 50,
                            relativeY: 60
                        }
                    }
                ]
            });

            var cursorX = plot.offset().left + 50;
            var cursorY = plot.offset().top + 60;

            jasmine.clock().tick(20);

            $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousemove', {
                pageX: cursorX,
                pageY: cursorY
            }));

            expect($('#placeholder').css('cursor')).toBe('pointer');
        });

        it('should change the mouse pointer when moving from the cursor vertical line to the cursor manipulator', function () {
            plot = $.plot("#placeholder", [sampledata], {
                cursors: [
                    {
                        name: 'Blue cursor',
                        color: 'blue',
                        position: {
                            relativeX: 50,
                            relativeY: 60
                        }
                }
            ]
            });

            var cursorX = plot.offset().left + 50;
            var cursorY = plot.offset().top + 30;

            jasmine.clock().tick(20);

            $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousemove', {
                pageX: cursorX,
                pageY: cursorY
            }));

            cursorY = plot.offset().top + 60;

            $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousemove', {
                pageX: cursorX,
                pageY: cursorY
            }));

            expect($('#placeholder').css('cursor')).toBe('pointer');
        });

        it('should change the mouse pointer on drag with the cursor manipulator', function () {
            plot = $.plot("#placeholder", [sampledata], {
                cursors: [
                    {
                        name: 'Blue cursor',
                        color: 'blue',
                        position: {
                            relativeX: 50,
                            relativeY: 60
                        }
                    }
                ]
            });

            var cursorX = plot.offset().left + 50;
            var cursorY = plot.offset().top + 60;

            jasmine.clock().tick(20);

            $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousedown', {
                pageX: cursorX,
                pageY: cursorY
            }));

            expect($('#placeholder').css('cursor')).toBe('move');

            $('#placeholder').find('.flot-overlay').trigger(new $.Event('mouseup', {
                pageX: cursorX,
                pageY: cursorY
            }));

            expect($('#placeholder').css('cursor')).toBe('default');
        });

        it('should change the mouse pointer on mouse over the cursor vertical line', function () {
            plot = $.plot("#placeholder", [sampledata], {
                cursors: [
                    {
                        name: 'Blue cursor',
                        color: 'blue',
                        position: {
                            relativeX: 50,
                            relativeY: 60
                        }
                }
            ]
            });

            var cursorX = plot.offset().left + 50;
            var cursorY = plot.offset().top + 30;

            jasmine.clock().tick(20);

            $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousemove', {
                pageX: cursorX,
                pageY: cursorY
            }));

            expect($('#placeholder').css('cursor')).toBe('col-resize');
        });

        it('shouldn\'t change the mouse pointer when the mouse is at the same x but the cursor doesn\'t have a vertical line', function () {
            plot = $.plot("#placeholder", [sampledata], {
                cursors: [
                    {
                        name: 'Blue cursor',
                        mode: 'y',
                        color: 'blue',
                        position: {
                            relativeX: 50,
                            relativeY: 60
                        }
                }
            ]
            });

            var cursorX = plot.offset().left + 50;
            var cursorY = plot.offset().top + 30;

            jasmine.clock().tick(20);

            $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousemove', {
                pageX: cursorX,
                pageY: cursorY
            }));

            expect($('#placeholder').css('cursor')).toBeAnyOf(['auto', 'default']);
        });

        it('should change the mouse pointer on mouse over the cursor horizontal line', function () {
            plot = $.plot("#placeholder", [sampledata], {
                cursors: [
                    {
                        name: 'Blue cursor',
                        color: 'blue',
                        position: {
                            relativeX: 50,
                            relativeY: 60
                        }
                }
            ]
            });

            var cursorX = plot.offset().left + 30;
            var cursorY = plot.offset().top + 60;

            jasmine.clock().tick(20);

            $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousemove', {
                pageX: cursorX,
                pageY: cursorY
            }));

            expect($('#placeholder').css('cursor')).toBe('row-resize');
        });

        it('should set the mouse pointer of the holder div to default on chart shutdown', function () {
            plot = $.plot("#placeholder", [sampledata], {
                cursors: [
                    {
                        name: 'Blue cursor',
                        color: 'blue',
                        position: {
                            relativeX: 50,
                            relativeY: 60
                        }
                }
            ]
            });

            var cursorX = plot.offset().left + 50;
            var cursorY = plot.offset().top + 60;

            jasmine.clock().tick(20);

            $('#placeholder').find('.flot-overlay').trigger(new $.Event('mousemove', {
                pageX: cursorX,
                pageY: cursorY
            }));

            expect($('#placeholder').css('cursor')).toBe('pointer');

            plot.shutdown();

            expect($('#placeholder').css('cursor')).toBeAnyOf(['auto', 'default']);
        });
    });
});