export type IconsProps = {
    fill: string;
    dimensions?: IconDimensions; 
}

type IconDimensions = {
    width: string;
    height: string;
    viewBox: IconViewBox;
}

type IconViewBox = [string, string, string, string]