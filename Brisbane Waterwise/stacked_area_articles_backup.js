var margin = {left:100,right:50,top:40,bottom:0};
const innerWidth = 500;
const innerHeight = 200;

// Number of articles: environment related and total
const data = [
  {month: 'Aug-23', environment: 3, total: 4},
  {month: 'Sep-23', environment: 2, total: 14},
  {month: 'Oct-23', environment: 1, total: 4},
  {month: 'Nov-23', environment: 1, total: 4},
  {month: 'Dec-23', environment: 4, total: 6},
  {month: 'Jan-24', environment: 1, total: 11},
  {month: 'Feb-24', environment: 0, total: 14},
  {month: 'Mar-24', environment: 0, total: 18},
  {month: 'Apr-24', environment: 8, total: 38},
  {month: 'May-24', environment: 0, total: 14},
  {month: 'Jun-24', environment: 10, total: 34},
  {month: 'Jul-24', environment: 22, total: 48}
];

var svg = d3.select("body")
              .append("svg")
                .attr("height", "100%")
                .attr("width", "100%");

const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

const stack = d3.stack()
  .keys(['environment', 'nonEnv'])
  .order(d3.stackOrderNone)
  .offset(d3.stackOffsetNone);
  

// Compute derived data
const stackedData = stack(
  data.map(d => ({
    month: d.month,
    environment: Math.round((d.environment/d.total*100), 0),
    nonEnv: 100 - Math.round((d.environment/d.total*100), 0)
  }))
);

const months = data.map(d => d.month);

const x = d3.scalePoint()
  .domain(months)
  .range([0, innerWidth]);

const y = d3.scaleLinear()
  //.domain([0, d3.max(data, d => d.total)]).nice()
  .domain([0, 100]).nice()
  .range([innerHeight, 0]);

const color = d3.scaleOrdinal()
  .domain(['environment', 'nonEnv'])
  .range(["#4CAF50", "#888888"]);

const area = d3.area()
  .x((d, i) => x(data[i].month))
  .y0(d => y(d[0]))
  .y1(d => y(d[1]))
  .curve(d3.curveLinear)
  //.curve(d3.curveCatmullRom.alpha(0.5));

const layers = g.selectAll("path")
  .data(stackedData)
  .join("path")
    .attr("fill", ({key}) => color(key))
    .attr("d", d => area(d.slice(0, 1))); // Start with only first point

const xAxisGroup = g.append("g")
                    .attr("transform", `translate(30,${innerHeight})`)
                    .call(d3.axisBottom(x));
g.append("text")
            .attr("x", innerWidth/2)
            .attr("y", innerHeight+35)
            .attr("text-anchor", "middle")
            .text("Month");

const yAxisGroup = g.append("g")
                    .attr("transform", `translate(30,0)`)
                    .call(d3.axisLeft(y));
g.append("text")
            .attr("x", -innerHeight/2)
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .text("Percentage of Articles");

g.append("text")
            .attr("x", innerWidth/2+30)
            .attr("y", -15)
            .attr("font-size", 20)
            .attr("text-anchor", "middle")
            .text("Environmental Focus in Articles Leading up to the Olympics")

let i = 1;
function animate() {
  if (i > data.length) return;

  layers.data(stackedData)
    .attr("transform", "translate(30, 0)")
    .transition(5000)
    .duration(1000)
    .attr("d", d => area(d.slice(0, i)))
    .on("end", animate); // call animate again after transition completes

  i++;
}

animate();