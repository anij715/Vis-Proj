// We use d3.timeParse() to convert a string into JS date object
// Initialize helper function
const parseTime = d3.timeParse("%Y-%m-%d");

let data, lineChart, lineChart2, lineChart1, barChart1;
let lineChartRight;

/**
 * Load data from CSV file asynchronously and render line chart
 */
d3.csv('data/OfficeEpisodeTranscripts1.csv')
    .then(_data => {
        _data.forEach(d => {
            d.Season = +d.Season;
        });

        data = _data;
        let count_wd = 0;
        //filter the character
        let newdata = data.filter(function(d) { return (d.Character == "Michael") });

        //let newdata1 = newdata.filter(function(d) { return (d.Season == 1) }); //filter episode
        //let newdata2 = newdata1.filter(function(d) { return (d.Episode == 1) }); //filter episodes

        // To find the unique seasons
        let unique = newdata.map(function(d) { return d.Season });
        let unique1 = unique.filter(function(elem, pos) { return unique.indexOf(elem) == pos; });

        //to get all the unique episodes
        let newdata1 = data.filter(function(d) { return (d.Character == "Michael" && d.Season == 1) });
        let uniqueep1 = newdata1.map(function(d) { return d.Episode });
        let uep1 = uniqueep1.filter(function(elem, pos) { return uniqueep1.indexOf(elem) == pos; });

        let newdata2 = data.filter(function(d) { return (d.Character == "Michael" && d.Season == 2) });
        let uniqueep2 = newdata2.map(function(d) { return d.Episode });
        let uep2 = uniqueep2.filter(function(elem, pos) { return uniqueep2.indexOf(elem) == pos; });

        let newdata3 = data.filter(function(d) { return (d.Character == "Michael" && d.Season == 3) });
        let uniqueep3 = newdata3.map(function(d) { return d.Episode });
        let uep3 = uniqueep3.filter(function(elem, pos) { return uniqueep3.indexOf(elem) == pos; });

        let newdata4 = data.filter(function(d) { return (d.Character == "Michael" && d.Season == 4) });
        let uniqueep4 = newdata4.map(function(d) { return d.Episode });
        let uep4 = uniqueep4.filter(function(elem, pos) { return uniqueep4.indexOf(elem) == pos; });

        let newdata5 = data.filter(function(d) { return (d.Character == "Michael" && d.Season == 5) });
        let uniqueep5 = newdata5.map(function(d) { return d.Episode });
        let uep5 = uniqueep5.filter(function(elem, pos) { return uniqueep5.indexOf(elem) == pos; });

        let newdata6 = data.filter(function(d) { return (d.Character == "Michael" && d.Season == 6) });
        let uniqueep6 = newdata6.map(function(d) { return d.Episode });
        let uep6 = uniqueep6.filter(function(elem, pos) { return uniqueep6.indexOf(elem) == pos; });

        let newdata7 = data.filter(function(d) { return (d.Character == "Michael" && d.Season == 7) });
        let uniqueep7 = newdata7.map(function(d) { return d.Episode });
        let uep7 = uniqueep7.filter(function(elem, pos) { return uniqueep7.indexOf(elem) == pos; });

        let newdata8 = data.filter(function(d) { return (d.Character == "Michael" && d.Season == 8) });
        let uniqueep8 = newdata8.map(function(d) { return d.Episode });
        let uep8 = uniqueep8.filter(function(elem, pos) { return uniqueep8.indexOf(elem) == pos; });

        let newdata9 = data.filter(function(d) { return (d.Character == "Michael" && d.Season == 9) });
        let uniqueep9 = newdata9.map(function(d) { return d.Episode });
        let uep9 = uniqueep9.filter(function(elem, pos) { return uniqueep9.indexOf(elem) == pos; });

        let uepdata = [uep1, uep2, uep3, uep4, uep5, uep6, uep7, uep8, uep9];

        let size = uep1.length;

        let count_ep1 = uep1.length;
        let count_ep2 = uep2.length;
        let count_ep3 = uep3.length;
        let count_ep4 = uep4.length;
        let count_ep5 = uep5.length;
        let count_ep6 = uep6.length;
        let count_ep7 = uep7.length;
        let count_ep8 = uep8.length;
        let count_ep9 = uep9.length;

        let count_wd1 = 0;
        let count_wd2 = 0;
        let count_wd3 = 0;
        let count_wd4 = 0;
        let count_wd5 = 0;
        let count_wd6 = 0;
        let count_wd7 = 0;
        let count_wd8 = 0;
        let count_wd9 = 0;

        //to get all the words spoken
        let wdcount = newdata.filter(function(d) {
            if (d.Season == 1) {
                count_wd1 = count_wd1 + d.Dialouge.split(' ').length;
            } else if (d.Season == 2) {
                count_wd2 = count_wd2 + d.Dialouge.split(' ').length;
            } else if (d.Season == 3) {
                count_wd3 = count_wd3 + d.Dialouge.split(' ').length;
            } else if (d.Season == 4) {
                count_wd4 = count_wd4 + d.Dialouge.split(' ').length;
            } else if (d.Season == 5) {
                count_wd5 = count_wd5 + d.Dialouge.split(' ').length;
            } else if (d.Season == 6) {
                count_wd6 = count_wd6 + d.Dialouge.split(' ').length;
            } else if (d.Season == 7) {
                count_wd7 = count_wd7 + d.Dialouge.split(' ').length;
            } else if (d.Season == 8) {
                count_wd8 = count_wd8 + d.Dialouge.split(' ').length;
            } else if (d.Season == 9) {
                count_wd9 = count_wd9 + d.Dialouge.split(' ').length;
            }
            //return (d.Season == 1);
        });

        let max = Math.max(count_wd1, count_wd2, count_wd3, count_wd4, count_wd5, count_wd6, count_wd7, count_wd8, count_wd9);
        console.log("Max words Spoken: ", max);

        let sum = count_wd1 + count_wd2 + count_wd3 + count_wd4 + count_wd5 + count_wd6 + count_wd7 + count_wd8 + count_wd9;
        console.log("Sum of all words Spoken: ", sum);

        let ydata = [count_wd1, count_wd2, count_wd3,
            count_wd4, count_wd5, count_wd6, count_wd7,
            count_wd8, count_wd9
        ];

        let arrData1 = [
            [1, count_wd1],
            [2, count_wd2],
            [3, count_wd3],
            [4, count_wd4],
            [5, count_wd5],
            [6, count_wd6],
            [7, count_wd7],
            [8, count_wd8],
            [9, count_wd9]
        ];

        let arrData2 = [
            [1, count_ep1],
            [2, count_ep2],
            [3, count_ep3],
            [4, count_ep4],
            [5, count_ep5],
            [6, count_ep6],
            [7, count_ep7],
            [8, count_ep8],
            [9, count_ep9]
        ];

        var data1 = arrData1.map(function(d) {
            return {
                season: d[0],
                words: d[1]
            };
        });

        var data2 = arrData2.map(function(d) {
            return {
                season: d[0],
                episodes: d[1]
            };
        });


        function tableCreate() {
            const body = document.body,
                tbl = document.createElement('table');
            tbl.id = 'table';
            tbl.style.width = '100px';
            tbl.style.border = '1px solid black';

            for (let i = 1; i <= 9; i++) {
                const tr = tbl.insertRow();
                const td = tr.insertCell();
                td.appendChild(document.createTextNode(`Michael, Season: ${i}, Words: ${ydata[i-1]}, Episodes: ${uepdata[i-1]} `));
                td.style.border = '1px solid black';
            }
            body.appendChild(tbl);
        }

        tableCreate();

        lineChart = new LineChart({ parentElement: '#linechart' }, data1);
        lineChart.updateVis();

        lineChart1 = new LineChart1({ parentElement: '#linechart1' }, data2);
        lineChart1.updateVis();


        const season = (d3.select("#season-selection").property('value'));
        let filteredDataSeason = data.filter(function(d) { return (d.Season == season) });

        let [count1, count2, count3, count4, count5, count6, count7, count8, count9, count10, count11, count12, count13, count14, count15, count16, count17, count18, count19, count20, count21, count22, count23, count24, count25, count26, count27, count28, count29, count30, count31, count32, count33, count34, count35, count36, count37, count38, count39, count40] = Array(40).fill(0);

        //to get all the words spoken per each character
        let wdcountCharSeason = filteredDataSeason.filter(function(d) {
            if (d.Character == 'Michael') {
                count1 = count1 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Dwight') {
                count2 = count2 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Pam') {
                count3 = count3 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Jim') {
                count4 = count4 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Andy') {
                count5 = count5 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Jan') {
                count6 = count6 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Erin') {
                count7 = count7 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Angela') {
                count8 = count8 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Toby') {
                count9 = count9 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Cathy') {
                count10 = count10 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Ryan') {
                count11 = count11 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Holly') {
                count12 = count12 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'David') {
                count13 = count13 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Stanley') {
                count14 = count14 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Robert') {
                count15 = count15 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Kelly') {
                count16 = count16 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Gabe') {
                count17 = count17 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Karen') {
                count18 = count18 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Meredith') {
                count19 = count19 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Darryl') {
                count20 = count20 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Nellie') {
                count21 = count21 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Mose') {
                count22 = count22 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Roy') {
                count23 = count23 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Deangelo') {
                count24 = count24 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Charles') {
                count25 = count25 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Oscar') {
                count26 = count26 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Pete') {
                count27 = count27 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Nate') {
                count28 = count28 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Phyllis') {
                count29 = count29 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Jo') {
                count30 = count30 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Josh') {
                count31 = count31 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Clark') {
                count32 = count32 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Todd Packer') {
                count33 = count33 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Hank') {
                count34 = count34 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Creed') {
                count35 = count35 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Sam') {
                count36 = count36 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Tony') {
                count37 = count37 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Brian') {
                count38 = count38 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Katy') {
                count39 = count39 + d.Dialouge.split(' ').length;
            } else if (d.Character == 'Kevin') {
                count40 = count40 + d.Dialouge.split(' ').length;
            }
        });

        let characterWdCount = [
            ["Michael", count1],
            ["Dwight", count2],
            ["Pam", count3],
            ["Jim", count4],
            ["Andy", count5],
            ["Jan", count6],
            ["Erin", count7],
            ["Angela", count8],
            ["Toby", count9],
            ["Cathy", count10],
            ["Ryan", count11],
            ["Holly", count12],
            ["David", count13],
            ["Stanley", count14],
            ["Robert", count15],
            ["Kelly", count16],
            ["Gabe", count17],
            ["Karen", count18],
            ["Meredith", count19],
            ["Darryl", count20],
            ["Nellie", count21],
            ["Mose", count22],
            ["Roy", count23],
            ["Deangelo", count24],
            ["Charles", count25],
            ["Oscar", count26],
            ["Pete", count27],
            ["Nate", count28],
            ["Phyllis", count29],
            ["Jo", count30],
            ["Josh", count31],
            ["Clark", count32],
            ["Todd Packer", count33],
            ["Hank", count34],
            ["Creed", count35],
            ["Sam", count36],
            ["Tony", count37],
            ["Brian", count38],
            ["Katy", count39],
            ["Kevin", count40]
        ];

        console.log("Character Word Count", characterWdCount);

        var dCw = characterWdCount.map(function(d) {
            return {
                character: d[0],
                words: d[1]
            };
        });


        barChart1 = new BarChart({ 'parentElement': '#barchart' }, dCw);
        barChart1.updateVis();



        ////////////////////// CLOUD ///////////////////////
        const margin = {
            top: 30,
            right: 50,
            bottom: 30,
            left: 50
        };
        const width = 960 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const g = d3.select("#cloud")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //d3.csv('data/OfficeEpisodeTranscripts1.csv').then(data => {
        d3.csv('data/data.csv').then(data => {


            // let arrData3 = [
            //     ["A"],
            //     ["Random"],
            //     ["List"],
            //     ["Of"],
            //     ["words"],
            //     ["A"],
            //     ["Random"],
            //     ["List"],
            //     ["Of"],
            //     ["words"],
            //     ["A"],
            //     ["Random"],
            //     ["List"],
            //     ["Of"],
            //     ["words"]
            // ];

            // var data3 = arrData3.map(function(d) {
            //     return {
            //         words1: d[0]
            //     };
            // });

            var data3 = data.filter(function(d) { return (d.Character == "Michael" && d.Season == 1) });

            const color = d3.scaleOrdinal(d3.schemeCategory10);
            const categories = d3.keys(
                d3.nest()
                .key(d => d.State)
                .map(data3)
            );
            console.log(data3);
            const fontSize = d3.scalePow()
                .exponent(5)
                .domain([0, 1])
                .range([40, 80]);

            const draw = words => {

                wordcloud.selectAll("text")
                    .data(words)
                    .enter().append("text")
                    .attr('class', 'word')
                    .style("fill", (d, i) => color(i))
                    .style("font-size", d => d.size + "px")
                    .style("font-family", d => d.font)
                    .attr("text-anchor", "middle")
                    .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
                    .text(d => d.text);
            };

            const layout = d3.layout.cloud()
                .size([width, height])
                .timeInterval(20)
                .words(data3)
                .rotate(d => (Math.random() * 2) * 90)
                .fontSize((d, i) => fontSize(Math.random()))
                .fontWeight(["bold"])
                .text(d => d.word) /////////////////
                //.text(d => d.Dialouge)
                .spiral("archimedean") // "archimedean" or "rectangular"
                .on("end", draw)
                .start();

            const wordcloud = g.append("g")
                .attr('class', 'wordcloud')
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            g.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .selectAll('text')
                .style('font-size', '20px')
                .style('fill', d => color(d))
                .style('font-family', 'sans-serif');
        });


    })
    .catch(error => console.error(error));
