export interface ImageFormat {
  name: string,
  hash: string,
  ext: string,
  mime: string,
  width: number,
  height: number,
  size: number,
  path: null | string,
  url: string,
  provider_metadata: {
    public_id: string,
    resource_type: string
  }
}

export interface Image extends ImageFormat {
  id: string,
  alternativeText: string,
  caption: string,
  formats: {
    thumbnail: ImageFormat,
    large: ImageFormat,
    medium: ImageFormat,
    small: ImageFormat,
  },
  previewUrl: null | string,
  provider: string,
  path: null | string,
  created_at: string,
  updated_at: string,
}

export interface EventType {
  id: string,
  name: string,
  slug: string,
  venue: string,
  address: string,
  performers: string,
  date: string,
  time: string,
  description: string,
  image: Array<Image>
}

export interface FormValues {
  [key: string]: string,
}
