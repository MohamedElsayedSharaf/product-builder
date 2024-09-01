interface Iprops {
    alt: string;
    className: string;
    src: string
}
const Image = ({ alt, className, src }: Iprops) => {
    return (
        <div>
            <img src={src} alt={alt} className={className} />
        </div>
    )
}

export default Image
