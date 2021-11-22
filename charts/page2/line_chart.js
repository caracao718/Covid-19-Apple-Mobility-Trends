
var myData = "date	driving 	walking 	transit\n\
20200113	6300	6300	2700\n\
20200213	6926	7202	2947\n\
20200313	5421	5350	1952\n\
20200413	2638	2338	728\n\
20200513	4216	3485	1063\n\
20200613	6597	5507	1649\n\
20200713	8176	7081	2245\n\
20200813	9147	8129	2350\n\
20200913	7737	6517	2291\n\
20201013	6296	6192	2158\n\
20201113	6143	6031	1957\n\
20201213	5209	4734	1701\n\
20210113	5307	5259	1734\n\
20210213	6131	5967	1850\n\
20210313	6317	6385	1894\n\
20210413	5735	5703	1989\n\
20210513	6660	6592	2263\n\
20210613	7755	7091	2620\n\
20210713	9383	9679	3131\n\
20210813	11827	12269	3380\n\
20210913	8221	9707	3603\n\
20211013	8251	9485	3698\n";

var margin = {
        top: 20,
        right: 80,
        bottom: 30,
        left: 50
    },
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) {
        return x(d.date);
    })
    .y(function(d) {
        return y(d.temperature);
    });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var data = d3.tsv.parse(myData);

color.domain(d3.keys(data[0]).filter(function(key) {
    return key !== "date";
}));

data.forEach(function(d) {
    d.date = parseDate(d.date);
});

var cities = color.domain().map(function(name) {
    return {
        name: name,
        values: data.map(function(d) {
            return {
                date: d.date,
                temperature: +d[name]
            };
        })
    };
});

x.domain(d3.extent(data, function(d) {
    return d.date;
}));

y.domain([
    d3.min(cities, function(c) {
        return d3.min(c.values, function(v) {
            return v.temperature;
        });
    }),
    d3.max(cities, function(c) {
        return d3.max(c.values, function(v) {
            return v.temperature;
        });
    })
]);

var legend = svg.selectAll('g')
    .data(cities)
    .enter()
    .append('g')
    .attr('class', 'legend');

legend.append('rect')
    .attr('x', width - 20)
    .attr('y', function(d, i) {
        return i * 20;
    })
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', function(d) {
        return color(d.name);
    });

legend.append('text')
    .attr('x', width - 8)
    .attr('y', function(d, i) {
        return (i * 20) + 9;
    })
    .text(function(d) {
        return d.name;
    });

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Direction Requests");

var city = svg.selectAll(".city")
    .data(cities)
    .enter().append("g")
    .attr("class", "city");

city.append("path")
    .attr("class", "line")
    .attr("d", function(d) {
        return line(d.values);
    })
    .style("stroke", function(d) {
        return color(d.name);
    });

city.append("text")
    .datum(function(d) {
        return {
            name: d.name,
            value: d.values[d.values.length - 1]
        };
    })
    .attr("transform", function(d) {
        return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")";
    })
    .attr("x", 3)
    .attr("dy", ".35em")
    .text(function(d) {
        return d.name;
    });

var mouseG = svg.append("g")
    .attr("class", "mouse-over-effects");

mouseG.append("path") // this is the black vertical line to follow mouse
    .attr("class", "mouse-line")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", "0");

var lines = document.getElementsByClassName('line');

var mousePerLine = mouseG.selectAll('.mouse-per-line')
    .data(cities)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line");

mousePerLine.append("circle")
    .attr("r", 7)
    .style("stroke", function(d) {
        return color(d.name);
    })
    .style("fill", "none")
    .style("stroke-width", "1px")
    .style("opacity", "0");

mousePerLine.append("text")
    .attr("transform", "translate(10,3)");

mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
    .attr('width', width) // can't catch mouse events on a g element
    .attr('height', height)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', function() { // on mouse out hide line, circles and text
        d3.select(".mouse-line")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line circle")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
            .style("opacity", "0");
    })
    .on('mouseover', function() { // on mouse in show line, circles and text
        d3.select(".mouse-line")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line circle")
            .style("opacity", "1");
        d3.selectAll(".mouse-per-line text")
            .style("opacity", "1");
    })
    .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line")
            .attr("d", function() {
                var d = "M" + mouse[0] + "," + height;
                d += " " + mouse[0] + "," + 0;
                return d;
            });

        d3.selectAll(".mouse-per-line")
            .attr("transform", function(d, i) {
                console.log(width/mouse[0])
                var xDate = x.invert(mouse[0]),
                    bisect = d3.bisector(function(d) { return d.date; }).right;
                idx = bisect(d.values, xDate);

                var beginning = 0,
                    end = lines[i].getTotalLength(),
                    target = null;

                while (true){
                    target = Math.floor((beginning + end) / 2);
                    pos = lines[i].getPointAtLength(target);
                    if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                        break;
                    }
                    if (pos.x > mouse[0])      end = target;
                    else if (pos.x < mouse[0]) beginning = target;
                    else break; //position found
                }

                d3.select(this).select('text')
                    .text(y.invert(pos.y).toFixed(2));

                return "translate(" + mouse[0] + "," + pos.y +")";
            });
    });