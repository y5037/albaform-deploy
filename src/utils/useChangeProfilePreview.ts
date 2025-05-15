import { useEffect, useState } from 'react';

export default function useChangeProfilePreview(imageUrl: string) {
  const [isPreview, setIsPreview] = useState(imageUrl);

  useEffect(() => {
    if (imageUrl) {
      setIsPreview(imageUrl);
    }
  }, [imageUrl]);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        setIsPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    e.target.value = '';
  };

  return { isPreview, setIsPreview, handleImgChange };
}
