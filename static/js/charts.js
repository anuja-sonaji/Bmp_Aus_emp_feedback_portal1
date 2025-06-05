// Charts.js - Dashboard Analytics and Chart Initialization

/**
 * Initialize all dashboard charts with analytics data
 * @param {Object} analyticsData - The analytics data from backend
 */
function initializeDashboardCharts(analyticsData) {
    // Set default Chart.js configurations
    Chart.defaults.font.family = 'Inter, system-ui, sans-serif';
    Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--bs-body-color');
    Chart.defaults.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-border-color');
    
    // Initialize individual charts
    initEmploymentTypeChart(analyticsData.employment_type);
    initBillableStatusChart(analyticsData.billable_status);
    initTeamChart(analyticsData.team);
    initLocationChart(analyticsData.location);
    initSkillsChart(analyticsData.skills);
}

/**
 * Initialize Employment Type Pie Chart
 */
function initEmploymentTypeChart(data) {
    const ctx = document.getElementById('employmentTypeChart');
    if (!ctx || !data || Object.keys(data).length === 0) return;

    const labels = Object.keys(data);
    const values = Object.values(data);
    const colors = generateColors(labels.length);

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors.background,
                borderColor: colors.border,
                borderWidth: 2,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 1000
            }
        }
    });
}

/**
 * Initialize Billable Status Pie Chart
 */
function initBillableStatusChart(data) {
    const ctx = document.getElementById('billableStatusChart');
    if (!ctx || !data || Object.keys(data).length === 0) return;

    const labels = Object.keys(data);
    const values = Object.values(data);
    
    // Custom colors for billable status
    const billableColors = {
        'Billable': { bg: '#28a745', border: '#1e7e34' },
        'Non-billable': { bg: '#6c757d', border: '#495057' },
        'Unknown': { bg: '#ffc107', border: '#e0a800' }
    };

    const backgroundColors = labels.map(label => billableColors[label]?.bg || '#007bff');
    const borderColors = labels.map(label => billableColors[label]?.border || '#0056b3');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 2,
                hoverOffset: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 1200
            }
        }
    });
}

/**
 * Initialize Team Distribution Pie Chart
 */
function initTeamChart(data) {
    const ctx = document.getElementById('teamChart');
    if (!ctx || !data || Object.keys(data).length === 0) return;

    const labels = Object.keys(data);
    const values = Object.values(data);
    
    // Team-specific colors
    const teamColors = {
        'UFS': { bg: '#007bff', border: '#0056b3' },
        'RG': { bg: '#17a2b8', border: '#117a8b' },
        'Unknown': { bg: '#6c757d', border: '#495057' }
    };

    const backgroundColors = labels.map(label => teamColors[label]?.bg || '#28a745');
    const borderColors = labels.map(label => teamColors[label]?.border || '#1e7e34');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 2,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 1000
            }
        }
    });
}

/**
 * Initialize Location Distribution Chart
 */
function initLocationChart(data) {
    const ctx = document.getElementById('locationChart');
    if (!ctx || !data || Object.keys(data).length === 0) return;

    const labels = Object.keys(data);
    const values = Object.values(data);
    const colors = generateColors(labels.length);

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors.background,
                borderColor: colors.border,
                borderWidth: 2,
                hoverOffset: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '50%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 1200
            }
        }
    });
}

/**
 * Initialize Skills Distribution Bar Chart
 */
function initSkillsChart(data) {
    const ctx = document.getElementById('skillsChart');
    if (!ctx || !data || Object.keys(data).length === 0) return;

    // Sort skills by count and take top 10
    const sortedSkills = Object.entries(data)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);

    const labels = sortedSkills.map(([skill]) => skill);
    const values = sortedSkills.map(([, count]) => count);
    const colors = generateColors(labels.length);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Employee Count',
                data: values,
                backgroundColor: colors.background,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 4,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.x} employee(s)`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--bs-border-color')
                    },
                    ticks: {
                        stepSize: 1
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
}

/**
 * Generate color palettes for charts
 * @param {number} count - Number of colors needed
 * @returns {Object} Object with background and border color arrays
 */
function generateColors(count) {
    const baseColors = [
        '#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1',
        '#fd7e14', '#20c997', '#e83e8c', '#6c757d', '#17a2b8',
        '#f8d7da', '#d4edda', '#fff3cd', '#cce5ff', '#e2e3e5'
    ];

    const background = [];
    const border = [];

    for (let i = 0; i < count; i++) {
        const colorIndex = i % baseColors.length;
        const baseColor = baseColors[colorIndex];
        
        background.push(baseColor + '80'); // Add transparency
        border.push(baseColor);
    }

    return { background, border };
}

/**
 * Create a loading state for charts
 * @param {string} canvasId - The canvas element ID
 */
function showChartLoading(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const container = canvas.parentElement;
    container.innerHTML = `
        <div class="chart-loading">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading chart...</span>
            </div>
            <p class="mt-2 text-muted">Loading analytics...</p>
        </div>
    `;
}

/**
 * Update chart data dynamically
 * @param {Chart} chart - Chart.js instance
 * @param {Object} newData - New data to update
 */
function updateChartData(chart, newData) {
    if (!chart || !newData) return;

    const labels = Object.keys(newData);
    const values = Object.values(newData);

    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    
    // Update colors if needed
    if (chart.config.type === 'pie' || chart.config.type === 'doughnut') {
        const colors = generateColors(labels.length);
        chart.data.datasets[0].backgroundColor = colors.background;
        chart.data.datasets[0].borderColor = colors.border;
    }

    chart.update('active');
}

/**
 * Export chart as image
 * @param {string} canvasId - Canvas element ID
 * @param {string} filename - Filename for download
 */
function exportChart(canvasId, filename = 'chart.png') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL();
    link.click();
}

/**
 * Resize charts when window size changes
 */
function handleChartResize() {
    Chart.helpers.each(Chart.instances, function(chart) {
        chart.resize();
    });
}

/**
 * Initialize trend chart for time-series data
 * @param {string} canvasId - Canvas element ID
 * @param {Object} data - Time series data
 * @param {string} label - Dataset label
 */
function initTrendChart(canvasId, data, label = 'Trend') {
    const ctx = document.getElementById(canvasId);
    if (!ctx || !data) return;

    const labels = Object.keys(data);
    const values = Object.values(data);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: values,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#007bff',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#007bff',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--bs-border-color')
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--bs-border-color')
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

/**
 * Initialize comparison bar chart
 * @param {string} canvasId - Canvas element ID
 * @param {Array} datasets - Array of dataset objects
 * @param {Array} labels - X-axis labels
 */
function initComparisonChart(canvasId, datasets, labels) {
    const ctx = document.getElementById(canvasId);
    if (!ctx || !datasets || !labels) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--bs-border-color')
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Handle window resize for chart responsiveness
    window.addEventListener('resize', debounce(handleChartResize, 250));
    
    // Initialize charts if analytics data is available
    if (typeof window.analyticsData !== 'undefined') {
        initializeDashboardCharts(window.analyticsData);
    }
});

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Global chart utilities
window.ChartUtils = {
    initializeDashboardCharts,
    updateChartData,
    exportChart,
    showChartLoading,
    generateColors,
    initTrendChart,
    initComparisonChart
};