/**
 * Input field event listener
 */


d3.select('#character-selection').on('change', function() {
    console.log("something");
    const character = (d3.select("#character-selection").property('value'));

    // Filter dataset accordingly
    let filteredData = data.filter(function(d) { return (d.Character == character) });

    //to get all the unique episodes
    let newdata1 = data.filter(function(d) { return (d.Character == character && d.Season == 1) });
    let uniqueep1 = newdata1.map(function(d) { return d.Episode });
    let uep1 = uniqueep1.filter(function(elem, pos) { return uniqueep1.indexOf(elem) == pos; });

    let newdata2 = data.filter(function(d) { return (d.Character == character && d.Season == 2) });
    let uniqueep2 = newdata2.map(function(d) { return d.Episode });
    let uep2 = uniqueep2.filter(function(elem, pos) { return uniqueep2.indexOf(elem) == pos; });

    let newdata3 = data.filter(function(d) { return (d.Character == character && d.Season == 3) });
    let uniqueep3 = newdata3.map(function(d) { return d.Episode });
    let uep3 = uniqueep3.filter(function(elem, pos) { return uniqueep3.indexOf(elem) == pos; });

    let newdata4 = data.filter(function(d) { return (d.Character == character && d.Season == 4) });
    let uniqueep4 = newdata4.map(function(d) { return d.Episode });
    let uep4 = uniqueep4.filter(function(elem, pos) { return uniqueep4.indexOf(elem) == pos; });

    let newdata5 = data.filter(function(d) { return (d.Character == character && d.Season == 5) });
    let uniqueep5 = newdata5.map(function(d) { return d.Episode });
    let uep5 = uniqueep5.filter(function(elem, pos) { return uniqueep5.indexOf(elem) == pos; });

    let newdata6 = data.filter(function(d) { return (d.Character == character && d.Season == 6) });
    let uniqueep6 = newdata6.map(function(d) { return d.Episode });
    let uep6 = uniqueep6.filter(function(elem, pos) { return uniqueep6.indexOf(elem) == pos; });

    let newdata7 = data.filter(function(d) { return (d.Character == character && d.Season == 7) });
    let uniqueep7 = newdata7.map(function(d) { return d.Episode });
    let uep7 = uniqueep7.filter(function(elem, pos) { return uniqueep7.indexOf(elem) == pos; });

    let newdata8 = data.filter(function(d) { return (d.Character == character && d.Season == 8) });
    let uniqueep8 = newdata8.map(function(d) { return d.Episode });
    let uep8 = uniqueep8.filter(function(elem, pos) { return uniqueep8.indexOf(elem) == pos; });

    let newdata9 = data.filter(function(d) { return (d.Character == character && d.Season == 9) });
    let uniqueep9 = newdata9.map(function(d) { return d.Episode });
    let uep9 = uniqueep9.filter(function(elem, pos) { return uniqueep9.indexOf(elem) == pos; });

    let uepdata = [uep1, uep2, uep3, uep4, uep5, uep6, uep7, uep8, uep9];


    let size = uep1.length;

    let count_wd1 = 0;
    let count_wd2 = 0;
    let count_wd3 = 0;
    let count_wd4 = 0;
    let count_wd5 = 0;
    let count_wd6 = 0;
    let count_wd7 = 0;
    let count_wd8 = 0;
    let count_wd9 = 0;

    //to get all the words spoken
    let wdcount = filteredData.filter(function(d) {
        if (d.Season == 1) {
            count_wd1 = count_wd1 + d.Dialouge.split(' ').length;
        } else if (d.Season == 2) {
            count_wd2 = count_wd2 + d.Dialouge.split(' ').length;
        } else if (d.Season == 3) {
            count_wd3 = count_wd3 + d.Dialouge.split(' ').length;
        } else if (d.Season == 4) {
            count_wd4 = count_wd4 + d.Dialouge.split(' ').length;
        } else if (d.Season == 5) {
            count_wd5 = count_wd5 + d.Dialouge.split(' ').length;
        } else if (d.Season == 6) {
            count_wd6 = count_wd6 + d.Dialouge.split(' ').length;
        } else if (d.Season == 7) {
            count_wd7 = count_wd7 + d.Dialouge.split(' ').length;
        } else if (d.Season == 8) {
            count_wd8 = count_wd8 + d.Dialouge.split(' ').length;
        } else if (d.Season == 9) {
            count_wd9 = count_wd9 + d.Dialouge.split(' ').length;
        }
        //return (d.Season == 1);
    });

    let max = Math.max(count_wd1, count_wd2, count_wd3, count_wd4, count_wd5, count_wd6, count_wd7, count_wd8, count_wd9);
    console.log(max);

    let ydata = [count_wd1, count_wd2, count_wd3,
        count_wd4, count_wd5, count_wd6, count_wd7,
        count_wd8, count_wd9
    ];

    let arrData = [
        [1, count_wd1],
        [2, count_wd2],
        [3, count_wd3],
        [4, count_wd4],
        [5, count_wd5],
        [6, count_wd6],
        [7, count_wd7],
        [8, count_wd8],
        [9, count_wd9]
    ];

    var data1 = arrData.map(function(d) {
        return {
            season: d[0],
            words: d[1]
        };
    });

    var element = document.getElementById("table");
    element.remove();

    function tableCreate() {
        const body = document.body,
            tbl = document.createElement('table');
        tbl.id = 'table';
        tbl.style.width = '100px';
        tbl.style.border = '1px solid black';

        for (let i = 1; i <= 9; i++) {
            const tr = tbl.insertRow();
            const td = tr.insertCell();
            td.appendChild(document.createTextNode(`${character}, Season: ${i}, Words: ${ydata[i-1]}, Episodes: ${uepdata[i-1]} `));
            td.style.border = '1px solid black';
        }
        body.appendChild(tbl);
    }

    tableCreate();

    lineChart.config.displayType = d3.select(this).property('value');
    //console.log(lineChart.config.displayType)
    lineChart.data = data1;
    lineChart.updateVis();

});

