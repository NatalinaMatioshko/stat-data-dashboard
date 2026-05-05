# Stat Data Dashboard

A simple frontend MVP dashboard built with React, Vite, Tailwind CSS, and Chart.js.

## Overview

This project is a demo statistical dashboard for exploring mock public data by:

- year
- region
- indicator

It includes filters, KPI cards, a bar chart, and a responsive data table.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Chart.js
- react-chartjs-2

## Features

- Filter data by year
- Filter data by region
- Filter data by indicator
- KPI summary cards
- Bar chart with formatted values
- Active filter chips
- Empty state with reset action
- Responsive demo layout

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

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Demo Data

The project currently uses mock data stored in:

```bash
src/data/statData.json
```

Each record includes:

- `region`
- `year`
- `indicator`
- `value`

## Deployment

This project can be deployed easily on Vercel.

Recommended build settings:

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

## Status

MVP / test task demo version.
