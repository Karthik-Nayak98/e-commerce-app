import { v4 as uuid } from 'uuid';

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    id: uuid(),
    title: 'mens',
    imageUrl: 'https://i.imgur.com/4YDCFzB.jpg',
    url: 'mens',
  },
  {
    id: uuid(),
    title: 'womens',
    imageUrl: 'https://i.imgur.com/rssJ79v.jpg',
    url: 'womens',
  },
  {
    id: uuid(),
    title: 'earphones',
    imageUrl: 'https://i.postimg.cc/Lsd8rGj6/image.webp',
    url: 'earphone',
  },
  {
    id: uuid(),
    title: 'headphones',
    imageUrl: 'https://i.postimg.cc/25w3h2Bk/sony-headphones-deals.webp',
    url: 'headphone',
  },
  {
    id: uuid(),
    title: 'watch',
    imageUrl: 'https://i.postimg.cc/pXf9PWX5/galaxy-watch-5-watch-5-pro-3.webp',
    url: 'watch',
  },
];