d3.select('#character-selection1').on('change', function() {
    const character = (d3.select("#character-selection1").property('value'));
    console.log(character);
    // Filter dataset accordingly
    let filteredData = data.filter(function(d) { return (d.Character == character) });

    //to get all the unique episodes
    let newdata1 = data.filter(function(d) { return (d.Character == character && d.Season == 1) });
    let uniqueep1 = newdata1.map(function(d) { return d.Episode });
    let uep1 = uniqueep1.filter(function(elem, pos) { return uniqueep1.indexOf(elem) == pos; });

    let newdata2 = data.filter(function(d) { return (d.Character == character && d.Season == 2) });
    let uniqueep2 = newdata2.map(function(d) { return d.Episode });
    let uep2 = uniqueep2.filter(function(elem, pos) { return uniqueep2.indexOf(elem) == pos; });

    let newdata3 = data.filter(function(d) { return (d.Character == character && d.Season == 3) });
    let uniqueep3 = newdata3.map(function(d) { return d.Episode });
    let uep3 = uniqueep3.filter(function(elem, pos) { return uniqueep3.indexOf(elem) == pos; });

    let newdata4 = data.filter(function(d) { return (d.Character == character && d.Season == 4) });
    let uniqueep4 = newdata4.map(function(d) { return d.Episode });
    let uep4 = uniqueep4.filter(function(elem, pos) { return uniqueep4.indexOf(elem) == pos; });

    let newdata5 = data.filter(function(d) { return (d.Character == character && d.Season == 5) });
    let uniqueep5 = newdata5.map(function(d) { return d.Episode });
    let uep5 = uniqueep5.filter(function(elem, pos) { return uniqueep5.indexOf(elem) == pos; });

    let newdata6 = data.filter(function(d) { return (d.Character == character && d.Season == 6) });
    let uniqueep6 = newdata6.map(function(d) { return d.Episode });
    let uep6 = uniqueep6.filter(function(elem, pos) { return uniqueep6.indexOf(elem) == pos; });

    let newdata7 = data.filter(function(d) { return (d.Character == character && d.Season == 7) });
    let uniqueep7 = newdata7.map(function(d) { return d.Episode });
    let uep7 = uniqueep7.filter(function(elem, pos) { return uniqueep7.indexOf(elem) == pos; });

    let newdata8 = data.filter(function(d) { return (d.Character == character && d.Season == 8) });
    let uniqueep8 = newdata8.map(function(d) { return d.Episode });
    let uep8 = uniqueep8.filter(function(elem, pos) { return uniqueep8.indexOf(elem) == pos; });

    let newdata9 = data.filter(function(d) { return (d.Character == character && d.Season == 9) });
    let uniqueep9 = newdata9.map(function(d) { return d.Episode });
    let uep9 = uniqueep9.filter(function(elem, pos) { return uniqueep9.indexOf(elem) == pos; });

    let uepdata = [uep1, uep2, uep3, uep4, uep5, uep6, uep7, uep8, uep9];

    let count_ep1 = uep1.length;
    let count_ep2 = uep2.length;
    let count_ep3 = uep3.length;
    let count_ep4 = uep4.length;
    let count_ep5 = uep5.length;
    let count_ep6 = uep6.length;
    let count_ep7 = uep7.length;
    let count_ep8 = uep8.length;
    let count_ep9 = uep9.length;

    let arrData2 = [
        [1, count_ep1],
        [2, count_ep2],
        [3, count_ep3],
        [4, count_ep4],
        [5, count_ep5],
        [6, count_ep6],
        [7, count_ep7],
        [8, count_ep8],
        [9, count_ep9]
    ];


    var data2 = arrData2.map(function(d) {
        return {
            season: d[0],
            episodes: d[1]
        };
    });


    lineChart1.config.displayType = d3.select(this).property('value');
    //console.log(lineChart.config.displayType)
    lineChart1.data = data2;
    lineChart1.updateVis();

});

