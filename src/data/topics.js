export const topics = [
  {
    id: 'html',
    title: 'HTML',
    description: 'Learn the structure and markup of web pages',
    icon: '🌐',
    color: '#e34c26',
    difficulty: 'Beginner',
    estimatedTime: '4 hours',
    lessons: [
      {
        id: 'html-intro',
        title: 'HTML Introduction',
        description: 'What is HTML and how it works',
        duration: '15 min',
        difficulty: 'Beginner',
        content: [
          {
            type: 'paragraph',
            text: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using markup.'
          },
          {
            type: 'heading',
            text: 'What is HTML?'
          },
          {
            type: 'list',
            items: [
              'HTML stands for Hyper Text Markup Language',
              'HTML is the standard markup language for creating Web pages',
              'HTML describes the structure of a Web page',
              'HTML consists of a series of elements',
              'HTML elements tell the browser how to display the content'
            ]
          },
          {
            type: 'code',
            language: 'html',
            code: `<!DOCTYPE html>
<html>
<head>
    <title>My First HTML Page</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>This is my first HTML page.</p>
</body>
</html>`
          }
        ],
        practiceCode: `<!DOCTYPE html>
<html>
<head>
    <title>My Practice Page</title>
</head>
<body>
    <h1>Welcome to HTML!</h1>
    <p>Edit this code to practice HTML.</p>
</body>
</html>`
      },
      {
        id: 'html-elements',
        title: 'HTML Elements',
        description: 'Understanding HTML elements and tags',
        duration: '20 min',
        difficulty: 'Beginner',
        content: [
          {
            type: 'paragraph',
            text: 'An HTML element is defined by a start tag, some content, and an end tag.'
          },
          {
            type: 'code',
            language: 'html',
            code: `<tagname>Content goes here...</tagname>`
          },
          {
            type: 'heading',
            text: 'Common HTML Elements'
          },
          {
            type: 'code',
            language: 'html',
            code: `<h1>This is a heading</h1>
<p>This is a paragraph.</p>
<a href="https://example.com">This is a link</a>
<img src="image.jpg" alt="This is an image">
<br> <!-- This is a line break -->
<hr> <!-- This is a horizontal rule -->`
          }
        ],
        practiceCode: `<!DOCTYPE html>
<html>
<body>
    <h1>Main Heading</h1>
    <h2>Subheading</h2>
    <p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
    <a href="https://www.example.com">Visit Example.com</a>
    <br>
    <img src="https://via.placeholder.com/300x200" alt="Placeholder image">
</body>
</html>`
      },
      {
        id: 'html-forms',
        title: 'HTML Forms',
        description: 'Creating interactive forms',
        duration: '25 min',
        difficulty: 'Intermediate',
        content: [
          {
            type: 'paragraph',
            text: 'HTML forms are used to collect user input. The form element can contain various input elements like text fields, checkboxes, radio buttons, submit buttons, etc.'
          },
          {
            type: 'code',
            language: 'html',
            code: `<form action="/submit" method="post">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  
  <label for="message">Message:</label>
  <textarea id="message" name="message" rows="4" cols="50"></textarea>
  
  <input type="submit" value="Submit">
</form>`
          }
        ],
        practiceCode: `<!DOCTYPE html>
<html>
<body>
    <h2>Contact Form</h2>
    <form>
        <label for="fname">First Name:</label><br>
        <input type="text" id="fname" name="fname"><br><br>
        
        <label for="lname">Last Name:</label><br>
        <input type="text" id="lname" name="lname"><br><br>
        
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email"><br><br>
        
        <input type="submit" value="Submit">
    </form>
</body>
</html>`
      }
    ],
    quiz: [
      {
        id: 'html-q1',
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup Language',
          'Hyperlink and Text Markup Language'
        ],
        correctAnswer: 'Hyper Text Markup Language'
      },
      {
        id: 'html-q2',
        question: 'Which HTML element is used for the largest heading?',
        options: ['<h6>', '<h1>', '<heading>', '<head>'],
        correctAnswer: '<h1>'
      },
      {
        id: 'html-q3',
        question: 'What is the correct HTML element for inserting a line break?',
        options: ['<break>', '<br>', '<lb>', '<newline>'],
        correctAnswer: '<br>'
      }
    ]
  },
  {
    id: 'css',
    title: 'CSS',
    description: 'Style and design your web pages',
    icon: '🎨',
    color: '#1572b6',
    difficulty: 'Beginner',
    estimatedTime: '5 hours',
    lessons: [
      {
        id: 'css-intro',
        title: 'CSS Introduction',
        description: 'What is CSS and how to use it',
        duration: '15 min',
        difficulty: 'Beginner',
        content: [
          {
            type: 'paragraph',
            text: 'CSS (Cascading Style Sheets) is used to style and layout web pages. It can control the color, font, size, spacing, and positioning of HTML elements.'
          },
          {
            type: 'heading',
            text: 'CSS Syntax'
          },
          {
            type: 'code',
            language: 'css',
            code: `selector {
  property: value;
  property: value;
}`
          },
          {
            type: 'heading',
            text: 'Example'
          },
          {
            type: 'code',
            language: 'css',
            code: `h1 {
  color: blue;
  font-size: 24px;
  text-align: center;
}

p {
  color: red;
  font-family: Arial, sans-serif;
}`
          }
        ],
        practiceCode: `body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #333;
  text-align: center;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.highlight {
  background-color: yellow;
  padding: 5px;
}`
      },
      {
        id: 'css-selectors',
        title: 'CSS Selectors',
        description: 'Different ways to select HTML elements',
        duration: '20 min',
        difficulty: 'Beginner',
        content: [
          {
            type: 'paragraph',
            text: 'CSS selectors are used to select the HTML elements you want to style.'
          },
          {
            type: 'heading',
            text: 'Types of Selectors'
          },
          {
            type: 'code',
            language: 'css',
            code: `/* Element Selector */
p {
  color: blue;
}

/* Class Selector */
.my-class {
  font-size: 18px;
}

/* ID Selector */
#my-id {
  background-color: yellow;
}

/* Attribute Selector */
input[type="text"] {
  border: 1px solid #ccc;
}

/* Descendant Selector */
div p {
  margin: 10px;
}`
          }
        ],
        practiceCode: `/* Try different selectors */
h1 {
  color: navy;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

#header {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
}

.btn {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}`
      },
      {
        id: 'css-flexbox',
        title: 'CSS Flexbox',
        description: 'Modern layout with Flexbox',
        duration: '30 min',
        difficulty: 'Intermediate',
        content: [
          {
            type: 'paragraph',
            text: 'Flexbox is a powerful layout method that allows you to arrange elements in rows or columns, with flexible sizing and alignment options.'
          },
          {
            type: 'code',
            language: 'css',
            code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.flex-item {
  flex: 1;
  padding: 20px;
  margin: 10px;
  background-color: #f0f0f0;
}`
          }
        ],
        practiceCode: `.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f1f1f1;
  padding: 20px;
}

.flex-item {
  background-color: #007bff;
  color: white;
  padding: 20px;
  margin: 5px;
  text-align: center;
  flex: 1;
}

.flex-item:nth-child(2) {
  flex: 2;
}`
      }
    ],
    quiz: [
      {
        id: 'css-q1',
        question: 'What does CSS stand for?',
        options: [
          'Cascading Style Sheets',
          'Computer Style Sheets',
          'Creative Style Sheets',
          'Colorful Style Sheets'
        ],
        correctAnswer: 'Cascading Style Sheets'
      },
      {
        id: 'css-q2',
        question: 'Which CSS property is used to change the text color?',
        options: ['text-color', 'color', 'font-color', 'text-style'],
        correctAnswer: 'color'
      },
      {
        id: 'css-q3',
        question: 'How do you select an element with id "demo"?',
        options: ['.demo', '#demo', 'demo', '*demo'],
        correctAnswer: '#demo'
      }
    ]
  },
  {
    id: 'js',
    title: 'JavaScript',
    description: 'Add interactivity to your web pages',
    icon: '⚡',
    color: '#f7df1e',
    difficulty: 'Intermediate',
    estimatedTime: '8 hours',
    lessons: [
      {
        id: 'js-intro',
        title: 'JavaScript Introduction',
        description: 'Getting started with JavaScript',
        duration: '20 min',
        difficulty: 'Beginner',
        content: [
          {
            type: 'paragraph',
            text: 'JavaScript is a programming language that enables interactive web pages. It is an essential part of web applications alongside HTML and CSS.'
          },
          {
            type: 'heading',
            text: 'Your First JavaScript'
          },
          {
            type: 'code',
            language: 'javascript',
            code: `// This is a comment
console.log("Hello, World!");

// Variables
let name = "John";
const age = 25;
var city = "New York";

// Function
function greet(person) {
    return "Hello, " + person + "!";
}

console.log(greet(name));`
          }
        ],
        practiceCode: `// Try JavaScript here
console.log("Welcome to JavaScript!");

let message = "Hello World";
console.log(message);

function addNumbers(a, b) {
    return a + b;
}

let result = addNumbers(5, 3);
console.log("5 + 3 = " + result);

// Change the content of an element
document.getElementById("output").innerHTML = "JavaScript is working!";`
      },
      {
        id: 'js-variables',
        title: 'JavaScript Variables',
        description: 'Working with variables and data types',
        duration: '25 min',
        difficulty: 'Beginner',
        content: [
          {
            type: 'paragraph',
            text: 'Variables are containers for storing data values. In JavaScript, you can declare variables using var, let, or const.'
          },
          {
            type: 'code',
            language: 'javascript',
            code: `// Different ways to declare variables
var x = 5;        // Function scoped
let y = 10;       // Block scoped
const z = 15;     // Block scoped, cannot be reassigned

// Data types
let name = "John";           // String
let age = 25;                // Number
let isStudent = true;        // Boolean
let hobbies = ["reading", "coding"];  // Array
let person = {               // Object
    firstName: "John",
    lastName: "Doe"
};`
          }
        ],
        practiceCode: `// Practice with variables
let firstName = "Alice";
let lastName = "Johnson";
let age = 28;
let isEmployed = true;

console.log("Name: " + firstName + " " + lastName);
console.log("Age: " + age);
console.log("Employed: " + isEmployed);

// Arrays
let colors = ["red", "green", "blue"];
console.log("First color: " + colors[0]);

// Objects
let car = {
    brand: "Toyota",
    model: "Camry",
    year: 2022
};
console.log("Car: " + car.brand + " " + car.model);`
      },
      {
        id: 'js-functions',
        title: 'JavaScript Functions',
        description: 'Creating and using functions',
        duration: '30 min',
        difficulty: 'Intermediate',
        content: [
          {
            type: 'paragraph',
            text: 'Functions are blocks of code designed to perform particular tasks. They are executed when called (invoked).'
          },
          {
            type: 'code',
            language: 'javascript',
            code: `// Function declaration
function calculateArea(width, height) {
    return width * height;
}

// Function expression
const multiply = function(a, b) {
    return a * b;
};

// Arrow function
const divide = (a, b) => {
    return a / b;
};

// Short arrow function
const square = x => x * x;

// Using functions
console.log(calculateArea(5, 3));
console.log(multiply(4, 7));
console.log(divide(10, 2));
console.log(square(6));`
          }
        ],
        practiceCode: `// Practice with functions
function greetUser(name, timeOfDay) {
    return "Good " + timeOfDay + ", " + name + "!";
}

const calculateCircleArea = (radius) => {
    return Math.PI * radius * radius;
};

function isEven(number) {
    return number % 2 === 0;
}

// Test the functions
console.log(greetUser("Sarah", "morning"));
console.log("Circle area: " + calculateCircleArea(5).toFixed(2));
console.log("Is 8 even? " + isEven(8));
console.log("Is 7 even? " + isEven(7));`
      }
    ],
    quiz: [
      {
        id: 'js-q1',
        question: 'Which of the following is the correct way to declare a variable in JavaScript?',
        options: ['variable x = 5;', 'let x = 5;', 'v x = 5;', 'declare x = 5;'],
        correctAnswer: 'let x = 5;'
      },
      {
        id: 'js-q2',
        question: 'What will console.log(typeof "Hello") output?',
        options: ['string', 'text', 'String', 'undefined'],
        correctAnswer: 'string'
      },
      {
        id: 'js-q3',
        question: 'Which method is used to add an element to the end of an array?',
        options: ['add()', 'append()', 'push()', 'insert()'],
        correctAnswer: 'push()'
      }
    ]
  },
  {
    id: 'python',
    title: 'Python',
    description: 'Learn Python programming fundamentals',
    icon: '🐍',
    color: '#3776ab',
    difficulty: 'Beginner',
    estimatedTime: '6 hours',
    lessons: [
      {
        id: 'python-intro',
        title: 'Python Introduction',
        description: 'Getting started with Python',
        duration: '20 min',
        difficulty: 'Beginner',
        content: [
          {
            type: 'paragraph',
            text: 'Python is a high-level, interpreted programming language known for its simplicity and readability. It\'s great for beginners and powerful for experts.'
          },
          {
            type: 'heading',
            text: 'Your First Python Program'
          },
          {
            type: 'code',
            language: 'python',
            code: `# This is a comment
print("Hello, World!")

# Variables
name = "Alice"
age = 25
height = 5.6

# Print variables
print("Name:", name)
print("Age:", age)
print("Height:", height)

# Simple calculation
result = age * 2
print("Double the age:", result)`
          }
        ],
        practiceCode: `# Welcome to Python!
print("Hello, Python World!")

# Variables and data types
student_name = "John Doe"
student_age = 20
student_gpa = 3.75
is_enrolled = True

print("Student Information:")
print("Name:", student_name)
print("Age:", student_age)
print("GPA:", student_gpa)
print("Enrolled:", is_enrolled)

# Simple math
x = 10
y = 3
print("Addition:", x + y)
print("Subtraction:", x - y)
print("Multiplication:", x * y)
print("Division:", x / y)`
      },
      {
        id: 'python-data-types',
        title: 'Python Data Types',
        description: 'Understanding Python data types',
        duration: '25 min',
        difficulty: 'Beginner',
        content: [
          {
            type: 'paragraph',
            text: 'Python has several built-in data types including numbers, strings, lists, tuples, dictionaries, and sets.'
          },
          {
            type: 'code',
            language: 'python',
            code: `# Numbers
integer_num = 42
float_num = 3.14
complex_num = 2 + 3j

# Strings
text = "Hello, Python!"
multiline = """This is a
multiline string"""

# Lists (mutable)
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]

# Tuples (immutable)
coordinates = (10, 20)
colors = ("red", "green", "blue")

# Dictionaries
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}

# Sets
unique_numbers = {1, 2, 3, 4, 5}

print(type(integer_num))
print(type(fruits))
print(type(person))`
          }
        ],
        practiceCode: `# Practice with Python data types

# Working with strings
greeting = "Hello"
name = "World"
full_greeting = greeting + ", " + name + "!"
print(full_greeting)
print("Length of greeting:", len(full_greeting))

# Working with lists
shopping_list = ["milk", "bread", "eggs", "butter"]
print("Shopping list:", shopping_list)
shopping_list.append("cheese")
print("Updated list:", shopping_list)
print("First item:", shopping_list[0])

# Working with dictionaries
book = {
    "title": "Python Programming",
    "author": "John Smith",
    "pages": 350,
    "published": 2023
}
print("Book info:", book)
print("Title:", book["title"])
print("Pages:", book["pages"])

# Working with numbers
price = 29.99
quantity = 3
total = price * quantity
print("Total cost: {:.2f}".format(total))`
      },
      {
        id: 'python-functions',
        title: 'Python Functions',
        description: 'Creating and using functions in Python',
        duration: '30 min',
        difficulty: 'Intermediate',
        content: [
          {
            type: 'paragraph',
            text: 'Functions in Python are defined using the def keyword. They help organize code and make it reusable.'
          },
          {
            type: 'code',
            language: 'python',
            code: `# Basic function
def greet(name):
    return f"Hello, {name}!"

# Function with default parameter
def introduce(name, age=25):
    return f"Hi, I'm {name} and I'm {age} years old."

# Function with multiple parameters
def calculate_area(length, width):
    area = length * width
    return area

# Function with variable arguments
def sum_numbers(*args):
    total = 0
    for num in args:
        total += num
    return total

# Using functions
print(greet("Alice"))
print(introduce("Bob"))
print(introduce("Charlie", 30))
print("Area:", calculate_area(5, 3))
print("Sum:", sum_numbers(1, 2, 3, 4, 5))`
          }
        ],
        practiceCode: `# Practice with Python functions

def calculate_circle_area(radius):
    """Calculate the area of a circle given its radius."""
    import math
    return math.pi * radius ** 2

def is_even(number):
    """Check if a number is even."""
    return number % 2 == 0

def get_grade(score):
    """Convert a numeric score to a letter grade."""
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

def factorial(n):
    """Calculate the factorial of a number."""
    if n <= 1:
        return 1
    else:
        return n * factorial(n - 1)

# Test the functions
print("Circle area (radius 5):", round(calculate_circle_area(5), 2))
print("Is 8 even?", is_even(8))
print("Is 7 even?", is_even(7))
print("Grade for 85:", get_grade(85))
print("Factorial of 5:", factorial(5))`
      }
    ],
    quiz: [
      {
        id: 'python-q1',
        question: 'Which of the following is the correct way to define a function in Python?',
        options: ['function myFunc():', 'def myFunc():', 'define myFunc():', 'func myFunc():'],
        correctAnswer: 'def myFunc():'
      },
      {
        id: 'python-q2',
        question: 'What is the output of print(type([1, 2, 3]))?',
        options: ['<class \'array\'>', '<class \'list\'>', '<class \'tuple\'>', '<class \'set\'>'],
        correctAnswer: '<class \'list\'>'
      },
      {
        id: 'python-q3',
        question: 'Which method is used to add an item to the end of a list?',
        options: ['add()', 'append()', 'insert()', 'push()'],
        correctAnswer: 'append()'
      }
    ]
  },
  {
    id: 'react',
    title: 'React.js',
    description: 'Build modern user interfaces with React',
    icon: '⚛️',
    color: '#61dafb',
    difficulty: 'Advanced',
    estimatedTime: '10 hours',
    lessons: [
      {
        id: 'react-intro',
        title: 'React Introduction',
        description: 'Getting started with React',
        duration: '25 min',
        difficulty: 'Intermediate',
        content: [
          {
            type: 'paragraph',
            text: 'React is a JavaScript library for building user interfaces. It lets you create reusable UI components and manage application state efficiently.'
          },
          {
            type: 'heading',
            text: 'Your First React Component'
          },
          {
            type: 'code',
            language: 'javascript',
            code: `import React from 'react';

// Functional Component
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Using the component
function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
      <Welcome name="Charlie" />
    </div>
  );
}

