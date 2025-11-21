---
name: 'Feature: Historical Tracking & Trends'
about: Track website carbon footprint over time and visualize improvement trends
title: '[FEATURE] Historical Tracking & Trends'
labels: 'enhancement, feature'
assignees: ''
---

## Feature Description

Implement a historical tracking system that allows users to monitor their website's carbon footprint over time, visualize trends, and measure the impact of optimizations.

## Problem Statement

Currently, each analysis is isolated without historical context. Users cannot:
- See if their optimization efforts are working
- Track progress toward carbon reduction goals
- Compare performance across different time periods
- Identify when regressions occur
- Share improvement achievements with stakeholders

This feature would enable data-driven sustainability improvements and provide motivation through visible progress.

## Proposed Solution

### Core Features

1. **Historical Data Storage**
   - Store every analysis with timestamp
   - Associate analyses with unique website identifiers
   - Capture key metrics over time:
     - CO2 emissions per visit
     - Energy consumption (kWh)
     - Page size (bytes)
     - Eco grade
     - Green hosting status
     - Number of HTTP requests (if available)

2. **Interactive Timeline Visualization**
   - Line charts showing metrics over time
   - Date range selector (7 days, 30 days, 90 days, 1 year, all time)
   - Multiple metrics on same chart (with dual Y-axes if needed)
   - Zoom and pan capabilities
   - Annotations for significant changes

3. **Trend Analysis**
   - Calculate and display trend indicators:
     - % change from previous analysis
     - % change from first analysis
     - Average improvement rate
     - Best/worst recorded values
   - Color coding: 🟢 improving, 🔴 worsening, ⚪ stable

4. **Milestone Tracking**
   - Mark significant events/changes:
     - "Switched to green hosting"
     - "Optimized images"
     - "Removed heavy JavaScript library"
   - Display milestones on timeline
   - Analyze impact of each milestone

5. **Comparison Views**
   - Side-by-side comparison of any two analysis points
   - "Before & After" view for specific optimizations
   - Show exact differences in metrics

6. **Goal Setting & Progress**
   - Set carbon reduction goals
   - Track progress toward goals
   - Visualize projected achievement date
   - Celebrate when goals are reached

### Example Visualizations

**Timeline Chart:**
```
CO2 per Visit (grams)
1.2 ┤                           
1.0 ┤     ●                     
0.8 ┤          ●─●              
0.6 ┤                ●─●        ← Green Hosting Switch
0.4 ┤                      ●─●  
0.2 ┤                            
    └─────────────────────────────
    Jan  Feb  Mar  Apr  May  Jun
    
↓ 58% improvement since January
```

**Statistics Card:**
```
┌─────────────────────────────────┐
│  Progress Summary (Last 90 Days)│
├─────────────────────────────────┤
│  CO2 Reduction:      -0.35g     │
│  Improvement:        ↓ 42%      │
│  Grade Change:       C → A+     │
│  Analyses Run:       12         │
│  Current Rank:       #234/5000  │
└─────────────────────────────────┘
```

### Technical Considerations

1. **Data Storage**
   - Database: PostgreSQL, Supabase, or MongoDB
   - Schema design:
     ```sql
     CREATE TABLE analyses (
       id UUID PRIMARY KEY,
       website_url TEXT NOT NULL,
       analyzed_at TIMESTAMP NOT NULL,
       co2_grams DECIMAL,
       energy_kwh DECIMAL,
       estimated_bytes INTEGER,
       grade VARCHAR(3),
       is_green BOOLEAN,
       metadata JSONB
     );
     
     CREATE INDEX idx_url_date ON analyses(website_url, analyzed_at);
     ```

2. **Website Identity**
   - Use normalized URLs (strip www, query params)
   - Optional: User accounts to claim/verify ownership
   - Consider subdomain handling (www vs non-www)

3. **Data Aggregation**
   - Daily/weekly/monthly aggregates for long-term data
   - Reduce query load for old data
   - Keep raw data for detailed analysis

4. **Charting Library**
   - Consider: Chart.js, Recharts, D3.js, or Apache ECharts
   - Must support: time series, annotations, responsive design
   - Lightweight for performance

5. **Performance**
   - Cache aggregated data
   - Pagination for long histories
   - Lazy load chart data

6. **Export Capabilities**
   - Export data as CSV/JSON
   - Generate PDF reports
   - Share snapshots via URL

### User Experience Flow

1. **First-time User:**
   - Analyze website → Create tracking profile
   - "Start tracking this site" button appears
   - No history shown yet (encourage re-analysis later)

2. **Returning User:**
   - View updated timeline automatically
   - See notification: "2% improvement since last week!"
   - Access full history dashboard

3. **Dashboard Layout:**
   ```
   ┌─────────────────────────────────────┐
   │  [example.com] - History Dashboard  │
   ├─────────────────────────────────────┤
   │  📊 Timeline Chart (Main view)      │
   │  📈 Trend Summary Cards             │
   │  🎯 Goals & Progress                │
   │  📝 Milestone Timeline              │
   │  📥 Export Options                  │
   └─────────────────────────────────────┘
   ```

## Implementation Steps

1. **Phase 1: Backend Infrastructure**
   - Set up database schema
   - Create API endpoints for storing/retrieving history
   - Implement data normalization and aggregation

2. **Phase 2: Data Collection**
   - Modify analysis endpoint to save results
   - Create website identifier/tracking system
   - Handle URL normalization

3. **Phase 3: Basic Timeline View**
   - Integrate charting library
   - Build simple line chart for CO2 over time
   - Add date range selector

4. **Phase 4: Enhanced Analytics**
   - Add multiple metric support
   - Implement trend calculations
   - Create comparison views

5. **Phase 5: Milestones & Goals**
   - Add milestone creation/editing
   - Implement goal setting
   - Build progress tracking

6. **Phase 6: Export & Sharing**
   - Add CSV/JSON export
   - Create shareable report URLs
   - Generate PDF reports (optional)

## Acceptance Criteria

- [ ] Users can view historical data for analyzed websites
- [ ] Timeline chart displays at least CO2 and energy metrics
- [ ] Date range selector works correctly
- [ ] Trend indicators show % change from previous analysis
- [ ] Users can add milestones to the timeline
- [ ] Comparison view shows differences between two time points
- [ ] Data persists across sessions
- [ ] Export functionality works (at least CSV)
- [ ] Mobile-responsive dashboard
- [ ] Performance: history loads in <2 seconds for 100+ data points

## Additional Notes

- **Privacy Considerations**: 
  - Allow users to keep history private
  - Option to delete all historical data
  - Consider GDPR compliance for EU users

- **Automation Possibilities**:
  - Scheduled automatic re-analysis (daily/weekly)
  - Email alerts for regressions
  - Integration with CI/CD for automatic analysis on deploy

- **Competitive Features**:
  - Show industry average trends
  - Compare your progress to similar websites
  - "You're in the top 10% of improving sites!"

## Related Features
- #X (Leaderboard) - show ranking changes over time
- #X (Dynamic Recommendations) - track which recommendations led to improvements
- #X (Badge Generator) - "Reduced carbon by 50% in 6 months" badges
