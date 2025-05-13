import { useState } from 'react';

export default function useChangeProfilePreview() {
  const [isPreview, setIsPreview] = useState('');

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        setIsPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return {isPreview, handleImgChange}
}
