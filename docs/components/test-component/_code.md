---
title: Code
order: 40
tags: 'test-component'
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
Code has been added for this component. There may be other code blocks in the [‘test component’ Github discussion]({{ githuburl }}).


### Code block 1: HTML

<div class="app-example__code" data-module="app-copy">

```HTML
{% raw %}
<p>its html</p>
{% endraw %}
```

</div>



### Code block 2: react

<div class="app-example__code" data-module="app-copy">

```javascript
{% raw %}
import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  className = ''
}) => {
  const baseStyles = 'font-semibold rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-300',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 disabled:border-blue-300 disabled:text-blue-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300'
  };
  
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {children}
    </button>
  );
};
{% endraw %}
```

</div>

#### How to use the code

don't - its react!



## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.