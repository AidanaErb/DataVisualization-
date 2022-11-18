async function buildPlot() {
    const dataX = await Array.from({length: 1000}, () => Math.floor(Math.random() * 4000));
    const dataY = await Array.from({length: 1000}, () => Math.floor(Math.random() * 1000));


    const data = await new Array(1000)
        .fill(0)
        .map(e=>(new Array(1000)
        .fill(0)
        .map(e=> Math.floor(Math.random() * 1000))));


    const dataR = await new Array(40)
        .fill(0)
        .map(e=>(new Array(40)
        .fill(0)
        .map(e=> Math.floor(Math.random() * 1000))));

    var dimension = {
        width: window.innerWidth*0.9,
        height: 400,
        margin: {
            top: 15,
            left: 350,
            bottom: 15,
            right: 15
        }
    };

    dimension.boundedWidth = dimension.width - dimension.margin.left - dimension.margin.right-15;
    dimension.boundedHeight = dimension.height - dimension.margin.top - dimension.margin.bottom;

    const wrapper = d3.select("#wrapper");
    wrapper.html("");

    const svg = wrapper.append("svg")
        .attr("height",dimension.height)
        .attr("width",dimension.width);

    const bounded = svg.append("g")
        .style("transform",`translate(${dimension.margin.left}px, ${dimension.margin.top})`);

    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, 1000])
        .range([ 0, dimension.boundedWidth ]);
    svg.append("g")
        .attr("transform", "translate(39," + dimension.boundedHeight + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 1000])
        .range([ dimension.boundedHeight, 0]);
    svg.append("g")
        .attr("transform", "translate(" + 39 + " ,0)")
        .call(d3.axisLeft(y));

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d[0])+40; } )
            .attr("cy", function (d) { return y(d[1]); } )
            .attr("r", 5)
            .style("stroke", "black")
            .style("fill", "none")

    svg.append('g')
        .selectAll("rhoumbus")
        .data(dataR)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d[0])+40; } )
            .attr("cy", function (d) { return y(d[1]); } )
            .attr("r", 5)
            .attr('width', 10)
            .attr('height', 10)
            .style("stroke", "black")
            .style("fill", "black")
            .attr( function() {
                return d3.svg.transform()
                    .translate(10, 10)
                    .rotate(-67)
                    .translate(-d3.select(this).attr("width")/2, -d3.select(this).attr("height")/2)();
            });
}

buildPlot();

async function clear() {
    const wrapper = d3.select("#wrapper");
    wrapper.html("");

}