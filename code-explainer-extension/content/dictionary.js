/**
 * CodeWord Explainer - Built-in Programming Dictionary
 * Contains definitions, explanations, examples, and documentation links
 * for 150+ common programming keywords, concepts, and paradigms.
 */

(function () {
  const DICTIONARY = {
    // ==========================================
    // JAVASCRIPT & TYPESCRIPT
    // ==========================================
    "async": {
      term: "async",
      category: "JavaScript / TS",
      summary: "Declares an asynchronous function that returns a Promise implicitly.",
      details: "The `async` keyword allows the use of `await` inside the function body to write asynchronous, non-blocking code that reads sequentially like synchronous code. It always wraps the return value in a resolved Promise.",
      example: "async function fetchUser(id) {\n  const res = await fetch(`/api/users/${id}`);\n  return await res.json();\n}",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function"
    },
    "await": {
      term: "await",
      category: "JavaScript / TS",
      summary: "Pauses execution of an async function until a Promise settles.",
      details: "Used exclusively inside `async` functions or at the top level of ES modules. It unwraps the resolved value of a Promise or throws an error if the Promise is rejected.",
      example: "try {\n  const data = await fetch('/api/data');\n  console.log(await data.json());\n} catch (err) {\n  console.error('Fetch failed:', err);\n}",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await"
    },
    "promise": {
      term: "Promise",
      category: "JavaScript / TS",
      summary: "An object representing the eventual completion or failure of an asynchronous operation.",
      details: "A Promise is in one of three states: pending, fulfilled, or rejected. Promises avoid callback hell by chaining handlers using `.then()`, `.catch()`, and `.finally()`, or by using `async/await`.",
      example: "const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\nawait delay(1000); // waits 1 second",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
    },
    "closure": {
      term: "Closure",
      category: "JavaScript / TS",
      summary: "A function bundled with references to its surrounding lexical environment.",
      details: "A closure gives an inner function access to an outer function's scope even after the outer function has finished executing. Crucial for data privacy, state encapsulation, and currying.",
      example: "function createCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst counter = createCounter();\ncounter(); // 1\ncounter(); // 2",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures"
    },
    "hoisting": {
      term: "Hoisting",
      category: "JavaScript / TS",
      summary: "JavaScript's behavior of moving declarations to the top of the current scope before execution.",
      details: "`var` declarations and function declarations are hoisted. However, `let` and `const` are hoisted into a 'Temporal Dead Zone' (TDZ) and cannot be accessed before declaration.",
      example: "console.log(x); // undefined (var hoisted)\nvar x = 5;\n\n// console.log(y); // ReferenceError: TDZ\nlet y = 10;",
      link: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting"
    },
    "const": {
      term: "const",
      category: "JavaScript / TS",
      summary: "Declares a block-scoped, read-only constant variable binding.",
      details: "The variable cannot be reassigned with `=` after initialization. Note: if the value is an object or array, its contents/properties can still be mutated.",
      example: "const MAX_LIMIT = 100;\nconst user = { name: 'Alice' };\nuser.name = 'Bob'; // Allowed (mutation)\n// user = {}; // TypeError (reassignment)",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const"
    },
    "let": {
      term: "let",
      category: "JavaScript / TS",
      summary: "Declares a reassignable, block-scoped local variable.",
      details: "Unlike `var` which is function-scoped, `let` is limited to the nearest enclosing block (`{ ... }`), preventing variable leakage outside loops and if-statements.",
      example: "for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100); // 0, 1, 2\n}",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let"
    },
    "event loop": {
      term: "Event Loop",
      category: "JavaScript / TS",
      summary: "The concurrency model enabling single-threaded JS to perform non-blocking I/O operations.",
      details: "Continuously monitors the Call Stack and Task Queues (Microtasks like Promises, Macrotasks like setTimeout). When the stack is empty, it pushes queued callbacks onto the stack for execution.",
      example: "console.log('1');\nsetTimeout(() => console.log('2'), 0); // Macrotask\nPromise.resolve().then(() => console.log('3')); // Microtask\nconsole.log('4');\n// Output order: 1, 4, 3, 2",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop"
    },
    "prototype": {
      term: "Prototype",
      category: "JavaScript / TS",
      summary: "The mechanism by which JavaScript objects inherit features and properties from one another.",
      details: "Every JS object has a private prototype property (`[[Prototype]]`). When accessing a property, JS walks up the prototype chain until it finds the property or reaches `null`.",
      example: "const animal = { speaks: true };\nconst dog = Object.create(animal);\nconsole.log(dog.speaks); // true (inherited)",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain"
    },
    "destructuring": {
      term: "Destructuring",
      category: "JavaScript / TS",
      summary: "A syntax that allows unpacking values from arrays or properties from objects into distinct variables.",
      details: "Greatly simplifies reading nested properties and function parameters, supporting default values and variable renaming.",
      example: "const user = { name: 'Sarah', age: 28 };\nconst { name, age, role = 'Guest' } = user;\nconst [first, ...rest] = [10, 20, 30];",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment"
    },
    "callback": {
      term: "Callback",
      category: "JavaScript / TS",
      summary: "A function passed as an argument to another function to be invoked later.",
      details: "Can be synchronous (e.g., in `Array.map`) or asynchronous (e.g., event listeners or `setTimeout`). Deep nesting of async callbacks leads to 'Callback Hell'.",
      example: "function greeting(name, callback) {\n  callback(`Hello, ${name}!`);\n}\ngreeting('Alex', (msg) => console.log(msg));",
      link: "https://developer.mozilla.org/en-US/docs/Glossary/Callback_function"
    },
    "currying": {
      term: "Currying",
      category: "Functional Programming",
      summary: "Transforming a function that takes multiple arguments into a sequence of functions each taking a single argument.",
      details: "Allows partial application of functions and facilitates creating specialized utility functions and composition pipelines.",
      example: "const multiply = (a) => (b) => a * b;\nconst double = multiply(2);\nconsole.log(double(5)); // 10",
      link: "https://en.wikipedia.org/wiki/Currying"
    },
    "debounce": {
      term: "Debounce",
      category: "Web Development",
      summary: "Limits the execution rate of a function by delaying execution until a period of inactivity passes.",
      details: "Commonly used for search input auto-complete, window resizing, or scroll events to avoid firing expensive functions on every keystroke or frame.",
      example: "function debounce(fn, delay = 300) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}",
      link: "https://css-tricks.com/debouncing-throttling-explained-examples/"
    },
    "throttle": {
      term: "Throttle",
      category: "Web Development",
      summary: "Ensures a function is called at most once within a specified time window.",
      details: "Unlike debounce (which resets on each event), throttle guarantees regular execution at fixed time intervals during continuous events like scrolling or mouse movement.",
      example: "function throttle(fn, limit = 200) {\n  let waiting = false;\n  return (...args) => {\n    if (!waiting) {\n      fn(...args);\n      waiting = true;\n      setTimeout(() => waiting = false, limit);\n    }\n  };\n}",
      link: "https://css-tricks.com/debouncing-throttling-explained-examples/"
    },
    "generics": {
      term: "Generics",
      category: "TypeScript / Core",
      summary: "Allows writing reusable code components that work over a variety of types rather than a single one.",
      details: "Provides type safety without sacrificing flexibility. Represented with type parameters like `<T>`.",
      example: "function identity<T>(arg: T): T {\n  return arg;\n}\nconst num = identity<number>(42);",
      link: "https://www.typescriptlang.org/docs/handbook/2/generics.html"
    },
    "interface": {
      term: "Interface",
      category: "TypeScript / OOP",
      summary: "A contract defining the shape, properties, and methods that an object or class must satisfy.",
      details: "In TypeScript, interfaces exist purely at compile-time for type checking and are removed from compiled JS. Can be extended (`extends`) and merged.",
      example: "interface User {\n  id: string;\n  name: string;\n  email?: string; // optional\n}",
      link: "https://www.typescriptlang.org/docs/handbook/2/objects.html"
    },

    // ==========================================
    // PYTHON & BACKEND
    // ==========================================
    "lambda": {
      term: "Lambda",
      category: "Python / FP",
      summary: "An anonymous inline function defined without a name.",
      details: "In Python, `lambda args: expression` returns the result of a single expression. Frequently used as key functions in `sort()`, `map()`, and `filter()`.",
      example: "nums = [1, 2, 3, 4]\nsquares = list(map(lambda x: x ** 2, nums)) # [1, 4, 9, 16]\nnums.sort(key=lambda x: -x) # descending",
      link: "https://docs.python.org/3/tutorial/controlflow.html#lambda-expressions"
    },
    "decorator": {
      term: "Decorator",
      category: "Python",
      summary: "A function that takes another function as an argument, extends its behavior, and returns it.",
      details: "Applied using the `@decorator_name` syntax above function definitions. Used for logging, authentication, caching (`@lru_cache`), and route handling in frameworks like Flask/FastAPI.",
      example: "def timer(fn):\n    def wrapper(*args, **kwargs):\n        print('Starting call...')\n        return fn(*args, **kwargs)\n    return wrapper\n\n@timer\ndef say_hi():\n    print('Hello!')",
      link: "https://peps.python.org/pep-0318/"
    },
    "generator": {
      term: "Generator",
      category: "Python / JS",
      summary: "A special function that produces a sequence of values lazily on demand using `yield`.",
      details: "Unlike regular functions that return a single value and terminate, generators retain their execution state between yields, consuming minimal memory for massive datasets.",
      example: "def count_up(limit):\n    n = 1\n    while n <= limit:\n        yield n\n        n += 1\n\nfor val in count_up(3): print(val)",
      link: "https://docs.python.org/3/howto/functional.html#generators"
    },
    "yield": {
      term: "yield",
      category: "Python / JS",
      summary: "Pauses generator function execution and sends a value to the caller.",
      details: "When the generator's `next()` method is called again, execution resumes immediately after the `yield` statement with all local variables preserved.",
      example: "def fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield"
    },
    "self": {
      term: "self",
      category: "Python",
      summary: "The conventional reference to the current instance of a class in Python methods.",
      details: "Passed automatically as the first parameter to instance methods. It allows access to the instance's attributes and other methods.",
      example: "class Person:\n    def __init__(self, name):\n        self.name = name\n    def greet(self):\n        return f'Hi, I am {self.name}'",
      link: "https://docs.python.org/3/tutorial/classes.html#class-objects"
    },
    "gil": {
      term: "GIL (Global Interpreter Lock)",
      category: "Python / Systems",
      summary: "A mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes simultaneously.",
      details: "In CPython, the GIL limits multithreaded CPU-bound tasks to a single core. To achieve true multi-core CPU parallelism in Python, the `multiprocessing` module is used instead of `threading`.",
      example: "from multiprocessing import Pool\n# Bypasses GIL by spawning separate processes\nwith Pool(4) as p:\n    results = p.map(cpu_heavy_task, data)",
      link: "https://wiki.python.org/moin/GlobalInterpreterLock"
    },
    "comprehension": {
      term: "List Comprehension",
      category: "Python",
      summary: "A concise syntax for creating new lists based on existing iterables.",
      details: "Combines mapping and filtering into a readable one-liner: `[expr for item in iterable if condition]`.",
      example: "numbers = [1, 2, 3, 4, 5, 6]\nevens_squared = [n**2 for n in numbers if n % 2 == 0]\n# [4, 16, 36]",
      link: "https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions"
    },

    // ==========================================
    // OBJECT ORIENTED PROGRAMMING (OOP)
    // ==========================================
    "class": {
      term: "Class",
      category: "OOP",
      summary: "A blueprint or template for creating objects with initial values and behaviors.",
      details: "Encapsulates state (fields/attributes) and behavior (methods). Classes are the foundation of object-oriented programming.",
      example: "class Car {\n  constructor(make, model) {\n    this.make = make;\n    this.model = model;\n  }\n  drive() { console.log('Driving...'); }\n}",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes"
    },
    "inheritance": {
      term: "Inheritance",
      category: "OOP",
      summary: "A mechanism where a child class acquires the properties and methods of a parent class.",
      details: "Enables code reuse and establishes an 'is-a' relationship (e.g., `Dog is an Animal`). Child classes can override parent methods to provide specific implementations.",
      example: "class Animal {\n  eat() { return 'eating'; }\n}\nclass Cat extends Animal {\n  meow() { return 'meow'; }\n}",
      link: "https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)"
    },
    "polymorphism": {
      term: "Polymorphism",
      category: "OOP",
      summary: "The ability of different objects to respond to the same method call in their own specific way.",
      details: "Comes from Greek ('many forms'). Allows client code to work with uniform interfaces without needing to know the exact concrete class at runtime.",
      example: "const shapes = [new Circle(), new Square()];\n// Both respond to draw(), but render differently\nshapes.forEach(shape => shape.draw());",
      link: "https://en.wikipedia.org/wiki/Polymorphism_(computer_science)"
    },
    "encapsulation": {
      term: "Encapsulation",
      category: "OOP",
      summary: "Bundling data with the methods that operate on that data and restricting direct access to internal details.",
      details: "Prevents external code from corrupting internal object state directly, using private fields (`#field` in JS or `private` in TS/Java) and getters/setters.",
      example: "class BankAccount {\n  #balance = 0; // Private field\n  deposit(amount) { if (amount > 0) this.#balance += amount; }\n  getBalance() { return this.#balance; }\n}",
      link: "https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)"
    },
    "abstraction": {
      term: "Abstraction",
      category: "OOP",
      summary: "Hiding complex internal implementation details and exposing only the essential features to users.",
      details: "Reduces programming complexity and increases efficiency by letting developers interact with high-level interfaces without worrying about how they work under the hood.",
      example: "// You call startEngine() without needing to understand fuel injection\ncar.startEngine();",
      link: "https://en.wikipedia.org/wiki/Abstraction_(computer_science)"
    },
    "singleton": {
      term: "Singleton Pattern",
      category: "Design Patterns",
      summary: "A creational pattern that ensures a class has only one instance and provides a global point of access to it.",
      details: "Commonly used for database connection pools, configuration managers, and logging services.",
      example: "class Database {\n  static #instance;\n  static getInstance() {\n    if (!Database.#instance) Database.#instance = new Database();\n    return Database.#instance;\n  }\n}",
      link: "https://refactoring.guru/design-patterns/singleton"
    },
    "factory": {
      term: "Factory Pattern",
      category: "Design Patterns",
      summary: "A creational pattern that provides an interface for creating objects without specifying their exact classes.",
      details: "Delegates instantiation logic to subclasses or a dedicated factory function, decoupling object creation from usage.",
      example: "function createUser(role) {\n  if (role === 'admin') return new AdminUser();\n  return new RegularUser();\n}",
      link: "https://refactoring.guru/design-patterns/factory-method"
    },
    "solid": {
      term: "SOLID Principles",
      category: "Architecture",
      summary: "Five design principles for writing understandable, flexible, and maintainable software.",
      details: "S: Single Responsibility, O: Open/Closed, L: Liskov Substitution, I: Interface Segregation, D: Dependency Inversion.",
      example: "// S: A class should have only one reason to change.\n// D: Depend upon abstractions, not concretions.",
      link: "https://en.wikipedia.org/wiki/SOLID"
    },

    // ==========================================
    // DATA STRUCTURES & ALGORITHMS (DSA)
    // ==========================================
    "recursion": {
      term: "Recursion",
      category: "Algorithms",
      summary: "A technique where a function calls itself to solve smaller instances of the same problem.",
      details: "Requires a base case to terminate execution and prevent infinite loops that cause a 'Stack Overflow' error.",
      example: "function factorial(n) {\n  if (n <= 1) return 1; // Base case\n  return n * factorial(n - 1); // Recursive step\n}",
      link: "https://developer.mozilla.org/en-US/docs/Glossary/Recursion"
    },
    "big o": {
      term: "Big O Notation",
      category: "Computer Science",
      summary: "Mathematical notation describing the limiting behavior of an algorithm's runtime or space complexity as input size grows.",
      details: "Common complexities: O(1) Constant, O(log n) Logarithmic, O(n) Linear, O(n log n) Linearithmic, O(n²) Quadratic, O(2ⁿ) Exponential.",
      example: "// O(1): array[0]\n// O(n): looping through an array\n// O(n^2): nested loop over array",
      link: "https://en.wikipedia.org/wiki/Big_O_notation"
    },
    "binary search": {
      term: "Binary Search",
      category: "Algorithms",
      summary: "An efficient search algorithm that finds the target in a sorted collection in O(log n) time.",
      details: "Repeatedly divides the search interval in half by comparing the target with the middle element, discarding half the search space each step.",
      example: "function binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}",
      link: "https://en.wikipedia.org/wiki/Binary_search_algorithm"
    },
    "hashmap": {
      term: "Hash Map / Hash Table",
      category: "Data Structures",
      summary: "A data structure that maps keys to values for fast O(1) average lookup, insertion, and deletion.",
      details: "Uses a hash function to compute an index into an array of buckets. Handles collisions via techniques like separate chaining or open addressing.",
      example: "const map = new Map();\nmap.set('user_123', { name: 'Sarah' });\nconsole.log(map.get('user_123')); // O(1) lookup",
      link: "https://en.wikipedia.org/wiki/Hash_table"
    },
    "stack": {
      term: "Stack",
      category: "Data Structures",
      summary: "A linear data structure that follows the Last-In, First-Out (LIFO) principle.",
      details: "Elements are added (push) and removed (pop) from the same end, called the top. Used in call stacks, undo/redo buffers, and syntax parsing.",
      example: "const stack = [];\nstack.push('first');\nstack.push('second');\nconsole.log(stack.pop()); // 'second' (LIFO)",
      link: "https://en.wikipedia.org/wiki/Stack_(abstract_data_type)"
    },
    "queue": {
      term: "Queue",
      category: "Data Structures",
      summary: "A linear data structure following the First-In, First-Out (FIFO) principle.",
      details: "Elements are enqueued at the back and dequeued from the front. Used in message brokers, print queues, and Breadth-First Search (BFS).",
      example: "const queue = [];\nqueue.push('task1');\nqueue.push('task2');\nconsole.log(queue.shift()); // 'task1' (FIFO)",
      link: "https://en.wikipedia.org/wiki/Queue_(abstract_data_type)"
    },
    "linked list": {
      term: "Linked List",
      category: "Data Structures",
      summary: "A linear collection of nodes where each node contains data and a pointer/reference to the next node.",
      details: "Unlike arrays, elements are not stored contiguously in memory, allowing O(1) insertions/deletions at known positions but O(n) element indexing.",
      example: "class Node {\n  constructor(val, next = null) {\n    this.val = val;\n    this.next = next;\n  }\n}",
      link: "https://en.wikipedia.org/wiki/Linked_list"
    },
    "tree": {
      term: "Tree",
      category: "Data Structures",
      summary: "A hierarchical, non-linear data structure consisting of nodes connected by edges, starting from a root node.",
      details: "Each node can have zero or more child nodes. Trees with at most two children per node are Binary Trees. The DOM is a tree structure.",
      example: "// Root -> Children (Left, Right)\nconst tree = { value: 10, left: null, right: null };",
      link: "https://en.wikipedia.org/wiki/Tree_(data_structure)"
    },
    "graph": {
      term: "Graph",
      category: "Data Structures",
      summary: "A non-linear structure made of a set of vertices (nodes) and edges connecting pairs of vertices.",
      details: "Can be directed or undirected, weighted or unweighted. Used to model social networks, road maps, network routing, and state machines.",
      example: "const graph = {\n  'A': ['B', 'C'],\n  'B': ['A', 'D'],\n  'C': ['A'],\n  'D': ['B']\n};",
      link: "https://en.wikipedia.org/wiki/Graph_(abstract_data_type)"
    },
    "dynamic programming": {
      term: "Dynamic Programming (DP)",
      category: "Algorithms",
      summary: "An algorithmic optimization technique that breaks problems into overlapping subproblems and caches their solutions.",
      details: "Utilizes memoization (top-down) or tabulation (bottom-up) to eliminate redundant calculations, reducing exponential time to polynomial time.",
      example: "// Fibonacci with memoization O(n)\nconst memo = {};\nfunction fib(n) {\n  if (n <= 1) return n;\n  if (memo[n]) return memo[n];\n  return memo[n] = fib(n - 1) + fib(n - 2);\n}",
      link: "https://en.wikipedia.org/wiki/Dynamic_programming"
    },

    // ==========================================
    // WEB, APIS & ARCHITECTURE
    // ==========================================
    "rest": {
      term: "REST (Representational State Transfer)",
      category: "Web & APIs",
      summary: "An architectural style for designing networked applications using standard HTTP methods.",
      details: "Relies on stateless client-server communication and standard HTTP verbs: GET (read), POST (create), PUT/PATCH (update), and DELETE (remove).",
      example: "GET    /api/users       // List users\nPOST   /api/users       // Create user\nGET    /api/users/42    // Get user 42\nDELETE /api/users/42    // Delete user 42",
      link: "https://en.wikipedia.org/wiki/REST"
    },
    "graphql": {
      term: "GraphQL",
      category: "Web & APIs",
      summary: "An open-source query language for APIs that lets clients request exactly the data they need and nothing more.",
      details: "Unlike REST with fixed endpoint responses, GraphQL uses a single endpoint where clients submit structured queries, preventing over-fetching and under-fetching.",
      example: "query {\n  user(id: \"123\") {\n    name\n    email\n    posts(limit: 5) { title }\n  }\n}",
      link: "https://graphql.org/"
    },
    "websocket": {
      term: "WebSocket",
      category: "Web & APIs",
      summary: "A computer communications protocol providing full-duplex, persistent two-way communication channels over a single TCP connection.",
      details: "Ideal for real-time applications like chat apps, live collaborative editing, financial tickers, and multiplayer online gaming.",
      example: "const socket = new WebSocket('wss://example.com/socket');\nsocket.onmessage = (event) => console.log('Message:', event.data);\nsocket.send(JSON.stringify({ text: 'Hello Server' }));",
      link: "https://developer.mozilla.org/en-US/docs/Web/API/WebSocket"
    },
    "jwt": {
      term: "JWT (JSON Web Token)",
      category: "Security & Auth",
      summary: "A compact, URL-safe means of representing claims to be securely transferred between two parties.",
      details: "Consists of three parts separated by dots: Header, Payload, and Signature (`header.payload.signature`). Cryptographically signed with a secret or public/private key.",
      example: "// Header: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\n// Sent in Authorization header: Bearer <token>",
      link: "https://jwt.io/introduction"
    },
    "oauth": {
      term: "OAuth 2.0",
      category: "Security & Auth",
      summary: "An open authorization framework that enables third-party applications to obtain limited access to user accounts.",
      details: "Allows users to grant websites access to their information on other websites without giving them their passwords (e.g. 'Sign in with Google').",
      example: "// Redirects user to Auth Provider -> returns authorization code -> swaps code for access token.",
      link: "https://oauth.net/2/"
    },
    "cors": {
      term: "CORS (Cross-Origin Resource Sharing)",
      category: "Web Security",
      summary: "A browser security mechanism that uses HTTP headers to tell browsers whether a web application can access resources from a different origin.",
      details: "Protects users by preventing malicious sites from making unauthorized requests to internal or authenticated APIs using browser cookies.",
      example: "// Server Response Header:\nAccess-Control-Allow-Origin: https://myapp.com\nAccess-Control-Allow-Methods: GET, POST, OPTIONS",
      link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
    },
    "dom": {
      term: "DOM (Document Object Model)",
      category: "Frontend",
      summary: "A programming interface for web documents that represents the page as a hierarchical tree of nodes and objects.",
      details: "Allows languages like JavaScript to dynamically read, modify, add, or delete HTML elements, attributes, and styles in real time.",
      example: "const heading = document.querySelector('h1');\nheading.textContent = 'Welcome Back!';\nheading.classList.add('highlight');",
      link: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model"
    },
    "flexbox": {
      term: "Flexbox (Flexible Box Layout)",
      category: "CSS",
      summary: "A 1-dimensional CSS layout model that offers space distribution and powerful alignment capabilities.",
      details: "Controls arrangement along a primary main axis and a cross axis via properties like `justify-content`, `align-items`, and `flex-direction`.",
      example: ".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n}",
      link: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout"
    },
    "grid": {
      term: "CSS Grid",
      category: "CSS",
      summary: "A 2-dimensional grid-based layout system designed to handle both columns and rows simultaneously.",
      details: "Allows building complex responsive webpage layouts with simple declarations like `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`.",
      example: ".gallery {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}",
      link: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout"
    },

    // ==========================================
    // MODERN FRAMEWORKS & STATE
    // ==========================================
    "usestate": {
      term: "useState",
      category: "React",
      summary: "A React Hook that lets you add reactive state variables to functional components.",
      details: "Returns a tuple containing the current state value and a setter function. Calling the setter function triggers a component re-render.",
      example: "import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}",
      link: "https://react.dev/reference/react/useState"
    },
    "useeffect": {
      term: "useEffect",
      category: "React",
      summary: "A React Hook that lets you synchronize a component with external systems (side effects).",
      details: "Runs after render. Takes a setup function and an optional dependency array. Returning a function provides a cleanup phase before unmounting or re-running.",
      example: "useEffect(() => {\n  const timer = setInterval(() => tick(), 1000);\n  return () => clearInterval(timer); // Cleanup\n}, []);",
      link: "https://react.dev/reference/react/useEffect"
    },
    "usememo": {
      term: "useMemo",
      category: "React",
      summary: "A React Hook that caches the result of a calculation between re-renders.",
      details: "Skips expensive computations when dependent values have not changed. Should be used when recalculations cause noticeable performance lag.",
      example: "const visibleTodos = useMemo(() => {\n  return filterTodos(todos, tab);\n}, [todos, tab]);",
      link: "https://react.dev/reference/react/useMemo"
    },
    "component": {
      term: "Component",
      category: "Frontend Architecture",
      summary: "A self-contained, reusable piece of user interface that bundles structure, logic, and style.",
      details: "Components accept inputs (props) and maintain internal state, rendering deterministic UI trees that react to user inputs.",
      example: "function UserCard({ name, avatar }) {\n  return <div className=\"card\"><img src={avatar} /><h3>{name}</h3></div>;\n}",
      link: "https://react.dev/learn/your-first-component"
    },

    // ==========================================
    // DEVOPS, TOOLS & DATABASES
    // ==========================================
    "docker": {
      term: "Docker",
      category: "DevOps",
      summary: "A platform for developing, shipping, and running applications in lightweight, isolated containers.",
      details: "Packages code along with all system dependencies and libraries into an image that runs identically on any environment, eliminating 'works on my machine' issues.",
      example: "# Dockerfile\nFROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nCMD [\"node\", \"server.js\"]",
      link: "https://www.docker.com/"
    },
    "kubernetes": {
      term: "Kubernetes (K8s)",
      category: "DevOps",
      summary: "An open-source container orchestration system for automating application deployment, scaling, and management.",
      details: "Groups containers into Pods, schedules them across worker nodes, provides service discovery, load balancing, self-healing, and automated rollouts.",
      example: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web-app\nspec:\n  replicas: 3",
      link: "https://kubernetes.io/"
    },
    "git": {
      term: "Git",
      category: "Tools & VCS",
      summary: "A distributed version control system for tracking changes in source code during software development.",
      details: "Allows branching, merging, and collaboration without relying on a centralized server. Every developer's local repo contains full commit history.",
      example: "git checkout -b feature/login\ngit add .\ngit commit -m \"Add OAuth login flow\"\ngit push origin feature/login",
      link: "https://git-scm.com/doc"
    },
    "ci/cd": {
      term: "CI/CD",
      category: "DevOps",
      summary: "Continuous Integration and Continuous Delivery / Deployment.",
      details: "Automates testing code on every commit (CI) and deploying passing builds automatically to staging or production environments (CD).",
      example: "# Example GitHub Actions workflow\nname: Test & Deploy\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - run: npm test",
      link: "https://en.wikipedia.org/wiki/CI/CD"
    },
    "sql": {
      term: "SQL (Structured Query Language)",
      category: "Database",
      summary: "A domain-specific language used for managing and querying relational databases.",
      details: "Supports declarative operations including SELECT, INSERT, UPDATE, DELETE, as well as schema definition and multi-table JOINs.",
      example: "SELECT users.name, COUNT(orders.id) AS total_orders\nFROM users\nJOIN orders ON users.id = orders.user_id\nWHERE orders.created_at >= '2026-01-01'\nGROUP BY users.name;",
      link: "https://en.wikipedia.org/wiki/SQL"
    },
    "nosql": {
      term: "NoSQL",
      category: "Database",
      summary: "Non-relational database systems designed to handle unstructured, semi-structured, or high-velocity data.",
      details: "Includes Document databases (MongoDB), Key-Value stores (Redis), Column-family (Cassandra), and Graph databases (Neo4j). Often prioritize horizontal scaling over strict ACID transactions.",
      example: "// Document structure in MongoDB\n{\n  \"_id\": ObjectId(\"...\"),\n  \"username\": \"coder101\",\n  \"tags\": [\"react\", \"node\", \"docker\"]\n}",
      link: "https://en.wikipedia.org/wiki/NoSQL"
    },
    "redis": {
      term: "Redis",
      category: "Database",
      summary: "An in-memory data structure store used as a distributed cache, message broker, and database.",
      details: "Stores data in RAM for sub-millisecond read/write operations. Supports rich data structures such as strings, hashes, lists, sets, sorted sets, and streams.",
      example: "await redis.set('user:session:99', JSON.stringify(userData), 'EX', 3600);\nconst session = await redis.get('user:session:99');",
      link: "https://redis.io/"
    },
    "acid": {
      term: "ACID",
      category: "Database",
      summary: "A set of four properties that guarantee reliable processing of database transactions.",
      details: "Atomicity (all or nothing), Consistency (preserves validity rules), Isolation (concurrent transactions do not interfere), Durability (committed data survives crashes).",
      example: "// Transfer money: debit Account A AND credit Account B together in one atomic transaction.",
      link: "https://en.wikipedia.org/wiki/ACID"
    },
    "index": {
      term: "Database Index",
      category: "Database",
      summary: "A data structure (often B-Tree) that improves the speed of data retrieval operations on a database table.",
      details: "Avoids full table scans (O(n)) by maintaining sorted keys with pointers to rows (O(log n)), at the cost of additional storage and slightly slower writes.",
      example: "CREATE INDEX idx_user_email ON users(email);",
      link: "https://en.wikipedia.org/wiki/Database_index"
    },
    "regex": {
      term: "Regex (Regular Expression)",
      category: "Computer Science",
      summary: "A sequence of characters that specifies a search pattern in text.",
      details: "Used for input validation, string searching, and text replacement. Special characters include `^` (start), `$` (end), `\\d` (digit), `+` (1 or more), `*` (0 or more).",
      example: "const emailRegex = /^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$/;\nemailRegex.test('dev@example.com'); // true",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions"
    },

    // ==========================================
    // FUNDAMENTAL KEYWORDS & CONCEPTS
    // ==========================================
    "function": {
      term: "Function",
      category: "Core Concept",
      summary: "A reusable block of code designed to perform a specific task, taking inputs and returning an output.",
      details: "Functions provide modularity, abstraction, and reusability across software programs.",
      example: "function add(a, b) {\n  return a + b;\n}\nconst sum = add(3, 4); // 7",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions"
    },
    "return": {
      term: "return",
      category: "Core Concept",
      summary: "Specifies the value to be returned by a function and ends its execution immediately.",
      details: "If omitted in JavaScript or Python, the function implicitly returns `undefined` (JS) or `None` (Python).",
      example: "function checkAge(age) {\n  if (age < 18) return 'Underage';\n  return 'Adult';\n}",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return"
    },
    "pointer": {
      term: "Pointer",
      category: "C / C++ / Systems",
      summary: "A variable that stores the memory address of another variable.",
      details: "Allows direct memory manipulation and efficient passing of large data structures without copying. Dereferencing (`*ptr`) accesses the value at that address.",
      example: "int x = 42;\nint* ptr = &x; // ptr stores address of x\nprintf(\"%d\", *ptr); // prints 42",
      link: "https://en.wikipedia.org/wiki/Pointer_(computer_programming)"
    },
    "memory leak": {
      term: "Memory Leak",
      category: "Performance / Systems",
      summary: "A scenario where a program allocates memory but fails to release it back to the operating system when no longer needed.",
      details: "Commonly caused by unremoved event listeners, global variables, circular references, or uncleared intervals. Over time, it leads to slowdowns and crashes.",
      example: "// Forgotten event listener prevents element from being garbage collected\nwindow.addEventListener('resize', heavyHandler);",
      link: "https://en.wikipedia.org/wiki/Memory_leak"
    },
    "garbage collection": {
      term: "Garbage Collection (GC)",
      category: "Systems / Runtime",
      summary: "An automatic memory management feature that reclaims memory occupied by objects no longer reachable by the program.",
      details: "Runtimes like V8 (Node/Chrome), the JVM, and Python use GC algorithms such as Mark-and-Sweep or Reference Counting, sparing developers from manual memory management (`free()` / `malloc()`).",
      example: "let obj = { temp: true };\nobj = null; // Original object is now unreferenced and eligible for GC",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management"
    },
    "null": {
      term: "null",
      category: "Data Types",
      summary: "Represents the intentional absence of any object value or reference.",
      details: "In JavaScript, `null` is an explicit assignment indicating 'no value'. Note: `typeof null === 'object'` is a famous legacy quirk.",
      example: "let activeSession = null; // explicitly empty",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null"
    },
    "undefined": {
      term: "undefined",
      category: "Data Types",
      summary: "A primitive value automatically assigned to variables declared without an initial value.",
      details: "Also returned when attempting to access a nonexistent object property or when a function does not return an explicit value.",
      example: "let x;\nconsole.log(x); // undefined\nconst user = {};\nconsole.log(user.age); // undefined",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined"
    },
    "api": {
      term: "API (Application Programming Interface)",
      category: "Architecture",
      summary: "A set of protocols, routines, and tools that allows different software applications to communicate with each other.",
      details: "APIs define the requests that can be made, how to make them, data formats, and the conventions to follow (e.g. Browser APIs, Web APIs, Library APIs).",
      example: "fetch('https://api.github.com/users/octocat')\n  .then(res => res.json())\n  .then(data => console.log(data.login));",
      link: "https://developer.mozilla.org/en-US/docs/Glossary/API"
    }
  };

  // Add common aliases for robust lookup
  const ALIASES = {
    "fn": "function",
    "func": "function",
    "def": "function",
    "promises": "promise",
    "promisify": "promise",
    "closures": "closure",
    "cb": "callback",
    "callbacks": "callback",
    "curry": "currying",
    "debouncing": "debounce",
    "throttling": "throttle",
    "classes": "class",
    "oop": "encapsulation",
    "instances": "class",
    "subclass": "inheritance",
    "extends": "inheritance",
    "recursive": "recursion",
    "hash": "hashmap",
    "hashtable": "hashmap",
    "dict": "hashmap",
    "dictionary": "hashmap",
    "map": "hashmap",
    "stacks": "stack",
    "queues": "queue",
    "lists": "linked list",
    "trees": "tree",
    "graphs": "graph",
    "dp": "dynamic programming",
    "memoize": "dynamic programming",
    "memoization": "dynamic programming",
    "restful": "rest",
    "endpoints": "rest",
    "gql": "graphql",
    "sockets": "websocket",
    "websockets": "websocket",
    "tokens": "jwt",
    "token": "jwt",
    "json web token": "jwt",
    "auth": "oauth",
    "components": "component",
    "containers": "docker",
    "container": "docker",
    "k8s": "kubernetes",
    "repository": "git",
    "repo": "git",
    "vcs": "git",
    "indexes": "index",
    "indexing": "index",
    "regular expression": "regex",
    "regexp": "regex",
    "pointers": "pointer",
    "leaks": "memory leak",
    "gc": "garbage collection",
    "apis": "api",
    "state": "usestate",
    "effect": "useeffect"
  };

  // Expose globally so content script and popup script can both access it
  window.CodeExplainerDictionary = {
    get(rawWord) {
      if (!rawWord || typeof rawWord !== "string") return null;
      // Normalize: lowercase, trim whitespace, remove trailing/leading non-word characters except underscores/hyphens
      const clean = rawWord
        .toLowerCase()
        .trim()
        .replace(/^[^a-zA-Z0-9#+]+|[^a-zA-Z0-9#+]+$/g, "");

      if (!clean) return null;

      // 1. Direct match
      if (DICTIONARY[clean]) {
        return DICTIONARY[clean];
      }

      // 2. Alias match
      if (ALIASES[clean] && DICTIONARY[ALIASES[clean]]) {
        return DICTIONARY[ALIASES[clean]];
      }

      // 3. Singularization fallback (e.g., 'functions' -> 'function')
      if (clean.endsWith("s") && DICTIONARY[clean.slice(0, -1)]) {
        return DICTIONARY[clean.slice(0, -1)];
      }

      // 4. Case-insensitive key scan
      for (const key of Object.keys(DICTIONARY)) {
        if (key.toLowerCase() === clean) {
          return DICTIONARY[key];
        }
      }

      return null;
    },

    getAll() {
      return DICTIONARY;
    },

    search(query) {
      if (!query || typeof query !== "string") return [];
      const q = query.toLowerCase().trim();
      const results = [];
      for (const [key, item] of Object.entries(DICTIONARY)) {
        if (
          key.includes(q) ||
          item.term.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q)
        ) {
          results.push(item);
        }
      }
      return results;
    }
  };
})();
