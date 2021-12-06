(function () {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 20, left: 30 },
        width = 500 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    let x = d3.scaleBand()
        .range([40, 950]);
    let y = d3.scaleLinear()
        .domain([0, 250])
        .range([200, 0]);
    let color = {
        "driving": "#1F77B4",
        "transit": "#2CA02C",
        "walking": "#FF7F0E"
    }
    let svg = d3.select("#bar_chart")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 2000);
    let text;
    d3.json("charts/page3/data.json").then(res => {
        x.domain(Object.keys(res["Australia"]["driving"]));
        let count = 0;
        for (let i in res) {
            draw_bar_chart(res[i], count++, i);
        }
        text = svg.append("text")
            .attr("font-size", "15px");
    })
    let gs = svg.append("g")
        .selectAll("g")
        .data(Object.entries(color))
        .enter()
        .append("g");
    gs.append("rect")
        .attr("x", 880)
        .attr("y", (_, i) => i * 20)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", d => d[1]);
    gs.append("text")
        .attr("x", 900)
        .attr("y", (_, i) => i * 20 + 11)
        .attr("font-size", "15px")
        .text(d => d[0]);
    const annotations = [
        {
            //below in makeAnnotations has type set to d3.annotationLabel
            //you can add this type value below to override that default
            type: d3.annotationCalloutCircle,
            note: {
                label: "during pandemic",
                title: "peak of transportation",
                wrap: 190
            },
            //settings for the subject, in this case the circle radius
            subject: {
                radius: 40
            },
            x: 300,
            y: 100,
            dy: -50,
            dx: 102
        }].map(function (d) { d.color = "#E8336D"; return d });

    function draw_bar_chart(datas, count, country) {
        let g = svg.append("g")
            .attr("transform", `translate(0,${count * 250 + 15})`)
        let index = 0;
        for (let i in datas) {
            let data = Object.entries(datas[i]);
            g.append("g")
                .selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .style("cursor", "pointer")
                .on("mouseover", function (e, d) {
                    text.text(d[1])
                        .attr("x", e.layerX)
                        .attr("y", e.layerY - 10);
                })
                .on("mouseleave", function (e, d) {
                    text.text('')
                })
                .attr("fill", color[i])
                .attr("x", d => x(d[0]) + index * 11)
                .attr("y", d => y(d[1]))
                .attr("width", 10)
                .attr("height", d => 200 - y(d[1]));
            index += 1;
        }
        g.append("text")
            .attr("y", 20)
            .attr("x", 45)
            .text(country);
        g.append("g")
            .attr("transform", "translate(0,200)")
            .call(d3.axisBottom().scale(x));
        g.append("g")
            .attr("transform", "translate(40,0)")
            .call(d3.axisLeft().scale(y));
        g.append("text")
            .attr("font-size", "10px")
            .text("population")
            .attr("x", 0)
            .attr("y", -5);
        const makeAnnotations = d3.annotation()
            .type(d3.annotationLabel)
            .annotations(annotations)

        g
            .append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotations)
    }
})()