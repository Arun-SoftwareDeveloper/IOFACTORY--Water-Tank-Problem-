function calculateWater(units) {
  let n = units.length;

  // Arrays to store left and right max heights
  let leftMax = new Array(n).fill(0);
  let rightMax = new Array(n).fill(0);

  // Compute left max heights
  let maxLeft = 0;
  for (let i = 0; i < n; i++) {
    leftMax[i] = maxLeft;
    maxLeft = Math.max(maxLeft, units[i]);
  }

  // Compute right max heights
  let maxRight = 0;
  for (let i = n - 1; i >= 0; i--) {
    rightMax[i] = maxRight;
    maxRight = Math.max(maxRight, units[i]);
  }

  // Calculate water stored at each block
  let totalWater = 0;
  for (let i = 0; i < n; i++) {
    let minHeight = Math.min(leftMax[i], rightMax[i]);
    if (minHeight > units[i]) {
      totalWater += minHeight - units[i];
    }
  }

  return totalWater;
}

// Input data
const input = [0, 4, 0, 0, 0, 6, 0, 6, 4, 0];

// Calculate water units
const waterUnits = calculateWater(input);

// Draw the chart
drawChart(input, waterUnits);

// Function to draw the chart
function drawChart(blocks, waterUnits) {
  const chartContainer = document.getElementById("chart-container");

  // Create SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");

  // Calculate block width and gap
  const blockWidth = 40;
  const blockGap = 10;

  // Draw blocks
  for (let i = 0; i < blocks.length; i++) {
    const blockHeight = blocks[i] * 20; // Adjust the scaling factor as needed

    // Draw block
    const blockRect = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    blockRect.setAttribute("class", "block");
    blockRect.setAttribute("width", blockWidth);
    blockRect.setAttribute("height", blockHeight);
    blockRect.setAttribute("x", i * (blockWidth + blockGap));
    blockRect.setAttribute("y", 100 - blockHeight); // Align to the bottom
    svg.appendChild(blockRect);

    // Draw water on top of the block
    if (i !== 0 && i !== blocks.length - 1) {
      const waterHeight =
        Math.min(blocks[i], Math.min(blocks[i - 1], blocks[i + 1])) * 20;
      const waterRect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      waterRect.setAttribute("class", "water");
      waterRect.setAttribute("width", blockWidth);
      waterRect.setAttribute("height", waterHeight);
      waterRect.setAttribute("x", i * (blockWidth + blockGap));
      waterRect.setAttribute("y", 100 - waterHeight - blockHeight);
      svg.appendChild(waterRect);
    }
  }

  // Display the total water units
  const resultText = document.createElement("div");
  resultText.textContent = `Total Water Units: ${waterUnits} Units`;
  chartContainer.appendChild(resultText);

  // Append the SVG to the container
  chartContainer.appendChild(svg);
}
