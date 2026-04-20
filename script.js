
const context = $("#output");
const chart = new Chart(context, {
    type: "scatter",
    data: { datasets: [] },
    options: {
        scales: {
            x: {
                min: 0,
                max: 1
            },
            y: {
                min: 0,
                max: 0
            }
        }
    }
});

function update() {
    const a = new Number($("#a")[0].value);
    const b = new Number($("#b")[0].value);
    const c = new Number($("#c")[0].value); 
    const extremes = [{ x: - 0.5 * b / a, y: - b * b / (4 * a) + c }];
    extremes.push({ x: extremes[0].x - 20, y: a * (extremes[0].x - 20) ** 2 + b * (extremes[0].x - 20) + c });
    extremes.push({ x: extremes[0].x + 20, y: a * (extremes[0].x + 20) ** 2 + b * (extremes[0].x + 20) + c });
    const bounds = { x: [extremes[0].x, extremes[0].x], y: [extremes[0].y, extremes[0].y] };
    for (let i = 1; i < 3; i++){
        if (extremes[i].x < bounds.x[0]) bounds.x[0] = extremes[i].x;
        if (extremes[i].x > bounds.x[1]) bounds.x[1] = extremes[i].x;
        if (extremes[i].y < bounds.y[0]) bounds.y[0] = extremes[i].y;
        if (extremes[i].y > bounds.y[1]) bounds.y[1] = extremes[i].y;
    }
    bounds.x[0] -= 0.1 * (bounds.x[1] - bounds.x[0]);
    bounds.x[1] += 0.1 * (bounds.x[1] - bounds.x[0]);
    if (a > 0) bounds.y[0] -= 0.1 * (bounds.y[1] - bounds.y[0]);
    else bounds.y[1] += 0.1 * (bounds.y[1] - bounds.y[0]);
    let points = [];
    for (let i = 0; i < 1000; i++) {
        let x = (i / 1000) * (bounds.x[1] - bounds.x[0]) + bounds.x[0];
        let y = x * x * a + x * b + c;
        if (y < bounds.y[0] || y > bounds.y[1]) continue;
        points.push({ x: x, y: y });
    }
    console.log(points);
    chart.data.datasets.pop();
    chart.data.datasets.pop();
    chart.data.datasets.push({ label: `${a}x^2 + ${b}x + ${c}`, data: points });
    chart.data.datasets.push({ label: `M${a > 0 ? "in" : "ax"}imum`, data: [extremes[0]], pointRadius: 10 });
    chart.options.scales.x.min = bounds.x[0];
    chart.options.scales.x.max = bounds.x[1];
    chart.options.scales.y.min = bounds.y[0];
    chart.options.scales.y.max = bounds.y[1];
    chart.update();
    $("#result")[0].innerHTML = `M${a > 0 ? "in" : "ax"}imum: x = ${extremes[0].x}, y = ${extremes[0].y}`;
}

update();

addEventListener("input", () => { update(); });