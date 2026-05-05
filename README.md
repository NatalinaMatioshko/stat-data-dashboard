# Stat Data Dashboard

Frontend MVP dashboard built as a test task prototype.

## Overview

This project is a simple statistical dashboard built with React, Vite, Tailwind CSS, and Chart.js.  
It uses mock JSON data to display basic metrics, filters, a bar chart, and a data table.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Chart.js
- react-chartjs-2
- Mock JSON data

## Features

- Filter data by year
- Filter data by region
- Filter data by indicator
- Show KPI cards
- Display bar chart
- Render filtered data table
- Reset filters

## Project Structure

```bash
src/
  data/
    statData.json
  App.jsx
  main.jsx
  index.css
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Notes

- This is an MVP version focused on speed and clarity.
- Data is currently mocked in `src/data/statData.json`.
- The UI is intentionally simple to support fast iteration.

## Next Steps

- Add better formatting for different indicator types
- Improve chart labels and tooltips
- Split UI into reusable components
- Add responsive polish
