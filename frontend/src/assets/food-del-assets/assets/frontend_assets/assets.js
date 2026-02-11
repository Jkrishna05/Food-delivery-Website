// Public folder assets - these will be served directly from /public/assets/
export const assets = {
    logo: '/assets/logo.png',
    basket_icon: '/assets/basket_icon.png',
    header_img: '/assets/header_img.png',
    search_icon: '/assets/search_icon.png',
    rating_starts: '/assets/rating_starts.png',
    add_icon_green: '/assets/add_icon_green.png',
    add_icon_white: '/assets/add_icon_white.png',
    remove_icon_red: '/assets/remove_icon_red.png',
    app_store: '/assets/app_store.png',
    play_store: '/assets/play_store.png',
    linkedin_icon: '/assets/linkedin_icon.png',
    facebook_icon: '/assets/facebook_icon.png',
    twitter_icon: '/assets/twitter_icon.png',
    cross_icon: '/assets/cross_icon.png',
    selector_icon: '/assets/selector_icon.png',
    profile_icon: '/assets/profile_icon.png',
    logout_icon: '/assets/logout_icon.png',
    bag_icon: '/assets/bag_icon.png',
    parcel_icon: '/assets/parcel_icon.png'
}

export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

export const menu_list = [
    {
        menu_name: "Salad",
        menu_image: '/assets/menu_1.png'
    },
    {
        menu_name: "Rolls",
        menu_image: '/assets/menu_2.png'
    },
    {
        menu_name: "Deserts",
        menu_image: '/assets/menu_3.png'
    },
    {
        menu_name: "Sandwich",
        menu_image: '/assets/menu_4.png'
    },
    {
        menu_name: "Cake",
        menu_image: '/assets/menu_5.png'
    },
    {
        menu_name: "Pure Veg",
        menu_image: '/assets/menu_6.png'
    },
    {
        menu_name: "Pasta",
        menu_image: '/assets/menu_7.png'
    },
    {
        menu_name: "Noodles",
        menu_image: '/assets/menu_8.png'
    }]

export const food_list = [
    {
        _id: "1",
        name: "Greek salad",
        image: '/assets/food_1.png',
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        _id: "2",
        name: "Veg salad",
        image: '/assets/food_2.png',
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    }, {
        _id: "3",
        name: "Clover Salad",
        image: '/assets/food_3.png',
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    }, {
        _id: "4",
        name: "Chicken Salad",
        image: '/assets/food_4.png',
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    }, {
        _id: "5",
        name: "Lasagna Rolls",
        image: '/assets/food_5.png',
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, {
        _id: "6",
        name: "Peri Peri Rolls",
        image: '/assets/food_6.png',
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, {
        _id: "7",
        name: "Chicken Rolls",
        image: '/assets/food_7.png',
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, {
        _id: "8",
        name: "Veg Rolls",
        image: '/assets/food_8.png',
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, {
        _id: "9",
        name: "Ripple Ice Cream",
        image: '/assets/food_9.png',
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    }, {
        _id: "10",
        name: "Fruit Ice Cream",
        image: '/assets/food_10.png',
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    }, {
        _id: "11",
        name: "Jar Ice Cream",
        image: '/assets/food_11.png',
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    }, {
        _id: "12",
        name: "Vanilla Ice Cream",
        image: '/assets/food_12.png',
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        _id: "13",
        name: "Chicken Sandwich",
        image: '/assets/food_13.png',
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        _id: "14",
        name: "Vegan Sandwich",
        image: '/assets/food_14.png',
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    }, {
        _id: "15",
        name: "Grilled Sandwich",
        image: '/assets/food_15.png',
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    }, {
        _id: "16",
        name: "Bread Sandwich",
        image: '/assets/food_16.png',
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    }, {
        _id: "17",
        name: "Cup Cake",
        image: '/assets/food_17.png',
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, {
        _id: "18",
        name: "Vegan Cake",
        image: '/assets/food_18.png',
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, {
        _id: "19",
        name: "Butterscotch Cake",
        image: '/assets/food_19.png',
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, {
        _id: "20",
        name: "Sliced Cake",
        image: '/assets/food_20.png',
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, {
        _id: "21",
        name: "Garlic Mushroom ",
        image: '/assets/food_21.png',
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    }, {
        _id: "22",
        name: "Fried Cauliflower",
        image: '/assets/food_22.png',
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    }, {
        _id: "23",
        name: "Mix Veg Pulao",
        image: '/assets/food_23.png',
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    }, {
        _id: "24",
        name: "Rice Zucchini",
        image: '/assets/food_24.png',
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        _id: "25",
        name: "Cheese Pasta",
        image: '/assets/food_25.png',
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        _id: "26",
        name: "Tomato Pasta",
        image: '/assets/food_26.png',
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    }, {
        _id: "27",
        name: "Creamy Pasta",
        image: '/assets/food_27.png',
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    }, {
        _id: "28",
        name: "Chicken Pasta",
        image: '/assets/food_28.png',
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    }, {
        _id: "29",
        name: "Buttter Noodles",
        image: '/assets/food_29.png',
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }, {
        _id: "30",
        name: "Veg Noodles",
        image: '/assets/food_30.png',
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }, {
        _id: "31",
        name: "Somen Noodles",
        image: '/assets/food_31.png',
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }, {
        _id: "32",
        name: "Cooked Noodles",
        image: '/assets/food_32.png',
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }
]
