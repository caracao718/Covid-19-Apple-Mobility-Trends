// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#global_bar_chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

// Parse the Data
d3.csv("./charts/page3/USA_bar_data.csv").then( function(data) {

    // List of subgroups = header of the csv files = soil condition here
    var subgroups = data.columns.slice(1)

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var groups = data.map(d => d.group)

    console.log(groups)

    // Add X axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSize(0));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 12000])
        .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Another scale for subgroup position?
    var xSubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding([0.05])

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#e41a1c','#377eb8','#4daf4a'])


    // let legend = d3.legendColor() //make legend using Susie Lu's library
    //     .ascending(true)
    //     .title("Time of data")
    //     .titleWidth(100)
    //     .scale(color);
    //
    // svg.append("g") //draw legend on page
    //     .attr("transform", "translate(100, 100)")
    //     .call(legend);

    svg.append("rect").attr("x", 300).attr("y",124).attr("width", 10).attr("height", 10).style("fill", "#e41a1c")
    svg.append("rect").attr("x", 300).attr("y",154).attr("width", 10).attr("height", 10).style("fill", "#377eb8")
    svg.append("rect").attr("x", 300).attr("y",184).attr("width", 10).attr("height", 10).style("fill", "#4daf4a")
    svg.append("text").attr("x", 320).attr("y", 130).text("Feb 2020").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 320).attr("y", 160).text("Feb 2021").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 320).attr("y", 190).text("Oct 2021").style("font-size", "15px").attr("alignment-baseline","middle")


    // Show the bars
    svg.append("g")
        .selectAll("g")
        // Enter in data = loop group per group
        .data(data)
        .join("g")
        .attr("transform", d => `translate(${x(d.group)}, 0)`)
        .selectAll("rect")
        .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
        .join("rect")
        .attr("x", d => xSubgroup(d.key))
        .attr("y", d => y(d.value))
        .attr("width", xSubgroup.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", d => color(d.key));

})