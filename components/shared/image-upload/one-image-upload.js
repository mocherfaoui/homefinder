import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { Avatar, Text } from '@nextui-org/react';

import { LogoContainer } from './styles';

export function OneImageUpload({ setLogoUrl, initialLogoUrl = null }) {
  const [logoPreview, setLogoPreview] = useState([initialLogoUrl]);
  const sizeLimit = 5 * 1024 * 1024; // 5MB
  const onDropAccepted = useCallback(async (files) => {
    let logoUrl;

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
        logoUrl = url;
        setLogoUrl(logoUrl);
      };
      reader.readAsDataURL(file);
    });
    toast.success('Images uploaded successfully', {
      id: toastId,
    });
  }, []);
  const onDrop = useCallback((acceptedFiles) => {
    setLogoPreview(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    maxSize: sizeLimit,
    noDrag: true,
    multiple: false,
    onDrop,
    onDropAccepted,
  });

  useEffect(() => {
    return () =>
      logoPreview?.forEach((file) => URL.revokeObjectURL(file?.preview));
  }, []);
  return (
    <div className='container'>
      <LogoContainer
        {...getRootProps({ className: 'dropzone' })}
        title={logoPreview[0] ? 'Change' : 'Upload'}
      >
        <input {...getInputProps()} />
        {logoPreview.length > 0 && logoPreview[0] ? (
          <Avatar
            pointer
            css={{ size: '$41' }}
            src={logoPreview[0]?.preview ?? initialLogoUrl}
          />
        ) : (
          <>
            <Text>Select an image</Text>
            <Text small css={{ color: '$accents6' }}>
              maximum 5mb.
            </Text>
          </>
        )}
      </LogoContainer>
    </div>
  );
}
