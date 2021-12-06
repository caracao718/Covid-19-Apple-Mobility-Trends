var radius = Math.min(450, 450) / 2 - 40;
// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#pie_chart")
    .append("svg")
    .attr("width", 450)
    .attr("height", 450)
    .append("g")
    .attr("transform", `translate(${450 / 2}, ${450 / 2})`);

// create 2 data_set
var data1 = { driving: 44, walking: 42, transit: 14 }
var data2 = { driving: 39, walking: 44, transit: 16 }


var color = d3.scaleOrdinal()
    .domain(["driving", "walking", "transit"])
    .range(["#1F77B4", "#FF7F0E", "#2CA02C"]);


var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);
var arc2 = d3.arc()
    .innerRadius(0)
    .outerRadius(radius + 30);
// A function that create / update the plot for a given variable:
function update(data) {
    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .value(function (d) { return d[1]; })
        .sort(function (a, b) { return d3.ascending(a.key, b.key); }) // This make sure that group order remains the same in the pie chart
    var data_ready = pie(Object.entries(data))

    // map to data
    var u = svg.selectAll("path")
        .data(data_ready);
    var texts = svg.selectAll("text")
        .data(data_ready);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    let paths = u
        .join('path')
        .on("mouseover",function(){
            d3.select(this).transition().attr("d",arc2)
        })
        .on("mouseleave",function(){
            d3.select(this).transition().attr("d",arcGenerator)
        })
        .style("cursor","pointer")
        .transition()
        .duration(500)
        .attr('d', arcGenerator)
        .attr('fill', function (d) { return (color(d.data[0])) })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 1);
    texts
        .join("text")
        .transition()
        .duration(500)
        .text(d => {
            return d.data[0] +" "+　d.value +"%"
        })
        .attr('transform', function (d, i) {
            let pos = arcGenerator.centroid(d);
            return 'translate(' + pos[0] + "," + pos[1] + ")";
        })
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size","15px");
}


// Initialize the plot with the first dataset
update(data1)