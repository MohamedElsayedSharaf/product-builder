export const productValidation = (product: {
    title: string;
    price: string;
    category: string
    description: string;
    image: string;
}) => {
    const errors: {
        title: string;
        price: string;
        category: string;
        description: string;
        image: string;
    } = { title: "", category: "", price: "" ,description: "", image: "",};
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(product.image);

    if (
        !product.title.trim() ||
        product.title.length < 5 ||
        product.title.length > 100
    ) {
        errors.title = "Product title must be between 5 and 100 characters!";
    }

    if (
        !product.category.trim() ||
        product.category.length < 5 ||
        product.category.length > 100
    ) {
        errors.category = "Product category must be between 5 and 100 characters!";
    }
    if (
        !product.description.trim() ||
        product.description.length < 10 ||
        product.description.length > 900
    ) {
        errors.description =
            "Product description must be between 10 and 900 characters!";
    }
    if (
        !product.image.trim() ||
        !urlPattern
    ) {
        errors.image =
            "Vaild image url is required!";
    }
    if (
        !product.price.trim() ||
        isNaN(Number(product.price))
    ) {
        errors.price =
            "Not a vailid number";
    }
    return errors;
};
