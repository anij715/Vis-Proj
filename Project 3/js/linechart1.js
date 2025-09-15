class LineChart1 {

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


        vis.svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", 370)
            .attr("y", 300)
            .text("Seasons")

        vis.svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", 30)
            .attr("x", -100)
            .text("Episodes they showes up in.")


        // We need to make sure that the tracking area is on top of other chart elements
        vis.marks = vis.chart.append('g');
        vis.trackingArea = vis.chart.append('rect')
            .attr('width', vis.width)
            .attr('height', vis.height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all');


    }

    updateVis() {
        let vis = this;

        vis.xValue = d => d.season;
        vis.yValue = d => d.episodes;

        vis.line = d3.line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue(d)));
        // Set the scale input domains
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

        // Update the axes
        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);
    }
}