d3.select('#character-selection-cloud').on('change', function() {
    console.log("something");

    const character = (d3.select("#character-selection-cloud").property('value'));
    const season = (d3.select("#season-selection-cloud").property('value'));
    window.open("https://www.google.com/search?q=" + character + "The Office");
    const margin = {
        top: 30,
        right: 50,
        bottom: 30,
        left: 50
    };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    var element = document.getElementById("cloud");
    element.remove();

    d3.select("h8").append("svg")
        .attr("id", "cloud")
        .attr("width", 960)
        .attr("height", 500)

    const g = d3.select("#cloud")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //d3.csv('data/OfficeEpisodeTranscripts1.csv').then(data => {
    d3.csv('data/data.csv').then(data => {


        // let arrData3 = [
        //     ["different"],
        //     ["1"],
        //     ["3"],
        //     ["Of"],
        //     ["asd"],
        //     ["A"],
        //     ["zxcghgfd"],
        //     ["xfghdfghj"],
        //     ["Of"],
        //     ["jhykghjk,"],
        //     ["A"],
        //     ["sdfgs"],
        //     ["List"],
        //     ["Of"],
        //     ["dsfgdsfg"]
        // ];

        // var data3 = arrData3.map(function(d) {
        //     return {
        //         words1: d[0]
        //     };
        // });

        var data3 = data.filter(function(d) { return (d.Character == character && d.Season == season) });
        const color = d3.scaleOrdinal(d3.schemeCategory10);
        const categories = d3.keys(
            d3.nest()
            .key(d => d.State)
            .map(data3)
        );
        console.log(data3);
        const fontSize = d3.scalePow()
            .exponent(5)
            .domain([0, 1])
            .range([40, 80]);

        const draw = words => {
            wordcloud.selectAll("text")
                .data(words)
                .enter().append("text")
                .attr('class', 'word')
                .style("fill", (d, i) => color(i))
                .style("font-size", d => d.size + "px")
                .style("font-family", d => d.font)
                .attr("text-anchor", "middle")
                .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
                .text(d => d.text);
        };

        const layout = d3.layout.cloud()
            .size([width, height])
            .timeInterval(20)
            .words(data3)
            .rotate(d => (Math.random() * 2) * 90)
            .fontSize((d, i) => fontSize(Math.random()))
            .fontWeight(["bold"])
            .text(d => d.word)
            //.text(d => d.Dialouge)
            .spiral("archimedean") // "archimedean" or "rectangular"
            .on("end", draw)
            .start();

        const wordcloud = g.append("g")
            .attr('class', 'wordcloud')
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .selectAll('text')
            .style('font-size', '20px')
            .style('fill', d => color(d))
            .style('font-family', 'sans-serif');
    });


});

