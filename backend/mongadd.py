from pymongo import MongoClient
from pymongo.server_api import ServerApi
import os
import random

# MongoDB Atlas connection string
uri = "change"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Get the database
db = client["Cluster0"]

# Clear existing rewards
db.rewards.delete_many({})

# Categories and color options
categories = ['class', 'food', 'merch', 'event', 'other']
colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#F9C80E', '#FF8C42', '#A8E6CF', '#DCEDC1', '#FFD3B6', '#FFAAA5', '#FF8B94']
rewards = [
    {"title": "Public Speaking Masterclass", "category": "class", "points": 500, "quantity_left": 12, "description": "Enhance your oratory skills", "popular": True},
    {"title": "Campus Cafe Lunch Voucher", "category": "food", "points": 200, "quantity_left": 20, "description": "Free lunch at the campus cafe", "popular": True},
    {"title": "University Branded Hoodie", "category": "merch", "points": 1000, "quantity_left": 50, "description": "Comfortable and stylish university hoodie", "popular": True},
    {"title": "Tech Startup Workshop", "category": "event", "points": 300, "quantity_left": 15, "description": "Learn from successful entrepreneurs", "popular": False},
    {"title": "Library Late Fee Waiver", "category": "other", "points": 100, "quantity_left": 30, "description": "One-time waiver for late return fees", "popular": False},
    {"title": "Creative Writing Course", "category": "class", "points": 400, "quantity_left": 80, "description": "Unleash your inner writer", "popular": False},
    {"title": "Campus Food Truck Meal", "category": "food", "points": 250, "quantity_left": 15, "description": "Enjoy a meal from the popular campus food truck", "popular": True},
    {"title": "University Laptop Sleeve", "category": "merch", "points": 600, "quantity_left": 40, "description": "Protect your laptop in style", "popular": False},
    {"title": "Alumni Networking Night", "category": "event", "points": 350, "quantity_left": 20, "description": "Connect with successful alumni", "popular": True},
    {"title": "Gym Membership (1 month)", "category": "other", "points": 800, "quantity_left": 60, "description": "Access to campus gym facilities", "popular": True},
    {"title": "Data Science Fundamentals", "category": "class", "points": 600, "quantity_left": 10, "description": "Introduction to data analysis and machine learning", "popular": True},
    {"title": "Dining Hall Special Meal", "category": "food", "points": 150, "quantity_left": 18, "description": "Enjoy a gourmet meal at the dining hall", "popular": False},
    {"title": "University Branded Water Bottle", "category": "merch", "points": 400, "quantity_left": 70, "description": "Stay hydrated with our eco-friendly bottle", "popular": True},
    {"title": "Campus Music Festival Pass", "category": "event", "points": 1000, "quantity_left": 50, "description": "All-access pass to the annual music fest", "popular": True},
    {"title": "Printing Credit", "category": "other", "points": 50, "quantity_left": 25, "description": "$10 credit for campus printers", "popular": True},
    {"title": "Introduction to Photography", "category": "class", "points": 450, "quantity_left": 60, "description": "Learn the basics of photography", "popular": False},
    {"title": "Local Pizzeria Voucher", "category": "food", "points": 300, "quantity_left": 12, "description": "Free large pizza from nearby pizzeria", "popular": True},
    {"title": "University Branded Backpack", "category": "merch", "points": 800, "quantity_left": 40, "description": "Durable and spacious backpack with university logo", "popular": False},
    {"title": "Career Fair VIP Access", "category": "event", "points": 500, "quantity_left": 30, "description": "Early access to the annual career fair", "popular": True},
    {"title": "Parking Permit (1 month)", "category": "other", "points": 700, "quantity_left": 40, "description": "One month of free campus parking", "popular": True},
    {"title": "Artificial Intelligence Seminar", "category": "class", "points": 550, "quantity_left": 70, "description": "Explore the world of AI and its applications", "popular": True},
    {"title": "Campus Smoothie Bar Drink", "category": "food", "points": 100, "quantity_left": 22, "description": "Refreshing smoothie from the campus bar", "popular": False},
    {"title": "University Branded Notebook Set", "category": "merch", "points": 300, "quantity_left": 90, "description": "Set of three notebooks with university design", "popular": False},
    {"title": "Guest Lecture Series Pass", "category": "event", "points": 400, "quantity_left": 25, "description": "Access to exclusive guest lecture series", "popular": False},
    {"title": "Campus Bike Rental (1 week)", "category": "other", "points": 350, "quantity_left": 50, "description": "One week free bike rental on campus", "popular": True},
    {"title": "Digital Marketing Workshop", "category": "class", "points": 450, "quantity_left": 80, "description": "Learn effective online marketing strategies", "popular": True},
    {"title": "International Cuisine Night", "category": "food", "points": 350, "quantity_left": 10, "description": "Sample dishes from around the world", "popular": True},
    {"title": "University Branded Phone Case", "category": "merch", "points": 250, "quantity_left": 60, "description": "Protect your phone with university spirit", "popular": False},
    {"title": "Outdoor Movie Night Ticket", "category": "event", "points": 200, "quantity_left": 15, "description": "Enjoy a movie under the stars", "popular": True},
    {"title": "Laundry Service (1 month)", "category": "other", "points": 600, "quantity_left": 30, "description": "Free laundry service for a month", "popular": False},
    {"title": "Graphic Design Basics", "category": "class", "points": 500, "quantity_left": 75, "description": "Introduction to graphic design principles", "popular": False},
    {"title": "Campus Bakery Treat", "category": "food", "points": 150, "quantity_left": 18, "description": "Delicious pastry from the campus bakery", "popular": True},
    {"title": "University Branded Umbrella", "category": "merch", "points": 350, "quantity_left": 40, "description": "Stay dry with our sturdy university umbrella", "popular": False},
    {"title": "Campus Comedy Night Ticket", "category": "event", "points": 250, "quantity_left": 80, "description": "Laugh out loud at our comedy showcase", "popular": True},
    {"title": "Study Room Reservation", "category": "other", "points": 150, "quantity_left": 12, "description": "Reserve a private study room for 4 hours", "popular": True},
    {"title": "Web Development Bootcamp", "category": "class", "points": 800, "quantity_left": 50, "description": "Intensive course on modern web development", "popular": True},
    {"title": "Sushi Making Workshop", "category": "food", "points": 400, "quantity_left": 30, "description": "Learn to make your own sushi", "popular": False},
    {"title": "University Branded Sweatpants", "category": "merch", "points": 500, "quantity_left": 60, "description": "Comfortable sweatpants with university logo", "popular": True},
    {"title": "Campus Art Exhibition Pass", "category": "event", "points": 150, "quantity_left": 40, "description": "VIP access to student art exhibition", "popular": False},
    {"title": "Campus Map Pro Upgrade", "category": "other", "points": 50, "quantity_left": 30, "description": "Unlock premium features on campus map app", "popular": True},
    {"title": "Financial Literacy Seminar", "category": "class", "points": 300, "quantity_left": 90, "description": "Learn essential money management skills", "popular": True},
    {"title": "Gourmet Coffee Tasting", "category": "food", "points": 200, "quantity_left": 11, "description": "Sample premium coffees from around the world", "popular": False},
    {"title": "University Branded Fitness Tracker", "category": "merch", "points": 1200, "quantity_left": 20, "description": "Track your fitness with university style", "popular": False},
    {"title": "Campus Treasure Hunt Entry", "category": "event", "points": 100, "quantity_left": 20, "description": "Participate in the annual campus-wide treasure hunt", "popular": True},
    {"title": "Online Course Discount", "category": "other", "points": 250, "quantity_left": 15, "description": "25% off on select online courses", "popular": True},
    {"title": "Mindfulness and Meditation Class", "category": "class", "points": 350, "quantity_left": 70, "description": "Learn techniques for stress relief and focus", "popular": True},
    {"title": "Farm-to-Table Dinner Experience", "category": "food", "points": 600, "quantity_left": 40, "description": "Enjoy a locally sourced gourmet dinner", "popular": True},
    {"title": "University Branded Wireless Earbuds", "category": "merch", "points": 1500, "quantity_left": 15, "description": "High-quality earbuds with university logo", "popular": False},
    {"title": "Virtual Reality Demo Day Pass", "category": "event", "points": 300, "quantity_left": 50, "description": "Experience cutting-edge VR technology", "popular": True}
]


# Add color and ensure 'popular' is boolean
for reward in rewards:
    reward['color'] = random.choice(colors)
    reward['popular'] = bool(reward['popular'])

# Insert rewards into the database
result = db.rewards.insert_many(rewards)

print(f"Successfully inserted {len(result.inserted_ids)} rewards into the database.")

# Close the connection
client.close()