import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { fireDB } from '../fireabase/FirebaseConfig';

const sampleProducts = [
  // Electronics
  {
    title: "iPhone 14 Pro",
    price: "999",
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
    category: "electronics",
    description: "Latest iPhone with advanced camera system and A16 Bionic chip"
  },
  {
    title: "Samsung Galaxy S23",
    price: "799",
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
    category: "electronics",
    description: "Flagship Android phone with excellent display and camera"
  },
  {
    title: "MacBook Air M2",
    price: "1199",
    imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500",
    category: "electronics",
    description: "Lightweight laptop with M2 chip and all-day battery life"
  },
  {
    title: "Wireless Bluetooth Headphones",
    price: "79",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "electronics",
    description: "High-quality wireless headphones with noise cancellation"
  },
  {
    title: "Smart Watch",
    price: "299",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    category: "electronics",
    description: "Advanced smartwatch with health monitoring features"
  },
  {
    title: "Gaming Mouse",
    price: "69",
    imageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    category: "electronics",
    description: "High-precision gaming mouse with RGB lighting"
  },
  {
    title: "Mechanical Keyboard",
    price: "149",
    imageUrl: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500",
    category: "electronics",
    description: "Mechanical keyboard with tactile switches"
  },
  {
    title: "Bluetooth Speaker",
    price: "99",
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    category: "electronics",
    description: "Portable Bluetooth speaker with rich sound quality"
  },
  {
    title: "iPad Pro",
    price: "899",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    category: "electronics",
    description: "Professional tablet with M2 chip and Liquid Retina display"
  },
  {
    title: "Wireless Earbuds",
    price: "199",
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
    category: "electronics",
    description: "Premium wireless earbuds with active noise cancellation"
  },

  // Fashion
  {
    title: "Nike Air Max 270",
    price: "150",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    category: "fashion",
    description: "Comfortable running shoes with Air Max cushioning"
  },
  {
    title: "Adidas Ultraboost 22",
    price: "180",
    imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
    category: "fashion",
    description: "Premium running shoes with responsive cushioning"
  },
  {
    title: "Levi's 501 Jeans",
    price: "89",
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    category: "fashion",
    description: "Classic straight-fit jeans in premium denim"
  },
  {
    title: "Sunglasses",
    price: "89",
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
    category: "fashion",
    description: "Stylish sunglasses with UV protection"
  },
  {
    title: "Backpack",
    price: "59",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    category: "fashion",
    description: "Durable backpack perfect for travel and daily use"
  },
  {
    title: "Leather Jacket",
    price: "299",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    category: "fashion",
    description: "Premium leather jacket with classic design"
  },
  {
    title: "Cotton T-Shirt",
    price: "25",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "fashion",
    description: "Comfortable cotton t-shirt in various colors"
  },
  {
    title: "Sneakers",
    price: "120",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
    category: "fashion",
    description: "Trendy sneakers for everyday wear"
  },
  {
    title: "Watch",
    price: "199",
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500",
    category: "fashion",
    description: "Elegant analog watch with leather strap"
  },
  {
    title: "Baseball Cap",
    price: "29",
    imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500",
    category: "fashion",
    description: "Classic baseball cap with adjustable strap"
  },

  // Books
  {
    title: "The Great Gatsby",
    price: "12",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    category: "books",
    description: "Classic American novel by F. Scott Fitzgerald"
  },
  {
    title: "To Kill a Mockingbird",
    price: "14",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500",
    category: "books",
    description: "Timeless story of justice and morality by Harper Lee"
  },
  {
    title: "1984",
    price: "13",
    imageUrl: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=500",
    category: "books",
    description: "Dystopian masterpiece by George Orwell"
  },
  {
    title: "Pride and Prejudice",
    price: "11",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
    category: "books",
    description: "Classic romance novel by Jane Austen"
  },
  {
    title: "The Catcher in the Rye",
    price: "15",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
    category: "books",
    description: "Coming-of-age story by J.D. Salinger"
  },
  {
    title: "Harry Potter Series",
    price: "89",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500",
    category: "books",
    description: "Complete 7-book series by J.K. Rowling"
  },
  {
    title: "The Lord of the Rings",
    price: "45",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    category: "books",
    description: "Epic fantasy trilogy by J.R.R. Tolkien"
  },
  {
    title: "Atomic Habits",
    price: "18",
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500",
    category: "books",
    description: "Self-improvement book by James Clear"
  },

  // Home
  {
    title: "Coffee Maker",
    price: "129",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
    category: "home",
    description: "Programmable coffee maker with thermal carafe"
  },
  {
    title: "Desk Lamp",
    price: "39",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
    category: "home",
    description: "LED desk lamp with adjustable brightness"
  },
  {
    title: "Throw Pillow",
    price: "25",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    category: "home",
    description: "Decorative throw pillow for sofa or bed"
  },
  {
    title: "Wall Art",
    price: "49",
    imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500",
    category: "home",
    description: "Modern abstract wall art for home decoration"
  },
  {
    title: "Table Lamp",
    price: "69",
    imageUrl: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=500",
    category: "home",
    description: "Elegant table lamp with fabric shade"
  },
  {
    title: "Candle Set",
    price: "35",
    imageUrl: "https://images.unsplash.com/photo-1602874801006-e26d405c9c8e?w=500",
    category: "home",
    description: "Scented candle set for relaxation"
  },
  {
    title: "Plant Pot",
    price: "19",
    imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500",
    category: "home",
    description: "Ceramic plant pot for indoor plants"
  },
  {
    title: "Kitchen Scale",
    price: "45",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
    category: "home",
    description: "Digital kitchen scale for precise measurements"
  },

  // Fitness
  {
    title: "Yoga Mat",
    price: "35",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
    category: "fitness",
    description: "Non-slip yoga mat for comfortable practice"
  },
  {
    title: "Protein Powder",
    price: "45",
    imageUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500",
    category: "fitness",
    description: "Whey protein powder for muscle building and recovery"
  },
  {
    title: "Water Bottle",
    price: "25",
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    category: "fitness",
    description: "Insulated stainless steel water bottle"
  },
  {
    title: "Dumbbells Set",
    price: "89",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
    category: "fitness",
    description: "Adjustable dumbbells for home workouts"
  },
  {
    title: "Resistance Bands",
    price: "29",
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500",
    category: "fitness",
    description: "Set of resistance bands for strength training"
  },
  {
    title: "Fitness Tracker",
    price: "149",
    imageUrl: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500",
    category: "fitness",
    description: "Advanced fitness tracker with heart rate monitor"
  },
  {
    title: "Exercise Ball",
    price: "39",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
    category: "fitness",
    description: "Anti-burst exercise ball for core workouts"
  },
  {
    title: "Jump Rope",
    price: "15",
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500",
    category: "fitness",
    description: "Speed jump rope for cardio workouts"
  }
];

export const addSampleProducts = async () => {
  try {
    console.log('Starting to add sample products...');
    
    for (let i = 0; i < sampleProducts.length; i++) {
      const product = {
        ...sampleProducts[i],
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      };
      
      const productRef = collection(fireDB, 'products');
      await addDoc(productRef, product);
      console.log(`Added product ${i + 1}/${sampleProducts.length}: ${product.title}`);
    }
    
    console.log(`All ${sampleProducts.length} sample products added successfully!`);
    return { success: true, count: sampleProducts.length };
  } catch (error) {
    console.error('Error adding sample products:', error);
    return { success: false, error: error.message };
  }
};