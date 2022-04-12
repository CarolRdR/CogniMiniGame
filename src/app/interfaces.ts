export interface SearchImagesI {
  results: {
    id: string;
    description: string;
    alt_description: string;
    tags: string;
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
    };
  };

  state: 'default' | 'matched';
}

export interface BasicImageI {
  results: {
    id: string;
    description: string;
    tags: string;
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
    };
    state: 'default' | 'matched';
  };
}
