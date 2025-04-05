# Family Tree Visualization Design Document

## 1. Core Visualization Design

### 1.1 Family Tree Graph
- **Layout**: Tree layout with horizontal orientation
- **Node Design**:
  - Circular nodes represent individuals
  - Color Coding:
    - Blue: Male
    - Pink: Female
    - Gray: Deceased
    - Light Green: Unborn
  - Node size: 10px radius with 2px white stroke
- **Link Design**:
  - Solid lines for parent-child relationships
  - Gray color (#999) with 1.5px width

### 1.2 Timeline
- Position: Top of control panel
- Design:
  - Horizontal slider
  - Current year display
  - Range from 1850 to 2024
- Features:
  - Dynamic update of node status (living/deceased)
  - Visualization of family structure at specific times

### 1.3 Location Filter
- Position: Control panel
- Design:
  - Multiple select dropdown
  - Options: all, taranaki, australia, uk
- Features:
  - Highlight members from selected regions
  - Support multi-region filtering
  - Opacity adjustment for non-selected regions

## 2. Interaction Design

### 2.1 Node Interactions
- Hover: Display tooltip with detailed information
  - Name
  - Gender
  - Birth Year
  - Death Year
  - Location
  - Status
- Click:
  - Highlight direct relatives
  - Highlight cousins
  - Visual feedback with different border colors

### 2.2 Search and Filter Functions
- Name Search:
  - Real-time filtering
  - Highlight matching nodes
- Advanced Filtering:
  - Time-based filtering via timeline
  - Location-based filtering
  - Combined filtering support

### 2.3 Zoom Controls
- Features:
  - Zoom in (+)
  - Zoom out (-)
  - Reset view
- Scale limits: 0.1x to 3x
- Initial zoom: 0.8x

## 3. Data Model

### 3.1 Member Data Structure
```json
{
  "id": "unique_id",
  "name": "Full Name",
  "gender": "male/female",
  "birthYear": "YYYY",
  "deathYear": "YYYY",
  "location": "place_name",
  "children": ["child_id1", "child_id2"]
}
```

### 3.2 Relationship Types
- Direct relatives (parents, children)
- Cousins
- Current selection

## 4. Visual Styling

### 4.1 Color Scheme
- Nodes:
  - Male: #4a90e2 (blue)
  - Female: #e2a4a4 (pink)
  - Deceased: #cccccc (gray)
  - Unborn: #90EE90 (light green)
- Highlights:
  - Direct relatives: Gold (#ffd700)
  - Cousins: Pink (#ff4081)
  - Selected person: Green (#00ff00)

### 4.2 Layout
- Tree orientation: Horizontal
- Node spacing: 1.2x for different parents
- Text labels: 12px Arial font
- Responsive design support

## 5. Implementation Features

### 5.1 Core Features
- Interactive family tree visualization
- Dynamic timeline filtering
- Location-based filtering
- Name search functionality
- Relative highlighting
- Zoom and pan controls

### 5.2 Technical Details
- Built with D3.js
- SVG-based rendering
- Responsive design
- Touch device support
- Modern browser compatibility

### 5.3 Performance Considerations
- Efficient node rendering
- Smooth transitions
- Optimized event handling
- Mobile-friendly design 