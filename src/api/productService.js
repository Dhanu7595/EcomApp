export const fetchProducts = async () => {
const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  return data;
};

export const fetchProductById = async (id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();
  return data;
};
