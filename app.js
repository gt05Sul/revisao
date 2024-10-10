
const categorias = [
    "Roupas",
    "Calçados",
    "Eletrônicos",
    "Eletrodomésticos",
    "Alimentos",
    "Higiene e limpeza"
];

function loadCategorias() {
    const categorySelect = document.getElementById('category');

    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = 'Selecione uma categoria';
    placeholderOption.disabled = true;
    placeholderOption.selected = true;

    categorySelect.appendChild(placeholderOption);

    categorias.forEach(category => {
        const option = document.createElement('option');
        option.value = category
        // option.setAttribute("value", category);
        option.textContent = category;
        categorySelect.appendChild(option);
    })
}

function addProduct(event) {
    event.preventDefault();

    const {
        name: { value: name },
        price: { value: price },
        category: { value: category },
        rating: { value: rating },
        urlAvatar: { value: urlAvatar }
    } = {
        name: document.getElementById('name'),
        price: document.getElementById('price'),
        category: document.getElementById('category'),
        rating: document.getElementById('rating'),
        urlAvatar: document.getElementById('urlAvatar')
    };
    if (!name || !price || !category || !rating || !urlAvatar) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    const product = {
        name,
        price: Number(price),
        category,
        rating: Number(rating),
        urlAvatar
    }
    addProductToList(product);
    clearForm();
}
const addProductToList = ({name, price, category, rating, urlAvatar }) => {
    const productList = document.getElementById('productList');
    const li = document.createElement('li');
    li.innerHTML = `
        <img src="${urlAvatar}" alt="${name}">
        <h3>${name}</h3>
        <p>Preço: R$ ${price.toFixed(2)}</p>
        <p>Categorias: ${category}</p>
        <div class="rating">${renderStars(rating)}</div>
    `;
    productList.appendChild(li);
}

const clearForm = () => {
    document.getElementById('productForm').reset();
};

const renderStars = rating => {
    const fullStar = '★';
    const emptyStar = '☆';
    return fullStar.repeat(rating) + emptyStar.repeat(5 - rating);
}

loadCategorias()
document.getElementById('productForm').addEventListener('submit', addProduct);