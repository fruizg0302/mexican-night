#!/usr/bin/env python3
"""
Mexican Night Theme - Python Syntax Test File
This file demonstrates all Python syntax highlighting features.
"""

from typing import List, Dict, Optional
import os
import sys

# ==========================================
# CONSTANTS AND GLOBALS
# ==========================================
MAX_RETRIES = 3
API_KEY = "sk-test-123"
DEBUG = True
PI = 3.14159


# ==========================================
# CLASS DEFINITIONS
# ==========================================
class User:
    """User model with authentication and profile management."""

    # Class variable
    user_count = 0

    def __init__(self, name: str, email: str, age: int = 18):
        """Initialize a new user instance."""
        self.name = name
        self.email = email
        self.age = age
        User.user_count += 1

    def __str__(self) -> str:
        """Return string representation of user."""
        return f"User(name={self.name}, email={self.email})"

    def __repr__(self) -> str:
        """Return developer-friendly representation."""
        return f"<User {self.email}>"

    @property
    def is_adult(self) -> bool:
        """Check if user is an adult."""
        return self.age >= 18

    @classmethod
    def from_dict(cls, data: Dict[str, any]) -> 'User':
        """Create user from dictionary."""
        return cls(
            name=data['name'],
            email=data['email'],
            age=data.get('age', 18)
        )

    @staticmethod
    def validate_email(email: str) -> bool:
        """Validate email format."""
        return '@' in email and '.' in email


# ==========================================
# INHERITANCE AND DECORATORS
# ==========================================
class AdminUser(User):
    """Admin user with elevated permissions."""

    def __init__(self, name: str, email: str, permissions: List[str]):
        super().__init__(name, email)
        self.permissions = permissions

    def has_permission(self, permission: str) -> bool:
        """Check if admin has specific permission."""
        return permission in self.permissions


def requires_auth(func):
    """Decorator to require authentication."""
    def wrapper(*args, **kwargs):
        if not is_authenticated():
            raise PermissionError("Authentication required")
        return func(*args, **kwargs)
    return wrapper


@requires_auth
def delete_user(user_id: int) -> None:
    """Delete user by ID (requires authentication)."""
    print(f"Deleting user {user_id}")


# ==========================================
# FUNCTIONS AND CONTROL FLOW
# ==========================================
def fetch_users(
    page: int = 1,
    limit: int = 10,
    filters: Optional[Dict[str, any]] = None
) -> List[User]:
    """Fetch users with pagination and filtering."""
    users = []

    try:
        # Connect to database
        if filters is None:
            filters = {}

        # Control flow examples
        if page < 1:
            raise ValueError("Page must be >= 1")
        elif page > 100:
            print("Warning: High page number")

        # Loop examples
        for i in range(limit):
            user_data = fetch_user_data(i)

            if user_data is None:
                continue

            if not user_data.get('active'):
                break

            users.append(User.from_dict(user_data))

        # While loop
        retry_count = 0
        while retry_count < MAX_RETRIES:
            if try_connection():
                break
            retry_count += 1

    except ConnectionError as e:
        print(f"Connection failed: {e}")
        raise
    except ValueError as e:
        print(f"Invalid value: {e}")
        return []
    finally:
        cleanup_resources()

    return users


# ==========================================
# STRING TYPES AND F-STRINGS
# ==========================================
def demo_strings():
    """Demonstrate different string types."""

    # Regular strings
    simple = 'Hello, México!'
    double = "Welcome to Mexican Night"

    # F-strings with interpolation
    name = "Fernando"
    age = 30
    greeting = f"Hello, {name}! You are {age} years old."

    # F-strings with format specifiers
    price = 1234.5678
    formatted = f"Price: ${price:,.2f}"

    # F-strings with expressions
    result = f"Is adult: {age >= 18}"
    calculation = f"Sum: {10 + 20}"

    # Raw strings (for regex)
    pattern = r'\d{3}-\d{3}-\d{4}'

    # Triple-quoted strings (docstrings)
    multiline = """
    This is a multiline string
    with multiple lines
    """

    # Escape characters
    escaped = "Line 1\nLine 2\tTabbed"

    return greeting


# ==========================================
# OPERATORS AND EXPRESSIONS
# ==========================================
def demo_operators():
    """Demonstrate various operators."""

    # Arithmetic operators
    addition = 10 + 5
    subtraction = 10 - 5
    multiplication = 10 * 5
    division = 10 / 5
    floor_division = 10 // 3
    modulo = 10 % 3
    power = 2 ** 8

    # Comparison operators
    equal = (10 == 10)
    not_equal = (10 != 5)
    greater = (10 > 5)
    less_equal = (5 <= 10)

    # Logical operators
    and_op = True and False
    or_op = True or False
    not_op = not True

    # Identity and membership
    is_same = ([] is [])
    is_not_same = ([] is not [])
    in_list = (5 in [1, 2, 3, 4, 5])
    not_in_list = (10 not in [1, 2, 3])

    # Bitwise operators
    bitwise_and = 5 & 3
    bitwise_or = 5 | 3
    bitwise_xor = 5 ^ 3
    bitwise_not = ~5
    left_shift = 5 << 2
    right_shift = 5 >> 2

    # Walrus operator (Python 3.8+)
    if (n := len([1, 2, 3])) > 2:
        print(f"List has {n} items")

    return addition


