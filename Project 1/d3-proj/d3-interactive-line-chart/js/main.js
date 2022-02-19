// We use d3.timeParse() to convert a string into JS date object
// Initialize helper function
const parseTime = d3.timeParse("%Y-%m-%d");

let data, lineChart, lineChart1, lineChart2, barChart, linebar;

/**
 * Load data from CSV file asynchronously and render line chart
 */
d3.csv('data/data-csv-final.csv')
    .then(_data => {
        _data.forEach(d => {
            d.year = +d.year;
            d.maqi = +d.maqi;
            d.medianaqi = +d.medianaqi;
            d.percentile = +d.percentile;

            d.DaysCO_p = +d.DaysCO_p;
            d.DaysNO2_p = +d.DaysNO2_p;
            d.DaysOzone_p = +d.DaysOzone_p;
            d.DaysSO2_p = +d.DaysSO2_p;
            d.DaysPM2_5_p = +d.DaysPM2_5_p;
            d.DaysPM10_p = +d.DaysPM10_p;

            d.days_no_measurement = +d.days_no_measurement;
            
            d.Good_Days_p = +d.Good_Days_p;
            d.Moderate_Days_p = +d.Moderate_Days_p;
            d.Unhealthy_for_Sensitive_Groups_Days_p = +d.Unhealthy_for_Sensitive_Groups_Days_p;
            d.Unhealthy_Days_p = +d.Unhealthy_Days_p;
            d.Very_Unhealthy_Days_p = +d.Very_Unhealthy_Days_p;
            d.Hazardous_Days_p = +d.Hazardous_Days_p;

        });

        data = _data;

        let statedata = data.map(function(d) { return d.state });
        let statedata1 = statedata.filter(function(elem, pos) { return statedata.indexOf(elem) == pos; });
        //const state2 = (d3.select("#selectstate").property('value'));
        let countydata = data.map(function(d) { return d.county });
        let countydata1 = countydata.filter(function(elem, pos) { return countydata.indexOf(elem) == pos; });
        
        let yeardata = data.map(function(d) { return d.year });
        let yeardata1 = yeardata.filter(function(elem, pos) { return yeardata.indexOf(elem) == pos; });

        function autocomplete(inp, arr) {
            /*the autocomplete function takes two arguments,
            the text field element and an array of possible autocompleted values:*/
            var currentFocus;
            /*execute a function when someone writes in the text field:*/
            inp.addEventListener("input", function(e) {
                var a, b, i, val = this.value;
                /*close any already open lists of autocompleted values*/
                closeAllLists();
                if (!val) { return false; }
                currentFocus = -1;
                /*create a DIV element that will contain the items (values):*/
                a = document.createElement("DIV");
                a.setAttribute("id", this.id + "autocomplete-list");
                a.setAttribute("class", "autocomplete-items");
                /*append the DIV element as a child of the autocomplete container:*/
                this.parentNode.appendChild(a);
                /*for each item in the array...*/
                for (i = 0; i < arr.length; i++) {
                    /*check if the item starts with the same letters as the text field value:*/
                    if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                        /*create a DIV element for each matching element:*/
                        b = document.createElement("DIV");
                        /*make the matching letters bold:*/
                        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                        b.innerHTML += arr[i].substr(val.length);
                        /*insert a input field that will hold the current array item's value:*/
                        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                        /*execute a function when someone clicks on the item value (DIV element):*/
                        b.addEventListener("click", function(e) {
                            /*insert the value for the autocomplete text field:*/
                            inp.value = this.getElementsByTagName("input")[0].value;
                            /*close the list of autocompleted values,
                            (or any other open lists of autocompleted values:*/
                            closeAllLists();
                        });
                        a.appendChild(b);
                    }
                }
            });
            /*execute a function presses a key on the keyboard:*/
            inp.addEventListener("keydown", function(e) {
                var x = document.getElementById(this.id + "autocomplete-list");
                if (x) x = x.getElementsByTagName("div");
                if (e.keyCode == 40) {
                    /*If the arrow DOWN key is pressed,
                    increase the currentFocus variable:*/
                    currentFocus++;
                    /*and and make the current item more visible:*/
                    addActive(x);
                } else if (e.keyCode == 38) { //up
                    /*If the arrow UP key is pressed,
                    decrease the currentFocus variable:*/
                    currentFocus--;
                    /*and and make the current item more visible:*/
                    addActive(x);
                } else if (e.keyCode == 13) {
                    /*If the ENTER key is pressed, prevent the form from being submitted,*/
                    e.preventDefault();
                    if (currentFocus > -1) {
                        /*and simulate a click on the "active" item:*/
                        if (x) x[currentFocus].click();
                    }
                }
            });

            function addActive(x) {
                /*a function to classify an item as "active":*/
                if (!x) return false;
                /*start by removing the "active" class on all items:*/
                removeActive(x);
                if (currentFocus >= x.length) currentFocus = 0;
                if (currentFocus < 0) currentFocus = (x.length - 1);
                /*add class "autocomplete-active":*/
                x[currentFocus].classList.add("autocomplete-active");
            }

            function removeActive(x) {
                /*a function to remove the "active" class from all autocomplete items:*/
                for (var i = 0; i < x.length; i++) {
                    x[i].classList.remove("autocomplete-active");
                }
            }

            function closeAllLists(elmnt) {
                /*close all autocomplete lists in the document,
                except the one passed as an argument:*/
                var x = document.getElementsByClassName("autocomplete-items");
                for (var i = 0; i < x.length; i++) {
                    if (elmnt != x[i] && elmnt != inp) {
                        x[i].parentNode.removeChild(x[i]);
                    }
                }
            }
            /*execute a function when someone clicks in the document:*/
            document.addEventListener("click", function(e) {
                closeAllLists(e.target);
            });
        }

        /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
        autocomplete(document.getElementById("selectstate"), statedata1);
        autocomplete(document.getElementById("selectcounty"), countydata1);

        autocomplete(document.getElementById("selectstate1"), statedata1);
        autocomplete(document.getElementById("selectcounty1"), countydata1);

        autocomplete(document.getElementById("selectstate2"), statedata1);
        autocomplete(document.getElementById("selectcounty2"), countydata1);

        autocomplete(document.getElementById("selectstate3"), statedata1);
        autocomplete(document.getElementById("selectcounty3"), countydata1);

        autocomplete(document.getElementById("selectstate4"), statedata1);
        autocomplete(document.getElementById("selectcounty4"), countydata1);
    
        
        let newdata = data.filter(function(d) { return d.state == "Ohio" && d.county == "Hamilton" });
        let newdata1 = data.filter(function(d) { return d.state == "Ohio" && d.county == "Hamilton" && d.year == 2021 });
        
        //console.log(newdata);
        // Initialize and render chart

        lineChart = new LineChart({ parentElement: '#chart' }, newdata);
        lineChart.updateVis();

        lineChart1 = new LineChart1({ parentElement: '#chart1' }, newdata);
        lineChart1.updateVis();

        lineChart2 = new LineChart2({ parentElement: '#chart2' }, newdata);        
        lineChart2.updateVis();        

        barChart = new showbarchart({ parentElement: '#barchart'}, newdata1);
        barChart.updateVis();

        linebar = new LineBar({ parentElement: '#barchart2'}, newdata1);
        linebar.updateVis();
    })
    .catch(error => console.error(error));


