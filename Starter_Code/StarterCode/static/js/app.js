d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (data) {

    console.log(data);
    console.log(data.names);
    console.log(data.metadata[0]);
    console.log(data.samples[0].sample_values);

    comboboxLoad(data.names);

});

function comboboxLoad(ids) {
    sel = document.getElementById("selDataset");
    ids.forEach(function (id) {

        opt = document.createElement("option");
        opt.setAttribute("value", id);
        opt.innerText = id;
        sel.appendChild(opt);

    });


};

function optionChanged(id) {
    buildChart(id);

}

var dropdown = d3.select("#selDataset");

function buildChart(id) {

    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (data) {

        console.log(data);
        subject = data.names.filter(function(x){
           
            return x == id;

        })[0];
        
        metadata = data.metadata;
        sample = data.samples;
        var filterMetaData = metadata.filter(z=>z.id==id)
        var personsMetaData = filterMetaData[0]
        var htmlData = d3.select("#sample-metadata")
        for (person in personsMetaData){
                htmlData.append("h4").text(`${person} ${personsMetaData[person]}`)

        };
        
        var sampleFilterData = sample.filter(z=>z.id==id)
        var sampleData = sampleFilterData[0]
        var otu = sampleData.otu_ids
        var sampleValues = sampleData.sample_values
        var otuLabel = sampleData.otu_labels
        var trace = {
        x: sampleValues.slice(0,10),
        y: otu.slice(0,10),
        text: otuLabel,
        type: "bar",
        marker:{
            color: 'green'
        }
        
        };

        var layout = {
            title: "OTU Data",
            
            };
        Plotly.newPlot('bar',[trace], layout);




        var trace1 = {
            x: otu,
            y: sampleValues,
            text: otuLabel,
            mode: 'markers',
            marker: {
              color: otu,
              opacity: otu,
              size: sampleValues
            }
          };
          
          var data = [trace1];
          
          var layout1 = {
            title: 'OTU Data',
            showlegend: false,
            height: 600,
            width: 1200
          };

        Plotly.newPlot('bubble', data, layout1);
    });

}





dropdown.on("change", function() {
    // Get the selected value from the dropdown
    var sample = d3.select(this).property("value");
  
  
    console.log("Selected value: " + sample);
    buildChart(sample)

});



  