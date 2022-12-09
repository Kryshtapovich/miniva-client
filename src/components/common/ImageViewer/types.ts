export interface ImageViewerProps {
  index?: number;
  visible: boolean;
  onClose: () => void;
  images: Array<string>;
}

export type Params = () => { ImageViewer: (props: ImageViewerProps) => JSX.Element };
