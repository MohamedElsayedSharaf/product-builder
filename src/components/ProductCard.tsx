import { textSlicer } from "../utilitts/txtSlicer";
import { Iproduct } from "../interface";
import Button from "./ui/Button";
import Image from "./ui/Image";
import CircleColor from "./ui/CircleColor";

interface Iprops {
    product: Iproduct;
    setEditproduct: (product: Iproduct) => void;
    openEditModal: () => void;
    openRemoveModal: () => void;
    idx: number;
    setEditProductIdx: (value: number) => void
}

const ProductCard = ({ product, setEditproduct, openEditModal, idx, setEditProductIdx, openRemoveModal }: Iprops) => {
    const {category,description,image,price,colors,title} = product
    const renderProductColors = colors?.map((color, index) => <CircleColor key={`${color}-${index}`} color={color}
    />)
    const editProduct = () => {
        setEditproduct(product)
        openEditModal();
        setEditProductIdx(idx)
    }
    const removeProduct = () => {
        openRemoveModal();
        setEditproduct(product);
    }
    return (
        <>
            <div className="container border m-5 p-4 rounded-md flex flex-col shadow-md">
                <Image
                    src={image}
                    alt="name"
                    className="rounded-md h-96 max-w-full"
                />
                <h1 className="font-bold text-xl mb-2">{title}</h1>
                <h1 className="font-bold text-sm capitalize text-gray-500 mb-2">{category}</h1>
                <p className="mb-2 h-full">
                    {textSlicer(description)}
                </p>
                <div className="flex items-center flex-wrap space-x-1 mb-2">
                    {renderProductColors}
                </div>
                <div className="flex items-center justify-between mb-2">
                    <span>{price}$</span>
                    <Image
                        src={image}
                        alt=""
                        className="w-6 h-6 rounded-full"
                    />
                </div>
                <div className="flex items-center space-x-2 mt-2">
                    <Button className="bg-green-700 w-full" onClick={() => editProduct()}>
                        Edit
                    </Button>
                    <Button className="bg-red-700 w-full" onClick={() => removeProduct()}>
                        Delete
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
