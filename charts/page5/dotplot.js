(function () {
    let width = 900, height = 500;
    let svg = d3.select("#dotplot")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    let text = svg.append("text")
        .attr("font-size","15px")
    d3.json("./charts/page5/data.json").then(res => {
        let data = res.data;
        let x = d3.scaleLinear()
            .domain([40, 150])
            .range([150, 700]);
        let y = d3.scaleLinear()
            .domain([0, 1])
            .range([0, 400])
        svg.append("g")
            .attr("transform", "translate(0,400)")
            .call(d3.axisBottom(x));
        svg.append("g")
            .attr("transform", "translate(150,0)")
            .call(d3.axisLeft(y).ticks(0));

        svg.append("rect")
            .attr("x", 800)
            .attr("y", 50)
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", "#b2e2e2")

        let gs = svg.selectAll(".dot")
            .data(data)
            .enter()
            .append("g");
        gs.append("line")
            .attr("x1", d => x(d.value[0]))
            .attr("x2", d => x(d.value[1]))
            .attr("y1", (_, i) => i * 50 + 50)
            .attr("y2", (_, i) => i * 50 + 50)
            .attr("stroke", "black");
        gs.append("circle")
            .attr("cx", d => x(d.value[0]))
            .attr("cy", (_, i) => i * 50 + 50)
            .attr("r", 6)
            .attr("fill", "red")
            .style("cursor","pointer")
            .on("mouseover",function(e,d){
                d3.select(this)
                    .attr("r",8);
                text.text(`after vaccine:${d.value[0]}`)
                    .attr("x",e.layerX)
                    .attr("y",e.layerY-10);
            })
            .on("mouseleave",function(){
                d3.select(this)
                    .attr("r",6);
                text.text('')
            });
        gs.append("circle")
            .attr("cx", d => x(d.value[1]))
            .attr("cy", (_, i) => i * 50 + 50)
            .attr("r", 6)
            .attr("fill", "blue")
            .style("cursor","pointer")
            .on("mouseover",function(e,d){
                d3.select(this)
                    .attr("r",8);
                text.text(`before vaccine ${d.value[1]}`)
                    .attr("x",e.layerX)
                    .attr("y",e.layerY-10);
            })
            .on("mouseleave",function(){
                d3.select(this)
                    .attr("r",6);
                text.text('')
            });
        gs.append("text")
            .text(d => d.id)
            .attr("x", 0)
            .attr("y", (_, i) => i * 50 + 55);
        
    })
})()