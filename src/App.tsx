import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import { colors, inputDataList, productList } from "./components/data";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { Iproduct } from "./interface";
import { productValidation } from "./validation";
import ErroeMessage from "./components/ui/ErroeMessage";
import CircleColor from "./components/ui/CircleColor";
import { product } from "./types";
function App() {
  const productObject = {
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
    colors: [],
    rating: {
      count: 0,
      rate: 0,
    },
  };
  const [isOpen, setIsOpen] = useState(false);
  const [removeProduct, setRemoveProduct] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    price: "",
  });
  const [products, setProducts] = useState<Iproduct[]>(productList);
  const [product, setProduct] = useState<Iproduct>(productObject);
  const [editProduct, setEditProduct] = useState<Iproduct>(productObject);
  const [editProductIdx, setEditProductIdx] = useState<number>(0);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const openEditModal = () => setIsOpenEditModal(true);
  const closeEditModal = () => setIsOpenEditModal(false);
  const openRemoveModal = () => setRemoveProduct(true);
  const closeRemoveModal = () => setRemoveProduct(false);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setEditProduct({
      ...editProduct,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const { title, description, category, image, price } = product;

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = productValidation({
      title,
      description,
      category,
      image,
      price,
    });
    const isError =
      Object.values(errors).some((val) => val === "") &&
      Object.values(errors).every((val) => val === "");
    if (!isError) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      { ...product, id: uuid(), colors: tempColor },
      ...prev,
    ]);
  };
  const submitEditHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, price, image, category, description } = editProduct;
    const errors = productValidation({
      title,
      description,
      category,
      image,
      price,
    });
    const isError =
      Object.values(errors).some((val) => val === "") &&
      Object.values(errors).every((val) => val === "");
    if (!isError) {
      setErrors(errors);
      return;
    }
    const updatedProducts = [...products];
    updatedProducts[editProductIdx] = {
      ...editProduct,
      colors: tempColor.concat(editProduct.colors ?? []),
    };
    setProducts(updatedProducts);
    setEditProduct(productObject);
    setTempColor([]);
    closeEditModal();
  };
  const cancelHandler = () => {
    setProduct(productObject);
    setIsOpen(false);
  };
  const removeProductHandler = () => {
    const filtered = products.filter(
      (product) => product.id !== editProduct.id
    );
    setProducts(filtered);
    closeRemoveModal();
  };
  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setEditproduct={setEditProduct}
      openEditModal={openEditModal}
      idx={idx}
      setEditProductIdx={setEditProductIdx}
      openRemoveModal={openRemoveModal}
    />
  ));
  const renderInputDataList = inputDataList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="mb-2">
        {input.label}
      </label>
      <Input
        type="text"
        name={input.name}
        value={product[input.name]}
        id={input.id}
        onChange={onChangeHandler}
      />
      <ErroeMessage msg={errors[input.name]} />
    </div>
  ));
  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColor.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        if (editProduct.colors?.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColor((prev) => [...prev, color]);
      }}
    />
  ));
  const renderEditProductsWithErrMsg = (
    id: string,
    label: string,
    name: product
  ) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-2">
          {label}
        </label>
        <Input
          type="text"
          name={name}
          value={editProduct[name]}
          id={id}
          onChange={onChangeEditHandler}
        />
        <ErroeMessage msg={errors[name]} />
      </div>
    );
  };
  return (
    <div>
      <Button
        onClick={open}
        className="w-1/3 bg-indigo-900 block mx-auto capitalize"
      >
        Build a new product
      </Button>
      <div className="m-3 p-3 h-auto rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {renderProductList}
      </div>
      {/* Add */}
      <Modal isOpen={isOpen} close={close} title="Add a new product">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderInputDataList}
          <div className="flex items-center space-x-2 mt-3 flex-wrap mb-2">
            {tempColor.map((color) => (
              <span
                key={color}
                className="text-white rounded-m m-1 p-1 text-sm"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-2 mt-3">
            {renderProductColors}
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 w-full">Submit</Button>
            <Button className="bg-gray-700 w-full" onClick={cancelHandler}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* Edit */}
      <Modal
        isOpen={isOpenEditModal}
        close={closeEditModal}
        title="Edit this product"
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderEditProductsWithErrMsg("title", "Product title", "title")}
          {renderEditProductsWithErrMsg(
            "description",
            "Product description",
            "description"
          )}
          {renderEditProductsWithErrMsg(
            "category",
            "Product category",
            "category"
          )}
          {renderEditProductsWithErrMsg("image", "Product imageUrl", "image")}
          {renderEditProductsWithErrMsg("price ", "Product price ", "price")}
          <div
            className="flex items-center space-x-2 mt-3 flex-wrap mb-2"
            style={{ marginBottom: "10px" }}
          >
            {renderProductColors}
          </div>
          {tempColor.concat(editProduct.colors ?? [])?.map((color) => (
            <span
              key={color}
              className="text-white rounded-md m-1 p-1 text-xs mt-3"
              style={{ backgroundColor: color }}
            >
              {color}
            </span>
          ))}
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 w-full">Submit</Button>
            <Button className="bg-gray-700 w-full" onClick={cancelHandler}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={removeProduct}
        close={closeRemoveModal}
        title="Are you sure you want to remove this product from your store"
        description="Deleting this product will remove it premenatly from your inventory. 
                Any associated data, sales history and other related information will also deleted.
                Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button
            className="bg-[#c2344d] w-full hover:bg-red-800"
            onClick={removeProductHandler}
          >
            Yes, remove
          </Button>
          <Button
            className="bg-[#43af28] w-full text-black"
            onClick={closeRemoveModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
