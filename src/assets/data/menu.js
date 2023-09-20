
import Salad from "../img/greek-salad.jpg";
import Bruschetta from "../img/bruchetta1.jpg";
import Lemon from "../img/lemon dessert.jpg";
import Calamari from "../img/calamari.jpeg";
import Avgolemono from "../img/avgolemono.jpg";
import Saganaki from "../img/saganaki.jpg";
import Lentil from "../img/lentil.jpg";
import Spanakopita from "../img/spanakopita.jpg";
import ChickenSouvlaki from "../img/chicken_souvlaki.jpg";
import Galaktobouriko from "../img/galaktobouriko.jpg";
import LambChops from "../img/lamb.jpg";
import Sokolatina from "../img/sokolatina.jpg";
import Moussaka from "../img/moussaka.jpg";
import Baklava from "../img/baklava.jpg";

const menuItems = [
    {
        img: Salad,
        title: "Greek salad",
        price: 12.99,
        type: "Salad",
        desc: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
        id: "100"
    },
    {
        img: Bruschetta,
        title: "Bruschetta",
        price: 5.99,
        type: "Appetizers",
        desc: "Our Bruschetta is made from grilled that has been smeared with garlic and seasoned with salt and olive oil.",
        id: "101"
    },
    {
        img: Lemon,
        title: "Lemon Dessert",
        price: 5.00,
        type: "Deserts",
        desc: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
        id: "102"
    },
    {
        img: Calamari,
        title: "Calamari",
        price: 12.99,
        type: "Appetizers",
        desc: "Tender calamari lightly breaded and fried, served with our own lemon-butter garlic sauce for dipping.",
        id: "103"
    },
    {
        img: Avgolemono,
        title: "Avgolemono",
        price: 10.00,
        type: "Soups",
        desc: "A creamy broth of chicken and rice with a hint of lemon. A Greek classic!",
        id: "104"
    },
    {
        img: Saganaki,
        title: "Saganaki",
        price: 5.00,
        type: "Appetizers",
        desc: "A mild Greek cheese that leaves our kitchen sizzling and flamed at your table with a shout of 'OPA!' Served with pita bread.",
        id: "105"
    },
    {
        img: Lentil,
        title: "Lentil",
        price: 10.00,
        type: "Soups",
        desc: "Traditional lentil bean soup enriched with fresh tomato sauce and whole garlic olives.",
        id: "106"
    },
    {
        img: Spanakopita,
        title: "Spanakopita",
        price: 5.00,
        type: "Appetizers",
        desc: "Crispy phyllo, stuffed with satuéed spinach and Feta cheese.",
        id: "107"
    },
    {
        img: ChickenSouvlaki,
        title: "Chicken Souvlaki Platter",
        price: 12.99,
        type: "Main",
        desc: "Medallions of chicken breast marinated in Greek olive oil and seasonings, skewered and broiled to perfection served with tzatziki.",
        id: "108"
    },
    {
        img: Galaktobouriko,
        title: "Galaktobouriko",
        price: 5.00,
        type: "Deserts",
        desc: "A phyllo wrapped custard perfectly baked and topped with a light honey syrup! Served warm.",
        id: "109"
    },
    {
        img: LambChops,
        title: "Lamb Chops",
        price: 10.00,
        type: "Main",
        desc: "Our perfectly seasoned Lamb Chops, flame broiled to your liking.",
        id: "110"
    },
    {
        img: Sokolatina,
        title: "Sokolatina",
        price: 5.00,
        type: "Deserts",
        desc: "Layers of feather light chocolate cake and chocolate whipped cream topped with dark chocolate ganache.",
        id: "111"
    },
    {
        img: Moussaka,
        title: "Moussaka",
        price: 10.00,
        type: "Main",
        desc: "A layered casserole of potatoes, roasted eggplant, topped with bechamel sauce and oven baked.",
        id: "112"
    },
    {
        img: Baklava,
        title: "Baklava",
        price: 12.99,
        type: "Deserts",
        desc: "Traditional Greek baklava consists of layers of thin crisp phyllo, chopped walnuts and cinnamon topped with honey syrup.",
        id: "113"
    },
];

export default menuItems;