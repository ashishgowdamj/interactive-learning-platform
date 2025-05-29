export const topics = [
  {
    id: 'html',
    title: 'HTML Basics',
    description: 'Learn the fundamental building blocks of the web.',
    lessons: [
      {
        id: 'html-intro',
        title: 'Introduction to HTML',
        content: [
          {
            type: 'paragraph',
            text: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page and consists of a series of elements.'
          },
          {
            type: 'heading',
            text: 'What is HTML?'
          },
          {
            type: 'paragraph',
            text: 'HTML elements tell the browser how to display the content. They label pieces of content such as "this is a heading", "this is a paragraph", "this is a link", etc.'
          },
          {
            type: 'code',
            language: 'html',
            code: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My First HTML Page</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n  <p>This is my first HTML page.</p>\n</body>\n</html>'
          },
          {
            type: 'note',
            text: 'HTML is not a programming language, it is a markup language that defines the structure of your content.'
          },
          {
            type: 'heading',
            text: 'HTML Document Structure'
          },
           {
            type: 'paragraph',
            text: 'Every HTML document has a basic structure that includes essential elements like `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>`. These tags define the type of document and organize the content.'
          },
           {
            type: 'code',
            language: 'html',
            code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document Structure</title>\n</head>\n<body>\n  <!-- Content goes here -->\n</body>\n</html>'
          }
        ],
        duration: '20 minutes',
        difficulty: 'Beginner',
        practiceCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Practice Page</title>\n</head>\n<body>\n  <h1>Practice Time!</h1>\n  <p>Edit this code and click Run to see the output.</p>\n</body>\n</html>'
      },
      {
        id: 'html-elements',
        title: 'HTML Elements and Tags',
        content: [
           {
            type: 'paragraph',
            text: 'HTML elements are represented by tags. Tags are written with angle brackets, like `<tagname>content</tagname>`. Most tags have an opening tag and a closing tag.'
          },
          {
            type: 'heading',
            text: 'Common HTML Tags'
          },
          {
            type: 'list',
            items: [
              '`<h1>` to `<h6>`: Headings',
              '`<p>`: Paragraphs',
              '`<a>`: Links',
              '`<img>`: Images',
              '`<div>`: Division or section',
              '`<span>`: Inline section',
            ]
          },
          {
            type: 'code',
            language: 'html',
            code: '<h1>This is a Heading</h1>\n<p>This is a paragraph.</p>\n<a href="https://www.example.com">This is a link</a>\n<img src="image.jpg" alt="An image">'
          }
        ],
        duration: '25 minutes',
        difficulty: 'Beginner',
        practiceCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>HTML Elements Practice</title>\n</head>\n<body>\n  <!-- Create a heading for your favorite movie -->\n  <h1>My Favorite Movie</h1>\n  \n  <!-- Add a paragraph describing the movie -->\n  <p>This is a paragraph about my favorite movie.</p>\n  \n  <!-- Add a link to the movie\'s website -->\n  <a href="https://www.example.com">Visit Movie Website</a>\n  \n  <!-- Add an image of the movie poster -->\n  <img src="https://via.placeholder.com/150" alt="Movie Poster">\n</body>\n</html>'
      },
       {
        id: 'html-attributes',
        title: 'HTML Attributes',
        content: [
           {
            type: 'paragraph',
            text: 'Attributes provide additional information about HTML elements. They are always specified in the start tag and usually come in name/value pairs like `name="value"`.'
          },
          {
            type: 'heading',
            text: 'Examples of Attributes'
          },
          {
            type: 'code',
            language: 'html',
            code: '<a href="https://www.w3schools.com">Visit W3Schools</a>\n<img src="img_girl.jpg" width="500" height="600">'
          },
           {
            type: 'note',
            text: 'The `alt` attribute for images is important for accessibility.'
          }
        ],
        duration: '20 minutes',
        difficulty: 'Beginner',
        practiceCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>HTML Attributes Practice</title>\n</head>\n<body>\n  <!-- Create a link with href and title attributes -->\n  <a href="https://www.google.com" title="Visit Google">Go to Google</a>\n  \n  <!-- Add an image with src, alt, width, and height attributes -->\n  <img src="https://via.placeholder.com/300x200" alt="A sample image" width="300" height="200">\n  \n  <!-- Create a paragraph with style attribute -->\n  <p style="color: blue; font-size: 18px;">This is a styled paragraph.</p>\n  \n  <!-- Add a div with class and id attributes -->\n  <div class="container" id="main-content">\n    <p>This div has both class and id attributes.</p>\n  </div>\n</body>\n</html>'
      },
      {
        id: 'html-forms',
        title: 'HTML Forms and Input',
        content: [
          {
            type: 'paragraph',
            text: 'HTML forms are used to collect user input. They contain form elements like text fields, checkboxes, radio buttons, submit buttons, and more.'
          },
          {
            type: 'heading',
            text: 'Common Form Elements'
          },
          {
            type: 'list',
            items: [
              '`<input>`: The most important form element',
              '`<label>`: Defines a label for form elements',
              '`<select>`: Defines a drop-down list',
              '`<textarea>`: Defines a multi-line input field',
              '`<button>`: Defines a clickable button'
            ]
          },
          {
            type: 'code',
            language: 'html',
            code: '<form action="/submit" method="post">\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name">\n  \n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email">\n  \n  <input type="submit" value="Submit">\n</form>'
          }
        ],
        duration: '30 minutes',
        difficulty: 'Intermediate',
        practiceCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>HTML Forms Practice</title>\n  <style>\n    form { max-width: 400px; margin: 20px; }\n    label { display: block; margin: 10px 0; }\n    input, select, textarea { width: 100%; padding: 8px; margin: 5px 0; }\n  </style>\n</head>\n<body>\n  <h2>Registration Form</h2>\n  <form action="/submit" method="post">\n    <!-- Text input -->\n    <label for="username">Username:</label>\n    <input type="text" id="username" name="username" required>\n    \n    <!-- Email input -->\n    <label for="email">Email:</label>\n    <input type="email" id="email" name="email" required>\n    \n    <!-- Password input -->\n    <label for="password">Password:</label>\n    <input type="password" id="password" name="password" required>\n    \n    <!-- Radio buttons -->\n    <label>Gender:</label>\n    <input type="radio" id="male" name="gender" value="male">\n    <label for="male">Male</label>\n    <input type="radio" id="female" name="gender" value="female">\n    <label for="female">Female</label>\n    \n    <!-- Checkbox -->\n    <label>\n      <input type="checkbox" name="subscribe" value="yes">\n      Subscribe to newsletter\n    </label>\n    \n    <!-- Select dropdown -->\n    <label for="country">Country:</label>\n    <select id="country" name="country">\n      <option value="">Select a country</option>\n      <option value="usa">USA</option>\n      <option value="canada">Canada</option>\n      <option value="uk">UK</option>\n    </select>\n    \n    <!-- Textarea -->\n    <label for="message">Message:</label>\n    <textarea id="message" name="message" rows="4"></textarea>\n    \n    <!-- Submit button -->\n    <input type="submit" value="Register">\n  </form>\n</body>\n</html>'
      },
      {
        id: 'html-tables',
        title: 'HTML Tables and Data Organization',
        content: [
          {
            type: 'paragraph',
            text: 'HTML tables allow you to arrange data into rows and columns. They are useful for displaying tabular data, such as financial data, calendars, schedules, and more.'
          },
          {
            type: 'heading',
            text: 'Table Elements'
          },
          {
            type: 'list',
            items: [
              '`<table>`: Defines a table',
              '`<tr>`: Defines a table row',
              '`<th>`: Defines a table header cell',
              '`<td>`: Defines a table data cell',
              '`<caption>`: Defines a table caption'
            ]
          },
          {
            type: 'code',
            language: 'html',
            code: '<table>\n  <caption>Monthly Savings</caption>\n  <tr>\n    <th>Month</th>\n    <th>Savings</th>\n  </tr>\n  <tr>\n    <td>January</td>\n    <td>$100</td>\n  </tr>\n</table>'
          }
        ],
        duration: '30 minutes',
        difficulty: 'Intermediate',
        practiceCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>HTML Tables Practice</title>\n  <style>\n    table {\n      width: 100%;\n      border-collapse: collapse;\n      margin: 20px 0;\n    }\n    \n    th, td {\n      border: 1px solid #ddd;\n      padding: 12px;\n      text-align: left;\n    }\n    \n    th {\n      background-color: #4CAF50;\n      color: white;\n    }\n    \n    tr:nth-child(even) {\n      background-color: #f2f2f2;\n    }\n    \n    tr:hover {\n      background-color: #ddd;\n    }\n    \n    caption {\n      font-size: 1.2em;\n      margin-bottom: 10px;\n      font-weight: bold;\n    }\n  </style>\n</head>\n<body>\n  <h2>Student Grade Report</h2>\n  \n  <table>\n    <caption>Fall Semester 2023</caption>\n    <thead>\n      <tr>\n        <th>Student ID</th>\n        <th>Name</th>\n        <th>Subject</th>\n        <th>Grade</th>\n        <th>Status</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>001</td>\n        <td>John Doe</td>\n        <td>Mathematics</td>\n        <td>A</td>\n        <td>Pass</td>\n      </tr>\n      <tr>\n        <td>002</td>\n        <td>Jane Smith</td>\n        <td>Physics</td>\n        <td>B+</td>\n        <td>Pass</td>\n      </tr>\n      <tr>\n        <td>003</td>\n        <td>Mike Johnson</td>\n        <td>Chemistry</td>\n        <td>C</td>\n        <td>Pass</td>\n      </tr>\n      <tr>\n        <td>004</td>\n        <td>Sarah Williams</td>\n        <td>Biology</td>\n        <td>A-</td>\n        <td>Pass</td>\n      </tr>\n    </tbody>\n    <tfoot>\n      <tr>\n        <td colspan="3">Class Average</td>\n        <td>B+</td>\n        <td>-</td>\n      </tr>\n    </tfoot>\n  </table>\n</body>\n</html>'
      },
      {
        id: 'html-semantic',
        title: 'HTML5 Semantic Elements',
        content: [
          {
            type: 'paragraph',
            text: 'HTML5 introduced several new semantic elements that define the purpose of the content they contain. Using semantic HTML helps search engines, accessibility tools, and developers understand the structure and meaning of your web page.'
          },
          {
            type: 'heading',
            text: 'Common Semantic Elements'
          },
          {
            type: 'list',
            items: [
              '`<article>`: Represents a self-contained piece of content',
              '`<aside>`: Represents content related to the surrounding content, but separate from it',
              '`<nav>`: Represents a block of navigation links',
              '`<header>`: Represents introductory content or a set of navigational links',
              '`<footer>`: Represents a footer for its nearest sectioning content or the root element',
              '`<main>`: Represents the dominant content of the `<body>`',
              '`<section>`: Represents a standalone section of content'
            ]
          },
          {
            type: 'code',
            language: 'html',
            code: '<header>\n  <h1>Website Title</h1>\n  <nav>\n    <a href="/">Home</a>\n    <a href="/about">About</a>\n  </nav>\n</header>\n\n<main>\n  <article>\n    <h2>Article Title</h2>\n    <p>Article content goes here...</p>\n  </article>\n  \n  <aside>\n    <h3>Related Links</h3>\n    <ul>\n      <li>Link 1</li>\n      <li>Link 2</li>\n    </ul>\n  </aside>\n</main>\n\n<footer>\n  <p>© 2023 Website Name</p>\n</footer>'
          }
        ],
        duration: '25 minutes',
        difficulty: 'Beginner',
        practiceCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>HTML5 Semantic Elements Practice</title>\n  <style>\n    body { font-family: sans-serif; margin: 0; line-height: 1.6; }\n    header { background: #f4f4f4; padding: 1rem; text-align: center; }\n    nav ul { padding: 0; list-style: none; }\n    nav ul li { display: inline; margin: 0 10px; }\n    main { padding: 20px; display: flex; gap: 20px; }\n    article { flex: 2; background: #fff; padding: 15px; border: 1px solid #ddd; }\n    aside { flex: 1; background: #f9f9f9; padding: 15px; border: 1px solid #ddd; }\n    footer { background: #333; color: white; text-align: center; padding: 1rem; margin-top: 20px; }\n  </style>\n</head>\n<body>\n  <!-- Use semantic elements to structure a simple blog post page -->\n  <header>\n    <h1>My Awesome Blog</h1>\n    <nav>\n      <ul>\n        <li><a href="#">Home</a></li>\n        <li><a href="#">About</a></li>\n        <li><a href="#">Contact</a></li>\n      </ul>\n    </nav>\n  </header>\n\n  <main>\n    <article>\n      <h2>First Blog Post</h2>\n      <p>This is the content of my first amazing blog post. It covers interesting topics...</p>\n      <section>\n        <h3>Comments</h3>\n        <p>Comment section goes here.</p>\n      </section>\n    </article>\n    \n    <aside>\n      <h3>Categories</h3>\n      <ul>\n        <li>Technology</li>\n        <li>Tutorials</li>\n        <li>Web Development</li>\n      </ul>\n    </aside>\n  </main>\n\n  <footer>\n    <p>© 2023 My Awesome Blog. All rights reserved.</p>\n  </footer>\n</body>\n</html>'
      },
      {
        id: 'html-accessibility',
        title: 'HTML Accessibility and ARIA',
        content: [
          {
            type: 'paragraph',
            text: 'Web accessibility (a11y) means that websites, tools, and technologies are designed and developed so that people with disabilities can use them. Accessible design benefits everyone.'
          },
          {
            type: 'heading',
            text: 'ARIA Attributes'
          },
          {
            type: 'paragraph',
            text: 'Accessible Rich Internet Applications (ARIA) is a set of attributes you can add to HTML elements to improve accessibility, especially for dynamic content and custom UI controls.'
          },
          {
            type: 'list',
            items: [
              '`role`: Defines the purpose of an element',
              '`aria-label`: Provides a string label when a visible label is not possible',
              '`aria-labelledby`: Refers to the ID of the element that labels the current element',
              '`aria-describedby`: Refers to the ID of the element that describes the current element',
              '`aria-hidden`: Indicates that the element and all its descendants are not visible or perceivable to any user, regardless of whether they are visually rendered.'
            ]
          },
          {
            type: 'code',
            language: 'html',
            code: '<button aria-label="Close dialog">X</button>\n\n<div role="alert">Something went wrong.</div>'
          },
          {
            type: 'heading',
            text: 'Semantic HTML for Accessibility'
          },
          {
            type: 'paragraph',
            text: 'Using appropriate HTML5 semantic elements (`<nav>`, `<article>`, `<aside>`, `<header>`, `<footer>`, `<main>`, `<button>`, `<form>`, `<input>`, etc.) is the first step to creating accessible content, as they have built-in accessibility features.'
          }
        ],
        duration: '30 minutes',
        difficulty: 'Intermediate',
        practiceCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>HTML Accessibility Practice</title>\n  <style>\n    body { font-family: sans-serif; line-height: 1.6; max-width: 600px; margin: 20px auto; }\n    .alert { padding: 15px; background-color: #f44336; color: white; margin-bottom: 15px; }\n    .success { padding: 15px; background-color: #04AA6D; color: white; margin-bottom: 15px; }\n    button { padding: 10px 15px; margin-right: 10px; cursor: pointer; }\n    input[type="checkbox"] { margin-right: 5px; }\n  </style>\n</head>\n<body>\n  <h2>Accessibility Practice</h2>\n\n  <!-- Use role and aria-label for a custom button -->\n  <div role="button" tabindex="0" aria-label="Custom like button" style="border: 1px solid #ddd; padding: 10px; width: 50px; text-align: center; cursor: pointer;">Like</div>\n\n  <!-- Use aria-live for dynamic content updates (alerts) -->\n  <button onclick="showAlert()">Show Alert</button>\n  <button onclick="showSuccess()">Show Success</button>\n  <div id="live-region" aria-live="polite" style="margin-top: 20px;">\n    <!-- Dynamic messages appear here -->\n  </div>\n\n  <!-- Use semantic elements and proper form labeling -->\n  <form style="margin-top: 20px;">\n    <label for="newsletter-signup">Sign up for our newsletter:</label>\n    <input type="checkbox" id="newsletter-signup" name="newsletter"> Yes, I want to receive emails.\n  </form>\n\n  <script>\n    function showAlert() {\n      const liveRegion = document.getElementById("live-region");\n      liveRegion.innerHTML = "<div class=\"alert\" role=\"alert\">This is an alert message!</div>";\n    }\n\n    function showSuccess() {\n      const liveRegion = document.getElementById("live-region");\n      liveRegion.innerHTML = "<div class=\"success\" role=\"alert\">Action completed successfully!</div>";\n    }\n  </script>\n\n</body>\n</html>'
      }
    ],
    quiz: [
      {
        id: 'html-quiz-1',
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'Hyperlinks and Text Markup Language',
          'Home Tool Markup Language',
          'Hyperlinking Text Management Link'
        ],
        correctAnswer: 'Hyper Text Markup Language'
      },
      {
        id: 'html-quiz-2',
        question: 'Which HTML element is used for the largest heading?',
        options: [
          '<h1>',
          '<h6>',
          '<head>',
          '<heading>'
        ],
        correctAnswer: '<h1>'
      }
    ]
  },
  {
    id: 'css',
    title: 'CSS Fundamentals',
    description: 'Style your web pages with Cascading Style Sheets.',
    lessons: [
      {
        id: 'css-intro',
        title: 'Introduction to CSS',
         content: [
           {
            type: 'paragraph',
            text: 'CSS (Cascading Style Sheets) is used to style the look and feel of your website. It describes how HTML elements are to be displayed on screen, paper, or in other media.'
          },
          {
            type: 'heading',
            text: 'Why Use CSS?'
          },
           {
            type: 'paragraph',
            text: 'CSS saves a lot of work. It can control the layout of multiple web pages all at once. External stylesheets are stored in CSS files.'
          },
          {
            type: 'heading',
            text: 'CSS Syntax'
          },
          {
            type: 'paragraph',
            text: 'A CSS rule-set consists of a selector and a declaration block.'
          },
           {
            type: 'code',
            language: 'css',
            code: 'selector {\n  property: value;\n  property: value;\n}'
          }
        ],
        duration: '20 minutes',
        difficulty: 'Beginner',
        practiceCode: '/* Add your CSS styles here */\np {\n  color: blue;\n}'
      },
      {
        id: 'css-selectors',
        title: 'CSS Selectors',
        content: [
           {
            type: 'paragraph',
            text: 'CSS selectors are used to "find" (select) HTML elements you want to style.'
          },
          {
            type: 'heading',
            text: 'Types of Selectors'
          },
           {
            type: 'list',
            items: [
              'Element selector: selects elements based on the element name.',
              'ID selector: selects an element based on its id attribute (`#id`).',
              'Class selector: selects elements based on their class attribute (`.classname`).',
              'Group selector: selects all the HTML elements with the same style definitions.'
            ]
          },
          {
            type: 'code',
            language: 'css',
            code: 'p { /* Element selector */\n  text-align: center;\n}\n\n#my-id { /* ID selector */\n  border: 1px solid black;\n}\n\n.my-class { /* Class selector */\n  color: blue;\n}'
          }
        ],
        duration: '25 minutes',
        difficulty: 'Beginner',
        practiceCode: '/* Practice with different selectors */\nh1 { color: green; }\n#myElement { text-decoration: underline; }\n.myClass { font-weight: bold; }'
      },
      {
        id: 'css-box-model',
        title: 'CSS Box Model',
         content: [
           {
            type: 'paragraph',
            text: 'The CSS box model is essentially a box that wraps around every HTML element. It consists of: margins, borders, padding, and the actual content.'
          },
           {
            type: 'heading',
            text: 'Understanding the Box Model'
          },
           {
            type: 'paragraph',
            text: 'The image below illustrates the box model:'
          },
          // In a real app, you might include an image block type here
           {
            type: 'list',
            items: [
              '**Content**: The content of the box, where text and images appear.',
              '**Padding**: Clears an area around the content. The padding is transparent.',
              '**Border**: A border that goes around the padding and content.',
              '**Margin**: Clears an area outside the border. The margin is transparent.'
            ]
          }
        ],
        duration: '30 minutes',
        difficulty: 'Intermediate',
        practiceCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>CSS Box Model Practice</title>\n  <style>\n    /* Create a container with margin */\n    .container {\n      margin: 20px;\n      background-color: #f0f0f0;\n    }\n    \n    /* Style the box with different properties */\n    .box {\n      width: 200px;\n      height: 100px;\n      padding: 20px;\n      border: 3px solid #333;\n      margin: 15px;\n      background-color: #fff;\n    }\n    \n    /* Add hover effect */\n    .box:hover {\n      padding: 25px;\n      border-color: #0066cc;\n      transition: all 0.3s ease;\n    }\n  </style>\n</head>\n<body>\n  <div class="container">\n    <div class="box">\n      <p>This is a box with padding, border, and margin.</p>\n    </div>\n    <div class="box">\n      <p>Hover over me to see the box model in action!</p>\n    </div>\n  </div>\n</body>\n</html>'
      },
      {
        id: 'css-flexbox',
        title: 'CSS Flexbox Layout',
        content: [
          {
            type: 'paragraph',
            text: 'Flexbox is a one-dimensional layout method for arranging items in rows or columns. It makes it easier to design flexible responsive layout structures without using float or positioning.'
          },
          {
            type: 'heading',
            text: 'Flexbox Properties'
          },
          {
            type: 'list',
            items: [
              '`display: flex`: Enables flexbox for a container',
              '`flex-direction`: Sets the direction of flex items',
              '`justify-content`: Aligns items along the main axis',
              '`align-items`: Aligns items along the cross axis',
              '`flex-wrap`: Specifies whether items should wrap'
            ]
          },
          {
            type: 'code',
            language: 'css',
            code: '.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.item {\n  flex: 1;\n}'
          }
        ],
        duration: '35 minutes',
        difficulty: 'Intermediate',
        practiceCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>CSS Flexbox Practice</title>\n  <style>\n    .container {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 20px;\n      padding: 20px;\n      background-color: #f0f0f0;\n    }\n    \n    .card {\n      flex: 1 1 200px;\n      padding: 20px;\n      background-color: white;\n      border-radius: 8px;\n      box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n    }\n    \n    .header {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: 15px;\n    }\n    \n    .button-group {\n      display: flex;\n      gap: 10px;\n    }\n    \n    button {\n      padding: 8px 16px;\n      border: none;\n      border-radius: 4px;\n      cursor: pointer;\n    }\n    \n    .primary { background-color: #007bff; color: white; }\n    .secondary { background-color: #6c757d; color: white; }\n  </style>\n</head>\n<body>\n  <div class="container">\n    <div class="card">\n      <div class="header">\n        <h3>Card 1</h3>\n        <div class="button-group">\n          <button class="primary">Edit</button>\n          <button class="secondary">Delete</button>\n        </div>\n      </div>\n      <p>This is a flex card with a header and buttons.</p>\n    </div>\n    \n    <div class="card">\n      <div class="header">\n        <h3>Card 2</h3>\n        <div class="button-group">\n          <button class="primary">Edit</button>\n          <button class="secondary">Delete</button>\n        </div>\n      </div>\n      <p>Try resizing the window to see flexbox in action!</p>\n    </div>\n    \n    <div class="card">\n      <div class="header">\n        <h3>Card 3</h3>\n        <div class="button-group">\n          <button class="primary">Edit</button>\n          <button class="secondary">Delete</button>\n        </div>\n      </div>\n      <p>The cards will reflow based on available space.</p>\n    </div>\n  </div>\n</body>\n</html>'
      },
      {
        id: 'css-grid',
        title: 'CSS Grid Layout',
        content: [
          {
            type: 'paragraph',
            text: 'CSS Grid Layout is a two-dimensional layout system designed specifically for the user interface. It excels at dividing a page into major regions or defining the relationship in terms of size, position, and layer.'
          },
          {
            type: 'heading',
            text: 'Grid Properties'
          },
          {
            type: 'list',
            items: [
              '`display: grid`: Enables grid layout',
              '`grid-template-columns`: Defines column sizes',
              '`grid-template-rows`: Defines row sizes',
              '`grid-gap`: Sets gap between grid items',
              '`grid-area`: Names grid items for placement'
            ]
          },
          {
            type: 'code',
            language: 'css',
            code: '.grid-container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n\n.grid-item {\n  grid-column: span 2;\n}'
          }
        ],
        duration: '40 minutes',
        difficulty: 'Intermediate',
        practiceCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>CSS Grid Practice</title>\n  <style>\n    .dashboard {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      grid-template-rows: auto auto;\n      gap: 20px;\n      padding: 20px;\n      background-color: #f5f5f5;\n    }\n    \n    .card {\n      background: white;\n      padding: 20px;\n      border-radius: 8px;\n      box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n    }\n    \n    .header {\n      grid-column: 1 / -1;\n      background: #2c3e50;\n      color: white;\n    }\n    \n    .sidebar {\n      grid-row: 2 / 3;\n      background: #34495e;\n      color: white;\n    }\n    \n    .main {\n      grid-column: 2 / -1;\n      display: grid;\n      grid-template-columns: repeat(2, 1fr);\n      gap: 15px;\n    }\n    \n    .stat-card {\n      background: #3498db;\n      color: white;\n      padding: 15px;\n      border-radius: 4px;\n    }\n  </style>\n</head>\n<body>\n  <div class="dashboard">\n    <div class="card header">\n      <h1>Dashboard</h1>\n      <p>Welcome to your control panel</p>\n    </div>\n    \n    <div class="card sidebar">\n      <h3>Navigation</h3>\n      <ul>\n        <li>Home</li>\n        <li>Analytics</li>\n        <li>Settings</li>\n      </ul>\n    </div>\n    \n    <div class="main">\n      <div class="stat-card">\n        <h3>Users</h3>\n        <p>1,234</p>\n      </div>\n      <div class="stat-card">\n        <h3>Revenue</h3>\n        <p>$5,678</p>\n      </div>\n      <div class="stat-card">\n        <h3>Orders</h3>\n        <p>89</p>\n      </div>\n      <div class="stat-card">\n        <h3>Growth</h3>\n        <p>+12%</p>\n      </div>\n    </div>\n  </div>\n</body>\n</html>'
      },
      {
        id: 'css-animations',
        title: 'CSS Animations and Transitions',
        content: [
          {
            type: 'paragraph',
            text: 'CSS animations allow you to animate changes in CSS property values over time. This enables you to create complex animations without using JavaScript or Flash.'
          },
          {
            type: 'heading',
            text: 'Key Concepts'
          },
          {
            type: 'list',
            items: [
              '`@keyframes`: Rule to define the animation sequence',
              '`animation-name`: Specifies the name of the `@keyframes` rule',
              '`animation-duration`: Specifies how long the animation takes',
              '`animation-timing-function`: Specifies the speed curve of the animation',
              '`animation-delay`: Specifies a delay before the animation starts',
              '`animation-iteration-count`: Specifies the number of times an animation should be played',
              '`animation-direction`: Specifies whether an animation should be played forwards, backwards, or in alternate cycles'
            ]
          },
          {
            type: 'code',
            language: 'css',
            code: '.element {\n  animation-name: slidein;\n  animation-duration: 3s;\n}\n\n@keyframes slidein {\n  from {\n    margin-left: 100%;\n    width: 300%;\n  }\n\n  to {\n    margin-left: 0%;\n    width: 100%;\n  }\n}'
          },
          {
            type: 'heading',
            text: 'Transitions'
          },
          {
            type: 'paragraph',
            text: 'CSS transitions provide a way to animate changes in CSS properties, instead of having the change happen instantly. This allows for smooth, gradual changes.'
          },
          {
            type: 'code',
            language: 'css',
            code: '.box {\n  transition: width 2s, height 2s, transform 2s;\n}\n\n.box:hover {\n  width: 300px;\n  height: 300px;\n  transform: rotate(180deg);\n}'
          }
        ],
        duration: '45 minutes',
        difficulty: 'Intermediate',
        practiceCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>CSS Animations and Transitions Practice</title>\n  <style>\n    body { display: flex; justify-content: center; align-items: center; min-height: 80vh; background: #f0f0f0; }\n\n    .box {\n      width: 100px;\n      height: 100px;\n      background-color: #3498db;\n      margin: 20px;\n      /* Add transition for size and color */\n      transition: width 0.5s ease, height 0.5s ease, background-color 0.5s ease;\n    }\n\n    .box:hover {\n      width: 120px;\n      height: 120px;\n      background-color: #e74c3c;\n    }\n\n    /* Define an animation */\n    @keyframes bounce {\n      0%, 20%, 50%, 80%, 100% {\n        transform: translateY(0);\n      }\n      40% {\n        transform: translateY(-30px);\n      }\n      60% {\n        transform: translateY(-15px);\n      }\n    }\n\n    .animated-box {\n      width: 100px;\n      height: 100px;\n      background-color: #2ecc71;\n      margin: 20px;\n      /* Apply the animation */\n      animation: bounce 2s infinite;\n    }\n  </style>\n</head>\n<body>\n\n  <h2>Hover over the box to see transition:</h2>\n  <div class="box"></div>\n\n  <h2>Watch the box animate:</h2>\n  <div class="animated-box"></div>\n\n</body>\n</html>'
      },
      {
        id: 'css-responsiveness',
        title: 'CSS Responsiveness and Media Queries',
        content: [
          {
            type: 'paragraph',
            text: 'Responsive web design is about creating web pages that look good on all devices (desktops, tablets, and phones). Responsive design uses HTML and CSS to automatically adjust, hide, shrink, or enlarge a website, to make it look good on all devices.'
          },
          {
            type: 'heading',
            text: 'Using Media Queries'
          },
          {
            type: 'paragraph',
            text: 'Media queries are a CSS technique that allows you to apply different styles for different device types, screen sizes, or orientations.'
          },
          {
            type: 'code',
            language: 'css',
            code: '/* Styles for screens smaller than 600px */\n@media only screen and (max-width: 600px) {\n  body {\n    background-color: lightblue;\n  }\n}\n'
          },
          {
            type: 'heading',
            text: 'Mobile First Approach'
          },
          {
            type: 'paragraph',
            text: 'Mobile-first is a development strategy that starts by designing for the smallest screen size first, then progressively adding features and layouts for larger screens using media queries. This often leads to better performance and a cleaner codebase.'
          }
        ],
        duration: '40 minutes',
        difficulty: 'Intermediate',
        practiceCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>CSS Responsiveness Practice</title>\n  <style>\n    body { font-family: sans-serif; margin: 0; padding: 20px; }\n\n    .container {\n      display: flex;\n      flex-wrap: wrap; /* Allows items to wrap to the next line */\n      gap: 20px;\n    }\n\n    .box {\n      background-color: #3498db;\n      color: white;\n      padding: 20px;\n      text-align: center;\n      flex: 1 1 200px; /* Flex-grow, flex-shrink, flex-basis */\n    }\n\n    /* Styles for screens larger than 600px */\n    @media only screen and (min-width: 600px) {\n      .container {\n        justify-content: space-between;\n      }\n\n      .box {\n        flex-basis: 250px; /* Increase base size on larger screens */\n      }\n    }\n\n    /* Styles for screens larger than 900px */\n    @media only screen and (min-width: 900px) {\n      .box {\n        flex-basis: 300px; /* Further increase base size on even larger screens */\n      }\n    }\n  </style>\n</head>\n<body>\n  <h2>Responsive Design Practice</h2>\n  <p>Resize your browser window to see the layout change.</p>\n\n  <div class="container">\n    <div class="box">Box 1</div>\n    <div class="box">Box 2</div>\n    <div class="box">Box 3</div>\n    <div class="box">Box 4</div>\n  </div>\n\n</body>\n</html>'
      }
    ],
    quiz: [
      {
        id: 'css-quiz-1',
        question: 'What does CSS stand for?',
        options: [
          'Cascading Style Sheets',
          'Computer Style Sheets',
          'Colorful Style Sheets',
          'Creative Style Sheets'
        ],
        correctAnswer: 'Cascading Style Sheets'
      },
      {
        id: 'css-quiz-2',
        question: 'Which HTML attribute is used to define inline styles?',
        options: [
          'styles',
          'style',
          'class',
          'font'
        ],
        correctAnswer: 'style'
      }
    ]
  },
  {
    id: 'js',
    title: 'JavaScript Essentials',
    description: 'Add interactivity and dynamic content to your websites.',
    lessons: [
      {
        id: 'js-intro',
        title: 'Introduction to JavaScript',
         content: [
           {
            type: 'paragraph',
            text: 'JavaScript is the world\'s most popular programming language. It is the programming language of the Web.'
          },
          {
            type: 'heading',
            text: 'What can JavaScript do?'
          },
           {
            type: 'list',
            items: [
              'JavaScript can change HTML content.',
              'JavaScript can change HTML attribute values.',
              'JavaScript can change HTML styles (CSS).',
              'JavaScript can hide and show HTML elements.'
            ]
          },
          {
            type: 'heading',
            text: 'Where to Put JavaScript'
          },
           {
            type: 'paragraph',
            text: 'JavaScript code can be placed in the `<head>` or the `<body>` section of an HTML page, or in external script files.'
          },
           {
            type: 'code',
            language: 'html',
            code: '<script>\n  document.getElementById("demo").innerHTML = "Hello JavaScript!";\n</script>'
          }
        ],
        duration: '25 minutes',
        difficulty: 'Beginner',
        practiceCode: '<p id="demo">Hello World!</p>\n\n<button onclick="myFunction()">Click Me</button>\n\nfunction myFunction() {\n  document.getElementById(\"demo\").innerHTML = "Hello JavaScript!";\n}'
      },
      {
        id: 'js-variables',
        title: 'Variables and Data Types',
         content: [
           {
            type: 'paragraph',
            text: 'Variables are containers for storing data values. In JavaScript, you can declare variables using `var`, `let`, and `const`.'
          },
           {
            type: 'heading',
            text: 'Declaring Variables'
          },
           {
            type: 'code',
            language: 'javascript',
            code: 'var x = 5;\nlet y = "Hello";\nconst pi = 3.14;'
          },
           {
            type: 'heading',
            text: 'JavaScript Data Types'
          },
           {
            type: 'list',
            items: [
              '**Primitive Data Types**: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.',
              '**Object Data Type**: `object` (includes arrays, functions, etc.).'
            ]
          }
        ],
        duration: '30 minutes',
        difficulty: 'Beginner',
        practiceCode: '<script>\nlet a = 10;\nlet b = 5;\nlet sum = a + b;\nconsole.log(\"The sum is: " + sum); // Check console for output\n</script>'
      },
      {
        id: 'js-functions',
        title: 'Functions',
        content: [
           {
            type: 'paragraph',
            text: 'A JavaScript function is a block of code designed to perform a particular task. A JavaScript function is executed when "something" invokes it (calls it).'
          },
           {
            type: 'heading',
            text: 'Function Syntax'
          },
           {
            type: 'code',
            language: 'javascript',
            code: 'function myFunction(p1, p2) {\n  return p1 * p2;   // The function returns the product of p1 and p2\n}'
          },
           {
            type: 'note',
            text: 'Functions are reusable blocks of code.'
          }
        ],
        duration: '35 minutes',
        difficulty: 'Intermediate',
        practiceCode: '<button onclick="greet()">Greet Me</button>\n\n<script>\nfunction greet() {\n  alert(\"Hello from a function!");\n}\n</script>'
      },
      {
        id: 'js-dom',
        title: 'DOM Manipulation',
        content: [
          {
            type: 'paragraph',
            text: 'The Document Object Model (DOM) is a programming interface for HTML documents. It represents the page so that programs can change the document structure, style, and content.'
          },
          {
            type: 'heading',
            text: 'Common DOM Methods'
          },
          {
            type: 'list',
            items: [
              '`document.getElementById()`: Find element by id',
              '`document.getElementsByClassName()`: Find elements by class name',
              '`document.querySelector()`: Find first element matching CSS selector',
              '`element.innerHTML`: Change the HTML content',
              '`element.style`: Change the CSS style'
            ]
          },
          {
            type: 'code',
            language: 'javascript',
            code: '// Change text\ndocument.getElementById("demo").innerHTML = "Hello World!";\n\n// Change style\ndocument.getElementById("demo").style.color = "red";'
          }
        ],
        duration: '40 minutes',
        difficulty: 'Intermediate',
        practiceCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>DOM Manipulation Practice</title>\n  <style>\n    .container { max-width: 600px; margin: 20px auto; }\n    .card { padding: 20px; margin: 10px 0; border: 1px solid #ddd; }\n    .hidden { display: none; }\n    button { margin: 5px; padding: 8px 16px; }\n  </style>\n</head>\n<body>\n  <div class="container">\n    <h2>DOM Manipulation Practice</h2>\n    \n    <div class="card">\n      <h3>Task List</h3>\n      <input type="text" id="taskInput" placeholder="Enter a new task">\n      <button onclick="addTask()">Add Task</button>\n      <ul id="taskList"></ul>\n    </div>\n    \n    <div class="card">\n      <h3>Style Changer</h3>\n      <button onclick="changeColor()">Change Color</button>\n      <button onclick="toggleVisibility()">Toggle Visibility</button>\n      <p id="styleText">This text will change style!</p>\n    </div>\n  </div>\n  \n  <script>\n    // Task List Functions\n    function addTask() {\n      const input = document.getElementById("taskInput");\n      const list = document.getElementById("taskList");\n      if (input.value) {\n        const li = document.createElement("li");\n        li.textContent = input.value;\n        list.appendChild(li);\n        input.value = "";\n      }\n    }\n    \n    // Style Changer Functions\n    function changeColor() {\n      const text = document.getElementById("styleText");\n      const colors = ["red", "blue", "green", "purple"];\n      const randomColor = colors[Math.floor(Math.random() * colors.length)];\n      text.style.color = randomColor;\n    }\n    \n    function toggleVisibility() {\n      const text = document.getElementById("styleText");\n      text.classList.toggle("hidden");\n    }\n  </script>\n</body>\n</html>'
      },
      {
        id: 'js-events',
        title: 'JavaScript Events and Event Handling',
        content: [
          {
            type: 'paragraph',
            text: 'Events are actions or occurrences that happen in the system you are programming. The system tells you about them so you can respond to them in some way if desired.'
          },
          {
            type: 'heading',
            text: 'Common Events'
          },
          {
            type: 'list',
            items: [
              '`click`: When a mouse button is clicked',
              '`mouseover`: When the mouse moves over an element',
              '`keydown`: When a keyboard key is pressed',
              '`submit`: When a form is submitted',
              '`load`: When a page or image has finished loading'
            ]
          },
          {
            type: 'code',
            language: 'javascript',
            code: '// Event listener example\ndocument.getElementById("myButton").addEventListener("click", function() {\n  alert("Button clicked!");\n});'
          }
        ],
        duration: '35 minutes',
        difficulty: 'Intermediate',
        practiceCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>JavaScript Events Practice</title>\n  <style>\n    .container { max-width: 600px; margin: 20px auto; }\n    .interactive-area {\n      padding: 20px;\n      border: 2px solid #ddd;\n      margin: 10px 0;\n      min-height: 200px;\n    }\n    .color-box {\n      width: 100px;\n      height: 100px;\n      background: #3498db;\n      margin: 10px;\n      transition: all 0.3s ease;\n    }\n    .key-display {\n      font-size: 24px;\n      margin: 20px 0;\n    }\n  </style>\n</head>\n<body>\n  <div class="container">\n    <h2>Event Handling Practice</h2>\n    \n    <div class="interactive-area">\n      <h3>Mouse Events</h3>\n      <div class="color-box" id="colorBox"></div>\n      <p>Move your mouse over the box to see it change!</p>\n    </div>\n    \n    <div class="interactive-area">\n      <h3>Keyboard Events</h3>\n      <p>Press any key to see it displayed below:</p>\n      <div class="key-display" id="keyDisplay">Waiting for key press...</div>\n    </div>\n    \n    <div class="interactive-area">\n      <h3>Form Events</h3>\n      <form id="demoForm">\n        <input type="text" id="nameInput" placeholder="Enter your name">\n        <button type="submit">Submit</button>\n      </form>\n      <p id="formMessage"></p>\n    </div>\n  </div>\n  \n  <script>\n    // Mouse Events\n    const colorBox = document.getElementById("colorBox");\n    colorBox.addEventListener("mouseover", () => {\n      colorBox.style.transform = "scale(1.1)";\n      colorBox.style.backgroundColor = "#e74c3c";\n    });\n    \n    colorBox.addEventListener("mouseout", () => {\n      colorBox.style.transform = "scale(1)";\n      colorBox.style.backgroundColor = "#3498db";\n    });\n    \n    // Keyboard Events\n    const keyDisplay = document.getElementById("keyDisplay");\n    document.addEventListener("keydown", (event) => {\n      keyDisplay.textContent = `Key pressed: ${event.key}`;\n    });\n    \n    // Form Events\n    const form = document.getElementById("demoForm");\n    const formMessage = document.getElementById("formMessage");\n    \n    form.addEventListener("submit", (event) => {\n      event.preventDefault();\n      const name = document.getElementById("nameInput").value;\n      formMessage.textContent = `Hello, ${name}! Form submitted successfully.`;\n    });\n  </script>\n</body>\n</html>'
      },
      {
        id: 'js-async',
        title: 'JavaScript Asynchronous Programming',
        content: [
          {
            type: 'paragraph',
            text: 'JavaScript is single-threaded, meaning it can only execute one task at a time. However, it can handle asynchronous operations (like fetching data from a server, timers, or file operations) without blocking the main thread using mechanisms like callbacks, Promises, and Async/Await.'
          },
          {
            type: 'heading',
            text: 'Promises'
          },
          {
            type: 'paragraph',
            text: 'A Promise is an object representing the eventual completion or failure of an asynchronous operation. It has three states: pending, fulfilled, and rejected.'
          },
          {
            type: 'code',
            language: 'javascript',
            code: 'const myPromise = new Promise((resolve, reject) => {\n  // Asynchronous operation\n  setTimeout(() => {\n    const success = true;\n    if (success) {\n      resolve(\'Operation successful!\');\n    } else {\n      reject(\'Operation failed.\');\n    }\n  }, 1000);\n});\n\nmyPromise.then((result) => {\n  console.log(result); // Handles successful result\n}).catch((error) => {\n  console.error(error); // Handles errors\n});'
          },
          {
            type: 'heading',
            text: 'Async/Await'
          },
          {
            type: 'paragraph',
            text: 'Async/Await is modern JavaScript syntax that makes asynchronous code look and behave a little more like synchronous code, making it easier to read and write.'
          },
          {
            type: 'code',
            language: 'javascript',
            code: 'async function fetchData() {\n  try {\n    const response = await fetch(\'https://api.example.com/data\');\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error(\'Error fetching data:\', error);\n  }\n}'
          }
        ],
        duration: '45 minutes',
        difficulty: 'Advanced',
        practiceCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>JS Async Practice</title>\n</head>\n<body>\n  <h2>Asynchronous JavaScript Practice</h2>\n  <button onclick="loadData()">Load Data</button>\n  <p id="data-status"></p>\n\n  <script>\n    // Simulate fetching data with a delay\n    function simulateFetch(success = true) {\n      return new Promise((resolve, reject) => {\n        setTimeout(() => {\n          if (success) {\n            resolve({ message: "Data loaded successfully!" });\n          } else {\n            reject("Failed to load data.");\n          }\n        }, 2000); // 2 second delay\n      });\n    }\n\n    async function loadData() {\n      const statusElement = document.getElementById("data-status");\n      statusElement.textContent = "Loading...";\n\n      try {\n        // Call the simulated async operation using await\n        const data = await simulateFetch(true); // Try changing to false to see the error case\n        statusElement.textContent = data.message;\n        statusElement.style.color = "green";\n      } catch (error) {\n        statusElement.textContent = `Error: ${error}`;\n        statusElement.style.color = "red";\n      }\n    }\n  </script>\n</body>\n</html>'
      }
    ],
    quiz: [
      {
        id: 'js-quiz-1',
        question: 'Which is the correct way to declare a JavaScript variable?',
        options: [
          'variable carName;',
          'var carName;',
          'v carName;',
          'string carName;',
        ],
        correctAnswer: 'var carName;'
      },
      {
        id: 'js-quiz-2',
        question: 'Which event occurs when the user clicks on an HTML element?',
        options: [
          'onchange',
          'onmouseover',
          'onclick',
          'onmouseclick',
        ],
        correctAnswer: 'onclick'
      }
    ]
  },
  {
    id: 'python',
    title: 'Python Programming',
    description: 'Learn Python programming from basics to advanced concepts.',
    lessons: [
      {
        id: 'python-intro',
        title: 'Introduction to Python',
        content: [
          {
            type: 'paragraph',
            text: 'Python is a high-level, interpreted programming language known for its simplicity and readability. It\'s widely used in web development, data science, artificial intelligence, and more.'
          },
          {
            type: 'heading',
            text: 'Why Python?'
          },
          {
            type: 'list',
            items: [
              'Easy to learn and read',
              'Versatile and powerful',
              'Large standard library',
              'Great for beginners',
              'Wide range of applications'
            ]
          },
          {
            type: 'code',
            language: 'python',
            code: '# Your first Python program\nprint("Hello, World!")\n\n# Variables and basic operations\nname = "Python"\nversion = 3.9\nprint(f"Welcome to {name} {version}!")'
          },
          {
            type: 'note',
            text: 'Python uses indentation to define code blocks, making it more readable than languages that use braces or keywords.'
          }
        ],
        duration: '20 minutes',
        difficulty: 'Beginner',
        practiceCode: '# Write your first Python program\n\n# 1. Print a welcome message\nprint("Welcome to Python!")\n\n# 2. Create variables for your name and age\nname = "Your Name"\nage = 25\n\n# 3. Print a message using your variables\nprint(f"My name is {name} and I am {age} years old.")\n\n# 4. Try some basic math\nx = 10\ny = 5\nprint(f"Sum: {x + y}")\nprint(f"Difference: {x - y}")\nprint(f"Product: {x * y}")\nprint(f"Quotient: {x / y}")'
      },
      {
        id: 'python-variables',
        title: 'Variables and Data Types',
        content: [
          {
            type: 'paragraph',
            text: 'Variables in Python are containers for storing data values. Python has several built-in data types that are used to store different types of data.'
          },
          {
            type: 'heading',
            text: 'Basic Data Types'
          },
          {
            type: 'list',
            items: [
              'Numbers (int, float)',
              'Strings (str)',
              'Booleans (bool)',
              'Lists',
              'Tuples',
              'Dictionaries'
            ]
          },
          {
            type: 'code',
            language: 'python',
            code: '# Numbers\nage = 25          # integer\nheight = 1.75     # float\n\n# Strings\nname = "Python"   # string\n\n# Boolean\nis_student = True\n\n# List\nfruits = ["apple", "banana", "orange"]\n\n# Tuple\ncoordinates = (10, 20)\n\n# Dictionary\nperson = {\n    "name": "John",\n    "age": 30,\n    "city": "New York"\n}'
          }
        ],
        duration: '25 minutes',
        difficulty: 'Beginner',
        practiceCode: '# Practice with variables and data types\n\n# 1. Create variables of different types\nname = "Your Name"\nage = 25\nheight = 1.75\nis_student = True\n\n# 2. Create a list of your favorite movies\nmovies = ["Movie 1", "Movie 2", "Movie 3"]\n\n# 3. Create a tuple with your coordinates\nlocation = (40.7128, -74.0060)\n\n# 4. Create a dictionary with your information\nmy_info = {\n    "name": name,\n    "age": age,\n    "height": height,\n    "is_student": is_student,\n    "favorite_movies": movies,\n    "location": location\n}\n\n# 5. Print all the information\nprint("My Information:")\nfor key, value in my_info.items():\n    print(f"{key}: {value}")'
      },
      {
        id: 'python-control',
        title: 'Control Flow and Loops',
        content: [
          {
            type: 'paragraph',
            text: 'Control flow statements and loops allow you to control the execution of your code based on conditions and repeat operations.'
          },
          {
            type: 'heading',
            text: 'Control Flow Statements'
          },
          {
            type: 'list',
            items: [
              'if-elif-else statements',
              'for loops',
              'while loops',
              'break and continue',
              'try-except blocks'
            ]
          },
          {
            type: 'code',
            language: 'python',
            code: '# If-else statement\nage = 18\nif age >= 18:\n    print("You are an adult")\nelse:\n    print("You are a minor")\n\n# For loop\nfruits = ["apple", "banana", "orange"]\nfor fruit in fruits:\n    print(fruit)\n\n# While loop\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1'
          }
        ],
        duration: '30 minutes',
        difficulty: 'Beginner',
        practiceCode: '# Practice with control flow and loops\n\n# 1. Create a number guessing game\nimport random\n\n# Generate a random number between 1 and 100\nsecret_number = random.randint(1, 100)\nattempts = 0\nmax_attempts = 5\n\nprint("Welcome to the Number Guessing Game!")\nprint(f"I\'m thinking of a number between 1 and 100. You have {max_attempts} attempts.")\n\nwhile attempts < max_attempts:\n    try:\n        # Get user\'s guess\n        guess = int(input("Enter your guess: "))\n        attempts += 1\n        \n        # Check the guess\n        if guess < secret_number:\n            print("Too low!")\n        elif guess > secret_number:\n            print("Too high!")\n        else:\n            print(f"Congratulations! You guessed it in {attempts} attempts!")\n            break\n        \n        # Show remaining attempts\n        if attempts < max_attempts:\n            print(f"Attempts remaining: {max_attempts - attempts}")\n        \n    except ValueError:\n        print("Please enter a valid number!")\n        continue\n\nif attempts == max_attempts and guess != secret_number:\n    print(f"Game over! The number was {secret_number}.")'
      },
      {
        id: 'python-functions',
        title: 'Functions and Modules',
        content: [
          {
            type: 'paragraph',
            text: 'Functions are blocks of reusable code that perform specific tasks. Modules are files containing Python code that can be imported and used in other programs.'
          },
          {
            type: 'heading',
            text: 'Function Basics'
          },
          {
            type: 'list',
            items: [
              'Function definition and calling',
              'Parameters and arguments',
              'Return values',
              'Default parameters',
              'Lambda functions'
            ]
          },
          {
            type: 'code',
            language: 'python',
            code: '# Basic function\ndef greet(name):\n    return f"Hello, {name}!"\n\n# Function with default parameter\ndef calculate_area(length, width=10):\n    return length * width\n\n# Lambda function\nsquare = lambda x: x ** 2\n\n# Using the functions\nprint(greet("Python"))\nprint(calculate_area(5))  # Uses default width\nprint(calculate_area(5, 20))  # Specifies width\nprint(square(4))'
          }
        ],
        duration: '30 minutes',
        difficulty: 'Intermediate',
        practiceCode: '# Practice with functions\n\n# 1. Create a function to calculate BMI\ndef calculate_bmi(weight, height):\n    return weight / (height ** 2)\n\n# 2. Create a function to check if a number is prime\ndef is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n ** 0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\n# 3. Create a function to generate Fibonacci sequence\ndef fibonacci(n):\n    sequence = [0, 1]\n    while len(sequence) < n:\n        sequence.append(sequence[-1] + sequence[-2])\n    return sequence\n\n# Test the functions\nweight = 70  # kg\nheight = 1.75  # meters\nprint(f"BMI: {calculate_bmi(weight, height):.2f}")\n\nnumber = 17\nprint(f"Is {number} prime? {is_prime(number)}")\n\nfib_sequence = fibonacci(10)\nprint(f"Fibonacci sequence: {fib_sequence}")'
      },
      {
        id: 'python-oop',
        title: 'Object-Oriented Programming',
        content: [
          {
            type: 'paragraph',
            text: 'Object-Oriented Programming (OOP) is a programming paradigm that uses objects to organize code. Python supports OOP through classes and objects.'
          },
          {
            type: 'heading',
            text: 'OOP Concepts'
          },
          {
            type: 'list',
            items: [
              'Classes and Objects',
              'Inheritance',
              'Encapsulation',
              'Polymorphism',
              'Method overriding'
            ]
          },
          {
            type: 'code',
            language: 'python',
            code: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n    \n    def speak(self):\n        pass\n\nclass Dog(Animal):\n    def speak(self):\n        return f"{self.name} says Woof!"\n\nclass Cat(Animal):\n    def speak(self):\n        return f"{self.name} says Meow!"\n\n# Create objects\ndog = Dog("Buddy")\ncat = Cat("Whiskers")\n\nprint(dog.speak())\nprint(cat.speak())'
          }
        ],
        duration: '35 minutes',
        difficulty: 'Intermediate',
        practiceCode: '# Practice with Object-Oriented Programming\n\n# 1. Create a BankAccount class\nclass BankAccount:\n    def __init__(self, account_number, owner_name, balance=0):\n        self.account_number = account_number\n        self.owner_name = owner_name\n        self.balance = balance\n    \n    def deposit(self, amount):\n        if amount > 0:\n            self.balance += amount\n            return f"Deposited ${amount}. New balance: ${self.balance}"\n        return "Invalid deposit amount"\n    \n    def withdraw(self, amount):\n        if 0 < amount <= self.balance:\n            self.balance -= amount\n            return f"Withdrawn ${amount}. New balance: ${self.balance}"\n        return "Invalid withdrawal amount"\n    \n    def get_balance(self):\n        return f"Current balance: ${self.balance}"\n\n# 2. Create a SavingsAccount class that inherits from BankAccount\nclass SavingsAccount(BankAccount):\n    def __init__(self, account_number, owner_name, balance=0, interest_rate=0.01):\n        super().__init__(account_number, owner_name, balance)\n        self.interest_rate = interest_rate\n    \n    def add_interest(self):\n        interest = self.balance * self.interest_rate\n        self.balance += interest\n        return f"Interest added: ${interest:.2f}. New balance: ${self.balance}"\n\n# Test the classes\naccount = BankAccount("12345", "John Doe", 1000)\nprint(account.deposit(500))\nprint(account.withdraw(200))\nprint(account.get_balance())\n\nsavings = SavingsAccount("67890", "Jane Smith", 2000, 0.02)\nprint(savings.add_interest())\nprint(savings.get_balance())'
      },
      {
        id: 'python-datastructures',
        title: 'Data Structures (Lists, Tuples, Dictionaries, Sets)',
        content: [
          {
            type: 'paragraph',
            text: 'Python has several built-in data structures that are used to store collections of data. Understanding these is crucial for efficient programming.'
          },
          {
            type: 'heading',
            text: 'Lists'
          },
          {
            type: 'paragraph',
            text: 'Lists are ordered, mutable collections. They can hold items of different data types.'
          },
          {
            type: 'code',
            language: 'python',
            code: 'my_list = [1, "hello", 3.14, True]\nprint(my_list[0])      # Accessing elements\nmy_list.append(False)  # Modifying lists\nprint(my_list)'
          },
          {
            type: 'heading',
            text: 'Tuples'
          },
          {
            type: 'paragraph',
            text: 'Tuples are ordered, immutable collections. They are often used for fixed collections of items.'
          },
          {
            type: 'code',
            language: 'python',
            code: 'my_tuple = (1, "hello", 3.14)\nprint(my_tuple[1])     # Accessing elements\n# my_tuple.append(False) # This would cause an error - tuples are immutable'
          },
          {
            type: 'heading',
            text: 'Dictionaries'
          },
          {
            type: 'paragraph',
            text: 'Dictionaries are unordered, mutable collections of key-value pairs. Keys must be unique and immutable.'
          },
          {
            type: 'code',
            language: 'python',
            code: 'my_dict = {\"name\": \"Alice\", \"age\": 30}\nprint(my_dict[\"name\"])   # Accessing values\nmy_dict[\"city\"] = \"New York\" # Adding/modifying entries\nprint(my_dict)'
          },
           {
            type: 'heading',
            text: 'Sets'
          },
          {
            type: 'paragraph',
            text: 'Sets are unordered, mutable collections of unique elements. They are useful for operations like membership testing, eliminating duplicates, and set math.'
          },
          {
            type: 'code',
            language: 'python',
            code: 'my_set = {1, 2, 3, 2, 1} # Duplicates are automatically removed\nprint(my_set)\nmy_set.add(4)\nprint(my_set)'
          }
        ],
        duration: '40 minutes',
        difficulty: 'Intermediate',
        practiceCode: '# Practice with Data Structures\n\n# 1. Create a list of your favorite fruits.\nfavorite_fruits = [\"apple\", \"banana\", \"cherry\"]\n\n# 2. Add a new fruit to the list.\nfavorite_fruits.append(\"date\")\n\n# 3. Print the list.\nprint(\"Favorite Fruits:\", favorite_fruits)\n\n# 4. Create a dictionary representing a person (name, age, city).\nperson = {\n    \"name\": \"Bob\",\n    \"age\": 28,\n    \"city\": \"London\"\n}\n\n# 5. Access and print the person\'s age.\nprint(\"Bob\'s Age:\", person[\"age\"])\n\n# 6. Add a new key-value pair to the dictionary (e.g., occupation).\nperson[\"occupation\"] = \"Engineer\"\n\n# 7. Print the updated dictionary.\nprint(\"Updated Person Info:\", person)\n\n# 8. Create a set of unique numbers from a list with duplicates.\nnumbers_with_duplicates = [1, 2, 2, 3, 4, 4, 5]\nunique_numbers = set(numbers_with_duplicates)\n\n# 9. Print the set.\nprint(\"Unique Numbers:\", unique_numbers)'
      },
      {
        id: 'python-errorhandling',
        title: 'Error Handling (Try-Except)',
        content: [
          {
            type: 'paragraph',
            text: 'Error handling is crucial for writing robust code that can gracefully handle unexpected situations without crashing.'
          },
          {
            type: 'heading',
            text: 'Exceptions'
          },
          {
            type: 'paragraph',
            text: 'Errors detected during execution are called exceptions. Python has many built-in exceptions (e.g., `ValueError`, `TypeError`, `FileNotFoundError`, `ZeroDivisionError`).'
          },
          {
            type: 'heading',
            text: 'The Try-Except Block'
          },
          {
            type: 'paragraph',
            text: 'The `try` block lets you test a block of code for errors. The `except` block lets you handle the error.'
          },
          {
            type: 'code',
            language: 'python',
            code: 'try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print(\"Cannot divide by zero!\")\n\nprint(\"Program continues after error handling.\")\n\ntry:\n    num = int(\"abc\")\nexcept ValueError:\n    print(\"Invalid conversion to integer!\")\n'
          },
           {
            type: 'heading',
            text: 'Finally Block'
          },
          {
            type: 'paragraph',
            text: 'The `finally` block, if specified, will be executed regardless of whether the try block raises an error or not.'
          },
          {
            type: 'code',
            language: 'python',
            code: 'try:\n    f = open(\"mydemofile.txt\")\n    try:\n        f.write(\"Lorum Ipsum\")\n    except:\n        print(\"Something went wrong when writing to the file\")\n    finally:\n        f.close()\nexcept:\n    print(\"Something went wrong when opening the file\")'
          }
        ],
        duration: '30 minutes',
        difficulty: 'Intermediate',
        practiceCode: '# Practice with Error Handling\n\n# 1. Write a function that takes two numbers and returns their division.\n#    Use a try-except block to handle the case where the second number is zero.\ndef safe_division(numerator, denominator):\n    try:\n        result = numerator / denominator\n        return result\n    except ZeroDivisionError:\n        return \"Error: Cannot divide by zero!\"\n\n# Test the function with valid input\nprint(safe_division(10, 2))\n\n# Test the function with zero as denominator\nprint(safe_division(10, 0))\n\n# 2. Write a program that tries to open and read a file named \"non_existent_file.txt\".\n#    Use a try-except block to catch the FileNotFoundError.\ntry:\n    with open(\"non_existent_file.txt\", \"r\") as file:\n        content = file.read()\n        print(content)\nexcept FileNotFoundError:\n    print(\"Error: The file was not found.\")\nexcept Exception as e:\n    print(f\"An unexpected error occurred: {e}\")\n'
      },
      {
        id: 'python-filehandling',
        title: 'File Handling',
        content: [
          {
            type: 'paragraph',
            text: 'File handling is an essential part of any programming language, allowing you to interact with files on your computer system. Python provides built-in functions to read from and write to files.'
          },
          {
            type: 'heading',
            text: 'Opening and Closing Files'
          },
          {
            type: 'paragraph',
            text: 'You use the `open()` function to open a file. It returns a file object, which has methods for reading and writing. The `close()` method closes the file.'
          },
          {
            type: 'code',
            language: 'python',
            code: '# Open a file in read mode (\'r\')\nfile = open(\'myfile.txt\', \'r\')\nprint(file.read()) # Read the entire file\nfile.close() # Close the file\n\n# Open a file in write mode (\'w\')\nfile = open(\'mynewfile.txt\', \'w\')\nfile.write(\'Hello, world!\')\nfile.close()\n\n# Using \'with open()\' (recommended)\nwith open(\'anotherfile.txt\', \'w\') as file:\n    file.write(\'This is a more Pythonic way.\')\n# File is automatically closed outside the block.'
          },
           {
            type: 'heading',
            text: 'Reading Modes'
          },
          {
            type: 'list',
            items: [
              '\'r\': Read mode (default)',
              '\'w\': Write mode (creates a new file or truncates existing)',
              '\'a\': Append mode (adds to the end of the file)',
              '\'x\': Exclusive creation (fails if file exists)',
              '\'t\': Text mode (default)',
              '\'b\': Binary mode'
            ]
          },
           {
            type: 'heading',
            text: 'Reading and Writing'
          },
          {
            type: 'code',
            language: 'python',
            code: 'with open(\'example.txt\', \'w\') as f:\\n    f.write(\'First line.\\n\')\\n    f.write(\'Second line.\\n\')\\n\\nwith open(\'example.txt\', \'r\') as f:\\n    print(\'Reading line by line:\')\\n    for line in f:\\n        print(line.strip())\\n\\nwith open(\'example.txt\', \'r\') as f:\\n    content = f.read() # Read all content\\n    print(\'\\nReading all at once:\')\\n    print(content)'
          }
        ],
        duration: '35 minutes',
        difficulty: 'Intermediate',
        practiceCode: '# Practice with File Handling\n\n# 1. Write some content to a new file named \"my_practice_file.txt\".\nfile_content = \"This is the first line.\nThis is the second line.\"\nwith open(\"my_practice_file.txt\", \"w\") as f:\n    f.write(file_content)\n\n# Print a confirmation message\nprint(\"Content written to my_practice_file.txt\")\n\n# 2. Read the content back from \"my_practice_file.txt\" and print it.\nprint(\"\nReading from my_practice_file.txt:\")\nwith open(\"my_practice_file.txt\", \"r\") as f:\n    read_content = f.read()\n    print(read_content)\n\n# 3. Append a new line to the file and read it again.\nnew_line = \"This line was appended.\"\nwith open(\"my_practice_file.txt\", \"a\") as f:\n    f.write(\"\n\" + new_line)\n\nprint(\"\nContent after appending:\")\nwith open(\"my_practice_file.txt\", \"r\") as f:\n    appended_content = f.read()\n    print(appended_content)'
      }
    ],
    quiz: [
      {
        question: 'What is Python?',
        options: [
          'A snake species',
          'A programming language',
          'A web browser',
          'An operating system'
        ],
        correctAnswer: 1
      },
      {
        question: 'Which of the following is NOT a Python data type?',
        options: [
          'List',
          'Dictionary',
          'Array',
          'Tuple'
        ],
        correctAnswer: 2
      },
      {
        question: 'What is the correct way to create a function in Python?',
        options: [
          'function myFunction():',
          'def myFunction():',
          'create myFunction():',
          'void myFunction():'
        ],
        correctAnswer: 1
      },
      {
        question: 'Which symbol is used for comments in Python?',
        options: [
          '//',
          '/* */',
          '#',
          '--'
        ],
        correctAnswer: 2
      },
      {
        question: 'What is the output of print(type(1/2))?',
        options: [
          '<class \'int\'>',
          '<class \'float\'>',
          '<class \'number\'>',
          '<class \'decimal\'>'
        ],
        correctAnswer: 1
      }
    ]
  }
]; 