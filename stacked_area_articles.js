import { BaseChart } from './BaseChart.js';
import { StackedAreaChart } from './StackedAreaChart.js';

function get_chart_instance(chart_type, data_object, annotations, key_arr, group, margin, chart_width, chart_height, color_arr, pos_x, pos_y, title, xlabel, ylabel, curveType){
  
  switch (chart_type){
    case 'A'://Area Chart
      let area_chart = new StackedAreaChart(data_object, annotations, key_arr, group, margin, chart_width, chart_height, color_arr, pos_x, pos_y, title, xlabel, ylabel, curveType);
      return area_chart;

    default:
      console.log('Unsupported chart type!!');
      
  }
}

export function redrawCharts(chart_width, chart_height){

  d3.select("body").selectAll("svg").remove();

  var margin = {left:25,right:50,top:100,bottom:0};
  //var chart_width = window.innerWidth/4;//450;
  //var chart_height = window.innerHeight/2;//275;


  var svg = d3.select("body")
                .append("svg")
                  .attr("height", "100%")
                  .attr("width", "100%");

  const g = svg.append("g")
              .attr("transform", `translate(${margin.left},${margin.top})`);


  //First chart
  // Number of articles: environment related and total
  const data1 = [
    {month: 'Aug-23', "Articles - Environmental": 3, "Articles - Other": 4},
    {month: 'Sep-23', "Articles - Environmental": 2, "Articles - Other": 14},
    {month: 'Oct-23', "Articles - Environmental": 1, "Articles - Other": 4},
    {month: 'Nov-23', "Articles - Environmental": 1, "Articles - Other": 4},
    {month: 'Dec-23', "Articles - Environmental": 4, "Articles - Other": 6},
    {month: 'Jan-24', "Articles - Environmental": 1, "Articles - Other": 11},
    {month: 'Feb-24', "Articles - Environmental": 0, "Articles - Other": 14},
    {month: 'Mar-24', "Articles - Environmental": 0, "Articles - Other": 18},
    {month: 'Apr-24', "Articles - Environmental": 8, "Articles - Other": 38},
    {month: 'May-24', "Articles - Environmental": 0, "Articles - Other": 14},
    {month: 'Jun-24', "Articles - Environmental": 10, "Articles - Other": 34},
    {month: 'Jul-24', "Articles - Environmental": 22, "Articles - Other": 48}
  ];

  // Features of the annotation
  const annotations1 = [
      {
          note: {
              //label: "The Associated Press",
              title: "Paris mayor to swim in Seine to prove cleanliness",
              titleClassName: "custom-title",
              labelClassName: "custom-label"
          },
          x: 0,
          y: 0,
          dy: 0,
          dx: 0,
          month: "Jul-24",
          url: "https://www.rte.ie/news/world/2024/0717/1460305-paris-mayor-seine/"
      },
      {
          note: {
              title: "Paris 2024 chief pledges to find solutions to keep Olympic surfing in Tahiti after coral damage",
              titleClassName: "custom-title",
              labelClassName: "custom-label"
          },
          x: 0,
          y: 0,
          dy: 0,
          dx: 0,
          month: "Dec-23",
          url: "https://apnews.com/article/olympics-paris-surfing-tahiti-coral-032662b649a34e3d12bf62c87e2ca727"
      }
  ];

  const color_arr1 = ["green", "gray"];
  const key_arr1 = ["Articles - Environmental", "Articles - Other"];
  let pos_x1 = 0;
  let pos_y1 = 0;
  let char_instance1 = get_chart_instance("A", data1, annotations1, key_arr1, g, margin, chart_width, chart_height, color_arr1, pos_x1, pos_y1, "Environmental Focus in Articles Leading up to the Olympics", "Month", "Percentage(%) of Articles", d3.curveLinear);

  //Second chart
  // Number of articles: environment related and total
  const data2 = [
    {month: 'Aug-23', "Environmental Articles - Aquatic": 3, "Environmental Articles - Non-Aquatic": 3},
    {month: 'Sep-23', "Environmental Articles - Aquatic": 0, "Environmental Articles - Non-Aquatic": 2},
    {month: 'Oct-23', "Environmental Articles - Aquatic": 1, "Environmental Articles - Non-Aquatic": 1},
    {month: 'Nov-23', "Environmental Articles - Aquatic": 1, "Environmental Articles - Non-Aquatic": 1},
    {month: 'Dec-23', "Environmental Articles - Aquatic": 3, "Environmental Articles - Non-Aquatic": 4},
    {month: 'Jan-24', "Environmental Articles - Aquatic": 1, "Environmental Articles - Non-Aquatic": 1},
    {month: 'Feb-24', "Environmental Articles - Aquatic": 0, "Environmental Articles - Non-Aquatic": 0},
    {month: 'Mar-24', "Environmental Articles - Aquatic": 0, "Environmental Articles - Non-Aquatic": 0},
    {month: 'Apr-24', "Environmental Articles - Aquatic": 6, "Environmental Articles - Non-Aquatic": 8},
    {month: 'May-24', "Environmental Articles - Aquatic": 0, "Environmental Articles - Non-Aquatic": 0},
    {month: 'Jun-24', "Environmental Articles - Aquatic": 6, "Environmental Articles - Non-Aquatic": 10},
    {month: 'Jul-24', "Environmental Articles - Aquatic": 16, "Environmental Articles - Non-Aquatic": 22}
  ];

  // Features of the annotation
  const annotations2 = [
      {
          note: {
              title: "Olympic men’s triathlon postponed due to high pollution levels in Seine",
              titleClassName: "custom-title",
              labelClassName: "custom-label"
          },
          x: 0,
          y: 0,
          dy: 0,
          dx: 0,
          month: "Jul-24",
          url: "https://www.aljazeera.com/sports/2024/7/30/olympic-mens-triathlon-postponed-due-to-high-pollution-levels-in-seine"
      },
      {
          note: {
              title: "Olympic triathlon swimming leg could be cancelled over Seine water quality",
              titleClassName: "custom-title",
              labelClassName: "custom-label"
          },
          x: 0,
          y: 0,
          dy: 0,
          dx: 0,
          month: "Dec-23",
          url: "https://www.theguardian.com/sport/2024/apr/09/olympic-triathlon-swimming-leg-could-be-cancelled-over-seine-water-quality"
      }
  ];

  const color_arr2 = ["#549ec4", "#8ce3b0"];// skyblue: #549ec4, lightgreen: #8ce3b0
  const key_arr2 = ["Environmental Articles - Aquatic", "Environmental Articles - Non-Aquatic"];
  let pos_x2 = chart_width+200;//700;
  let pos_y2 = 0;
  let char_instance2 = get_chart_instance("A", data2, annotations2, key_arr2, g, margin, chart_width, chart_height, color_arr2, pos_x2, pos_y2, "Aquatic Focus in Environmental Articles Leading up to the Olympics", "Month", "Percentage(%) of Articles", d3.curveMonotoneX);

}
