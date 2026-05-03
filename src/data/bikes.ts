export interface Bike {
  id: string;
  name: string;
  price: number;
  year: number;
  driven: number;
  rc: string;
  ownership: string;
  rto: string;
  city: string;
  image: string;
  type: string;
}

export const bikes: Bike[] = [
  {
    id: "b1",
    name: "Royal Enfield Classic 350",
    price: 150000,
    year: 2021,
    driven: 12500,
    rc: "2036",
    ownership: "First",
    rto: "MH49",
    city: "Nagpur",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Retro",
  },
  {
    id: "b2",
    name: "KTM Duke 390",
    price: 210000,
    year: 2022,
    driven: 8400,
    rc: "2037",
    ownership: "First",
    rto: "MH31",
    city: "Nagpur",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Superbike",
  },
  {
    id: "b3",
    name: "Honda Activa 6G",
    price: 65000,
    year: 2020,
    driven: 18000,
    rc: "2035",
    ownership: "Second",
    rto: "CG04",
    city: "Raipur",
    image: "https://images.unsplash.com/photo-1625442544837-14e4b523f20f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Scooter",
  },
  {
    id: "b4",
    name: "Ola S1 Pro",
    price: 110000,
    year: 2023,
    driven: 4500,
    rc: "2038",
    ownership: "First",
    rto: "MH12",
    city: "Pune",
    image: "https://images.unsplash.com/photo-1678129088737-2de74ceeb6b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "EV",
  },
  {
    id: "b5",
    name: "Yamaha R15 V4",
    price: 180000,
    year: 2022,
    driven: 11200,
    rc: "2037",
    ownership: "First",
    rto: "MH49",
    city: "Nagpur",
    image: "https://images.unsplash.com/photo-1614002613589-9e85ea15db9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Superbike",
  },
  {
    id: "b6",
    name: "Bajaj Pulsar NS200",
    price: 95000,
    year: 2019,
    driven: 32000,
    rc: "2034",
    ownership: "Second",
    rto: "MP09",
    city: "Indore",
    image: "https://images.unsplash.com/photo-1599819811279-d50d66e921e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Normal",
  },
  {
    id: "b7",
    name: "TVS Jupiter",
    price: 55000,
    year: 2018,
    driven: 24000,
    rc: "2033",
    ownership: "Second",
    rto: "MH31",
    city: "Nagpur",
    image: "https://images.unsplash.com/photo-1601614920677-4b7754ebce01?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "Scooter",
  },
  {
    id: "b8",
    name: "Ather 450X",
    price: 125000,
    year: 2023,
    driven: 2100,
    rc: "2038",
    ownership: "First",
    rto: "MH12",
    city: "Pune",
    image: "https://images.unsplash.com/photo-1632126264624-912fb275813f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "EV",
  }
];