/**
 * Input field event listener
 */


d3.select('#selectcounty').on('click', function() {
    // Get selected year
    // const minYear = parseInt(d3.select(this).property('value'));
    // Filter dataset accordingly
    const state1 = (d3.select("#selectstate").property('value'));
    //console.log(state1);
    const county1 = (d3.select("#selectcounty").property('value'));
    //console.log(county1);

    // Filter dataset accordingly
    let filteredData = data.filter(function(d) { 

        if( d3.set(d.county).has(county1) && d3.set(d.state).has(state) == true)
        {   
            return d.state == state1 && d.county == county1;
        } 

        
    });
    
    //console.log(filteredData);
    // Update chart
    lineChart.data = filteredData;
    lineChart.updateVis();

});

d3.select('#selectcounty1').on('click', function() {
    // Get selected year
    // const minYear = parseInt(d3.select(this).property('value'));
    // Filter dataset accordingly
    const state1 = (d3.select("#selectstate1").property('value'));
    //console.log(state1);
    const county1 = (d3.select("#selectcounty1").property('value'));
    //console.log(county1);

    // Filter dataset accordingly
    let filteredData = data.filter(function(d) { return d.state == state1 && d.county == county1 });
    //console.log(filteredData);
    // Update chart
    lineChart1.data = filteredData;
    lineChart1.updateVis();

});

d3.select('#selectcounty2').on('click', function() {
    // Get selected year
    // const minYear = parseInt(d3.select(this).property('value'));
    // Filter dataset accordingly
    const state1 = (d3.select("#selectstate2").property('value'));
    //console.log(state1);
    const county1 = (d3.select("#selectcounty2").property('value'));
    //console.log(county1);

    // Filter dataset accordingly
    let filteredData = data.filter(function(d) { return d.state == state1 && d.county == county1 });
    //console.log(filteredData);
    // Update chart
    lineChart2.data = filteredData;
    lineChart2.updateVis();

});

d3.select('#selectcounty3').on('click', function() {
    // Get selected year
    // const minYear = parseInt(d3.select(this).property('value'));
    // Filter dataset accordingly
    const state1 = (d3.select("#selectstate3").property('value'));
    //console.log(state1);
    const county1 = (d3.select("#selectcounty3").property('value'));
    //console.log(county1);

    // Filter dataset accordingly
    let filteredData = data.filter(function(d) { return d.state == state1 && d.county == county1 });
    //console.log(filteredData);
    // Update chart
    barChart.data = filteredData;
    barChart.updateVis();

});

