(function () {
    // set the dimensions and margins of the graph
    // total
    d3.csv("charts/page4/bar_total.csv").then(function (data) {
        const margin = { top: 10, right: 30, bottom: 20, left: 50 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;
        const svg = d3.select("#global_bar_chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        // List of subgroups = header of the csv files = soil condition here
        const subgroups = data.columns.slice(1)

        // List of groups = species here = value of the first column called group -> I show them on the X axis
        const groups = data.map(d => d.group)

        // Add X axis
        const x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickSize(0))
            .attr("font-size", "17px");


        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, 12000])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Another scale for subgroup position?
        const xSubgroup = d3.scaleBand()
            .domain(subgroups)
            .range([0, x.bandwidth()])
            .padding([0.05])

        // color palette = one color per subgroup
        const color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#b2e2e2', '#66c2a4', '#238b45'])
            // .range(['#e41a1c', '#377eb8', '#4daf4a'])

        svg.append("rect").attr("x", 300).attr("y", 124).attr("width", 10).attr("height", 10).style("fill", "#b2e2e2")
        svg.append("rect").attr("x", 300).attr("y", 154).attr("width", 10).attr("height", 10).style("fill", "#66c2a4")
        svg.append("rect").attr("x", 300).attr("y", 184).attr("width", 10).attr("height", 10).style("fill", "#238b45")
        svg.append("text").attr("x", 320).attr("y", 130).text("Feb 2020").style("font-size", "15px").attr("alignment-baseline", "middle")
        svg.append("text").attr("x", 320).attr("y", 160).text("Feb 2021").style("font-size", "15px").attr("alignment-baseline", "middle")
        svg.append("text").attr("x", 320).attr("y", 190).text("Oct 2021").style("font-size", "15px").attr("alignment-baseline", "middle")
        // Show the bars
        svg.append("g")
            .selectAll("g")
            // Enter in data = loop group per group
            .data(data)
            .join("g")
            .attr("transform", d => `translate(${x(d.group)}, 0)`)
            .selectAll("rect")
            .data(function (d) { return subgroups.map(function (key) { return { key: key, value: d[key] }; }); })
            .join("rect")
            .attr("x", d => xSubgroup(d.key))
            .attr("y", d => y(d.value))
            .attr("width", xSubgroup.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", d => color(d.key));

    })
    //usa 
    d3.csv("charts/page4/bar_usa.csv").then(function (data) {
        const margin = { top: 10, right: 30, bottom: 20, left: 50 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;
        const svg = d3.select("#usa_bar_chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        // List of subgroups = header of the csv files = soil condition here
        const subgroups = data.columns.slice(1)

        // List of groups = species here = value of the first column called group -> I show them on the X axis
        const groups = data.map(d => d.group)


        // Add X axis
        const x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickSize(0))
            .attr("font-size", "17px");

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, 300])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Another scale for subgroup position?
        const xSubgroup = d3.scaleBand()
            .domain(subgroups)
            .range([0, x.bandwidth()])
            .padding([0.05])

        // color palette = one color per subgroup
        const color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#b2e2e2', '#66c2a4', '#238b45'])
            // .range(['#e41a1c', '#377eb8', '#4daf4a'])

        svg.append("rect").attr("x", 300).attr("y", 124).attr("width", 10).attr("height", 10).style("fill", "#b2e2e2")
        svg.append("rect").attr("x", 300).attr("y", 154).attr("width", 10).attr("height", 10).style("fill", "#66c2a4")
        svg.append("rect").attr("x", 300).attr("y", 184).attr("width", 10).attr("height", 10).style("fill", "#238b45")
        svg.append("text").attr("x", 320).attr("y", 130).text("Feb 2020").style("font-size", "15px").attr("alignment-baseline", "middle")
        svg.append("text").attr("x", 320).attr("y", 160).text("Feb 2021").style("font-size", "15px").attr("alignment-baseline", "middle")
        svg.append("text").attr("x", 320).attr("y", 190).text("Oct 2021").style("font-size", "15px").attr("alignment-baseline", "middle")
        // Show the bars
        svg.append("g")
            .selectAll("g")
            // Enter in data = loop group per group
            .data(data)
            .join("g")
            .attr("transform", d => `translate(${x(d.group)}, 0)`)
            .selectAll("rect")
            .data(function (d) { return subgroups.map(function (key) { return { key: key, value: d[key] }; }); })
            .join("rect")
            .attr("x", d => xSubgroup(d.key))
            .attr("y", d => y(d.value))
            .attr("width", xSubgroup.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", d => color(d.key));
    })
})()