# ==========================================
# DATA STRUCTURES
# ==========================================
def demo_data_structures():
    """Demonstrate lists, dicts, tuples, and sets."""

    # Lists
    colors = ['rosa', 'verde', 'naranja', 'morado']
    numbers = [1, 2, 3, 4, 5]
    mixed = [1, 'two', 3.0, True, None]

    # Dictionaries
    user_data = {
        'name': 'Fernando',
        'age': 30,
        'email': 'fernando@example.com',
        'active': True
    }

    # Nested structures
    config = {
        'database': {
            'host': 'localhost',
            'port': 5432
        },
        'cache': {
            'enabled': True,
            'ttl': 3600
        }
    }

    # Tuples
    coordinates = (10.5, 20.3)
    rgb = (255, 128, 64)

    # Sets
    unique_numbers = {1, 2, 3, 4, 5}
    tags = {'python', 'theme', 'vscode'}

    # List comprehensions
    squares = [x ** 2 for x in range(10)]
    evens = [x for x in range(20) if x % 2 == 0]

    # Dict comprehensions
    squared_dict = {x: x ** 2 for x in range(5)}

    return colors, user_data


# ==========================================
# LAMBDA AND FUNCTIONAL PROGRAMMING
# ==========================================
def demo_functional():
    """Demonstrate lambda and functional programming."""

    # Lambda functions
    add = lambda x, y: x + y
    square = lambda x: x ** 2

    # Map, filter, reduce
    numbers = [1, 2, 3, 4, 5]
    squared = list(map(lambda x: x ** 2, numbers))
    evens = list(filter(lambda x: x % 2 == 0, numbers))

    # Sorting with lambda
    users = [
        {'name': 'Ana', 'age': 25},
        {'name': 'Carlos', 'age': 30},
        {'name': 'Beatriz', 'age': 22}
    ]
    sorted_users = sorted(users, key=lambda u: u['age'])

    return squared


# ==========================================
# SPECIAL VARIABLES AND CONSTANTS
# ==========================================
def demo_special():
    """Demonstrate special variables and constants."""

    # Boolean constants
    is_active = True
    is_deleted = False

    # None
    result = None

    # Ellipsis
    placeholder = ...

    # Dunder variables
    module_name = __name__
    file_path = __file__

    # Built-in functions
    length = len([1, 2, 3])
    max_val = max([1, 5, 3, 2])
    min_val = min([1, 5, 3, 2])
    total = sum([1, 2, 3, 4, 5])

    # Type conversions
    int_val = int("123")
    str_val = str(123)
    float_val = float("3.14")
    list_val = list((1, 2, 3))

    return is_active


# ==========================================
# CONTEXT MANAGERS AND WITH STATEMENTS
# ==========================================
def demo_context_managers():
    """Demonstrate context managers."""

    # File I/O
    with open('data.txt', 'r') as file:
        content = file.read()

    # Multiple context managers
    with open('input.txt', 'r') as infile, \
         open('output.txt', 'w') as outfile:
        outfile.write(infile.read())

    return content


# ==========================================
# ASYNC/AWAIT (Python 3.5+)
# ==========================================
async def fetch_data(url: str) -> Dict:
    """Async function to fetch data."""
    await asyncio.sleep(1)
    return {'status': 'success', 'url': url}


async def main_async():
    """Main async function."""
    tasks = [
        fetch_data('https://api.example.com/1'),
        fetch_data('https://api.example.com/2'),
        fetch_data('https://api.example.com/3')
    ]
    results = await asyncio.gather(*tasks)
    return results


# ==========================================
# GLOBAL AND NONLOCAL
# ==========================================
counter = 0

def increment_counter():
    """Increment global counter."""
    global counter
    counter += 1


def outer_function():
    """Demonstrate nonlocal scope."""
    x = 10

    def inner_function():
        nonlocal x
        x += 5
        return x

    return inner_function()


# ==========================================
# HELPER FUNCTIONS
# ==========================================
def is_authenticated() -> bool:
    """Check if user is authenticated."""
    return True


def fetch_user_data(user_id: int) -> Optional[Dict]:
    """Fetch user data by ID."""
    return {'id': user_id, 'name': 'Test User', 'active': True}


def try_connection() -> bool:
    """Try to establish connection."""
    return True


def cleanup_resources() -> None:
    """Clean up resources."""
    pass


# ==========================================
# MAIN EXECUTION
# ==========================================
if __name__ == '__main__':
    print("🇲🇽 Mexican Night Theme - Python Test")
    print("=" * 50)

    # Create users
    user1 = User("Ana García", "ana@example.com", 25)
    user2 = User("Carlos López", "carlos@example.com", 30)

    print(user1)
    print(f"Is adult: {user1.is_adult}")
    print(f"Total users: {User.user_count}")

    # Demo functions
    greeting = demo_strings()
    print(greeting)

    operators_result = demo_operators()
    print(f"Addition result: {operators_result}")

    # Exit
    sys.exit(0)
