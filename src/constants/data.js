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

// data.js

const menuData = [
  {
    category: "Lunch",
    sections: [
      {
        title: "Starters",
        items: [
          { name: "MARLOWE FRIES", description: "herbs, sea salt & horseradish aioli", price: 945 },
          { name: "BRUSSELS SPROUTS CHIPS", description: "lemon & sea salt", price: 1120 },
          { name: "Warm DEVILED EGG", description: "aged provolone, pickled jalapeño & bacon", price: 470 },
          { name: "Crispy POTATO CROQUETTES", description: "mozzarella cheese & homemade ranch", price: 1440 },
        ],
      },
      {
        title: "Mains",
        items: [
          {
            name: "Grilled SKIRT STEAK Salad",
            description: "head lettuces, shaved parmesan, smoked olive oil & steak sauce vinaigrette",
            price: 2930
          },
          {
            name: "Spicy Brick CHICKEN",
            description: "roasted cauliflower & Calabrian chili romesco",
            price: 3110
          },
          {
            name: "Grilled SCALLOPS",
            description: "avocado, la rossa radicchio & citrus",
            price: 2780
          },
        ],
      },
      {
        title: "Salads, Soup & Starters",
        items: [
          { name: "Baby Head LETTUCES", description: "herbs & citrus-shallot vinaigrette", price: 1772 },
          {
            name: "Sweet Gem LETTUCES",
            description: "Point Reyes blue cheese, candied bacon, herbed breadcrumbs & red wine vinaigrette",
            price: 1720
          },
          {
            name: "Grilled SKIRT STEAK Salad",
            description: "head lettuces, shaved parmesan, smoked olive oil & steak sauce vinaigrette",
            price: 4185
          },
          { name: "Grilled GULF SHRIMP", description: "HOT & boozy cocktail sauce", price: 1690 },
          {
            name: "Grilled Delta ASPARAGUS",
            description: "prosciutto di parma & lemon hollandaise",
            price: 3260
          },
          {
            name: "Herb Crusted LAMB RIBS",
            description: "fresno chili salsa verde & mint",
            price: 2870
          },
        ],
      },
      {
        title: "Sandwiches",
        items: [
          {
            name: "FAVA BEAN HUMMUS SANDWICH",
            description: "toasted rosemary focaccia, garlic-chili broccolini, persian cucumber, pea sprouts & oregano vinaigrette",
            price: 1690
          },
        ],
      },
    ],
  },
  {
    category: "Brunch",
    sections: [
      {
        title: "Snacks",
        items: [
          { name: "Grilled GULF SHRIMP", description: "HOT & boozy cocktail sauce", price: 1459 },
          { name: "Warm Deviled EGG", description: "aged provolone, pickled jalapeño & bacon", price: 393 },
          { name: "Marlowe FRIES", description: "sea salt & herbs", price: 945 },
          { name: "Crispy POTATO CROQUETTES", description: "mozzarella cheese & homemade ranch", price: 1440 },
        ],
      },
      {
        title: "Sweets",
        items: [
          {
            name: "Brûléed BANANA & SPRING BERRIES",
            description: "coconut yogurt & toasted macadamia",
            price: 1455
          },
          {
            name: "FRENCH TOAST Soldiers",
            description: "strawberry & chocolate sauces for dipping",
            price: 1365
          },
          {
            name: "LEMON RICOTTA Doughnuts",
            description: "blueberry-thyme compôte",
            price: 1860
          },
          {
            name: "Buttermilk PANCAKES",
            description: "smoked maple syrup, whipped butter & smoked salt",
            price: 1455
          },
          {
            name: "Candied Butchers Cut BACON",
            description: "thick cut, maple & brown sugar",
            price: 2460
          },
        ],
      },
      {
        title: "Savories",
        items: [
          {
            name: "AVOCADO Toast",
            description: "grilled levain, toasted garlic-chili, lemon & sea salt",
            price: 1449
          },
          {
            name: "Marlowe EGG SANDWICH",
            description: "soft scrambled eggs, cheddar, dijionaise, arugula & salsa verde",
            price: 1535
          },
          {
            name: "Farm Egg SCRAMBLE",
            description: "cauliflower, broccolini, red onion, cheddar & crème fraiche with grilled bread",
            price: 1899
          },
          {
            name: "Smoked SALMON Tartine",
            description: "focaccia, horseradish cream, poached egg & hollandaise",
            price: 2140
          },
          {
            name: "Anson Mills POLENTA",
            description: "wild mushrooms, poached egg, parmesan, arugula & truffled salsa verde",
            price: 2400
          },
          {
            name: "Marlowe BURGER",
            description: "caramelized onions, cheddar, bacon & horseradish aioli with fries",
            price: 2335
          },
          {
            name: "LEMON RICOTTA Doughnuts",
            description: "blueberry-thyme compôte",
            price: 1755
          },
          {
            name: "Black Pepper & Parmesan GOUGÈRES",
            description: "smoked salmon, whipped crème fraiche, tarragon & dill",
            price: 2300
          },
        ],
      },
    ],
  },
  {
    category: "Mid Day Menu",
    sections: [
      {
        title: "",
        items: [
          { name: "Crispy BRUSSELS SPROUTS Chips", description: "lemon & sea salt", price: 1340 },
          { name: "Warm Deviled EGG", description: "aged provolone, pickled jalapeño & bacon", price: 478 },
          { name: "Blood ORANGES & Baby BEETS", description: "frisee, burrata & candied sesame", price: 1420 },
          { name: "Grilled GULF SHRIMP", description: "HOT & boozy cocktail sauce", price: 2870 },
          {
            name: "Marlowe BURGER",
            description: "caramelized onions, cheddar, bacon, horseradish aioli & fries",
            price: 2570
          },
          {
            name: "Herb Crusted LAMB RIBS",
            description: "fresno chili salsa verde & mint",
            price: 2880
          },
          {
            name: "Crispy POTATO CROQUETTES",
            description: "mozzarella cheese & homemade ranch",
            price: 2440,
          },
          {
            name: "Grilled Delta ASPARAGUS",
            description: "prosciutto di parma & lemon hollandaise",
            price: 3140
          },
        ],
      },
    ],
  },
  {
    category: "Dessert",
    sections: [
      {
        title: "",
        items: [
          {
            name: "Maria's BREAD PUDDING",
            description: "banana, raisin, vanilla bean ice cream & bourbon caramel",
            price: 1120
          },
          {
            name: "Chocolate CAKE",
            description: "crème chantilly, fresh strawberries & strawberry sauce",
            price: 1640
          },
          {
            name: "Loretta's VACHERIN",
            description: "coffee ice cream, crème anglaise, almonds & chocolate sauce",
            price: 1820
          },
          {
            name: "Vanilla Bean CHEESECAKE",
            description: "Spring berries & sesame crisp",
            price: 1540
          },
          {
            name: "CHOCOLATE PEANUT BUTTER Bites",
            description: "guittard chocolate & peanuts",
            price: 760
          },
        ],
      },
    ],
  },
];


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
        type : "Takeaway",
        experience_list : [
            "Stylish, eco-friendly packaging",
            "Express pickup lounge",
            "Pre-order and contactless payment",
            "Loyalty perks"
        ]
    },
    {
        type : "Order-Online",
        experience_list : [
            "Sleek, intuitive ordering platform",
            "Bespoke meal customization",
            "Premium recyclable delivery packaging",
            "Oorder tracking"
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
    what_we_offer, menuData,menuIntro, dining_experience, gallery, team, footerData
};
export default datas;