export default App;`
          }
        ],
        practiceCode: `import React from 'react';

// Create a simple greeting component
function Greeting({ name, age }) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>You are {age} years old.</p>
    </div>
  );
}

// Create a user card component
function UserCard({ user }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

// Main App component
function App() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' }
  ];

  return (
    <div>
      <h1>React Practice</h1>
      <Greeting name="React Developer" age={25} />
      <div>
        <h2>User List</h2>
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default App;`
      },
      {
        id: 'react-state',
        title: 'React State and Hooks',
        description: 'Managing component state with hooks',
        duration: '35 min',
        difficulty: 'Intermediate',
        content: [
          {
            type: 'paragraph',
            text: 'React hooks allow you to use state and other React features in functional components. useState is the most commonly used hook.'
          },
          {
            type: 'code',
            language: 'javascript',
            code: `import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // useEffect hook
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      
      <div>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <p>Hello, {name}!</p>
      </div>
    </div>
  );
}`
          }
        ],
        practiceCode: `import React, { useState } from 'react';

// Todo List Component
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;`
      }
    ],
    quiz: [
      {
        id: 'react-q1',
        question: 'What is JSX in React?',
        options: [
          'A JavaScript extension that allows HTML-like syntax',
          'A CSS framework',
          'A database query language',
          'A testing library'
        ],
        correctAnswer: 'A JavaScript extension that allows HTML-like syntax'
      },
      {
        id: 'react-q2',
        question: 'Which hook is used to manage state in functional components?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correctAnswer: 'useState'
      },
      {
        id: 'react-q3',
        question: 'What is the correct way to update state in React?',
        options: [
          'state.count = 5',
          'setState(5)',
          'setCount(5)',
          'updateState(5)'
        ],
        correctAnswer: 'setCount(5)'
      }
    ]
  }
];