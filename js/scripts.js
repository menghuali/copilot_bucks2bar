function getMonthlyData() {
    const months = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];

    const data = months.map((month) => {
        const incomeInput = document.getElementById(`income-${month}`);
        const expensesInput = document.getElementById(`expenses-${month}`);

        return {
            month: month.charAt(0).toUpperCase() + month.slice(1), // Capitalize month name
            income: parseFloat(incomeInput.value) || 0, // Default to 0 if input is empty
            expenses: parseFloat(expensesInput.value) || 0 // Default to 0 if input is empty
        };
    });

    return data;
}

document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("barChart").getContext("2d");

    const barChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                {
                    label: "Income",
                    data: [], // Initially empty, will be updated dynamically
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
                {
                    label: "Expenses",
                    data: [], // Initially empty, will be updated dynamically
                    backgroundColor: "rgba(255, 99, 132, 0.6)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "Monthly Income vs Expenses",
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    // Function to update the chart dynamically
    function updateChart() {
        const monthlyData = getMonthlyData();

        // Extract incomes and expenses from the monthly data
        const incomes = monthlyData.map((data) => data.income);
        const expenses = monthlyData.map((data) => data.expenses);

        // Update the chart data
        barChart.data.datasets[0].data = incomes;
        barChart.data.datasets[1].data = expenses;

        // Re-render the chart
        barChart.update();
    }

    // Add event listeners to all income and expenses inputs
    const inputs = document.querySelectorAll('[id^="income-"], [id^="expenses-"]');
    inputs.forEach((input) => {
        input.addEventListener("input", updateChart); // Update chart on input change
    });

    // Add functionality to download the chart as an image
    const downloadButton = document.getElementById("downloadChart");
    downloadButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default anchor behavior

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = barChart.toBase64Image(); // Get the chart as a base64 image
        link.download = "chart.png"; // Set the file name for the download
        link.click(); // Trigger the download
    });
});