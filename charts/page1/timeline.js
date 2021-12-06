(function () {
    let width = 1000, height = 220;
    let svg = d3.select("#timeline")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    let color = {
        "driving": "#1F77B4",
        "transit": "#2CA02C",
        "walking": "#FF7F0E"
    }
    let gs = svg.append("g")
        .selectAll("g")
        .data(Object.entries(color))
        .enter()
        .append("g");
    gs.append("rect")
        .attr("opacity", 0.5)

        .attr("x", 10)
        .attr("y", (_, i) => i * 20)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", d => d[1]);
    gs.append("text")
        .attr("x", 30)
        .attr("y", (_, i) => i * 20 + 11)
        .attr("font-size", "15px")
        .text(d => d[0]);
    d3.csv("./charts/page1/timeline_data.csv").then(data => {
        let parseDate = d3.timeParse("%Y-%m-%d");
        data.forEach(function (d) {
            d.date = parseDate(d.date);
        });
        var x = d3.scaleTime()
            .domain([new Date("2020-01-13"), new Date("2021-11-06")])
            .range([0, 1000]);
        var y = d3.scaleLinear()
            .domain([0, 12000])
            .range([200, 0]);
        let area1 = d3.area()
            .curve(d3.curveBasis)
            .x(d => x(d.date))
            .y1(d => y(d.driving))
            .y0(200);
        svg.append("path")
            .attr("fill", "#1F77B4")
            .attr("opacity", 0.5)
            .attr("d", area1(data));
        let area2 = d3.area()
            .curve(d3.curveBasis)
            .x(d => x(d.date))
            .y1(d => y(d.walking))
            .y0(200);
        svg.append("path")
            .attr("fill", "#FF7F0E")
            .attr("opacity", 0.5)
            .attr("d", area2(data));
        let area3 = d3.area()
            .curve(d3.curveBasis)
            .x(d => x(d.date))
            .y1(d => y(d.transit))
            .y0(200);
        svg.append("path")
            .attr("fill", "#2CA02C")
            .attr("opacity", 0.5)
            .attr("d", area3(data));
        svg.append("g")
            .attr("transform", "translate(0,200)")
            .call(d3.axisBottom(x));
    })
})()