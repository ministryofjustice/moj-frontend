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

if [ -f "$DOCS_DIR/components/$COMPONENT.md" ]; then
  # Setup variables
  HAS_TABS=false
  IS_EXPERIMENTAL=false

  # Create the new component directory
  NEW_COMPONENT_DIR="$DOCS_DIR/components/$COMPONENT"

  # Move the main component file
  mv "$DOCS_DIR/components/$COMPONENT.md" "$NEW_COMPONENT_DIR/index.md"
  echo "✓ Moved components/$COMPONENT.md to components/$COMPONENT/index.md"

    # Check if the component has tabs
    if grep -q "^tabs: true" "$NEW_COMPONENT_DIR/index.md"; then
        HAS_TABS=true
        echo "✓ Detected tabs: true"
        TAB_FILENAMES=("_overview.md" "_how-to-use.md" "_examples.md" "_get-help-and-contribute" )
        TAB_TITLES=("Overview" "How to use" "Examples" "Get help and contribute" )
    fi

    # Check if the component has experimental status
    if grep -q "^status: Experimental" "$NEW_COMPONENT_DIR/index.md"; then
        IS_EXPERIMENTAL=true
        echo "✓ Detected Experimental status"
        TAB_FILENAMES=("_overview.md" "_designs.md" "_accessibility.md" "_code.md" )
        TAB_TITLES=("Overview" "Designs" "Accessibility" "Code" )
    fi

    # Create tab markdown files
    if [ $HAS_TABS = true ]; then
      for i in ${!TAB_FILENAMES[@]}; do
        cat > "$NEW_COMPONENT_DIR/${TAB_FILENAMES[$i]}" << EOF
---
title: ${TAB_TITLES[$i]}
order: $(( (i + 1) * 10 ))
tags: '$COMPONENT'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
EOF
echo "✓ Created ${TAB_FILENAMES[$i]}"

      done
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

    if [ $IS_EXPERIMENTAL = false ]; then
      # Move the arguments file
      if [ -f "$DOCS_DIR/_includes/arguments/$COMPONENT.md" ]; then
          mv "$DOCS_DIR/_includes/arguments/$COMPONENT.md" "$NEW_COMPONENT_DIR/_arguments.md"
          echo "✓ Moved _includes/arguments/$COMPONENT.md to components/$COMPONENT/_arguments.md"
      else
          echo "⚠ Warning: _includes/arguments/$COMPONENT.md not found"
      fi

      # Create the examples subdirectory
      mkdir -p "$NEW_COMPONENT_DIR/examples"

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
  fi
else
    echo "⚠ Warning: components/$COMPONENT.md not found"
fi
