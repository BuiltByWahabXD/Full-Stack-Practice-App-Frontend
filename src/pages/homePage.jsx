import { useAuth } from "../auth/AuthProvider";
import "../styles/homepage.css";
import RecipeCard from '../components/RecipeCard';

const Homepage = () => {
  const { user } = useAuth();

  return (
    <div className="homepage-container">
      <div className="homepage-cards">
        <RecipeCard
          title="Nihari"
          subheader="South Asian Delight"
          image="/static/images/recipeImages/Nihari.jpg"
          body="A rich and flavorful stew made with slow-cooked meat and spices."
          avatarLetter="P"
          expandedContent="Nihari is a traditional South Asian stew consisting of slow-cooked meat, usually beef or lamb, simmered overnight with a blend of spices. It is typically enjoyed as a hearty breakfast dish, served with naan or rice."
        />

        <RecipeCard
          title="Beef Steak"
          subheader="American Classic"
          image="/static/images/recipeImages/steak.jpg"
          body="Perfectly grilled steak served with herbs and garlic butter."
          avatarLetter="B"
          expandedContent="Beef Steak is a classic American dish that features a juicy cut of beef, typically seasoned with salt, pepper, and garlic, then grilled to perfection. It is often served with sides like mashed potatoes, steamed vegetables, or a fresh salad."
        />

        <RecipeCard
          title="Chicken Biryani"
          subheader="South Asian Dish"
          image="/static/images/recipeImages/biryani.jpg"
          body="Aromatic basmati rice cooked with spicy chicken."
          avatarLetter="C"
          expandedContent="Chicken Biryani is a flavorful and aromatic dish made with layers of marinated chicken, basmati rice, and a blend of spices. It is often garnished with fried onions, fresh herbs, and served with raita or salad."
        />

        <RecipeCard
          title="Chicken Karahi"
          subheader="Healthy"
          image="/static/images/recipeImages/karahi.jpg"
          body="Fresh vegetables tossed with olive oil and lemon."
          avatarLetter="K"
          expandedContent="Chicken Karahi is a popular South Asian dish made with chicken, tomatoes, green chilies, and a blend of spices cooked in a wok-like pan called a 'karahi'. It is known for its rich flavor and aromatic spices."
        />

        <RecipeCard
          title="Chocolate Cake"
          subheader="Dessert"
          image="/static/images/recipeImages/cake.jpg"
          body="Rich chocolate cake topped with creamy ganache."
          avatarLetter="D"
          expandedContent="This chocolate cake is made with the finest cocoa and topped with a smooth, creamy ganache for an indulgent dessert experience."
        />
      </div>
    </div>
  );
};

export default Homepage;
