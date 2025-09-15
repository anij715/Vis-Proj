// ES6 Class
class BarChart {

    constructor(_config,_data) {
      this.config = {
        parentElement: _config.parentElement,
        containerWidth: _config.containerWidth || 800,
        containerHeight: _config.containerHeight || 300,
        margin: { top: 25, bottom: 60, right: 30, left: 100 },
        displayType: 1
      }
  
      this.data = _data; //array of objects data = 0, sum = 1
      //this.color = _color; //    
      // Call a class function
      this.initVis();
    }
  
    initVis() {

      console.log("Let's draw a Bar chart!!");

      let vis = this; //this is a keyword that can go out of scope, especially in callback functions, 
                      //so it is good to create a variable that is a reference to 'this' class instance
  
      //set up the width and height of the area where visualizations will go- factoring in margins               
      vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
      vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
  
      console.log("Test",vis.data);

      //setting up the chart- things that won't need to update on user actions
      vis.svg = d3.select(vis.config.parentElement).append('svg');
      vis.chart = vis.svg.append('g')
          .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        // Define size of SVG drawing area
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

      // Append group element that will contain our actual chart (see margin convention)
      vis.chart = vis.svg.append('g')
          .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);
  
      // Initialize axes
      vis.xAxis = d3.axisBottom(vis.xScale)
      .ticks(40);
      vis.yAxis = d3.axisLeft(vis.yScale);

      // Add X axis label:
      vis.chart.append("text")
      .attr("text-anchor", "end")
      .attr("x", vis.width)
      .attr("y", vis.height + vis.config.margin.top+30)
      .text("Characters");

      // Y axis label:
      vis.chart.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -vis.config.margin.left+20)
      .attr("x", -vis.config.margin.top)
      .text("Word Count")

      vis.chart.append("text")
      .attr("x", (vis.width / 2))             
      .attr("y", 0 - (vis.config.margin.top / 2))
      .attr("text-anchor", "middle")  
      .style("font-size", "16px") 
      .style("text-decoration", "underline")  
      .text("Who Spoke Most Often");   

      // We need to make sure that the tracking area is on top of other chart elements
      // vis.marks = vis.chart.append('g');
      vis.trackingArea = vis.chart.append('rect')
          .attr('width', vis.width)
          .attr('height', vis.height)
          .attr('fill', 'none')
          .attr('pointer-events', 'all');


  // updateVis(); //call updateVis() at the end 
    }
  
   updateVis() { 
    // renderVis(); 
    let vis = this;

    console.log("Test",vis.data);    

    vis.xValue = d => d.character; 
    vis.yValue = d => d.words;

    vis.xScale = d3.scaleBand()
    .domain(d3.map(vis.data, vis.xValue)) //d3.min(vis.data, d => d.year), d3.max(vis.data, d => d.year) );
    .range([0, vis.width])
    .padding(0.2)
    ;

  // Add Y axis
    vis.yScale = d3.scaleLinear()
    .domain(d3.extent(vis.data, vis.yValue))
    .range([ vis.height, 0]);

      // Append group element that will contain our actual chart (see margin convention)
      // vis.chart = vis.svg.append('g')
      //     .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`)
      //     .remove();



    vis.renderVis();

   }
  
   renderVis() { 
    let vis = this;

    vis.chart.selectAll("mybar")
    .data(vis.data)
    .enter()
    .append("rect")
      .attr("x", function(d) { return vis.xScale(d.character); })
      .attr("y", function(d) { return vis.yScale(+d.words); })
      .attr("width", function(d) { return vis.xScale.bandwidth(); })
      .attr("height", function(d) { return vis.height - vis.yScale(+d.words); })
      .attr("fill", "#69b3a2")

      // Initialize axes
      vis.xAxis = d3.axisBottom(vis.xScale)
      .ticks(40);
      vis.yAxis = d3.axisLeft(vis.yScale);

      // Append x-axis group and move it to the bottom of the chart
      vis.xAxisG = vis.chart.append('g')
          .attr('class', 'axis x-axis')
          .attr('transform', `translate(0,${vis.height})`)
          .call(vis.xAxis)
          .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");
      
      // Append y-axis group
      vis.yAxisG = vis.chart.append('g')
          .attr('class', 'axis y-axis')
          .call(vis.yAxis);         

   }

  
  }