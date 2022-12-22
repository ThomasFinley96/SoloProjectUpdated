export const METHODS_TYPES = [
    {
        value: 0,
        label: 'Breakfast-In',
    },
    {
        value: 1,
        label: 'Lunch-In',
    },
    {
        value: 2,
        label: 'Dine-In',
    },
];

export const SIZES_TYPES = [
    {
        value: 0,
        label: 'Small',
    },
    {
        value: 1,
        label: 'Large',
    },
];

export const CHEESES_TYPES = [
    {
        value: 0,
        label: 'Blue Cheese',
        price: 10,
    },
    {
        value: 1,
        label: 'Cheddar',
        price: 20,
    },
    {
        value: 2,
        label: 'Mozzarella',
        price: 15,
    },
];

export const SAUCES_TYPES = [
    {
        value: 0,
        label: 'Marinara',
        price: 10,
    },
    {
        value: 1,
        label: 'Brown',
        price: 15,
    },
    {
        value: 2,
        label: 'Fish',
        price: 25,
    },
];

export const STROMBOLI_TYPES = [
    {
        value: 0,
        label: 'MarinBuffalo Chickenara',
        price: 12,
    },
    {
        value: 1,
        label: 'Classic Italian',
        price: 15,
    },
    {
        value: 2,
        label: 'Peppers, Ham, Pepperoni',
        price: 10,
    },
    {
        value: 3,
        label: 'Philly Cheese Cake',
        price: 12,
    },
    {
        value: 4,
        label: 'Metaball, Sausage',
        price: 18,
    },
    {
        value: 5,
        label: 'Chicken, Bacon, Ranch',
        price: 10,
    },
];

export const value2lable = (types, value) => {
    if (types.length === 0) {
        return '';
    } else {
        var results = types.filter(function (entry) { return entry.value === value; });
        return results[0].label;
    }
};

export const value2price = (types, value) => {
    if (types.length === 0) {
        return 0;
    } else {
        var results = types.filter(function (entry) { return entry.value === value; });
        return results[0].price;        
    }
}
