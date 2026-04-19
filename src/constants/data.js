import images from "./images";
import { FaInstagram, FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";

const what_we_offer=[
    {
        image : `${images.takeOrder2}`,
        title : "The Dining Experience",
        paragraph : "Experience warm hospitality with our attentive dine-in table service. Our friendly staff ensures every detail is perfect, from seating you comfortably to guiding you through our menu. Enjoy a relaxed atmosphere, personalized recommendations, and freshly prepared dishes, making every meal at our restaurant a memorable occasion."
    },
    {
        image : `${images.drink5}`,
        title : "Signature Beverage Lounge",
        paragraph : "Unwind in our Signature Beverage Lounge, where expert mixologists craft unique cocktails, mocktails, and artisanal drinks. Whether you prefer a classic favorite or an inventive new creation, our lounge offers the perfect setting to relax, socialize, and savor exceptional beverages in a stylish, inviting ambiance."
    },
    {
        image : `${images.team6}`,
        title : "Crafted Pour Bar",
        paragraph : "Our open bar invites you to explore a wide selection of premium spirits, wines, and craft beers. Enjoy expertly mixed drinks and a lively atmosphere, perfect for unwinding after work or celebrating with friends. Our bartenders are always ready to recommend something special to suit your taste."
    },
    {
        image : `${images.meals2}`,
        title : "Global Culinary Journey",
        paragraph : "Discover a diverse range of cuisines thoughtfully curated by our chefs. From timeless classics to contemporary flavors, our menu celebrates global culinary traditions using the finest local ingredients. Each dish is crafted with passion, ensuring a delicious journey for every palate and occasion."
    },
    {
        image : `${images.chef3}`,
        title : "Chef’s Table & Insider Access",
        paragraph : "Delight in our Chef’s Specials—unique creations inspired by seasonal ingredients and culinary innovation. For a truly immersive experience, join our behind-the-scenes kitchen tours, where you can meet our chefs, see the artistry in action, and learn the stories behind your favorite dishes."
    },
];

// Menu is now fetched dynamically from MongoDB API
// No static menuData needed - use GET /api/menu endpoint

const menuIntro = {
  description: `Ready to treat your taste buds? Dive into our menu and explore a world of flavors crafted just for you. Craving something classic or feeling adventurous? Let’s find your perfect dish together!`,
  buttonText: "Indulge",
  image: `${images.drink3}`, 
};


const dining_experience = [
    {
        type : "Dine-In",
        experience_list : [
            "Plush seating and elegant déco",
            "Private dining suites",
            "Impeccable table service",
            "Curated wine and drink list",
            "Ambient lighting and live music"
        ]
    },
    {
        type : "Order-Online",
        experience_list : [
            "Sleek, intuitive ordering platform",
            "Bespoke meal customization",
            "Premium recyclable delivery packaging",
            "Real-time order tracking"
        ]
    },
]

const gallery = [
    {
        img : `${images.people1}`,
        title : "Outings"
    },
    {
        img : `${images.people2}`,
        title : "Dates"
    },
    {
        img : `${images.people4}`,
        title : "Family Dinners"
    },
    {
        img : `${images.takeOrder}`,
        title : "Customizations"
    },
    {
        img : `${images.drink4}`,
        title : "Solo Nights"
    },
    {
        img : `${images.meals}`,
        title : "Dine Delicious"
    },
    {
        img : `${images.cafe}`,
        title : "CafÉ"
    },
];

const team = [
    {
        img : `${images.chef3a}`,
        name : "Rayo Emma",
        post : "Executive Chef"
    },
    {
        img : `${images.chef1a}`,
        name : "Liam Bennett",
        post : "Executive Chef"
    },
    {
        img : `${images.chef4a}`,
        name : "Aditya Joshi",
        post : "Chef de Cuisine"
    },
    {
        img : `${images.team4a}`,
        name : "Manyta Collins",
        post : "Barista"
    },
    {
        img : `${images.chef2a}`,
        name : "Nguyen Minh",
        post : "Pastry Maestro"
    },
    {
        img : `${images.team6a}`,
        name : "Alejandro Torres",
        post : "Sommelier"
    },
    {
        img : `${images.takeOrder_a}`,
        name : "Jean-Luc Dubois",
        post : "Waitstaff"
    },
    {
        img : `${images.takeOrder2a}`,
        name : "Daniel Morgan",
        post : "Waitstaff"
    },
    {
        img : `${images.team1a}`,
        name : "Aisha Abdi",
        post : "Guest Experience Manager"
    },
    {
        img : `${images.team2a}`,
        name : "Fatoumata Diallo",
        post : "Hygiene & Ambiance Specialist"
    },
];

const footerData = [
  {
    section: "VISIT US",
    content: [
      "1381 Boylston Street",
      "Boston, MA 02215",
      "617-266-1300",
    ],
  },
  {
    section: "DINING HOURS",
    content: [
      { label: "MONDAY - THURSDAY", time: "11:30 - 9:00" },
      { label: "FRIDAY - SATURDAY", time: "11:30 - 10:00" },
      { label: "SUNDAY", time: "11:30 - 9:00" },
    ],
  },
  {
    section: "LET'S GET SOCIAL",
    social: [
      {
        label: "Instagram",
        url: "https://instagram.com/",
        icon: <FaInstagram />,
      },
      {
        label: "Facebook",
        url: "https://facebook.com/",
        icon: <FaFacebook />,
      },
      {
        label: "Twitter",
        url: "https://twitter.com/",
        icon: <FaTwitter />,
      },
      {
        label: "Google",
        url: "https://google.com/",
        icon: <FaGoogle />,
      },
    ],
  },
];

const datas = {
    what_we_offer, menuIntro, dining_experience, gallery, team, footerData
};
export default datas;