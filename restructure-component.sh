#!/bin/bash

# Check if component name argument is provided
if [ $# -eq 0 ]; then
    echo "Error: No component name provided"
    echo "Usage: $0 <component-name>"
    exit 1
fi

COMPONENT=$1
DOCS_DIR="docs"

# Check if docs directory exists
if [ ! -d "$DOCS_DIR" ]; then
    echo "Error: docs directory not found"
    exit 1
fi

echo "Restructuring component: $COMPONENT"

# Create the new component directory structure
NEW_COMPONENT_DIR="$DOCS_DIR/components/$COMPONENT"
mkdir -p "$NEW_COMPONENT_DIR/examples"

# Move the main component file
if [ -f "$DOCS_DIR/components/$COMPONENT.md" ]; then
    mv "$DOCS_DIR/components/$COMPONENT.md" "$NEW_COMPONENT_DIR/index.md"
    echo "✓ Moved components/$COMPONENT.md to components/$COMPONENT/index.md"

    # Check if the component has tabs: true in frontmatter
    HAS_TABS=false
    if grep -q "^tabs: true" "$NEW_COMPONENT_DIR/index.md"; then
        HAS_TABS=true
        echo "✓ Detected tabs: true, creating tab files..."

        # Create _overview.md
        cat > "$NEW_COMPONENT_DIR/_overview.md" << EOF
---
title: Overview
order: 10
tags: '$COMPONENT'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
EOF
        echo "✓ Created _overview.md"

        # Create _how-to-use.md
        cat > "$NEW_COMPONENT_DIR/_how-to-use.md" << EOF
---
title: How to use
order: 20
tags: '$COMPONENT'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
EOF
        echo "✓ Created _how-to-use.md"

        # Create _examples.md
        cat > "$NEW_COMPONENT_DIR/_examples.md" << EOF
---
title: Examples
order: 30
tags: '$COMPONENT'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
EOF
        echo "✓ Created _examples.md"

        # Create _get-help-and-contribute.md
        cat > "$NEW_COMPONENT_DIR/_get-help-and-contribute.md" << EOF
---
title: Get help and contribute
order: 40
tags: '$COMPONENT'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---

{% include "layouts/partials/get-help-and-contribute.njk" %}
EOF
        echo "✓ Created _get-help-and-contribute.md"
    fi
else
    echo "⚠ Warning: components/$COMPONENT.md not found"
fi

# Move the arguments file
if [ -f "$DOCS_DIR/_includes/arguments/$COMPONENT.md" ]; then
    mv "$DOCS_DIR/_includes/arguments/$COMPONENT.md" "$NEW_COMPONENT_DIR/_arguments.md"
    echo "✓ Moved _includes/arguments/$COMPONENT.md to components/$COMPONENT/_arguments.md"
else
    echo "⚠ Warning: _includes/arguments/$COMPONENT.md not found"
fi

# Move all example directories that start with the component name
if [ -d "$DOCS_DIR/examples" ]; then
    for example_dir in "$DOCS_DIR/examples/$COMPONENT"*; do
        if [ -d "$example_dir" ]; then
            example_name=$(basename "$example_dir")
            # Remove component name prefix from the directory name
            new_example_name="${example_name#$COMPONENT}"
            # Remove leading dash or hyphen if present
            new_example_name="${new_example_name#-}"
            # If the name is empty (exact match), use "default"
            if [ -z "$new_example_name" ]; then
                new_example_name="default"
            fi
            mv "$example_dir" "$NEW_COMPONENT_DIR/examples/$new_example_name"
            echo "✓ Moved examples/$example_name to components/$COMPONENT/examples/$new_example_name"
        fi
    done
else
    echo "⚠ Warning: examples directory not found"
fi

# Create the component data file
COMPONENT_DATA_FILE="$NEW_COMPONENT_DIR/$COMPONENT.11tydata.js"
if [ "$HAS_TABS" = true ]; then
    cat > "$COMPONENT_DATA_FILE" << EOF
export default {
  figma_link: '',
  githuburl: '',
  tabCollection: '$COMPONENT'
}
EOF
else
    cat > "$COMPONENT_DATA_FILE" << EOF
export default {
  figma_link: '',
  githuburl: ''
}
EOF
fi
echo "✓ Created $COMPONENT.11tydata.js"

# Create the examples data file
EXAMPLES_DATA_FILE="$NEW_COMPONENT_DIR/examples/examples.11tydata.js"
cat > "$EXAMPLES_DATA_FILE" << EOF
export default {
  layout: 'layouts/example.njk',
  arguments: '$COMPONENT',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
EOF
echo "✓ Created examples/examples.11tydata.js"

echo "✓ Restructuring complete for $COMPONENT"
