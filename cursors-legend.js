/*global jQuery, setTimeout, $*/

$(function () {
    'use strict';
    var plot;
    var offset = 0.0;
    var sin = [],
        cos = [];

    function updateData() {
        sin = [];
        cos = [];
        offset += 0.025;
        for (var i = 0; i < 14; i += 0.1) {
            sin.push([i, Math.sin(i + offset)]);
            cos.push([i, Math.cos(i + offset)]);
        }
    }

    function updateChart() {
        setTimeout(updateChart, 16);

        if ($('#checkbox').prop('checked')) {
            updateData();

            plot.setData([
                {
                    data: sin,
                    label: "sin(x)"
                },
                {
                    data: cos,
                    label: "cos(x)"
                }
            ]);

            plot.setupGrid();
            plot.draw();
        }
    }

    updateData();
    plot = $.plot("#placeholder", [
        {
            data: sin,
            label: "sin(x)"
        },
        {
            data: cos,
            label: "cos(x)"
        }
    ], {
        series: {
            lines: {
                show: true
            }
        },
        cursors: [
            {
                name: 'Red cursor',
                mode: 'x',
                color: '#e00000',
                showIntersections: false,
                showLabel: true,
                symbol: 'triangle',
                position: {
                    relativeX: 200,
                    relativeY: 300
                }
            },
            {
                name: 'Blue cursor',
                mode: 'xy',
                color: '#0000e0',
                showIntersections: true,
                snapToPlot: 1,
                symbol: 'diamond',
                position: {
                    relativeX: 400,
                    relativeY: 20
                }
            },
            {
                name: 'Green cursor',
                mode: 'y',
                color: '#008000',
                showIntersections: true,
                symbol: 'cross',
                position: {
                    relativeX: 100,
                    relativeY: 200
                }
            }
        ],
        grid: {
            hoverable: true,
            clickable: true,
            autoHighlight: false
        },
        yaxis: {
            min: -1.2,
            max: 1.2
        }
    });

    window.myPlot = plot;
    /*
    $("#placeholder").bind("cursorupdates", function (event, cursordata) {
        $('#hoverdata').empty();
        var ul1 = $('#hoverdata').append('<UL style="padding-left: 30px;">').find("UL");
        cursordata.forEach(function (cursor) {
            ul1.append("<LI>" + cursor.cursor + "</LI>");
            var ul2 = ul1.append('<UL style="padding-left: 30px;">').find("UL").last();
            cursor.points.forEach(function (point) {
                ul2.append("<LI> x:" + point.x.toFixed(4) + " y: " + point.y.toFixed(4) + "</LI>");
            });
        });
    });
*/
    updateChart();
});