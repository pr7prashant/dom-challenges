export const getAllCategories = () => {
  return fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((res) => res.map((c, idx) => ({ label: c, id: idx + 1 })));
};

export const getAllProducts = () => {
  return fetch("https://fakestoreapi.com/products").then((res) => res.json());
};

export const getProductsByCategories = async (categories) => {
  const res = await getAllProducts();

  if (!categories || categories.length === 0) return res;

  const filtered = res.filter((p) => categories.includes(p.category));

  return filtered;
};
