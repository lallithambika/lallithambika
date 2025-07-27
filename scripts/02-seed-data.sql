-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Vegetables', 'Fresh vegetables and produce'),
('Meat & Poultry', 'Fresh meat, chicken, and poultry products'),
('Dairy', 'Milk, cheese, yogurt, and dairy products'),
('Spices & Seasonings', 'Herbs, spices, and seasonings'),
('Grains & Rice', 'Rice, wheat, and other grains'),
('Oils & Fats', 'Cooking oils, butter, and fats'),
('Beverages', 'Soft drinks, juices, and beverages'),
('Packaging', 'Food containers, bags, and packaging materials'),
('Equipment', 'Kitchen equipment and utensils'),
('Frozen Foods', 'Frozen vegetables, meat, and prepared foods')
ON CONFLICT (name) DO NOTHING;
