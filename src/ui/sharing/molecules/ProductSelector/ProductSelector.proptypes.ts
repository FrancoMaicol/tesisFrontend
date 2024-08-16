export type ProductSelectorProps = {
    onProductSelect: (
        productName: string, 
        productID: number,
    ) => void;
}