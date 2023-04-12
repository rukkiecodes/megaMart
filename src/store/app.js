// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    snackbar: false,
    snackbarText: '',
    snackbarColor: '',
    categories: [
      {
        name: "Electronics",
        subcategories: [
          "Phones",
          "Tablets & Accessories",
          "Computers & Laptops",
          "TV, Audio & Video",
          "Cameras & Accessories",
          "Gaming Consoles & Accessories",
          "Other Electronics"
        ]
      },
      {
        name: "Computers & Accessories",
        subcategories: [
          "Laptops",
          "Desktops",
          "Monitors",
          "Networking Devices",
          "Computer Components",
          "Computer Accessories",
          "Printers, Ink & Accessories",
          "Storage Devices",
          "Other Computer & Accessories"
        ]
      },
      {
        name: "Phones & Accessories",
        subcategories: [
          "Smartphones",
          "Basic Phones",
          "Phone Cases & Covers",
          "Screen Protectors",
          "Chargers & Cables",
          "Headsets & Earphones",
          "Power Banks",
          "Other Phone Accessories"
        ]
      },
      {
        name: "Home & Kitchen",
        subcategories: [
          "Furniture",
          "Home Decor",
          "Bedding & Bath",
          "Kitchen & Dining",
          "Storage & Organization",
          "Home Appliances",
          "Other Home & Kitchen"
        ]
      },
      {
        name: "Fashion",
        subcategories: [
          "Men's Clothing",
          "Women's Clothing",
          "Kid's Clothing",
          "Shoes",
          "Watches",
          "Jewelry",
          "Bags & Luggage",
          "Other Fashion Accessories"
        ]
      },
      {
        name: "Beauty & Personal Care",
        subcategories: [
          "Makeup",
          "Skin Care",
          "Hair Care",
          "Fragrances",
          "Personal Care Appliances",
          "Other Beauty & Personal Care"
        ]
      },
      {
        name: "Toys & Games",
        subcategories: [
          "Action Figures",
          "Board Games",
          "Dolls & Accessories",
          "Building Toys",
          "Electronic Toys",
          "Outdoor Play",
          "Other Toys & Games"
        ]
      },
      {
        name: "Books",
        subcategories: [
          "Fiction",
          "Non-Fiction",
          "Children's Books",
          "Textbooks",
          "Audiobooks",
          "Magazines",
          "Other Books"
        ]
      },
      {
        name: "Sports & Outdoors",
        subcategories: [
          "Outdoor Recreation",
          "Team Sports",
          "Fitness",
          "Cycling",
          "Water Sports",
          "Winter Sports",
          "Other Sports & Outdoors"
        ]
      },
      {
        name: "Automotive",
        subcategories: [
          "Cars & Trucks",
          "Motorcycles",
          "Parts & Accessories",
          "Tools & Equipment",
          "Other Automotive"
        ]
      },
      {
        name: "Grocery",
        subcategories: [
          "Beverages",
          "Snacks",
          "Canned & Packaged Foods",
          "Bakery & Bread",
          "Dairy & Eggs",
          "Produce",
          "Other Grocery"
        ]
      },
      {
        name: "Pet Supplies",
        subcategories: [
          "Dog Supplies",
          "Cat Supplies",
          "Bird Supplies",
          "Fish & Aquatic Supplies",
          "Small Animal Supplies",
          "Reptile & Amphibian Supplies",
          "Other Pet Supplies"
        ]
      },
      {
        name: "Office Supplies",
        subcategories: [
          "Writing & Correction Supplies",
          "Calendars, Planners & Personal Organizers",
          "Office Electronics",
          "Office Furniture",
          "Office Storage & Organization",
          "Other Office Supplies"
        ]
      },
      {
        name: "Health & Wellness",
        subcategories: [
          "Vitamins & Supplements",
          "Personal Care",
          "Medicine",
          "First Aid",
          "Sports Nutrition",
          "Other Health & Wellness"
        ]
      },
      {
        name: "Jewelry",
        subcategories: [
          "Fine Jewelry",
          "Fashion Jewelry",
          "Men's Jewelry",
          "Children's Jewelry",
          "Watches",
          "Other Jewelry"
        ]
      },
      {
        name: "Baby & Kids",
        subcategories: [
          "Baby Gear",
          "Nursery",
          "Toys & Games",
          "Clothing & Shoes",
          "Baby & Kids Accessories",
          "Other Baby & Kids"
        ]
      },
      {
        name: "Arts & Crafts",
        subcategories: [
          "Painting, Drawing & Art Supplies",
          "Crafting",
          "Sewing",
          "Scrapbooking & Stamping",
          "Party Decorations & Supplies",
          "Other Arts & Crafts"
        ]
      },
      {
        name: "Music",
        subcategories: [
          "CDs & Vinyl",
          "Digital Music",
          "Musical Instruments",
          "DJ & Karaoke",
          "Other Music"
        ]
      },
      {
        name: "Movies & TV Shows",
        subcategories: [
          "DVDs & Blu-ray",
          "Digital Movies & TV",
          "TV Shows",
          "Documentary",
          "Other Movies & TV Shows"
        ]
      },
      {
        name: "Industrial & Scientific",
        subcategories: [
          "Lab & Scientific Supplies",
          "Industrial Supplies",
          "Janitorial & Sanitation Supplies",
          "Test, Measure & Inspect",
          "Other Industrial & Scientific"
        ]
      }
    ],
  }),
})
