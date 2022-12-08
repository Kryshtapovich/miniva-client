export interface ImagePickerProps {
  limit?: number;
  photos: Array<string>;
  onAdd: (photos: Array<string>) => void;
  onRemove: (index: number) => void;
}
