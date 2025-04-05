// Sample data with more family members
const familyData = {
    "nodes": [
        // First Generation
        { "id": 1, "name": "James Wilson", "gender": "male", "birthYear": 1850, "deathYear": 1910, "location": "taranaki", "children": [3, 4, 5] },
        { "id": 2, "name": "Margaret Wilson", "gender": "female", "birthYear": 1855, "deathYear": 1920, "location": "taranaki" },
        
        // Second Generation
        { "id": 3, "name": "Thomas Wilson", "gender": "male", "birthYear": 1880, "deathYear": 1940, "location": "australia", "children": [7, 8] },
        { "id": 4, "name": "Sarah Wilson", "gender": "female", "birthYear": 1882, "deathYear": 1950, "location": "uk", "children": [9] },
        { "id": 5, "name": "Robert Wilson", "gender": "male", "birthYear": 1885, "deathYear": 1960, "location": "taranaki" },
        
        // Third Generation
        { "id": 6, "name": "Elizabeth Brown", "gender": "female", "birthYear": 1905, "deathYear": 1980, "location": "uk" },
        { "id": 7, "name": "William Wilson", "gender": "male", "birthYear": 1910, "deathYear": 1970, "location": "australia", "children": [10, 11] },
        { "id": 8, "name": "Mary Wilson", "gender": "female", "birthYear": 1912, "deathYear": 1990, "location": "australia", "children": [12] },
        { "id": 9, "name": "John Wilson", "gender": "male", "birthYear": 1915, "deathYear": 2000, "location": "taranaki", "children": [13] },
        
        // Fourth Generation
        { "id": 10, "name": "David Wilson", "gender": "male", "birthYear": 1940, "deathYear": 2020, "location": "australia" },
        { "id": 11, "name": "Susan Wilson", "gender": "female", "birthYear": 1942, "location": "uk" },
        { "id": 12, "name": "Michael Wilson", "gender": "male", "birthYear": 1945, "location": "taranaki" },
        { "id": 13, "name": "Jennifer Wilson", "gender": "female", "birthYear": 1948, "location": "australia" }
    ]
};

// Initialize variables
let currentYear = 2024;
let selectedLocations = ['all'];
let highlightedNode = null;

// Create tree layout
const width = document.getElementById('familyTree').clientWidth;
const height = document.getElementById('familyTree').clientHeight;

// Create the SVG container with zoom support
const svg = d3.select('#familyTree')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// Add zoom behavior
const zoom = d3.zoom()
    .scaleExtent([0.1, 3]) // Set min and max zoom scale
    .on('zoom', (event) => {
        g.attr('transform', event.transform);
    });

// Add zoom controls
const zoomControls = d3.select('#familyTree')
    .append('div')
    .attr('class', 'zoom-controls')
    .style('position', 'absolute')
    .style('top', '10px')
    .style('right', '10px');

zoomControls.append('button')
    .attr('class', 'zoom-button')
    .text('+')
    .on('click', () => {
        svg.transition()
            .duration(750)
            .call(zoom.scaleBy, 1.2);
    });

zoomControls.append('button')
    .attr('class', 'zoom-button')
    .text('-')
    .on('click', () => {
        svg.transition()
            .duration(750)
            .call(zoom.scaleBy, 0.8);
    });

zoomControls.append('button')
    .attr('class', 'zoom-button')
    .text('Reset')
    .on('click', () => {
        svg.transition()
            .duration(750)
            .call(zoom.transform, d3.zoomIdentity.translate(width/4, height/2).scale(0.8));
    });

// Enable zoom and pan
svg.call(zoom);

// Create a group for the tree
const g = svg.append('g')
    .attr('transform', `translate(${width/4},${height/2})`);

// Initial zoom to fit
svg.call(zoom.transform, d3.zoomIdentity.translate(width/4, height/2).scale(0.8));

// Helper function to build hierarchy
function buildHierarchy(nodes) {
    const nodesById = {};
    nodes.forEach(node => {
        nodesById[node.id] = { ...node, children: [] };
    });
    
    const root = nodesById[1]; // Start with James Wilson
    nodes.forEach(node => {
        if (node.children) {
            node.children.forEach(childId => {
                nodesById[node.id].children.push(nodesById[childId]);
            });
        }
    });
    
    return root;
}

// Create a tree layout
const treeLayout = d3.tree()
    .size([height - 100, width - 200])
    .separation((a, b) => (a.parent === b.parent ? 1 : 1.2));

// Convert the data to a hierarchy
const hierarchyData = buildHierarchy(familyData.nodes);
const root = d3.hierarchy(hierarchyData);
const treeData = treeLayout(root);