d3.select('#season-selection-cloud').on('change', function() {
    console.log("something");
    const character = (d3.select("#character-selection-cloud").property('value'));

    console.log("something");
    const season = (d3.select("#season-selection-cloud").property('value'));
    //window.open("https://www.google.com/search?q=" + character + "The Office");
    const margin = {
        top: 30,
        right: 50,
        bottom: 30,
        left: 50
    };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    var element = document.getElementById("cloud");
    element.remove();

    d3.select("h8").append("svg")
        .attr("id", "cloud")
        .attr("width", 960)
        .attr("height", 500)

    const g = d3.select("#cloud")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //d3.csv('data/OfficeEpisodeTranscripts1.csv').then(data => {
    d3.csv('data/data.csv').then(data => {


        // let arrData3 = [
        //     ["different"],
        //     ["1"],
        //     ["3"],
        //     ["Of"],
        //     ["asd"],
        //     ["A"],
        //     ["zxcghgfd"],
        //     ["xfghdfghj"],
        //     ["Of"],
        //     ["jhykghjk,"],
        //     ["A"],
        //     ["sdfgs"],
        //     ["List"],
        //     ["Of"],
        //     ["dsfgdsfg"]
        // ];

        // var data3 = arrData3.map(function(d) {
        //     return {
        //         words1: d[0]
        //     };
        // });

        var data3 = data.filter(function(d) { return (d.Character == character && d.Season == season) });
        const color = d3.scaleOrdinal(d3.schemeCategory10);
        const categories = d3.keys(
            d3.nest()
            .key(d => d.State)
            .map(data3)
        );
        console.log(data3);
        const fontSize = d3.scalePow()
            .exponent(5)
            .domain([0, 1])
            .range([40, 80]);

        const draw = words => {
            wordcloud.selectAll("text")
                .data(words)
                .enter().append("text")
                .attr('class', 'word')
                .style("fill", (d, i) => color(i))
                .style("font-size", d => d.size + "px")
                .style("font-family", d => d.font)
                .attr("text-anchor", "middle")
                .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
                .text(d => d.text);
        };

        const layout = d3.layout.cloud()
            .size([width, height])
            .timeInterval(20)
            .words(data3)
            .rotate(d => (Math.random() * 2) * 90)
            .fontSize((d, i) => fontSize(Math.random()))
            .fontWeight(["bold"])
            .text(d => d.word)
            //.text(d => d.Dialouge)
            .spiral("archimedean") // "archimedean" or "rectangular"
            .on("end", draw)
            .start();

        const wordcloud = g.append("g")
            .attr('class', 'wordcloud')
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .selectAll('text')
            .style('font-size', '20px')
            .style('fill', d => color(d))
            .style('font-family', 'sans-serif');
    });


});


