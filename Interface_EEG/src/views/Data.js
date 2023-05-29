
import React, { useState, useEffect }  from "react";

import Papa from "papaparse";
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col,Button } from "reactstrap";
import Chart from "chart.js/auto";
function Data() {
  const [chartData, setChartData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (chartData) {
      const chartOptions = {
        responsive: true,
      };
      const chartConfig = {
        type: "line",
        data: chartData,
        options: chartOptions,
      };
      const canvas = document.getElementById("chart");
      const context = canvas.getContext("2d");
      if (window.myChart) {
        // Destroy the existing Chart instance
        window.myChart.destroy();
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      new Chart(context, chartConfig);
    }
  }, [chartData]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

 // ...

const handleLoad = () => {
  if (selectedFile) {
    Papa.parse(selectedFile, {
      complete: (results) => {
        const data = results.data;
        // Assuming the data format: [timestamp, channel1, channel2, ..., channel14]
        const filteredData = data.filter((item) => item.slice(0).every((value) => value !== "0"));
        const chartLabels = filteredData.slice(0).map((item) => item[0]);
        const chartData = {
          labels: chartLabels,
          datasets: Array.from({ length: 14 }, (_, i) => ({
            label: `Channel ${i + 1}`,
            data: filteredData.slice(1).map((item) => item[i + 1]),
            fill: false,
            borderColor: "rgba(0, 255, 128, 1)",
            tension: 0.1,
          })),
        };
        setChartData(chartData);
      },
    });
  }
};

// ...


  return (
    <>
      <div className="content">
       <Button><input type="file" onChange={handleFileChange} /></Button> 
     
        <Button onClick={handleLoad}>Load</Button>
        

        <Card>
          <CardHeader>EEG Signal Chart</CardHeader>
          <CardBody>
            <canvas id="chart" width="400" height="200"></canvas>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Data;