// Create links
const link = g.append('g')
    .selectAll('path')
    .data(treeData.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));

// Create nodes
const node = g.append('g')
    .selectAll('g')
    .data(treeData.descendants())
    .enter()
    .append('g')
    .attr('class', d => `node ${d.data.gender}`)
    .attr('transform', d => `translate(${d.y},${d.x})`);

// Add circles to nodes
node.append('circle')
    .attr('r', 10)
    .attr('class', d => `${isDeceased(d.data) ? 'deceased' : ''}`);

// Add text labels
node.append('text')
    .attr('dy', '.35em')
    .attr('x', d => d.children ? -13 : 13)
    .style('text-anchor', d => d.children ? 'end' : 'start')
    .text(d => d.data.name);

// Create tooltip
const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

// Add interaction events
node.on('mouseover', showTooltip)
    .on('mouseout', hideTooltip)
    .on('click', highlightRelatives);

// Timeline event listener
document.getElementById('timeSlider').addEventListener('input', function(e) {
    currentYear = parseInt(e.target.value);
    document.getElementById('currentYear').textContent = currentYear;
    updateVisualization();
});

// Location filter event listener
document.getElementById('locationFilter').addEventListener('change', function(e) {
    selectedLocations = Array.from(e.target.selectedOptions).map(option => option.value);
    updateVisualization();
});

// Search functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    node.select('circle').classed('highlighted', d => 
        d.data.name.toLowerCase().includes(searchTerm)
    );
});

// Helper functions
function isDeceased(person) {
    return person.deathYear && person.deathYear < currentYear;
}

function isUnborn(person) {
    return person.birthYear > currentYear;
}

// Update visualization
function updateVisualization() {
    node.select('circle')
        .classed('deceased', d => isDeceased(d.data))
        .classed('unborn', d => isUnborn(d.data));
    
    if (selectedLocations.includes('all')) {
        node.style('opacity', 1);
    } else {
        node.style('opacity', d => 
            selectedLocations.includes(d.data.location) ? 1 : 0.2
        );
    }
}

function showTooltip(event, d) {
    tooltip.transition()
        .duration(200)
        .style('opacity', .9);
    tooltip.html(`
        <strong>${d.data.name}</strong><br>
        Gender: ${d.data.gender === 'male' ? 'Male' : 'Female'}<br>
        Birth: ${d.data.birthYear}<br>
        Death: ${d.data.deathYear || 'Still alive'}<br>
        Location: ${d.data.location}<br>
        Status: ${isDeceased(d.data) ? 'Deceased' : (isUnborn(d.data) ? 'Not yet born' : 'Living')}
    `)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 28) + 'px');
}

function hideTooltip() {
    tooltip.transition()
        .duration(500)
        .style('opacity', 0);
}

function highlightRelatives(event, d) {
    // Reset all highlights
    node.select('circle')
        .classed('highlighted-direct', false)
        .classed('highlighted-cousin', false)
        .classed('highlighted-current', false);
    
    // Highlight current node
    node.filter(n => n.data.id === d.data.id)
        .select('circle')
        .classed('highlighted-current', true);
    
    // Find and highlight direct relationships (parents and children)
    if (d.parent) {
        node.filter(n => n.data.id === d.parent.data.id)
            .select('circle')
            .classed('highlighted-direct', true);
    }
    if (d.children) {
        d.children.forEach(child => {
            node.filter(n => n.data.id === child.data.id)
                .select('circle')
                .classed('highlighted-direct', true);
        });
    }

    // Find cousins (children of parent's siblings)
    if (d.parent && d.parent.parent) {
        const grandparent = d.parent.parent;
        grandparent.children.forEach(uncle => {
            if (uncle !== d.parent && uncle.children) {
                uncle.children.forEach(cousin => {
                    node.filter(n => n.data.id === cousin.data.id)
                        .select('circle')
                        .classed('highlighted-cousin', true);
                });
            }
        });
    }

    // Update tooltip to show relationship information
    tooltip.html(`
        <strong>${d.data.name}</strong><br>
        Gender: ${d.data.gender === 'male' ? 'Male' : 'Female'}<br>
        Birth: ${d.data.birthYear}<br>
        Death: ${d.data.deathYear || 'Still alive'}<br>
        Location: ${d.data.location}<br>
        <br>
        <strong>Relationship Colors:</strong><br>
        <span style="color: #00ff00;">■</span> Selected Person<br>
        <span style="color: #ffd700;">■</span> Direct Relations<br>
        <span style="color: #ff4081;">■</span> Cousins
    `);
} 