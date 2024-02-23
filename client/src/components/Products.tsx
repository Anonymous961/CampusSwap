const Products = () => {
  const data = [
    {
      id: 1,
      name: "Apple",
      price: "100",
      img: "https://i.postimg.cc/3x1SFyB9/apple.jpg",
      condition: "good",
      sold: false,
    },
    {
      id: 2,
      name: "Apple",
      price: "100",
      img: "https://i.postimg.cc/3x1SFyB9/apple.jpg",
      condition: "good",
      sold: false,
    },
    {
      id: 3,
      name: "Apple",
      price: "100",
      img: "https://i.postimg.cc/3x1SFyB9/apple.jpg",
      condition: "good",
      sold: false,
    },
    {
      id: 4,
      name: "Apple",
      price: "100",
      img: "https://i.postimg.cc/3x1SFyB9/apple.jpg",
      condition: "good",
      sold: false,
    },
    {
      id: 5,
      name: "Apple",
      price: "100",
      img: "https://i.postimg.cc/3x1SFyB9/apple.jpg",
      condition: "good",
      sold: false,
    },
    {
      id: 6,
      name: "Apple",
      price: "100",
      img: "https://i.postimg.cc/3x1SFyB9/apple.jpg",
      condition: "good",
      sold: false,
    },
    {
      id: 7,
      name: "Apple",
      price: "100",
      img: "https://i.postimg.cc/3x1SFyB9/apple.jpg",
      condition: "good",
      sold: false,
    },
    {
      id: 8,
      name: "Apple",
      price: "100",
      img: "https://i.postimg.cc/3x1SFyB9/apple.jpg",
      condition: "good",
      sold: false,
    },
    {
      id: 9,
      name: "Apple",
      price: "100",
      img: "https://i.postimg.cc/3x1SFyB9/apple.jpg",
      condition: "good",
      sold: false,
    },
  ];
  return (
    <section className="grid grid-cols-6 mx-8">
      <div className="rounded-md p-5">
        <h3 className="text-2xl">Filter</h3>
      </div>
      <div className="col-span-5 p-5 ">
        <h3 className="text-3xl mx-2 mb-5">All Items</h3>
        <div className="grid grid-cols-4 gap-5 m-2">
          {data.map((item) => {
            return (
              <div className="max-w-sm border-2 border-gray-300 rounded-md" key={item.id}>
                <img className="rounded-t-md object-fill w-" src={item.img} alt="" />
                <h4>{item.name}</h4>
                <p>{item.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
