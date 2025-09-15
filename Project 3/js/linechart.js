class LineChart {

    /**
     * Class constructor with basic chart configuration
     * @param {Object}
     * @param {Array}
     */
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 1000,
            containerHeight: _config.containerHeight || 300,
            margin: _config.margin || { top: 25, right: 30, bottom: 30, left: 100 },
            displayType: 'Michael'
        }
        this.data = _data;
        this.initVis();
    }

    /**
     * Initialize scales/axes and append static chart elements
     */
    initVis() {
        let vis = this;

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.xScale = d3.scaleLinear()
            .range([0, vis.width]);

        vis.yScale = d3.scaleLinear()
            .range([vis.height, 0])
            .nice();


        // Initialize axes
        vis.xAxis = d3.axisBottom(vis.xScale)
            .ticks(10)
            .tickSizeOuter(0)
            .tickPadding(10)
            .tickFormat(d => d);

        vis.yAxis = d3.axisLeft(vis.yScale)
            .ticks(8)
            .tickSizeOuter(0)
            .tickPadding(10);

        // Define size of SVG drawing area
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        // Append group element that will contain our actual chart (see margin convention)
        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        // Append empty x-axis group and move it to the bottom of the chart
        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`);

        // Append y-axis group
        vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis');

        // We need to make sure that the tracking area is on top of other chart elements
        vis.marks = vis.chart.append('g');


        vis.svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", 370)
            .attr("y", 300)
            .text("Seasons")

        vis.svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", 30)
            .attr("x", -40)
            .text("Words Per Season")

        vis.trackingArea = vis.chart.append('rect')
            .attr('width', vis.containerWidth)
            .attr('height', vis.containerHeight)
            .attr('fill', 'none')
            .attr('pointer-events', 'all');

        vis.tooltipTrackingArea = vis.chart.append('rect')
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight)
            .attr('fill', 'none')
            .attr('pointer-events', 'all');

        // Empty tooltip group (hidden by default)
        vis.tooltip = vis.chart.append('g')
            .attr('class', 'tooltip')
            .style('display', 'none');

        vis.tooltip.append('circle')
            .attr('r', 4);

        vis.tooltip.append('text');


    }

    updateVis() {
        let vis = this;

        vis.xValue = d => d.season;
        vis.yValue = d => d.words;

        vis.line = d3.line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue(d)));


        vis.xScale.domain(d3.extent(vis.data, vis.xValue));
        vis.yScale.domain(d3.extent(vis.data, vis.yValue));
        vis.renderVis();


    }

    renderVis() {
        let vis = this;
        // Add line path
        vis.marks.selectAll('.chart-line')
            .data([vis.data])
            .join('path')
            .attr('class', 'chart-line')
            .attr('d', vis.line);



        // vis.tooltipTrackingArea
        //     .on('mouseenter', () => {
        //         vis.tooltip.style('display', 'block');
        //     })
        //     .on('mouseleave', () => {
        //         vis.tooltip.style('display', 'none');
        //     })
        //     .on('mousemove', function(event) {
        //             // Get date that corresponds to current mouse x-coordinate
        //             const xPos = d3.pointer(event, this)[0]; // First array element is x, second is y
        //             const season = vis.xScale.invert(xPos);

        // Find nearest data point
        // const index = (vis.data, season, 1);
        // const a = vis.data[index - 1];
        // const b = vis.data[index];
        // const d = b && (season - a.season > b.season - season) ? b : a;

        // // Update tooltip
        // vis.tooltip.select('circle')
        //     .attr('transform', `translate(${vis.xScale(d.season)},${vis.yScale(d.words)})`);

        // vis.tooltip.select('text')
        //     .attr('transform', `translate(${vis.xScale(d.season)},${(vis.yScale(d.words) - 15)})`)
        //     .text(Math.round(d.count));
        // });
        // var div = d3.select("body").append("div")
        //     .attr("class", "tooltip")
        //     .style("opacity", 0);
        // // add the dots with tooltips
        // vis.svg.selectAll("dot")
        //     .data(vis.data)
        //     .enter()
        //     .append("circle")
        //     .style("left", d3.select(this).attr("cx") + "px")
        //     .attr("r", 5)
        //     .attr("cx", function(d) { return vis.xScale(d.season); })
        //     .attr("cy", function(d) { return vis.yScale(d.words); })
        //     .on("mouseover", function(event, d) {
        //         div.transition()
        //             .duration(200)
        //             .style("opacity", .9);
        //         div.html((d.season) + "<br/>" + d.words)
        //             .style("left", (event.pageX) + "px")
        //             .style("top", (event.pageY - 28) + "px");
        //     })
        //     .on("mouseout", function(d) {
        //         div.transition()
        //             .duration(500)
        //             .style("opacity", 0);
        //     });



        // Update the axes
        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);


    }
}