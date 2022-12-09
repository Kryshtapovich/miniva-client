import { useState } from 'react';
import { View } from 'react-native';

import { ImagePicker } from '@components/common';

import { FormField } from '../FormField';
import { ErrorText } from '../ErrorText';
import { FormComponentProps, FormFieldProps } from '../types';

export function FormImagePicker(props: FormComponentProps) {
  const { control, name, error } = props;

  const [photos, setPhotos] = useState<Array<string>>(control._fields[name]?._f.value || []);

  const renderField = (field: Parameters<FormFieldProps['render']>[0]) => {
    const { onChange } = field;

    const addPhoto = (photo: Array<string>) => {
      const newPhotos = photos.concat(photo);
      setPhotos(newPhotos);
      onChange(newPhotos);
    };

    const removePhoto = (index: number) => {
      const newPhotos = photos.filter((_, i) => i !== index);
      setPhotos(newPhotos);
      onChange(newPhotos);
    };

    return <ImagePicker photos={photos} onAdd={addPhoto} onRemove={removePhoto} />;
  };

  return (
    <View>
      <FormField control={control} name={name} render={renderField} />
      <ErrorText error={error} align={'left'} />
    </View>
  );
}