d3.select('#season-selection').on('change', function() {
    console.log("update bar charts");

    var element = document.getElementById("barchart");
    element.remove();

    d3.select("h7").append("svg")
        .attr("id", "barchart")

    const season = (d3.select("#season-selection").property('value'));
    // Filter dataset accordingly
    let filteredDataSeason = data.filter(function(d) { return (d.Season == season) });

    let [count1, count2, count3, count4, count5, count6, count7, count8, count9, count10, count11, count12, count13, count14, count15, count16, count17, count18, count19, count20, count21, count22, count23, count24, count25, count26, count27, count28, count29, count30, count31, count32, count33, count34, count35, count36, count37, count38, count39, count40] = Array(40).fill(0);

    //to get all the words spoken per each character
    let wdcountCharSeason = filteredDataSeason.filter(function(d) {
        if (d.Character == 'Michael') {
            count1 = count1 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Dwight') {
            count2 = count2 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Pam') {
            count3 = count3 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Jim') {
            count4 = count4 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Andy') {
            count5 = count5 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Jan') {
            count6 = count6 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Erin') {
            count7 = count7 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Angela') {
            count8 = count8 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Toby') {
            count9 = count9 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Cathy') {
            count10 = count10 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Ryan') {
            count11 = count11 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Holly') {
            count12 = count12 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'David') {
            count13 = count13 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Stanley') {
            count14 = count14 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Robert') {
            count15 = count15 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Kelly') {
            count16 = count16 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Gabe') {
            count17 = count17 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Karen') {
            count18 = count18 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Meredith') {
            count19 = count19 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Darryl') {
            count20 = count20 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Nellie') {
            count21 = count21 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Mose') {
            count22 = count22 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Roy') {
            count23 = count23 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Deangelo') {
            count24 = count24 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Charles') {
            count25 = count25 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Oscar') {
            count26 = count26 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Pete') {
            count27 = count27 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Nate') {
            count28 = count28 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Phyllis') {
            count29 = count29 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Jo') {
            count30 = count30 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Josh') {
            count31 = count31 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Clark') {
            count32 = count32 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Todd Packer') {
            count33 = count33 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Hank') {
            count34 = count34 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Creed') {
            count35 = count35 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Sam') {
            count36 = count36 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Tony') {
            count37 = count37 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Brian') {
            count38 = count38 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Katy') {
            count39 = count39 + d.Dialouge.split(' ').length;
        } else if (d.Character == 'Kevin') {
            count40 = count40 + d.Dialouge.split(' ').length;
        }
    });

    let characterWdCount = [
        ["Michael", count1],
        ["Dwight", count2],
        ["Pam", count3],
        ["Jim", count4],
        ["Andy", count5],
        ["Jan", count6],
        ["Erin", count7],
        ["Angela", count8],
        ["Toby", count9],
        ["Cathy", count10],
        ["Ryan", count11],
        ["Holly", count12],
        ["David", count13],
        ["Stanley", count14],
        ["Robert", count15],
        ["Kelly", count16],
        ["Gabe", count17],
        ["Karen", count18],
        ["Meredith", count19],
        ["Darryl", count20],
        ["Nellie", count21],
        ["Mose", count22],
        ["Roy", count23],
        ["Deangelo", count24],
        ["Charles", count25],
        ["Oscar", count26],
        ["Pete", count27],
        ["Nate", count28],
        ["Phyllis", count29],
        ["Jo", count30],
        ["Josh", count31],
        ["Clark", count32],
        ["Todd Packer", count33],
        ["Hank", count34],
        ["Creed", count35],
        ["Sam", count36],
        ["Tony", count37],
        ["Brian", count38],
        ["Katy", count39],
        ["Kevin", count40]
    ];

    console.log("Character Word Count", characterWdCount);

    var dCw = characterWdCount.map(function(d) {
        return {
            character: d[0],
            words: d[1]
        };
    });

    barChart1.config.displayType = d3.select(this).property('value');
    //console.log(lineChart.config.displayType)
    barChart1 = new BarChart({ 'parentElement': '#barchart' }, dCw);
    barChart1.updateVis();

});