fetch('../data.json')
  .then((response) => response.json())
  .then((data) => {
    const jsonData = data;
    const container = document.getElementById('product-container');

    jsonData.forEach((item, index) => {
      const product = document.createElement('div');
      product.className = 'product';

      product.innerHTML = `
      <div class="img relative w-fit">
            <img
              src=${item.image.mobile}
              alt=${item.name}
              class="block w-full rounded-lg lg:hidden"
            />
            <img
              src=${item.image.desktop}
              alt=${item.name}
              class="hidden w-full max-w-sm rounded-lg lg:block"
            />
            <button
              class="absolute -bottom-5 left-1/2 justify-center text-nowrap flex -translate-x-1/2 gap-1 rounded-full border-[.1px] border-rose-950 bg-white p-2 px-6 hover:border-accent hover:text-accent"
            >
              <img
                src="../assets/images/icon-add-to-cart.svg"
                alt="Add to Cart icon"
              />
              <div class="button-text text-base font-bold">
                Add to Cart
              </div>
            </button>
          </div>
          <div class="text mb-9 mt-9">
            <div class="text-gray-500">${item.category}</div>
            <div class="font-semibold text-red-950">${item.name}</div>
            <div class="font-semibold text-accent">&#36;${item.price}</div>
          </div>
          `;
      container.appendChild(product);
    });
  })
  .catch((error) => console.error('Error loading JSON:', error));
