module.exports = {
  products: [
    {
      id: 1,
      name: 'Sauce Labs Backpack',
      description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
      price: 29.99
    },
    {
      id: 2,
      name: 'Sauce Labs Bike Light',
      description: "A red light isn't the desired state in testing but it sure looks good under the back cover.",
      price: 9.99
    },
    {
      id: 3,
      name: 'Sauce Labs Bolt T-Shirt',
      description: 'Get your testing superhero arms in the Sause Labs bolt T-shirt.',
      price: 15.99
    },
    {
      id: 4,
      name: 'Sauce Labs Fleece Jacket',
      description: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
      price: 49.99
    },
    {
      id: 5,
      name: 'Sauce Labs Onesie',
      description: 'Rib snap infant onesie for the junior automation engineer in development. Reinforced triple-stitched sleeves, torso, and leg openings.',
      price: 7.99
    },
    {
      id: 6,
      name: 'Test.allTheThings() T-Shirt',
      description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfortable!',
      price: 15.99
    }
  ],
  checkoutInfo: {
    valid: {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    },
    emptyFirstName: {
      firstName: '',
      lastName: 'Doe',
      postalCode: '12345'
    },
    emptyLastName: {
      firstName: 'John',
      lastName: '',
      postalCode: '12345'
    },
    emptyPostalCode: {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: ''
    }
  }
};
