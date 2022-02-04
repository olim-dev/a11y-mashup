import {
    useElement,
    useState,
    useStaleLayout,
    useRect,
    useEffect,
    useModel,
    useSelections
  } from '@nebula.js/stardust';
  import * as d3 from "d3";

  
  export default function supernova() {
  
    return {
      qae: {
        properties: {
          qHyperCubeDef: {
            qDimensions: [],
            qMeasures: [],
            qInitialDataFetch: [{ qWidth: 2, qHeight: 5000 }],
            qSuppressZero: false,
            qSuppressMissing: true,
          },
          showTitles: true,
          title: '',
          subtitle: '',
          footnote: '',
        },
        data: {
          targets: [
            {
              path: '/qHyperCubeDef',
              dimensions: {
                min: 1,
                max: 1,
              },
              measures: {
                min: 1,
                max: 1,
              },
            },
          ],
        },
      },
      component() {
        const element = useElement();
        const layout = useStaleLayout();        

        //getting data array from QS object layout
        useEffect(() => {
          var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;
  
          //an array that invokes each row of qMatrix from layout:
          var data = qMatrix.map(function (d) {
            return {
              Country: d[0].qText,
              Amount: d[1].qText,
            };
          });

          var width = 1000;
          var height = 550;
  
          var id = "container_" + layout.qInfo.qId;
  
          // if not created, use id and size to create
          const elem_new = `<div id=${id}></div>`;

          element.innerHTML = elem_new;
  
          viz(data, width, height, id);

        }, [element, layout]);

        function viz(data, width, height, id) {
          var margin = {top: 30, right: 30, bottom: 70, left: 100},
          width = 650 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
      
  
          // append the svg object to the body of the page
          var svg = d3.select("#" + id)
            .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .attr("role", "img")
              .attr("aria-label", "Include a clear description here including the type of the chart, the data represente, and the overall trend")
            .append("g")
              .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
  
          // X axis
          var x = d3.scaleBand()
          .range([ 0, width ])
          .domain(data.map(function(d) { return d.Country; }))
          .padding(0.2);

          svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
          .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");


          // Add Y axis
          var y = d3.scaleLinear()
          .domain([0, 300000000])
          .range([ height, 0]);

          svg.append("g")
          .call(d3.axisLeft(y));

  
          // Bars
          svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
              .attr("x", function(d) { return x(d.Country); })
              .attr("y", function(d) { return y(d.Amount); })
              .attr("width", x.bandwidth())
              .attr("height", function(d) { return height - y(d.Amount); })
              .attr("fill", "#69b3a2")

        }
  
      },
    };
  }
  