import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SymbioticWeb: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.parentElement?.clientWidth || 600;
    const height = 400;
    
    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    // Data: Nodes representing Humans and various Plant benefits
    const nodes = [
      { id: "Humans", group: 1, r: 40 },
      { id: "Oxygen", group: 2, r: 25 },
      { id: "Medicine", group: 2, r: 25 },
      { id: "Shelter", group: 2, r: 25 },
      { id: "Rest", group: 2, r: 25 },
      { id: "Beauty", group: 2, r: 25 },
      { id: "Clarity", group: 2, r: 25 },
    ];

    const links = [
      { source: "Humans", target: "Oxygen" },
      { source: "Humans", target: "Medicine" },
      { source: "Humans", target: "Shelter" },
      { source: "Humans", target: "Rest" },
      { source: "Humans", target: "Beauty" },
      { source: "Humans", target: "Clarity" },
      { source: "Medicine", target: "Rest" }, // Interconnection
      { source: "Beauty", target: "Clarity" }, // Interconnection
    ];

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke", "#57534e") // sage color
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1.5);

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag<any, any>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    // Node Circles
    node.append("circle")
      .attr("r", (d) => d.r)
      .attr("fill", (d) => d.group === 1 ? "#d4af37" : "#4d7c0f") // Gold for humans, Green for plants
      .attr("fill-opacity", 0.8)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);

    // Node Labels
    node.append("text")
      .text((d) => d.id)
      .attr("x", 0)
      .attr("y", 4)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "white")
      .attr("font-family", "sans-serif")
      .attr("font-weight", "bold")
      .style("pointer-events", "none");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Cleanup
    return () => {
      simulation.stop();
    };

  }, []);

  return (
    <div className="w-full h-[400px] border border-sanctuary-sage/30 rounded-lg overflow-hidden bg-sanctuary-dark/50 backdrop-blur-sm relative">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-sanctuary-gold font-serif text-lg">The Symbiotic Web</h3>
        <p className="text-xs text-sanctuary-mist/70 max-w-[200px]">Drag nodes to explore how plants interconnect with human needs to create an ecological civilization.</p>
      </div>
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default SymbioticWeb;
