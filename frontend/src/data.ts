import { Job } from "./app/shared/models/Job";

export const sample_jobs: Job[] = [
  {
  id:'1',
  name: 'Epilare faciala',
  jobTime: '40-50',
  price: 35,
  stars: 4.5,
    imageUrl: 'assets/epilare-faciala.jpg',
    favorite: false,

},
{
  id:'2',
  name: 'Epilare mustata',
  jobTime: '20-30',
  price: 20,
  stars: 4,
  imageUrl: 'assets/epilare-mustata.jpg',
  favorite: true,

},
{
  id:'3',
  name: 'Laminare sprancene',
  jobTime: '80-90',
  price: 130,
  stars: 5,
  imageUrl: 'assets/laminare.jpg',
  favorite: false,

},
{
  id:'4',
  name: 'Laminare si Vopsire',
  jobTime: '120-130',
  price: 130,
  stars: 3.5,
  imageUrl: 'assets/laminare-vopsire.jpg',
  favorite: true,

},
{
  id:'5',
  name: 'Stilizare sprancene',
  jobTime: '30-40',
  price: 50,
  stars: 3.4,
  imageUrl: 'assets/stilizare.jpg',
  favorite: false,

},
{
  id:'6',
  name: 'Stilizare si Vopsire',
  jobTime: '50-60',
  price: 60,
  stars: 2.5,
  imageUrl: 'assets/stilizat-vopsire.jpg',
  favorite: true,

  },
  {
    id:'7',
    name: 'Vopsit gene',
    jobTime: '20-30',
    price: 40,
    stars: 2,
    imageUrl: 'assets/vopsit-gene.jpg',
    favorite: false,

  },
]
