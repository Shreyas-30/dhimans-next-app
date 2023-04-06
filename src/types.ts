export interface cloudinaryUpload {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags?: null[] | null;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
  eager?: EagerEntity[] | null;
  api_key: string;
}
export interface EagerEntity {
  transformation: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  url: string;
  secure_url: string;
}

/*
Cloudinary upload response object
{
    "asset_id": "02aadfc80de8158a46196022d47396f7",
    "public_id": "signed_upload_demo_form/qecyuerviv15uf5p1onk",
    "version": 1680529603,
    "version_id": "9f574b68db153ef31b748aac612b3c97",
    "signature": "665bdd19bc5039268d9e6f4ce8e9b8e53ad339a2",
    "width": 3248,
    "height": 2112,
    "format": "png",
    "resource_type": "image",
    "created_at": "2023-04-03T13:46:43Z",
    "tags": [],
    "bytes": 1785870,
    "type": "upload",
    "etag": "84e1b73a613bd06aca4c3e0ebcf2b4b6",
    "placeholder": false,
    "url": "http://res.cloudinary.com/dlmv69lmo/image/upload/v1680529603/signed_upload_demo_form/qecyuerviv15uf5p1onk.png",
    "secure_url": "https://res.cloudinary.com/dlmv69lmo/image/upload/v1680529603/signed_upload_demo_form/qecyuerviv15uf5p1onk.png",
    "folder": "signed_upload_demo_form",
    "original_filename": "lireddit",
    "eager": [
        {
            "transformation": "c_pad,h_300,w_400",
            "width": 400,
            "height": 300,
            "bytes": 7226,
            "format": "png",
            "url": "http://res.cloudinary.com/dlmv69lmo/image/upload/c_pad,h_300,w_400/v1680529603/signed_upload_demo_form/qecyuerviv15uf5p1onk.png",
            "secure_url": "https://res.cloudinary.com/dlmv69lmo/image/upload/c_pad,h_300,w_400/v1680529603/signed_upload_demo_form/qecyuerviv15uf5p1onk.png"
        },
        {
            "transformation": "c_crop,h_200,w_260",
            "width": 260,
            "height": 200,
            "bytes": 3493,
            "format": "png",
            "url": "http://res.cloudinary.com/dlmv69lmo/image/upload/c_crop,h_200,w_260/v1680529603/signed_upload_demo_form/qecyuerviv15uf5p1onk.png",
            "secure_url": "https://res.cloudinary.com/dlmv69lmo/image/upload/c_crop,h_200,w_260/v1680529603/signed_upload_demo_form/qecyuerviv15uf5p1onk.png"
        }
    ],
    "api_key": "324762793819118"
}

*/

// export interface product {
//   id: string;
//   title: string;
//   description: string;
//   images: string[];
// }