d3.select('#selectcounty4').on('click', function() {
    // Get selected year
    // const minYear = parseInt(d3.select(this).property('value'));
    // Filter dataset accordingly
    const state1 = (d3.select("#selectstate4").property('value'));
    //console.log(state1);
    const county1 = (d3.select("#selectcounty4").property('value'));
    //console.log(county1);

    // Filter dataset accordingly
    let filteredData = data.filter(function(d) { return d.state == state1 && d.county == county1 });
    //console.log(filteredData);
    // Update chart
    linebar.data = filteredData;
    linebar.updateVis();

});

// d3.select('#selectcounty2').on('click', function() {
//     // Get selected year
//     // const minYear = parseInt(d3.select(this).property('value'));
//     // Filter dataset accordingly
//     const state1 = (d3.select("#selectstate2").property('value'));
//     //console.log(state1);
//     const county1 = (d3.select("#selectcounty2").property('value'));
//     //console.log(county1);

//     // Filter dataset accordingly
//     let filteredData = data.filter(function(d) { return d.state == state2 && d.county == county2 });
//     //console.log(filteredData);
//     // Update chart
//     lineChart1.data = filteredData;
//     lineChart1.updateVis();

// });



d3.select('#display-type-selection').on('change', function() {
    const state1 = (d3.select("#selectstate").property('value'));
    //console.log(state1);
    const county1 = (d3.select("#selectcounty").property('value'));
    //console.log(county1);

    // Filter dataset accordingly
    let filteredData = data.filter(function(d) { return d.state == state1 && d.county == county1 });
    //console.log(filteredData);
    // Update chart
    lineChart.config.displayType = d3.select(this).property('value');
    //console.log(lineChart.config.displayType)
    lineChart.data = filteredData;
    lineChart.updateVis();

});

d3.select('#display-type-selection1').on('change', function() {
    const state1 = (d3.select("#selectstate1").property('value'));
    //console.log(state1);
    const county1 = (d3.select("#selectcounty1").property('value'));
    //console.log(county1);

    // const state2 = (d3.select("#selectstate2").property('value'));
    // //console.log(state1);
    // const county2 = (d3.select("#selectcounty2").property('value'));
    // //console.log(county1);

    // Filter dataset accordingly
    let filteredData = data.filter(function(d) { return d.state == state1 && d.county == county1 });
    //let filteredData = data.filter(function(d) { return d.state == state2 && d.county == county2 });
    //console.log(filteredData);
    // Update chart
    lineChart1.config.displayType = d3.select(this).property('value');
    //console.log(lineChart.config.displayType)
    lineChart1.data = filteredData;
    lineChart1.updateVis();

});

d3.select('#display-type-selection2').on('change', function() {
    const state1 = (d3.select("#selectstate2").property('value'));
    //console.log(state1);
    const county1 = (d3.select("#selectcounty2").property('value'));
    //console.log(county1);

    // const state2 = (d3.select("#selectstate2").property('value'));
    // //console.log(state1);
    // const county2 = (d3.select("#selectcounty2").property('value'));
    // //console.log(county1);

    // Filter dataset accordingly
    let filteredData = data.filter(function(d) { return d.state == state1 && d.county == county1 });
    //let filteredData = data.filter(function(d) { return d.state == state2 && d.county == county2 });
    //console.log(filteredData);
    // Update chart
    lineChart2.config.displayType = d3.select(this).property('value');
    //console.log(lineChart.config.displayType)
    lineChart2.data = filteredData;
    lineChart2.updateVis();

});

d3.select('#display-type-selection3').on('change', function() {
    const state1 = (d3.select("#selectstate3").property('value'));
    //console.log(state1);
    const county1 = (d3.select("#selectcounty3").property('value'));
    //console.log(county1);

    // const state2 = (d3.select("#selectstate2").property('value'));
    // //console.log(state1);
    // const county2 = (d3.select("#selectcounty2").property('value'));
    // //console.log(county1);

    // Filter dataset accordingly
    let filteredData = data.filter(function(d) { return d.state == state1 && d.county == county1 });
    //let filteredData = data.filter(function(d) { return d.state == state2 && d.county == county2 });
    //console.log(filteredData);
    // Update chart
    barChart.config.displayType = d3.select(this).property('value');
    //console.log(lineChart.config.displayType)
    barChart.data = filteredData;
    barChart.updateVis();

});

d3.select('#display-type-selection4').on('change', function() {
    const state1 = (d3.select("#selectstate4").property('value'));
    //console.log(state1);
    const county1 = (d3.select("#selectcounty4").property('value'));
    //console.log(county1);

    // const state2 = (d3.select("#selectstate2").property('value'));
    // //console.log(state1);
    // const county2 = (d3.select("#selectcounty2").property('value'));
    // //console.log(county1);

    // Filter dataset accordingly
    let filteredData = data.filter(function(d) { return d.state == state1 && d.county == county1 });
    //let filteredData = data.filter(function(d) { return d.state == state2 && d.county == county2 });
    //console.log(filteredData);
    // Update chart
    linebar.config.displayType = d3.select(this).property('value');
    //console.log(lineChart.config.displayType)
    linebar.data = filteredData;
    linebar.updateVis();

});