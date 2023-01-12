/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { Text } from '@nextui-org/react';

import { Container } from './styles';
import { Label } from '../shared-components';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

export function MultiImageUpload({
  setImagesUrls = () => {},
  initialImages = null,
}) {
  const [files, setFiles] = useState(initialImages);
  const sizeLimit = 5 * 1024 * 1024; // 5MB
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  const onDropAccepted = useCallback(async (files) => {
    const listingImages = [];

    let toastId = toast.loading('Uploading images...');
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = async () => {
        const result = await fetch('/api/image-upload', {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(reader.result),
        });
        const { url } = await result.json();
        listingImages.push(url);
      };
      reader.readAsDataURL(file);
    });
    toast.success('Images uploaded successfully', {
      id: toastId,
    });
    setImagesUrls(listingImages);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 5,
    maxSize: sizeLimit,
    noDrag: true,
    multiple: true,
    onDrop,
    onDropAccepted,
  });

  const thumbs = files?.map((file, index) => (
    <div style={thumb} key={file?.name ?? index}>
      <div style={thumbInner}>
        <img
          src={file?.preview ?? file}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          alt={file?.name?.split('.')[0] ?? 'Image'}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files?.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div className='container'>
      <Label>Images</Label>
      <Container {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Text>Click to select images</Text>
        <Text small css={{ color: '$accents6' }}>
          maximum 5 images, 5mb each.
        </Text>
      </Container>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </div>
  );
}
